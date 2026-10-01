/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument */
import { GameWrapper } from '../game.js';
import {
	BURNT_FOOD_NAMES,
	COOK_WIDGET_ID,
	COOKABLE_FOODS,
	COOKING_LOCATIONS,
	CookableFood,
	CookingLocation,
} from './cook-types.js';

export class CookHelper {
	public static matchLocation(label: string): CookingLocation {
		const lower = label.toLowerCase();
		const match = COOKING_LOCATIONS.find((loc) =>
			lower.includes(loc.label.toLowerCase()) || loc.label.toLowerCase().includes(lower),
		);
		return match ?? COOKING_LOCATIONS[0];
	}

	public static matchFood(labelOrName: string, cookingLevel: number): CookableFood {
		const lower = labelOrName.toLowerCase();
		const match = COOKABLE_FOODS.find((f) =>
			lower.includes(f.name.toLowerCase()) || f.name.toLowerCase().includes(lower),
		);

		if (match && cookingLevel >= match.level) {
			return match;
		}

		// Fallback to highest unlocked food
		for (let i = COOKABLE_FOODS.length - 1; i >= 0; i--) {
			if (cookingLevel >= COOKABLE_FOODS[i].level) {
				return COOKABLE_FOODS[i];
			}
		}
		return COOKABLE_FOODS[0];
	}

	public static findHighestFoodInBank(
		cookingLevel: number,
		game: GameWrapper,
	): CookableFood | null {
		const sorted = [...COOKABLE_FOODS].sort((a, b) => b.level - a.level);
		for (const food of sorted) {
			if (food.level <= cookingLevel && game.getBankQuantity(food.id) > 0) {
				return food;
			}
		}
		return null;
	}

	public static findRawFoodInInventory(game: GameWrapper): CookableFood | null {
		for (const food of COOKABLE_FOODS) {
			if (game.getInventoryQuantity(food.id) > 0) {
				return food;
			}
		}
		return null;
	}

	public static isMakeMenuVisible(): boolean {
		try {
			const widget = client.getWidget(COOK_WIDGET_ID);
			if (widget !== null && !widget.isHidden()) {
				return true;
			}
			const parent = client.getWidget(270, 0);
			if (parent !== null && !parent.isHidden()) {
				return true;
			}
		} catch {
			// Fallback
		}
		return false;
	}

	public static clickCookWidget(): void {
		bot.widgets.interactSpecifiedWidget(COOK_WIDGET_ID, 1, 57, -1);
	}

	public static isCookingAnimation(): boolean {
		try {
			const player = client.getLocalPlayer();
			if (!player) return false;
			const anim = player.getAnimation();
			return anim === 896 || anim === 897 || anim === 883;
		} catch {
			return false;
		}
	}

	public static interactCookingObject(loc: CookingLocation): boolean {
		const playerLoc = client.getLocalPlayer()?.getWorldLocation();
		if (!playerLoc) return false;

		for (const name of loc.objectNames) {
			const objects = bot.objects.getTileObjectsWithNames([name]);
			if (objects && objects.length > 0) {
				let closest = objects[0];
				let minDist = 999;
				for (const obj of objects) {
					const wLoc = (obj as any).getWorldLocation?.();
					if (wLoc && wLoc.getPlane() === playerLoc.getPlane()) {
						const d = playerLoc.distanceTo(wLoc);
						if (d < minDist) {
							minDist = d;
							closest = obj;
						}
					}
				}
				if (minDist <= 15) {
					bot.objects.interactSuppliedObject(closest, 'Cook');
					return true;
				}
			}
		}

		bot.objects.interactObject(loc.objectNames[0], 'Cook');
		return true;
	}

	public static hasBurntFood(): boolean {
		try {
			const widgets = bot.inventory.getAllWidgets();
			if (widgets && Array.isArray(widgets)) {
				for (const w of widgets) {
					const name = (w as any)?.getName?.();
					if (name && name.toLowerCase().includes('burnt')) {
						return true;
					}
				}
			}
		} catch {
			// Fallback
		}

		for (const name of BURNT_FOOD_NAMES) {
			if (bot.inventory.containsName(name)) {
				return true;
			}
		}
		return false;
	}

	public static dropBurntFood(): boolean {
		try {
			const widgets = bot.inventory.getAllWidgets();
			if (widgets && Array.isArray(widgets)) {
				for (const w of widgets) {
					const name = (w as any)?.getName?.();
					if (name && name.toLowerCase().includes('burnt')) {
						bot.inventory.interactWithNames([name], ['Drop']);
						return true;
					}
				}
			}
		} catch {
			// Fallback
		}

		for (const name of BURNT_FOOD_NAMES) {
			if (bot.inventory.containsName(name)) {
				bot.inventory.interactWithNames([name], ['Drop']);
				return true;
			}
		}
		return false;
	}
}
