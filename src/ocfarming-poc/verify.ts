/**
 * Node smoke test for the ported pure logic — `npx tsx src/ocfarming-poc/verify.ts`.
 *
 * The point: the decoders, the policy and the supply plan ported out of Java
 * still run and still get checked outside the game, exactly like the plugin's
 * own tests do. Only the adapters — game.ts, bank.ts, storage.ts — lost their
 * coverage in the move, and those are the files the plugin's five FIX_*
 * versions came from. Treat them as the untested surface they are.
 */

// Node globals, declared locally: the tsconfig targets the Rhino runtime.
declare const console: { log: (message: string) => void };

import { APPLE, fruitFromRaw, PALM } from './fruit.js';
import {
	CYCLE_SECONDS,
	decode,
	describeWait,
	encode,
	isDue,
	needsVisit,
	needsWork,
	observe,
	State,
} from './observation.js';
import { FRUIT_PATCHES, includes, regionOf, TREE_PATCHES } from './patches.js';
import {
	Action,
	confirmed,
	type Inventory,
	isProtectionConfirmation,
	ITEM,
	nextPlan,
} from './policy.js';
import { buildPlan, COINS_PER_PATCH, Kind, nextStep, planReady } from './supplies.js';
import { OAK, treeFromRaw, WILLOW } from './trees.js';

const NOW = 1_000_000;
let failures = 0;

const check = (name: string, actual: unknown, expected: unknown): void => {
	const ok = actual === expected;
	if (!ok) failures = failures + 1;
	console.log(
		(ok ? 'ok   ' : 'FAIL ') +
			name +
			(ok ? '' : ` — got ${String(actual)}, want ${String(expected)}`),
	);
};

const inventory = (counts: Record<number, number>, free = 20, level = 99): Inventory => ({
	count: (id) => counts[id] ?? 0,
	ids: Object.keys(counts)
		.map(Number)
		.sort((a, b) => a - b),
	free,
	level,
});

const tree = (raw: number, now = NOW) => observe(false, raw, now);
const fruit = (raw: number, now = NOW) => observe(true, raw, now);

const lumbridge = TREE_PATCHES[0];
const varrock = TREE_PATCHES[1];
const catherby = FRUIT_PATCHES[1];

// --- tree decoder: raw values straight out of FarmingTree.java
check('raw 0 is weeds', tree(0).state, State.WEEDS);
check('raw 3 is empty', tree(3).state, State.EMPTY);
check('raw 8 is oak growing', tree(8).state, State.GROWING);
check('raw 8 is an oak', tree(8).tree, OAK);
check('raw 8 is growth stage 0', tree(8).growthStage, 0);
check('raw 11 is still growing', tree(11).state, State.GROWING);
check('raw 12 wants check-health', tree(12).state, State.CHECK_HEALTH);
check('raw 13 is checked', tree(13).state, State.CHECKED);
check('raw 14 is a stump', tree(14).state, State.STUMP);
check('raw 15 is a willow', treeFromRaw(15), WILLOW);
check('raw 193 is a checked willow', tree(193).state, State.CHECKED);
check('raw 73 is a diseased oak', tree(73).state, State.DISEASED);
check('raw 137 is a dead oak', tree(137).state, State.DEAD);

// --- willow, the default species
check('willow sapling id', WILLOW.sapling, 5371);
check('willow needs level 30', WILLOW.level, 30);
check('willow payment is Apples(5)', WILLOW.payment, 5386);
check('willow pays one basket', WILLOW.paymentAmount, 1);
check('raw 16 is willow growing', tree(16).state, State.GROWING);
check('raw 21 wants check-health', tree(21).state, State.CHECK_HEALTH);
check('raw 23 is a willow stump', tree(23).state, State.STUMP);

