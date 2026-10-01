/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument */
import { GameWrapper } from '../game.js';
import { DelayManager, SessionStats } from '../state.js';
import { MoneyMakerSettings, MoneyMethodId } from '../types.js';
import { MoneyMethodHandler } from './base-method.js';

const PESTLE_AND_MORTAR = 233;
const CHOCOLATE_BAR = 1973;
const CHOCOLATE_DUST = 1975;

const PASTRY_DOUGH = 1953;
const PIE_DISH = 2313;
const PIE_SHELL = 2315;

const POT_OF_FLOUR = 1933;
const BUCKET_OF_WATER = 1929;
const PIZZA_BASE = 2283;
const EMPTY_BUCKET = 1925;
const EMPTY_POT = 1931;

export function createProcessingHandler(
	game: GameWrapper,
	settings: MoneyMakerSettings,
	delayManager: DelayManager,
	stats: SessionStats,
	methodId: MoneyMethodId,
): MoneyMethodHandler {
	let exhausted = false;
	let processedCount = 0;
	let isMaking = false;
	let makeTicks = 0;

	return {
		id: methodId,
		name:
			methodId === 'GRIND_CHOCOLATE'
				? 'Grinding Chocolate'
				: (methodId === 'MAKE_PIE_SHELLS'
					? 'Making Pie Shells'
					: 'Making Pizza Bases'),

		onStart: () => {
			exhausted = false;
			processedCount = 0;
			isMaking = false;
			makeTicks = 0;
			stats.setMethod(
				methodId === 'GRIND_CHOCOLATE' ? 'Grinding Chocolate' : 'Making Dough',
			);
			game.log(`Starting bank processing: ${methodId}...`);
		},

		tick: () => {
			// 1. Dialogue / Production interface handling
			if (game.isDialogueOpen()) {
				game.handleProductionMenu();
				isMaking = true;
				makeTicks = 0;
				delayManager.setDelay(2);
				return;
			}

			// If currently crafting in progress, wait until animation stops or inventory runs out
			if (isMaking) {
				makeTicks++;
				if (methodId === 'GRIND_CHOCOLATE' && game.getInventoryQuantity(CHOCOLATE_BAR) === 0) {
					isMaking = false;
				} else if (
					methodId === 'MAKE_PIE_SHELLS' &&
					(game.getInventoryQuantity(PASTRY_DOUGH) === 0 ||
						game.getInventoryQuantity(PIE_DISH) === 0)
				) {
					isMaking = false;
				} else if (
					methodId === 'MAKE_PIZZA_BASES' &&
					(game.getInventoryQuantity(POT_OF_FLOUR) === 0 ||
						game.getInventoryQuantity(BUCKET_OF_WATER) === 0)
				) {
					isMaking = false;
				} else if (makeTicks > 35 || game.isIdle()) {
					isMaking = false;
				} else {
					delayManager.setDelay(1);
					return;
				}
			}

			// 2. Check if we need to bank
			let needsBank = false;
			switch (methodId) {
			case 'GRIND_CHOCOLATE': {
				needsBank = game.getInventoryQuantity(CHOCOLATE_BAR) === 0;

			break;
			}
			case 'MAKE_PIE_SHELLS': {
				needsBank =
					game.getInventoryQuantity(PASTRY_DOUGH) === 0 ||
					game.getInventoryQuantity(PIE_DISH) === 0;

			break;
			}
			case 'MAKE_PIZZA_BASES': {
				needsBank =
					game.getInventoryQuantity(POT_OF_FLOUR) === 0 ||
					game.getInventoryQuantity(BUCKET_OF_WATER) === 0;

			break;
			}
			// No default
			}

			if (needsBank) {
				if (game.isBankOpen()) {
					// Deposit finished products
					if (methodId === 'GRIND_CHOCOLATE') {
						const dust = game.getInventoryQuantity(CHOCOLATE_DUST);
						if (dust > 0) {
							stats.addItem(dust);
							stats.addGp(dust * 80);
							processedCount += dust;
							game.depositAllExcept([PESTLE_AND_MORTAR]);
							delayManager.setDelay(1);
							return;
						}

						// Ensure pestle and mortar
						if (game.getInventoryQuantity(PESTLE_AND_MORTAR) === 0) {
							if (game.getBankQuantity(PESTLE_AND_MORTAR) > 0) {
								game.withdrawQuantity(PESTLE_AND_MORTAR, 1);
								delayManager.setDelay(1);
								return;
							} else {
								game.log('Pestle and mortar not found in bank!');
								exhausted = true;
								return;
							}
						}

						// Withdraw chocolate bars
						const bankBars = game.getBankQuantity(CHOCOLATE_BAR);
						if (bankBars === 0) {
							game.log('Chocolate bars depleted in bank!');
							exhausted = true;
							return;
						}

						game.withdrawAll(CHOCOLATE_BAR);
						delayManager.setDelay(DelayManager.getBankMicroPause(settings.general.bankMicroPauses));
						return;
					}

					if (methodId === 'MAKE_PIE_SHELLS') {
						const shells = game.getInventoryQuantity(PIE_SHELL);
						if (shells > 0) {
							stats.addItem(shells);
							stats.addGp(shells * 180);
							processedCount += shells;
							game.depositAll();
							delayManager.setDelay(1);
							return;
						}

						const dough = game.getBankQuantity(PASTRY_DOUGH);
						const dishes = game.getBankQuantity(PIE_DISH);
						if (
							(game.getInventoryQuantity(PASTRY_DOUGH) === 0 && dough === 0) ||
							(game.getInventoryQuantity(PIE_DISH) === 0 && dishes === 0)
						) {
							game.log('Pie shell ingredients depleted in bank!');
							exhausted = true;
							return;
						}

						if (game.getInventoryQuantity(PASTRY_DOUGH) === 0) {
							game.withdrawQuantity(PASTRY_DOUGH, 14);
						} else {
							game.withdrawQuantity(PIE_DISH, 14);
						}
						delayManager.setDelay(DelayManager.getBankMicroPause(settings.general.bankMicroPauses));
						return;
					}

					if (methodId === 'MAKE_PIZZA_BASES') {
						const bases = game.getInventoryQuantity(PIZZA_BASE);
						const emptyB = game.getInventoryQuantity(EMPTY_BUCKET);
						const emptyP = game.getInventoryQuantity(EMPTY_POT);
						if (bases > 0 || emptyB > 0 || emptyP > 0) {
							stats.addItem(bases);
							stats.addGp(bases * 60);
							processedCount += bases;
							game.depositAll();
							delayManager.setDelay(1);
							return;
						}

						const flour = game.getBankQuantity(POT_OF_FLOUR);
						const water = game.getBankQuantity(BUCKET_OF_WATER);
						if (
							(game.getInventoryQuantity(POT_OF_FLOUR) === 0 && flour === 0) ||
							(game.getInventoryQuantity(BUCKET_OF_WATER) === 0 && water === 0)
						) {
							game.log('Flour or water depleted in bank!');
							exhausted = true;
							return;
						}

						if (game.getInventoryQuantity(POT_OF_FLOUR) === 0) {
							game.withdrawQuantity(POT_OF_FLOUR, 14);
						} else {
							game.withdrawQuantity(BUCKET_OF_WATER, 14);
						}
						delayManager.setDelay(DelayManager.getBankMicroPause(settings.general.bankMicroPauses));
						return;
					}
				}

				// Open Bank
				if (!game.isWebWalking()) {
					game.openBank();
				}
				delayManager.setDelay(2);
				return;
			}

			// 3. We have items in inventory: close bank if still open
			if (game.isBankOpen()) {
				game.closeBank();
				delayManager.setDelay(1);
				return;
			}

			// 4. Combine items to start processing
			if (methodId === 'GRIND_CHOCOLATE') {
				game.useItemOnItem(PESTLE_AND_MORTAR, CHOCOLATE_BAR);
				delayManager.setDelay(2);
				return;
			}

			if (methodId === 'MAKE_PIE_SHELLS') {
				game.useItemOnItem(PASTRY_DOUGH, PIE_DISH);
				delayManager.setDelay(2);
				return;
			}

			if (methodId === 'MAKE_PIZZA_BASES') {
				game.useItemOnItem(POT_OF_FLOUR, BUCKET_OF_WATER);
				delayManager.setDelay(2);
				return;
			}
		},

		isSuppliesExhausted: () => exhausted,

		getStatus: () => `Processed: ${processedCount}`,
	};
}
