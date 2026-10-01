export const ITEM_TINDERBOX = 590;

export interface LogDefinition {
	readonly key: string;
	readonly label: string;
	readonly logId: number;
	readonly logName: string;
	readonly level: number;
}

export const FM_LOGS: readonly LogDefinition[] = [
	{ key: 'firemaking:logs', label: 'Normal logs', logId: 1511, logName: 'Logs', level: 1 },
	{ key: 'firemaking:oak', label: 'Oak logs', logId: 1521, logName: 'Oak logs', level: 15 },
	{ key: 'firemaking:willow', label: 'Willow logs', logId: 1519, logName: 'Willow logs', level: 30 },
	{ key: 'firemaking:maple', label: 'Maple logs', logId: 1517, logName: 'Maple logs', level: 45 },
	{ key: 'firemaking:yew', label: 'Yew logs', logId: 1515, logName: 'Yew logs', level: 60 },
];

export interface FirelineSpot {
	readonly name: string;
	readonly startPoint: net.runelite.api.coords.WorldPoint;
}

export const FIRELINE_SPOTS: readonly FirelineSpot[] = [
	{ name: 'Grand Exchange', startPoint: new net.runelite.api.coords.WorldPoint(3185, 3485, 0) },
	{ name: 'Varrock East', startPoint: new net.runelite.api.coords.WorldPoint(3255, 3430, 0) },
	{ name: 'Draynor Bank', startPoint: new net.runelite.api.coords.WorldPoint(3095, 3240, 0) },
	{ name: 'Lumbridge Courtyard', startPoint: new net.runelite.api.coords.WorldPoint(3205, 3225, 0) },
];
