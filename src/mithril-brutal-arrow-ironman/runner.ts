/**
 * ==========================================================
 *  Mithril Brutal Arrow Ironman
 *  Author: xulixna (Discord)
 *  Framework: ThePlug Bot Maker (Rhino JS / TypeScript)
 * ==========================================================
 */
import { BrutalSettings } from './config.js';
import {
	ACHEY_AREA,
	ACHEY_AREA_RADIUS,
	ACHEY_LOGS_ID,
	ACHEY_TREE_ID,
	ANVIL_ID,
	ANVIL_POINT,
	ARRIVED_RADIUS,
	BANK_AREA_RADIUS,
	CHOP_ANIMATIONS,
	COAL_ID,
	COAL_PER_BAR,
	EDGE_BANK_BOOTH_ID,
	EDGE_BANK_POINT,
	FEATHER_ID,
	FEATHERS_PER_ARROW,
	FLIGHTED_OGRE_ARROW_ID,
	FURNACE_ID,
	FURNACE_POINT,
	HAMMER_ID,
	ITEM_NAMES,
	KNIFE_ID,
	MAKE_WIDGET_ID,
	MITHRIL_BAR_ID,
	MITHRIL_BRUTAL_ID,
	MITHRIL_NAILS_ID,
	MITHRIL_ORE_ID,
	NAILS_PER_BAR,
	OGRE_SHAFTS_ID,
	ORE_PER_TRIP,
	Phase,
	PHASE_LEVELS,
	PHASE_NAMES,
	PHASES,
	SMELT_ANIMATIONS,
	SMITH_ANIMATIONS,
	SMITH_NAILS_WIDGET_ID,
	VARROCK_ARMOUR_2_ID,
	VARROCK_BANK_BOOTH_ID,
	VARROCK_BANK_POINT,
} from './constants.js';
import { BankTarget, BrutalGame } from './game.js';

type WorldPoint = net.runelite.api.coords.WorldPoint;

type State =
	| 'start'
	| 'plan'
	| 'bars_armour'
	| 'bars_bank'
	| 'bars_furnace'
	| 'bars_menu'
	| 'bars_smelting'
	| 'nails_bank'
	| 'nails_anvil'
	| 'nails_menu'
	| 'nails_smithing'
	| 'arrows_prepare'
	| 'arrows_location'
	| 'arrows_walking'
	| 'arrows_chopping'
	| 'arrows_fletch_start'
	| 'arrows_make_menu'
	| 'arrows_fletching'
	| 'stopped';

interface PendingAction {
	label: string;
	check: () => boolean;
	done: () => void;
	ticks: number;
	onTimeout: (() => void) | null;
	afkAction: string | null;
}

interface FletchStep {
	name: string;
	use: number;
	on: number;
	input: number;
	canDo: () => boolean;
}

type TotalKey = 'bars' | 'nails' | 'logs' | 'shafts' | 'flighted' | 'brutal';

export interface BrutalRunner {
	tick: () => void;
	describe: () => string;
}

