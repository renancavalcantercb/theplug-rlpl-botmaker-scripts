/**
 * Port of FarmingObservation.java — regular trees and fruit trees.
 *
 * Maturity stays an estimate until the patch is revisited: the varbit says
 * which growth stage a tree is in, never when it entered it. So an
 * observation carries a window (earliest/latest) rather than a timestamp,
 * and "due" means "the upper bound has passed, go look" — not "it is ready".
 *
 * The two kinds decode differently. Regular trees get one value range per
 * species per condition; fruit trees get a 27-value block per species where
 * the offset inside the block is the condition.
 */

import { type FruitSpecies, fruitFromRaw } from './fruit.js';
import { type TreeSpecies, treeFromRaw, sick, WILLOW } from './trees.js';

export const CYCLE_SECONDS = 2400;

export const State = {
	WEEDS: 'Weeds',
	EMPTY: 'Empty',
	GROWING: 'growing',
	DISEASED: 'diseased',
	DEAD: 'dead',
	CHECK_HEALTH: 'check health',
	CHECKED: 'health checked',
	STUMP: 'stump',
	HARVEST: 'fruit ready',
	UNKNOWN: 'Unsupported state',
} as const;

export type StateName = (typeof State)[keyof typeof State];

export interface Observation {
	readonly fruit: boolean;
	readonly raw: number;
	readonly state: StateName;
	readonly tree: TreeSpecies | null;
	readonly fruitTree: FruitSpecies | null;
	/** Species identity, shared across both kinds, for "same crop" checks. */
	readonly crop: string | null;
	readonly growthStage: number;
	readonly label: string;
	readonly observedAt: number;
	readonly earliestReadyAt: number;
	readonly latestReadyAt: number;
}

const treeState = (raw: number, tree: TreeSpecies | null): StateName => {
	if (raw >= 0 && raw <= 2) return State.WEEDS;
	if (raw === 3) return State.EMPTY;
	if (tree === null) return State.UNKNOWN;
	if (raw < tree.check && raw >= tree.start) return State.GROWING;
	if (raw === tree.check) return State.CHECK_HEALTH;
	if (raw === tree.check + 2) return State.STUMP;
	if (raw === tree.check + 1 || (tree === WILLOW && raw >= 192 && raw <= 197)) return State.CHECKED;
	return sick(tree, raw, tree.diseased) ? State.DISEASED : State.DEAD;
};

/** Port of FarmingFruitTree.state — offset inside the species block. */
const fruitState = (raw: number, fruit: FruitSpecies | null): StateName => {
	if (raw >= 0 && raw <= 2) return State.WEEDS;
	if (fruit === null) {
		if (raw === 3) return State.EMPTY;
		return raw >= 0 && raw <= 255 ? State.WEEDS : State.UNKNOWN;
	}
	const stage = raw - fruit.start;
	if (stage < 6) return State.GROWING;
	if (stage === 6) return State.CHECKED;
	if (stage <= 12) return State.HARVEST;
	if (stage <= 18) return State.DISEASED;
	if (stage <= 24) return State.DEAD;
	return stage === 25 ? State.STUMP : State.CHECK_HEALTH;
};

const build = (
	fruit: boolean,
	raw: number,
	observedAt: number,
	earliestReadyAt: number,
	latestReadyAt: number,
): Observation => {
	const tree = fruit ? null : treeFromRaw(raw);
	const fruitTree = fruit ? fruitFromRaw(raw) : null;
	const state = fruit ? fruitState(raw, fruitTree) : treeState(raw, tree);

	let growthStage = -1;
	if (fruit) {
		if (fruitTree !== null && state === State.GROWING) growthStage = raw - fruitTree.start;
	} else if (tree !== null && raw >= tree.start && raw < tree.check) {
		growthStage = raw - tree.start;
	}

	const crop = fruit ? (fruitTree === null ? null : fruitTree.name) : (tree === null ? null : tree.name);
	const speciesLabel = fruit ? fruitTree?.label : tree?.label;

	return {
		fruit,
		raw,
		state,
		tree,
		fruitTree,
		crop,
		growthStage,
		label: speciesLabel === undefined ? state : speciesLabel + ' ' + state,
		observedAt,
		earliestReadyAt,
		latestReadyAt,
	};
};

const speciesOf = (observation: Observation): { cycles: number; cycleSeconds: number } | null =>
	observation.fruit ? observation.fruitTree : observation.tree;

const cyclesOf = (observation: Observation): number => speciesOf(observation)?.cycles ?? 0;

