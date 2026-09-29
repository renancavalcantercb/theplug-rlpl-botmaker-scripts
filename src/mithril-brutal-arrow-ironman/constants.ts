/// <reference types="@deafwave/osrs-botmaker-types" />

export const MITHRIL_ORE_ID = 447;
export const COAL_ID = 453;
export const MITHRIL_BAR_ID = 2359;
export const VARROCK_ARMOUR_2_ID = 13105;
export const HAMMER_ID = 2347;
export const MITHRIL_NAILS_ID = 4822;
export const KNIFE_ID = 946;
export const FEATHER_ID = 314;
export const ACHEY_LOGS_ID = 2862;
export const OGRE_SHAFTS_ID = 2864;
export const FLIGHTED_OGRE_ARROW_ID = 2865;
export const MITHRIL_BRUTAL_ID = 4793;

export const EDGE_BANK_BOOTH_ID = 10355;
export const VARROCK_BANK_BOOTH_ID = 34810;
export const FURNACE_ID = 16469;
export const ANVIL_ID = 2097;
export const ACHEY_TREE_ID = 2023;
export const MAKE_WIDGET_ID = 17694735;
export const SMITH_NAILS_WIDGET_ID = 20447255;

const worldPoint = (x: number, y: number): net.runelite.api.coords.WorldPoint =>
	new net.runelite.api.coords.WorldPoint(x, y, 0);

export const EDGE_BANK_POINT = worldPoint(3096, 3494);
export const FURNACE_POINT = worldPoint(3109, 3499);
export const VARROCK_BANK_POINT = worldPoint(3185, 3436);
export const ANVIL_POINT = worldPoint(3188, 3427);
export const ACHEY_AREA = worldPoint(2603, 2978);

export const ORE_PER_TRIP = 5;
export const NAILS_PER_BAR = 15;
export const COAL_PER_BAR = 4;
export const FEATHERS_PER_ARROW = 4;
export const OBJECT_SEARCH_RADIUS = 20;
export const BANK_AREA_RADIUS = 25;
export const ACHEY_AREA_RADIUS = 15;
export const ARRIVED_RADIUS = 4;
export const SMELT_ANIMATIONS = [899, 2416];
export const SMITH_ANIMATIONS = [898];
export const CHOP_ANIMATIONS = [
	879, 877, 875, 873, 871, 869, 867, 865, 2846, 8303, 10071, 24, 2117, 7264,
];

export type Phase = 'bars' | 'nails' | 'arrows';

export const PHASES: Phase[] = ['bars', 'nails', 'arrows'];

export const PHASE_NAMES: Record<Phase, string> = {
	bars: 'Mithril bars (Edgeville)',
	nails: 'Mithril nails (Varrock West)',
	arrows: 'Brutal arrows (Achey trees)',
};

export const PHASE_LEVELS: Record<Phase, { skill: 'Smithing' | 'Fletching'; level: number }> = {
	bars: { skill: 'Smithing', level: 50 },
	nails: { skill: 'Smithing', level: 54 },
	arrows: { skill: 'Fletching', level: 49 },
};

export const ITEM_NAMES: Record<number, string> = {
	[KNIFE_ID]: 'Knife',
	[ACHEY_LOGS_ID]: 'Achey tree logs',
	[OGRE_SHAFTS_ID]: 'Ogre arrow shafts',
	[FEATHER_ID]: 'Feathers',
	[FLIGHTED_OGRE_ARROW_ID]: 'Flighted ogre arrows',
	[MITHRIL_NAILS_ID]: 'Mithril nails',
	[HAMMER_ID]: 'Hammer',
};
