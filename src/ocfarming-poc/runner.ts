/**
 * The tick state machine.
 *
 * This replaces FarmingVisitRunner + FarmingActionExecutor + FarmingRunSupplies,
 * which in the plugin run on their own thread with blocking sleepUntil.
 * onGameTick has to return immediately, so every wait became an explicit
 * phase. That conversion is the real cost of the port — the approach layer,
 * the other candidate, turned out to be deletable.
 */

import {
	bankCount,
	execute as bankExecute,
	expectedAfter,
	heldForStep,
	isOpen as bankIsOpen,
	progressOpen,
	requestClose,
	resetOpen,
} from './bank.js';
import { protectFor, readConfig, speciesFor, type PocConfig } from './config.js';
import {
	distanceToObject,
	distanceToVisitPoint,
	execute,
	findPatchObject,
	inPatchRegion,
	isBusy,
	dialogueText,
	needsPatchObject,
	playerLocation,
	readPatch,
	snapshotInventory,
	startTravel,
	stopTravel,
} from './game.js';
import { describeWait, isDue, needsVisit, type Observation, State } from './observation.js';
import { regionOf, type TreePatch, visitPoint } from './patches.js';
import { Action, confirmed, type Inventory, nextPlan, type Plan } from './policy.js';
import {
	clearProtection,
	isProtected,
	nowSeconds,
	recall,
	remember,
	rememberProtection,
} from './storage.js';
import {
	buildPlan,
	isMandatory,
	Kind,
	nextStep,
	planReady,
	type Step,
	type SupplyPlan,
} from './supplies.js';
import {
	type ApproachProbe,
	createApproachProbe,
	finishVisit,
	log,
	recordAction,
	startVisit,
	summary,
	visit,
} from './telemetry.js';

// Close enough to be "there", not a threshold that cancels the web walk
// while it is still working. The first run cut every approach short at 12,
// which left Taverley 12 tiles from its patch and timed out REMOVE_TREE.
const ARRIVAL_DISTANCE = 4;
const SETTLE_TICKS = 3;
const SETTLE_LIMIT = 40;
/** Ticks the player may stand still after a click without a receipt. */
const AWAIT_LIMIT = 25;
/** Ticks the player may spend walking inside a single action. */
const AWAIT_WALK_LIMIT = 60;
const MAX_ACTIONS_PER_PATCH = 12;
const MAX_ATTEMPTS_PER_ACTION = 3;
const BANK_STEP_LIMIT = 20;
const BANK_OPEN_LIMIT = 400;

/** The PAY/REMOVE_TREE gardener dialogue. UNVERIFIED against rlpl. */
const GARDENER_OPTIONS = ['Yes', 'Yes.', 'Yes please.', "Yes, I'd like to pay."];

type Phase =
	| 'prepare'
	| 'supplies'
	| 'supplyStep'
	| 'select'
	| 'travel'
	| 'settle'
	| 'act'
	| 'await'
	| 'stopped';

interface QueueEntry {
	readonly patch: TreePatch;
	done: boolean;
}

let config: PocConfig;
let queue: QueueEntry[] = [];
let phase: Phase = 'prepare';
let current: QueueEntry | null = null;

let wait = 0;
let travelTicks = 0;
let walkIssued = false;
let probe: ApproachProbe | null = null;

let settleTicks = 0;
let gateRegion = -1;
let gateStable = 0;

let observation: Observation | null = null;
let object: net.runelite.api.TileObject | null = null;
let actionsDone = 0;
let attempts = 0;

let pending: Plan | null = null;
let before: Observation | null = null;
let initial: Inventory | null = null;
let awaitTicks = 0;
let walkTicks = 0;
let receipt = '';
let paid = false;

let plan: SupplyPlan | null = null;
let bankTicks = 0;
let step: Step | null = null;
let stepHeld = 0;
let stepTicks = 0;
let skippedOptional: number[] = [];
let lastBankStage = '';

export const onChatReceipt = (message: string): void => {
	receipt = receipt + ' ' + message;
};

export const start = (): void => {
	config = readConfig();
	queue = config.patches.map((patch) => ({ patch, done: false }));
	phase = 'prepare';
	log(
		'farming PoC | trees ' +
			config.tree.label +
			' | fruit ' +
			config.fruitTree.label +
			' | protect ' +
			config.protectTrees +
			'/' +
			config.protectFruit +
			' | bank ' +
			config.useBank +
			' | patches ' +
			config.patches.map((patch) => patch.key).join(','),
	);
};

export const stop = (): void => {
	stopTravel();
	summary();
};

const failVisit = (reason: string): void => {
	stopTravel();
	if (current !== null) current.done = true;
	finishVisit(reason);
	current = null;
	phase = 'select';
};