const cycleSecondsOf = (observation: Observation): number =>
	speciesOf(observation)?.cycleSeconds ?? CYCLE_SECONDS;

/**
 * `continuous` narrows the window when two samples are seconds apart — the
 * stage boundary observed live is worth more than the opening estimate.
 * Across a revisit hours later it never applies, which is why the runner
 * passes false.
 */
export const observe = (
	fruit: boolean,
	raw: number,
	now: number,
	previous: Observation | null = null,
	continuous = false,
): Observation => {
	const base = build(fruit, raw, now, 0, 0);
	if (base.state !== State.GROWING) return base;

	const cycles = cyclesOf(base);
	const seconds = cycleSecondsOf(base);
	if (cycles === 0) return base;

	const remaining = cycles - base.growthStage;
	let earliest = now + (remaining - 1) * seconds;
	let latest = now + remaining * seconds;

	if (
		continuous &&
		previous !== null &&
		previous.state === State.GROWING &&
		base.fruit === previous.fruit &&
		base.crop === previous.crop &&
		now >= previous.observedAt &&
		now - previous.observedAt <= 2 &&
		(base.growthStage === previous.growthStage || base.growthStage === previous.growthStage + 1)
	) {
		const lower = Math.max(earliest, previous.earliestReadyAt);
		const upper = Math.min(latest, previous.latestReadyAt);
		if (lower <= upper) {
			earliest = lower;
			latest = upper;
		}
	}

	return build(fruit, raw, now, earliest, latest);
};

/** Due means "the estimate expired, go confirm", never "the tree is ready". */
export const isDue = (observation: Observation, now: number): boolean =>
	observation.state === State.GROWING &&
	observation.latestReadyAt > 0 &&
	now >= observation.latestReadyAt;

/** Port of FarmingVisitPlanner.needsWork — every state that is a job to do. */
export const needsWork = (observation: Observation): boolean => {
	switch (observation.state) {
		case State.WEEDS:
		case State.EMPTY:
		case State.DISEASED:
		case State.DEAD:
		case State.CHECK_HEALTH:
		case State.CHECKED:
		case State.STUMP:
		case State.HARVEST: {
			return true;
		}
		default: {
			return false;
		}
	}
};

/**
 * Only a GROWING patch whose window has not expired can be skipped. Anything
 * else — weeds, empty, check-health, harvestable, dead, unreadable, never
 * seen — is work and gets a visit.
 */
export const needsVisit = (observation: Observation | null, now: number): boolean =>
	observation === null || isDue(observation, now) || needsWork(observation);

export const encode = (observation: Observation): string =>
	(observation.fruit ? 'F1:' : 'T1:') +
	observation.raw +
	':' +
	observation.observedAt +
	':' +
	observation.earliestReadyAt +
	':' +
	observation.latestReadyAt;

export const decode = (stored: string, now: number): Observation | null => {
	if (stored === '') return null;
	const fields = stored.split(':');
	// Never reinterpret a value written by another version of this format.
	if (fields.length !== 5) return null;
	const marker = fields[0];
	if (marker !== 'T1' && marker !== 'F1') return null;

	// Digits-only beats a NaN check: it is the ES3-safe equivalent of the
	// NumberFormatException the Java version catches, and every field here is
	// a non-negative integer by construction.
	const digits = /^\d+$/;
	for (let index = 1; index < 5; index = index + 1) {
		const field = fields[index];
		if (field === undefined || !digits.test(field)) return null;
	}

	const raw = Number(fields[1]);
	const observedAt = Number(fields[2]);
	const earliestReadyAt = Number(fields[3]);
	const latestReadyAt = Number(fields[4]);
	if (raw > 255) return null;
	// A reading from the future is a clock change, not an observation.
	if (observedAt <= 0 || observedAt > now) return null;
	if (latestReadyAt < earliestReadyAt) return null;

	const result = build(marker === 'F1', raw, observedAt, earliestReadyAt, latestReadyAt);
	if (result.state === State.GROWING) {
		const cycles = cyclesOf(result);
		if (cycles === 0) return null;
		if (earliestReadyAt < observedAt) return null;
		if (latestReadyAt - observedAt > cycles * cycleSecondsOf(result)) return null;
	} else if (earliestReadyAt !== 0 || latestReadyAt !== 0) {
		return null;
	}
	return result;
};

export const describeWait = (seconds: number): string => {
	if (seconds <= 0) return 'due';
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	return hours > 0 ? hours + 'h' + minutes + 'm' : minutes + 'm';
};
