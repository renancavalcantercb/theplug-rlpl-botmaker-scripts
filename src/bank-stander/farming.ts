import { type Batch, type Count, type Job, type Settings } from './herblore.js';

export const GARDENING_TROWEL = 5325;
export const FILLED_PLANT_POT = 5354;
export const WATERING_CANS: readonly number[] = [
	5340, // Watering can(8)
	5339,
	5338,
	5337,
	5336,
	5335,
	5334,
	5333, // Watering can(1)
];

interface SeedlingRecipe {
	key: string;
	label: string;
	level: number;
	seed: number;
	seedling: number;
	watered: number;
	sapling: number;
}

export const SEEDLINGS: readonly SeedlingRecipe[] = [
	{
		key: 'oak',
		label: 'Oak',
		level: 15,
		seed: 5312,
		seedling: 5358,
		watered: 5364,
		sapling: 5370,
	},
	{
		key: 'white-tree',
		label: 'White tree shoot',
		level: 25,
		seed: 6461,
		seedling: 6462,
		watered: 6463,
		sapling: 6464,
	},
	{
		key: 'apple',
		label: 'Apple',
		level: 27,
		seed: 5283,
		seedling: 5480,
		watered: 5488,
		sapling: 5496,
	},
	{
		key: 'willow',
		label: 'Willow',
		level: 30,
		seed: 5313,
		seedling: 5359,
		watered: 5365,
		sapling: 5371,
	},
	{
		key: 'banana',
		label: 'Banana',
		level: 33,
		seed: 5284,
		seedling: 5481,
		watered: 5489,
		sapling: 5497,
	},
	{
		key: 'teak',
		label: 'Teak',
		level: 35,
		seed: 21486,
		seedling: 21469,
		watered: 21473,
		sapling: 21477,
	},
	{
		key: 'orange',
		label: 'Orange',
		level: 39,
		seed: 5285,
		seedling: 5482,
		watered: 5490,
		sapling: 5498,
	},
	{
		key: 'curry',
		label: 'Curry',
		level: 42,
		seed: 5286,
		seedling: 5483,
		watered: 5491,
		sapling: 5499,
	},
	{
		key: 'maple',
		label: 'Maple',
		level: 45,
		seed: 5314,
		seedling: 5360,
		watered: 5366,
		sapling: 5372,
	},
	{
		key: 'pineapple',
		label: 'Pineapple',
		level: 51,
		seed: 5287,
		seedling: 5484,
		watered: 5492,
		sapling: 5500,
	},
	{
		key: 'mahogany',
		label: 'Mahogany',
		level: 55,
		seed: 21488,
		seedling: 21471,
		watered: 21475,
		sapling: 21480,
	},
	{
		key: 'papaya',
		label: 'Papaya',
		level: 57,
		seed: 5288,
		seedling: 5485,
		watered: 5493,
		sapling: 5501,
	},
	{
		key: 'yew',
		label: 'Yew',
		level: 60,
		seed: 5315,
		seedling: 5361,
		watered: 5367,
		sapling: 5373,
	},
	{
		key: 'camphor',
		label: 'Camphor',
		level: 66,
		seed: 31547,
		seedling: 31490,
		watered: 31496,
		sapling: 31502,
	},
	{
		key: 'palm',
		label: 'Palm',
		level: 68,
		seed: 5289,
		seedling: 5486,
		watered: 5494,
		sapling: 5502,
	},
	{
		key: 'calquat',
		label: 'Calquat',
		level: 72,
		seed: 5290,
		seedling: 5487,
		watered: 5495,
		sapling: 5503,
	},
	{
		key: 'crystal',
		label: 'Crystal',
		level: 74,
		seed: 23661,
		seedling: 23655,
		watered: 23657,
		sapling: 23659,
	},
	{
		key: 'magic',
		label: 'Magic',
		level: 75,
		seed: 5316,
		seedling: 5362,
		watered: 5368,
		sapling: 5374,
	},
	{
		key: 'ironwood',
		label: 'Ironwood',
		level: 80,
		seed: 31549,
		seedling: 31492,
		watered: 31498,
		sapling: 31505,
	},
	{
		key: 'dragonfruit',
		label: 'Dragonfruit',
		level: 81,
		seed: 22877,
		seedling: 22862,
		watered: 22864,
		sapling: 22866,
	},
	{
		key: 'spirit',
		label: 'Spirit',
		level: 83,
		seed: 5317,
		seedling: 5363,
		watered: 5369,
		sapling: 5375,
	},
	{
		key: 'celastrus',
		label: 'Celastrus',
		level: 85,
		seed: 22869,
		seedling: 22848,
		watered: 22852,
		sapling: 22856,
	},
	{
		key: 'redwood',
		label: 'Redwood',
		level: 90,
		seed: 22871,
		seedling: 22850,
		watered: 22854,
		sapling: 22859,
	},
	{
		key: 'rosewood',
		label: 'Rosewood',
		level: 92,
		seed: 31551,
		seedling: 31494,
		watered: 31500,
		sapling: 31508,
	},
];