const completeVisit = (reason: string): void => {
	stopTravel();
	if (current !== null) {
		// The last reading is what the next run schedules from.
		if (observation !== null) remember(current.patch, observation);
		current.done = true;
	}
	finishVisit(reason);
	current = null;
	phase = 'select';
};

/** Port of FarmingSamplingGate: two full stable ticks before trusting a read. */
const gateAccepts = (region: number, eligible: boolean): boolean => {
	if (!eligible) {
		gateRegion = -1;
		gateStable = 0;
		return false;
	}
	if (gateRegion !== region) {
		gateRegion = region;
		gateStable = 0;
	}
	gateStable = Math.min(SETTLE_TICKS, gateStable + 1);
	return gateStable >= SETTLE_TICKS;
};

/**
 * Port of FarmingRunSupplies.hasWork. A patch is work when its estimate
 * expired, when its state is a job in itself, or when protection is on and we
 * have no receipt for the crop that is growing there.
 */
const patchNeedsVisit = (patch: TreePatch, now: number): boolean => {
	const stored = recall(patch, now);
	if (needsVisit(stored, now)) return true;
	return (
		protectFor(config, patch) &&
		stored !== null &&
		stored.state === State.GROWING &&
		!isProtected(patch, stored)
	);
};

const prepare = (): void => {
	if (queue.length === 0) {
		log('no patches enabled');
		phase = 'stopped';
		return;
	}

	const now = nowSeconds();
	for (const entry of queue) {
		const stored = recall(entry.patch, now);
		if (stored === null) {
			log(entry.patch.label + ': never observed');
			continue;
		}
		const growing = stored.state === State.GROWING;
		log(
			entry.patch.label +
				': ' +
				stored.label +
				(growing
					? ' — ' + (isDue(stored, now) ? 'due' : 'due in ' + describeWait(stored.latestReadyAt - now))
					: '') +
				(protectFor(config, entry.patch) && growing
					? (isProtected(entry.patch, stored)
						? ' (protected)'
						: ' (UNPROTECTED)')
					: ''),
		);
	}

	// Never walk to a bank for a run with nothing to do. Without this gate the
	// script spent 44 seconds fetching supplies for eleven patches it was
	// about to skip — and blocked on a payment it did not need.
	const due = config.patches.filter((patch) => patchNeedsVisit(patch, now));
	if (due.length === 0) {
		log('nothing due — skipping the bank trip');
		phase = 'select';
		return;
	}

	// Plan for the patches actually being visited, not every enabled one. The
	// Java version plans the whole run shape; with eleven patches planted and
	// two due, that demands supplies for nine patches it will not touch.
	plan = buildPlan({
		patches: due,
		speciesFor: (patch) => speciesFor(config, patch),
		protectFor: (patch) => protectFor(config, patch),
		runeReserve: config.runeReserve,
	});

	const inventory = snapshotInventory();
	if (inventory.level < plan.levelRequired) {
		log('blocked: need Farming level ' + plan.levelRequired);
		phase = 'stopped';
		return;
	}

	if (planReady(plan, inventory)) {
		log('supplies already in the bag');
		phase = 'select';
		return;
	}

	if (!config.useBank) {
		log('supplies incomplete and banking is off — patches may be skipped');
		phase = 'select';
		return;
	}

	bankTicks = 0;
	skippedOptional = [];
	resetOpen();
	lastBankStage = '';
	phase = 'supplies';
};

/** A cached bank list must never drive the plan: every check reads live. */
const availableInBank = (itemId: number): number =>
	skippedOptional.includes(itemId) ? 0 : bankCount(itemId);

const supplies = (): void => {
	if (plan === null) {
		phase = 'select';
		return;
	}

	bankTicks = bankTicks + 1;
	if (bankTicks > BANK_OPEN_LIMIT) {
		log('could not reach a bank — continuing with what is in the bag');
		phase = 'select';
		return;
	}

	if (!bankIsOpen()) {
		const progress = progressOpen(true);
		// Say which sub-state we are in, once per transition: without this the
		// only symptom of a stuck bank is the player walking around.
		if (progress !== lastBankStage) {
			lastBankStage = progress;
			log('bank: ' + progress);
		}
		if (progress === 'failed') {
			log('could not open a bank — continuing with what is in the bag');
			phase = 'select';
			return;
		}
		wait = 1;
		return;
	}
	lastBankStage = '';

	const next = nextStep(plan, snapshotInventory(), availableInBank);

	if (next.kind === Kind.BLOCKED) {
		log('supplies blocked: ' + next.message);
		requestClose();
		phase = 'select';
		return;
	}

	if (next.kind === Kind.READY) {
		log(next.message);
		requestClose();
		wait = 3;
		phase = 'select';
		return;
	}

	step = next;
	stepHeld = heldForStep(next);
	stepTicks = 0;
	log(next.message);
	phase = 'supplyStep';
};

