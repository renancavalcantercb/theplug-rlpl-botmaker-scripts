/**
 * Port of FarmingSupplyPlan.java — pure, so it stays testable outside the game.
 *
 * One preparation per run. The plan never replenishes between patches: it
 * decides, once, what the bag must hold for every enabled patch, and emits one
 * step at a time so each bank mutation can be confirmed by an inventory delta
 * before the next is issued.
 */

import { type Inventory, ITEM, type Species } from './policy.js';
import type { TreePatch } from './patches.js';

export const RUNES = [556, 554, 557, 555, 563];
/** Reserve 25 removal fees per patch: removal is 200, the rest is paid travel. */
export const COINS_PER_PATCH = 200 * 25;

export const Kind = {
	DEPOSIT: 'DEPOSIT',
	WITHDRAW: 'WITHDRAW',
	READY: 'READY',
	BLOCKED: 'BLOCKED',
} as const;

export type KindName = (typeof Kind)[keyof typeof Kind];

export interface Step {
	readonly kind: KindName;
	readonly item: number;
	readonly amount: number;
	/** The id that must appear in the bag: the note when withdrawing noted. */
	readonly received: number;
	readonly noted: boolean;
	readonly message: string;
}

interface Required {
	readonly item: number;
	readonly note: number;
	readonly amount: number;
	readonly name: string;
	readonly withdrawNoted: boolean;
}

export interface SupplyPlan {
	readonly patches: number;
	readonly levelRequired: number;
	readonly spaceReserve: number;
	readonly runeTarget: number;
	readonly required: readonly Required[];
	readonly saplings: readonly Required[];
	/** Changes whenever the run's shape changes, which resets preparation. */
	readonly key: string;
}

export interface PlanInput {
	readonly patches: readonly TreePatch[];
	readonly speciesFor: (patch: TreePatch) => Species;
	readonly protectFor: (patch: TreePatch) => boolean;
	readonly runeReserve: number;
}

const required = (
	item: number,
	note: number,
	amount: number,
	name: string,
	withdrawNoted: boolean,
): Required => ({ item, note, amount, name, withdrawNoted });

export const buildPlan = (input: PlanInput): SupplyPlan => {
	const list: Required[] = [];
	const saplings: Required[] = [];
	const counts: { species: Species; fruit: boolean; amount: number }[] = [];
	let sites = '';
	let levelRequired = 0;

	const addRequired = (added: Required): void => {
		for (let index = 0; index < list.length; index = index + 1) {
			const existing = list[index];
			if (
				existing !== undefined &&
				existing.item === added.item &&
				existing.withdrawNoted === added.withdrawNoted
			) {
				list[index] = required(
					existing.item,
					existing.note,
					existing.amount + added.amount,
					existing.name,
					existing.withdrawNoted,
				);
				return;
			}
		}
		list.push(added);
	};

	for (const patch of input.patches) {
		sites = sites + patch.key;
		const species = input.speciesFor(patch);
		const seen = counts.find((entry) => entry.species === species);
		if (seen === undefined) {
			counts.push({ species, fruit: patch.fruit, amount: 1 });
		} else {
			seen.amount = seen.amount + 1;
		}
		if (species.level > levelRequired) levelRequired = species.level;
		if (input.protectFor(patch)) {
			addRequired(
				required(species.payment, species.paymentNote, species.paymentAmount, species.paymentLabel, true),
			);
		}
	}

	// The first fruit note creates a new stack. Starting with only one free
	// slot could pick one fruit, note it, and still leave no room to resume.
	const spaceReserve = counts.some((entry) => entry.fruit) ? 2 : 1;
	const runeTarget = Math.max(0, Math.min(10000, input.runeReserve));

	for (const entry of counts) {
		saplings.push(
			required(
				entry.species.sapling,
				entry.species.saplingNote,
				entry.amount,
				entry.species.label + ' sapling',
				false,
			),
		);
	}

	const ordered: Required[] = [
		...saplings,
		required(ITEM.SPADE, 953, 1, 'Spade', false),
		required(ITEM.RAKE, 5342, 1, 'Rake', false),
		...list,
		required(ITEM.COINS, -1, input.patches.length * COINS_PER_PATCH, 'Coins for travel and tree removal', false),
	];

	return {
		patches: input.patches.length,
		levelRequired,
		spaceReserve,
		runeTarget,
		required: ordered,
		saplings,
		key:
			sites +
			':' +
			counts.map((entry) => entry.species.name).join('+') +
			':' +
			input.patches.filter((patch) => input.protectFor(patch)).length +
			':' +
			runeTarget,
	};
};

