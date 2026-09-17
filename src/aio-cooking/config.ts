import { FoodItem, COOKABLE_FOODS } from './food.js';

export type CookingMode = 'progressive' | 'fixed';
export type PlayStyle = 'normal' | 'lazy';

export interface CookingSettings {
	mode: CookingMode;
	fixedFoodId: FoodItem;
	targetLevel: number; // 0 = unlimited / cook until bank is empty
	playStyle: PlayStyle; // 'normal' = snappy (1-3s), 'lazy' = relaxed/AFK (up to 10s)
}

const CACHE_PREFIX = 'aioCooking.';

export const defaultSettings: CookingSettings = {
	mode: 'progressive',
	fixedFoodId: FoodItem.RAW_PIKE,
	targetLevel: 0,
	playStyle: 'normal',
};

export const loadSettings = (): CookingSettings => {
	const configured = bot.bmCache.getBoolean(CACHE_PREFIX + 'configured', false);
	if (!configured) {
		return { ...defaultSettings };
	}

	const modeStr = bot.bmCache.getString(CACHE_PREFIX + 'mode', 'progressive');
	const mode: CookingMode = modeStr === 'fixed' ? 'fixed' : 'progressive';
	const fixedFoodId = bot.bmCache.getInt(
		CACHE_PREFIX + 'fixedFoodId',
		FoodItem.RAW_PIKE,
	) as FoodItem;
	const targetLevel = bot.bmCache.getInt(CACHE_PREFIX + 'targetLevel', 0);
	const playStyleStr = bot.bmCache.getString(
		CACHE_PREFIX + 'playStyle',
		'normal',
	);
	const playStyle: PlayStyle = playStyleStr === 'lazy' ? 'lazy' : 'normal';

	return {
		mode,
		fixedFoodId,
		targetLevel,
		playStyle,
	};
};

export const saveSettings = (settings: CookingSettings): void => {
	bot.bmCache.saveBoolean(CACHE_PREFIX + 'configured', true);
	bot.bmCache.saveString(CACHE_PREFIX + 'mode', settings.mode);
	bot.bmCache.saveInt(CACHE_PREFIX + 'fixedFoodId', settings.fixedFoodId);
	bot.bmCache.saveInt(CACHE_PREFIX + 'targetLevel', settings.targetLevel);
	bot.bmCache.saveString(CACHE_PREFIX + 'playStyle', settings.playStyle);
};