// --- fruit decoder: 27-value blocks where the offset is the condition
check('apple block starts at 8', APPLE.start, 8);
check('raw 8 read as fruit is an apple', fruitFromRaw(8), APPLE);
check('the same raw means different things per patch kind', tree(8).crop === fruit(8).crop, false);
check('fruit stage 0 is growing', fruit(8).state, State.GROWING);
check('fruit stage 5 is still growing', fruit(13).state, State.GROWING);
check('fruit stage 6 is checked', fruit(14).state, State.CHECKED);
check('fruit stage 7 is harvestable', fruit(15).state, State.HARVEST);
check('fruit stage 12 is still harvestable', fruit(20).state, State.HARVEST);
check('fruit stage 13 is diseased', fruit(21).state, State.DISEASED);
check('fruit stage 19 is dead', fruit(27).state, State.DEAD);
check('fruit stage 25 is a stump', fruit(33).state, State.STUMP);
check('fruit stage 26 wants check-health', fruit(34).state, State.CHECK_HEALTH);
check('palm starts at 200', PALM.start, 200);
check('raw 200 is a growing palm', fruit(200).crop, 'PALM');
check('fruit trees run 160-minute cycles', APPLE.cycleSeconds, 9600);

// --- policy: the tree cycle
check(
	'weeds with a rake rakes',
	nextPlan(tree(0), inventory({ [ITEM.RAKE]: 1 }), OAK, false, false, false).action,
	Action.RAKE,
);
check(
	'weeds without a rake is blocked',
	nextPlan(tree(0), inventory({}), OAK, false, false, false).action,
	Action.BLOCKED,
);
check(
	'empty patch with supplies plants',
	nextPlan(tree(3), inventory({ [ITEM.SPADE]: 1, [OAK.sapling]: 1 }), OAK, false, false, false)
		.action,
	Action.PLANT,
);
check(
	'protection without payment is blocked',
	nextPlan(tree(3), inventory({ [ITEM.SPADE]: 1, [OAK.sapling]: 1 }), OAK, false, true, false)
		.action,
	Action.BLOCKED,
);
check(
	'growing + protect pays',
	nextPlan(tree(8), inventory({ [OAK.payment]: 1 }), OAK, false, true, false).action,
	Action.PAY,
);
check(
	'notes are accepted as payment',
	nextPlan(tree(8), inventory({ [OAK.paymentNote]: 1 }), OAK, false, true, false).item,
	OAK.paymentNote,
);
check(
	'growing + already paid idles',
	nextPlan(tree(8), inventory({}), OAK, false, true, true).action,
	Action.NONE,
);
check(
	'checked tree with coins is removed',
	nextPlan(tree(13), inventory({ [ITEM.COINS]: 200 }), OAK, false, false, false).action,
	Action.REMOVE_TREE,
);
check(
	'checked tree without coins is blocked',
	nextPlan(tree(13), inventory({ [ITEM.COINS]: 199 }), OAK, false, false, false).action,
	Action.BLOCKED,
);
check(
	'stump with a spade is cleared',
	nextPlan(tree(14), inventory({ [ITEM.SPADE]: 1 }), OAK, false, false, false).action,
	Action.CLEAR,
);
check(
	'diseased tree is pruned',
	nextPlan(tree(73), inventory({ [ITEM.SECATEURS]: 1 }), OAK, false, false, false).action,
	Action.PRUNE,
);
check(
	'weeds in the bag are dropped first',
	nextPlan(tree(3), inventory({ [ITEM.WEEDS]: 1, [ITEM.SPADE]: 1 }), OAK, false, false, false)
		.action,
	Action.DROP_WEEDS,
);
check(
	'level gate holds',
	nextPlan(
		tree(3),
		inventory({ [ITEM.SPADE]: 1, [WILLOW.sapling]: 1 }, 20, 15),
		WILLOW,
		false,
		false,
		false,
	).action,
	Action.BLOCKED,
);
check(
	'a tree species on a fruit patch is refused',
	nextPlan(fruit(8), inventory({}), OAK, false, false, false).action,
	Action.BLOCKED,
);

// --- policy: the fruit cycle
check(
	'ripe fruit is picked',
	nextPlan(fruit(15), inventory({}), APPLE, true, false, false).action,
	Action.HARVEST,
);
check(
	'ripe fruit with a full bag is blocked',
	nextPlan(fruit(15), inventory({}, 0), APPLE, true, false, false).action,
	Action.BLOCKED,
);
check(
	'picked fruit is noted before anything else',
	nextPlan(fruit(15), inventory({ [APPLE.produce]: 3 }), APPLE, true, false, false).action,
	Action.NOTE_FRUIT,
);
check(
	'noting pairs produce with its note',
	nextPlan(fruit(15), inventory({ [APPLE.produce]: 3 }), APPLE, true, false, false).pairedItem,
	APPLE.produce + 1,
);
check(
	'fruit check-health is a job',
	nextPlan(fruit(34), inventory({}), APPLE, true, false, false).action,
	Action.CHECK_HEALTH,
);

