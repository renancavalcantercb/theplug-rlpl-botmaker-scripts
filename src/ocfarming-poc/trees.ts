/**
 * Port of FarmingTree.java — regular tree patches only.
 *
 * Pure data + decoding. No client access, so it stays unit-testable outside
 * the game, which is the half of the plugin that survives the platform move.
 */

export interface TreeSpecies {
	readonly name: string;
	readonly label: string;
	readonly sapling: number;
	readonly saplingNote: number;
	readonly level: number;
	readonly payment: number;
	readonly paymentNote: number;
	readonly paymentAmount: number;
	readonly paymentLabel: string;
	/** First raw varbit value of the growing range. */
	readonly start: number;
	/** Raw value where the tree wants Check-health. */
	readonly check: number;
	readonly diseased: number;
	readonly dead: number;
	readonly cycles: number;
	/** Regular trees grow on 40-minute cycles; fruit trees on 160. */
	readonly cycleSeconds: number;
}

const define = (
	name: string,
	label: string,
	ordinal: number,
	sapling: number,
	level: number,
	payment: number,
	paymentAmount: number,
	paymentLabel: string,
	start: number,
	check: number,
	diseased: number,
	dead: number,
): TreeSpecies => ({
	name,
	label,
	sapling,
	saplingNote: 12941 + ordinal,
	level,
	payment,
	paymentNote: payment + 1,
	paymentAmount,
	paymentLabel,
	start,
	check,
	diseased,
	dead,
	cycles: check - start,
	cycleSeconds: 2400,
});

export const OAK = define('OAK', 'Oak', 0, 5370, 15, 5968, 1, 'Tomatoes(5)', 8, 12, 73, 137);
export const WILLOW = define('WILLOW', 'Willow', 1, 5371, 30, 5386, 1, 'Apples(5)', 15, 21, 80, 144);
export const MAPLE = define('MAPLE', 'Maple', 2, 5372, 45, 5396, 1, 'Oranges(5)', 24, 32, 89, 153);
export const YEW = define('YEW', 'Yew', 3, 5373, 60, 6016, 10, 'cactus spines', 35, 45, 100, 164);
export const MAGIC = define('MAGIC', 'Magic', 4, 5374, 75, 5974, 25, 'coconuts', 48, 60, 113, 177);

export const TREES: readonly TreeSpecies[] = [OAK, WILLOW, MAPLE, YEW, MAGIC];

/** The stage immediately before the final diseased/dead value is unused. */
export const sick = (tree: TreeSpecies, raw: number, base: number): boolean =>
	(raw >= base && raw < base + tree.cycles - 1) || raw === base + tree.cycles;

export const treeFromRaw = (raw: number): TreeSpecies | null => {
	for (const tree of TREES) {
		if (
			(raw >= tree.start && raw <= tree.check + 2) ||
			sick(tree, raw, tree.diseased) ||
			sick(tree, raw, tree.dead) ||
			(tree === WILLOW && raw >= 192 && raw <= 197)
		) {
			return tree;
		}
	}
	return null;
};

export const treeByName = (name: string): TreeSpecies | null =>
	TREES.find((tree) => tree.name === name.toUpperCase()) ?? null;
