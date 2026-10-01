/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument */
import { GameWrapper } from '../game.js';
import { DelayManager, TaskHandler } from '../state.js';
import { AccountBuilderSettings } from '../types.js';
import { CookHelper } from './cook-helper.js';
import { CookableFood, CookingLocation } from './cook-types.js';

export function createCookingTaskHandler(
	game: GameWrapper,
	settings: AccountBuilderSettings,
	delayManager: DelayManager,
): TaskHandler {
	let currentLocation: CookingLocation = CookHelper.matchLocation(settings.cooking.location);
	let currentFood: CookableFood | null = null;
	let outOfSupplies = false;
	let lastRawCount = 0;
	let idleCount = 0;
	let totalCooked = 0;

	return {
		category: 'Cooking',

		onStart: () => {
			const cookLvl = game.getRealLevel(net.runelite.api.Skill.COOKING);
			currentLocation = CookHelper.matchLocation(settings.cooking.location);
			currentFood = settings.cooking.progressive
				? null
				: CookHelper.matchFood(settings.cooking.food, cookLvl);
			outOfSupplies = false;
			lastRawCount = 0;
			idleCount = 0;

			game.log(
				`Starting Cooking: Target Lv ${settings.cooking.targetLevel || 'Unlimited'}, Mode: ${
					settings.cooking.progressive ? 'Progressive' : (currentFood?.name ?? settings.cooking.food)
				}, Spot: ${currentLocation.label}.`,
			);
		},

		tick: () => {
			const cookLvl = game.getRealLevel(net.runelite.api.Skill.COOKING);

			// 1. Drop burnt food if configured
			if (settings.cooking.dropBurnt && CookHelper.hasBurntFood()) {
				game.log('Dropping burnt food...');
				CookHelper.dropBurntFood();
				delayManager.setDelay(1);
				return;
			}

			// 2. Check if player has raw food in inventory
			const rawInInv = CookHelper.findRawFoodInInventory(game);

			if (rawInInv) {
				currentFood = rawInInv;

				// Close bank if open
				if (game.isBankOpen()) {
					game.closeBank();
					delayManager.setDelay(1);
					return;
				}

				// Check proximity to cooking spot
				const playerLoc = client.getLocalPlayer()?.getWorldLocation();
				const isNearSpot =
					playerLoc !== null &&
					playerLoc !== undefined &&
					playerLoc.distanceTo(currentLocation.spotPoint) <= 12;

				if (!isNearSpot) {
					if (!game.isWebWalking()) {
						game.log(`Walking to cooking spot (${currentLocation.label})...`);
						game.webWalkTo(currentLocation.spotPoint);
					}
					delayManager.setDelay(3);
					return;
				}

				// At cooking spot: handle make menu
				if (CookHelper.isMakeMenuVisible()) {
					game.log(`Make menu visible. Starting to cook ${currentFood.name}...`);
					CookHelper.clickCookWidget();
					lastRawCount = game.getInventoryQuantity(currentFood.id);
					idleCount = 0;
					delayManager.setDelay(DelayManager.getReactionTicks(settings.general.playStyle) + 1);
					return;
				}

				// Check if level-up or dialogue interrupted
				if (game.isDialogueOpen()) {
					game.log('Handling dialogue / level-up interruption...');
					game.handleDialogue([]);
					delayManager.setDelay(1);
					return;
				}

				// Check if currently cooking (XP or raw food decrease)
				const currentRawCount = game.getInventoryQuantity(currentFood.id);
				if (currentRawCount < lastRawCount) {
					// We successfully cooked a fish
					totalCooked += lastRawCount - currentRawCount;
					lastRawCount = currentRawCount;
					idleCount = 0;
					delayManager.setDelay(
						DelayManager.getReactionTicks(
							settings.general.playStyle,
							settings.general.noobMode,
							game.getTotalLevel(),
						),
					);
					return;
				}

				// Check animation
				if (CookHelper.isCookingAnimation()) {
					idleCount = 0;
					delayManager.setDelay(
						DelayManager.getReactionTicks(
							settings.general.playStyle,
							settings.general.noobMode,
							game.getTotalLevel(),
						),
					);
					return;
				}

				// Not cooking and make menu not visible: interact with cooking spot
				if (++idleCount > 3) {
					idleCount = 0;
					game.log(`Interacting with ${currentLocation.label} to cook ${currentFood.name}...`);
					CookHelper.interactCookingObject(currentLocation);
					delayManager.setDelay(2);
					return;
				}

				delayManager.setDelay(1);
				return;
			}

			// 3. No raw food in inventory: banking routine
			if (game.isBankOpen()) {
				// Deposit cooked / burnt / leftover items
				if (game.getEmptySlots() < 28) {
					game.log('Depositing inventory into bank...');
					game.depositAll();
					delayManager.setDelay(2);
					return;
				}

				// Determine which raw food to withdraw
				let foodToWithdraw: CookableFood | null = null;
				if (settings.cooking.progressive) {
					foodToWithdraw = CookHelper.findHighestFoodInBank(cookLvl, game);
				} else {
					const targetDef = CookHelper.matchFood(settings.cooking.food, cookLvl);
					if (game.getBankQuantity(targetDef.id) > 0) {
						foodToWithdraw = targetDef;
					}
				}

				if (!foodToWithdraw) {
					game.log('No cookable raw food found in bank! Marking cooking task complete.');
					outOfSupplies = true;
					game.closeBank();
					delayManager.setDelay(2);
					return;
				}

				game.log(`Withdrawing all ${foodToWithdraw.name} from bank...`);
				currentFood = foodToWithdraw;
				game.withdrawAll(foodToWithdraw.id);
				lastRawCount = 28;
				idleCount = 0;
				delayManager.setDelay(2);
				return;
			}

			// Bank is closed: walk to bank / open bank
			if (game.isDialogueOpen()) {
				game.handleDialogue();
				delayManager.setDelay(1);
				return;
			}

			if (game.isWebWalking()) {
				delayManager.setDelay(2);
				return;
			}

			const playerLoc = client.getLocalPlayer()?.getWorldLocation();
			const nearBank =
				currentLocation.bankPoint &&
				playerLoc &&
				playerLoc.distanceTo(currentLocation.bankPoint) <= 6;

			if (nearBank) {
				game.log('Opening bank...');
				game.openBank();
				delayManager.setDelay(2);
				return;
			}

			game.log('Out of raw food. Walking to bank...');
			if (currentLocation.bankPoint) {
				game.webWalkTo(currentLocation.bankPoint);
			} else {
				game.openBank();
			}
			delayManager.setDelay(3);
		},

		isComplete: () => {
			if (outOfSupplies) return true;
			const target = settings.cooking.targetLevel;
			if (!target || target <= 0) return false;
			const levelReached = game.getRealLevel(net.runelite.api.Skill.COOKING) >= target;
			if (!levelReached) return false;

			// If strictly enforcing level goals, stop immediately
			if (settings.general.strictLevelGoals) return true;

			// Humanized: Finish cooking remaining raw food in inventory
			if (currentFood && game.getInventoryQuantity(currentFood.id) > 0) {
				return false;
			}
			return true;
		},

		getStatus: () => {
			const curr = game.getRealLevel(net.runelite.api.Skill.COOKING);
			const label = currentFood
				? currentFood.name
				: settings.cooking.progressive
				? 'Progressive'
				: settings.cooking.food;
			return `Cook: Lv. ${curr}/${settings.cooking.targetLevel || 'Max'} (${label}, Done: ${totalCooked})`;
		},
	};
}
