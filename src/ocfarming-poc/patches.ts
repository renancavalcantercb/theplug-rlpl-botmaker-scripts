/**
 * Port of FarmingPatchData.java — six tree patches and five fruit patches.
 *
 * `region` is the canonical farming transmission region, not a radius around
 * the object: patches report through varbit 4771 or 4772, and which patch a
 * value describes depends on which region the player is standing in.
 */

export interface TreePatch {
	readonly key: string;
	readonly label: string;
	readonly fruit: boolean;
	readonly region: number;
	readonly varbit: number;
	readonly objectId: number;
	readonly visitX: number;
	readonly visitY: number;
	readonly gardener: number;
	/** Tool leprechaun for noting fruit. 0 really is the id outside Kastori. */
	readonly leprechaun: number;
	readonly aliases: readonly number[];
}

const tree = (
	key: string,
	label: string,
	region: number,
	objectId: number,
	visitX: number,
	visitY: number,
	gardener: number,
	aliases: number[] = [],
): TreePatch => ({
	key,
	label,
	fruit: false,
	region,
	varbit: 4771,
	objectId,
	visitX,
	visitY,
	gardener,
	leprechaun: 0,
	aliases,
});

const fruit = (
	key: string,
	label: string,
	region: number,
	varbit: number,
	objectId: number,
	visitX: number,
	visitY: number,
	gardener: number,
	leprechaun: number,
	aliases: number[] = [],
): TreePatch => ({
	key,
	label,
	fruit: true,
	region,
	varbit,
	objectId,
	visitX,
	visitY,
	gardener,
	leprechaun,
	aliases,
});

export const TREE_PATCHES: readonly TreePatch[] = [
	tree('lumbridge', 'Lumbridge tree', 12594, 8391, 3195, 3228, 2681, [12850]),
	tree('varrock', 'Varrock tree', 12854, 8390, 3226, 3458, 11957, [12853]),
	tree('falador', 'Falador Park tree', 11828, 8389, 3001, 3374, 2679, [12084]),
	tree('taverley', 'Taverley tree', 11573, 8388, 2936, 3440, 2678, [11829]),
	tree('gnome', 'Gnome Stronghold tree', 9781, 19147, 2437, 3417, 2687, [9782, 9526, 9525]),
	tree('nemus', 'Nemus Retreat tree', 5427, 56953, 1365, 3320, 14514, [5428, 5684]),
];

export const FRUIT_PATCHES: readonly TreePatch[] = [
	fruit('gnomefruit', 'Gnome Stronghold fruit', 9781, 4772, 7962, 2473, 3446, 2682, 0, [9782, 9526, 9525]),
	fruit('catherby', 'Catherby fruit', 11317, 4771, 7965, 2858, 3432, 2670, 0),
	fruit('village', 'Tree Gnome Village fruit', 9777, 4771, 7963, 2490, 3181, 2683, 0, [10033]),
	fruit('brimhaven', 'Brimhaven fruit', 11058, 4771, 7964, 2765, 3213, 2669, 0, [11057]),
	fruit('kastori', 'Kastori fruit', 5423, 4772, 56955, 1349, 3058, 14516, 12765, [5167, 5424]),
];

export const PATCHES: readonly TreePatch[] = [...TREE_PATCHES, ...FRUIT_PATCHES];

export const regionOf = (x: number, y: number): number => ((x >> 6) << 8) | (y >> 6);

export const acceptsRegion = (target: TreePatch, actual: number): boolean =>
	actual === target.region || target.aliases.includes(actual);

export const includes = (target: TreePatch, x: number, y: number, plane: number): boolean => {
	// This corner of Catherby transmits allotments through the same varbit.
	if (target.key === 'catherby' && x < 2840 && y >= 3440) return false;
	return plane === 0 && acceptsRegion(target, regionOf(x, y));
};

export const visitPoint = (target: TreePatch): net.runelite.api.coords.WorldPoint =>
	new net.runelite.api.coords.WorldPoint(target.visitX, target.visitY, 0);
