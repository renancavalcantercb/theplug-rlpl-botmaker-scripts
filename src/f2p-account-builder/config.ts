import {
	AccountBuilderSettings,
	BuilderCategory,
	ALL_CATEGORIES,
	F2P_QUESTS,
} from './types.js';

const CACHE_PREFIX = 'f2pAccountBuilder.';

export const defaultSettings: AccountBuilderSettings = {
	enabledCategories: ['Combat', 'Cooking', 'Woodcutting', 'Fishing', 'Quests'],
	general: {
		playStyle: 'normal',
		targetTotalLevel: 0,
		takeBreaks: true,
		cameraMovement: true,
		noobMode: true,
		strictLevelGoals: false,
	},
	combat: {
		targetAttack: 40,
		targetStrength: 40,
		targetDefence: 40,
		combatOrder: 'balanced',
		monster: 'Chickens (Lumbridge)',
		food: 'Trout',
		eatAtHp: 50,
		lootBones: false,
		lootCoins: true,
		lootRunes: true,
		buryBones: false,
	},
	ranged: {
		targetLevel: 40,
		trainDefence: false,
		monster: 'Cows (Lumbridge)',
		bow: 'Oak shortbow',
		arrow: 'Iron arrow',
		safeSpot: true,
	},
	magic: {
		targetLevel: 25,
		trainDefence: false,
		method: 'combat_spells',
		spell: 'Wind Strike',
		splashTarget: 'Rat (Lumbridge)',
		staff: 'Staff of Air',
	},
	prayer: {
		targetLevel: 31,
		method: 'collect_and_bury',
	},
	cooking: {
		targetLevel: 40,
		food: 'Trout',
		progressive: true,
		location: 'Al-Kharid',
		dropBurnt: true,
	},
	crafting: {
		targetLevel: 30,
		category: 'leather',
		item: 'Leather gloves',
	},
	firemaking: {
		targetLevel: 30,
		log: 'Oak logs',
		mode: 'lines',
	},
	fishing: {
		targetLevel: 40,
		method: 'shrimp_anchovies',
		location: 'Lumbridge Swamp',
		dropFish: false,
	},
	mining: {
		targetLevel: 40,
		ore: 'Copper & Tin',
		location: 'Lumbridge Swamp',
		dropOre: false,
	},
	runecrafting: {
		targetLevel: 20,
		rune: 'Air',
		mode: 'runes',
	},
	smithing: {
		targetLevel: 35,
		method: 'smelting',
		barOrItem: 'Bronze bar',
		location: 'Al-Kharid furnace',
	},
	woodcutting: {
		targetLevel: 40,
		tree: 'Oak trees',
		location: 'Lumbridge',
		dropLogs: false,
	},
	quests: {
		selectedQuests: ["Cook's Assistant", 'Sheep Shearer', 'The Restless Ghost', 'Romeo & Juliet', 'Rune Mysteries'],
		stopOnQuestPoints: 10,
	},
	moneymaking: {
		method: 'Tan Cowhides (Al-Kharid)',
		targetGp: 50000,
	},
};

const getCachedString = (key: string, fallback: string): string => {
	try {
		return String(bot.bmCache.getString(key, fallback));
	} catch {
		return fallback;
	}
};

const getCachedInt = (key: string, fallback: number): number => {
	try {
		const val = Number(bot.bmCache.getInt(key, fallback));
		return isNaN(val) ? fallback : val;
	} catch {
		return fallback;
	}
};

const getCachedBoolean = (key: string, fallback: boolean): boolean => {
	try {
		return Boolean(bot.bmCache.getBoolean(key, fallback));
	} catch {
		return fallback;
	}
};

