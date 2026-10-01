/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument */
import { GameWrapper } from '../game.js';
import { FIRELINE_SPOTS, FirelineSpot, FM_LOGS, ITEM_TINDERBOX, LogDefinition } from './fm-types.js';

export class FmHelper {
	public static hasTinderbox(game: GameWrapper): boolean {
		return game.getInventoryQuantity(ITEM_TINDERBOX) > 0;
	}

	public static matchLogDefinition(label: string, fmLevel: number): LogDefinition {
		const match = FM_LOGS.find(
			(l) => l.label.toLowerCase().includes(label.toLowerCase()) || label.toLowerCase().includes(l.logName.toLowerCase()),
		);
		if (match && fmLevel >= match.level) {
			return match;
		}

		// Fallback to highest unlocked log
		for (let i = FM_LOGS.length - 1; i >= 0; i--) {
			if (fmLevel >= FM_LOGS[i].level) {
				return FM_LOGS[i];
			}
		}
		return FM_LOGS[0];
	}

	public static isLighting(): boolean {
		try {
			const player = client.getLocalPlayer();
			if (!player) return false;
			// 733 = lighting fire with tinderbox animation
			return player.getAnimation() === 733;
		} catch {
			return false;
		}
	}

	public static lightLog(logId: number): boolean {
		if (bot.inventory.containsId(ITEM_TINDERBOX) && bot.inventory.containsId(logId)) {
			bot.inventory.itemOnItemWithIds(ITEM_TINDERBOX, logId);
			return true;
		}
		return false;
	}

	public static getClosestFirelineSpot(playerLoc?: net.runelite.api.coords.WorldPoint | null): FirelineSpot {
		if (!playerLoc) return FIRELINE_SPOTS[0];
		let closest = FIRELINE_SPOTS[0];
		let minDistance = 999999;
		for (const spot of FIRELINE_SPOTS) {
			const dist = playerLoc.distanceTo(spot.startPoint);
			if (dist < minDistance) {
				minDistance = dist;
				closest = spot;
			}
		}
		return closest;
	}

	public static isCurrentTileOnFire(): boolean {
		const playerLoc = client.getLocalPlayer()?.getWorldLocation();
		if (!playerLoc) return false;

		const fires = bot.objects.getTileObjectsWithNames(['Fire']);
		if (!fires || fires.length === 0) return false;

		for (const fire of fires) {
			const loc = (fire as any).getWorldLocation?.();
			if (loc && loc.getX() === playerLoc.getX() && loc.getY() === playerLoc.getY()) {
				return true;
			}
		}
		return false;
	}
}