export function createBrutalRunner(game: BrutalGame, settings: BrutalSettings): BrutalRunner {
	const SMITH = net.runelite.api.Skill.SMITHING;
	const FLETCH = net.runelite.api.Skill.FLETCHING;
	const WC = net.runelite.api.Skill.WOODCUTTING;
	const q = game.qty;

	const isProgressive = settings.mode === 'progressive';
	const phaseOrder: Phase[] = isProgressive ? [] : [settings.singlePhase];
	// Per-phase targets; Infinity = until materials run out (Single phase).
	let plan: Record<Phase, number> = { bars: Infinity, nails: Infinity, arrows: Infinity };
	let phaseIndex = -1;
	let phase: Phase | null = null;
	let state: State = 'start';
	let pending: PendingAction | null = null;
	let retries = 0;
	let delayTicks = 0;
	let idleTicks = 0;
	const startTime = Date.now();
	const startXp: Record<string, number> = {};
	let ticksSinceCounterUpdate = 0;
	let afkChance = 0;
	let afkCooldown = 0;
	let totalAfks = 0;
	let trips = 0;
	const totals: Record<TotalKey, number> = { bars: 0, nails: 0, logs: 0, shafts: 0, flighted: 0, brutal: 0 };
	const last: Record<string, number> = {};

	const randomInt = (min: number, max: number): number =>
		min + Math.floor(Math.random() * (Math.max(0, max - min) + 1));

	const accountSeed = (): number => {
		const name = game.getPlayerName();
		let seed = game.getTotalLevel() > 0 ? game.getTotalLevel() * 17 : 1337;
		for (let i = 0; i < name.length; i++) {
			seed = ((seed << 5) - seed + name.charCodeAt(i)) | 0;
		}
		return Math.abs(seed);
	};

	const reactionDelay = (): number => {
		const seed = accountSeed();
		if (settings.playStyle === 'lazy') {
			return Math.max(4, Math.min(16, 5 + (seed % 6) + randomInt(-1, 6)));
		}
		return Math.max(1, Math.min(4, 1 + (seed % 2) + randomInt(0, 1)));
	};

	// Rolled once per run so every run has a different AFK profile.
	const rollAfkChance = (): void => {
		afkChance =
			settings.playStyle === 'lazy' ? 0.006 + Math.random() * 0.014 : 0.002 + Math.random() * 0.008;
		game.log(`AFK chance this run: ${(afkChance * 100).toFixed(2)}% per busy tick.`);
	};

	// Only AFK while already busy (smelting, smithing, chopping, fletching, walking).
	const maybeAfk = (action: string): boolean => {
		if (!settings.randomAfk || afkCooldown > 0) return false;
		if (Math.random() >= afkChance) return false;
		const ticks = settings.playStyle === 'lazy' ? randomInt(10, 50) : randomInt(4, 20);
		totalAfks++;
		afkCooldown = randomInt(60, 200);
		game.log(`Going AFK for ${ticks} ticks (~${(ticks * 0.6).toFixed(1)}s) while ${action}.`);
		delayTicks = ticks;
		return true;
	};

	const microDelay = (minTicks: number, maxTicks: number): void => {
		const ticks = randomInt(minTicks, maxTicks);
		if (ticks > 0) delayTicks = ticks;
	};

	const trackGain = (key: TotalKey, id: number): void => {
		const current = q(id);
		const previous = last[key];
		if (previous !== undefined && current > previous) totals[key] += current - previous;
		last[key] = current;
	};

	const updateCounters = (): void => {
		const elapsedMs = Math.max(1, Date.now() - startTime);
		const elapsedHours = elapsedMs / 3600000;
		const perHour = (value: number): number =>
			elapsedHours > 0.002 ? Math.floor(value / elapsedHours) : 0;
		const xpGained = (skill: net.runelite.api.Skill): number => {
			const key = String(skill);
			const xp = game.getExperience(skill);
			if (startXp[key] === undefined && xp > 0) startXp[key] = xp;
			const start = startXp[key];
			return start ? xp - start : 0;
		};
		game.setCounter(settings.playStyle === 'lazy' ? 'Style [Lazy AFK]' : 'Style [Normal]', 1);
		game.setCounter('Phase (1 Bars / 2 Nails / 3 Arrows)', phase ? PHASES.indexOf(phase) + 1 : 0);
		game.setCounter('Smithing Level', game.getLevel(SMITH));
		game.setCounter('Fletching Level', game.getLevel(FLETCH));
		game.setCounter('Bars Made', totals.bars);
		game.setCounter('Nails Made', totals.nails);
		game.setCounter('Shafts Made', totals.shafts);
		game.setCounter('Flighted Made', totals.flighted);
		game.setCounter('Brutal Arrows Made', totals.brutal);
		game.setCounter('Smithing XP / hr', perHour(xpGained(SMITH)));
		game.setCounter('Fletch XP / hr', perHour(xpGained(FLETCH)));
		game.setCounter('WC XP / hr', perHour(xpGained(WC)));
		game.setCounter('Time (min)', Math.floor(elapsedMs / 60000));
		if (settings.randomAfk) game.setCounter('AFK Breaks', totalAfks);
	};

	const summary = (): string =>
		`Bars: ${totals.bars}, nails: ${totals.nails}, shafts: ${totals.shafts}, flighted: ${totals.flighted}, brutal: ${totals.brutal}.`;

	const stop = (reason: string): void => {
		state = 'stopped';
		pending = null;
		game.stopWebWalk();
		updateCounters();
		game.log(`${reason} ${summary()}`);
		game.gameMessage(reason);
		game.terminate();
	};

	// afkAction: allows an AFK while walking to the target.
	const wait = (
		label: string,
		action: () => void,
		check: () => boolean,
		done: () => void,
		ticks = 15,
		onTimeout: (() => void) | null = null,
		afkAction: string | null = null,
	): void => {
		pending = { label, check, done, ticks, onTimeout, afkAction };
		action();
	};

	const nextPhase = (reason?: string): void => {
		if (reason) game.log(reason);
		phaseIndex++;
		pending = null;
		idleTicks = 0;
		const next = phaseOrder[phaseIndex];
		if (!next) {
			stop('All phases finished.');
			return;
		}
		phase = next;
		const req = PHASE_LEVELS[next];
		const level = game.getLevel(req.skill === 'Smithing' ? SMITH : FLETCH);
		if (level < req.level) {
			game.log(`Warning: ${PHASE_NAMES[next]} needs ${req.skill} ${req.level} (you have ${level}).`);
		}
		game.log(`=== Phase ${PHASES.indexOf(next) + 1}: ${PHASE_NAMES[next]} ===`);
		state = next === 'bars' ? 'bars_armour' : next === 'nails' ? 'nails_bank' : 'arrows_prepare';
		updateCounters();
	};

	const openBank = (point: WorldPoint | null, boothId: number, placeName: string): void => {
		let bank: BankTarget | null = null;
		if (point && game.distanceTo(point) <= BANK_AREA_RADIUS) {
			const booth = game.findClosestObject([boothId]);
			if (booth) bank = { obj: booth, action: 'Bank' };
		} else if (!point) {
			bank = game.findAnyBank();
		}
		if (!bank) {
			if (!game.isWebWalking()) {
				game.log(`Walking to ${placeName} bank...`);
				if (point) game.webWalkTo(point);
				else game.webWalkToNearestBank();
			} else {
				maybeAfk('walking');
			}
			return;
		}
		game.stopWebWalk();
		const target = bank;
		wait(
			`open ${placeName} bank`,
			() => game.interactObject(target.obj, target.action),
			() => game.isBankOpen(),
			() => {
				retries = 0;
				microDelay(0, 1);
			},
			25,
			null,
			'walking to bank',
		);
	};

	const depositExcept = (keepIds: number[]): boolean => {
		const id = game.getInventoryIds().find((itemId) => keepIds.indexOf(itemId) === -1);
		if (id === undefined) return false;
		wait(
			`deposit item ${id}`,
			() => game.depositAllWithId(id),
			() => !game.hasItem(id),
			() => {
				retries = 0;
			},
			6,
		);
		return true;
	};

	const walkPhaseTo = (point: WorldPoint, label: string): void => {
		if (!game.isWebWalking()) {
			game.log(`${label} not found. Walking to ${point}...`);
			game.webWalkTo(point);
		} else {
			maybeAfk('walking');
		}
	};

	// Progressive plan: bank + inventory totals -> what must be made for N arrows.
	const tickPlan = (): void => {
		if (!game.isBankOpen()) {
			openBank(null, 0, 'nearest');
			return;
		}
		const have = (id: number): number => game.bankQty(id) + q(id);
		const target = settings.arrowTarget;
		const nailsToMake = Math.max(0, target - have(MITHRIL_NAILS_ID));
		const barsNeeded = Math.ceil(nailsToMake / NAILS_PER_BAR);
		const barsToMake = Math.max(0, barsNeeded - have(MITHRIL_BAR_ID));
		const feathersNeeded = FEATHERS_PER_ARROW * Math.max(0, target - have(FLIGHTED_OGRE_ARROW_ID));
		const shaftsReady = have(OGRE_SHAFTS_ID) + have(FLIGHTED_OGRE_ARROW_ID);
		const missing: string[] = [];
		const need = (name: string, amount: number, owned: number): void => {
			if (owned < amount) missing.push(`${name} (need ${amount}, have ${owned})`);
		};
		need('Mithril ore', barsToMake, have(MITHRIL_ORE_ID));
		need('Coal', barsToMake * COAL_PER_BAR, have(COAL_ID));
		if (barsToMake > 0) {
			need('Varrock armour 2', 1, game.isEquipped(VARROCK_ARMOUR_2_ID) ? 1 : have(VARROCK_ARMOUR_2_ID));
		}
		// Hammer is needed both to smith nails and to attach them to flighted arrows.
		need('Hammer', 1, have(HAMMER_ID));
		need('Knife', 1, have(KNIFE_ID));
		need('Feathers', feathersNeeded, have(FEATHER_ID));
		game.log(
			`Plan for ${target} brutal arrows: smelt ${barsToMake} bars (${barsToMake} ore, ${barsToMake * COAL_PER_BAR} coal), ` +
				`smith ${nailsToMake} nails (${barsNeeded} bars), ${feathersNeeded} feathers, ` +
				`chop ${Math.max(0, target - shaftsReady)} more shafts (have ${shaftsReady} shafts/flighted).`,
		);
		if (missing.length > 0) {
			stop(`Missing materials for ${target} arrows: ${missing.join(', ')}.`);
			return;
		}
		plan = { bars: barsToMake, nails: nailsToMake, arrows: target };
		if (barsToMake > 0) phaseOrder.push('bars');
		if (nailsToMake > 0) phaseOrder.push('nails');
		phaseOrder.push('arrows');
		game.log(`Phases: ${phaseOrder.map((p) => PHASE_NAMES[p]).join(' -> ')}`);
		nextPhase();
	};

	// Progressive: running out before the target stops the script. Single phase: normal end of the phase.
	const ranOut = (what: string, progress: string): void => {
		if (isProgressive) {
			stop(`Ran out of ${what} before the target (${progress}).`);
		} else {
			nextPhase(`Out of ${what}. Phase done (${progress}).`);
		}
	};

	const progressOf = (done: number, target: number, unit: string): string =>
		`${done}${isProgressive ? '/' + target : ''} ${unit}`;

	// Phase 1: Mithril bars
	const barsCanSmelt = (): boolean => q(MITHRIL_ORE_ID) > 0 && q(COAL_ID) >= COAL_PER_BAR;

	const tickBars = (): void => {
		switch (state) {
			case 'bars_armour': {
				if (game.isEquipped(VARROCK_ARMOUR_2_ID)) {
					state = barsCanSmelt() ? 'bars_furnace' : 'bars_bank';
					break;
				}
				if (game.hasItem(VARROCK_ARMOUR_2_ID)) {
					if (game.isBankOpen()) {
						game.closeBank();
						microDelay(1, 2);
						break;
					}
					game.log('Equipping Varrock armour 2...');
					wait(
						'wear Varrock armour 2',
						() => game.wearItem(VARROCK_ARMOUR_2_ID),
						() => game.isEquipped(VARROCK_ARMOUR_2_ID),
						() => {
							retries = 0;
							microDelay(1, 2);
						},
						6,
					);
					break;
				}
				if (!game.isBankOpen()) {
					openBank(EDGE_BANK_POINT, EDGE_BANK_BOOTH_ID, 'Edgeville');
					break;
				}
				if (game.bankQty(VARROCK_ARMOUR_2_ID) <= 0) {
					stop('Varrock armour 2 (13105) not equipped, not in inventory and not in bank.');
					break;
				}
				if (game.getEmptySlots() === 0) {
					game.depositAll();
					microDelay(1, 2);
					break;
				}
				wait(
					'withdraw Varrock armour 2',
					() => game.withdrawQuantity(VARROCK_ARMOUR_2_ID, 1),
					() => game.hasItem(VARROCK_ARMOUR_2_ID),
					() => {
						retries = 0;
					},
					6,
				);
				break;
			}

			case 'bars_bank': {
				if (!game.isEquipped(VARROCK_ARMOUR_2_ID)) {
					state = 'bars_armour';
					break;
				}
				if (!game.isBankOpen()) {
					openBank(EDGE_BANK_POINT, EDGE_BANK_BOOTH_ID, 'Edgeville');
					break;
				}
				if (depositExcept([MITHRIL_ORE_ID, COAL_ID])) break;
				const barsRemaining = plan.bars - totals.bars;
				if (barsRemaining <= 0) {
					game.depositAll();
					nextPhase(`Bars target reached (${totals.bars} bars).`);
					break;
				}
				const tripOre = Math.min(ORE_PER_TRIP, barsRemaining);
				const ore = q(MITHRIL_ORE_ID);
				const coal = q(COAL_ID);
				if (ore > tripOre) {
					wait(
						'deposit extra ore',
						() => game.depositAllWithId(MITHRIL_ORE_ID),
						() => !game.hasItem(MITHRIL_ORE_ID),
						() => {
							retries = 0;
						},
						6,
					);
					break;
				}
				if (ore < tripOre && game.bankQty(MITHRIL_ORE_ID) > 0) {
					wait(
						'withdraw Mithril ore',
						() => game.withdrawQuantity(MITHRIL_ORE_ID, tripOre - ore),
						() => q(MITHRIL_ORE_ID) > ore,
						() => {
							retries = 0;
							microDelay(0, 1);
						},
						6,
					);
					break;
				}
				if (coal < ore * COAL_PER_BAR && game.bankQty(COAL_ID) > 0 && game.getEmptySlots() > 0) {
					wait(
						'withdraw Coal',
						() => game.withdrawAll(COAL_ID),
						() => q(COAL_ID) > coal,
						() => {
							retries = 0;
							microDelay(0, 1);
						},
						6,
					);
					break;
				}
				if (!barsCanSmelt()) {
					game.depositAll();
					ranOut('Mithril ore / Coal', progressOf(totals.bars, plan.bars, 'bars'));
					break;
				}
				trips++;
				game.log(`Bars trip ${trips}: ${ore} ore, ${coal} coal. Heading to the furnace.`);
				game.closeBank();
				microDelay(0, settings.playStyle === 'lazy' ? 3 : 1);
				state = 'bars_furnace';
				break;
			}

			case 'bars_furnace': {
				if (!barsCanSmelt()) {
					state = 'bars_bank';
					break;
				}
				if (game.isWidgetVisible(MAKE_WIDGET_ID)) {
					state = 'bars_menu';
					break;
				}
				const furnace = game.findClosestObject([FURNACE_ID]);
				if (!furnace) {
					walkPhaseTo(FURNACE_POINT, 'Furnace');
					break;
				}
				game.stopWebWalk();
				wait(
					'click Furnace',
					() => game.interactObject(furnace, 'Smelt'),
					() => game.isWidgetVisible(MAKE_WIDGET_ID),
					() => {
						retries = 0;
						if (settings.playStyle === 'lazy') microDelay(0, 2);
						state = 'bars_menu';
					},
					25,
					null,
					'walking to furnace',
				);
				break;
			}

			case 'bars_menu': {
				if (!game.isWidgetVisible(MAKE_WIDGET_ID)) {
					state = 'bars_furnace';
					break;
				}
				wait(
					'click Smelt Mithril bar',
					() => game.clickWidget(MAKE_WIDGET_ID),
					() => !game.isWidgetVisible(MAKE_WIDGET_ID),
					() => {
						retries = 0;
						idleTicks = 0;
						last['ore'] = q(MITHRIL_ORE_ID);
						state = 'bars_smelting';
					},
					8,
					() => {
						state = 'bars_furnace';
					},
				);
				break;
			}

			case 'bars_smelting': {
				if (!barsCanSmelt()) {
					const delay = reactionDelay();
					game.log(`Smelted all ore. Total bars: ${totals.bars}. Waiting ${delay} ticks before banking.`);
					delayTicks = delay;
					idleTicks = 0;
					state = 'bars_bank';
					break;
				}
				const oreLeft = q(MITHRIL_ORE_ID);
				if (oreLeft < (last['ore'] ?? oreLeft)) {
					last['ore'] = oreLeft;
					idleTicks = 0;
					if (maybeAfk('smelting')) break;
				} else if (game.isAnimating(SMELT_ANIMATIONS)) {
					idleTicks = 0;
				} else {
					idleTicks++;
				}
				game.handleDialogue();
				if (idleTicks > 8) {
					game.log(`Smelting interrupted (${oreLeft} ore left). Restarting...`);
					idleTicks = 0;
					state = 'bars_furnace';
				}
				break;
			}

			default:
				break;
		}
	};

	// Phase 2: Mithril nails
	const tickNails = (): void => {
		switch (state) {
			case 'nails_bank': {
				if (!game.isBankOpen()) {
					openBank(VARROCK_BANK_POINT, VARROCK_BANK_BOOTH_ID, 'Varrock West');
					break;
				}
				if (depositExcept([HAMMER_ID, MITHRIL_BAR_ID])) break;
				if (!game.hasItem(HAMMER_ID)) {
					if (game.bankQty(HAMMER_ID) <= 0) {
						stop('No Hammer (2347) in inventory or bank.');
						break;
					}
					wait(
						'withdraw Hammer',
						() => game.withdrawQuantity(HAMMER_ID, 1),
						() => game.hasItem(HAMMER_ID),
						() => {
							retries = 0;
							microDelay(0, 1);
						},
						6,
					);
					break;
				}
				const nailsRemaining = plan.nails - totals.nails;
				if (nailsRemaining <= 0) {
					if (game.hasItem(MITHRIL_BAR_ID)) {
						game.depositAllWithId(MITHRIL_BAR_ID);
						microDelay(1, 2);
						break;
					}
					nextPhase(`Nails target reached (${totals.nails} nails).`);
					break;
				}
				const bars = q(MITHRIL_BAR_ID);
				const barsWanted = Math.ceil(nailsRemaining / NAILS_PER_BAR);
				if (bars > barsWanted) {
					wait(
						'deposit extra bars',
						() => game.depositAllWithId(MITHRIL_BAR_ID),
						() => !game.hasItem(MITHRIL_BAR_ID),
						() => {
							retries = 0;
						},
						6,
					);
					break;
				}
				if (bars < barsWanted && game.getEmptySlots() > 0 && game.bankQty(MITHRIL_BAR_ID) > 0) {
					const take = Math.min(barsWanted - bars, game.getEmptySlots());
					wait(
						'withdraw Mithril bars',
						() => (isProgressive ? game.withdrawQuantity(MITHRIL_BAR_ID, take) : game.withdrawAll(MITHRIL_BAR_ID)),
						() => q(MITHRIL_BAR_ID) > bars,
						() => {
							retries = 0;
							microDelay(0, 1);
						},
						6,
					);
					break;
				}
				if (bars === 0) {
					ranOut('Mithril bars', progressOf(totals.nails, plan.nails, 'nails'));
					break;
				}
				trips++;
				game.log(`Nails trip ${trips}: ${bars} bars. Heading to the anvil.`);
				game.closeBank();
				microDelay(0, settings.playStyle === 'lazy' ? 3 : 1);
				state = 'nails_anvil';
				break;
			}

			case 'nails_anvil': {
				if (!game.hasItem(MITHRIL_BAR_ID) || !game.hasItem(HAMMER_ID)) {
					state = 'nails_bank';
					break;
				}
				if (game.isWidgetVisible(SMITH_NAILS_WIDGET_ID)) {
					state = 'nails_menu';
					break;
				}
				const anvil = game.findClosestObject([ANVIL_ID]);
				if (!anvil) {
					walkPhaseTo(ANVIL_POINT, 'Anvil');
					break;
				}
				game.stopWebWalk();
				wait(
					'click Anvil',
					() => game.interactObject(anvil, 'Smith'),
					() => game.isWidgetVisible(SMITH_NAILS_WIDGET_ID),
					() => {
						retries = 0;
						if (settings.playStyle === 'lazy') microDelay(0, 2);
						state = 'nails_menu';
					},
					25,
					null,
					'walking to anvil',
				);
				break;
			}

			case 'nails_menu': {
				if (!game.isWidgetVisible(SMITH_NAILS_WIDGET_ID)) {
					state = 'nails_anvil';
					break;
				}
				wait(
					'click Smith set Mithril nails',
					() => game.clickWidget(SMITH_NAILS_WIDGET_ID),
					() => !game.isWidgetVisible(SMITH_NAILS_WIDGET_ID),
					() => {
						retries = 0;
						idleTicks = 0;
						last['barsLeft'] = q(MITHRIL_BAR_ID);
						state = 'nails_smithing';
					},
					8,
					() => {
						state = 'nails_anvil';
					},
				);
				break;
			}

			case 'nails_smithing': {
				const barsLeft = q(MITHRIL_BAR_ID);
				if (barsLeft === 0) {
					const delay = reactionDelay();
					game.log(`Smithed all bars. Total nails: ${totals.nails}. Waiting ${delay} ticks before banking.`);
					delayTicks = delay;
					idleTicks = 0;
					state = 'nails_bank';
					break;
				}
				if (barsLeft < (last['barsLeft'] ?? barsLeft)) {
					last['barsLeft'] = barsLeft;
					idleTicks = 0;
					if (maybeAfk('smithing')) break;
				} else if (game.isAnimating(SMITH_ANIMATIONS)) {
					idleTicks = 0;
				} else {
					idleTicks++;
				}
				game.handleDialogue();
				if (idleTicks > 7) {
					game.log(`Smithing interrupted (${barsLeft} bars left). Restarting...`);
					idleTicks = 0;
					state = 'nails_anvil';
				}
				break;
			}

			default:
				break;
		}
	};

	// Phase 3: Brutal arrows
	let fletchThreshold = 0;
	const rollFletchThreshold = (): void => {
		fletchThreshold = randomInt(settings.minFreeSlots, settings.maxFreeSlots);
	};

	// Fletch chain: logs -> shafts -> flighted -> brutal. "input" is the item consumed by each action.
	const STEPS: FletchStep[] = [
		{
			name: 'Ogre arrow shafts',
			use: KNIFE_ID,
			on: ACHEY_LOGS_ID,
			input: ACHEY_LOGS_ID,
			canDo: () => q(ACHEY_LOGS_ID) > 0,
		},
		{
			name: 'Flighted ogre arrows',
			use: FEATHER_ID,
			on: OGRE_SHAFTS_ID,
			input: OGRE_SHAFTS_ID,
			canDo: () => q(FEATHER_ID) >= FEATHERS_PER_ARROW && q(OGRE_SHAFTS_ID) > 0,
		},
		{
			name: 'Mithril brutal arrows',
			use: MITHRIL_NAILS_ID,
			on: FLIGHTED_OGRE_ARROW_ID,
			input: FLIGHTED_OGRE_ARROW_ID,
			canDo: () => game.hasItem(HAMMER_ID) && q(MITHRIL_NAILS_ID) > 0 && q(FLIGHTED_OGRE_ARROW_ID) > 0,
		},
	];
	const SHAFTS_STEP = STEPS[0] as FletchStep;
	const FLIGHTED_STEP = STEPS[1] as FletchStep;
	let step: FletchStep = SHAFTS_STEP;
	let walkRestarts = 0;
	let bestWalkDistance = 9999;
	let lastInputCount = 0;
	const nextStep = (): FletchStep | null => STEPS.find((s) => s.canDo()) ?? null;

	const arrowsRemaining = (): number => plan.arrows - totals.brutal;
	const targetReached = (): boolean => arrowsRemaining() <= 0;
	// Nothing left can become a brutal arrow.
	const arrowsFinished = (): boolean =>
		targetReached() ||
		!game.hasItem(HAMMER_ID) ||
		q(MITHRIL_NAILS_ID) === 0 ||
		(q(FEATHER_ID) < FEATHERS_PER_ARROW && q(FLIGHTED_OGRE_ARROW_ID) === 0);
	// Enough shafts/flighted for the remaining arrows: stop chopping.
	const enoughShafts = (): boolean =>
		q(OGRE_SHAFTS_ID) + q(FLIGHTED_OGRE_ARROW_ID) >= Math.min(q(MITHRIL_NAILS_ID), arrowsRemaining());
	const shouldFletch = (): boolean =>
		q(ACHEY_LOGS_ID) > 0 && (game.getEmptySlots() <= fletchThreshold || enoughShafts());
	const trackArrows = (): void => {
		trackGain('logs', ACHEY_LOGS_ID);
		trackGain('shafts', OGRE_SHAFTS_ID);
		if (step === FLIGHTED_STEP) trackGain('flighted', FLIGHTED_OGRE_ARROW_ID);
		else last['flighted'] = q(FLIGHTED_OGRE_ARROW_ID);
		trackGain('brutal', MITHRIL_BRUTAL_ID);
	};

	const tickArrows = (): void => {
		switch (state) {
			case 'arrows_prepare': {
				// Progressive takes only what the remaining arrows need; Single phase takes everything.
				// Existing shafts/flighted count, so only the missing shafts get chopped.
				const remaining = arrowsRemaining();
				const flightedWant = isProgressive ? remaining : Infinity;
				const shaftsWant = isProgressive ? Math.max(0, remaining - q(FLIGHTED_OGRE_ARROW_ID)) : Infinity;
				const nailsWant = isProgressive ? remaining : Infinity;
				const feathersWant = isProgressive
					? FEATHERS_PER_ARROW * Math.max(0, remaining - q(FLIGHTED_OGRE_ARROW_ID))
					: Infinity;
				const needsFeathers = isProgressive ? feathersWant > 0 : q(FLIGHTED_OGRE_ARROW_ID) === 0;
				const hasFeathers =
					!needsFeathers ||
					q(FEATHER_ID) >= Math.min(feathersWant, FEATHERS_PER_ARROW * Math.max(1, q(OGRE_SHAFTS_ID)));
				const ready =
					game.hasItem(KNIFE_ID) &&
					game.hasItem(HAMMER_ID) &&
					q(MITHRIL_NAILS_ID) > 0 &&
					(!isProgressive || q(MITHRIL_NAILS_ID) >= nailsWant) &&
					(isProgressive ? !needsFeathers || q(FEATHER_ID) >= feathersWant : hasFeathers);
				if (ready && !game.isBankOpen()) {
					rollFletchThreshold();
					idleTicks = 0;
					if (enoughShafts()) {
						game.log(
							`Already have ${q(OGRE_SHAFTS_ID)} shafts / ${q(FLIGHTED_OGRE_ARROW_ID)} flighted - no chopping needed, fletching here.`,
						);
						state = 'arrows_chopping';
					} else {
						state = 'arrows_location';
					}
					break;
				}
				if (!game.isBankOpen()) {
					openBank(null, 0, 'nearest');
					break;
				}
				const keep = [
					KNIFE_ID,
					HAMMER_ID,
					FEATHER_ID,
					MITHRIL_NAILS_ID,
					OGRE_SHAFTS_ID,
					FLIGHTED_OGRE_ARROW_ID,
					MITHRIL_BRUTAL_ID,
				];
				if (depositExcept(keep)) break;
				// Flighted first: they reduce how many shafts and feathers are needed.
				const needs: Array<[number, string, number]> = [
					[KNIFE_ID, 'Knife', 1],
					[HAMMER_ID, 'Hammer', 1],
					[MITHRIL_NAILS_ID, 'Mithril nails', nailsWant],
					[FLIGHTED_OGRE_ARROW_ID, 'Flighted ogre arrows', flightedWant],
					[OGRE_SHAFTS_ID, 'Ogre arrow shafts', shaftsWant],
					[FEATHER_ID, 'Feathers', feathersWant],
				];
				const missingItem = needs.find(([id, , want]) => q(id) < want && game.bankQty(id) > 0);
				if (missingItem) {
					const [id, name, want] = missingItem;
					const before = q(id);
					wait(
						`withdraw ${name}`,
						() => (want === Infinity ? game.withdrawAll(id) : game.withdrawQuantity(id, want - before)),
						() => q(id) > before,
						() => {
							retries = 0;
							microDelay(0, 1);
						},
						6,
					);
					break;
				}
				if (!game.hasItem(KNIFE_ID)) {
					stop('No Knife (946) in inventory or bank.');
					break;
				}
				if (!game.hasItem(HAMMER_ID)) {
					stop('No Hammer (2347) in inventory or bank - needed to add nails to flighted arrows.');
					break;
				}
				if (q(MITHRIL_NAILS_ID) === 0) {
					stop('No Mithril nails to make brutal arrows.');
					break;
				}
				if (isProgressive && q(MITHRIL_NAILS_ID) < nailsWant) {
					stop(`Missing Mithril nails: need ${nailsWant}, have ${q(MITHRIL_NAILS_ID)}.`);
					break;
				}
				if (isProgressive && q(FEATHER_ID) < feathersWant) {
					stop(`Missing Feathers: need ${feathersWant}, have ${q(FEATHER_ID)}.`);
					break;
				}
				if (!isProgressive && !hasFeathers) {
					stop('Not enough Feathers (314) to make brutal arrows.');
					break;
				}
				game.log(
					`Arrow supplies: ${q(MITHRIL_NAILS_ID)} nails, ${q(FEATHER_ID)} feathers, ${q(OGRE_SHAFTS_ID)} shafts, ${q(FLIGHTED_OGRE_ARROW_ID)} flighted.`,
				);
				game.closeBank();
				microDelay(1, 2);
				break;
			}

			case 'arrows_location': {
				const distance = game.distanceTo(ACHEY_AREA);
				const nearArea = distance <= ACHEY_AREA_RADIUS;
				if (!nearArea || (!game.findClosestObject([ACHEY_TREE_ID]) && distance > ARRIVED_RADIUS)) {
					game.log(`Not at Achey trees (distance ${distance}). Walking to ${ACHEY_AREA}...`);
					game.webWalkTo(ACHEY_AREA);
					walkRestarts = 0;
					bestWalkDistance = distance;
					state = 'arrows_walking';
					break;
				}
				idleTicks = 0;
				state = 'arrows_chopping';
				break;
			}

			case 'arrows_walking': {
				if (game.distanceTo(ACHEY_AREA) <= ARRIVED_RADIUS) {
					game.log('Arrived at Achey tree area.');
					game.stopWebWalk();
					microDelay(1, 2);
					idleTicks = 0;
					state = 'arrows_chopping';
					break;
				}
				if (!game.isWebWalking()) {
					// WebWalk stopped early: retry, but give up if there is no progress.
					const dist = game.distanceTo(ACHEY_AREA);
					if (dist < bestWalkDistance - 5) {
						bestWalkDistance = dist;
						walkRestarts = 0;
					}
					if (++walkRestarts > 5) {
						stop(`WebWalk could not reach Achey trees (stuck at distance ${dist}, ${game.playerLocation()}).`);
						break;
					}
					game.log(`WebWalk stopped at distance ${dist}. Restarting (${walkRestarts}/5)...`);
					game.webWalkTo(ACHEY_AREA);
					delayTicks = 2;
					break;
				}
				maybeAfk('walking');
				break;
			}

			case 'arrows_chopping': {
				trackArrows();
				game.handleDialogue();
				if (arrowsFinished() || (enoughShafts() && q(ACHEY_LOGS_ID) === 0)) {
					if (!targetReached() && nextStep()) {
						state = 'arrows_fletch_start';
						break;
					}
					if (arrowsFinished()) {
						if (targetReached()) {
							nextPhase(`Target reached: ${totals.brutal} Mithril brutal arrows.`);
						} else {
							const lacking = !game.hasItem(HAMMER_ID)
								? 'Hammer'
								: q(MITHRIL_NAILS_ID) === 0
									? 'Mithril nails'
									: 'Feathers';
							ranOut(lacking, progressOf(totals.brutal, plan.arrows, 'brutal arrows'));
						}
						break;
					}
				}
				if (shouldFletch()) {
					microDelay(0, settings.playStyle === 'lazy' ? 4 : 2);
					state = 'arrows_fletch_start';
					break;
				}
				if (game.getEmptySlots() === 0) {
					stop('Inventory is full with no Achey logs. Clear some space.');
					break;
				}
				const chopping = game.isAnimating(CHOP_ANIMATIONS);
				if (chopping || game.isMoving()) {
					idleTicks = 0;
					if (chopping) maybeAfk('chopping');
					break;
				}
				if (game.distanceTo(ACHEY_AREA) > ACHEY_AREA_RADIUS) {
					state = 'arrows_location';
					break;
				}
				if (++idleTicks < 2) break;
				const tree = game.findClosestObject([ACHEY_TREE_ID]);
				if (!tree) {
					if (game.distanceTo(ACHEY_AREA) > ARRIVED_RADIUS) {
						state = 'arrows_location';
						break;
					}
					if (idleTicks % 15 === 0) game.log('Waiting for Achey trees to respawn...');
					if (idleTicks > 5 && q(ACHEY_LOGS_ID) > 0) state = 'arrows_fletch_start';
					break;
				}
				const logsBefore = q(ACHEY_LOGS_ID);
				wait(
					'chop Achey tree',
					() => game.interactObject(tree, 'Chop'),
					() => game.isAnimating(CHOP_ANIMATIONS) || q(ACHEY_LOGS_ID) > logsBefore,
					() => {
						retries = 0;
						idleTicks = 0;
					},
					12,
					() => {
						idleTicks = 0;
					},
				);
				break;
			}

			case 'arrows_fletch_start': {
				const next = nextStep();
				if (!next) {
					state = 'arrows_chopping';
					break;
				}
				step = next;
				if (game.isWidgetVisible(MAKE_WIDGET_ID)) {
					state = 'arrows_make_menu';
					break;
				}
				if (step.use === KNIFE_ID && q(ACHEY_LOGS_ID) === 0) {
					state = 'arrows_chopping';
					break;
				}
				if (game.isItemSelected()) {
					game.clearSelectedItem();
					microDelay(1, 1);
					break;
				}
				const current = step;
				game.log(
					`Using ${ITEM_NAMES[current.use] ?? current.use} on ${ITEM_NAMES[current.on] ?? current.on} -> ${current.name}.`,
				);
				wait(
					`use item for ${current.name}`,
					() => game.useItemOnItem(current.use, current.on),
					() => game.isWidgetVisible(MAKE_WIDGET_ID),
					() => {
						retries = 0;
						if (settings.playStyle === 'lazy') microDelay(0, 2);
						state = 'arrows_make_menu';
					},
					10,
				);
				break;
			}

			case 'arrows_make_menu': {
				if (!game.isWidgetVisible(MAKE_WIDGET_ID)) {
					state = 'arrows_fletch_start';
					break;
				}
				wait(
					`click Make ${step.name}`,
					() => game.clickWidget(MAKE_WIDGET_ID),
					() => !game.isWidgetVisible(MAKE_WIDGET_ID),
					() => {
						retries = 0;
						idleTicks = 0;
						lastInputCount = q(step.input);
						state = 'arrows_fletching';
					},
					8,
					() => {
						state = 'arrows_fletch_start';
					},
				);
				break;
			}

			case 'arrows_fletching': {
				trackArrows();
				if (targetReached()) {
					state = 'arrows_chopping';
					break;
				}
				if (!step.canDo()) {
					updateCounters();
					const following = nextStep();
					// Continue the chain directly unless the next step is making shafts from new logs.
					if (following && following !== SHAFTS_STEP) {
						game.log(`Finished ${step.name}. Next: ${following.name}.`);
						microDelay(1, settings.playStyle === 'lazy' ? 4 : 2);
						idleTicks = 0;
						state = 'arrows_fletch_start';
						break;
					}
					const delay = reactionDelay();
					game.log(`Fletching done. ${summary()} Nails left: ${q(MITHRIL_NAILS_ID)}.`);
					delayTicks = delay;
					rollFletchThreshold();
					idleTicks = 0;
					state = 'arrows_chopping';
					break;
				}
				const inputLeft = q(step.input);
				if (inputLeft < lastInputCount) {
					lastInputCount = inputLeft;
					idleTicks = 0;
					if (maybeAfk('fletching')) break;
				} else {
					idleTicks++;
				}
				game.handleDialogue();
				if (idleTicks > 6) {
					game.log(`${step.name} interrupted (${inputLeft} left). Restarting...`);
					idleTicks = 0;
					state = 'arrows_fletch_start';
				}
				break;
			}

			default:
				break;
		}
	};

	const tick = (): void => {
		if (state === 'stopped' || !game.isLoggedIn()) return;
		if (delayTicks > 0) {
			delayTicks--;
			return;
		}
		if (afkCooldown > 0) afkCooldown--;
		if (++ticksSinceCounterUpdate >= 5) {
			ticksSinceCounterUpdate = 0;
			updateCounters();
		}
		if (pending) {
			const action = pending;
			if (action.check()) {
				pending = null;
				action.done();
			} else if (action.afkAction && game.isMoving() && maybeAfk(action.afkAction)) {
				return;
			} else if (--action.ticks <= 0) {
				pending = null;
				game.log(`Action timed out: ${action.label}. Retrying...`);
				if (++retries > 3) {
					stop(`Failed repeatedly on action: ${action.label}.`);
					return;
				}
				if (action.onTimeout) action.onTimeout();
			}
			return;
		}

		if (phase === 'bars') trackGain('bars', MITHRIL_BAR_ID);
		if (phase === 'nails') trackGain('nails', MITHRIL_NAILS_ID);

		if (state === 'start') {
			rollAfkChance();
			if (isProgressive) {
				game.log(`Progressive mode: ${settings.arrowTarget} Mithril brutal arrows. Checking bank...`);
				state = 'plan';
			} else {
				game.log(`Single phase mode: ${PHASE_NAMES[settings.singlePhase]} until out of materials.`);
				nextPhase();
			}
			return;
		}
		if (state === 'plan') tickPlan();
		else if (phase === 'bars') tickBars();
		else if (phase === 'nails') tickNails();
		else if (phase === 'arrows') tickArrows();
	};

	// Diagnoses external stops (Stop button, WebWalker, etc.).
	const describe = (): string =>
		`phase=${phase ?? '-'}, state=${state}, at ${game.playerLocation()}, webWalking=${game.isWebWalking()}, ${summary()}`;

	return { tick, describe };
}
