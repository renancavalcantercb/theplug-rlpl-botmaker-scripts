/**
 * Settings live in bmCache, written by the picker in ui.ts.
 *
 * Every patch is its own boolean key. The first version stored a CSV string
 * and compared the parsed entries with `includes` — but bmCache hands back a
 * java.lang.String, and a Rhino-wrapped Java string is never === a JS one, so
 * the filter matched nothing and the run died with "no patches enabled"
 * before taking a step. Anything read as a string here is coerced with
 * String() at the boundary for that reason.
 */

import { APPLE, type FruitSpecies, fruitByName } from './fruit.js';
import { PATCHES, type TreePatch } from './patches.js';
import type { Species } from './policy.js';
import { treeByName, type TreeSpecies, WILLOW } from './trees.js';

const PREFIX = 'ocPoc.';

export const KEY = {
	configured: PREFIX + 'configured',
	tree: PREFIX + 'tree',
	fruit: PREFIX + 'fruit',
	protectTrees: PREFIX + 'protect',
	protectFruit: PREFIX + 'protectFruit',
	useBank: PREFIX + 'useBank',
	runeReserve: PREFIX + 'runeReserve',
	travelLimit: PREFIX + 'travelLimit',
	stopWhenDone: PREFIX + 'stopWhenDone',
	patch: (key: string): string => PREFIX + 'patch.' + key,
};

export interface PocConfig {
	readonly patches: readonly TreePatch[];
	readonly tree: TreeSpecies;
	readonly fruitTree: FruitSpecies;
	readonly protectTrees: boolean;
	readonly protectFruit: boolean;
	/** Off means "the bag is already right"; no bank trip is attempted. */
	readonly useBank: boolean;
	readonly runeReserve: number;
	/** Ticks before a single patch approach is abandoned (1500t ~ 15 min). */
	readonly travelLimit: number;
	readonly stopWhenDone: boolean;
}

export const readConfig = (): PocConfig => {
	const patches = PATCHES.filter((patch) => bot.bmCache.getBoolean(KEY.patch(patch.key), false));
	const tree = treeByName(String(bot.bmCache.getString(KEY.tree, WILLOW.label))) ?? WILLOW;
	const fruitTree = fruitByName(String(bot.bmCache.getString(KEY.fruit, APPLE.label))) ?? APPLE;
	const travelLimit = bot.bmCache.getInt(KEY.travelLimit, 1500);
	const runeReserve = bot.bmCache.getInt(KEY.runeReserve, 0);

	return {
		patches,
		tree,
		fruitTree,
		protectTrees: bot.bmCache.getBoolean(KEY.protectTrees, false),
		protectFruit: bot.bmCache.getBoolean(KEY.protectFruit, false),
		useBank: bot.bmCache.getBoolean(KEY.useBank, false),
		runeReserve: runeReserve > 0 ? runeReserve : 0,
		travelLimit: travelLimit > 0 ? travelLimit : 1500,
		stopWhenDone: bot.bmCache.getBoolean(KEY.stopWhenDone, true),
	};
};

export const speciesFor = (config: PocConfig, patch: TreePatch): Species =>
	patch.fruit ? config.fruitTree : config.tree;

export const protectFor = (config: PocConfig, patch: TreePatch): boolean =>
	patch.fruit ? config.protectFruit : config.protectTrees;
