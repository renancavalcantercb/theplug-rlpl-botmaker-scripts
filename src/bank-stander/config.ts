import { HERBS } from './herblore.js';
import { FLETCHING } from './fletching.js';
import { CRAFTING } from './crafting.js';
import { SEEDLINGS } from './farming.js';

export type SkillType = 'Herblore' | 'Crafting' | 'Fletching' | 'Farming';
export type PlayStyle = 'normal' | 'lazy';

export const SKILL_ORDER: readonly SkillType[] = [
	'Herblore',
	'Crafting',
	'Fletching',
	'Farming',
];

export interface Selection {
	clean: boolean;
	unfinished: boolean;
	potion: string;
}

export interface Settings {
	skill?: SkillType;
	skills?: SkillType[];
	fletching?: string[];
	crafting?: string[];
	farming?: string[];
	progressive: boolean;
	chemistry: boolean;
	targetLevel: number; // 0 means no target; reaching 99 alone does not stop production.
	herbs: Record<string, Selection>;
	// Human timing. Left undefined (as in the offline checks) = no added delays.
	playStyle?: PlayStyle; // 'normal' = snappy (1-3s), 'lazy' = relaxed/AFK (up to ~10s)
	randomAfk?: boolean; // Short random AFKs while a batch is being made
}

const CACHE_PREFIX = 'bankStander.';
const HERB_PREFIX = 'bankStander.herblore.';
const FLETCH_PREFIX = 'bankStander.fletching.';
const CRAFT_PREFIX = 'bankStander.crafting.';
const FARM_PREFIX = 'bankStander.farming.';

export const defaultSettings: Settings = {
	skill: 'Herblore',
	skills: ['Herblore', 'Crafting', 'Fletching'],
	fletching: [],
	crafting: [],
	farming: [],
	progressive: true,
	chemistry: false,
	targetLevel: 0,
	herbs: {},
	playStyle: 'normal',
	randomAfk: true,
};

export const loadSettings = (): Settings => {
	const configured =
		bot.bmCache.getBoolean(HERB_PREFIX + 'configured', false) ||
		bot.bmCache.getBoolean(CACHE_PREFIX + 'configured', false);

	if (!configured) {
		return {
			...defaultSettings,
			herbs: {},
			fletching: [],
			crafting: [],
			farming: [],
		};
	}

	const playStyle: PlayStyle =
		bot.bmCache.getString(CACHE_PREFIX + 'playStyle', 'normal') === 'lazy'
			? 'lazy'
			: 'normal';
	const randomAfk = bot.bmCache.getBoolean(CACHE_PREFIX + 'randomAfk', true);

	const skillStr = bot.bmCache.getString(CACHE_PREFIX + 'skill', 'Herblore');
	const skill: SkillType =
		skillStr === 'Farming'
			? 'Farming'
			: skillStr === 'Fletching'
				? 'Fletching'
				: skillStr === 'Crafting'
					? 'Crafting'
					: 'Herblore';

	const hasMultiSkillCache = bot.bmCache.getBoolean(
		CACHE_PREFIX + 'skills.configured',
		false,
	);
	const skills: SkillType[] = [];
	if (hasMultiSkillCache) {
		for (const s of SKILL_ORDER) {
			if (bot.bmCache.getBoolean(CACHE_PREFIX + 'skill.' + s, false)) {
				skills.push(s);
			}
		}
	}
	if (skills.length === 0) {
		skills.push(skill);
	}

	const progressive = bot.bmCache.getBoolean(
		HERB_PREFIX + 'progressive',
		true,
	);
	const chemistry = bot.bmCache.getBoolean(HERB_PREFIX + 'chemistry', false);
	const targetLevel = bot.bmCache.getInt(HERB_PREFIX + 'target', 0);

	const herbs: Record<string, Selection> = {};
	for (const herb of HERBS) {
		const clean = bot.bmCache.getBoolean(
			HERB_PREFIX + herb.key + '.clean',
			false,
		);
		const unfinished = bot.bmCache.getBoolean(
			HERB_PREFIX + herb.key + '.unfinished',
			false,
		);
		const potion = String(
			bot.bmCache.getString(HERB_PREFIX + herb.key + '.potion', ''),
		);
		herbs[herb.key] = { clean, unfinished, potion };
	}

	const fletching: string[] = [];
	for (const job of FLETCHING) {
		if (bot.bmCache.getBoolean(FLETCH_PREFIX + job.key, false)) {
			fletching.push(job.key);
		}
	}

	const crafting: string[] = [];
	for (const job of CRAFTING) {
		if (bot.bmCache.getBoolean(CRAFT_PREFIX + job.key, false)) {
			crafting.push(job.key);
		}
	}

	const farming: string[] = [];
	for (const recipe of SEEDLINGS) {
		if (bot.bmCache.getBoolean(FARM_PREFIX + recipe.key, false)) {
			farming.push(recipe.key);
		}
	}

	return {
		skill,
		skills,
		fletching,
		crafting,
		farming,
		progressive,
		chemistry,
		targetLevel,
		herbs,
		playStyle,
		randomAfk,
	};
};

export const saveSettings = (settings: Settings): void => {
	bot.bmCache.saveBoolean(CACHE_PREFIX + 'configured', true);
	bot.bmCache.saveBoolean(HERB_PREFIX + 'configured', true);
	bot.bmCache.saveBoolean(CACHE_PREFIX + 'skills.configured', true);
	bot.bmCache.saveString(
		CACHE_PREFIX + 'skill',
		settings.skill ?? 'Herblore',
	);

	const enabledSet = new Set(
		settings.skills ?? [settings.skill ?? 'Herblore'],
	);
	for (const s of SKILL_ORDER) {
		bot.bmCache.saveBoolean(CACHE_PREFIX + 'skill.' + s, enabledSet.has(s));
	}

	bot.bmCache.saveBoolean(HERB_PREFIX + 'progressive', settings.progressive);
	bot.bmCache.saveBoolean(HERB_PREFIX + 'chemistry', settings.chemistry);
	bot.bmCache.saveInt(HERB_PREFIX + 'target', settings.targetLevel);
	bot.bmCache.saveString(
		CACHE_PREFIX + 'playStyle',
		settings.playStyle ?? 'normal',
	);
	bot.bmCache.saveBoolean(
		CACHE_PREFIX + 'randomAfk',
		settings.randomAfk ?? true,
	);

	for (const herb of HERBS) {
		const sel = settings.herbs[herb.key] ?? {
			clean: false,
			unfinished: false,
			potion: '',
		};
		bot.bmCache.saveBoolean(HERB_PREFIX + herb.key + '.clean', sel.clean);
		bot.bmCache.saveBoolean(
			HERB_PREFIX + herb.key + '.unfinished',
			sel.unfinished,
		);
		bot.bmCache.saveString(HERB_PREFIX + herb.key + '.potion', sel.potion);
	}

	const selectedFletch = new Set(settings.fletching ?? []);
	for (const job of FLETCHING) {
		bot.bmCache.saveBoolean(
			FLETCH_PREFIX + job.key,
			selectedFletch.has(job.key),
		);
	}

	const selectedCraft = new Set(settings.crafting ?? []);
	for (const job of CRAFTING) {
		bot.bmCache.saveBoolean(
			CRAFT_PREFIX + job.key,
			selectedCraft.has(job.key),
		);
	}

	const selectedFarm = new Set(settings.farming ?? []);
	for (const recipe of SEEDLINGS) {
		bot.bmCache.saveBoolean(
			FARM_PREFIX + recipe.key,
			selectedFarm.has(recipe.key),
		);
	}
};
