/**
 * ==========================================================
 *  AIO Cooking - Rogues' Den
 *  Author: xulixna (Discord)
 *  Framework: ThePlug Bot Maker (Rhino JS / TypeScript)
 * ==========================================================
 */
import { CookingSettings } from './config.js';
import {
	COOKABLE_FOODS,
	findHighestLevelFoodInBank,
	FoodDef,
	getFoodDefById,
} from './food.js';
import { CookingGame } from './game.js';

type State =
	| 'check_location'
	| 'walking_to_bank'
	| 'open_bank'
	| 'deposit'
	| 'plan_food'
	| 'withdraw'
	| 'close_bank'
	| 'cook_fire'
	| 'make_menu'
	| 'cooking'
	| 'stopped';

interface PendingAction {
	label: string;
	check: () => boolean;
	done: () => void;
	ticks: number;
}

export interface CookingRunner {
	tick: () => void;
}

export function createCookingRunner(
	game: CookingGame,
	settings: CookingSettings,
): CookingRunner {
	let state: State = 'check_location';
	let pending: PendingAction | null = null;
	let currentFood: FoodDef | null = null;
	let targetReached = false;
	let idleTicks = 0;
	let lastRawCount = 0;
	let totalCooked = 0;
	let retries = 0;
	let delayTicks = 0;
	const startTime = Date.now();
	let startXp = -1;
	let fallbackXpGained = 0;
	let ticksSinceCounterUpdate = 0;

	const updateDisplayCounters = (): void => {
		const elapsedMs = Math.max(1, Date.now() - startTime);
		const elapsedHours = elapsedMs / 3600000;

		// Initialize starting XP once available
		if (startXp === -1) {
			const currentXp = game.getCookingExperience();
			if (currentXp > 0) {
				startXp = currentXp;
			}
		}

		// Calculate XP gained
		let xpGained = 0;
		const currentXp = game.getCookingExperience();
		if (startXp > 0 && currentXp >= startXp) {
			xpGained = currentXp - startXp;
		} else {
			xpGained = fallbackXpGained;
		}

		// Hourly rate
		const xpPerHour =
			elapsedHours > 0.002 ? Math.floor(xpGained / elapsedHours) : 0;

		// Mode counter
		const modeLabel =
			settings.mode === 'progressive'
				? 'Mode [Progressive]'
				: `Mode [Fixed: ${getFoodDefById(settings.fixedFoodId)?.name ?? 'Food'}]`;
		game.setCounter(modeLabel, 1);

		// Style counter
		const styleLabel =
			settings.playStyle === 'lazy'
				? 'Style [Lazy AFK]'
				: 'Style [Normal]';
		game.setCounter(styleLabel, 1);

		const currentLvl = game.getRealCookingLevel();
		if (currentLvl > 0) {
			game.setCounter('Cooking Level', currentLvl);
		}

		if (settings.targetLevel > 0) {
			game.setCounter('Target Level', settings.targetLevel);
		}

		game.setCounter('XP Gained', xpGained);
		game.setCounter('XP / hr', xpPerHour);
		game.setCounter('Time (min)', Math.floor(elapsedMs / 60000));
	};

	const stop = (reason: string): void => {
		state = 'stopped';
		pending = null;
		game.log(reason);
		game.gameMessage(reason);
		game.terminate();
	};

	/**
	 * Computes a human reaction delay when cooking finishes,
	 * parameterized by the account's total level, player name seed, and playStyle.
	 */
	const calculatePostCookingDelay = (): number => {
		const totalLevel = game.getTotalLevel();
		const playerName = game.getPlayerName();

		// Unique account personality seed based on total level and name
		let seed = totalLevel > 0 ? totalLevel * 17 : 1337;
		for (let i = 0; i < playerName.length; i++) {
			seed = ((seed << 5) - seed + playerName.charCodeAt(i)) | 0;
		}
		seed = Math.abs(seed);

		if (settings.playStyle === 'lazy') {
			// In Lazy mode: player is tabbed out, relaxed or watching videos.
			// Base delay between 5 and 10 ticks (~3.0s to 6.0s) influenced by account seed
			const accountBias = seed % 6; // 0 to 5 ticks
			const base = 5 + accountBias; // 5 to 10 ticks

			// Dynamic random variance per batch (-1 to +6 ticks)
			const variance = Math.floor(Math.random() * 8) - 1;

			// Clamped to max 16-17 ticks (approx 10 seconds maximum)
			const delay = Math.max(4, Math.min(16, base + variance));
			return delay;
		} else {
			// Normal mode: active, attentive player with snappy reaction (1 to 4 ticks / 0.6s to 2.4s)
			const accountBias = seed % 2; // 0 or 1
			const variance = Math.floor(Math.random() * 2); // 0 or 1
			return Math.max(1, Math.min(4, 1 + accountBias + variance));
		}
	};

	/**
	 * Small micro-delays between consecutive actions to prevent robotic 0-tick clicks
	 */
	const microDelay = (minTicks: number, maxTicks: number): void => {
		const diff = Math.max(0, maxTicks - minTicks);
		const ticks = minTicks + Math.floor(Math.random() * (diff + 1));
		if (ticks > 0) {
			delayTicks = ticks;
		}
	};

	const wait = (
		label: string,
		action: () => void,
		check: () => boolean,
		done: () => void,
		ticks = 15,
	): void => {
		pending = { label, check, done, ticks };
		action();
	};

	const tick = (): void => {
		if (state === 'stopped' || !game.isLoggedIn()) {
			return;
		}

		// Handle human delays
		if (delayTicks > 0) {
			delayTicks--;
			return;
		}

		// Periodically update display counters
		if (++ticksSinceCounterUpdate >= 5) {
			ticksSinceCounterUpdate = 0;
			updateDisplayCounters();
		}

		// Check if target level has been reached
		if (
			!targetReached &&
			settings.targetLevel > 0 &&
			game.getRealCookingLevel() >= settings.targetLevel
		) {
			targetReached = true;
			game.log(
				`Target level ${settings.targetLevel} reached! Returning to bank to finish.`,
			);
			state = 'open_bank';
			pending = null;
		}

		// Handle pending action waiting
		if (pending) {
			if (pending.check()) {
				const done = pending.done;
				pending = null;
				done();
			} else if (--pending.ticks <= 0) {
				const label = pending.label;
				pending = null;
				game.log(`Action timed out: ${label}. Retrying...`);
				if (++retries > 3) {
					stop(`Failed repeatedly on action: ${label}`);
					return;
				}
				// Revert to bank on timeout
				state = 'open_bank';
			}
			return;
		}

		switch (state) {
			case 'check_location': {
				if (!game.isAtRoguesDen(20)) {
					game.log(
						'Player is not at Rogues\' Den bank. Starting WebWalk to WorldPoint(3040, 4969, 1)...',
					);
					game.gameMessage('Walking to Rogues\' Den via WebWalker...');
					game.webWalkToRoguesDen();
					state = 'walking_to_bank';
					break;
				}
				game.log('Verified location: Rogues\' Den Bank.');
				state = 'open_bank';
				break;
			}

			case 'walking_to_bank': {
				if (game.isAtRoguesDen(20)) {
					game.log('Arrived at Rogues\' Den! Transitioning to bank.');
					game.stopWebWalk();
					state = 'open_bank';
					break;
				}

				if (!game.isWebWalking()) {
					game.log(
						'WebWalk stopped before arriving. Restarting WebWalk to Rogues\' Den...',
					);
					game.webWalkToRoguesDen();
				}
				break;
			}

			case 'open_bank': {
				if (game.isBankOpen()) {
					state = 'deposit';
				} else {
					wait(
						'open bank (Emerald Benedict)',
						() => game.openBank(),
						() => game.isBankOpen(),
						() => {
							retries = 0;
							state = 'deposit';
						},
						20,
					);
				}
				break;
			}

			case 'deposit': {
				if (game.getEmptySlots() === 28) {
					state = 'plan_food';
				} else {
					wait(
						'deposit inventory',
						() => game.depositAll(),
						() => game.getEmptySlots() === 28,
						() => {
							retries = 0;
							if (settings.playStyle === 'lazy') {
								microDelay(1, 2);
							}
							state = 'plan_food';
						},
						15,
					);
				}
				break;
			}

			case 'plan_food': {
				if (targetReached) {
					stop(
						`Finished! Target level ${settings.targetLevel} reached. Total food cooked: ${totalCooked}`,
					);
					break;
				}

				const currentLevel = game.getCookingLevel();

				if (settings.mode === 'progressive') {
					const bestFood = findHighestLevelFoodInBank(
						currentLevel,
						(id) => game.getBankQuantity(id),
					);

					if (!bestFood) {
						stop(
							`Progressive mode: No cookable raw food found in bank for cooking level ${currentLevel}.`,
						);
						break;
					}

					currentFood = bestFood;
					game.log(
						`[Progressive] Selected highest level food: ${bestFood.name} (Lvl ${bestFood.level}), bank count: ${game.getBankQuantity(bestFood.id)}`,
					);
				} else {
					// Fixed mode
					const food = getFoodDefById(settings.fixedFoodId);
					if (!food) {
						stop(`Invalid fixed food ID: ${settings.fixedFoodId}`);
						break;
					}

					if (food.level > currentLevel) {
						stop(
							`Cooking level too low for ${food.name}! Required: ${food.level}, Current: ${currentLevel}`,
						);
						break;
					}

					if (game.getBankQuantity(food.id) <= 0) {
						stop(
							`Out of raw food in bank for fixed item: ${food.name}. Finished!`,
						);
						break;
					}

					currentFood = food;
					game.log(
						`[Fixed] Selected food: ${food.name}, bank count: ${game.getBankQuantity(food.id)}`,
					);
				}

				state = 'withdraw';
				break;
			}

			case 'withdraw': {
				const food = currentFood;
				if (!food) {
					state = 'plan_food';
					break;
				}

				wait(
					`withdraw ${food.name}`,
					() => game.withdrawAll(food.id),
					() => game.getInventoryQuantity(food.id) > 0,
					() => {
						retries = 0;
						lastRawCount = game.getInventoryQuantity(food.id);
						state = 'close_bank';
					},
					15,
				);
				break;
			}

			case 'close_bank': {
				wait(
					'close bank',
					() => game.closeBank(),
					() => !game.isBankOpen(),
					() => {
						retries = 0;
						if (settings.playStyle === 'lazy') {
							microDelay(1, 3);
						} else {
							microDelay(0, 1);
						}
						state = 'cook_fire';
					},
					15,
				);
				break;
			}

			case 'cook_fire': {
				const food = currentFood;
				if (!food || game.getInventoryQuantity(food.id) === 0) {
					state = 'open_bank';
					break;
				}

				if (game.isMakeMenuVisible()) {
					if (settings.playStyle === 'lazy') {
						microDelay(1, 2);
					}
					state = 'make_menu';
					break;
				}

				wait(
					'cook on fire',
					() => game.interactFire(),
					() => game.isMakeMenuVisible(),
					() => {
						retries = 0;
						state = 'make_menu';
					},
					15,
				);
				break;
			}

			case 'make_menu': {
				if (!game.isMakeMenuVisible()) {
					// If make menu closed, check if already cooking or re-interact
					state = 'cook_fire';
					break;
				}

				wait(
					'click cook option in make widget',
					() => game.clickCookWidget(),
					() => !game.isMakeMenuVisible(),
					() => {
						retries = 0;
						idleTicks = 0;
						if (settings.playStyle === 'lazy') {
							microDelay(1, 2);
						}
						state = 'cooking';
					},
					10,
				);
				break;
			}

			case 'cooking': {
				const food = currentFood;
				if (!food) {
					state = 'open_bank';
					break;
				}

				const currentRaw = game.getInventoryQuantity(food.id);

				// Done with current batch
				if (currentRaw === 0) {
					const cookedInBatch = lastRawCount;
					totalCooked += cookedInBatch;
					if (food.xp) {
						fallbackXpGained += cookedInBatch * food.xp;
					}
					updateDisplayCounters();
					game.log(
						`Batch complete! Total ${food.name} cooked: ${totalCooked}`,
					);

					// Apply account-based human reaction delay before banking
					const delay = calculatePostCookingDelay();
					const secs = (delay * 0.6).toFixed(1);
					game.log(
						`[Reaction] Waiting ${delay} ticks (~${secs}s) before banking (${settings.playStyle} mode)...`,
					);
					delayTicks = delay;
					state = 'open_bank';
					break;
				}

				// If food count decreased, player cooked something!
				if (currentRaw < lastRawCount) {
					const cooked = lastRawCount - currentRaw;
					totalCooked += cooked;
					if (food.xp) {
						fallbackXpGained += cooked * food.xp;
					}
					lastRawCount = currentRaw;
					idleTicks = 0;
					updateDisplayCounters();
				} else {
					idleTicks++;
				}

				// Check for level-up dialogue interrupting cooking
				game.handleDialogue();

				// If idle for too long while raw food is still in inventory, restart cooking
				if (idleTicks > 6) {
					game.log(
						`Cooking paused or interrupted (${currentRaw} raw food remaining). Re-cooking on fire...`,
					);
					idleTicks = 0;
					state = 'cook_fire';
				}
				break;
			}
		}
	};

	return {
		tick,
	};
}
