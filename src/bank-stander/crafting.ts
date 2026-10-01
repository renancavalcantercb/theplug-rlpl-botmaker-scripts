import { type Job, type Settings } from './herblore.js';

export const CRAFTING: Job[] = [];

export const CHISEL = 1755;
export const CRUSHED_GEM = 1633;

const addGem = (
	label: string,
	level: number,
	uncutId: number,
	cutId: number,
	canCrush = false,
): void => {
	CRAFTING.push({
		key: label,
		label,
		level,
		kind: 'gems',
		inputs: [uncutId],
		outputs: canCrush ? [cutId, CRUSHED_GEM] : [cutId],
		chemistry: false,
		tool: CHISEL,
		limit: 27,
	});
};

addGem('Cut Opal', 1, 1625, 1609, true);
addGem('Cut Jade', 13, 1627, 1611, true);
addGem('Cut Red topaz', 16, 1629, 1613, true);
addGem('Cut Sapphire', 20, 1623, 1607);
addGem('Cut Emerald', 27, 1621, 1605);
addGem('Cut Ruby', 34, 1619, 1603);
addGem('Cut Diamond', 43, 1617, 1601);
addGem('Cut Dragonstone', 55, 1631, 1615);

export const craftingJobs = (settings: Settings): Job[] =>
	CRAFTING.filter((job) => (settings.crafting ?? []).includes(job.key));
