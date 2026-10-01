/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument */
import { GameWrapper } from './game.js';
import { DelayManager, SessionStats } from './state.js';
import {
	MoneyMakerSettings,
	MoneyMethodId,
	METHOD_CATALOG,
} from './types.js';
import { MoneyMethodHandler } from './methods/base-method.js';
import { createTanningHandler } from './methods/tanning.js';
import { createGatheringHandler } from './methods/gathering.js';
import { createProcessingHandler } from './methods/processing.js';
import { createJewelryHandler } from './methods/jewelry.js';
import { createMagicHandler } from './methods/magic.js';
import { createShopRunHandler } from './methods/shop-run.js';

export type RunnerState = 'INITIALIZING' | 'RUNNING' | 'HANDLING_FALLBACK' | 'COMPLETED';

export class MoneyMakerRunner {
	private readonly game: GameWrapper;
	private readonly settings: MoneyMakerSettings;
	private readonly delayManager: DelayManager = new DelayManager();
	private readonly stats: SessionStats = new SessionStats();

	private state: RunnerState = 'INITIALIZING';
	private currentHandler: MoneyMethodHandler | null = null;
	private exhaustedMethods: MoneyMethodId[] = [];
	private isInitialized = false;

	constructor(game: GameWrapper, settings: MoneyMakerSettings) {
		this.game = game;
		this.settings = settings;
		bot.breakHandler.setBreakHandlerStatus(settings.general.takeBreaks);
	}

	public tick(): void {
		if (!this.game.isLoggedIn()) {
			return;
		}

		// Update telemetry counters
		this.updateCounters();

		// Handle delays
		this.delayManager.tick();
		if (this.delayManager.isBusy()) {
			return;
		}

		// Check stopping conditions
		if (this.checkStoppingConditions()) {
			this.state = 'COMPLETED';
		}

		switch (this.state) {
			case 'INITIALIZING': {
				this.handleInitializing();
				break;
			}
			case 'RUNNING': {
				this.handleRunning();
				break;
			}
			case 'HANDLING_FALLBACK': {
				this.handleFallback();
				break;
			}
			case 'COMPLETED': {
				this.handleCompleted();
				break;
			}
		}
	}

	private handleInitializing(): void {
		let chosenMethod: MoneyMethodId;

		if (this.settings.general.executionMode === 'MANUAL') {
			chosenMethod = this.settings.general.selectedMethod;
			this.game.log(`Manual mode selected: ${chosenMethod}.`);
		} else {
			const bestMethod = this.selectBestMethod();
			if (!bestMethod) {
				this.game.gameMessage('No viable method is available.');
				this.state = 'COMPLETED';
				return;
			}
			chosenMethod = bestMethod;
			this.game.log(`Auto mode selected best viable method: ${chosenMethod}.`);
		}

		this.currentHandler = this.instantiateHandler(chosenMethod);
		this.currentHandler.onStart();
		this.state = 'RUNNING';
	}

	private handleRunning(): void {
		if (!this.currentHandler) {
			this.state = 'INITIALIZING';
			return;
		}

		// Check if the current method has exhausted its supplies
		if (this.currentHandler.isSuppliesExhausted()) {
			this.game.log(`Supplies depleted for method ${this.currentHandler.name}!`);
			if (this.exhaustedMethods.indexOf(this.currentHandler.id) < 0) {
				this.exhaustedMethods.push(this.currentHandler.id);
			}
			this.state = 'HANDLING_FALLBACK';
			return;
		}

		// Execute method tick
		this.currentHandler.tick();
	}

	private handleFallback(): void {
		if (this.settings.general.executionMode === 'MANUAL') {
			this.game.gameMessage('Materials depleted in Manual mode. Terminating script.');
			this.game.log('Materials depleted in Manual mode. Terminating script.');
			this.state = 'COMPLETED';
			return;
		}

		// In Auto Mode, find next best method
		this.game.log('Searching for next best available method (Auto Fallback)...');
		const nextMethod = this.selectBestMethod();

		if (!nextMethod) {
			this.game.gameMessage('No viable method remains. Check tools and supplies.');
			this.state = 'COMPLETED';
			return;
		}

		this.currentHandler = this.instantiateHandler(nextMethod);

		this.currentHandler.onStart();
		this.state = 'RUNNING';
	}

