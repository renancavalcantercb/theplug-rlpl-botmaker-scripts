/// <reference types="@deafwave/osrs-botmaker-types" />
import {
	EDGE_BANK_BOOTH_ID,
	OBJECT_SEARCH_RADIUS,
	VARROCK_BANK_BOOTH_ID,
} from './constants.js';

type WorldPoint = net.runelite.api.coords.WorldPoint;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TileObject = any;

export interface BankTarget {
	obj: TileObject;
	action: string;
}

export interface BrutalGame {
	isLoggedIn(): boolean;
	playerLocation(): WorldPoint | null;
	isAnimating(animations: number[]): boolean;
	isMoving(): boolean;
	distanceTo(point: WorldPoint): number;
	isWebWalking(): boolean;
	webWalkTo(point: WorldPoint): void;
	webWalkToNearestBank(): void;
	stopWebWalk(): void;
	cancelWebWalk(): void;
	getLevel(skill: net.runelite.api.Skill): number;
	getExperience(skill: net.runelite.api.Skill): number;
	getTotalLevel(): number;
	getPlayerName(): string;
	getEmptySlots(): number;
	qty(id: number): number;
	hasItem(id: number): boolean;
	isEquipped(id: number): boolean;
	wearItem(id: number): void;
	findClosestObject(ids: number[]): TileObject | null;
	findAnyBank(): BankTarget | null;
	interactObject(obj: TileObject, action: string): void;
	isBankOpen(): boolean;
	closeBank(): void;
	depositAll(): void;
	depositAllWithId(id: number): void;
	withdrawQuantity(id: number, qty: number): void;
	withdrawAll(id: number): void;
	bankQty(id: number): number;
	getInventoryIds(): number[];
	isWidgetVisible(id: number): boolean;
	clickWidget(id: number): void;
	useItemOnItem(itemId: number, targetId: number): void;
	isItemSelected(): boolean;
	clearSelectedItem(): void;
	handleDialogue(): void;
	log(message: string): void;
	gameMessage(message: string): void;
	setCounter(name: string, value: number): void;
	terminate(): void;
}

const LOG_PREFIX = '[Mithril Brutal Arrow - xulixna] ';

const closestOf = (objects: TileObject[] | null | undefined): TileObject | null => {
	const loc = game.playerLocation();
	if (!loc || !objects || objects.length === 0) return null;
	let closest: TileObject | null = null;
	let minDistance = OBJECT_SEARCH_RADIUS;
	for (const obj of objects) {
		const objLoc = obj.getWorldLocation() as WorldPoint | null;
		if (!objLoc || objLoc.getPlane() !== loc.getPlane()) continue;
		const dist = loc.distanceTo(objLoc);
		if (dist < minDistance) {
			minDistance = dist;
			closest = obj;
		}
	}
	return closest;
};

