/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument */

export interface GameWrapper {
	isLoggedIn(): boolean;
	playerLocation(): net.runelite.api.coords.WorldPoint | null;
	getRealLevel(skill: net.runelite.api.Skill): number;
	getBoostedLevel(skill: net.runelite.api.Skill): number;
	getSkillExperience(skill: net.runelite.api.Skill): number;
	getTotalLevel(): number;
	getHpPercent(): number;
	getQuestPoints(): number;
	isIdle(): boolean;
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
	isWebWalking(): boolean;
	isNear(point: net.runelite.api.coords.WorldPoint, maxDistance?: number): boolean;
	webWalkTo(point: net.runelite.api.coords.WorldPoint): void;
	webWalkToNearestBank(): void;
	stopWebWalk(): void;
	isDialogueOpen(): boolean;
	handleDialogue(options?: string[]): boolean;
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
		return (
			(player.getWorldLocation() as net.runelite.api.coords.WorldPoint | null) ??
			null
		);
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

	getSkillExperience: (skill: net.runelite.api.Skill): number => {
		try {
			if (typeof (client as any).getSkillExperience === 'function') {
				return (client as any).getSkillExperience(skill) || 0;
			}
		} catch {
			// Fallback
		}
		return 0;
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

	getHpPercent: (): number => {
		try {
			const currHp = client.getBoostedSkillLevel(net.runelite.api.Skill.HITPOINTS);
			const maxHp = Math.max(1, client.getRealSkillLevel(net.runelite.api.Skill.HITPOINTS));
			return Math.floor((currHp / maxHp) * 100);
		} catch {
			return 100;
		}
	},

	getQuestPoints: (): number => {
		try {
			if (typeof (client as any).getVarpValue === 'function') {
				// VarPlayer.QUEST_POINTS = 101
				return (client as any).getVarpValue(101) || 0;
			}
		} catch {
			// Fallback
		}
		return 0;
	},

	isIdle: (): boolean => bot.localPlayerIdle(),

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
			const action = name.toLowerCase().includes('chest') ? 'Use' : 'Bank';
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
			const keepSet = new Set(keepIds);
			const heldIds = bot.inventory.getAllWidgets();
			if (heldIds && Array.isArray(heldIds)) {
				for (const item of heldIds) {
					const id = (item as any)?.getItemId?.() ?? (item as any)?.id;
					if (id && !keepSet.has(id)) {
						bot.bank.depositAllWithId(id);
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

	isInventoryFull: (): boolean => bot.inventory.isFull(),

	getInventoryQuantity: (id: number): number =>
		bot.inventory.getQuantityOfId(id),

	getBankQuantity: (id: number): number => bot.bank.getQuantityOfId(id),

	isWebWalking: (): boolean => bot.walking.isWebWalking(),

	isNear: (point: net.runelite.api.coords.WorldPoint, maxDistance = 2): boolean => {
		const loc = client.getLocalPlayer()?.getWorldLocation() as net.runelite.api.coords.WorldPoint | null;
		if (!loc || !point) return false;
		if (loc.getPlane() !== point.getPlane()) return false;
		return loc.distanceTo(point) <= maxDistance;
	},

	webWalkTo: (point: net.runelite.api.coords.WorldPoint): void => {
		if (game.isNear(point, 2)) {
			game.stopWebWalk();
			return;
		}
		bot.walking.webWalkStart(point);
	},

	webWalkToNearestBank: (): void => {
		bot.walking.webWalkToNearestBank();
	},

	stopWebWalk: (): void => {
		try {
			bot.walking.webWalkCancel();
		} catch {
			// Fallback
		}
	},

	isDialogueOpen: (): boolean => {
		try {
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
				} catch {}
				return false;
			};

			// Common OSRS dialogue interfaces:
			// 231: NPC Dialogue (children 1..6)
			// 217: Player Dialogue (children 1..6)
			// 219: Options Dialogue (children 1..5)
			// 193: Sprite Dialogue (children 1..3)
			// 229: Notification Dialogue (children 1..3)
			// 233: Level Up Dialogue (children 1..3)
			// 11: Double Sprite Dialogue (children 1..4)
			// 153: Quest completion scroll
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
			const commonOptions = [
				"I'd like to access my bank account, please.",
				'Yes.',
				'Continue',
				"What's wrong?",
				"I'm always happy to help a cook.",
				'Actually, I know where to find this stuff.',
				"I've got all the ingredients right here!",
				"Here's a bucket of milk.",
				"Here's a pot of flour.",
				"Here's an egg.",
				"Yes, I've got them all here.",
				'I am looking for a quest.',
				"Yes, okay. I'll do it.",
				'Yes, I will help you.',
				'Yes, I am ready.',
				'Can I help at all?',
				'I need an extra pot of flour.',
				'Yes, of course.',
				"Okay, I'll shear them.",
				'I have sheep shears.',
			];
			const opts = options.length > 0 ? options : commonOptions;
			return bot.widgets.handleDialogue(opts);
		} catch {
			return false;
		}
	},

	log: (message: string): void =>
		bot.printLogMessage('[AIO Account Builder] ' + message),

	gameMessage: (message: string): void =>
		bot.printGameMessage('[AIO Account Builder] ' + message),

	setCounter: (name: string, value: number): void =>
		bot.counters.setCounter(name, value),

	terminate: (): void => bot.terminate(),
};
