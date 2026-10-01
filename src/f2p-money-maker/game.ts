/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument */

export interface GameWrapper {
	isLoggedIn(): boolean;
	playerLocation(): net.runelite.api.coords.WorldPoint | null;
	getRealLevel(skill: net.runelite.api.Skill): number;
	getBoostedLevel(skill: net.runelite.api.Skill): number;
	isIdle(): boolean;
	isIdleFor(ticks: number): boolean;
	isMoving(): boolean;
	isBankOpen(): boolean;
	isBankBusy(): boolean;
	openBank(): void;
	closeBank(): void;
	depositAll(): void;
	depositAllExcept(keepIds: number[]): void;
	withdrawAll(id: number): void;
	withdrawQuantity(id: number, qty: number): void;
	getEmptySlots(): number;
	isInventoryFull(): boolean;
	getInventoryQuantity(id: number): number;
	getBankQuantity(id: number): number;
	isEquipped(id: number): boolean;
	wearInventoryItem(id: number): void;
	getTotalCoins(): number;
	isWebWalking(): boolean;
	isNear(point: net.runelite.api.coords.WorldPoint, maxDistance?: number): boolean;
	webWalkTo(point: net.runelite.api.coords.WorldPoint): void;
	webWalkToNearestBank(): void;
	stopWebWalk(): void;
	isDialogueOpen(): boolean;
	handleDialogue(options?: string[]): boolean;
	isTannerOpen(): boolean;
	tanAllLeather(hardLeather: boolean): void;
	interactWithObject(names: string[], action: string): boolean;
	interactWithNpc(names: string[], action: string): boolean;
	useItemOnItem(firstId: number, secondId: number): boolean;
	useItemOnObject(itemId: number, objectNames: string[]): boolean;
	handleProductionMenu(outputItemId?: number): boolean;
	isShopOpen(): boolean;
	buyFiftyFromShop(itemId: number): void;
	closeShop(): void;
	openInventoryItem(itemId: number, action: string): boolean;
	castSpellOnInventory(spellName: bot.SpellName, itemId: number): boolean;
	castSpellOnGroundItem(spellName: bot.SpellName, groundItemName: string): boolean;
	log(message: string): void;
	gameMessage(message: string): void;
	setCounter(name: string, value: number): void;
	terminate(): void;
}