const supplyStep = (): void => {
	if (step === null || plan === null) {
		phase = 'supplies';
		return;
	}
	stepTicks = stepTicks + 1;

	if (stepTicks === 1) {
		// execute() returning false means the note toggle still has to land.
		if (!bankExecute(step)) stepTicks = 0;
		wait = 1;
		return;
	}

	if (heldForStep(step) === expectedAfter(step, stepHeld)) {
		step = null;
		phase = 'supplies';
		return;
	}

	if (stepTicks > BANK_STEP_LIMIT) {
		if (step.kind === Kind.WITHDRAW && !isMandatory(plan, step.item)) {
			// Optional reserves never prevent the run.
			log('skipping optional item ' + step.item);
			skippedOptional.push(step.item);
			step = null;
			phase = 'supplies';
			return;
		}
		log('supplies blocked: ' + step.message + ' not confirmed');
		requestClose();
		step = null;
		phase = 'select';
	}
};

const select = (): void => {
	const now = nowSeconds();
	let next = queue.find((entry) => !entry.done);

	// Skip, without travelling, every patch still inside its growth window.
	// This is the whole point of persisting observations: a willow takes ~4h
	// and a fruit tree ~16h, and walking the map to look at trees that cannot
	// have changed is pure exposure for nothing.
	while (next !== undefined) {
		if (patchNeedsVisit(next.patch, now)) break;
		const stored = recall(next.patch, now);
		next.done = true;
		log(
			next.patch.label +
				' -> skipped, ' +
				(stored === null ? '' : stored.label + ', ') +
				'due in ' +
				describeWait(stored === null ? 0 : stored.latestReadyAt - now),
		);
		next = queue.find((entry) => !entry.done);
	}

	if (next === undefined) {
		phase = 'stopped';
		if (queue.length > 0) log('no patch is due — nothing to walk to');
		summary();
		if (config.stopWhenDone) bot.terminate();
		return;
	}

	current = next;
	paid = isProtected(next.patch, recall(next.patch, now));
	travelTicks = 0;
	walkIssued = false;
	settleTicks = 0;
	gateRegion = -1;
	gateStable = 0;
	startVisit(next.patch.label);
	probe = createApproachProbe(visitPoint(next.patch), playerLocation(), 0);
	phase = 'travel';
};

const travel = (): void => {
	if (current === null) {
		phase = 'select';
		return;
	}
	const patch = current.patch;
	const report = visit();
	const location = playerLocation();
	const distance = distanceToVisitPoint(patch);

	if (probe !== null) probe.observe(location, travelTicks);

	if (distance <= ARRIVAL_DISTANCE) {
		stopTravel();
		if (report !== null) {
			report.travelTicks = travelTicks;
			report.arrivalDistance = distance;
			report.bounced = probe !== null && probe.bounced();
		}
		phase = 'settle';
		return;
	}

	if (!bot.walking.isWebWalking()) {
		// Re-issuing means the walker gave up short of the destination. That
		// count is the headline number of this PoC.
		if (walkIssued && report !== null) report.walkRestarts = report.walkRestarts + 1;
		startTravel(patch);
		walkIssued = true;
		wait = 2;
	}

	travelTicks = travelTicks + 1;
	bot.counters.setCounter('TravelTicks', travelTicks);
	if (travelTicks > config.travelLimit) failVisit('travel timeout at distance ' + distance);
};

const settle = (): void => {
	if (current === null) {
		phase = 'select';
		return;
	}
	const patch = current.patch;
	const report = visit();
	const location = playerLocation();
	settleTicks = settleTicks + 1;

	const eligible = location !== null && !bot.localPlayerMoving() && inPatchRegion(patch);
	const region = location === null ? -1 : regionOf(location.getX(), location.getY());

	if (!gateAccepts(region, eligible)) {
		if (settleTicks > SETTLE_LIMIT) failVisit('never settled inside the patch region');
		return;
	}

	const now = nowSeconds();
	observation = readPatch(patch, now, recall(patch, now));
	remember(patch, observation);
	// A patch that changed crop or went empty is no longer the one we paid for.
	if (!isProtected(patch, observation)) {
		paid = false;
		if (observation.state !== State.GROWING) clearProtection(patch);
	}
	object = findPatchObject(patch);
	if (report !== null) {
		report.settleTicks = settleTicks;
		report.observed = observation.label + ' (raw ' + observation.raw + ')';
		report.objectLoaded = object !== null;
		report.objectDistance = distanceToObject(object);
	}
	actionsDone = 0;
	attempts = 0;
	phase = 'act';
};

