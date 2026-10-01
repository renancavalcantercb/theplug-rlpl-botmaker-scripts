/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument */
import { GameWrapper } from './game.js';
import { DelayManager, PendingAction, TaskHandler } from './state.js';
import {
	AccountBuilderSettings,
	BuilderCategory,
} from './types.js';
import { createQuestTaskHandler } from './quests/quest-runner.js';
import { createWoodcuttingTaskHandler } from './woodcutting/wc-runner.js';
import { createFiremakingTaskHandler } from './firemaking/fm-runner.js';
import { createFishingTaskHandler } from './fishing/fish-runner.js';
import { createCookingTaskHandler } from './cooking/cook-runner.js';
import { createCombatTaskHandler } from './combat/combat-runner.js';
import { CombatHelper } from './combat/combat-helper.js';
import { ExplorationHandler } from './exploring.js';


export type RunnerState =
	| 'PLANNING'
	| 'WALK_TO_BANK'
	| 'BANKING'
	| 'RUNNING_TASK'
	| 'EXPLORING'
	| 'TASK_COMPLETED'
	| 'ALL_COMPLETED';

export class AccountBuilderRunner {
	private readonly game: GameWrapper;
	private readonly settings: AccountBuilderSettings;
	private readonly delayManager: DelayManager = new DelayManager();
	private readonly exploration: ExplorationHandler = new ExplorationHandler();
	private readonly handlers: Map<BuilderCategory, TaskHandler> = new Map();

	private state: RunnerState = 'PLANNING';
	private queueIndex = 0;
	private currentTask: TaskHandler | null = null;
	private pending: PendingAction | null = null;
	private startTime: number = Date.now();
	private totalCompletedTasks = 0;
	private isInitialized = false;

	constructor(game: GameWrapper, settings: AccountBuilderSettings) {
		this.game = game;
		this.settings = settings;
		this.registerDefaultHandlers();
	}

	public registerHandler(handler: TaskHandler): void {
		this.handlers.set(handler.category, handler);
	}

	public tick(): void {
		if (!this.game.isLoggedIn()) {
			return;
		}

		// Update runtime counters
		this.updateCounters();

		// Handle active delays
		this.delayManager.tick();
		if (this.delayManager.isBusy()) {
			return;
		}

		// Handle pending asynchronous action checks
		if (this.pending) {
			if (this.game.isDialogueOpen()) {
				this.game.handleDialogue();
			}
			if (++this.pending.ticks > 25) {
				this.game.log(`Action timeout: ${this.pending.label}. Retrying...`);
				this.pending = null;
				return;
			}
			if (this.pending.check()) {
				const done = this.pending.done;
				this.pending = null;
				done();
			}
			return;
		}

		// Global Target Total Level Check
		if (
			this.settings.general.targetTotalLevel > 0 &&
			this.game.getTotalLevel() >= this.settings.general.targetTotalLevel
		) {
			this.game.gameMessage(
				`Target Total Level reached: ${this.game.getTotalLevel()} / ${this.settings.general.targetTotalLevel}! Stopping.`,
			);
			this.state = 'ALL_COMPLETED';
		}

		// State Machine execution
		switch (this.state) {
			case 'PLANNING':
				this.handlePlanning();
				break;
			case 'WALK_TO_BANK':
				this.handleWalkToBank();
				break;
			case 'BANKING':
				this.handleBanking();
				break;
			case 'RUNNING_TASK':
				this.handleRunningTask();
				break;
			case 'EXPLORING':
				this.handleExploring();
				break;
			case 'TASK_COMPLETED':
				this.handleTaskCompleted();
				break;
			case 'ALL_COMPLETED':
				this.handleAllCompleted();
				break;
		}
	}