	private handleCompleted(): void {
		if (!this.isInitialized) {
			this.isInitialized = true;
			bot.breakHandler.setBreakHandlerStatus(false);
			this.game.stopWebWalk();
			if (this.game.isBankOpen()) this.game.closeBank();
			if (this.game.isShopOpen()) this.game.closeShop();
			this.game.gameMessage('Session completed successfully.');
			this.game.log(`Session finished. Total estimated GP: ${this.stats.getTotalGp()} gp.`);
			this.game.terminate();
		}
	}

	private selectBestMethod(): MoneyMethodId | null {
		const wcLevel = this.game.getRealLevel(net.runelite.api.Skill.WOODCUTTING);
		const mineLevel = this.game.getRealLevel(net.runelite.api.Skill.MINING);
		const craftLevel = this.game.getRealLevel(net.runelite.api.Skill.CRAFTING);
		const magicLevel = this.game.getRealLevel(net.runelite.api.Skill.MAGIC);
		const cookLevel = this.game.getRealLevel(net.runelite.api.Skill.COOKING);

		// Sort catalog by approx GP/hour descending
		const sorted = [...METHOD_CATALOG].sort((a, b) => b.approxGpPerHour - a.approxGpPerHour);

		for (const method of sorted) {
			if (this.exhaustedMethods.indexOf(method.id) >= 0) {
				continue;
			}

			// Validate skill requirements
			if (method.requiredSkills.woodcutting && wcLevel < method.requiredSkills.woodcutting) continue;
			if (method.requiredSkills.mining && mineLevel < method.requiredSkills.mining) continue;
			if (method.requiredSkills.crafting && craftLevel < method.requiredSkills.crafting) continue;
			if (method.requiredSkills.magic && magicLevel < method.requiredSkills.magic) continue;
			if (method.requiredSkills.cooking && cookLevel < method.requiredSkills.cooking) continue;

			return method.id;
		}

		return null;
	}

	private instantiateHandler(methodId: MoneyMethodId): MoneyMethodHandler {
		switch (methodId) {
			case 'TAN_COWHIDE': {
				return createTanningHandler(this.game, this.settings, this.delayManager, this.stats);
			}
			case 'BUY_FEATHERS': {
				return createShopRunHandler(this.game, this.settings, this.delayManager, this.stats);
			}
			case 'GRIND_CHOCOLATE':
			case 'MAKE_PIE_SHELLS':
			case 'MAKE_PIZZA_BASES': {
				return createProcessingHandler(this.game, this.settings, this.delayManager, this.stats, methodId);
			}
			case 'CRAFT_GOLD_AMULET':
			case 'CRAFT_SAPPHIRE_RING':
			case 'CRAFT_EMERALD_RING':
			case 'CRAFT_RUBY_RING': {
				return createJewelryHandler(this.game, this.settings, this.delayManager, this.stats, methodId);
			}
			case 'HIGH_ALCH':
			case 'TELEGRAB_WINE': {
				return createMagicHandler(this.game, this.settings, this.delayManager, this.stats, methodId);
			}
			default: {
				return createGatheringHandler(this.game, this.settings, this.delayManager, this.stats, methodId);
			}
		}
	}

	private checkStoppingConditions(): boolean {
		const gen = this.settings.general;
		if (gen.stoppingMode === 'TARGET_GP' && gen.targetGp > 0 && this.stats.getTotalGp() >= gen.targetGp) {
				this.game.gameMessage(`Target GP of ${gen.targetGp} reached!`);
				return true;
			}

		if (gen.stoppingMode === 'TIME_LIMIT' && gen.timeLimitHours > 0 && this.stats.getElapsedTimeHours() >= gen.timeLimitHours) {
				this.game.gameMessage(`Time limit of ${gen.timeLimitHours}h reached!`);
				return true;
			}

		return false;
	}

	private updateCounters(): void {
		const mins = this.stats.getElapsedTimeMinutes();
		const kGp = Math.floor(this.stats.getTotalGp() / 1000);
		const kGpHour = Math.floor(this.stats.getGpHour() / 1000);

		this.game.setCounter('Time (min)', mins);
		this.game.setCounter('GP Earned (k)', kGp);
		this.game.setCounter('GP/hr (k)', kGpHour);
		this.game.setCounter('Items Done', this.stats.getItemsProcessed());
	}
}
