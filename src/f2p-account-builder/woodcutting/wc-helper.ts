/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument */
import { GameWrapper } from '../game.js';
import { AXES, AxeDefinition, TREES, TreeDefinition } from './wc-types.js';

export class WcHelper {
	public static hasAxe(game: GameWrapper): boolean {
		for (const axe of AXES) {
			if (bot.equipment.containsId(axe.id) || game.getInventoryQuantity(axe.id) > 0) {
				return true;
			}
		}
		return false;
	}

	public static getBestUsableAxe(game: GameWrapper): AxeDefinition | null {
		const wcLevel = game.getRealLevel(net.runelite.api.Skill.WOODCUTTING);
		for (const axe of AXES) {
			if (wcLevel >= axe.woodcuttingLevel) {
				if (bot.equipment.containsId(axe.id) || game.getInventoryQuantity(axe.id) > 0 || game.getBankQuantity(axe.id) > 0) {
					return axe;
				}
			}
		}
		return null;
	}

	public static matchTreeDefinition(label: string, wcLevel: number): TreeDefinition {
		const match = TREES.find((t) => t.label.toLowerCase().includes(label.toLowerCase()) || label.toLowerCase().includes(t.logName.toLowerCase()));
		if (match && wcLevel >= match.level) {
			return match;
		}

		// Fallback to highest unlocked tree
		for (let i = TREES.length - 1; i >= 0; i--) {
			if (wcLevel >= TREES[i].level) {
				return TREES[i];
			}
		}
		return TREES[0];
	}

	public static isChopping(): boolean {
		try {
			const player = client.getLocalPlayer();
			if (!player) return false;
			const anim = player.getAnimation();
			// Common Woodcutting animation IDs: 879 (Bronze), 877 (Iron), 875 (Steel), 871 (Mithril), 869 (Adamant), 867 (Rune)
			return anim === 879 || anim === 877 || anim === 875 || anim === 873 || anim === 871 || anim === 869 || anim === 867 || anim === 865;
		} catch {
			return false;
		}
	}

	public static findClosestTree(
		treeDef: TreeDefinition,
		maxDistance = 25,
	): net.runelite.api.TileObject | null {
		const objects = bot.objects.getTileObjectsWithNames(treeDef.objectNames);
		if (!objects || objects.length === 0) return null;

		const playerLoc = client.getLocalPlayer()?.getWorldLocation();
		if (!playerLoc) return null;

		let closest: net.runelite.api.TileObject | null = null;
		let minDistance = maxDistance;

		for (const obj of objects) {
			const loc = (obj as any).getWorldLocation?.();
			if (loc && loc.getPlane() === playerLoc.getPlane()) {
				const dist = playerLoc.distanceTo(loc);
				if (dist < minDistance) {
					minDistance = dist;
					closest = obj;
				}
			}
		}
		return closest;
	}

	public static chopTree(tree: net.runelite.api.TileObject): boolean {
		bot.objects.interactSuppliedObject(tree, 'Chop down');
		return true;
	}

	public static dropLogs(logName: string): boolean {
		if (bot.inventory.containsName(logName)) {
			bot.inventory.interactWithNames([logName], ['Drop']);
			return true;
		}
		return false;
	}
}
