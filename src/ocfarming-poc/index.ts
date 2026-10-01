/**
 * ocfarming PoC — regular trees only.
 *
 * Ports the tree half of the Microbot "Farming Runner" plugin onto the rlpl
 * script API to answer one question: does the rlpl walker remove the need for
 * the plugin's approach layer? See telemetry.ts and README.md.
 *
 * Out of scope on purpose: banking, supply planning, fruit trees, revisit
 * scheduling, overlay. None of them measure the walker.
 */

import { onChatReceipt, start, stop, tick } from './runner.js';
import { configReady, showConfigWindow } from './ui.js';
import { log } from './telemetry.js';

let running = false;

export function onStart(): void {
	showConfigWindow();
}

export function onGameTick(): void {
	try {
		if (!running) {
			// The Start button only flips a flag. The run itself begins here so
			// that every bot.* call happens on the client thread, not the EDT.
			if (!configReady()) return;
			start();
			running = true;
		}
		tick();
	} catch (error) {
		log('crashed: ' + String(error));
		bot.terminate();
	}
}

export function onEnd(): void {
	if (running) stop();
}

export function onChatMessage(
	_type: net.runelite.api.ChatMessageType,
	_name: string,
	message: string,
): void {
	// Receipts: the gardener lines that confirm PAY and REMOVE_TREE.
	onChatReceipt(message);
}
