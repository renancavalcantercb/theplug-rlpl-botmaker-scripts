export interface CookableFood {
	readonly id: number;
	readonly name: string;
	readonly cookedId: number;
	readonly level: number;
	readonly xp: number;
}

export const COOK_WIDGET_ID = 17694735;
export const MAKE_ALL_WIDGET_ID = 17694732;

export const BURNT_FOOD_NAMES: readonly string[] = [
	'Burnt fish',
	'Burnt shrimp',
	'Burnt anchovies',
	'Burnt sardine',
	'Burnt herring',
	'Burnt trout',
	'Burnt salmon',
	'Burnt tuna',
	'Burnt lobster',
	'Burnt swordfish',
	'Burnt meat',
	'Burnt chicken',
	'Burnt bread',
];

export const COOKABLE_FOODS: readonly CookableFood[] = [
	{ id: 317, name: 'Raw shrimps', cookedId: 315, level: 1, xp: 30 },
	{ id: 321, name: 'Raw anchovies', cookedId: 319, level: 1, xp: 30 },
	{ id: 2132, name: 'Raw beef', cookedId: 2142, level: 1, xp: 30 },
	{ id: 2138, name: 'Raw chicken', cookedId: 2140, level: 1, xp: 30 },
	{ id: 2134, name: 'Raw meat', cookedId: 2142, level: 1, xp: 30 },
	{ id: 327, name: 'Raw sardine', cookedId: 325, level: 1, xp: 40 },
	{ id: 345, name: 'Raw herring', cookedId: 347, level: 5, xp: 50 },
	{ id: 335, name: 'Raw trout', cookedId: 333, level: 15, xp: 70 },
	{ id: 349, name: 'Raw pike', cookedId: 351, level: 20, xp: 80 },
	{ id: 331, name: 'Raw salmon', cookedId: 329, level: 25, xp: 90 },
	{ id: 359, name: 'Raw tuna', cookedId: 361, level: 30, xp: 100 },
	{ id: 377, name: 'Raw lobster', cookedId: 379, level: 40, xp: 120 },
	{ id: 371, name: 'Raw swordfish', cookedId: 373, level: 45, xp: 140 },
];

export interface CookingLocation {
	readonly label: string;
	readonly objectNames: string[];
	readonly spotPoint: net.runelite.api.coords.WorldPoint;
	readonly bankPoint?: net.runelite.api.coords.WorldPoint;
}

export const COOKING_LOCATIONS: readonly CookingLocation[] = [
	{
		label: 'Al-Kharid range',
		objectNames: ['Range'],
		spotPoint: new net.runelite.api.coords.WorldPoint(3272, 3180, 0),
		bankPoint: new net.runelite.api.coords.WorldPoint(3269, 3166, 0),
	},
	{
		label: 'Edgeville stove',
		objectNames: ['Stove', 'Range'],
		spotPoint: new net.runelite.api.coords.WorldPoint(3079, 3496, 0),
		bankPoint: new net.runelite.api.coords.WorldPoint(3093, 3493, 0),
	},
	{
		label: 'Lumbridge castle range',
		objectNames: ['Cooks range', 'Range'],
		spotPoint: new net.runelite.api.coords.WorldPoint(3212, 3215, 0),
		bankPoint: new net.runelite.api.coords.WorldPoint(3208, 3219, 2),
	},
	{
		label: 'Rogues Den permanent fire',
		objectNames: ['Fire'],
		spotPoint: new net.runelite.api.coords.WorldPoint(3043, 4973, 1),
		bankPoint: new net.runelite.api.coords.WorldPoint(3040, 4969, 1),
	},
];