export const planReady = (plan: SupplyPlan, inventory: Inventory): boolean => {
	for (const sapling of plan.saplings) {
		if (inventory.count(sapling.item) !== sapling.amount) return false;
		if (inventory.count(sapling.note) > 0) return false;
	}
	for (const item of plan.required) {
		const have = item.withdrawNoted
			? Math.max(inventory.count(item.item), inventory.count(item.note))
			: inventory.count(item.item);
		if (have < item.amount) return false;
	}
	return inventory.free >= plan.spaceReserve;
};

const deposit = (item: number, amount: number, message: string): Step => ({
	kind: Kind.DEPOSIT,
	item,
	amount,
	received: item,
	noted: false,
	message,
});

const result = (kind: KindName, message: string): Step => ({
	kind,
	item: 0,
	amount: 0,
	received: 0,
	noted: false,
	message,
});

const makeSpace = (plan: SupplyPlan, inventory: Inventory): Step => {
	const keep = [ITEM.COINS, ITEM.SECATEURS, ITEM.MAGIC_SECATEURS, ...RUNES] as number[];
	for (const item of plan.required) keep.push(item.item, item.note);
	for (const id of inventory.ids) {
		if (!keep.includes(id)) return deposit(id, inventory.count(id), 'Bank unused item to make room');
	}
	return result(Kind.BLOCKED, 'Need inventory space for run supplies and weeds');
};

/**
 * One step at a time. `bank` must be a live container read, never a cached
 * list: the whole point of checking mandatory stock before touching anything
 * is that a stale read would start a run it cannot finish.
 */
export const nextStep = (
	plan: SupplyPlan,
	inventory: Inventory,
	bank: (itemId: number) => number,
): Step => {
	for (const item of plan.required) {
		const total =
			inventory.count(item.item) +
			(item.note >= 0 ? inventory.count(item.note) : 0) +
			bank(item.item);
		if (total < item.amount) {
			return result(
				Kind.BLOCKED,
				'Missing ' + (item.amount - total) + ' ' + item.name + ' in bag + bank',
			);
		}
	}

	for (const sapling of plan.saplings) {
		const excess = inventory.count(sapling.item) - sapling.amount;
		if (excess > 0) return deposit(sapling.item, excess, 'Store excess saplings');
	}

	// Normalize noted saplings/tools and unnoted payments before withdrawing.
	for (const item of plan.required) {
		const normalize = item.withdrawNoted ? item.item : item.note;
		if (normalize >= 0 && inventory.count(normalize) > 0) {
			return deposit(normalize, inventory.count(normalize), 'Prepare ' + item.name);
		}
	}

	for (const item of plan.required) {
		const received = item.withdrawNoted ? item.note : item.item;
		const missing = item.amount - inventory.count(received);
		if (missing <= 0) continue;
		const slots =
			item.withdrawNoted || item.item === ITEM.COINS ? (inventory.count(received) > 0 ? 0 : 1) : missing;
		if (inventory.free < slots + plan.spaceReserve) return makeSpace(plan, inventory);
		return {
			kind: Kind.WITHDRAW,
			item: item.item,
			amount: missing,
			received,
			noted: item.withdrawNoted,
			message: 'Withdraw ' + missing + ' ' + item.name,
		};
	}

	// Optional reserves never prevent the run. Keep any existing excess.
	for (const rune of RUNES) {
		const amount = Math.min(Math.max(0, plan.runeTarget - inventory.count(rune)), bank(rune));
		if (amount > 0 && (inventory.count(rune) > 0 || inventory.free > plan.spaceReserve)) {
			return {
				kind: Kind.WITHDRAW,
				item: rune,
				amount,
				received: rune,
				noted: false,
				message: 'Optional teleport runes',
			};
		}
	}

	return inventory.free >= plan.spaceReserve
		? result(Kind.READY, 'Run supplies ready: ' + plan.patches + ' saplings')
		: makeSpace(plan, inventory);
};

/** Optional items may be skipped; a mandatory failure must block the run. */
export const isMandatory = (plan: SupplyPlan, itemId: number): boolean =>
	plan.required.some((item) => item.item === itemId);
