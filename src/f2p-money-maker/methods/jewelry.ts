/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument */
import { GameWrapper } from '../game.js';
import { DelayManager, SessionStats } from '../state.js';
import { MoneyMakerSettings, MoneyMethodId } from '../types.js';
import { MoneyMethodHandler } from './base-method.js';

const GOLD_BAR_ID = 2357;
const RING_MOULD_ID = 1592;
const AMULET_MOULD_ID = 1595;

const SAPPHIRE_ID = 1607;
const EMERALD_ID = 1605;
const RUBY_ID = 1603;

const SAPPHIRE_RING_ID = 1637;
const EMERALD_RING_ID = 1639;
const RUBY_RING_ID = 1641;
const UNSTRUNG_AMULET_ID = 1673;

const AL_KHARID_FURNACE_POINT = new net.runelite.api.coords.WorldPoint(3275, 3186, 0);

export function createJewelryHandler(
	game: GameWrapper,
	settings: MoneyMakerSettings,
	delayManager: DelayManager,
	stats: SessionStats,
	methodId: MoneyMethodId,
): MoneyMethodHandler {
	let exhausted = false;
	let craftedCount = 0;
	let isCrafting = false;
	let craftTicks = 0;

	const isAmulet = methodId === 'CRAFT_GOLD_AMULET';
	const mouldId = isAmulet ? AMULET_MOULD_ID : RING_MOULD_ID;
	const gemIds: Partial<Record<MoneyMethodId, number>> = {
		CRAFT_SAPPHIRE_RING: SAPPHIRE_ID,
		CRAFT_EMERALD_RING: EMERALD_ID,
		CRAFT_RUBY_RING: RUBY_ID,
	};
	const resultIds: Partial<Record<MoneyMethodId, number>> = {
		CRAFT_GOLD_AMULET: UNSTRUNG_AMULET_ID,
		CRAFT_SAPPHIRE_RING: SAPPHIRE_RING_ID,
		CRAFT_EMERALD_RING: EMERALD_RING_ID,
		CRAFT_RUBY_RING: RUBY_RING_ID,
	};
	const profits: Partial<Record<MoneyMethodId, number>> = {
		CRAFT_GOLD_AMULET: 110,
		CRAFT_SAPPHIRE_RING: 230,
		CRAFT_EMERALD_RING: 250,
		CRAFT_RUBY_RING: 210,
	};
	const gemId = gemIds[methodId] ?? null;
	const resultId = resultIds[methodId] ?? UNSTRUNG_AMULET_ID;
	const estimatedProfitPerItem = profits[methodId] ?? 0;

	return {
		id: methodId,
		name: 'Crafting Jewelry (Al-Kharid)',

		onStart: () => {
			exhausted = false;
			craftedCount = 0;
			isCrafting = false;
			craftTicks = 0;
			stats.setMethod('Crafting Jewelry');
			game.log(`Starting jewelry crafting at Al-Kharid furnace: ${methodId}...`);
		},

		tick: () => {
			// 1. Dialogue / Production interface handling
			if (game.isDialogueOpen()) {
				game.handleProductionMenu(resultId);
				isCrafting = true;
				craftTicks = 0;
				delayManager.setDelay(2);
				return;
			}

			// 2. If actively crafting, monitor ticks
			if (isCrafting) {
				craftTicks++;
				const goldBarsLeft = game.getInventoryQuantity(GOLD_BAR_ID);
				const gemsLeft = gemId ? game.getInventoryQuantity(gemId) : 1;
				if (goldBarsLeft === 0 || gemsLeft === 0 || craftTicks > 35 || game.isIdle()) {
					isCrafting = false;
				} else {
					delayManager.setDelay(1);
					return;
				}
			}

			// 3. Check if inventory needs banking
			const hasProduct = game.getInventoryQuantity(resultId) > 0;
			const hasGold = game.getInventoryQuantity(GOLD_BAR_ID) > 0;
			const hasGems = gemId ? game.getInventoryQuantity(gemId) > 0 : true;

			if (hasProduct || !hasGold || !hasGems) {
				if (game.isBankOpen()) {
					if (hasProduct) {
						const count = game.getInventoryQuantity(resultId);
						stats.addItem(count);
						stats.addGp(count * estimatedProfitPerItem);
						craftedCount += count;
						game.depositAllExcept([mouldId]);
						delayManager.setDelay(1);
						return;
					}

					// Check mould
					if (game.getInventoryQuantity(mouldId) === 0) {
						if (game.getBankQuantity(mouldId) > 0) {
							game.withdrawQuantity(mouldId, 1);
							delayManager.setDelay(1);
							return;
						} else {
							game.log('Required mould not found in bank!');
							exhausted = true;
							return;
						}
					}

					// Check gold bars and gems
					const bankGold = game.getBankQuantity(GOLD_BAR_ID);
					if (!hasGold && bankGold === 0) {
						game.log('Gold bars depleted in bank!');
						exhausted = true;
						return;
					}

					if (gemId === null) {
						// 27 gold bars + 1 mould = 28 slots
						game.withdrawAll(GOLD_BAR_ID);
					} else {
						const bankGems = game.getBankQuantity(gemId);
						if (!hasGems && bankGems === 0) {
							game.log('Gems depleted in bank!');
							exhausted = true;
							return;
						}

						// 13 gold bars + 13 gems + 1 mould = 27 slots
						if (hasGold) {
							game.withdrawQuantity(gemId, 13);
						} else {
							game.withdrawQuantity(GOLD_BAR_ID, 13);
						}
					}

					delayManager.setDelay(DelayManager.getBankMicroPause(settings.general.bankMicroPauses));
					return;
				}

				// Walk to Bank
				if (!game.isWebWalking()) {
					game.openBank();
				}
				delayManager.setDelay(2);
				return;
			}

			// 4. Close bank if open
			if (game.isBankOpen()) {
				game.closeBank();
				delayManager.setDelay(1);
				return;
			}

			// 5. Walk to Al-Kharid furnace if far
			if (!game.isNear(AL_KHARID_FURNACE_POINT, 4)) {
				if (!game.isWebWalking()) {
					game.log('Walking to Al-Kharid furnace...');
					game.webWalkTo(AL_KHARID_FURNACE_POINT);
				}
				delayManager.setDelay(2);
				return;
			}

			// 6. Interact with Furnace
			game.useItemOnObject(GOLD_BAR_ID, ['Furnace']);
			delayManager.setDelay(DelayManager.getReactionTicks(settings.general.playStyle, settings.general.noobMode));
		},

		isSuppliesExhausted: () => exhausted,

		getStatus: () => `Jewelry Crafted: ${craftedCount}`,
	};
}
