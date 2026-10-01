export interface AxeDefinition {
	readonly id: number;
	readonly name: string;
	readonly woodcuttingLevel: number;
	readonly attackLevel: number;
}

export const AXES: readonly AxeDefinition[] = [
	{ id: 1359, name: 'Rune axe', woodcuttingLevel: 41, attackLevel: 40 },
	{ id: 1357, name: 'Adamant axe', woodcuttingLevel: 31, attackLevel: 30 },
	{ id: 1355, name: 'Mithril axe', woodcuttingLevel: 21, attackLevel: 20 },
	{ id: 1361, name: 'Black axe', woodcuttingLevel: 11, attackLevel: 10 },
	{ id: 1353, name: 'Steel axe', woodcuttingLevel: 6, attackLevel: 5 },
	{ id: 1349, name: 'Iron axe', woodcuttingLevel: 1, attackLevel: 1 },
	{ id: 1351, name: 'Bronze axe', woodcuttingLevel: 1, attackLevel: 1 },
];

export interface TreeDefinition {
	readonly key: string;
	readonly label: string;
	readonly objectNames: string[];
	readonly level: number;
	readonly logId: number;
	readonly logName: string;
	readonly defaultSpot: net.runelite.api.coords.WorldPoint;
}

export const TREES: readonly TreeDefinition[] = [
	{
		key: 'woodcutting:logs',
		label: 'Normal trees',
		objectNames: ['Tree', 'Evergreen tree', 'Dead tree'],
		level: 1,
		logId: 1511,
		logName: 'Logs',
		defaultSpot: new net.runelite.api.coords.WorldPoint(3190, 3225, 0), // Lumbridge courtyard
	},
	{
		key: 'woodcutting:oak',
		label: 'Oak trees',
		objectNames: ['Oak', 'Oak tree'],
		level: 15,
		logId: 1521,
		logName: 'Oak logs',
		defaultSpot: new net.runelite.api.coords.WorldPoint(3190, 3245, 0), // Lumbridge west
	},
	{
		key: 'woodcutting:willow',
		label: 'Willow trees',
		objectNames: ['Willow', 'Willow tree'],
		level: 30,
		logId: 1519,
		logName: 'Willow logs',
		defaultSpot: new net.runelite.api.coords.WorldPoint(3085, 3235, 0), // Draynor Village
	},
	{
		key: 'woodcutting:yew',
		label: 'Yew trees',
		objectNames: ['Yew', 'Yew tree'],
		level: 60,
		logId: 1515,
		logName: 'Yew logs',
		defaultSpot: new net.runelite.api.coords.WorldPoint(3085, 3470, 0), // Edgeville south
	},
];
