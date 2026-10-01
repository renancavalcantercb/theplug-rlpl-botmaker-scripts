/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument */
import { GameWrapper } from '../game.js';
import { DelayManager, SessionStats } from '../state.js';
import { MoneyMakerSettings } from '../types.js';
import { MoneyMethodHandler } from './base-method.js';

const COINS_ID = 995;
const FEATHER_PACK_ID = 11881;
const FEATHER_ID = 314;

const GERRANT_SHOP_POINT = new net.runelite.api.coords.WorldPoint(3014, 3224, 0);

export function createShopRunHandler(
	game: GameWrapper,
	settings: MoneyMakerSettings,
	delayManager: DelayManager,
	stats: SessionStats,
): MoneyMethodHandler {
	let exhausted = false;
	let feathersPurchased = 0;
	let pendingPackCount = 0;

	return {
		id: 'BUY_FEATHERS',
		name: 'Buying Feather Packs (Port Sarim)',

		onStart: () => {
			exhausted = false;
			feathersPurchased = 0;
			pendingPackCount = 0;
			stats.setMethod('Feather Packs');
			game.log('Starting buying feather packs from Gerrant in Port Sarim...');
		},

		tick: () => {
			// 1. If inventory has feather packs, open them all to stack into feathers!
			const packCount = game.getInventoryQuantity(FEATHER_PACK_ID);
			if (pendingPackCount > packCount) {
				const opened = (pendingPackCount - packCount) * 100;
				stats.addItem(opened);
				stats.addGp((opened / 100) * 60);
				feathersPurchased += opened;
			}
			pendingPackCount = 0;
			if (packCount > 0) {
				if (game.isShopOpen()) {
					game.closeShop();
					delayManager.setDelay(1);
					return;
				}
				game.openInventoryItem(FEATHER_PACK_ID, 'Open');
				pendingPackCount = packCount;
				delayManager.setDelay(1);
				return;
			}

			// 2. Check coins
			const coinsInInv = game.getInventoryQuantity(COINS_ID);
			if (coinsInInv < 200) {
				if (game.isBankOpen()) {
					const feathers = game.getInventoryQuantity(FEATHER_ID);
					if (feathers > 0) {
						game.depositAllExcept([COINS_ID]);
						delayManager.setDelay(1);
						return;
					}

					const bankCoins = game.getBankQuantity(COINS_ID);
					if (bankCoins < 200) {
						game.log('Coins depleted in bank for buying feathers!');
						exhausted = true;
						return;
					}

					game.withdrawAll(COINS_ID);
					delayManager.setDelay(DelayManager.getBankMicroPause(settings.general.bankMicroPauses));
					return;
				}

				if (game.isShopOpen()) {
					game.closeShop();
					delayManager.setDelay(1);
					return;
				}

				// Walk to nearest bank
				if (!game.isWebWalking()) {
					game.log('Walking to bank to withdraw coins...');
					game.openBank();
				}
				delayManager.setDelay(2);
				return;
			}

			// 3. If bank is open and we have coins, close it
			if (game.isBankOpen()) {
				game.closeBank();
				delayManager.setDelay(1);
				return;
			}

			// 4. If shop is open, buy feather packs
			if (game.isShopOpen()) {
				if (game.getEmptySlots() > 0) {
					game.buyFiftyFromShop(FEATHER_PACK_ID);
					delayManager.setDelay(DelayManager.getReactionTicks(settings.general.playStyle, settings.general.noobMode));
					return;
				} else {
					game.closeShop();
					delayManager.setDelay(1);
					return;
				}
			}

			// 5. Walk to Gerrant shop if far
			if (!game.isNear(GERRANT_SHOP_POINT, 4)) {
				if (!game.isWebWalking()) {
					game.log('Walking to Port Sarim fishing shop...');
					game.webWalkTo(GERRANT_SHOP_POINT);
				}
				delayManager.setDelay(2);
				return;
			}

			// 6. Near shop: trade Gerrant
			const gerrant = bot.npcs.getWithNames(['Gerrant']);
			if (gerrant && gerrant.length > 0) {
				bot.npcs.interactSupplied(gerrant[0], 'Trade');
				delayManager.setDelay(2);
			} else {
				game.interactWithNpc(['Gerrant'], 'Trade');
				delayManager.setDelay(2);
			}
		},

		isSuppliesExhausted: () => exhausted,

		getStatus: () => `Feathers Purchased: ${feathersPurchased}`,
	};
}
