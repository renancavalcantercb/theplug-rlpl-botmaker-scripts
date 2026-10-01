/**
 * Port of FarmingFruitTree.java.
 *
 * Fruit trees decode differently from regular trees: Time Tracking's
 * FRUIT_TREE decoder reads them as 27-value blocks per species, where the
 * offset inside the block is the state rather than a separate range per
 * condition. Hence one `start` per species and stage arithmetic below.
 */

export interface FruitSpecies {
	readonly name: string;
	readonly label: string;
	readonly sapling: number;
	readonly saplingNote: number;
	readonly level: number;
	readonly payment: number;
	readonly paymentNote: number;
	readonly paymentAmount: number;
	readonly paymentLabel: string;
	readonly produce: number;
	readonly pickAction: string;
	readonly start: number;
	readonly cycles: number;
	readonly cycleSeconds: number;
}

const define = (
	name: string,
	label: string,
	sapling: number,
	saplingNote: number,
	level: number,
	payment: number,
	paymentAmount: number,
	paymentLabel: string,
	produce: number,
	pickAction: string,
	start: number,
): FruitSpecies => ({
	name,
	label,
	sapling,
	saplingNote,
	level,
	payment,
	paymentNote: payment + 1,
	paymentAmount,
	paymentLabel,
	produce,
	pickAction,
	start,
	cycles: 6,
	// Fruit trees grow on 160-minute cycles, not the 40-minute tree cycle.
	cycleSeconds: 9600,
});

export const APPLE = define('APPLE', 'Apple', 5496, 12946, 27, 5986, 9, 'Sweetcorn', 1955, 'Pick-apple', 8);
export const BANANA = define('BANANA', 'Banana', 5497, 12947, 33, 5386, 4, 'Apples(5)', 1963, 'Pick-banana', 35);
export const ORANGE = define('ORANGE', 'Orange', 5498, 12948, 39, 5406, 3, 'Strawberries(5)', 2108, 'Pick-orange', 72);
export const CURRY = define('CURRY', 'Curry', 5499, 12949, 42, 5416, 5, 'Bananas(5)', 5970, 'Pick-leaf', 99);
export const PINEAPPLE = define('PINEAPPLE', 'Pineapple', 5500, 12950, 51, 5982, 10, 'Watermelon', 2114, 'Pick-pineapple', 136);
export const PAPAYA = define('PAPAYA', 'Papaya', 5501, 12951, 57, 2114, 10, 'Pineapple', 5972, 'Pick-fruit', 163);
export const PALM = define('PALM', 'Palm', 5502, 12952, 68, 5972, 15, 'Papaya fruit', 5974, 'Pick-coconut', 200);
export const DRAGONFRUIT = define('DRAGONFRUIT', 'Dragonfruit', 22866, 22867, 81, 5974, 15, 'Coconut', 22929, 'Pick-dragonfruit', 227);

export const FRUITS: readonly FruitSpecies[] = [
	APPLE,
	BANANA,
	ORANGE,
	CURRY,
	PINEAPPLE,
	PAPAYA,
	PALM,
	DRAGONFRUIT,
];

export const fruitFromRaw = (raw: number): FruitSpecies | null => {
	for (const fruit of FRUITS) {
		if (raw >= fruit.start && raw <= fruit.start + 26) return fruit;
	}
	return null;
};

export const fruitByName = (name: string): FruitSpecies | null =>
	FRUITS.find((fruit) => fruit.name === String(name).toUpperCase()) ?? null;

export const fruitByProduce = (produce: number): FruitSpecies | null =>
	FRUITS.find((fruit) => fruit.produce === produce) ?? null;
