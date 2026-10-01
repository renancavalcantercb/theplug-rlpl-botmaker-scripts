/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument */
import { GameWrapper } from '../game.js';
import { DelayManager, TaskHandler } from '../state.js';
import { AccountBuilderSettings } from '../types.js';
import { CombatHelper } from './combat-helper.js';
import { CombatMonsterZone } from './combat-types.js';

export function createCombatTaskHandler(
	game: GameWrapper,
	settings: AccountBuilderSettings,
	delayManager: DelayManager,
): TaskHandler {
	let currentZone: CombatMonsterZone | null = null;
	let currentTarget: net.runelite.api.NPC | null = null;
	let currentTrainedSkill: 'ATTACK' | 'STRENGTH' | 'DEFENCE' | 'DONE' = 'ATTACK';
	let idleCount = 0;

	return {
		category: 'Combat',

		onStart: () => {
			currentZone = CombatHelper.getZone(settings.combat.monster);
			currentTarget = null;
			idleCount = 0;

			// Check and unequip conflicting tools immediately
			CombatHelper.unequipConflictingTools(game);

			// Equip best weapon
			CombatHelper.checkAndEquipBestWeapon(game);

			// Determine combat skill to train
			currentTrainedSkill = CombatHelper.determineSkillToTrain(game, settings.combat);
			if (currentTrainedSkill !== 'DONE') {
				CombatHelper.setDesiredAttackStyle(currentTrainedSkill);
			}

			const atk = game.getRealLevel(net.runelite.api.Skill.ATTACK);
			const str = game.getRealLevel(net.runelite.api.Skill.STRENGTH);
			const def = game.getRealLevel(net.runelite.api.Skill.DEFENCE);

			game.log(
				`Starting Combat: ${currentZone.label} (Current: ${atk}/${str}/${def} -> Target: ${settings.combat.targetAttack}/${settings.combat.targetStrength}/${settings.combat.targetDefence}, Training: ${currentTrainedSkill}).`,
			);
		},

		tick: () => {
			if (!currentZone) {
				currentZone = CombatHelper.getZone(settings.combat.monster);
			}

			// 1. Determine active training skill and ensure style matches
			currentTrainedSkill = CombatHelper.determineSkillToTrain(game, settings.combat);
			if (currentTrainedSkill === 'DONE') {
				game.log('Combat targets reached!');
				return;
			}
			CombatHelper.setDesiredAttackStyle(currentTrainedSkill);

			// 2. Clear illegal/conflicting equipment
			if (CombatHelper.unequipConflictingTools(game)) {
				delayManager.setDelay(1);
				return;
			}

			// 3. Equip weapon upgrades if available
			if (CombatHelper.checkAndEquipBestWeapon(game)) {
				delayManager.setDelay(2);
				return;
			}

			// 4. Survival: Check HP & Eat food
			if (
				CombatHelper.eatFoodIfNeeded(
					game,
					settings.combat.food,
					settings.combat.eatAtHp,
				)
			) {
				delayManager.setDelay(2);
				return;
			}

			// Critical HP safety check
			if (game.getHpPercent() < 20) {
				if (!game.isWebWalking()) {
					game.log('HP critically low (<20%) and out of food! Walking to safety / bank...');
					game.webWalkToNearestBank();
				}
				delayManager.setDelay(4);
				return;
			}

			// 5. Bury bones if enabled
			if (settings.combat.buryBones && CombatHelper.buryBonesIfNeeded(game)) {
				delayManager.setDelay(2);
				return;
			}

			// 6. Loot ground drops (feathers, cowhides, coins, runes, bones)
			if (CombatHelper.lootDrops(game, settings.combat, currentZone.label)) {
				delayManager.setDelay(2);
				return;
			}

			// 7. Check if current target is dead or lost -> instant release
			if (currentTarget) {
				if (CombatHelper.isTargetDeadOrLost(currentTarget)) {
					game.log('Target eliminated / 0 HP. Swapping to next target.');
					currentTarget = null;
					delayManager.setDelay(1);
					return;
				}
			}

			// 8. Check if local player is actively fighting
			const localPlayer = client.getLocalPlayer();
			const interacting = localPlayer ? localPlayer.getInteracting() : null;
			if (interacting && interacting instanceof net.runelite.api.NPC) {
				const activeNpc = interacting as net.runelite.api.NPC;
				if (!activeNpc.isDead() && activeNpc.getHealthRatio() !== 0) {
					currentTarget = activeNpc;
					idleCount = 0;
					delayManager.setDelay(
						DelayManager.getReactionTicks(
							settings.general.playStyle,
							settings.general.noobMode,
							game.getTotalLevel(),
						),
					);
					return;
				} else {
					// Interacting target just died
					currentTarget = null;
				}
			}

			// 9. Zone navigation
			const playerLoc = localPlayer ? localPlayer.getWorldLocation() : null;
			if (playerLoc && playerLoc.distanceTo(currentZone.areaCenter) > currentZone.radius + 4) {
				if (!game.isWebWalking()) {
					game.log(`Navigating to ${currentZone.label}...`);
					game.webWalkTo(currentZone.areaCenter);
				}
				delayManager.setDelay(3);
				return;
			}

			// 10. Find best target (P1 = engaged/attacking us, P2 = idle fresh monster)
			const targetInfo = CombatHelper.findTarget(game, currentZone);
			if (targetInfo) {
				currentTarget = targetInfo.npc;
				idleCount = 0;
				game.log(
					`Targeting [${targetInfo.priority}]: ${currentTarget.getName()} (dist: ${playerLoc ? playerLoc.distanceTo(currentTarget.getWorldLocation()) : '?'})`,
				);
				bot.npcs.interactSupplied(currentTarget, 'Attack');
				delayManager.setDelay(
					DelayManager.getReactionTicks(
						settings.general.playStyle,
						settings.general.noobMode,
						game.getTotalLevel(),
					),
				);
				return;
			}

			// 11. No monsters currently in range/available
			if (++idleCount > 6) {
				game.log(`Waiting for ${currentZone.label} monsters to spawn...`);
				idleCount = 0;
			}
			delayManager.setDelay(2);
		},

		isComplete: () => {
			const atk = game.getRealLevel(net.runelite.api.Skill.ATTACK);
			const str = game.getRealLevel(net.runelite.api.Skill.STRENGTH);
			const def = game.getRealLevel(net.runelite.api.Skill.DEFENCE);

			const atkDone = settings.combat.targetAttack <= 0 || atk >= settings.combat.targetAttack;
			const strDone = settings.combat.targetStrength <= 0 || str >= settings.combat.targetStrength;
			const defDone = settings.combat.targetDefence <= 0 || def >= settings.combat.targetDefence;

			if (!atkDone || !strDone || !defDone) {
				return false;
			}

			// If strictly enforcing level goals, stop immediately
			if (settings.general.strictLevelGoals) return true;

			// Humanized: Finish killing the current engaged monster before switching
			if (currentTarget && !CombatHelper.isTargetDeadOrLost(currentTarget)) {
				return false;
			}

			return true;
		},

		getStatus: () => {
			const atk = game.getRealLevel(net.runelite.api.Skill.ATTACK);
			const str = game.getRealLevel(net.runelite.api.Skill.STRENGTH);
			const def = game.getRealLevel(net.runelite.api.Skill.DEFENCE);
			return `Combat: ${atk}/${str}/${def} (Training: ${currentTrainedSkill})`;
		},
	};
}
