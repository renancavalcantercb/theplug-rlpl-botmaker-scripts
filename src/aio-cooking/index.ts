/**
 * ==========================================================
 *  AIO Cooking - Rogues' Den
 *  Author: xulixna (Discord)
 *  Framework: ThePlug Bot Maker (Rhino JS / TypeScript)
 * ==========================================================
 */
import { getFoodDefById } from './food.js';
import { game } from './game.js';
import { createCookingRunner, CookingRunner } from './runner.js';
import {
	closeWindow,
	configCancelled,
	selectedSettings,
	showWindow,
} from './ui.js';

let runner: CookingRunner | null = null;

export function onStart(): void {
	runner = null;
	showWindow();
}

export function onGameTick(): void {
	try {
		if (configCancelled()) {
			bot.terminate();
			return;
		}

		if (!runner) {
			const settings = selectedSettings();
			if (!settings) return;

			runner = createCookingRunner(game, settings);
			const modeLabel =
				settings.mode === 'progressive'
					? 'Mode [Progressive]'
					: `Mode [Fixed: ${getFoodDefById(settings.fixedFoodId)?.name ?? 'Food'}]`;
			const styleLabel =
				settings.playStyle === 'lazy'
					? 'Style [Lazy AFK]'
					: 'Style [Normal]';

			game.setCounter(modeLabel, 1);
			game.setCounter(styleLabel, 1);
			const currentLvl = game.getRealCookingLevel();
			if (currentLvl > 0) {
				game.setCounter('Cooking Level', currentLvl);
			}
			if (settings.targetLevel > 0) {
				game.setCounter('Target Level', settings.targetLevel);
			}
			game.setCounter('XP Gained', 0);
			game.setCounter('XP / hr', 0);
			game.setCounter('Time (min)', 0);
			game.log(
				`Started AIO Cooking by xulixna in ${settings.mode} mode, ${settings.playStyle} style (Target Level: ${settings.targetLevel || 'Unlimited'}).`,
			);
		}

		runner.tick();
	} catch (error) {
		game.log('Stopped after error: ' + String(error));
		bot.terminate();
	}
}

export function onEnd(): void {
	closeWindow();
	game.log('AIO Cooking stopped.');
}