export const loadSettings = (): AccountBuilderSettings => {
	const configured = getCachedBoolean(CACHE_PREFIX + 'configured', false);
	if (!configured) {
		return JSON.parse(JSON.stringify(defaultSettings)) as AccountBuilderSettings;
	}

	const enabledCategories: BuilderCategory[] = [];
	for (const cat of ALL_CATEGORIES) {
		if (getCachedBoolean(CACHE_PREFIX + 'queue.' + cat, false)) {
			enabledCategories.push(cat);
		}
	}

	const playStyleStr = getCachedString(CACHE_PREFIX + 'general.playStyle', 'normal');
	const playStyle = (playStyleStr === 'lazy' || playStyleStr === 'fast' ? playStyleStr : 'normal');

	// Load selected quests: use quests.configured flag and quests.list
	const questsConfigured = getCachedBoolean(CACHE_PREFIX + 'quests.configured', false);
	let selectedQuests: string[] = [];

	if (questsConfigured) {
		const rawList = getCachedString(CACHE_PREFIX + 'quests.list', '');
		if (rawList.length > 0) {
			selectedQuests = rawList.split(',').map((s) => s.trim()).filter(Boolean);
		} else {
			for (const q of F2P_QUESTS) {
				if (getCachedBoolean(CACHE_PREFIX + 'quests.item.' + q.name, false)) {
					selectedQuests.push(q.name);
				}
			}
		}
	} else {
		selectedQuests = [...defaultSettings.quests.selectedQuests];
	}

	return {
		enabledCategories: enabledCategories.length > 0 ? enabledCategories : [...defaultSettings.enabledCategories],
		general: {
			playStyle,
			targetTotalLevel: getCachedInt(CACHE_PREFIX + 'general.targetTotalLevel', 0),
			takeBreaks: getCachedBoolean(CACHE_PREFIX + 'general.takeBreaks', true),
			cameraMovement: getCachedBoolean(CACHE_PREFIX + 'general.cameraMovement', true),
			noobMode: getCachedBoolean(CACHE_PREFIX + 'general.noobMode', true),
			strictLevelGoals: getCachedBoolean(CACHE_PREFIX + 'general.strictLevelGoals', false),
		},
		combat: {
			targetAttack: getCachedInt(CACHE_PREFIX + 'combat.targetAttack', 40),
			targetStrength: getCachedInt(CACHE_PREFIX + 'combat.targetStrength', 40),
			targetDefence: getCachedInt(CACHE_PREFIX + 'combat.targetDefence', 40),
			combatOrder: (getCachedString(CACHE_PREFIX + 'combat.combatOrder', 'balanced') as any),
			monster: getCachedString(CACHE_PREFIX + 'combat.monster', 'Chickens (Lumbridge)'),
			food: getCachedString(CACHE_PREFIX + 'combat.food', 'Trout'),
			eatAtHp: getCachedInt(CACHE_PREFIX + 'combat.eatAtHp', 50),
			lootBones: getCachedBoolean(CACHE_PREFIX + 'combat.lootBones', false),
			lootCoins: getCachedBoolean(CACHE_PREFIX + 'combat.lootCoins', true),
			lootRunes: getCachedBoolean(CACHE_PREFIX + 'combat.lootRunes', true),
			buryBones: getCachedBoolean(CACHE_PREFIX + 'combat.buryBones', false),
		},
		ranged: {
			targetLevel: getCachedInt(CACHE_PREFIX + 'ranged.targetLevel', 40),
			trainDefence: getCachedBoolean(CACHE_PREFIX + 'ranged.trainDefence', false),
			monster: getCachedString(CACHE_PREFIX + 'ranged.monster', 'Cows (Lumbridge)'),
			bow: getCachedString(CACHE_PREFIX + 'ranged.bow', 'Oak shortbow'),
			arrow: getCachedString(CACHE_PREFIX + 'ranged.arrow', 'Iron arrow'),
			safeSpot: getCachedBoolean(CACHE_PREFIX + 'ranged.safeSpot', true),
		},
		magic: {
			targetLevel: getCachedInt(CACHE_PREFIX + 'magic.targetLevel', 25),
			trainDefence: getCachedBoolean(CACHE_PREFIX + 'magic.trainDefence', false),
			method: (getCachedString(CACHE_PREFIX + 'magic.method', 'combat_spells') as any),
			spell: getCachedString(CACHE_PREFIX + 'magic.spell', 'Wind Strike'),
			splashTarget: getCachedString(CACHE_PREFIX + 'magic.splashTarget', 'Rat (Lumbridge)'),
			staff: getCachedString(CACHE_PREFIX + 'magic.staff', 'Staff of Air'),
		},
		prayer: {
			targetLevel: getCachedInt(CACHE_PREFIX + 'prayer.targetLevel', 31),
			method: (getCachedString(CACHE_PREFIX + 'prayer.method', 'collect_and_bury') as any),
		},
		cooking: {
			targetLevel: getCachedInt(CACHE_PREFIX + 'cooking.targetLevel', 40),
			food: getCachedString(CACHE_PREFIX + 'cooking.food', 'Trout'),
			progressive: getCachedBoolean(CACHE_PREFIX + 'cooking.progressive', true),
			location: getCachedString(CACHE_PREFIX + 'cooking.location', 'Al-Kharid'),
			dropBurnt: getCachedBoolean(CACHE_PREFIX + 'cooking.dropBurnt', true),
		},
		crafting: {
			targetLevel: getCachedInt(CACHE_PREFIX + 'crafting.targetLevel', 30),
			category: (getCachedString(CACHE_PREFIX + 'crafting.category', 'leather') as any),
			item: getCachedString(CACHE_PREFIX + 'crafting.item', 'Leather gloves'),
		},
		firemaking: {
			targetLevel: getCachedInt(CACHE_PREFIX + 'firemaking.targetLevel', 30),
			log: getCachedString(CACHE_PREFIX + 'firemaking.log', 'Oak logs'),
			mode: (getCachedString(CACHE_PREFIX + 'firemaking.mode', 'lines') as any),
		},
		fishing: {
			targetLevel: getCachedInt(CACHE_PREFIX + 'fishing.targetLevel', 40),
			method: (getCachedString(CACHE_PREFIX + 'fishing.method', 'shrimp_anchovies') as any),
			location: getCachedString(CACHE_PREFIX + 'fishing.location', 'Lumbridge Swamp'),
			dropFish: getCachedBoolean(CACHE_PREFIX + 'fishing.dropFish', false),
		},
		mining: {
			targetLevel: getCachedInt(CACHE_PREFIX + 'mining.targetLevel', 40),
			ore: getCachedString(CACHE_PREFIX + 'mining.ore', 'Copper & Tin'),
			location: getCachedString(CACHE_PREFIX + 'mining.location', 'Lumbridge Swamp'),
			dropOre: getCachedBoolean(CACHE_PREFIX + 'mining.dropOre', false),
		},
		runecrafting: {
			targetLevel: getCachedInt(CACHE_PREFIX + 'runecrafting.targetLevel', 20),
			rune: getCachedString(CACHE_PREFIX + 'runecrafting.rune', 'Air'),
			mode: (getCachedString(CACHE_PREFIX + 'runecrafting.mode', 'runes') as any),
		},
		smithing: {
			targetLevel: getCachedInt(CACHE_PREFIX + 'smithing.targetLevel', 35),
			method: (getCachedString(CACHE_PREFIX + 'smithing.method', 'smelting') as any),
			barOrItem: getCachedString(CACHE_PREFIX + 'smithing.barOrItem', 'Bronze bar'),
			location: getCachedString(CACHE_PREFIX + 'smithing.location', 'Al-Kharid furnace'),
		},
		woodcutting: {
			targetLevel: getCachedInt(CACHE_PREFIX + 'woodcutting.targetLevel', 40),
			tree: getCachedString(CACHE_PREFIX + 'woodcutting.tree', 'Oak trees'),
			location: getCachedString(CACHE_PREFIX + 'woodcutting.location', 'Lumbridge'),
			dropLogs: getCachedBoolean(CACHE_PREFIX + 'woodcutting.dropLogs', false),
		},
		quests: {
			selectedQuests,
			stopOnQuestPoints: getCachedInt(CACHE_PREFIX + 'quests.stopOnQuestPoints', 10),
		},
		moneymaking: {
			method: getCachedString(CACHE_PREFIX + 'moneymaking.method', 'Tan Cowhides (Al-Kharid)'),
			targetGp: getCachedInt(CACHE_PREFIX + 'moneymaking.targetGp', 50000),
		},
	};
};

