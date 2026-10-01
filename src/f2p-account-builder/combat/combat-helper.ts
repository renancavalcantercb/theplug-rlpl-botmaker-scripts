/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument */
import { GameWrapper } from '../game.js';
import { CombatSettings } from '../types.js';
import {
	CombatMonsterZone,
	COMBAT_ZONES,
	COMMON_FOOD_IDS,
	CONFLICTING_TOOLS,
	LOOT_IDS,
	MELEE_WEAPONS_TIER,
} from './combat-types.js';

export class CombatHelper {
	/**
	 * Finds the best target according to P1/P2 priorities:
	 * P1: NPC attacking the player or engaged with the player (partially damaged), alive (>0 HP)
	 * P2: Fresh/idle NPC, full HP, not engaged with others, alive (>0 HP)
	 */
	public static findTarget(
		game: GameWrapper,
		zone: CombatMonsterZone,
	): { npc: net.runelite.api.NPC; priority: 'p1' | 'p2' } | null {
		const localPlayer = client.getLocalPlayer();
		if (!localPlayer) return null;

		const playerLoc = localPlayer.getWorldLocation();
		if (!playerLoc) return null;

		const npcs = bot.npcs.getWithNames(zone.npcNames);
		if (!npcs || npcs.length === 0) return null;

		let bestP1: { npc: net.runelite.api.NPC; dist: number } | null = null;
		let bestP2: { npc: net.runelite.api.NPC; dist: number } | null = null;

		for (const npc of npcs) {
			if (!npc) continue;

			// Instant dead check or 0 HP ratio
			if (npc.isDead() || npc.getHealthRatio() === 0) {
				continue;
			}

			const npcLoc = npc.getWorldLocation();
			if (!npcLoc || npcLoc.getPlane() !== playerLoc.getPlane()) {
				continue;
			}

			const distToCenter = npcLoc.distanceTo(zone.areaCenter);
			if (distToCenter > zone.radius + 6) {
				continue;
			}

			const distToPlayer = playerLoc.distanceTo(npcLoc);
			const interacting = npc.getInteracting();
			const healthRatio = npc.getHealthRatio();
			const healthScale = npc.getHealthScale();

			// Check Priority 1: Attacking us or damaged by us
			const isInteractingWithMe = interacting === localPlayer;
			const isDamagedByMe =
				healthRatio > 0 &&
				healthRatio < healthScale &&
				(!interacting || interacting === localPlayer);

			if (isInteractingWithMe || isDamagedByMe) {
				if (!bestP1 || distToPlayer < bestP1.dist) {
					bestP1 = { npc, dist: distToPlayer };
				}
				continue;
			}

			// Check Priority 2: Idle, fresh, not in combat with other players
			const isIdleOrFree = !interacting || interacting === localPlayer;
			const isFullHealth = healthRatio === -1 || healthRatio === healthScale;

			if (isIdleOrFree && isFullHealth) {
				if (!bestP2 || distToPlayer < bestP2.dist) {
					bestP2 = { npc, dist: distToPlayer };
				}
			}
		}

		if (bestP1) {
			return { npc: bestP1.npc, priority: 'p1' };
		}
		if (bestP2) {
			return { npc: bestP2.npc, priority: 'p2' };
		}

		return null;
	}

	/**
	 * Checks if a target is dead or lost
	 */
	public static isTargetDeadOrLost(npc: net.runelite.api.NPC | null): boolean {
		if (!npc) return true;
		try {
			if (npc.isDead()) return true;
			if (npc.getHealthRatio() === 0) return true;
			const loc = npc.getWorldLocation();
			if (!loc) return true;
			return false;
		} catch {
			return true;
		}
	}

	/**
	 * Determines which melee skill to train based on current levels and settings
	 */
	public static determineSkillToTrain(
		game: GameWrapper,
		settings: CombatSettings,
	): 'ATTACK' | 'STRENGTH' | 'DEFENCE' | 'DONE' {
		const curAtk = game.getRealLevel(net.runelite.api.Skill.ATTACK);
		const curStr = game.getRealLevel(net.runelite.api.Skill.STRENGTH);
		const curDef = game.getRealLevel(net.runelite.api.Skill.DEFENCE);

		const atkDone = settings.targetAttack <= 0 || curAtk >= settings.targetAttack;
		const strDone = settings.targetStrength <= 0 || curStr >= settings.targetStrength;
		const defDone = settings.targetDefence <= 0 || curDef >= settings.targetDefence;

		if (atkDone && strDone && defDone) {
			return 'DONE';
		}

		switch (settings.combatOrder) {
			case 'balanced': {
				// Pick the one with the lowest level that is not done
				const candidates: Array<{ skill: 'ATTACK' | 'STRENGTH' | 'DEFENCE'; level: number }> = [];
				if (!atkDone) candidates.push({ skill: 'ATTACK', level: curAtk });
				if (!strDone) candidates.push({ skill: 'STRENGTH', level: curStr });
				if (!defDone) candidates.push({ skill: 'DEFENCE', level: curDef });

				candidates.sort((a, b) => a.level - b.level);
				return candidates[0].skill;
			}
			case 'atk_str_def': {
				if (!atkDone) return 'ATTACK';
				if (!strDone) return 'STRENGTH';
				return 'DEFENCE';
			}
			case 'str_atk_def': {
				if (!strDone) return 'STRENGTH';
				if (!atkDone) return 'ATTACK';
				return 'DEFENCE';
			}
			case 'focus':
			default: {
				if (!atkDone) return 'ATTACK';
				if (!strDone) return 'STRENGTH';
				if (!defDone) return 'DEFENCE';
				return 'DONE';
			}
		}
	}

