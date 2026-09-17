/// <reference types="@deafwave/osrs-botmaker-types" />

export const ROGUES_DEN_BANK_POINT = new net.runelite.api.coords.WorldPoint(
	3040,
	4969,
	1,
);
export const ROGUES_DEN_REGION_ID = 12190;

export const CHEST_OBJECT_ID = 26707;
export const FIRE_OBJECT_ID = 43475;
export const COOK_WIDGET_ID = 17694735;
export const EMERALD_BENEDICT_NAME = 'Emerald Benedict';

export interface CookingGame {
	isLoggedIn(): boolean;
	playerLocation(): net.runelite.api.coords.WorldPoint | null;
	isAtRoguesDen(maxDistance?: number): boolean;
	getCookingLevel(): number;
	getRealCookingLevel(): number;
	getCookingExperience(): number;
	getEmptySlots(): number;
	getInventoryQuantity(id: number): number;
	getBankQuantity(id: number): number;
	isBankOpen(): boolean;
	isBankBusy(): boolean;
	openBank(): void;
	closeBank(): void;
	depositAll(): void;
	withdrawAll(id: number): void;
	interactFire(): void;
	isMakeMenuVisible(): boolean;
	clickCookWidget(): void;
	handleDialogue(): void;
	isIdle(): boolean;
	isMoving(): boolean;
	isWebWalking(): boolean;
	webWalkToRoguesDen(): void;
	stopWebWalk(): void;
	getTotalLevel(): number;
	getPlayerName(): string;
	log(message: string): void;
	gameMessage(message: string): void;
	setCounter(name: string, value: number): void;
	terminate(): void;
}

export const game: CookingGame = {
	isLoggedIn: (): boolean =>
		client.getGameState() === net.runelite.api.GameState.LOGGED_IN &&
		client.getLocalPlayer() !== null,

	playerLocation: (): net.runelite.api.coords.WorldPoint | null => {
		const player = client.getLocalPlayer() as net.runelite.api.Player | null;
		if (!player) return null;
		return (
			(player.getWorldLocation() as net.runelite.api.coords.WorldPoint | null) ??
			null
		);
	},

	isAtRoguesDen: (maxDistance = 20): boolean => {
		const loc = game.playerLocation();
		if (!loc) return false;
		if (loc.getPlane() !== ROGUES_DEN_BANK_POINT.getPlane()) return false;
		if (
			typeof (loc as any).getRegionID === 'function' &&
			(loc as any).getRegionID() === ROGUES_DEN_REGION_ID
		) {
			return true;
		}
		return loc.distanceTo(ROGUES_DEN_BANK_POINT) <= maxDistance;
	},

	getCookingLevel: (): number =>
		client.getBoostedSkillLevel(net.runelite.api.Skill.COOKING),

	getRealCookingLevel: (): number =>
		client.getRealSkillLevel(net.runelite.api.Skill.COOKING),

	getCookingExperience: (): number => {
		try {
			if (typeof (client as any).getSkillExperience === 'function') {
				return (
					(client as any).getSkillExperience(net.runelite.api.Skill.COOKING) || 0
				);
			}
		} catch {
			// Fallback
		}
		return 0;
	},

	getEmptySlots: (): number => bot.inventory.getEmptySlots(),

	getInventoryQuantity: (id: number): number =>
		bot.inventory.getQuantityOfId(id),

	getBankQuantity: (id: number): number => bot.bank.getQuantityOfId(id),

	isBankOpen: (): boolean => bot.bank.isOpen(),

	isBankBusy: (): boolean => bot.bank.isBanking(),

	openBank: (): void => {
		// Prefer Emerald Benedict (banker NPC standing right next to the fire)
		const bankers = bot.npcs.getWithNames([EMERALD_BENEDICT_NAME]);
		if (bankers && bankers.length > 0) {
			bot.npcs.interactSupplied(bankers[0], 'Bank');
			return;
		}

		// Fallback to Bank chest 26707 or default bank opener
		const chests = bot.objects.getTileObjectsWithIds([CHEST_OBJECT_ID]);
		if (chests && chests.length > 0) {
			bot.objects.interactSuppliedObject(chests[0], 'Use');
		} else {
			bot.bank.open();
		}
	},

	closeBank: (): void => {
		bot.bank.close();
	},

	depositAll: (): void => {
		bot.bank.depositAll();
	},

	withdrawAll: (id: number): void => {
		bot.bank.withdrawAllWithId(id);
	},

	interactFire: (): void => {
		const fires = bot.objects.getTileObjectsWithIds([FIRE_OBJECT_ID]);
		if (fires && fires.length > 0) {
			bot.objects.interactSuppliedObject(fires[0], 'Cook');
		} else {
			bot.objects.interactObject('Fire', 'Cook');
		}
	},

	isMakeMenuVisible: (): boolean => {
		const widget = client.getWidget(COOK_WIDGET_ID);
		return widget !== null && !widget.isHidden();
	},

	clickCookWidget: (): void => {
		// Opcode 57 (CC_OP), identifier 1, p0 -1, matching the verified menu entry
		bot.widgets.interactSpecifiedWidget(COOK_WIDGET_ID, 1, 57, -1);
	},

	handleDialogue: (): void => {
		bot.widgets.handleDialogue([]);
	},

	isIdle: (): boolean => bot.localPlayerIdle(),

	isMoving: (): boolean => bot.localPlayerMoving(),

	isWebWalking: (): boolean => bot.walking.isWebWalking(),

	webWalkToRoguesDen: (): void => {
		bot.walking.webWalkStart(ROGUES_DEN_BANK_POINT);
	},

	stopWebWalk: (): void => {
		if (bot.walking.isWebWalking()) {
			bot.walking.webWalkCancel();
		}
	},

	getTotalLevel: (): number => {
		try {
			if (typeof (client as any).getTotalLevel === 'function') {
				return (client as any).getTotalLevel() || 0;
			}
		} catch {
			// Fallback
		}
		return 0;
	},

	getPlayerName: (): string => {
		try {
			const player = client.getLocalPlayer();
			if (player) {
				return String(player.getName() ?? '');
			}
		} catch {
			// Fallback
		}
		return '';
	},

	log: (message: string): void =>
		bot.printLogMessage('[AIO Cooking - xulixna] ' + message),

	gameMessage: (message: string): void =>
		bot.printGameMessage('[AIO Cooking - xulixna] ' + message),

	setCounter: (name: string, value: number): void =>
		bot.counters.setCounter(name, value),

	terminate: (): void => bot.terminate(),
};