export const saveSettings = (settings: AccountBuilderSettings): void => {
	bot.bmCache.saveBoolean(CACHE_PREFIX + 'configured', true);

	for (const cat of ALL_CATEGORIES) {
		bot.bmCache.saveBoolean(CACHE_PREFIX + 'queue.' + cat, settings.enabledCategories.includes(cat));
	}

	bot.bmCache.saveString(CACHE_PREFIX + 'general.playStyle', settings.general.playStyle);
	bot.bmCache.saveInt(CACHE_PREFIX + 'general.targetTotalLevel', settings.general.targetTotalLevel);
	bot.bmCache.saveBoolean(CACHE_PREFIX + 'general.takeBreaks', settings.general.takeBreaks);
	bot.bmCache.saveBoolean(CACHE_PREFIX + 'general.cameraMovement', settings.general.cameraMovement);
	bot.bmCache.saveBoolean(CACHE_PREFIX + 'general.noobMode', settings.general.noobMode);
	bot.bmCache.saveBoolean(CACHE_PREFIX + 'general.strictLevelGoals', settings.general.strictLevelGoals);

	// Combat
	bot.bmCache.saveInt(CACHE_PREFIX + 'combat.targetAttack', settings.combat.targetAttack);
	bot.bmCache.saveInt(CACHE_PREFIX + 'combat.targetStrength', settings.combat.targetStrength);
	bot.bmCache.saveInt(CACHE_PREFIX + 'combat.targetDefence', settings.combat.targetDefence);
	bot.bmCache.saveString(CACHE_PREFIX + 'combat.combatOrder', settings.combat.combatOrder);
	bot.bmCache.saveString(CACHE_PREFIX + 'combat.monster', settings.combat.monster);
	bot.bmCache.saveString(CACHE_PREFIX + 'combat.food', settings.combat.food);
	bot.bmCache.saveInt(CACHE_PREFIX + 'combat.eatAtHp', settings.combat.eatAtHp);
	bot.bmCache.saveBoolean(CACHE_PREFIX + 'combat.lootBones', settings.combat.lootBones);
	bot.bmCache.saveBoolean(CACHE_PREFIX + 'combat.lootCoins', settings.combat.lootCoins);
	bot.bmCache.saveBoolean(CACHE_PREFIX + 'combat.lootRunes', settings.combat.lootRunes);
	bot.bmCache.saveBoolean(CACHE_PREFIX + 'combat.buryBones', settings.combat.buryBones);

	// Ranged
	bot.bmCache.saveInt(CACHE_PREFIX + 'ranged.targetLevel', settings.ranged.targetLevel);
	bot.bmCache.saveBoolean(CACHE_PREFIX + 'ranged.trainDefence', settings.ranged.trainDefence);
	bot.bmCache.saveString(CACHE_PREFIX + 'ranged.monster', settings.ranged.monster);
	bot.bmCache.saveString(CACHE_PREFIX + 'ranged.bow', settings.ranged.bow);
	bot.bmCache.saveString(CACHE_PREFIX + 'ranged.arrow', settings.ranged.arrow);
	bot.bmCache.saveBoolean(CACHE_PREFIX + 'ranged.safeSpot', settings.ranged.safeSpot);

	// Magic
	bot.bmCache.saveInt(CACHE_PREFIX + 'magic.targetLevel', settings.magic.targetLevel);
	bot.bmCache.saveBoolean(CACHE_PREFIX + 'magic.trainDefence', settings.magic.trainDefence);
	bot.bmCache.saveString(CACHE_PREFIX + 'magic.method', settings.magic.method);
	bot.bmCache.saveString(CACHE_PREFIX + 'magic.spell', settings.magic.spell);
	bot.bmCache.saveString(CACHE_PREFIX + 'magic.splashTarget', settings.magic.splashTarget);
	bot.bmCache.saveString(CACHE_PREFIX + 'magic.staff', settings.magic.staff);

	// Prayer
	bot.bmCache.saveInt(CACHE_PREFIX + 'prayer.targetLevel', settings.prayer.targetLevel);
	bot.bmCache.saveString(CACHE_PREFIX + 'prayer.method', settings.prayer.method);

	// Cooking
	bot.bmCache.saveInt(CACHE_PREFIX + 'cooking.targetLevel', settings.cooking.targetLevel);
	bot.bmCache.saveString(CACHE_PREFIX + 'cooking.food', settings.cooking.food);
	bot.bmCache.saveBoolean(CACHE_PREFIX + 'cooking.progressive', settings.cooking.progressive);
	bot.bmCache.saveString(CACHE_PREFIX + 'cooking.location', settings.cooking.location);
	bot.bmCache.saveBoolean(CACHE_PREFIX + 'cooking.dropBurnt', settings.cooking.dropBurnt);

	// Crafting
	bot.bmCache.saveInt(CACHE_PREFIX + 'crafting.targetLevel', settings.crafting.targetLevel);
	bot.bmCache.saveString(CACHE_PREFIX + 'crafting.category', settings.crafting.category);
	bot.bmCache.saveString(CACHE_PREFIX + 'crafting.item', settings.crafting.item);

	// Firemaking
	bot.bmCache.saveInt(CACHE_PREFIX + 'firemaking.targetLevel', settings.firemaking.targetLevel);
	bot.bmCache.saveString(CACHE_PREFIX + 'firemaking.log', settings.firemaking.log);
	bot.bmCache.saveString(CACHE_PREFIX + 'firemaking.mode', settings.firemaking.mode);

	// Fishing
	bot.bmCache.saveInt(CACHE_PREFIX + 'fishing.targetLevel', settings.fishing.targetLevel);
	bot.bmCache.saveString(CACHE_PREFIX + 'fishing.method', settings.fishing.method);
	bot.bmCache.saveString(CACHE_PREFIX + 'fishing.location', settings.fishing.location);
	bot.bmCache.saveBoolean(CACHE_PREFIX + 'fishing.dropFish', settings.fishing.dropFish);

	// Mining
	bot.bmCache.saveInt(CACHE_PREFIX + 'mining.targetLevel', settings.mining.targetLevel);
	bot.bmCache.saveString(CACHE_PREFIX + 'mining.ore', settings.mining.ore);
	bot.bmCache.saveString(CACHE_PREFIX + 'mining.location', settings.mining.location);
	bot.bmCache.saveBoolean(CACHE_PREFIX + 'mining.dropOre', settings.mining.dropOre);

	// Runecrafting
	bot.bmCache.saveInt(CACHE_PREFIX + 'runecrafting.targetLevel', settings.runecrafting.targetLevel);
	bot.bmCache.saveString(CACHE_PREFIX + 'runecrafting.rune', settings.runecrafting.rune);
	bot.bmCache.saveString(CACHE_PREFIX + 'runecrafting.mode', settings.runecrafting.mode);

	// Smithing
	bot.bmCache.saveInt(CACHE_PREFIX + 'smithing.targetLevel', settings.smithing.targetLevel);
	bot.bmCache.saveString(CACHE_PREFIX + 'smithing.method', settings.smithing.method);
	bot.bmCache.saveString(CACHE_PREFIX + 'smithing.barOrItem', settings.smithing.barOrItem);
	bot.bmCache.saveString(CACHE_PREFIX + 'smithing.location', settings.smithing.location);

	// Woodcutting
	bot.bmCache.saveInt(CACHE_PREFIX + 'woodcutting.targetLevel', settings.woodcutting.targetLevel);
	bot.bmCache.saveString(CACHE_PREFIX + 'woodcutting.tree', settings.woodcutting.tree);
	bot.bmCache.saveString(CACHE_PREFIX + 'woodcutting.location', settings.woodcutting.location);
	bot.bmCache.saveBoolean(CACHE_PREFIX + 'woodcutting.dropLogs', settings.woodcutting.dropLogs);

	// Quests
	bot.bmCache.saveBoolean(CACHE_PREFIX + 'quests.configured', true);
	for (const q of F2P_QUESTS) {
		const isSelected = settings.quests.selectedQuests.includes(q.name);
		bot.bmCache.saveBoolean(CACHE_PREFIX + 'quests.item.' + q.name, isSelected);
	}
	bot.bmCache.saveString(CACHE_PREFIX + 'quests.list', settings.quests.selectedQuests.join(','));
	bot.bmCache.saveInt(CACHE_PREFIX + 'quests.stopOnQuestPoints', settings.quests.stopOnQuestPoints);

	// Moneymaking
	bot.bmCache.saveString(CACHE_PREFIX + 'moneymaking.method', settings.moneymaking.method);
	bot.bmCache.saveInt(CACHE_PREFIX + 'moneymaking.targetGp', settings.moneymaking.targetGp);
};
