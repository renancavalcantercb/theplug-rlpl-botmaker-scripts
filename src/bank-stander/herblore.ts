/** Item IDs checked against the installed RuneLite ItemID table. */
export interface Herb {
	key: string;
	name: string;
	grimy: number;
	clean: number;
	unf: number;
	cleanLevel: number;
	unfLevel: number;
}

export const HERBS: readonly Herb[] = [
	{
		key: 'guam',
		name: 'Guam leaf',
		grimy: 199,
		clean: 249,
		unf: 91,
		cleanLevel: 3,
		unfLevel: 3,
	},
	{
		key: 'marrentill',
		name: 'Marrentill',
		grimy: 201,
		clean: 251,
		unf: 93,
		cleanLevel: 5,
		unfLevel: 5,
	},
	{
		key: 'tarromin',
		name: 'Tarromin',
		grimy: 203,
		clean: 253,
		unf: 95,
		cleanLevel: 11,
		unfLevel: 12,
	},
	{
		key: 'harralander',
		name: 'Harralander',
		grimy: 205,
		clean: 255,
		unf: 97,
		cleanLevel: 20,
		unfLevel: 22,
	},
	{
		key: 'ranarr',
		name: 'Ranarr weed',
		grimy: 207,
		clean: 257,
		unf: 99,
		cleanLevel: 25,
		unfLevel: 30,
	},
	{
		key: 'toadflax',
		name: 'Toadflax',
		grimy: 3049,
		clean: 2998,
		unf: 3002,
		cleanLevel: 30,
		unfLevel: 30,
	},
	{
		key: 'irit',
		name: 'Irit leaf',
		grimy: 209,
		clean: 259,
		unf: 101,
		cleanLevel: 40,
		unfLevel: 45,
	},
	{
		key: 'avantoe',
		name: 'Avantoe',
		grimy: 211,
		clean: 261,
		unf: 103,
		cleanLevel: 48,
		unfLevel: 50,
	},
	{
		key: 'kwuarm',
		name: 'Kwuarm',
		grimy: 213,
		clean: 263,
		unf: 105,
		cleanLevel: 54,
		unfLevel: 55,
	},
	{
		key: 'huasca',
		name: 'Huasca',
		grimy: 30094,
		clean: 30097,
		unf: 30100,
		cleanLevel: 58,
		unfLevel: 58,
	},
	{
		key: 'snapdragon',
		name: 'Snapdragon',
		grimy: 3051,
		clean: 3000,
		unf: 3004,
		cleanLevel: 59,
		unfLevel: 63,
	},
	{
		key: 'cadantine',
		name: 'Cadantine',
		grimy: 215,
		clean: 265,
		unf: 107,
		cleanLevel: 65,
		unfLevel: 66,
	},
	{
		key: 'lantadyme',
		name: 'Lantadyme',
		grimy: 2485,
		clean: 2481,
		unf: 2483,
		cleanLevel: 67,
		unfLevel: 69,
	},
	{
		key: 'dwarf',
		name: 'Dwarf weed',
		grimy: 217,
		clean: 267,
		unf: 109,
		cleanLevel: 70,
		unfLevel: 72,
	},
	{
		key: 'torstol',
		name: 'Torstol',
		grimy: 219,
		clean: 269,
		unf: 111,
		cleanLevel: 75,
		unfLevel: 78,
	},
];

export interface Potion {
	herb: string;
	name: string;
	level: number;
	secondary: number;
	outputs: number[];
	chemistry: boolean;
}

