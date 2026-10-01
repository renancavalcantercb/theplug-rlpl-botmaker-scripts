export type MoneyMethodId =
	| 'TAN_COWHIDE'
	| 'WC_OAKS'
	| 'WC_YEWS'
	| 'MINE_CLAY'
	| 'MINE_IRON'
	| 'GRIND_CHOCOLATE'
	| 'MAKE_PIE_SHELLS'
	| 'MAKE_PIZZA_BASES'
	| 'CRAFT_GOLD_AMULET'
	| 'CRAFT_SAPPHIRE_RING'
	| 'CRAFT_EMERALD_RING'
	| 'CRAFT_RUBY_RING'
	| 'HIGH_ALCH'
	| 'TELEGRAB_WINE'
	| 'BUY_FEATHERS';

export type MethodCategory =
	| 'Tanning'
	| 'Gathering'
	| 'Processing'
	| 'Jewelry'
	| 'Magic'
	| 'ShopRun';

export interface MethodDefinition {
	id: MoneyMethodId;
	name: string;
	category: MethodCategory;
	description: string;
	approxGpPerHour: number;
	requiresGp: boolean;
	requiredSkills: {
		woodcutting?: number;
		mining?: number;
		crafting?: number;
		magic?: number;
		cooking?: number;
	};
}

export const METHOD_CATALOG: readonly MethodDefinition[] = [
	{
		id: 'TAN_COWHIDE',
		name: 'Tanning Cowhides (Al-Kharid)',
		category: 'Tanning',
		description: 'Take coins and cowhides to Ellis in Al-Kharid to tan into soft leather.',
		approxGpPerHour: 240000,
		requiresGp: true,
		requiredSkills: {},
	},
	{
		id: 'BUY_FEATHERS',
		name: 'Buying Feather Packs (Port Sarim)',
		category: 'ShopRun',
		description: 'Buy feather packs from Gerrant in Port Sarim, open them into stackable feathers, and bank.',
		approxGpPerHour: 235000,
		requiresGp: true,
		requiredSkills: {},
	},
	{
		id: 'GRIND_CHOCOLATE',
		name: 'Grinding Chocolate (Pestle & Mortar)',
		category: 'Processing',
		description: 'Grind chocolate bars into chocolate dust at the bank using a pestle and mortar.',
		approxGpPerHour: 190000,
		requiresGp: true,
		requiredSkills: {},
	},
	{
		id: 'CRAFT_EMERALD_RING',
		name: 'Crafting Emerald Rings (Al-Kharid)',
		category: 'Jewelry',
		description: 'Craft gold bars and emeralds into emerald rings at the Al-Kharid furnace.',
		approxGpPerHour: 300000,
		requiresGp: true,
		requiredSkills: { crafting: 27 },
	},
	{
		id: 'CRAFT_SAPPHIRE_RING',
		name: 'Crafting Sapphire Rings (Al-Kharid)',
		category: 'Jewelry',
		description: 'Craft gold bars and sapphires into sapphire rings at the Al-Kharid furnace.',
		approxGpPerHour: 275000,
		requiresGp: true,
		requiredSkills: { crafting: 20 },
	},
	{
		id: 'CRAFT_RUBY_RING',
		name: 'Crafting Ruby Rings (Al-Kharid)',
		category: 'Jewelry',
		description: 'Craft gold bars and rubies into ruby rings at the Al-Kharid furnace.',
		approxGpPerHour: 255000,
		requiresGp: true,
		requiredSkills: { crafting: 34 },
	},
	{
		id: 'CRAFT_GOLD_AMULET',
		name: 'Crafting Gold Amulets (Al-Kharid)',
		category: 'Jewelry',
		description: 'Craft gold bars into unstrung gold amulets at the Al-Kharid furnace.',
		approxGpPerHour: 135000,
		requiresGp: true,
		requiredSkills: { crafting: 8 },
	},
	{
		id: 'HIGH_ALCH',
		name: 'High Alchemy (Varrock/Bank)',
		category: 'Magic',
		description: 'Convert high-value items into coins using a Fire Staff and Nature Runes.',
		approxGpPerHour: 540000,
		requiresGp: true,
		requiredSkills: { magic: 55 },
	},
	{
		id: 'TELEGRAB_WINE',
		name: 'Telegrab Wine of Zamorak (Chaos Temple)',
		category: 'Magic',
		description: 'Collect Wine of Zamorak at the Chaos Temple using Telekinetic Grab.',
		approxGpPerHour: 82000,
		requiresGp: true,
		requiredSkills: { magic: 33 },
	},
	{
		id: 'MAKE_PIE_SHELLS',
		name: 'Making Pie Shells (Bank)',
		category: 'Processing',
		description: 'Mix pastry dough with pie dishes at the bank.',
		approxGpPerHour: 260000,
		requiresGp: true,
		requiredSkills: {},
	},
	{
		id: 'MAKE_PIZZA_BASES',
		name: 'Making Pizza Bases (Bank)',
		category: 'Processing',
		description: 'Mix pots of flour with buckets of water to create pizza bases.',
		approxGpPerHour: 62000,
		requiresGp: true,
		requiredSkills: { cooking: 35 },
	},
	{
		id: 'WC_YEWS',
		name: 'Cutting Yew Logs (Draynor/Edgeville)',
		category: 'Gathering',
		description: 'Chop Yew trees and deposit logs into the nearest bank. Zero cost.',
		approxGpPerHour: 110000,
		requiresGp: false,
		requiredSkills: { woodcutting: 60 },
	},
	{
		id: 'WC_OAKS',
		name: 'Cutting Oak Logs (Draynor/Lumbridge)',
		category: 'Gathering',
		description: 'Chop Oak trees and deposit logs into the nearest bank. Zero cost.',
		approxGpPerHour: 51000,
		requiresGp: false,
		requiredSkills: { woodcutting: 15 },
	},
	{
		id: 'MINE_IRON',
		name: 'Mining Iron Ore (Al-Kharid/Varrock)',
		category: 'Gathering',
		description: 'Mine iron ore and deposit into the nearest bank. Zero cost.',
		approxGpPerHour: 75000,
		requiresGp: false,
		requiredSkills: { mining: 15 },
	},
	{
		id: 'MINE_CLAY',
		name: 'Mining Clay (South-west Varrock)',
		category: 'Gathering',
		description: 'Mine clay at South-west Varrock mine close to the west bank. Zero cost.',
		approxGpPerHour: 55000,
		requiresGp: false,
		requiredSkills: { mining: 1 },
	},
];

export type ExecutionMode = 'AUTO' | 'MANUAL';
export type StoppingMode = 'INDEFINITE' | 'TARGET_GP' | 'TIME_LIMIT';
export type PlayStyle = 'fast' | 'normal' | 'lazy';

export interface GeneralSettings {
	executionMode: ExecutionMode;
	selectedMethod: MoneyMethodId;
	stoppingMode: StoppingMode;
	targetGp: number;
	timeLimitHours: number;
	playStyle: PlayStyle;
	noobMode: boolean;
	takeBreaks: boolean;
	bankMicroPauses: boolean;
}

export interface SpecificMethodSettings {
	wcOakLocation: 'Draynor' | 'Lumbridge';
	wcYewLocation: 'Edgeville' | 'Varrock Palace';
	mineLocation: 'Al-Kharid' | 'Varrock SW' | 'Lumbridge West';
	alchItemName: string;
	alchItemId: number;
	leatherType: 'soft' | 'hard';
}

export interface MoneyMakerSettings {
	general: GeneralSettings;
	specific: SpecificMethodSettings;
}
