/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument */
import { GameWrapper } from '../game.js';
import { DelayManager, SessionStats } from '../state.js';
import { MoneyMakerSettings } from '../types.js';
import { MoneyMethodHandler } from './base-method.js';

const COWHIDE_ID = 1739;
const SOFT_LEATHER_ID = 1741;
const HARD_LEATHER_ID = 1743;
const COINS_ID = 995;

const ELLIS_POINT = new net.runelite.api.coords.WorldPoint(3274, 3192, 0);

export function createTanningHandler(
	game: GameWrapper,
	settings: MoneyMakerSettings,
	delayManager: DelayManager,
	stats: SessionStats,
): MoneyMethodHandler {
	let exhausted = false;
	let tannedCount = 0;

	return {
		id: 'TAN_COWHIDE',
		name: 'Tanning Cowhides (Al-Kharid)',

		onStart: () => {
			exhausted = false;
			tannedCount = 0;
			stats.setMethod('Tanning Cowhides');
			game.log('Starting Tanning Cowhides in Al-Kharid...');
		},

		tick: () => {
			// 1. Tanner interface / dialogue handling
			if (game.isTannerOpen()) {
				game.tanAllLeather(settings.specific.leatherType === 'hard');
				delayManager.setDelay(2);
				return;
			}

			if (game.isDialogueOpen()) {
				const option = settings.specific.leatherType === 'hard' ? 'Hard leather' : 'Soft leather';
				game.handleDialogue(['Tan All', option, 'Tan all soft leather', 'Tan all hard leather']);
				delayManager.setDelay(2);
				return;
			}

			// 2. Check if inventory contains leather that needs banking
			const softCount = game.getInventoryQuantity(SOFT_LEATHER_ID);
			const hardCount = game.getInventoryQuantity(HARD_LEATHER_ID);
			const hasLeather = softCount > 0 || hardCount > 0;
			const cowhidesInInv = game.getInventoryQuantity(COWHIDE_ID);
			const coinsInInv = game.getInventoryQuantity(COINS_ID);

			// 3. Banking logic
			if (hasLeather || (cowhidesInInv === 0 && !exhausted)) {
				if (game.isBankOpen()) {
					if (hasLeather) {
						stats.addItem(softCount + hardCount);
						stats.addGp((softCount + hardCount) * 90); // ~90 gp profit per hide
						tannedCount += softCount + hardCount;
						game.log(`Depositing ${softCount + hardCount} tanned hides...`);
						game.depositAllExcept([COINS_ID]);
						delayManager.setDelay(DelayManager.getBankMicroPause(settings.general.bankMicroPauses));
						return;
					}

					// Ensure coins in inventory (at least 100 gp)
					if (coinsInInv < 100) {
						const bankCoins = game.getBankQuantity(COINS_ID);
						if (bankCoins > 0) {
							game.log('Withdrawing coins from bank...');
							game.withdrawQuantity(COINS_ID, Math.min(bankCoins, 50000));
							delayManager.setDelay(1);
							return;
						} else {
							game.log('Not enough coins in bank to pay the tanner!');
							exhausted = true;
							return;
						}
					}

					// Withdraw Cowhides
					const bankHides = game.getBankQuantity(COWHIDE_ID);
					if (bankHides === 0 && cowhidesInInv === 0) {
						game.log('Cowhides depleted in bank!');
						exhausted = true;
						return;
					}

					game.log(`Withdrawing Cowhides from bank (${bankHides} remaining)...`);
					game.withdrawAll(COWHIDE_ID);
					delayManager.setDelay(DelayManager.getBankMicroPause(settings.general.bankMicroPauses));
					return;
				}

				// Bank not open, walk to nearest bank (Al-Kharid)
				if (!game.isWebWalking()) {
					game.log('Walking to Al-Kharid bank...');
					game.openBank();
				}
				delayManager.setDelay(2);
				return;
			}

			// 4. If we have cowhides and coins, close bank and walk to Ellis
			if (game.isBankOpen()) {
				game.closeBank();
				delayManager.setDelay(1);
				return;
			}

			// 5. Walk to Ellis if far
			if (!game.isNear(ELLIS_POINT, 4)) {
				if (!game.isWebWalking()) {
					game.log('Walking to tanner (Ellis)...');
					game.webWalkTo(ELLIS_POINT);
				}
				delayManager.setDelay(2);
				return;
			}

			// 6. Near Ellis: interact to Tan
			const ellis = bot.npcs.getWithNames(['Ellis']);
			if (ellis && ellis.length > 0) {
				game.log('Interacting with Ellis to tan hides...');
				bot.npcs.interactSupplied(ellis[0], 'Trade');
				delayManager.setDelay(3);
			} else {
				game.interactWithNpc(['Ellis'], 'Trade');
				delayManager.setDelay(3);
			}
		},

		isSuppliesExhausted: () => exhausted,

		getStatus: () => `Tanning: ${tannedCount} tanned`,
	};
}
