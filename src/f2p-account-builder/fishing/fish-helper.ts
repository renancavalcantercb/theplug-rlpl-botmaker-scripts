/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument */
import { GameWrapper } from '../game.js';
import { FISH_METHODS, FishMethodDefinition } from './fish-types.js';

export class FishHelper {
	public static hasSupplies(game: GameWrapper, method: FishMethodDefinition): boolean {
		const hasTool = game.getInventoryQuantity(method.toolId) > 0 || bot.equipment.containsId(method.toolId);
		if (!hasTool) return false;

		if (method.baitId) {
			return game.getInventoryQuantity(method.baitId) > 0;
		}
		return true;
	}

	public static matchMethod(label: string, fishingLevel: number): FishMethodDefinition {
		const match = FISH_METHODS.find((m) => m.label.toLowerCase().includes(label.toLowerCase()) || label.toLowerCase().includes(m.key.toLowerCase()));
		if (match && fishingLevel >= match.level) {
			return match;
		}

		// Fallback to highest unlocked method
		for (let i = FISH_METHODS.length - 1; i >= 0; i--) {
			if (fishingLevel >= FISH_METHODS[i].level) {
				return FISH_METHODS[i];
			}
		}
		return FISH_METHODS[0];
	}

	public static isFishing(): boolean {
		try {
			const player = client.getLocalPlayer();
			if (!player) return false;
			const anim = player.getAnimation();
			// 621 = small net, 622 = rod, 623 = fly rod, 619 = cage, 618 = harpoon
			return anim === 621 || anim === 622 || anim === 623 || anim === 619 || anim === 618;
		} catch {
			return false;
		}
	}

	public static findClosestFishingSpot(
		maxDistance = 25,
	): net.runelite.api.NPC | null {
		const npcs = bot.npcs.getWithNames(['Fishing spot', 'Rod Fishing spot']);
		if (!npcs || npcs.length === 0) return null;

		const playerLoc = client.getLocalPlayer()?.getWorldLocation();
		if (!playerLoc) return null;

		let closest: net.runelite.api.NPC | null = null;
		let minDistance = maxDistance;

		for (const npc of npcs) {
			const loc = (npc as any).getWorldLocation?.();
			if (loc && loc.getPlane() === playerLoc.getPlane()) {
				const dist = playerLoc.distanceTo(loc);
				if (dist < minDistance) {
					minDistance = dist;
					closest = npc;
				}
			}
		}
		return closest;
	}

	public static fishAtSpot(spot: net.runelite.api.NPC, action: string): boolean {
		bot.npcs.interactSupplied(spot, action);
		return true;
	}

	public static dropFish(fishNames: string[]): boolean {
		for (const name of fishNames) {
			if (bot.inventory.containsName(name)) {
				bot.inventory.interactWithNames([name], ['Drop']);
				return true;
			}
		}
		return false;
	}
}
