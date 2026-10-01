/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument */

export interface CombatMonsterZone {
	label: string;
	npcNames: string[];
	areaCenter: net.runelite.api.coords.WorldPoint;
	radius: number;
}

export const COMBAT_ZONES: Record<string, CombatMonsterZone> = {
	'Chickens (Lumbridge)': {
		label: 'Chickens (Lumbridge)',
		npcNames: ['Chicken'],
		areaCenter: new net.runelite.api.coords.WorldPoint(3230, 3298, 0),
		radius: 12,
	},
	'Cows (Lumbridge)': {
		label: 'Cows (Lumbridge)',
		npcNames: ['Cow', 'Cow calf'],
		areaCenter: new net.runelite.api.coords.WorldPoint(3258, 3274, 0),
		radius: 15,
	},
	'Goblins (Lumbridge)': {
		label: 'Goblins (Lumbridge)',
		npcNames: ['Goblin'],
		areaCenter: new net.runelite.api.coords.WorldPoint(3250, 3245, 0),
		radius: 14,
	},
};

export const COMMON_FOOD_IDS: Record<string, number> = {
	Trout: 333,
	Salmon: 329,
	'Cooked meat': 2142,
	'Cooked chicken': 2140,
	Shrimps: 315,
	Bread: 2309,
};

export const LOOT_IDS = {
	FEATHER: 314,
	BONES: 526,
	COWHIDE: 1739,
	RAW_BEEF: 2132,
	RAW_CHICKEN: 2138,
	COINS: 995,
	AIR_RUNE: 556,
	WATER_RUNE: 555,
	EARTH_RUNE: 557,
	FIRE_RUNE: 554,
	MIND_RUNE: 558,
	BODY_RUNE: 559,
};

export const MELEE_WEAPONS_TIER = [
	{ id: 1333, name: 'Rune scimitar', reqLevel: 40 },
	{ id: 1303, name: 'Rune longsword', reqLevel: 40 },
	{ id: 1289, name: 'Rune sword', reqLevel: 40 },
	{ id: 1329, name: 'Adamant scimitar', reqLevel: 30 },
	{ id: 1287, name: 'Adamant sword', reqLevel: 30 },
	{ id: 1325, name: 'Mithril scimitar', reqLevel: 20 },
	{ id: 1285, name: 'Mithril sword', reqLevel: 20 },
	{ id: 1323, name: 'Black scimitar', reqLevel: 10 },
	{ id: 1321, name: 'Steel scimitar', reqLevel: 5 },
	{ id: 1281, name: 'Steel sword', reqLevel: 5 },
	{ id: 1335, name: 'Iron scimitar', reqLevel: 1 },
	{ id: 1279, name: 'Iron sword', reqLevel: 1 },
	{ id: 1277, name: 'Bronze sword', reqLevel: 1 },
	{ id: 1337, name: 'Bronze scimitar', reqLevel: 1 },
	{ id: 1205, name: 'Bronze dagger', reqLevel: 1 },
];

export const CONFLICTING_TOOLS = [
	'Bronze axe',
	'Iron axe',
	'Steel axe',
	'Black axe',
	'Mithril axe',
	'Adamant axe',
	'Rune axe',
	'Bronze pickaxe',
	'Iron pickaxe',
	'Steel pickaxe',
	'Mithril pickaxe',
	'Adamant pickaxe',
	'Rune pickaxe',
	'Small fishing net',
	'Fishing rod',
	'Fly fishing rod',
	'Harpoon',
	'Lobster pot',
	'Tinderbox',
];