export const FARMING: readonly Job[] = [
	...SEEDLINGS.map(
		(recipe): Job => ({
			key: recipe.key,
			label: recipe.label + ' seedling',
			level: recipe.level,
			kind: 'plant',
			inputs: [FILLED_PLANT_POT, recipe.seed],
			outputs: [recipe.seedling],
			chemistry: false,
			tool: GARDENING_TROWEL,
			passiveTool: true,
			limit: 13,
			direct: true,
			stage: 0,
		}),
	),
	...SEEDLINGS.map(
		(recipe): Job => ({
			key: recipe.key + '.water',
			label: 'Water ' + recipe.label + ' seedling',
			level: recipe.level,
			kind: 'water',
			inputs: [recipe.seedling],
			outputs: [recipe.watered, recipe.sapling],
			chemistry: false,
			tools: WATERING_CANS,
			// A standard can changes item ID after every use. One seedling per bank
			// cycle lets the runner resolve the new charged-can ID safely.
			limit: 1,
			direct: true,
			stage: 1,
		}),
	),
];

export const farmingJobs = (settings: Settings): Job[] => {
	const selected = new Set(settings.farming ?? []);
	return FARMING.filter((job) =>
		selected.has(job.key.replace(/\.water$/, '')),
	);
};

/** Fill all 28 slots with one trowel, stacked seed types, and plant pots. */
export const selectFarmingPlantBatch = (
	jobs: readonly Job[],
	level: number,
	count: Count,
	progressive: boolean,
): Batch | null => {
	if (count(GARDENING_TROWEL) < 1 || count(FILLED_PLANT_POT) < 1) return null;

	const available = jobs.filter(
		(job) =>
			job.kind === 'plant' &&
			job.level <= level &&
			count(job.inputs[1]) > 0,
	);
	if (progressive) available.sort((a, b) => b.level - a.level);

	const steps: Array<{ job: Job; quantity: number }> = [];
	let total = 0;
	for (const job of available) {
		// Seeds stack, but each selected type occupies one inventory slot.
		const capacityWithType = 27 - (steps.length + 1);
		if (total >= capacityWithType) break;
		const quantity = Math.min(
			count(job.inputs[1]),
			count(FILLED_PLANT_POT) - total,
			capacityWithType - total,
		);
		if (quantity > 0) {
			steps.push({ job, quantity });
			total += quantity;
		}
	}
	if (steps.length === 0 || total < 1) return null;

	return {
		job: steps[0].job,
		quantity: total,
		tool: GARDENING_TROWEL,
		label:
			'Mixed seedlings: ' +
			steps
				.map((step) => step.job.label + ' x' + step.quantity)
				.join(', '),
		steps,
		withdrawals: [
			{ id: GARDENING_TROWEL, quantity: 1 },
			{ id: FILLED_PLANT_POT, quantity: total },
			...steps.map((step) => ({
				id: step.job.inputs[1],
				quantity: step.quantity,
			})),
		],
	};
};

/** Fill an inventory with as many seedlings as the available can charges allow. */
export const selectFarmingWaterBatch = (
	jobs: readonly Job[],
	level: number,
	count: Count,
	progressive: boolean,
): Batch | null => {
	const available = jobs.filter(
		(job) =>
			job.kind === 'water' &&
			job.level <= level &&
			count(job.inputs[0]) > 0,
	);
	if (progressive) available.sort((a, b) => b.level - a.level);
	const totalSeedlings = available.reduce(
		(total, job) => total + count(job.inputs[0]),
		0,
	);
	if (totalSeedlings < 1) return null;

	const cans: Array<{ id: number; quantity: number }> = [];
	let canSlots = 0;
	let charges = 0;
	let capacity = 0;
	for (const id of WATERING_CANS) {
		const availableCans = count(id);
		const chargesPerCan = id - 5332;
		for (let index = 0; index < availableCans; index++) {
			const nextSlots = canSlots + 1;
			const nextCharges = charges + chargesPerCan;
			const nextCapacity = Math.min(
				totalSeedlings,
				nextCharges,
				28 - nextSlots,
			);
			if (nextCapacity <= capacity) break;
			const existing = cans.find((can) => can.id === id);
			if (existing) existing.quantity++;
			else cans.push({ id, quantity: 1 });
			canSlots = nextSlots;
			charges = nextCharges;
			capacity = nextCapacity;
		}
		if (capacity >= totalSeedlings || capacity >= 28 - canSlots) break;
	}
	if (capacity < 1 || cans.length === 0) return null;

	const steps: Array<{ job: Job; quantity: number }> = [];
	let total = 0;
	for (const job of available) {
		const quantity = Math.min(count(job.inputs[0]), capacity - total);
		if (quantity > 0) {
			steps.push({ job, quantity });
			total += quantity;
		}
		if (total >= capacity) break;
	}

	return {
		job: steps[0].job,
		quantity: total,
		tool: cans[0].id,
		dynamicTools: WATERING_CANS,
		label:
			'Water mixed seedlings: ' +
			steps
				.map((step) => step.job.label + ' x' + step.quantity)
				.join(', '),
		steps,
		withdrawals: [
			...cans,
			...steps.map((step) => ({
				id: step.job.inputs[0],
				quantity: step.quantity,
			})),
		],
	};
};