export const POTIONS: readonly Potion[] = [
	{
		herb: 'guam',
		name: 'Attack potion',
		level: 3,
		secondary: 221,
		outputs: [121, 2428],
		chemistry: true,
	},
	{
		herb: 'marrentill',
		name: 'Antipoison',
		level: 5,
		secondary: 235,
		outputs: [175, 2446],
		chemistry: true,
	},
	{
		herb: 'tarromin',
		name: 'Strength potion',
		level: 12,
		secondary: 225,
		outputs: [115, 113],
		chemistry: true,
	},
	{
		herb: 'tarromin',
		name: 'Serum 207',
		level: 15,
		secondary: 592,
		outputs: [3410, 3408],
		chemistry: true,
	},
	{
		herb: 'harralander',
		name: 'Compost potion',
		level: 22,
		secondary: 21622,
		outputs: [6472, 6470],
		chemistry: true,
	},
	{
		herb: 'harralander',
		name: 'Restore potion',
		level: 22,
		secondary: 223,
		outputs: [127, 2430],
		chemistry: true,
	},
	{
		herb: 'harralander',
		name: 'Energy potion',
		level: 26,
		secondary: 1975,
		outputs: [3010, 3008],
		chemistry: true,
	},
	{
		herb: 'harralander',
		name: 'Combat potion',
		level: 36,
		secondary: 9736,
		outputs: [9741, 9739],
		chemistry: true,
	},
	{
		herb: 'harralander',
		name: 'Goading potion',
		level: 54,
		secondary: 29993,
		outputs: [30140, 30137],
		chemistry: true,
	},
	{
		herb: 'ranarr',
		name: 'Defence potion',
		level: 30,
		secondary: 239,
		outputs: [133, 2432],
		chemistry: true,
	},
	{
		herb: 'ranarr',
		name: 'Prayer potion',
		level: 38,
		secondary: 231,
		outputs: [139, 2434],
		chemistry: true,
	},
	{
		herb: 'toadflax',
		name: 'Agility potion',
		level: 34,
		secondary: 2152,
		outputs: [3034, 3032],
		chemistry: true,
	},
	{
		herb: 'toadflax',
		name: 'Saradomin brew',
		level: 81,
		secondary: 6693,
		outputs: [6687, 6685],
		chemistry: true,
	},
	{
		herb: 'irit',
		name: 'Super attack',
		level: 45,
		secondary: 221,
		outputs: [145, 2436],
		chemistry: true,
	},
	{
		herb: 'irit',
		name: 'Superantipoison',
		level: 48,
		secondary: 235,
		outputs: [181, 2448],
		chemistry: true,
	},
	{
		herb: 'avantoe',
		name: 'Fishing potion',
		level: 50,
		secondary: 231,
		outputs: [151, 2438],
		chemistry: true,
	},
	{
		herb: 'avantoe',
		name: 'Super energy',
		level: 52,
		secondary: 2970,
		outputs: [3018, 3016],
		chemistry: true,
	},
	{
		herb: 'avantoe',
		name: 'Hunter potion',
		level: 53,
		secondary: 10111,
		outputs: [10000, 9998],
		chemistry: true,
	},
	{
		herb: 'kwuarm',
		name: 'Super strength',
		level: 55,
		secondary: 225,
		outputs: [157, 2440],
		chemistry: true,
	},
	{
		herb: 'kwuarm',
		name: 'Weapon poison',
		level: 60,
		secondary: 241,
		outputs: [187],
		chemistry: false,
	},
	{
		herb: 'huasca',
		name: 'Prayer regeneration potion',
		level: 58,
		secondary: 29993,
		outputs: [30128, 30125],
		chemistry: true,
	},
	{
		herb: 'snapdragon',
		name: 'Super restore',
		level: 63,
		secondary: 223,
		outputs: [3026, 3024],
		chemistry: true,
	},
	{
		herb: 'cadantine',
		name: 'Super defence',
		level: 66,
		secondary: 239,
		outputs: [163, 2442],
		chemistry: true,
	},
	{
		herb: 'lantadyme',
		name: 'Antifire potion',
		level: 69,
		secondary: 241,
		outputs: [2454, 2452],
		chemistry: true,
	},
	{
		herb: 'lantadyme',
		name: 'Magic potion',
		level: 76,
		secondary: 3138,
		outputs: [3042, 3040],
		chemistry: true,
	},
	{
		herb: 'dwarf',
		name: 'Ranging potion',
		level: 72,
		secondary: 245,
		outputs: [169, 2444],
		chemistry: true,
	},
	{
		herb: 'dwarf',
		name: 'Menaphite remedy',
		level: 88,
		secondary: 27272,
		outputs: [27205, 27202],
		chemistry: true,
	},
	{
		herb: 'torstol',
		name: 'Zamorak brew',
		level: 78,
		secondary: 247,
		outputs: [189, 2450],
		chemistry: true,
	},
];