	/**
	 * Sets the attack style widget to match the desired skill
	 */
	public static setDesiredAttackStyle(skill: 'ATTACK' | 'STRENGTH' | 'DEFENCE'): void {
		try {
			if (skill === 'ATTACK') {
				bot.attackStyle.setStyle('Accurate');
			} else if (skill === 'STRENGTH') {
				bot.attackStyle.setStyle('Aggressive');
			} else if (skill === 'DEFENCE') {
				bot.attackStyle.setStyle('Defensive');
			}
		} catch {
			// Fallback if widget not accessible
		}
	}

	/**
	 * Eats food if hitpoints fall below eatAtHp percentage
	 */
	public static eatFoodIfNeeded(
		game: GameWrapper,
		foodName: string,
		eatAtHp: number,
	): boolean {
		const hpPercent = game.getHpPercent();
		if (hpPercent > eatAtHp) {
			return false;
		}

		// Try specified food first
		if (foodName && bot.inventory.containsName(foodName)) {
			game.log(`HP low (${hpPercent}%). Eating ${foodName}...`);
			bot.inventory.interactWithNames([foodName], ['Eat']);
			return true;
		}

		// Try common foods
		for (const [name, id] of Object.entries(COMMON_FOOD_IDS)) {
			if (bot.inventory.containsId(id)) {
				game.log(`HP low (${hpPercent}%). Eating ${name}...`);
				bot.inventory.interactWithIds([id], ['Eat']);
				return true;
			}
		}

		return false;
	}

	/**
	 * Equips the highest tier melee weapon available in inventory
	 */
	public static checkAndEquipBestWeapon(game: GameWrapper): boolean {
		const atkLevel = game.getRealLevel(net.runelite.api.Skill.ATTACK);

		for (const weapon of MELEE_WEAPONS_TIER) {
			if (atkLevel >= weapon.reqLevel) {
				if (bot.equipment.containsId(weapon.id)) {
					// Already wielding the best weapon
					return false;
				}
				if (bot.inventory.containsId(weapon.id)) {
					game.log(`Equipping weapon upgrade: ${weapon.name} (req Lv. ${weapon.reqLevel}).`);
					bot.inventory.interactWithIds([weapon.id], ['Wield', 'Equip', 'Wear']);
					return true;
				}
			}
		}

		return false;
	}

	/**
	 * Unequips any conflicting tools (e.g. Iron axe, pickaxes) that interfere with combat
	 */
	public static unequipConflictingTools(game: GameWrapper): boolean {
		if (bot.inventory.isFull()) {
			return false;
		}

		for (const toolName of CONFLICTING_TOOLS) {
			if (bot.equipment.containsName(toolName)) {
				game.log(`Unequipping conflicting tool: ${toolName}`);
				const equipped = bot.equipment.getEquipment();
				if (equipped && Array.isArray(equipped)) {
					for (const item of equipped) {
						const id = (item as any)?.getId?.() ?? (item as any)?.id;
						if (id && id > 0) {
							try {
								const def = client.getItemDefinition(id);
								if (def && def.getName() === toolName) {
									bot.equipment.unequip(id);
									return true;
								}
							} catch {
								// Fallback
							}
						}
					}
				}
			}
		}

		return false;
	}

	/**
	 * Buries any bones currently held in the inventory
	 */
	public static buryBonesIfNeeded(game: GameWrapper): boolean {
		if (bot.inventory.containsId(LOOT_IDS.BONES)) {
			game.log('Burying bones for Prayer XP...');
			bot.inventory.interactWithIds([LOOT_IDS.BONES], ['Bury']);
			return true;
		}
		return false;
	}

	/**
	 * Loots valuable ground drops around the combat area
	 */
	public static lootDrops(
		game: GameWrapper,
		settings: CombatSettings,
		zoneLabel: string,
	): boolean {
		const lootIds: number[] = [];

		if (settings.lootCoins) {
			lootIds.push(LOOT_IDS.COINS);
		}
		if (settings.lootRunes) {
			lootIds.push(
				LOOT_IDS.AIR_RUNE,
				LOOT_IDS.WATER_RUNE,
				LOOT_IDS.EARTH_RUNE,
				LOOT_IDS.FIRE_RUNE,
				LOOT_IDS.MIND_RUNE,
				LOOT_IDS.BODY_RUNE,
			);
		}

		const isInvFull = bot.inventory.isFull();

		if (!isInvFull) {
			if (settings.lootBones) {
				lootIds.push(LOOT_IDS.BONES);
			}
			if (zoneLabel.includes('Chickens')) {
				lootIds.push(LOOT_IDS.FEATHER);
			}
			if (zoneLabel.includes('Cows')) {
				lootIds.push(LOOT_IDS.COWHIDE);
			}
		} else {
			// Stackables can still be looted if already in inventory
			if (zoneLabel.includes('Chickens') && bot.inventory.containsId(LOOT_IDS.FEATHER)) {
				lootIds.push(LOOT_IDS.FEATHER);
			}
		}

		if (lootIds.length === 0) {
			return false;
		}

		try {
			const groundItems = bot.tileItems.getItemsWithIds(lootIds);
			if (groundItems && groundItems.length > 0) {
				return bot.tileItems.lootItemsWithIds(lootIds, 8);
			}
		} catch {
			// Fallback
		}

		return false;
	}

	/**
	 * Matches the selected monster string to a known CombatMonsterZone
	 */
	public static getZone(monsterName: string): CombatMonsterZone {
		for (const [key, zone] of Object.entries(COMBAT_ZONES)) {
			if (key.toLowerCase().includes(monsterName.toLowerCase()) || monsterName.toLowerCase().includes(key.toLowerCase())) {
				return zone;
			}
		}
		return COMBAT_ZONES['Chickens (Lumbridge)'];
	}
}
