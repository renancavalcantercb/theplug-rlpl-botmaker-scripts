/**
 * Cookable food definitions, enum, and helpers for AIO Cooking.
 */

export enum FoodItem {
	RAW_BEEF = 2132,
	RAW_CHICKEN = 2138,
	RAW_MEAT = 2134,
	RAW_SHRIMPS = 317,
	RAW_SARDINE = 327,
	RAW_ANCHOVIES = 321,
	RAW_HERRING = 345,
	RAW_MACKEREL = 353,
	RAW_TROUT = 335,
	RAW_COD = 341,
	RAW_PIKE = 349,
	RAW_SALMON = 331,
	RAW_TUNA = 359,
	RAW_KARAMBWAN = 3142,
	RAW_RAINBOW_FISH = 10138,
	RAW_LOBSTER = 377,
	RAW_BASS = 363,
	RAW_SWORDFISH = 371,
	RAW_LAVA_EEL = 2149,
	RAW_MONKFISH = 7944,
	RAW_SHARK = 383,
	RAW_SEA_TURTLE = 395,
	RAW_ANGLERFISH = 13439,
	RAW_DARK_CRAB = 11934,
	RAW_MANTA_RAY = 389,
}

export interface FoodDef {
	id: FoodItem;
	name: string;
	level: number;
	cookedId: number;
	xp: number;
}

export const COOKABLE_FOODS: readonly FoodDef[] = [
	{ id: FoodItem.RAW_BEEF, name: 'Raw beef', level: 1, cookedId: 2142, xp: 30 },
	{ id: FoodItem.RAW_CHICKEN, name: 'Raw chicken', level: 1, cookedId: 2140, xp: 30 },
	{ id: FoodItem.RAW_MEAT, name: 'Raw meat', level: 1, cookedId: 2142, xp: 30 },
	{ id: FoodItem.RAW_SHRIMPS, name: 'Raw shrimps', level: 1, cookedId: 315, xp: 30 },
	{ id: FoodItem.RAW_SARDINE, name: 'Raw sardine', level: 1, cookedId: 325, xp: 40 },
	{ id: FoodItem.RAW_ANCHOVIES, name: 'Raw anchovies', level: 1, cookedId: 319, xp: 30 },
	{ id: FoodItem.RAW_HERRING, name: 'Raw herring', level: 5, cookedId: 347, xp: 50 },
	{ id: FoodItem.RAW_MACKEREL, name: 'Raw mackerel', level: 10, cookedId: 355, xp: 60 },
	{ id: FoodItem.RAW_TROUT, name: 'Raw trout', level: 15, cookedId: 333, xp: 70 },
	{ id: FoodItem.RAW_COD, name: 'Raw cod', level: 18, cookedId: 339, xp: 75 },
	{ id: FoodItem.RAW_PIKE, name: 'Raw pike', level: 20, cookedId: 351, xp: 80 },
	{ id: FoodItem.RAW_SALMON, name: 'Raw salmon', level: 25, cookedId: 329, xp: 90 },
	{ id: FoodItem.RAW_TUNA, name: 'Raw tuna', level: 30, cookedId: 361, xp: 100 },
	{ id: FoodItem.RAW_KARAMBWAN, name: 'Raw karambwan', level: 30, cookedId: 3144, xp: 190 },
	{ id: FoodItem.RAW_RAINBOW_FISH, name: 'Raw rainbow fish', level: 35, cookedId: 10136, xp: 110 },
	{ id: FoodItem.RAW_LOBSTER, name: 'Raw lobster', level: 40, cookedId: 379, xp: 120 },
	{ id: FoodItem.RAW_BASS, name: 'Raw bass', level: 43, cookedId: 365, xp: 130 },
	{ id: FoodItem.RAW_SWORDFISH, name: 'Raw swordfish', level: 45, cookedId: 373, xp: 140 },
	{ id: FoodItem.RAW_LAVA_EEL, name: 'Raw lava eel', level: 53, cookedId: 2149, xp: 30 },
	{ id: FoodItem.RAW_MONKFISH, name: 'Raw monkfish', level: 62, cookedId: 7946, xp: 150 },
	{ id: FoodItem.RAW_SHARK, name: 'Raw shark', level: 80, cookedId: 385, xp: 210 },
	{ id: FoodItem.RAW_SEA_TURTLE, name: 'Raw sea turtle', level: 82, cookedId: 397, xp: 211 },
	{ id: FoodItem.RAW_ANGLERFISH, name: 'Raw anglerfish', level: 84, cookedId: 13441, xp: 230 },
	{ id: FoodItem.RAW_DARK_CRAB, name: 'Raw dark crab', level: 90, cookedId: 11936, xp: 215 },
	{ id: FoodItem.RAW_MANTA_RAY, name: 'Raw manta ray', level: 91, cookedId: 391, xp: 216 },
];

export const getFoodDefById = (id: number): FoodDef | undefined => {
	return COOKABLE_FOODS.find((f) => f.id === id);
};

export const getFoodDefByName = (name: string): FoodDef | undefined => {
	return COOKABLE_FOODS.find((f) => f.name.toLowerCase() === name.toLowerCase());
};

/**
 * Returns the highest level cookable food available in the bank that the player has the level to cook.
 * Evaluates from highest level requirement down to lowest.
 */
export const findHighestLevelFoodInBank = (
	currentLevel: number,
	getBankQuantity: (id: number) => number,
): FoodDef | null => {
	// Sort descending by level
	const sorted = [...COOKABLE_FOODS].sort((a, b) => b.level - a.level);
	for (const food of sorted) {
		if (food.level <= currentLevel && getBankQuantity(food.id) > 0) {
			return food;
		}
	}
	return null;
};