export type { Selection, Settings, SkillType } from './config.js';
import type { Settings } from './config.js';
export type Kind =
	| 'clean'
	| 'unfinished'
	| 'finished'
	| 'cut'
	| 'string'
	| 'darts'
	| 'bolts'
	| 'arrows'
	| 'gems';
export interface Job {
	tool?: number;
	limit?: number;
	direct?: boolean;
	key: string;
	label: string;
	kind: Kind;
	level: number;
	inputs: number[];
	outputs: number[];
	chemistry: boolean;
}
export interface Batch {
	job: Job;
	quantity: number;
}
export type Count = (id: number) => number;

/** Potion selection meaning "highest recipe of this herb you can make with what is in the bank". */
export const BEST_POTION = 'best';

export const jobsFor = (settings: Settings): Job[] => {
	const jobs: Job[] = [];
	for (const herb of HERBS) {
		const selection = settings.herbs[herb.key];
		if (!selection) continue;
		// Finish existing intermediates first, then prepare another batch.
		if (selection.potion === BEST_POTION) {
			// Highest level first: selectBatch skips recipes above the level or without secondaries,
			// so the first doable one is the best (and progressive mode also prefers higher levels).
			const recipes = POTIONS.filter((entry) => entry.herb === herb.key)
				.slice()
				.sort((a, b) => b.level - a.level);
			for (const potion of recipes)
				jobs.push({
					key: herb.key + '.finished.' + potion.name,
					label: potion.name + ' (best available)',
					kind: 'finished',
					level: potion.level,
					inputs: [herb.unf, potion.secondary],
					outputs: potion.outputs,
					chemistry: potion.chemistry,
				});
		} else {
			const potion = POTIONS.find(
				(entry) =>
					entry.herb === herb.key && entry.name === selection.potion,
			);
			if (potion)
				jobs.push({
					key: herb.key + '.finished',
					label: potion.name,
					kind: 'finished',
					level: potion.level,
					inputs: [herb.unf, potion.secondary],
					outputs: potion.outputs,
					chemistry: potion.chemistry,
				});
		}
		if (selection.unfinished)
			jobs.push({
				key: herb.key + '.unfinished',
				label: herb.name + ' (unf)',
				kind: 'unfinished',
				level: herb.unfLevel,
				inputs: [herb.clean, 227],
				outputs: [herb.unf],
				chemistry: false,
			});
		if (selection.clean)
			jobs.push({
				key: herb.key + '.clean',
				label: 'Clean ' + herb.name,
				kind: 'clean',
				level: herb.cleanLevel,
				inputs: [herb.grimy],
				outputs: [herb.clean],
				chemistry: false,
			});
	}
	return jobs;
};

export const selectBatch = (
	jobs: readonly Job[],
	level: number,
	count: Count,
	progressive: boolean,
): Batch | null => {
	let chosen: Batch | null = null;
	for (const job of jobs) {
		if (job.level > level) continue;
		if (job.tool && count(job.tool) < 1) continue;
		let quantity = job.limit ?? (job.kind === 'clean' ? 28 : 14);
		for (const id of job.inputs) quantity = Math.min(quantity, count(id));
		if (quantity < 1) continue;
		if (!chosen || (progressive && job.level > chosen.job.level))
			chosen = { job, quantity };
		if (!progressive && chosen) break;
	}
	return chosen;
};
