/**
 * ==========================================================
 *  AIO F2P Account Builder
 *  Author: xulixna (Discord)
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
import { AccountBuilderRunner } from './runner.js';

let runner: AccountBuilderRunner | null = null;

export function onStart(): void {
	runner = null;
	game.stopWebWalk();
	showWindow();
}

export function onGameTick(): void {
	try {
		if (configCancelled()) {
			game.stopWebWalk();
			game.gameMessage('Configuration was cancelled.');
			game.terminate();
			return;
		}

		if (!runner) {
			const settings = selectedSettings();
			if (!settings) return;

			runner = new AccountBuilderRunner(game, settings);
			const queue = settings.enabledCategories;
			game.gameMessage(
				`Started! Queued ${queue.length} tasks: ${queue.join(', ')} (Playstyle: ${settings.general.playStyle}).`,
			);
			game.setCounter('Queued Tasks', queue.length);
			game.setCounter(
				'Play Style',
				settings.general.playStyle === 'fast'
					? 1
					: settings.general.playStyle === 'lazy'
						? 3
						: 2,
			);
		}

		runner.tick();
	} catch (error) {
		game.stopWebWalk();
		game.gameMessage('Error: ' + String(error));
		game.log('Fatal script error: ' + String(error));
		game.terminate();
	}
}

export function onEnd(): void {
	game.stopWebWalk();
	closeWindow();
	game.gameMessage('Stopped.');
}
