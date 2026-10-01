/**
 * Port of FarmingTreePolicy.java + FarmingActionPolicy.java.
 *
 * Decisions and receipts stay independent of clicks and of the client API —
 * that separation is what made this half of the plugin cheap to move.
 */

import { FRUITS, fruitFromRaw } from './fruit.js';
import { State, type Observation } from './observation.js';

/** The shared contract of FarmingTreeKind: trees and fruit trees both fit. */
export interface Species {
	readonly name: string;
	readonly label: string;
	readonly sapling: number;
	readonly saplingNote: number;
	readonly level: number;
	readonly payment: number;
	readonly paymentNote: number;
	readonly paymentAmount: number;
	readonly paymentLabel: string;
	readonly cycles: number;
	readonly cycleSeconds: number;
}

export const Action = {
	NONE: 'NONE',
	BLOCKED: 'BLOCKED',
	RAKE: 'RAKE',
	CLEAR: 'CLEAR',
	DROP_WEEDS: 'DROP_WEEDS',
	DROP_POTS: 'DROP_POTS',
	PLANT: 'PLANT',
	PAY: 'PAY',
	CHECK_HEALTH: 'CHECK_HEALTH',
	REMOVE_TREE: 'REMOVE_TREE',
	PRUNE: 'PRUNE',
	HARVEST: 'HARVEST',
	NOTE_FRUIT: 'NOTE_FRUIT',
} as const;

export type ActionName = (typeof Action)[keyof typeof Action];

export const ITEM = {
	WEEDS: 6055,
	EMPTY_POT: 5350,
	RAKE: 5341,
	SPADE: 952,
	COINS: 995,
	SECATEURS: 5329,
	MAGIC_SECATEURS: 7409,
} as const;

export interface Inventory {
	readonly count: (itemId: number) => number;
	/** Every distinct item id held, ascending — makeSpace needs to enumerate. */
	readonly ids: readonly number[];
	readonly free: number;
	readonly level: number;
}

export interface Plan {
	readonly action: ActionName;
	readonly item: number;
	/** The item the action produces, for NOTE_FRUIT (produce -> note). */
	readonly pairedItem: number;
	readonly amount: number;
	readonly reason: string;
}

const plan = (
	action: ActionName,
	item: number,
	amount = 1,
	reason = action as string,
	pairedItem = 0,
): Plan => ({ action, item, pairedItem, amount, reason });

const blocked = (reason: string): Plan => plan(Action.BLOCKED, 0, 0, reason);

const paymentItem = (species: Species, inventory: Inventory): number => {
	if (inventory.count(species.paymentNote) >= species.paymentAmount) return species.paymentNote;
	if (inventory.count(species.payment) >= species.paymentAmount) return species.payment;
	return 0;
};

export const nextPlan = (
	observation: Observation,
	inventory: Inventory,
	chosen: Species,
	chosenIsFruit: boolean,
	protect: boolean,
	paid: boolean,
): Plan => {
	if (observation.state === State.UNKNOWN) return blocked('Tree state not supported');
	if (observation.fruit !== chosenIsFruit) return blocked('Wrong tree type for patch');
	if (inventory.count(ITEM.WEEDS) > 0) return plan(Action.DROP_WEEDS, ITEM.WEEDS);
	if (inventory.count(ITEM.EMPTY_POT) > 0) return plan(Action.DROP_POTS, ITEM.EMPTY_POT);

	// Banknotes avoid filling the bag and remain valid protection payments.
	if (observation.fruit) {
		for (const species of FRUITS) {
			const held = inventory.count(species.produce);
			if (held > 0) {
				return plan(
					Action.NOTE_FRUIT,
					species.produce,
					held,
					'Note ' + species.label + ' produce',
					species.produce + 1,
				);
			}
		}
	}

	switch (observation.state) {
		case State.WEEDS: {
			if (inventory.count(ITEM.RAKE) === 0) return blocked('Need rake');
			return inventory.free > 0 ? plan(Action.RAKE, 0) : blocked('Need space for weeds');
		}

		case State.EMPTY: {
			if (inventory.level < chosen.level) return blocked('Need Farming level ' + chosen.level);
			if (inventory.count(ITEM.SPADE) === 0) return blocked('Need spade');
			if (inventory.count(chosen.sapling) === 0)
				return blocked('Need unnoted ' + chosen.label + ' sapling');
			if (protect && paymentItem(chosen, inventory) === 0)
				return blocked(
					'Need ' +
						chosen.paymentAmount +
						' ' +
						chosen.paymentLabel +
						' to protect ' +
						chosen.label +
						' (notes accepted)',
				);
			return plan(Action.PLANT, chosen.sapling, 1, 'Plant ' + chosen.label + ' sapling');
		}

		case State.GROWING: {
			if (!protect || paid) return plan(Action.NONE, 0);
			const growing = observation.fruit ? observation.fruitTree : observation.tree;
			if (growing === null) return plan(Action.NONE, 0);
			const item = paymentItem(growing, inventory);
			return plan(
				Action.PAY,
				item === 0 ? growing.paymentNote : item,
				growing.paymentAmount,
				'Protect ' + growing.label,
			);
		}

		case State.CHECK_HEALTH: {
			return plan(Action.CHECK_HEALTH, 0);
		}

		case State.HARVEST: {
			const ripe = fruitFromRaw(observation.raw);
			if (ripe === null) return blocked('Unknown fruit to pick');
			return inventory.free > 0
				? plan(Action.HARVEST, ripe.produce, 1, 'Pick ' + ripe.label)
				: blocked('Need inventory space to pick fruit');
		}

		case State.CHECKED: {
			return inventory.count(ITEM.COINS) >= 200
				? plan(Action.REMOVE_TREE, ITEM.COINS, 200, 'Pay to remove tree')
				: blocked('Need 200 coins to remove checked tree');
		}

		case State.STUMP:
		case State.DEAD: {
			return inventory.count(ITEM.SPADE) > 0 ? plan(Action.CLEAR, 0) : blocked('Need spade');
		}

		case State.DISEASED: {
			return inventory.count(ITEM.SECATEURS) > 0 || inventory.count(ITEM.MAGIC_SECATEURS) > 0
				? plan(Action.PRUNE, 0)
				: blocked('Need secateurs to prune tree');
		}

		default: {
			return plan(Action.NONE, 0);
		}
	}
};

