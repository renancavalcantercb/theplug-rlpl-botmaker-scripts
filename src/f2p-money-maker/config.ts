import {
	MoneyMakerSettings,
	ExecutionMode,
	StoppingMode,
	PlayStyle,
	MoneyMethodId,
} from './types.js';

const CACHE_PREFIX = 'f2pMoneyMaker.';

export const defaultSettings: MoneyMakerSettings = {
	general: {
		executionMode: 'AUTO',
		selectedMethod: 'TAN_COWHIDE',
		stoppingMode: 'INDEFINITE',
		targetGp: 1000000,
		timeLimitHours: 4,
		playStyle: 'normal',
		noobMode: true,
		takeBreaks: true,
		bankMicroPauses: true,
	},
	specific: {
		wcOakLocation: 'Draynor',
		wcYewLocation: 'Edgeville',
		mineLocation: 'Varrock SW',
		alchItemName: 'Rune 2h sword',
		alchItemId: 1319,
		leatherType: 'soft',
	},
};

const getCachedString = (key: string, fallback: string): string => {
	try {
		return String(bot.bmCache.getString(key, fallback));
	} catch {
		return fallback;
	}
};

const getCachedInt = (key: string, fallback: number): number => {
	try {
		const value = Number(bot.bmCache.getInt(key, fallback));
		return isNaN(value) ? fallback : value;
	} catch {
		return fallback;
	}
};

const getCachedBoolean = (key: string, fallback: boolean): boolean => {
	try {
		return Boolean(bot.bmCache.getBoolean(key, fallback));
	} catch {
		return fallback;
	}
};

const getOakLocation = (): MoneyMakerSettings['specific']['wcOakLocation'] => {
	const value = getCachedString(
		CACHE_PREFIX + 'specific.wcOakLocation',
		getCachedString(CACHE_PREFIX + 'specific.wcLocation', 'Draynor'),
	);
	return value === 'Lumbridge' ? 'Lumbridge' : 'Draynor';
};

const getYewLocation = (): MoneyMakerSettings['specific']['wcYewLocation'] =>
	getCachedString(CACHE_PREFIX + 'specific.wcYewLocation', 'Edgeville') === 'Varrock Palace'
		? 'Varrock Palace'
		: 'Edgeville';

const getMineLocation = (): MoneyMakerSettings['specific']['mineLocation'] => {
	const value = getCachedString(CACHE_PREFIX + 'specific.mineLocation', 'Varrock SW');
	if (value === 'Al-Kharid' || value === 'Lumbridge West') return value;
	return 'Varrock SW';
};

export const loadSettings = (): MoneyMakerSettings => {
	const configured = getCachedBoolean(CACHE_PREFIX + 'configured', false);
	if (!configured) {
		return JSON.parse(JSON.stringify(defaultSettings)) as MoneyMakerSettings;
	}

	const execModeString = getCachedString(CACHE_PREFIX + 'general.executionMode', 'AUTO');
	const executionMode: ExecutionMode = execModeString === 'MANUAL' ? 'MANUAL' : 'AUTO';

	const selectedMethod = getCachedString(
		CACHE_PREFIX + 'general.selectedMethod',
		'TAN_COWHIDE',
	) as MoneyMethodId;

	const stoppingModeString = getCachedString(
		CACHE_PREFIX + 'general.stoppingMode',
		'INDEFINITE',
	);
	const stoppingMode: StoppingMode =
		stoppingModeString === 'TARGET_GP'
			? 'TARGET_GP'
			: (stoppingModeString === 'TIME_LIMIT'
				? 'TIME_LIMIT'
				: 'INDEFINITE');

	const playStyleString = getCachedString(CACHE_PREFIX + 'general.playStyle', 'normal');
	const playStyle: PlayStyle =
		playStyleString === 'fast' || playStyleString === 'lazy' ? playStyleString : 'normal';

	return {
		general: {
			executionMode,
			selectedMethod,
			stoppingMode,
			targetGp: getCachedInt(CACHE_PREFIX + 'general.targetGp', 1000000),
			timeLimitHours: getCachedInt(CACHE_PREFIX + 'general.timeLimitHours', 4),
			playStyle,
			noobMode: getCachedBoolean(CACHE_PREFIX + 'general.noobMode', true),
			takeBreaks: getCachedBoolean(CACHE_PREFIX + 'general.takeBreaks', true),
			bankMicroPauses: getCachedBoolean(CACHE_PREFIX + 'general.bankMicroPauses', true),
		},
		specific: {
			wcOakLocation: getOakLocation(),
			wcYewLocation: getYewLocation(),
			mineLocation: getMineLocation(),
			alchItemName: getCachedString(CACHE_PREFIX + 'specific.alchItemName', 'Rune 2h sword'),
			alchItemId: getCachedInt(CACHE_PREFIX + 'specific.alchItemId', 1319),
			leatherType:
				getCachedString(CACHE_PREFIX + 'specific.leatherType', 'soft') === 'hard'
					? 'hard'
					: 'soft',
		},
	};
};

export const saveSettings = (settings: MoneyMakerSettings): void => {
	bot.bmCache.saveBoolean(CACHE_PREFIX + 'configured', true);

	bot.bmCache.saveString(CACHE_PREFIX + 'general.executionMode', settings.general.executionMode);
	bot.bmCache.saveString(CACHE_PREFIX + 'general.selectedMethod', settings.general.selectedMethod);
	bot.bmCache.saveString(CACHE_PREFIX + 'general.stoppingMode', settings.general.stoppingMode);
	bot.bmCache.saveInt(CACHE_PREFIX + 'general.targetGp', settings.general.targetGp);
	bot.bmCache.saveInt(CACHE_PREFIX + 'general.timeLimitHours', settings.general.timeLimitHours);
	bot.bmCache.saveString(CACHE_PREFIX + 'general.playStyle', settings.general.playStyle);
	bot.bmCache.saveBoolean(CACHE_PREFIX + 'general.noobMode', settings.general.noobMode);
	bot.bmCache.saveBoolean(CACHE_PREFIX + 'general.takeBreaks', settings.general.takeBreaks);
	bot.bmCache.saveBoolean(CACHE_PREFIX + 'general.bankMicroPauses', settings.general.bankMicroPauses);

	bot.bmCache.saveString(CACHE_PREFIX + 'specific.wcOakLocation', settings.specific.wcOakLocation);
	bot.bmCache.saveString(CACHE_PREFIX + 'specific.wcYewLocation', settings.specific.wcYewLocation);
	bot.bmCache.saveString(CACHE_PREFIX + 'specific.mineLocation', settings.specific.mineLocation);
	bot.bmCache.saveString(CACHE_PREFIX + 'specific.alchItemName', settings.specific.alchItemName);
	bot.bmCache.saveInt(CACHE_PREFIX + 'specific.alchItemId', settings.specific.alchItemId);
	bot.bmCache.saveString(CACHE_PREFIX + 'specific.leatherType', settings.specific.leatherType);
};
