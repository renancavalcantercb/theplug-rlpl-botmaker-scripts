/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument */
import { GameWrapper } from '../game.js';
import { DelayManager, TaskHandler } from '../state.js';
import { AccountBuilderSettings } from '../types.js';
import { FishHelper } from './fish-helper.js';
import { FishMethodDefinition } from './fish-types.js';

export function createFishingTaskHandler(
	game: GameWrapper,
	settings: AccountBuilderSettings,
	delayManager: DelayManager,
): TaskHandler {
	let currentMethod: FishMethodDefinition | null = null;
	let idleCount = 0;

	return {
		category: 'Fishing',

		onStart: () => {
			const fishLvl = game.getRealLevel(net.runelite.api.Skill.FISHING);
			currentMethod = FishHelper.matchMethod(settings.fishing.method, fishLvl);
			idleCount = 0;
			game.log(
				`Starting Fishing: ${currentMethod.label} (Current Lv: ${fishLvl} / Target Lv: ${settings.fishing.targetLevel || 'Unlimited'}, Mode: ${settings.fishing.dropFish ? 'Powerfish' : 'Bank'}).`,
			);
		},

		tick: () => {
			const fishLvl = game.getRealLevel(net.runelite.api.Skill.FISHING);
			if (!currentMethod || fishLvl < currentMethod.level) {
				currentMethod = FishHelper.matchMethod(settings.fishing.method, fishLvl);
			}

			// 1. Ensure we have fishing tools & bait
			if (!FishHelper.hasSupplies(game, currentMethod)) {
				if (game.isBankOpen()) {
					// Withdraw tool if missing
					if (game.getInventoryQuantity(currentMethod.toolId) === 0 && !bot.equipment.containsId(currentMethod.toolId)) {
						if (game.getBankQuantity(currentMethod.toolId) > 0) {
							game.log(`Withdrawing ${currentMethod.toolName} from bank...`);
							game.withdrawQuantity(currentMethod.toolId, 1);
							delayManager.setDelay(2);
							return;
						} else {
							game.log(`No ${currentMethod.toolName} found in bank!`);
						}
					}

					// Withdraw bait if needed
					if (currentMethod.baitId && game.getInventoryQuantity(currentMethod.baitId) === 0) {
						if (game.getBankQuantity(currentMethod.baitId) > 0) {
							game.log(`Withdrawing ${currentMethod.baitName} from bank...`);
							game.withdrawQuantity(currentMethod.baitId, 1000);
							delayManager.setDelay(2);
							return;
						} else {
							game.log(`No ${currentMethod.baitName} found in bank!`);
						}
					}
				}

				if (game.isDialogueOpen()) {
					game.handleDialogue();
					delayManager.setDelay(1);
					return;
				}

				if (game.isWebWalking()) {
					delayManager.setDelay(2);
					return;
				}

				game.log(`Missing fishing supplies (${currentMethod.toolName}). Opening bank...`);
				game.openBank();
				delayManager.setDelay(2);
				return;
			}

			// Close bank if open
			if (game.isBankOpen() && !game.isInventoryFull()) {
				game.closeBank();
				delayManager.setDelay(1);
				return;
			}

			// 2. Handle Inventory Full
			if (game.isInventoryFull()) {
				if (settings.fishing.dropFish) {
					game.log('Inventory full! Dropping caught fish...');
					FishHelper.dropFish(currentMethod.rawFishNames);
					delayManager.setDelay(1);
					return;
				} else {
					if (game.isBankOpen()) {
						game.log('Depositing fish into bank...');
						const keep = [currentMethod.toolId];
						if (currentMethod.baitId) keep.push(currentMethod.baitId);
						game.depositAllExcept(keep);
						delayManager.setDelay(2);
						return;
					}

					if (game.isDialogueOpen()) {
						game.handleDialogue();
						delayManager.setDelay(1);
						return;
					}

					if (game.isWebWalking()) {
						delayManager.setDelay(2);
						return;
					}

					game.log('Opening bank to deposit fish...');
					game.openBank();
					delayManager.setDelay(2);
					return;
				}
			}

			// 3. Navigate to Fishing Spot Area
			const playerLoc = client.getLocalPlayer()?.getWorldLocation();
			const targetSpot = currentMethod.defaultSpot;
			const isNear = playerLoc && playerLoc.distanceTo(targetSpot) <= 25;

			if (!isNear) {
				if (!game.isWebWalking()) {
					game.log(`Navigating to ${currentMethod.label} spot...`);
					game.webWalkTo(targetSpot);
				}
				delayManager.setDelay(3);
				return;
			}

			// 4. Check if currently fishing
			if (FishHelper.isFishing()) {
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

			// 5. Find closest fishing spot NPC and fish
			const spot = FishHelper.findClosestFishingSpot(25);
			if (spot) {
				idleCount = 0;
				game.log(`Interacting with Fishing spot (${currentMethod.spotAction})...`);
				FishHelper.fishAtSpot(spot, currentMethod.spotAction);
				delayManager.setDelay(
					DelayManager.getReactionTicks(
						settings.general.playStyle,
						settings.general.noobMode,
						game.getTotalLevel(),
					) + 1,
				);
				return;
			}

			// Spot moved or waiting
			if (++idleCount > 8) {
				game.log('Searching for active fishing spot...');
				idleCount = 0;
			}
			delayManager.setDelay(2);
		},

		isComplete: () => {
			const target = settings.fishing.targetLevel;
			if (!target || target <= 0) return false;
			const levelReached = game.getRealLevel(net.runelite.api.Skill.FISHING) >= target;
			if (!levelReached) return false;

			// If strictly enforcing level goals, stop immediately
			if (settings.general.strictLevelGoals) return true;

			// Humanized: Finish dropping or depositing remaining fish in inventory
			if (currentMethod && bot.inventory.containsAnyNames(currentMethod.rawFishNames)) {
				return false;
			}
			return true;
		},

		getStatus: () => {
			const curr = game.getRealLevel(net.runelite.api.Skill.FISHING);
			const label = currentMethod ? currentMethod.label : 'Fishing';
			return `Fish: Lv. ${curr}/${settings.fishing.targetLevel || 'Max'} (${label})`;
		},
	};
}