const clean = (text: string): string =>
	text
		// eslint-disable-next-line unicorn/prefer-string-replace-all -- Rhino 1.7.14 has no replaceAll
		.replace(/<[^>]*>/g, ' ')
		// eslint-disable-next-line unicorn/prefer-string-replace-all -- Rhino 1.7.14 has no replaceAll
		.replace(/\s+/g, ' ')
		.trim()
		.toLowerCase();

/** Port of FarmingProtectionTracker.isConfirmation. */
export const isProtectionConfirmation = (text: string): boolean => {
	const normalized = clean(text);
	return (
		(normalized.indexOf("that'll do nicely") === 0 &&
			normalized.includes('leave it with me') &&
			normalized.includes('patch grows for you')) ||
		normalized.includes('already looking after that patch')
	);
};

/**
 * Port of FarmingActionPolicy.confirmed — a click is never a receipt.
 * Every action has to be proven by a varbit change, an inventory delta or a
 * gardener line, otherwise the runner counts the interaction as failed. On
 * rlpl this is not just good practice: interactions return void, so there is
 * no other signal available at all.
 */
export const confirmed = (
	pending: Plan,
	before: Observation,
	after: Observation | null,
	initial: Inventory,
	current: Inventory,
	receipt: string,
): boolean => {
	const text = clean(receipt);
	const fresh = after !== null && before.fruit === after.fruit;

	switch (pending.action) {
		case Action.DROP_WEEDS: {
			return current.count(ITEM.WEEDS) < initial.count(ITEM.WEEDS);
		}
		case Action.DROP_POTS: {
			return current.count(ITEM.EMPTY_POT) < initial.count(ITEM.EMPTY_POT);
		}
		case Action.RAKE: {
			return fresh && after.state === State.EMPTY;
		}
		case Action.CLEAR: {
			return fresh && (after.state === State.EMPTY || after.state === State.WEEDS);
		}
		case Action.CHECK_HEALTH: {
			return (
				fresh &&
				before.crop === after.crop &&
				(after.state === State.CHECKED || after.state === State.HARVEST)
			);
		}
		case Action.HARVEST: {
			return (
				fresh &&
				before.crop === after.crop &&
				after.raw < before.raw &&
				(after.state === State.HARVEST || after.state === State.CHECKED) &&
				current.count(pending.item) > initial.count(pending.item)
			);
		}
		case Action.NOTE_FRUIT: {
			return (
				initial.count(pending.item) - current.count(pending.item) === pending.amount &&
				current.count(pending.pairedItem) - initial.count(pending.pairedItem) === pending.amount
			);
		}
		case Action.PRUNE: {
			return (
				fresh &&
				before.crop === after.crop &&
				(after.state === State.GROWING || after.state === State.CHECK_HEALTH)
			);
		}
		case Action.REMOVE_TREE: {
			return (
				fresh &&
				(after.state === State.EMPTY || after.state === State.WEEDS) &&
				initial.count(ITEM.COINS) - current.count(ITEM.COINS) === 200
			);
		}
		case Action.PAY: {
			return (
				isProtectionConfirmation(receipt) ||
				(initial.count(pending.item) - current.count(pending.item) === pending.amount &&
					text.includes('you pay the gardener') &&
					text.includes('protect the patch'))
			);
		}
		case Action.PLANT: {
			if (!fresh || after.state !== State.GROWING) return false;
			const planted = after.fruit ? after.fruitTree : after.tree;
			return (
				planted !== null &&
				planted.sapling === pending.item &&
				initial.count(pending.item) - current.count(pending.item) === 1
			);
		}
		default: {
			return false;
		}
	}
};
