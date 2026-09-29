/**
 * ==========================================================
 *  Mithril Brutal Arrow Ironman
 *  Author: xulixna (Discord)
 *  Framework: ThePlug Bot Maker (Rhino JS / TypeScript)
 * ==========================================================
 */
import { game } from './game.js';
import { BrutalRunner, createBrutalRunner } from './runner.js';
import { closeWindow, configCancelled, selectedSettings, showWindow } from './ui.js';

let runner: BrutalRunner | null = null;

export function onStart(): void {
	runner = null;
	showWindow();
}

export function onGameTick(): void {
	try {
		if (configCancelled()) {
			game.log('Settings window closed - stopping.');
			bot.terminate();
			return;
		}

		if (!runner) {
			const settings = selectedSettings();
			if (!settings) return;

			runner = createBrutalRunner(game, settings);
			game.log(
				`Started Mithril Brutal Arrow Ironman by xulixna in ${settings.mode} mode, ${settings.playStyle} style.`,
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
	game.cancelWebWalk();
	try {
		if (runner) game.log('Last status: ' + runner.describe());
	} catch {
		// Status not available
	}
	game.log('Mithril Brutal Arrow Ironman stopped.');
}
