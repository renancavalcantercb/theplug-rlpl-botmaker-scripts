import { getConfig, isConfigReady, showConfigUi, closeUi } from './ui.js';
import { startRunner, tickRunner, stopRunner } from './runner.js';

let running = false;

export function onStart(): void {
	running = false;
	showConfigUi();
}

export function onGameTick(): void {
	try {
		if (!running) {
			if (!isConfigReady()) return;
			startRunner(getConfig());
			running = true;
		}

		tickRunner(getConfig());
	} catch (err) {
		bot.printLogMessage('[QH-POC] Erro no tick: ' + String(err));
	}
}

export function onEnd(): void {
	if (running) {
		stopRunner();
		running = false;
	}
	closeUi();
}