export const game: GameWrapper = {
	isLoggedIn: (): boolean =>
		client.getGameState() === net.runelite.api.GameState.LOGGED_IN &&
		client.getLocalPlayer() !== null,

	playerLocation: (): net.runelite.api.coords.WorldPoint | null => {
		const player = client.getLocalPlayer() as net.runelite.api.Player | null;
		if (!player) return null;
		return (player.getWorldLocation() as net.runelite.api.coords.WorldPoint | null) ?? null;
	},

	getRealLevel: (skill: net.runelite.api.Skill): number => {
		try {
			return client.getRealSkillLevel(skill) || 1;
		} catch {
			return 1;
		}
	},

	getBoostedLevel: (skill: net.runelite.api.Skill): number => {
		try {
			return client.getBoostedSkillLevel(skill) || 1;
		} catch {
			return 1;
		}
	},

	isIdle: (): boolean => bot.localPlayerIdle(),

	isIdleFor: (ticks: number): boolean => bot.localPlayerIdleFor(ticks),

	isMoving: (): boolean => bot.localPlayerMoving(),

	isBankOpen: (): boolean => bot.bank.isOpen(),

	isBankBusy: (): boolean => bot.bank.isBanking(),

	openBank: (): void => {
		if (game.isDialogueOpen()) {
			game.handleDialogue();
			return;
		}

		if (bot.bank.isOpen()) {
			return;
		}

		const playerLoc = client.getLocalPlayer()?.getWorldLocation();
		const playerPlane = playerLoc?.getPlane() ?? 0;

		const booths = bot.objects.getTileObjectsWithNames([
			'Bank booth',
			'Open bank booth',
			'Bank chest',
			'Bank counter',
		]);
		const samePlaneBooths = (booths || []).filter((b) => {
			const loc = (b as any).getWorldLocation?.();
			return loc && loc.getPlane() === playerPlane && (!playerLoc || playerLoc.distanceTo(loc) <= 8);
		});

		const bankers = (bot.npcs.getWithNames(['Banker']) || []).filter((n) => {
			const loc = (n as any).getWorldLocation?.();
			return loc && loc.getPlane() === playerPlane && (!playerLoc || playerLoc.distanceTo(loc) <= 8);
		});

		if (samePlaneBooths.length > 0) {
			const b = samePlaneBooths[0];
			const name = (b as any).getName?.() || '';
			const action = name.toLowerCase().indexOf('chest') >= 0 ? 'Use' : 'Bank';
			bot.objects.interactSuppliedObject(b, action);
			bot.bank.open();
			return;
		}

		if (bankers.length > 0) {
			bot.npcs.interactSupplied(bankers[0], 'Bank');
			bot.bank.open();
			return;
		}

		if (!bot.walking.isWebWalking()) {
			bot.walking.webWalkToNearestBank();
		}
	},

	closeBank: (): void => {
		bot.bank.close();
	},

	depositAll: (): void => {
		bot.bank.depositAll();
	},

	depositAllExcept: (keepIds: number[]): void => {
		if (bot.bank.isOpen()) {
			const inventoryWidgets = bot.inventory.getAllWidgets() ?? [];
			if (inventoryWidgets.length > 0) {
				const depositedIds: number[] = [];
				for (const item of inventoryWidgets) {
					const id = item.getItemId();
					if (id > 0 && keepIds.indexOf(id) < 0 && depositedIds.indexOf(id) < 0) {
						bot.bank.depositAllWithId(id);
						depositedIds.push(id);
					}
				}
			} else {
				bot.bank.depositAll();
			}
		}
	},

	withdrawAll: (id: number): void => {
		bot.bank.withdrawAllWithId(id);
	},

	withdrawQuantity: (id: number, qty: number): void => {
		bot.bank.withdrawQuantityWithId(id, qty);
	},

	getEmptySlots: (): number => bot.inventory.getEmptySlots(),

	isInventoryFull: (): boolean => bot.inventory.getEmptySlots() === 0,

	getInventoryQuantity: (id: number): number => {
		try {
			return bot.inventory.getQuantityOfId(id) || 0;
		} catch {
			return 0;
		}
	},

	getBankQuantity: (id: number): number => {
		try {
			return bot.bank.getQuantityOfId(id) || 0;
		} catch {
			return 0;
		}
	},

	isEquipped: (id: number): boolean => bot.equipment.containsId(id),

	wearInventoryItem: (id: number): void => {
		bot.inventory.interactWithIds([id], ['Wield', 'Wear']);
	},

	getTotalCoins: (): number => {
		const invCoins = game.getInventoryQuantity(995);
		const bankCoins = game.getBankQuantity(995);
		return invCoins + bankCoins;
	},

	isWebWalking: (): boolean => bot.walking.isWebWalking(),

	isNear: (point: net.runelite.api.coords.WorldPoint, maxDistance = 6): boolean => {
		const playerLoc = client.getLocalPlayer()?.getWorldLocation();
		if (!playerLoc) return false;
		return playerLoc.getPlane() === point.getPlane() && playerLoc.distanceTo(point) <= maxDistance;
	},

	webWalkTo: (point: net.runelite.api.coords.WorldPoint): void => {
		bot.walking.webWalkStart(point);
	},

	webWalkToNearestBank: (): void => {
		bot.walking.webWalkToNearestBank();
	},

	stopWebWalk: (): void => {
		if (bot.walking.isWebWalking()) {
			bot.walking.webWalkCancel();
		}
	},

	isDialogueOpen: (): boolean => {
		try {
			const productionWidget = client.getWidget(17694735);
			if (productionWidget && !productionWidget.isHidden()) return true;

			const check = (groupId: number, childId: number): boolean => {
				try {
					let w = client.getWidget(groupId, childId);
					if (w && typeof (w as any).isHidden === 'function' && !(w as any).isHidden()) {
						return true;
					}
					const packed = (groupId << 16) | childId;
					w = client.getWidget(packed);
					if (w && typeof (w as any).isHidden === 'function' && !(w as any).isHidden()) {
						return true;
					}
				} catch {
					return false;
				}
				return false;
			};

			const groups = [231, 217, 219, 193, 229, 233, 11, 153];
			for (const g of groups) {
				for (let c = 0; c <= 6; c++) {
					if (check(g, c)) return true;
				}
			}
			return false;
		} catch {
			return false;
		}
	},

	handleDialogue: (options: string[] = []): boolean => {
		try {
			const defaultOptions = [
				'Tan All',
				'Soft leather',
				'Hard leather',
				'Continue',
				'Yes.',
				'Trade',
			];
			const dialogueOptions = options.length > 0 ? options : defaultOptions;
			return bot.widgets.handleDialogue(dialogueOptions);
		} catch {
			return false;
		}
	},

	isTannerOpen: (): boolean => {
		const tanAllSoftLeatherWidgetId = 21233788;
		const widget = client.getWidget(tanAllSoftLeatherWidgetId);
		return widget !== null && !widget.isHidden();
	},

	tanAllLeather: (hardLeather: boolean): void => {
		const tanAllSoftLeatherWidgetId = 21233788;
		const tanAllHardLeatherWidgetId = 21233789;
		bot.widgets.interactSpecifiedWidget(
			hardLeather ? tanAllHardLeatherWidgetId : tanAllSoftLeatherWidgetId,
			1,
			57,
			-1,
		);
	},

	interactWithObject: (names: string[], action: string): boolean => {
		try {
			const objects = bot.objects.getTileObjectsWithNames(names);
			if (objects && objects.length > 0) {
				bot.objects.interactSuppliedObject(objects[0], action);
				return true;
			}
		} catch (error) {
			game.log(`interactWithObject error: ${String(error)}`);
		}
		return false;
	},

	interactWithNpc: (names: string[], action: string): boolean => {
		try {
			const npcs = bot.npcs.getWithNames(names);
			if (npcs && npcs.length > 0) {
				bot.npcs.interactSupplied(npcs[0], action);
				return true;
			}
		} catch (error) {
			game.log(`interactWithNpc error: ${String(error)}`);
		}
		return false;
	},

	useItemOnItem: (firstId: number, secondId: number): boolean => {
		try {
			bot.inventory.itemOnItemWithIds(firstId, secondId);
			return true;
		} catch {
			return false;
		}
	},

	useItemOnObject: (itemId: number, objectNames: string[]): boolean => {
		try {
			const objects = bot.objects.getTileObjectsWithNames(objectNames);
			if (objects && objects.length > 0) {
				bot.inventory.itemOnObjectWithIds(itemId, objects[0]);
				return true;
			}
		} catch {
			return false;
		}
		return false;
	},

	handleProductionMenu: (outputItemId?: number): boolean => {
		try {
			const makeWidgetId = findProductionWidget(outputItemId) ?? 17694735;
			const widget = client.getWidget(makeWidgetId);
			if (widget && !widget.isHidden()) {
				bot.widgets.interactSpecifiedWidget(makeWidgetId, 1, 57, -1);
				return true;
			}
		} catch {
			return false;
		}
		return false;
	},

	isShopOpen: (): boolean => bot.shop.isOpen(),

	buyFiftyFromShop: (itemId: number): void => {
		bot.shop.buy(itemId, 50);
	},

	closeShop: (): void => {
		try {
			const closeButton = client.getWidget(300, 1)?.getChild(11);
			if (closeButton) {
				bot.menuAction(
					closeButton.getIndex(),
					closeButton.getId(),
					net.runelite.api.MenuAction.CC_OP,
					1,
					-1,
					'Close',
					'',
				);
			}
		} catch {
			// Fallback
		}
	},

	openInventoryItem: (itemId: number, action: string): boolean => {
		try {
			bot.inventory.interactWithIds([itemId], [action]);
			return true;
		} catch {
			return false;
		}
	},

	castSpellOnInventory: (spellName: bot.SpellName, itemId: number): boolean => {
		try {
			bot.magic.castOnInventoryItemId(spellName, itemId);
			return true;
		} catch {
			return false;
		}
	},

	castSpellOnGroundItem: (spellName: bot.SpellName, groundItemName: string): boolean => {
		try {
			const groundItems = bot.tileItems.getItemsWithNames([groundItemName]);
			if (groundItems && groundItems.length > 0) {
				bot.magic.castOnTileItem(spellName, groundItems[0].item);
				return true;
			}
		} catch {
			return false;
		}
		return false;
	},

	log: (message: string): void => {
		bot.printLogMessage(`[F2P-MoneyMaker] ${message}`);
	},

	gameMessage: (message: string): void => {
		bot.printGameMessage(`[F2P-MoneyMaker] ${message}`);
	},

	setCounter: (name: string, value: number): void => {
		bot.counters.setCounter(name, value);
	},

	terminate: (): void => {
		bot.terminate();
	},
};

const widgetContainsItem = (
	widget: net.runelite.api.widgets.Widget,
	itemId: number,
	depth = 0,
): boolean => {
	if (widget.isHidden()) return false;
	if (widget.getItemId() === itemId) return true;
	if (depth >= 4) return false;
	for (const child of widget.getChildren() ?? []) {
		if (child && widgetContainsItem(child, itemId, depth + 1)) return true;
	}
	return false;
};

const findProductionWidget = (outputItemId?: number): number | null => {
	if (outputItemId === undefined) return null;
	const firstMakeWidgetId = 17694735;
	for (let widgetId = firstMakeWidgetId; widgetId <= firstMakeWidgetId + 17; widgetId++) {
		const widget = client.getWidget(widgetId);
		if (widget && widgetContainsItem(widget, outputItemId)) return widgetId;
	}
	return null;
};
