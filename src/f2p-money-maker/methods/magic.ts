/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument */
import { GameWrapper } from '../game.js';
import { DelayManager, SessionStats } from '../state.js';
import { MoneyMakerSettings, MoneyMethodId } from '../types.js';
import { MoneyMethodHandler } from './base-method.js';

const NATURE_RUNE_ID = 561;
const LAW_RUNE_ID = 563;
const FIRE_STAFF_ID = 1387;
const AIR_STAFF_ID = 1381;
const WINE_OF_ZAMORAK_ID = 245;

const CHAOS_TEMPLE_POINT = new net.runelite.api.coords.WorldPoint(2951, 3514, 0);

export function createMagicHandler(
	game: GameWrapper,
	settings: MoneyMakerSettings,
	delayManager: DelayManager,
	stats: SessionStats,
	methodId: MoneyMethodId,
): MoneyMethodHandler {
	let exhausted = false;
	let alchedCount = 0;
	let grabbedCount = 0;
	let observedAlchItemCount = -1;

	return {
		id: methodId,
		name: methodId === 'HIGH_ALCH' ? 'High Alchemy' : 'Telegrab Wine of Zamorak',

		onStart: () => {
			exhausted = false;
			alchedCount = 0;
			grabbedCount = 0;
			observedAlchItemCount = -1;
			stats.setMethod(methodId === 'HIGH_ALCH' ? 'High Alchemy' : 'Telegrab Wine');
			game.log(`Starting Magic method: ${methodId}...`);
		},

			tick: () => {
			if (methodId === 'HIGH_ALCH') {
				if (!game.isEquipped(FIRE_STAFF_ID)) {
					if (game.getInventoryQuantity(FIRE_STAFF_ID) > 0) {
						if (game.isBankOpen()) {
							game.closeBank();
							delayManager.setDelay(1);
							return;
						}
						game.wearInventoryItem(FIRE_STAFF_ID);
						delayManager.setDelay(2);
						return;
					}
					if (game.isBankOpen()) {
						if (game.getBankQuantity(FIRE_STAFF_ID) === 0) {
							game.log('Fire staff not found in inventory, equipment, or bank!');
							exhausted = true;
							return;
						}
						game.withdrawQuantity(FIRE_STAFF_ID, 1);
						delayManager.setDelay(1);
						return;
					}
					if (!game.isWebWalking()) game.openBank();
					delayManager.setDelay(2);
					return;
				}

				// 1. Check nature runes and alch item
				const natCount = game.getInventoryQuantity(NATURE_RUNE_ID);
				const alchItemCount = game.getInventoryQuantity(settings.specific.alchItemId);
				if (observedAlchItemCount >= 0 && alchItemCount < observedAlchItemCount) {
					const completed = observedAlchItemCount - alchItemCount;
					stats.addItem(completed);
					stats.addGp(completed * 220);
					alchedCount += completed;
				}
				observedAlchItemCount = alchItemCount;

				if (natCount === 0 || alchItemCount === 0) {
					if (game.isBankOpen()) {
						const bankNats = game.getBankQuantity(NATURE_RUNE_ID);
						const bankItems = game.getBankQuantity(settings.specific.alchItemId);

						if ((natCount === 0 && bankNats === 0) || (alchItemCount === 0 && bankItems === 0)) {
							game.log(`Nature runes (${bankNats}) or alch items (${bankItems}) depleted in bank!`);
							exhausted = true;
							return;
						}

						if (natCount === 0) {
							game.withdrawAll(NATURE_RUNE_ID);
						} else {
							game.withdrawAll(settings.specific.alchItemId);
						}
						delayManager.setDelay(DelayManager.getBankMicroPause(settings.general.bankMicroPauses));
						return;
					}

					// Walk to bank
					if (!game.isWebWalking()) {
						game.openBank();
					}
					delayManager.setDelay(2);
					return;
				}

				// Close bank if open
				if (game.isBankOpen()) {
					game.closeBank();
					delayManager.setDelay(1);
					return;
				}

				// Cast High Alchemy on item
				try {
					game.castSpellOnInventory('HIGH_LEVEL_ALCHEMY', settings.specific.alchItemId);
					delayManager.setDelay(DelayManager.getReactionTicks(settings.general.playStyle, settings.general.noobMode));
				} catch {
					delayManager.setDelay(3);
				}
				return;
			}

			// Telegrab Wine of Zamorak
			if (methodId === 'TELEGRAB_WINE') {
				if (!game.isEquipped(AIR_STAFF_ID)) {
					if (game.getInventoryQuantity(AIR_STAFF_ID) > 0) {
						if (game.isBankOpen()) {
							game.closeBank();
							delayManager.setDelay(1);
							return;
						}
						game.wearInventoryItem(AIR_STAFF_ID);
						delayManager.setDelay(2);
						return;
					}
					if (game.isBankOpen()) {
						if (game.getBankQuantity(AIR_STAFF_ID) === 0) {
							game.log('Air staff not found in inventory, equipment, or bank!');
							exhausted = true;
							return;
						}
						game.withdrawQuantity(AIR_STAFF_ID, 1);
						delayManager.setDelay(1);
						return;
					}
					if (!game.isWebWalking()) game.openBank();
					delayManager.setDelay(2);
					return;
				}

				// 1. Check law runes
				const lawCount = game.getInventoryQuantity(LAW_RUNE_ID);
				if (lawCount === 0 || game.isInventoryFull()) {
					if (game.isBankOpen()) {
						// Deposit wines
						const wines = game.getInventoryQuantity(WINE_OF_ZAMORAK_ID);
						if (wines > 0) {
							stats.addItem(wines);
							stats.addGp(wines * 1200);
							grabbedCount += wines;
							game.depositAllExcept([LAW_RUNE_ID, AIR_STAFF_ID]);
							delayManager.setDelay(1);
							return;
						}

						const bankLaws = game.getBankQuantity(LAW_RUNE_ID);
						if (bankLaws === 0 && lawCount === 0) {
							game.log('Law runes depleted in bank!');
							exhausted = true;
							return;
						}

						if (lawCount === 0) {
							game.withdrawAll(LAW_RUNE_ID);
						}
						delayManager.setDelay(DelayManager.getBankMicroPause(settings.general.bankMicroPauses));
						return;
					}

					if (!game.isWebWalking()) {
						game.log('Walking to bank to deposit wines or withdraw Law runes...');
						game.openBank();
					}
					delayManager.setDelay(2);
					return;
				}

				if (game.isBankOpen()) {
					game.closeBank();
					delayManager.setDelay(1);
					return;
				}

				// Walk to Chaos Temple
				if (!game.isNear(CHAOS_TEMPLE_POINT, 5)) {
					if (!game.isWebWalking()) {
						game.log('Walking to Chaos Temple...');
						game.webWalkTo(CHAOS_TEMPLE_POINT);
					}
					delayManager.setDelay(2);
					return;
				}

				// Cast Telekinetic Grab on Wine of Zamorak
				try {
					const grabbed = game.castSpellOnGroundItem('TELEKINETIC_GRAB', 'Wine of zamorak');
					if (grabbed) {
						delayManager.setDelay(4);
					} else {
						// Waiting for respawn
						delayManager.setDelay(2);
					}
				} catch {
					delayManager.setDelay(2);
				}
			}
		},

		isSuppliesExhausted: () => exhausted,

		getStatus: () =>
			methodId === 'HIGH_ALCH'
				? `Alched: ${alchedCount}`
				: `Wines Collected: ${grabbedCount}`,
	};
}
