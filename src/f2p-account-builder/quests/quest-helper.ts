/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument */
import { GameWrapper } from '../game.js';

export class QuestHelper {
	private static lastActionTime = 0;
	private static lastActionKey = '';
	private static lastWalkTarget: net.runelite.api.coords.WorldPoint | null = null;
	private static lastWalkTime = 0;

	public static getVarp(varpId: number): number {
		try {
			if (typeof (client as any).getVarpValue === 'function') {
				return (client as any).getVarpValue(varpId) || 0;
			}
		} catch {
			// Fallback
		}
		return 0;
	}

	public static isVarpAtLeast(varpId: number, expected: number): boolean {
		return this.getVarp(varpId) >= expected;
	}

	public static isNear(target: net.runelite.api.coords.WorldPoint, maxDistance = 5): boolean {
		const loc = client.getLocalPlayer()?.getWorldLocation() as net.runelite.api.coords.WorldPoint | null;
		if (!loc) return false;
		if (loc.getPlane() !== target.getPlane()) return false;
		return loc.distanceTo(target) <= maxDistance;
	}

	public static walkTo(
		game: GameWrapper,
		target: net.runelite.api.coords.WorldPoint,
		tolerance = 3,
	): void {
		if (game.isDialogueOpen()) {
			game.stopWebWalk();
			game.handleDialogue();
			return;
		}

		if (this.isNear(target, tolerance)) {
			game.stopWebWalk();
			return;
		}

		if (game.isWebWalking() || game.isMoving()) {
			return;
		}

		const now = Date.now();
		if (
			this.lastWalkTarget &&
			this.lastWalkTarget.getX() === target.getX() &&
			this.lastWalkTarget.getY() === target.getY() &&
			this.lastWalkTarget.getPlane() === target.getPlane() &&
			now - this.lastWalkTime < 4000
		) {
			return;
		}

		this.lastWalkTarget = target;
		this.lastWalkTime = now;
		game.webWalkTo(target);
	}

	public static talkToNpc(
		game: GameWrapper,
		npcName: string,
		standPoint?: net.runelite.api.coords.WorldPoint,
	): boolean {
		if (game.isDialogueOpen()) {
			game.stopWebWalk();
			game.handleDialogue();
			return true;
		}

		const npcs = bot.npcs.getWithNames([npcName]);
		const playerLoc = client.getLocalPlayer()?.getWorldLocation();
		const playerPlane = playerLoc?.getPlane() ?? 0;
		const visibleNpc = (npcs || []).find((n: any) => {
			const loc = n?.getWorldLocation?.();
			return loc && loc.getPlane() === playerPlane && (!playerLoc || playerLoc.distanceTo(loc) <= 8);
		});

		if (visibleNpc) {
			game.stopWebWalk();
			const key = 'talk_' + npcName;
			const now = Date.now();
			if (this.lastActionKey === key && now - this.lastActionTime < 2500) {
				if (game.isDialogueOpen()) {
					game.handleDialogue();
				}
				return true;
			}
			this.lastActionKey = key;
			this.lastActionTime = now;
			bot.npcs.interactSupplied(visibleNpc, 'Talk-to');
			return true;
		}

		if (standPoint && !this.isNear(standPoint, 4)) {
			this.walkTo(game, standPoint, 3);
			return false;
		}

		game.stopWebWalk();
		return false;
	}

	public static interactObject(
		game: GameWrapper,
		objectName: string,
		action: string,
		standPoint?: net.runelite.api.coords.WorldPoint,
	): boolean {
		if (game.isDialogueOpen()) {
			game.stopWebWalk();
			game.handleDialogue();
			return true;
		}

		const objects = bot.objects.getTileObjectsWithNames([objectName]);
		const playerLoc = client.getLocalPlayer()?.getWorldLocation();
		const playerPlane = playerLoc?.getPlane() ?? 0;
		const visibleObj = (objects || []).find((o: any) => {
			const loc = o?.getWorldLocation?.();
			return loc && loc.getPlane() === playerPlane && (!playerLoc || playerLoc.distanceTo(loc) <= 7);
		});

		if (visibleObj) {
			game.stopWebWalk();
			const key = 'obj_' + objectName + '_' + action;
			const now = Date.now();
			if (this.lastActionKey === key && now - this.lastActionTime < 2500) {
				return true;
			}
			this.lastActionKey = key;
			this.lastActionTime = now;
			bot.objects.interactSuppliedObject(visibleObj, action);
			return true;
		}

		if (standPoint && !this.isNear(standPoint, 4)) {
			this.walkTo(game, standPoint, 3);
			return false;
		}

		game.stopWebWalk();
		return false;
	}

