/**
 * Port of FarmingBankActions.java onto the rlpl bank API.
 *
 * Same rule as every other action: the click is not the receipt. Each deposit
 * or withdrawal is confirmed by an inventory delta before the plan advances,
 * because rlpl's bank calls return void like the rest of the surface.
 *
 * Simpler than the original in one place: rlpl exposes setNotedMode/getNotedMode
 * directly, so the Note-toggle widget click and its verification are gone.
 */

import { snapshotInventory } from './game.js';
import { Kind, type Step } from './supplies.js';

export const isOpen = (): boolean => bot.bank.isOpen();

export const bankCount = (itemId: number): number => bot.bank.getQuantityOfId(itemId);

/** Ticks an open attempt is given before falling back to travel. */
const OPEN_WAIT = 10;
/** Ticks the walk is given to actually start before we stop waiting on it. */
const WALK_START = 5;

export type OpenProgress = 'open' | 'opening' | 'walking' | 'failed';

type Stage = 'open' | 'walk' | 'reopen' | 'failed';

let stage: Stage = 'open';
let stageTicks = 0;

export const resetOpen = (): void => {
	stage = 'open';
	stageTicks = 0;
};

/**
 * Open first, travel only as a fallback — the order the Java version uses.
 *
 * The first version had this backwards and issued webWalkToNearestBank() and
 * bank.open() on the same tick. If rlpl's open() walks to the booth itself,
 * that is two walkers fighting over the destination, which is what "walks off
 * and comes back" looks like from the outside.
 */
export const progressOpen = (allowTravel: boolean): OpenProgress => {
	if (isOpen()) {
		resetOpen();
		return 'open';
	}
	stageTicks = stageTicks + 1;

	switch (stage) {
		case 'open': {
			if (stageTicks === 1) bot.bank.open();
			if (stageTicks > OPEN_WAIT) {
				if (!allowTravel) {
					stage = 'failed';
					return 'failed';
				}
				stage = 'walk';
				stageTicks = 0;
			}
			return 'opening';
		}

		case 'walk': {
			if (stageTicks === 1) bot.walking.webWalkToNearestBank();
			// Never re-issue while it is moving: that is what restarts the path.
			if (bot.walking.isWebWalking() || stageTicks < WALK_START) return 'walking';
			stage = 'reopen';
			stageTicks = 0;
			return 'walking';
		}

		case 'reopen': {
			if (stageTicks === 1) bot.bank.open();
			if (stageTicks > OPEN_WAIT) {
				stage = 'failed';
				return 'failed';
			}
			return 'opening';
		}

		default: {
			return 'failed';
		}
	}
};

export const requestClose = (): void => {
	// Restoring Item mode is convenient but must never block closing.
	if (bot.bank.getNotedMode()) bot.bank.setNotedMode(false);
	bot.bank.close();
};

/** The inventory count the step is expected to produce, for confirmation. */
export const expectedAfter = (step: Step, before: number): number =>
	step.kind === Kind.DEPOSIT ? before - step.amount : before + step.amount;

export const heldForStep = (step: Step): number => snapshotInventory().count(step.received);

/** Issues the bank click. Whether it worked is decided by the delta. */
export const execute = (step: Step): boolean => {
	if (!isOpen()) return false;

	if (step.kind === Kind.DEPOSIT) {
		bot.bank.depositAllWithId(step.item);
		return true;
	}

	if (bot.bank.getNotedMode() !== step.noted) {
		bot.bank.setNotedMode(step.noted);
		// Let the mode land before the withdrawal; the caller retries next tick.
		return false;
	}

	bot.bank.withdrawQuantityWithId(step.item, step.amount);
	return true;
};