// --- growth window and persistence (the revisit scheduler)
const freshWillow = tree(15); // just planted, stage 0 of 6
check('a fresh willow is growing', freshWillow.state, State.GROWING);
check('earliest is 5 cycles out', freshWillow.earliestReadyAt, NOW + 5 * CYCLE_SECONDS);
check('latest is 6 cycles out', freshWillow.latestReadyAt, NOW + 6 * CYCLE_SECONDS);
check('willow takes 4h at most', 6 * CYCLE_SECONDS, 14_400);
check('not due on the day it is planted', isDue(freshWillow, NOW), false);
check('not due one second early', isDue(freshWillow, NOW + 14_400 - 1), false);
check('due when the window closes', isDue(freshWillow, NOW + 14_400), true);

const freshApple = fruit(8);
check('an apple takes 16h at most', freshApple.latestReadyAt - NOW, 6 * 9600);

check('a growing patch inside its window is skipped', needsVisit(freshWillow, NOW), false);
check('a growing patch past its window is visited', needsVisit(freshWillow, NOW + 14_400), true);
check('an empty patch is always visited', needsVisit(tree(3), NOW), true);
check('a check-health patch is always visited', needsVisit(tree(21), NOW), true);
check('harvestable fruit is always visited', needsVisit(fruit(15), NOW), true);
check('a patch never seen is always visited', needsVisit(null, NOW), true);
check('growing is not work', needsWork(freshWillow), false);

const halfGrown = tree(18);
check('stage 3', halfGrown.growthStage, 3);
check('three cycles left', halfGrown.latestReadyAt, NOW + 3 * CYCLE_SECONDS);
const narrowed = observe(false, 18, NOW + 2, halfGrown, true);
check('a live resample narrows the window', narrowed.earliestReadyAt, NOW + 2 * CYCLE_SECONDS + 2);

check('encode round-trips', decode(encode(freshWillow), NOW + 10)?.raw, 15);
check(
	'round-trip keeps the deadline',
	decode(encode(freshWillow), NOW + 10)?.latestReadyAt,
	NOW + 14_400,
);
check('a fruit observation round-trips as fruit', decode(encode(freshApple), NOW + 10)?.fruit, true);
check('a tree observation round-trips as tree', decode(encode(freshWillow), NOW + 10)?.fruit, false);
check('a non-growing state round-trips', decode(encode(tree(3)), NOW + 10)?.state, State.EMPTY);
check('garbage is rejected', decode('nonsense', NOW), null);
check('a foreign format version is rejected', decode('T2:15:1:2:3', NOW), null);
check('a non-numeric field is rejected', decode('T1:15:abc:2:3', NOW), null);
check('a reading from the future is rejected', decode(encode(tree(15, NOW + 5000)), NOW), null);
check('an impossible window is rejected', decode('T1:15:100:200:999999999', NOW + 10), null);

check('wait formatting, hours', describeWait(3 * 3600 + 20 * 60), '3h20m');
check('wait formatting, minutes', describeWait(15 * 60), '15m');
check('wait formatting, expired', describeWait(-1), 'due');

// --- patch geometry
check('six tree patches', TREE_PATCHES.length, 6);
check('five fruit patches', FRUIT_PATCHES.length, 5);
check('region maths matches the plugin', regionOf(3195, 3228), lumbridge.region);
check('the patch owns its own region', includes(lumbridge, 3195, 3228, 0), true);
check('upstairs is never a patch', includes(lumbridge, 3195, 3228, 1), false);
check('Catherby excludes the allotment corner', includes(catherby, 2839, 3441, 0), false);
check('Catherby keeps its own tile', includes(catherby, 2858, 3432, 0), true);

// --- supply plan
const twoWillows = buildPlan({
	patches: [lumbridge, varrock],
	speciesFor: () => WILLOW,
	protectFor: () => true,
	runeReserve: 0,
});
check('one sapling entry for two identical patches', twoWillows.saplings.length, 1);
check('two saplings needed', twoWillows.saplings[0]?.amount, 2);
check('level gate comes from the species', twoWillows.levelRequired, 30);
check('a tree-only run reserves one slot', twoWillows.spaceReserve, 1);
check(
	'coins scale with patches',
	twoWillows.required.find((item) => item.item === ITEM.COINS)?.amount,
	2 * COINS_PER_PATCH,
);