	private handlePlanning(): void {
		const queue = this.settings.enabledCategories;
		if (!queue || queue.length === 0) {
			this.game.log('Queue is empty. No tasks to execute.');
			this.state = 'ALL_COMPLETED';
			return;
		}

		// Filter uncompleted categories from the enabled list
		const remainingCategories = queue.filter((cat) => {
			const h = this.handlers.get(cat);
			return h && !h.isComplete();
		});

		if (remainingCategories.length === 0) {
			this.game.log('All enabled tasks have completed their goals!');
			this.state = 'ALL_COMPLETED';
			return;
		}

		let targetCategory: BuilderCategory | null = null;



		// Sequential queue-based task selection
		if (!targetCategory) {
			while (this.queueIndex < queue.length) {
				const candidate = queue[this.queueIndex];
				const h = this.handlers.get(candidate);
				if (h && !h.isComplete()) {
					targetCategory = candidate;
					break;
				}
				this.queueIndex++;
			}
		}

		if (!targetCategory) {
			this.game.log('All queued tasks have been completed!');
			this.state = 'ALL_COMPLETED';
			return;
		}

		const handler = this.handlers.get(targetCategory);
		if (!handler) {
			this.game.log(`No handler registered for ${targetCategory}. Advancing...`);
			this.queueIndex++;
			return;
		}

		// Check and unequip conflicting tools (axes, pickaxes) before starting task
		CombatHelper.unequipConflictingTools(this.game);

		this.currentTask = handler;
		this.game.log(
			`Starting task: ${targetCategory} (Remaining tasks: ${remainingCategories.length}).`,
		);
		this.game.gameMessage(`Switched active task to: ${targetCategory}.`);

		handler.onStart();
		this.state = 'RUNNING_TASK';
	}

	private handleWalkToBank(): void {
		this.state = 'BANKING';
	}

	private handleBanking(): void {
		if (this.game.isBankOpen()) {
			if (this.game.getEmptySlots() < 28) {
				this.game.log('Depositing inventory into bank...');
				this.game.depositAll();
				this.delay(2);
				return;
			}

			this.game.closeBank();
			if (this.currentTask) {
				this.currentTask.onStart();
				this.state = 'RUNNING_TASK';
			} else {
				this.state = 'PLANNING';
			}
			return;
		}

		if (this.game.isDialogueOpen()) {
			this.game.log('Handling dialogue / tutorial during banking...');
			this.game.handleDialogue();
			this.delay(1);
			return;
		}

		if (this.game.isWebWalking()) {
			return;
		}

		this.game.log('Opening bank...');
		this.game.openBank();
		this.delay(2);
	}

	private handleRunningTask(): void {
		if (!this.currentTask) {
			this.state = 'PLANNING';
			return;
		}

		// Check if task completed its goal
		if (this.currentTask.isComplete()) {
			this.state = 'TASK_COMPLETED';
			return;
		}

		// Execute handler tick
		this.currentTask.tick();
	}

	private handleTaskCompleted(): void {
		const finishedCat = this.currentTask ? this.currentTask.category : 'Task';
		this.game.gameMessage(`🎉 Goal reached for ${finishedCat}!`);
		this.game.log(`Goal reached for ${finishedCat}. Advancing queue...`);

		if (this.currentTask && typeof this.currentTask.onFinish === 'function') {
			this.currentTask.onFinish();
		}

		this.totalCompletedTasks++;
		this.queueIndex++;
		this.currentTask = null;

		// Check if we should take a short casual exploration stroll before the next task
		if (
			this.exploration.shouldExplore(
				this.settings.general.cameraMovement,
				this.settings.general.noobMode,
				this.game.getTotalLevel(),
			)
		) {
			this.exploration.startExploration(this.game);
			this.state = 'EXPLORING';
			return;
		}

		this.delay(
			DelayManager.getReactionTicks(
				this.settings.general.playStyle,
				this.settings.general.noobMode,
				this.game.getTotalLevel(),
			),
		);
		this.state = 'PLANNING';
	}

	private handleExploring(): void {
		this.exploration.tick(this.game, this.delayManager, () => {
			this.state = 'PLANNING';
		});
	}

	private handleAllCompleted(): void {
		if (!this.isInitialized) {
			this.isInitialized = true;
			this.game.gameMessage('🏁 All tasks in execution queue completed successfully!');
			this.game.log('All tasks in execution queue completed. Stopping bot.');
			this.game.terminate();
		}
	}

	private updateCounters(): void {
		const elapsedMinutes = Math.floor((Date.now() - this.startTime) / 60000);
		this.game.setCounter('Time (min)', elapsedMinutes);
		this.game.setCounter('Total Lvl', this.game.getTotalLevel());
		this.game.setCounter('Tasks Done', this.totalCompletedTasks);
		this.game.setCounter('Queue Left', Math.max(0, this.settings.enabledCategories.length - this.queueIndex));
	}

	public wait(label: string, check: () => boolean, done: () => void): void {
		this.pending = { label, check, done, ticks: 0 };
	}