export const game: BrutalGame = {
	isLoggedIn: (): boolean =>
		client.getGameState() === net.runelite.api.GameState.LOGGED_IN &&
		client.getLocalPlayer() !== null,

	playerLocation: (): WorldPoint | null => {
		const player = client.getLocalPlayer() as net.runelite.api.Player | null;
		return player ? ((player.getWorldLocation() as WorldPoint | null) ?? null) : null;
	},

	isAnimating: (animations: number[]): boolean => {
		const player = client.getLocalPlayer() as net.runelite.api.Player | null;
		return player ? animations.indexOf(player.getAnimation()) !== -1 : false;
	},

	isMoving: (): boolean => bot.localPlayerMoving(),

	distanceTo: (point: WorldPoint): number => {
		const loc = game.playerLocation();
		if (!loc || loc.getPlane() !== point.getPlane()) return 9999;
		return loc.distanceTo(point);
	},

	isWebWalking: (): boolean => bot.walking.isWebWalking(),

	webWalkTo: (point: WorldPoint): void => {
		bot.walking.webWalkStart(point);
	},

	webWalkToNearestBank: (): void => {
		bot.walking.webWalkToNearestBank();
	},

	stopWebWalk: (): void => {
		if (bot.walking.isWebWalking()) bot.walking.webWalkCancel();
	},

	// Without this the WebWalker keeps walking after the script stops.
	cancelWebWalk: (): void => {
		try {
			bot.walking.webWalkCancel();
		} catch {
			// Nothing to cancel
		}
	},

	getLevel: (skill: net.runelite.api.Skill): number => client.getRealSkillLevel(skill),

	getExperience: (skill: net.runelite.api.Skill): number => {
		try {
			return (client as any).getSkillExperience(skill) || 0;
		} catch {
			return 0;
		}
	},

	getTotalLevel: (): number => {
		try {
			return (client as any).getTotalLevel() || 0;
		} catch {
			return 0;
		}
	},

	getPlayerName: (): string => {
		try {
			const player = client.getLocalPlayer();
			return player ? String(player.getName() ?? '') : '';
		} catch {
			return '';
		}
	},

	getEmptySlots: (): number => bot.inventory.getEmptySlots(),

	qty: (id: number): number => bot.inventory.getQuantityOfId(id),

	hasItem: (id: number): boolean => bot.inventory.containsId(id),

	isEquipped: (id: number): boolean => bot.equipment.containsId(id),

	wearItem: (id: number): void => {
		bot.inventory.interactWithIds([id], ['Wear', 'Equip']);
	},

	findClosestObject: (ids: number[]): TileObject | null =>
		closestOf(bot.objects.getTileObjectsWithIds(ids) as TileObject[]),

	// Any nearby bank: booth ("Bank") or chest ("Use"), e.g. Ferox Enclave, Castle Wars.
	findAnyBank: (): BankTarget | null => {
		const booth =
			game.findClosestObject([VARROCK_BANK_BOOTH_ID, EDGE_BANK_BOOTH_ID]) ??
			closestOf(bot.objects.getTileObjectsWithNames(['Bank booth']) as TileObject[]);
		const chest = closestOf(bot.objects.getTileObjectsWithNames(['Bank chest']) as TileObject[]);
		const loc = game.playerLocation();
		if (booth && chest && loc) {
			return loc.distanceTo(chest.getWorldLocation()) < loc.distanceTo(booth.getWorldLocation())
				? { obj: chest, action: 'Use' }
				: { obj: booth, action: 'Bank' };
		}
		if (chest) return { obj: chest, action: 'Use' };
		if (booth) return { obj: booth, action: 'Bank' };
		return null;
	},

	interactObject: (obj: TileObject, action: string): void => {
		bot.objects.interactSuppliedObject(obj, action);
	},

	isBankOpen: (): boolean => bot.bank.isOpen(),

	closeBank: (): void => {
		bot.bank.close();
	},

	depositAll: (): void => {
		bot.bank.depositAll();
	},

	depositAllWithId: (id: number): void => {
		bot.bank.depositAllWithId(id);
	},

	withdrawQuantity: (id: number, qty: number): void => {
		bot.bank.withdrawQuantityWithId(id, qty);
	},

	withdrawAll: (id: number): void => {
		bot.bank.withdrawAllWithId(id);
	},

	bankQty: (id: number): number => bot.bank.getQuantityOfId(id),

	getInventoryIds: (): number[] => {
		const ids: number[] = [];
		try {
			const items = bot.inventory.getAllWidgets() as any[];
			for (let i = 0; items && i < items.length; i++) {
				const id: number = items[i].getItemId ? items[i].getItemId() : items[i].id;
				if (id && id > 0 && ids.indexOf(id) === -1) ids.push(id);
			}
		} catch {
			// Inventory not readable this tick
		}
		return ids;
	},

	isWidgetVisible: (id: number): boolean => {
		const widget = client.getWidget(id);
		return widget !== null && !widget.isHidden();
	},

	// Opcode 57 (CC_OP), identifier 1, p0 -1, matching the verified menu entries
	clickWidget: (id: number): void => {
		bot.widgets.interactSpecifiedWidget(id, 1, 57, -1);
	},

	useItemOnItem: (itemId: number, targetId: number): void => {
		bot.inventory.itemOnItemWithIds(itemId, targetId);
	},

	// A leftover selected item ("Use ...") turns the next click into e.g. Knife -> shaft.
	isItemSelected: (): boolean => {
		try {
			return Boolean((client as any).isWidgetSelected());
		} catch {
			return false;
		}
	},

	clearSelectedItem: (): void => {
		try {
			(client as any).setWidgetSelected(false);
		} catch {
			// Not supported by this client
		}
	},

	handleDialogue: (): void => {
		bot.widgets.handleDialogue([]);
	},

	log: (message: string): void => bot.printLogMessage(LOG_PREFIX + message),

	gameMessage: (message: string): void => bot.printGameMessage(LOG_PREFIX + message),

	setCounter: (name: string, value: number): void => bot.counters.setCounter(name, value),

	terminate: (): void => bot.terminate(),
};