const withFruit = buildPlan({
	patches: [lumbridge, catherby],
	speciesFor: (patch) => (patch.fruit ? APPLE : WILLOW),
	protectFor: () => false,
	runeReserve: 0,
});
check('a fruit run reserves two slots', withFruit.spaceReserve, 2);
check('two species means two sapling entries', withFruit.saplings.length, 2);
check('the plan key changes with the run shape', twoWillows.key === withFruit.key, false);

const emptyBag = inventory({}, 28, 99);
check('an empty bag is not ready', planReady(twoWillows, emptyBag), false);
check(
	'an empty bank blocks before anything is touched',
	nextStep(twoWillows, emptyBag, () => 0).kind,
	Kind.BLOCKED,
);
check(
	'a stocked bank starts withdrawing',
	nextStep(twoWillows, emptyBag, () => 100_000).kind,
	Kind.WITHDRAW,
);
check('saplings come out unnoted', nextStep(twoWillows, emptyBag, () => 100_000).noted, false);
check(
	'excess saplings are banked first',
	nextStep(twoWillows, inventory({ [WILLOW.sapling]: 5 }, 20), () => 100_000).kind,
	Kind.DEPOSIT,
);
check(
	'noted saplings are normalized away',
	nextStep(twoWillows, inventory({ [WILLOW.saplingNote]: 2 }, 20), () => 100_000).item,
	WILLOW.saplingNote,
);
check(
	'unknown junk is banked to make room',
	nextStep(twoWillows, inventory({ 1234: 1 }, 0), () => 100_000).kind,
	Kind.DEPOSIT,
);

const stocked = inventory(
	{
		[WILLOW.sapling]: 2,
		[ITEM.SPADE]: 1,
		[ITEM.RAKE]: 1,
		[WILLOW.paymentNote]: 2,
		[ITEM.COINS]: 2 * COINS_PER_PATCH,
	},
	10,
	99,
);
check('a stocked bag is ready', planReady(twoWillows, stocked), true);
check('and the plan says so', nextStep(twoWillows, stocked, () => 0).kind, Kind.READY);

// --- receipts
check(
	'gardener confirmation is recognised',
	isProtectionConfirmation(
		"That'll do nicely, sir. Leave it with me - I'll make sure that patch grows for you.",
	),
	true,
);
check(
	'already-protected line is recognised',
	isProtectionConfirmation("I'm already looking after that patch, sir."),
	true,
);
check('unrelated chat is not a receipt', isProtectionConfirmation('Hello there.'), false);

// --- confirmation: a click is never a receipt
const rakePlan = { action: Action.RAKE, item: 0, pairedItem: 0, amount: 1, reason: 'rake' };
check(
	'raking is confirmed by the patch going empty',
	confirmed(rakePlan, tree(0), tree(3), emptyBag, emptyBag, ''),
	true,
);
check(
	'raking is not confirmed by an unchanged patch',
	confirmed(rakePlan, tree(0), tree(0), emptyBag, emptyBag, ''),
	false,
);
check(
	'raking is not confirmed without a reading',
	confirmed(rakePlan, tree(0), null, emptyBag, emptyBag, ''),
	false,
);

const notePlan = {
	action: Action.NOTE_FRUIT,
	item: APPLE.produce,
	pairedItem: APPLE.produce + 1,
	amount: 2,
	reason: 'note',
};
check(
	'noting is confirmed by the paired delta',
	confirmed(
		notePlan,
		fruit(15),
		fruit(15),
		inventory({ [APPLE.produce]: 2 }),
		inventory({ [APPLE.produce + 1]: 2 }),
		'',
	),
	true,
);
check(
	'noting is not confirmed by a one-sided delta',
	confirmed(notePlan, fruit(15), fruit(15), inventory({ [APPLE.produce]: 2 }), inventory({}), ''),
	false,
);

console.log(failures === 0 ? '\nall checks passed' : `\n${failures} check(s) failed`);
if (failures > 0) throw new Error(failures + ' check(s) failed');
