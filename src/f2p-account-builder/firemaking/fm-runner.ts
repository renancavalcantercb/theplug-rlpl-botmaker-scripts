/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument */
import { GameWrapper } from '../game.js';
import { DelayManager, TaskHandler } from '../state.js';
import { AccountBuilderSettings } from '../types.js';
import { FmHelper } from './fm-helper.js';
import { ITEM_TINDERBOX, LogDefinition } from './fm-types.js';

export function createFiremakingTaskHandler(
	game: GameWrapper,
	settings: AccountBuilderSettings,
	delayManager: DelayManager,
): TaskHandler {
	let currentLog: LogDefinition | null = null;
	let outOfLogs = false;

	return {
		category: 'Firemaking',

		onStart: () => {
			const fmLevel = game.getRealLevel(net.runelite.api.Skill.FIREMAKING);
			currentLog = FmHelper.matchLogDefinition(settings.firemaking.log, fmLevel);
			outOfLogs = false;
			game.log(
				`Starting Firemaking: ${currentLog.label} (Current Lv: ${fmLevel} / Target Lv: ${settings.firemaking.targetLevel || 'Unlimited'}).`,
			);
		},

		tick: () => {
			const fmLevel = game.getRealLevel(net.runelite.api.Skill.FIREMAKING);
			if (!currentLog || fmLevel < currentLog.level) {
				currentLog = FmHelper.matchLogDefinition(settings.firemaking.log, fmLevel);
			}

			const hasLogsInInv = game.getInventoryQuantity(currentLog.logId) > 0;
			const hasTinderbox = FmHelper.hasTinderbox(game);

			// 1. Banking if out of supplies
			if (!hasLogsInInv || !hasTinderbox) {
				if (game.isBankOpen()) {
					// Deposit ashes or unwanted items (keep tinderbox)
					game.depositAllExcept([ITEM_TINDERBOX]);

					// Withdraw Tinderbox if missing
					if (!hasTinderbox) {
						if (game.getBankQuantity(ITEM_TINDERBOX) > 0) {
							game.log('Withdrawing Tinderbox from bank...');
							game.withdrawQuantity(ITEM_TINDERBOX, 1);
							delayManager.setDelay(2);
							return;
						} else {
							game.log('No Tinderbox found in bank!');
							outOfLogs = true;
							return;
						}
					}

					// Withdraw Logs
					if (game.getBankQuantity(currentLog.logId) > 0) {
						game.log(`Withdrawing ${currentLog.logName} from bank...`);
						game.withdrawAll(currentLog.logId);
						delayManager.setDelay(2);
						return;
					} else {
						game.log(`No ${currentLog.logName} remaining in bank.`);
						outOfLogs = true;
						return;
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

				game.log('Need firemaking supplies. Opening bank...');
				game.openBank();
				delayManager.setDelay(2);
				return;
			}

			// Close bank if open
			if (game.isBankOpen()) {
				game.closeBank();
				delayManager.setDelay(1);
				return;
			}

			// 2. Walk to Fireline Area if needed
			const playerLoc = client.getLocalPlayer()?.getWorldLocation();
			const spot = FmHelper.getClosestFirelineSpot(playerLoc);
			if (playerLoc && playerLoc.distanceTo(spot.startPoint) > 30) {
				if (!game.isWebWalking()) {
					game.log(`Navigating to open firemaking spot at ${spot.name}...`);
					game.webWalkTo(spot.startPoint);
				}
				delayManager.setDelay(3);
				return;
			}

			// 3. Check if current tile already has a fire
			if (FmHelper.isCurrentTileOnFire()) {
				// Step 1 tile west to start fireline
				if (playerLoc) {
					const nextTile = new net.runelite.api.coords.WorldPoint(
						playerLoc.getX() - 1,
						playerLoc.getY(),
						playerLoc.getPlane(),
					);
					bot.walking.walkToTrueWorldPoint(nextTile.getX(), nextTile.getY());
					delayManager.setDelay(2);
					return;
				}
			}

			// 4. Check if currently lighting
			if (FmHelper.isLighting()) {
				delayManager.setDelay(2);
				return;
			}

			// 5. Light the log
			game.log(`Lighting ${currentLog.logName}...`);
			FmHelper.lightLog(currentLog.logId);
			delayManager.setDelay(
				DelayManager.getReactionTicks(
					settings.general.playStyle,
					settings.general.noobMode,
					game.getTotalLevel(),
				) + 1,
			);
		},

		isComplete: () => {
			if (outOfLogs) return true;
			const target = settings.firemaking.targetLevel;
			if (!target || target <= 0) return false;
			const levelReached = game.getRealLevel(net.runelite.api.Skill.FIREMAKING) >= target;
			if (!levelReached) return false;

			// If strictly enforcing level goals, stop immediately
			if (settings.general.strictLevelGoals) return true;

			// Humanized: Finish burning remaining logs in inventory
			if (currentLog && game.getInventoryQuantity(currentLog.logId) > 0) {
				return false;
			}
			return true;
		},

		getStatus: () => {
			const curr = game.getRealLevel(net.runelite.api.Skill.FIREMAKING);
			const logName = currentLog ? currentLog.label : 'Logs';
			return `FM: Lv. ${curr}/${settings.firemaking.targetLevel || 'Max'} (${logName})`;
		},
	};
}