	public static interactObjectId(
		game: GameWrapper,
		objectId: number,
		action: string,
		standPoint?: net.runelite.api.coords.WorldPoint,
	): boolean {
		if (game.isDialogueOpen()) {
			game.stopWebWalk();
			game.handleDialogue();
			return true;
		}

		const objects = bot.objects.getTileObjectsWithIds([objectId]);
		const playerLoc = client.getLocalPlayer()?.getWorldLocation();
		const playerPlane = playerLoc?.getPlane() ?? 0;
		const visibleObj = (objects || []).find((o: any) => {
			const loc = o?.getWorldLocation?.();
			return loc && loc.getPlane() === playerPlane && (!playerLoc || playerLoc.distanceTo(loc) <= 7);
		});

		if (visibleObj) {
			game.stopWebWalk();
			const key = 'objId_' + objectId + '_' + action;
			const now = Date.now();
			if (this.lastActionKey === key && now - this.lastActionTime < 2500) {
				return true;
			}
			this.lastActionKey = key;
			this.lastActionTime = now;
			bot.objects.interactSuppliedObject(visibleObj, action);
			return true;
		}

		if (standPoint && !this.isNear(standPoint, 4)) {
			this.walkTo(game, standPoint, 3);
			return false;
		}

		game.stopWebWalk();
		return false;
	}

	public static lootItem(
		game: GameWrapper,
		itemName: string,
		spawnPoint?: net.runelite.api.coords.WorldPoint,
		tolerance = 3,
	): boolean {
		if (game.isDialogueOpen()) {
			game.stopWebWalk();
			game.handleDialogue();
			return true;
		}

		// 1. Check if the item is ALREADY visible nearby on the ground!
		const nearbyItems = bot.tileItems.getItemsWithNames([itemName]);
		const playerLoc = client.getLocalPlayer()?.getWorldLocation();
		const playerPlane = playerLoc?.getPlane() ?? 0;
		const validNearby = (nearbyItems || []).find((it: any) => {
			const loc = it?.getWorldLocation?.();
			return loc && loc.getPlane() === playerPlane && (!playerLoc || playerLoc.distanceTo(loc) <= 12);
		});

		if (validNearby) {
			game.stopWebWalk();
			const key = 'loot_' + itemName;
			const now = Date.now();
			if (this.lastActionKey === key && now - this.lastActionTime < 2500) {
				return true;
			}
			this.lastActionKey = key;
			this.lastActionTime = now;
			bot.tileItems.lootItemsWithNames([itemName], 12);
			return true;
		}

		// 2. If not visible yet, walk towards the spawn area with tolerance
		if (spawnPoint && !this.isNear(spawnPoint, tolerance)) {
			this.walkTo(game, spawnPoint, tolerance);
			return false;
		}

		game.stopWebWalk();
		return false;
	}

	public static hasItem(game: GameWrapper, itemId: number, minCount = 1, name?: string): boolean {
		try {
			if (game.getInventoryQuantity(itemId) >= minCount) return true;
			if (bot.inventory.containsId(itemId)) return true;
			if (name) {
				if (bot.inventory.containsName(name)) return true;
				if (bot.inventory.getQuantityOfName(name) >= minCount) return true;
			}
		} catch {
			// Fallback
		}
		return false;
	}

	public static hasBankItem(game: GameWrapper, itemId: number, minCount = 1, name?: string): boolean {
		try {
			if (!game.isBankOpen()) return false;
			if (game.getBankQuantity(itemId) >= minCount) return true;
			if (name && bot.bank.getQuantityOfName(name) >= minCount) return true;
		} catch {
			// Fallback
		}
		return false;
	}

	public static withdrawOrPrepare(
		game: GameWrapper,
		items: { id: number; quantity: number; name?: string }[],
	): boolean {
		const allInInventory = items.every((i) => this.hasItem(game, i.id, i.quantity, i.name));
		if (allInInventory) {
			if (game.isBankOpen()) {
				game.closeBank();
			}
			return true;
		}

		if (game.isDialogueOpen()) {
			game.stopWebWalk();
			game.handleDialogue();
			return false;
		}

		if (game.isMoving() || game.isWebWalking()) {
			return false;
		}

		if (!game.isBankOpen()) {
			const now = Date.now();
			if (this.lastActionKey === 'open_bank' && now - this.lastActionTime < 3000) {
				return false;
			}
			this.lastActionKey = 'open_bank';
			this.lastActionTime = now;
			game.log('Opening bank to check quest supplies...');
			game.openBank();
			return false;
		}

		// Bank is open: ensure walking is stopped
		game.stopWebWalk();

		// Make sure we have enough inventory space without depositing required items
		const keepIds = items.map((i) => i.id);
		const neededItems = items.filter((i) => !this.hasItem(game, i.id, i.quantity, i.name));
		if (game.getEmptySlots() < neededItems.length) {
			game.log('Depositing unnecessary items to make room for quest supplies...');
			game.depositAllExcept(keepIds);
			return false;
		}

		let anyMissing = false;
		for (const item of items) {
			const hasCount = game.getInventoryQuantity(item.id);
			const needed = item.quantity - hasCount;
			if (needed > 0) {
				if (game.getBankQuantity(item.id) >= needed) {
					game.withdrawQuantity(item.id, needed);
				} else if (item.name && bot.bank.getQuantityOfName(item.name) >= needed) {
					bot.bank.withdrawQuantityWithId(item.id, needed);
				} else {
					anyMissing = true;
				}
			}
		}

		return !anyMissing;
	}
}
