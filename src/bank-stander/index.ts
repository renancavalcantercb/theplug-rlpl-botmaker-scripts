import { game } from './game.js';
import { HerbloreRunner } from './runner.js';
import {
	closeWindow,
	configCancelled,
	selectedSettings,
	showWindow,
} from './ui.js';

let runner: HerbloreRunner | null = null;

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
			runner = new HerbloreRunner(game, settings);
			const enabledSkills =
				settings.skills && settings.skills.length > 0
					? settings.skills
					: [settings.skill ?? 'Herblore'];

			for (const skill of enabledSkills) {
				const counters =
					skill === 'Fletching'
						? ['cut', 'string', 'darts', 'bolts', 'arrows']
						: skill === 'Crafting'
							? ['gems']
							: ['clean', 'unfinished', 'finished'];
				for (const name of counters) {
					game.counter(skill + ' ' + name, 0);
				}
			}
			game.log(
				'Bank Stander started: ' + enabledSkills.join(' -> ') + '.',
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
	game.log('Bank Stander stopped.');
}