	public delay(ticks: number): void {
		this.delayManager.setDelay(ticks);
	}

	/**
	 * Registers default/foundation handlers for each skill category.
	 * As full skill runners are created, they override these default handlers.
	 */
	private registerDefaultHandlers(): void {
		const skillMap: Partial<Record<BuilderCategory, net.runelite.api.Skill>> = {
			Combat: net.runelite.api.Skill.ATTACK,
			Ranged: net.runelite.api.Skill.RANGED,
			Magic: net.runelite.api.Skill.MAGIC,
			Prayer: net.runelite.api.Skill.PRAYER,
			Cooking: net.runelite.api.Skill.COOKING,
			Crafting: net.runelite.api.Skill.CRAFTING,
			Firemaking: net.runelite.api.Skill.FIREMAKING,
			Fishing: net.runelite.api.Skill.FISHING,
			Mining: net.runelite.api.Skill.MINING,
			Runecrafting: net.runelite.api.Skill.RUNECRAFT,
			Smithing: net.runelite.api.Skill.SMITHING,
			Woodcutting: net.runelite.api.Skill.WOODCUTTING,
		};

		const getTargetLevel = (cat: BuilderCategory): number => {
			switch (cat) {
				case 'Combat':
					return Math.max(
						this.settings.combat.targetAttack,
						this.settings.combat.targetStrength,
						this.settings.combat.targetDefence,
					);
				case 'Ranged':
					return this.settings.ranged.targetLevel;
				case 'Magic':
					return this.settings.magic.targetLevel;
				case 'Prayer':
					return this.settings.prayer.targetLevel;
				case 'Cooking':
					return this.settings.cooking.targetLevel;
				case 'Crafting':
					return this.settings.crafting.targetLevel;
				case 'Firemaking':
					return this.settings.firemaking.targetLevel;
				case 'Fishing':
					return this.settings.fishing.targetLevel;
				case 'Mining':
					return this.settings.mining.targetLevel;
				case 'Runecrafting':
					return this.settings.runecrafting.targetLevel;
				case 'Smithing':
					return this.settings.smithing.targetLevel;
				case 'Woodcutting':
					return this.settings.woodcutting.targetLevel;
				default:
					return 0;
			}
		};

		// Register default skill handlers
		for (const [cat, skill] of Object.entries(skillMap)) {
			const category = cat as BuilderCategory;
			const targetLvl = getTargetLevel(category);

			this.registerHandler({
				category,
				onStart: () => {
					const curr = this.game.getRealLevel(skill);
					this.game.log(`Initialized ${category} (Current: ${curr} / Target: ${targetLvl || 'Unlimited'}).`);
				},
				tick: () => {
					// Placeholder tick until specific skill runner executes actions
					this.delay(5);
				},
				isComplete: () => {
					if (!targetLvl || targetLvl <= 0) return false;
					return this.game.getRealLevel(skill) >= targetLvl;
				},
				getStatus: () => {
					return `${category}: Lv. ${this.game.getRealLevel(skill)} / ${targetLvl || 'Max'}`;
				},
			});
		}

		// Register Combat handler
		this.registerHandler(
			createCombatTaskHandler(this.game, this.settings, this.delayManager),
		);

		// Register Quests handler
		this.registerHandler(
			createQuestTaskHandler(this.game, this.settings, this.delayManager),
		);

		// Register Woodcutting handler
		this.registerHandler(
			createWoodcuttingTaskHandler(this.game, this.settings, this.delayManager),
		);

		// Register Firemaking handler
		this.registerHandler(
			createFiremakingTaskHandler(this.game, this.settings, this.delayManager),
		);

		// Register Fishing handler
		this.registerHandler(
			createFishingTaskHandler(this.game, this.settings, this.delayManager),
		);

		// Register Cooking handler
		this.registerHandler(
			createCookingTaskHandler(this.game, this.settings, this.delayManager),
		);

		// Register Moneymaking handler
		this.registerHandler({
			category: 'Moneymaking',
			onStart: () => {
				this.game.log(`Initialized Moneymaking: ${this.settings.moneymaking.method} (Target GP: ${this.settings.moneymaking.targetGp}).`);
			},
			tick: () => {
				this.delay(5);
			},
			isComplete: () => {
				// Target GP reached
				return false;
			},
			getStatus: () => `Moneymaking: ${this.settings.moneymaking.method}`,
		});
	}
}
