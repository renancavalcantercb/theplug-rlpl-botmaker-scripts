import { Phase, PHASES } from './constants.js';

export type RunMode = 'progressive' | 'single';
export type PlayStyle = 'normal' | 'lazy';

export interface BrutalSettings {
	mode: RunMode;
	arrowTarget: number; // Progressive: brutal arrows to make
	singlePhase: Phase; // Single phase: phase to run until out of materials
	minFreeSlots: number; // Arrows: fletch when free slots drop to a random value in this range
	maxFreeSlots: number;
	randomAfk: boolean;
	playStyle: PlayStyle; // 'normal' = snappy (1-3s), 'lazy' = relaxed/AFK (up to 10s)
}

const CACHE_PREFIX = 'brutalIronman.';

export const defaultSettings: BrutalSettings = {
	mode: 'progressive',
	arrowTarget: 1000,
	singlePhase: 'bars',
	minFreeSlots: 0,
	maxFreeSlots: 3,
	randomAfk: true,
	playStyle: 'normal',
};

export const loadSettings = (): BrutalSettings => {
	const configured = bot.bmCache.getBoolean(CACHE_PREFIX + 'configured', false);
	if (!configured) {
		return { ...defaultSettings };
	}

	const modeStr = bot.bmCache.getString(CACHE_PREFIX + 'mode', 'progressive');
	const phaseStr = String(bot.bmCache.getString(CACHE_PREFIX + 'singlePhase', 'bars'));
	const playStyleStr = bot.bmCache.getString(CACHE_PREFIX + 'playStyle', 'normal');

	return {
		mode: modeStr === 'single' ? 'single' : 'progressive',
		arrowTarget: bot.bmCache.getInt(CACHE_PREFIX + 'arrowTarget', defaultSettings.arrowTarget),
		singlePhase: PHASES.indexOf(phaseStr as Phase) !== -1 ? (phaseStr as Phase) : 'bars',
		minFreeSlots: bot.bmCache.getInt(CACHE_PREFIX + 'minFreeSlots', defaultSettings.minFreeSlots),
		maxFreeSlots: bot.bmCache.getInt(CACHE_PREFIX + 'maxFreeSlots', defaultSettings.maxFreeSlots),
		randomAfk: bot.bmCache.getBoolean(CACHE_PREFIX + 'randomAfk', true),
		playStyle: playStyleStr === 'lazy' ? 'lazy' : 'normal',
	};
};

export const saveSettings = (settings: BrutalSettings): void => {
	bot.bmCache.saveBoolean(CACHE_PREFIX + 'configured', true);
	bot.bmCache.saveString(CACHE_PREFIX + 'mode', settings.mode);
	bot.bmCache.saveInt(CACHE_PREFIX + 'arrowTarget', settings.arrowTarget);
	bot.bmCache.saveString(CACHE_PREFIX + 'singlePhase', settings.singlePhase);
	bot.bmCache.saveInt(CACHE_PREFIX + 'minFreeSlots', settings.minFreeSlots);
	bot.bmCache.saveInt(CACHE_PREFIX + 'maxFreeSlots', settings.maxFreeSlots);
	bot.bmCache.saveBoolean(CACHE_PREFIX + 'randomAfk', settings.randomAfk);
	bot.bmCache.saveString(CACHE_PREFIX + 'playStyle', settings.playStyle);
};
