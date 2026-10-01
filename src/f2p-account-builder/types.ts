export type BuilderCategory =
	| 'Combat'
	| 'Ranged'
	| 'Magic'
	| 'Prayer'
	| 'Cooking'
	| 'Crafting'
	| 'Firemaking'
	| 'Fishing'
	| 'Mining'
	| 'Runecrafting'
	| 'Smithing'
	| 'Woodcutting'
	| 'Quests'
	| 'Moneymaking';

export const ALL_CATEGORIES: readonly BuilderCategory[] = [
	'Combat',
	'Ranged',
	'Magic',
	'Prayer',
	'Cooking',
	'Crafting',
	'Firemaking',
	'Fishing',
	'Mining',
	'Runecrafting',
	'Smithing',
	'Woodcutting',
	'Quests',
	'Moneymaking',
];

export interface CombatSettings {
	targetAttack: number;
	targetStrength: number;
	targetDefence: number;
	combatOrder: 'balanced' | 'atk_str_def' | 'str_atk_def' | 'focus';
	monster: string;
	food: string;
	eatAtHp: number;
	lootBones: boolean;
	lootCoins: boolean;
	lootRunes: boolean;
	buryBones: boolean;
}

export interface RangedSettings {
	targetLevel: number;
	trainDefence: boolean;
	monster: string;
	bow: string;
	arrow: string;
	safeSpot: boolean;
}

export interface MagicSettings {
	targetLevel: number;
	trainDefence: boolean;
	method: 'combat_spells' | 'splashing' | 'curse' | 'teleport' | 'high_alch';
	spell: string;
	splashTarget: string;
	staff: string;
}

export interface PrayerSettings {
	targetLevel: number;
	method: 'bury_inventory' | 'collect_and_bury' | 'bank_big_bones';
}

export interface CookingSettings {
	targetLevel: number;
	food: string;
	progressive: boolean;
	location: string;
	dropBurnt: boolean;
}

export interface CraftingSettings {
	targetLevel: number;
	category: 'leather' | 'gems' | 'jewelry' | 'pottery';
	item: string;
}

export interface FiremakingSettings {
	targetLevel: number;
	log: string;
	mode: 'lines' | 'bonfire';
}

export interface FishingSettings {
	targetLevel: number;
	method: 'shrimp_anchovies' | 'sardine_herring' | 'trout_salmon' | 'lobster_swordfish';
	location: string;
	dropFish: boolean;
}

export interface MiningSettings {
	targetLevel: number;
	ore: string;
	location: string;
	dropOre: boolean;
}

export interface RunecraftingSettings {
	targetLevel: number;
	rune: string;
	mode: 'runes' | 'tiaras';
}

export interface SmithingSettings {
	targetLevel: number;
	method: 'smelting' | 'anvil';
	barOrItem: string;
	location: string;
}

export interface WoodcuttingSettings {
	targetLevel: number;
	tree: string;
	location: string;
	dropLogs: boolean;
}

export interface QuestSettings {
	selectedQuests: string[];
	stopOnQuestPoints: number;
}

export interface MoneymakingSettings {
	method: string;
	targetGp: number;
}

export interface GeneralSettings {
	playStyle: 'normal' | 'lazy' | 'fast';
	targetTotalLevel: number;
	takeBreaks: boolean;
	cameraMovement: boolean;
	noobMode: boolean;
	strictLevelGoals: boolean;
}

export interface AccountBuilderSettings {
	enabledCategories: BuilderCategory[];
	general: GeneralSettings;
	combat: CombatSettings;
	ranged: RangedSettings;
	magic: MagicSettings;
	prayer: PrayerSettings;
	cooking: CookingSettings;
	crafting: CraftingSettings;
	firemaking: FiremakingSettings;
	fishing: FishingSettings;
	mining: MiningSettings;
	runecrafting: RunecraftingSettings;
	smithing: SmithingSettings;
	woodcutting: WoodcuttingSettings;
	quests: QuestSettings;
	moneymaking: MoneymakingSettings;
}

export interface QuestDefinition {
	name: string;
	points: number;
	difficulty: 'Novice' | 'Intermediate' | 'Experienced';
}

export const F2P_QUESTS: readonly QuestDefinition[] = [
	{ name: "Cook's Assistant", points: 1, difficulty: 'Novice' },
	{ name: 'Sheep Shearer', points: 1, difficulty: 'Novice' },
	{ name: 'The Restless Ghost', points: 1, difficulty: 'Novice' },
	{ name: 'Romeo & Juliet', points: 5, difficulty: 'Novice' },
	{ name: 'Ernest the Chicken', points: 4, difficulty: 'Novice' },
	{ name: 'Rune Mysteries', points: 1, difficulty: 'Novice' },
	{ name: "Witch's Potion", points: 1, difficulty: 'Novice' },
	{ name: 'Imp Catcher', points: 1, difficulty: 'Novice' },
	{ name: 'Goblin Diplomacy', points: 5, difficulty: 'Novice' },
	{ name: "Doric's Quest", points: 1, difficulty: 'Novice' },
	{ name: "Pirate's Treasure", points: 2, difficulty: 'Novice' },
	{ name: 'Black Knights Fortress', points: 3, difficulty: 'Novice' },
	{ name: 'Vampire Slayer', points: 3, difficulty: 'Intermediate' },
	{ name: 'Prince Ali Rescue', points: 3, difficulty: 'Intermediate' },
	{ name: 'Demon Slayer', points: 3, difficulty: 'Intermediate' },
	{ name: "The Knight's Sword", points: 1, difficulty: 'Intermediate' },
	{ name: 'Shield of Arrav', points: 1, difficulty: 'Novice' },
	{ name: 'Below Ice Mountain', points: 1, difficulty: 'Intermediate' },
	{ name: 'X Marks the Spot', points: 1, difficulty: 'Novice' },
	{ name: 'Misthalin Mystery', points: 1, difficulty: 'Novice' },
	{ name: 'The Corsair Curse', points: 2, difficulty: 'Intermediate' },
	{ name: 'Dragon Slayer I', points: 2, difficulty: 'Experienced' },
];
