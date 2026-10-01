/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument */
import { GameWrapper } from '../game.js';
import { DelayManager, TaskHandler } from '../state.js';
import { AccountBuilderSettings } from '../types.js';
import { WcHelper } from './wc-helper.js';
import { TreeDefinition } from './wc-types.js';

export function createWoodcuttingTaskHandler(
	game: GameWrapper,
	settings: AccountBuilderSettings,
	delayManager: DelayManager,
): TaskHandler {
	let currentTree: TreeDefinition | null = null;
	let idleCount = 0;

	return {
		category: 'Woodcutting',

		onStart: () => {
			const wcLevel = game.getRealLevel(net.runelite.api.Skill.WOODCUTTING);
			currentTree = WcHelper.matchTreeDefinition(settings.woodcutting.tree, wcLevel);
			idleCount = 0;
			game.log(
				`Starting Woodcutting: ${currentTree.label} (Current Lv: ${wcLevel} / Target Lv: ${settings.woodcutting.targetLevel || 'Unlimited'}, Mode: ${settings.woodcutting.dropLogs ? 'Powerchop' : 'Bank'}).`,
			);
		},

		tick: () => {
			const wcLevel = game.getRealLevel(net.runelite.api.Skill.WOODCUTTING);
			if (!currentTree || wcLevel < currentTree.level) {
				currentTree = WcHelper.matchTreeDefinition(settings.woodcutting.tree, wcLevel);
			}

			// 1. Ensure we have an axe
			if (!WcHelper.hasAxe(game)) {
				if (game.isBankOpen()) {
					const bestAxe = WcHelper.getBestUsableAxe(game);
					if (bestAxe && game.getBankQuantity(bestAxe.id) > 0) {
						game.log(`Withdrawing ${bestAxe.name} from bank...`);
						game.withdrawQuantity(bestAxe.id, 1);
						delayManager.setDelay(2);
						return;
					}
					// Fallback to bronze axe (1351)
					if (game.getBankQuantity(1351) > 0) {
						game.withdrawQuantity(1351, 1);
						delayManager.setDelay(2);
						return;
					}
				}

				if (!game.isWebWalking()) {
					game.log('No axe found in inventory. Walking to bank...');
					game.webWalkToNearestBank();
				}
				delayManager.setDelay(3);
				return;
			}

			// Close bank if open and we have axe
			if (game.isBankOpen() && !game.isInventoryFull()) {
				game.closeBank();
				delayManager.setDelay(1);
				return;
			}

			// 2. Handle Inventory Full
			if (game.isInventoryFull()) {
				if (settings.woodcutting.dropLogs) {
					// Powerchopping mode: drop logs
					game.log(`Inventory full! Dropping ${currentTree.logName}...`);
					WcHelper.dropLogs(currentTree.logName);
					delayManager.setDelay(1);
					return;
				} else {
					// Bank mode: walk to bank and deposit logs
					if (game.isBankOpen()) {
						game.log('Depositing logs into bank...');
						// Deposit all except equipped/held axes
						const heldAxe = WcHelper.getBestUsableAxe(game);
						const keepIds = heldAxe ? [heldAxe.id] : [1351];
						game.depositAllExcept(keepIds);
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

					game.log('Opening bank to deposit logs...');
					game.openBank();
					delayManager.setDelay(2);
					return;
				}
			}

			// 3. Navigate to Tree Cluster
			const playerLoc = client.getLocalPlayer()?.getWorldLocation();
			const targetSpot = currentTree.defaultSpot;
			const isNearTrees = playerLoc && playerLoc.distanceTo(targetSpot) <= 25;

			if (!isNearTrees) {
				if (!game.isWebWalking()) {
					game.log(`Navigating to ${currentTree.label} cluster...`);
					game.webWalkTo(targetSpot);
				}
				delayManager.setDelay(3);
				return;
			}

			// 4. Check if currently chopping
			if (WcHelper.isChopping()) {
				idleCount = 0;
				// Random human delay while chopping
				delayManager.setDelay(
					DelayManager.getReactionTicks(
						settings.general.playStyle,
						settings.general.noobMode,
						game.getTotalLevel(),
					),
				);
				return;
			}

			// 5. Look for closest tree and chop
			const tree = WcHelper.findClosestTree(currentTree, 25);
			if (tree) {
				idleCount = 0;
				game.log(`Chopping ${currentTree.label}...`);
				WcHelper.chopTree(tree);
				delayManager.setDelay(
					DelayManager.getReactionTicks(
						settings.general.playStyle,
						settings.general.noobMode,
						game.getTotalLevel(),
					),
				);
				return;
			}

			// Waiting for trees to respawn
			if (++idleCount > 10) {
				game.log(`Waiting for ${currentTree.label} to respawn...`);
				idleCount = 0;
			}
			delayManager.setDelay(2);
		},

		isComplete: () => {
			const target = settings.woodcutting.targetLevel;
			if (!target || target <= 0) return false;
			const levelReached = game.getRealLevel(net.runelite.api.Skill.WOODCUTTING) >= target;
			if (!levelReached) return false;

			// If strictly enforcing level goals, stop immediately
			if (settings.general.strictLevelGoals) return true;

			// Humanized: Finish dropping or depositing remaining logs in inventory
			if (currentTree && bot.inventory.containsName(currentTree.logName)) {
				return false;
			}
			return true;
		},

		getStatus: () => {
			const curr = game.getRealLevel(net.runelite.api.Skill.WOODCUTTING);
			const treeLabel = currentTree ? currentTree.label : 'Tree';
			return `WC: Lv. ${curr}/${settings.woodcutting.targetLevel || 'Max'} (${treeLabel})`;
		},
	};
}
