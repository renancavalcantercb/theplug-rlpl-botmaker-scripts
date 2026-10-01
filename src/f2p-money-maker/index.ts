/**
 * ==========================================================
 *  AIO F2P Money Maker
 *  Framework: ThePlug Bot Maker (Rhino JS / TypeScript)
 * ==========================================================
 */
import {
	closeWindow,
	configCancelled,
	selectedSettings,
	showWindow,
} from './ui.js';
import { game } from './game.js';
import { MoneyMakerRunner } from './runner.js';

let runner: MoneyMakerRunner | null = null;

export function onStart(): void {
	runner = null;
	game.stopWebWalk();
	showWindow();
}

export function onGameTick(): void {
	try {
		if (configCancelled()) {
			game.stopWebWalk();
			game.gameMessage('Money Maker configuration was cancelled.');
			game.terminate();
			return;
		}

		if (!runner) {
			const settings = selectedSettings();
			if (!settings) return;

			runner = new MoneyMakerRunner(game, settings);
			const mode = settings.general.executionMode;
			const method = settings.general.selectedMethod;
			game.gameMessage(
				`F2P Money Maker started! Mode: ${mode} (${mode === 'MANUAL' ? method : 'Adaptive Auto'}), Playstyle: ${settings.general.playStyle}.`,
			);
			game.setCounter(
				'Play Style',
				settings.general.playStyle === 'fast'
					? 1
					: (settings.general.playStyle === 'lazy'
						? 3
						: 2),
			);
		}

		runner.tick();
	} catch (error) {
		game.stopWebWalk();
		game.gameMessage('Error in Money Maker: ' + String(error));
		game.log('Fatal script error: ' + String(error));
		game.terminate();
	}
}

export function onEnd(): void {
	game.stopWebWalk();
	bot.breakHandler.setBreakHandlerStatus(false);
	closeWindow();
	game.gameMessage('F2P Money Maker stopped.');
}
