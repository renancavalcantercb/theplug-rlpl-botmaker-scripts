export interface FishMethodDefinition {
	readonly key: string;
	readonly label: string;
	readonly level: number;
	readonly toolId: number;
	readonly toolName: string;
	readonly baitId?: number;
	readonly baitName?: string;
	readonly spotAction: string;
	readonly rawFishNames: string[];
	readonly defaultSpot: net.runelite.api.coords.WorldPoint;
}

export const FISH_METHODS: readonly FishMethodDefinition[] = [
	{
		key: 'fishing:shrimp',
		label: 'Small Net: Shrimps & Anchovies',
		level: 1,
		toolId: 303,
		toolName: 'Small fishing net',
		spotAction: 'Net',
		rawFishNames: ['Raw shrimps', 'Raw anchovies'],
		defaultSpot: new net.runelite.api.coords.WorldPoint(3242, 3151, 0), // Lumbridge Swamp
	},
	{
		key: 'fishing:sardine',
		label: 'Bait Fishing: Sardines & Herrings',
		level: 5,
		toolId: 307,
		toolName: 'Fishing rod',
		baitId: 313,
		baitName: 'Fishing bait',
		spotAction: 'Bait',
		rawFishNames: ['Raw sardine', 'Raw herring'],
		defaultSpot: new net.runelite.api.coords.WorldPoint(3088, 3228, 0), // Draynor Village
	},
	{
		key: 'fishing:trout',
		label: 'Fly Fishing: Trout & Salmon',
		level: 20,
		toolId: 309,
		toolName: 'Fly fishing rod',
		baitId: 314,
		baitName: 'Feather',
		spotAction: 'Lure',
		rawFishNames: ['Raw trout', 'Raw salmon'],
		defaultSpot: new net.runelite.api.coords.WorldPoint(3105, 3430, 0), // Barbarian Village
	},
	{
		key: 'fishing:lobster',
		label: 'Harpoon / Cage: Lobsters & Swordfish',
		level: 40,
		toolId: 301,
		toolName: 'Lobster pot',
		spotAction: 'Cage',
		rawFishNames: ['Raw lobster', 'Raw swordfish', 'Raw tuna'],
		defaultSpot: new net.runelite.api.coords.WorldPoint(2925, 3177, 0), // Karamja Dock
	},
];