const act = (): void => {
	if (current === null || observation === null) {
		phase = 'select';
		return;
	}
	if (isBusy()) return;
	if (actionsDone >= MAX_ACTIONS_PER_PATCH) {
		completeVisit('action cap reached');
		return;
	}

	const patch = current.patch;
	const inventory = snapshotInventory();
	const nextAction = nextPlan(
		observation,
		inventory,
		speciesFor(config, patch),
		patch.fruit,
		protectFor(config, patch),
		paid,
	);

	if (nextAction.action === Action.NONE) {
		completeVisit('nothing to do: ' + observation.label);
		return;
	}
	if (nextAction.action === Action.BLOCKED) {
		completeVisit('blocked: ' + nextAction.reason);
		return;
	}

	object = findPatchObject(patch);
	if (object === null && needsPatchObject(nextAction)) {
		completeVisit('patch object not in scene for ' + nextAction.action);
		return;
	}

	const report = recordAction(nextAction.action, nextAction.reason);
	attempts = attempts + 1;
	report.attempts = attempts;

	// execute() returns false only when the target itself is missing; rlpl
	// interactions report nothing, so success is decided in the await phase.
	if (!execute(patch, nextAction, object)) {
		completeVisit('no target for ' + nextAction.action);
		return;
	}

	pending = nextAction;
	before = observation;
	initial = inventory;
	walkTicks = 0;
	awaitTicks = 0;
	receipt = '';
	phase = 'await';
};

const settleAwait = (): void => {
	if (current === null || pending === null || before === null || initial === null) {
		phase = 'act';
		return;
	}
	const patch = current.patch;
	// Walking to the target is part of the interaction — rlpl walks the player
	// to the object or the NPC itself. Counting those ticks as a stall is what
	// failed REMOVE_TREE at Taverley.
	if (bot.localPlayerMoving()) {
		walkTicks = walkTicks + 1;
	} else {
		awaitTicks = awaitTicks + 1;
	}

	if (!inPatchRegion(patch)) {
		failVisit('left the patch region during ' + pending.action);
		return;
	}

	if (pending.action === Action.PAY || pending.action === Action.REMOVE_TREE) {
		bot.widgets.handleDialogue(GARDENER_OPTIONS);
	}

	// Fold the dialogue box into the receipt. Deduped, because this runs every
	// tick and the same line would otherwise pile up for the whole wait.
	const spoken = dialogueText();
	if (spoken !== '' && !receipt.includes(spoken)) receipt = receipt + ' ' + spoken;

	const after = readPatch(patch, nowSeconds(), observation);
	const currentInventory = snapshotInventory();

	if (confirmed(pending, before, after, initial, currentInventory, receipt)) {
		const report = visit();
		if (report !== null && report.actions.length > 0) {
			// eslint-disable-next-line unicorn/prefer-at -- Array.prototype.at is ES2022; Rhino 1.7.14 has no polyfill
			const last = report.actions[report.actions.length - 1];
			if (last !== undefined) {
				last.confirmed = true;
				// Total click-to-receipt, walking included.
				last.confirmTicks = awaitTicks + walkTicks;
			}
		}
		if (pending.action === Action.PAY) {
			paid = true;
			rememberProtection(patch, before);
		}
		observation = after;
		remember(patch, after);
		actionsDone = actionsDone + 1;
		attempts = 0;
		pending = null;
		phase = 'act';
		wait = 1;
		return;
	}

	if (awaitTicks > AWAIT_LIMIT || walkTicks > AWAIT_WALK_LIMIT) {
		log(
			patch.label +
				': ' +
				pending.action +
				' never confirmed (' +
				awaitTicks +
				't idle, ' +
				walkTicks +
				't walking)',
		);
		observation = after;
		pending = null;
		if (attempts >= MAX_ATTEMPTS_PER_ACTION) {
			completeVisit('unconfirmed after ' + attempts + ' attempts');
			return;
		}
		phase = 'act';
	}
};

export const tick = (): void => {
	// Breaks off for the whole run: a break mid-approach would poison the
	// travel numbers this PoC exists to collect.
	bot.breakHandler.setBreakHandlerStatus(false);

	if (wait > 0) {
		wait = wait - 1;
		return;
	}

	switch (phase) {
		case 'prepare': {
			prepare();
			return;
		}
		case 'supplies': {
			supplies();
			return;
		}
		case 'supplyStep': {
			supplyStep();
			return;
		}
		case 'select': {
			select();
			return;
		}
		case 'travel': {
			travel();
			return;
		}
		case 'settle': {
			settle();
			return;
		}
		case 'act': {
			act();
			return;
		}
		case 'await': {
			settleAwait();
			return;
		}
		default: {
			return;
		}
	}
};
