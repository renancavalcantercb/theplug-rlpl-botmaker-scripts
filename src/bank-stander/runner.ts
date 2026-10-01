import { craftingJobs } from './crafting.js';
import { fletchingJobs } from './fletching.js';
import {
	jobsFor,
	selectBatch,
	type Batch,
	type Count,
	type Job,
	type Kind,
	type Settings,
} from './herblore.js';
import { type SkillType } from './config.js';

export const CHEMISTRY = 21163;

/** The runner is independent of RuneLite so delayed/failed actions can be tested. */
export interface Game {
	loggedIn(): boolean;
	level(skill?: SkillType): number;
	realLevel(skill?: SkillType): number;
	inventory: Count;
	bank: Count;
	emptySlots(): number;
	bankOpen(): boolean;
	bankBusy(): boolean;
	openBank(): void;
	closeBank(): void;
	deposit(id?: number): void;
	heldItemIds(): number[];
	noted(): boolean;
	unnoted(): void;
	withdraw(id: number, quantity: number): void;
	equipped(id: number): boolean;
	alchemistEquipped(): boolean;
	wear(id: number): void;
	clean(id: number): void;
	combine(first: number, second: number): void;
	makeVisible(job?: Job): boolean;
	makeAll(): void;
	make(job?: Job): void;
	continueDialogue(): void;
	log(message: string): void;
	counter(name: string, value: number): void;
	terminate(): void;
	/** Stable per-account number so reaction times differ between accounts. */
	accountSeed?(): number;
}

type State =
	| 'bank'
	| 'deposit'
	| 'plan'
	| 'withdraw'
	| 'close'
	| 'work'
	| 'menu'
	| 'make'
	| 'mix'
	| 'equip-close'
	| 'equip'
	| 'stopped';
interface Pending {
	label: string;
	check: () => boolean;
	done: () => void;
	ticks: number;
}

interface SkillPhase {
	skill: SkillType;
	jobs: Job[];
}

export class HerbloreRunner {
	private state: State = 'bank';
	private pending: Pending | null = null;
	private batch: Batch | null = null;
	private withdrawalIndex = 0;
	private withdrawalTicks = 0;
	private withdrawalAttempts = 0;
	private idleTicks = 0;
	private retries = 0;
	private lastOutput = 0;
	private menuOutput = 0;
	private directActive = false;
	private observing = false;
	private targetReached = false;
	private readonly phases: SkillPhase[] = [];
	private phaseIndex = 0;
	// Human timing (only when settings.playStyle is set).
	private readonly humanized: boolean;
	private readonly lazy: boolean;
	private delayTicks = 0;
	private afkChance = 0;
	private afkCooldown = 0;
	private afks = 0;
	private timingReady = false;
	private readonly totals: Record<Kind, number> = {
		clean: 0,
		unfinished: 0,
		finished: 0,
		cut: 0,
		string: 0,
		darts: 0,
		bolts: 0,
		arrows: 0,
		gems: 0,
	};

	constructor(
		private readonly game: Game,
		private readonly settings: Settings,
		private readonly random: () => number = Math.random,
	) {
		this.humanized = settings.playStyle !== undefined;
		this.lazy = settings.playStyle === 'lazy';
		const enabledSkills =
			settings.skills && settings.skills.length > 0
				? settings.skills
				: [settings.skill ?? 'Herblore'];

		for (const skill of enabledSkills) {
			const jobs =
				skill === 'Herblore'
					? jobsFor(settings)
					: skill === 'Crafting'
						? craftingJobs(settings)
						: fletchingJobs(settings);
			if (jobs.length > 0) {
				this.phases.push({ skill, jobs });
			}
		}
	}

	private get currentPhase(): SkillPhase | null {
		return this.phases[this.phaseIndex] ?? null;
	}

	private advancePhase(): boolean {
		this.phaseIndex++;
		if (this.phaseIndex < this.phases.length) {
			const next = this.phases[this.phaseIndex];
			this.game.log(
				`Advancing to next skill: [${next.skill}] (${next.jobs.length} recipes configured).`,
			);
			this.batch = null;
			this.returnToBank();
			return true;
		}
		return false;
	}

	private checkTargetLevel(): boolean {
		const phase = this.currentPhase;
		if (!phase || this.settings.targetLevel <= 0) return false;
		return this.game.realLevel(phase.skill) >= this.settings.targetLevel;
	}

	private stop(reason: string): void {
		this.state = 'stopped';
		this.pending = null;
		this.game.log(reason);
		this.game.terminate();
	}

	private wait(
		label: string,
		action: () => void,
		check: () => boolean,
		done: () => void,
		ticks = 15,
	): void {
		// Register before issuing the command: failures never advance the state.
		this.pending = { label, check, done, ticks };
		action();
	}

	private randomInt(min: number, max: number): number {
		return min + Math.floor(this.random() * (Math.max(0, max - min) + 1));
	}

	// Rolled once per run so every run has a different AFK profile.
	private setupTiming(): void {
		this.timingReady = true;
		if (!this.humanized) return;
		this.afkChance = this.lazy
			? 0.006 + this.random() * 0.014
			: 0.002 + this.random() * 0.008;
		this.game.log(
			`Play style: ${this.lazy ? 'Lazy / AFK' : 'Normal'}` +
				(this.settings.randomAfk
					? `, AFK chance this run ${(this.afkChance * 100).toFixed(2)}% per busy tick.`
					: ', random AFKs off.'),
		);
		this.game.counter(this.lazy ? 'Style [Lazy AFK]' : 'Style [Normal]', 1);
	}

	// Pause after a batch ends, like a player noticing the inventory is done.
	private reactionDelay(): number {
		if (!this.humanized) return 0;
		const seed = Math.abs(this.game.accountSeed?.() ?? 1337);
		if (this.lazy)
			return Math.max(4, Math.min(16, 5 + (seed % 6) + this.randomInt(-1, 6)));
		return Math.max(1, Math.min(4, 1 + (seed % 2) + this.randomInt(0, 1)));
	}

	// Small hesitation between bank clicks.
	private microDelay(normalMax: number, lazyMax: number): void {
		if (!this.humanized) return;
		const ticks = this.randomInt(0, this.lazy ? lazyMax : normalMax);
		if (ticks > this.delayTicks) this.delayTicks = ticks;
	}

	// Only AFK while a batch is already being made.
	private maybeAfk(action: string): boolean {
		if (!this.humanized || !this.settings.randomAfk || this.afkCooldown > 0) return false;
		if (this.random() >= this.afkChance) return false;
		const ticks = this.lazy ? this.randomInt(10, 50) : this.randomInt(4, 20);
		this.afks++;
		this.afkCooldown = this.randomInt(60, 200);
		this.delayTicks = ticks;
		this.game.log(`Going AFK for ${ticks} ticks (~${(ticks * 0.6).toFixed(1)}s) while ${action}.`);
		this.game.counter('AFK Breaks', this.afks);
		return true;
	}

	private outputCount(): number {
		let quantity = 0;
		if (this.batch)
			for (const id of this.batch.job.outputs)
				quantity += this.game.inventory(id);
		return quantity;
	}

	// Returns true when new output appeared this tick.
	private observe(): boolean {
		if (!this.observing || !this.batch) return false;
		const quantity = this.outputCount();
		const grew = quantity > this.lastOutput;
		if (grew) {
			this.totals[this.batch.job.kind] += quantity - this.lastOutput;
			this.idleTicks = 0;
			this.retries = 0;
			const skill = this.currentPhase?.skill ?? 'Herblore';
			this.game.counter(
				skill + ' ' + this.batch.job.kind,
				this.totals[this.batch.job.kind],
			);
		}
		this.lastOutput = quantity;
		return grew;
	}

	private returnToBank(): void {
		// Coming back from a batch: react like a player, not instantly.
		if (this.observing) {
			const delay = this.reactionDelay();
			if (delay > this.delayTicks) this.delayTicks = delay;
		}
		this.observing = false;
		this.pending = null;
		this.state = 'bank';
		this.idleTicks = 0;
	}

	tick(): void {
		const game = this.game;
		if (this.state === 'stopped' || !game.loggedIn()) return;
		if (!this.timingReady) this.setupTiming();
		const produced = this.observe();
		if (this.delayTicks > 0) {
			this.delayTicks--;
			return;
		}
		if (this.afkCooldown > 0) this.afkCooldown--;

		if (!this.targetReached && this.checkTargetLevel()) {
			this.targetReached = true;
			this.returnToBank();
		}

		// Opening the bank interrupts Make-All when the equipped amulet breaks.
		if (
			this.observing &&
			this.batch?.job.chemistry &&
			this.settings.chemistry &&
			!game.equipped(CHEMISTRY)
		) {
			game.log('Amulet of chemistry depleted; returning to the bank.');
			this.returnToBank();
		}

		if (this.pending) {
			const pending = this.pending;
			if (pending.check()) {
				this.pending = null;
				pending.done();
			} else if (--pending.ticks <= 0)
				this.stop(
					'Timed out: ' +
						pending.label +
						'. Check the bank/menu and script log.',
				);
			return;
		}

		// Do not allow an unexpected bank closure to turn a withdrawal into a loop.
		if (
			(this.state === 'deposit' ||
				this.state === 'plan' ||
				this.state === 'withdraw') &&
			!game.bankOpen()
		) {
			this.returnToBank();
			return;
		}

		switch (this.state) {
			case 'bank': {
				if (game.bankOpen()) this.state = 'deposit';
				else
					this.wait(
						'open nearby bank',
						() => game.openBank(),
						() => game.bankOpen(),
						() => {
							this.state = 'deposit';
						},
						25,
					);
				break;
			}
			case 'plan': {
				if (this.phases.length === 0) {
					this.stop('No tasks selected for any enabled skill.');
					break;
				}
				const current = this.currentPhase;
				if (!current) {
					if (game.emptySlots() < 28) {
						this.wait(
							'deposit inventory',
							() => game.deposit(),
							() => game.emptySlots() === 28,
							() => {
								this.stop(
									'All tasks across enabled skills completed; inventory deposited.',
								);
							},
						);
						break;
					}
					this.stop(
						'All tasks across enabled skills completed; inventory deposited.',
					);
					break;
				}
				if (this.checkTargetLevel()) {
					game.log(
						`[${current.skill}] Target level ${this.settings.targetLevel} reached.`,
					);
					if (game.emptySlots() < 28) {
						this.wait(
							'deposit inventory',
							() => game.deposit(),
							() => game.emptySlots() === 28,
							() => {
								if (!this.advancePhase()) {
									this.stop('Target level reached; inventory deposited.');
								}
							},
						);
						break;
					}
					if (!this.advancePhase()) {
						this.stop('Target level reached; inventory deposited.');
					}
					break;
				}
				if (game.noted()) {
					this.wait(
						'switch bank to Item mode',
						() => game.unnoted(),
						() => !game.noted(),
						() => {},
					);
					break;
				}

				this.batch = selectBatch(
					current.jobs,
					game.level(current.skill),
					(id) =>
						game.bank(id) +
						(current.jobs.some((j) => j.tool === id)
							? game.inventory(id)
							: 0),
					this.settings.progressive,
				);

				if (!this.batch) {
					for (const job of current.jobs) {
						const missing = job.inputs.filter(
							(id) => game.bank(id) < 1,
						);
						if (
							missing.length > 0 ||
							job.level > game.level(current.skill)
						) {
							game.log(
								`[${current.skill}] ${job.label}: ` +
									(job.level > game.level(current.skill)
										? 'requires level ' + job.level
										: 'missing item IDs ' +
											missing.join(', ')),
							);
						}
					}
					game.log(
						`[${current.skill}] No more doable tasks with current supplies.`,
					);
					if (game.emptySlots() < 28) {
						this.wait(
							'deposit inventory',
							() => game.deposit(),
							() => game.emptySlots() === 28,
							() => {
								if (!this.advancePhase()) {
									this.stop(
										'All tasks across enabled skills completed; inventory deposited.',
									);
								}
							},
						);
						break;
					}
					if (!this.advancePhase()) {
						this.stop(
							'All tasks across enabled skills completed; inventory deposited.',
						);
					}
					break;
				}

				if (
					current.skill === 'Herblore' &&
					this.settings.chemistry &&
					this.batch.job.chemistry &&
					!game.equipped(CHEMISTRY)
				) {
					if (game.alchemistEquipped()) {
						this.stop(
							"Remove the Alchemist's amulet or disable Use Amulets of Chemistry.",
						);
						break;
					}
					if (game.bank(CHEMISTRY) < 1) {
						game.log('No Amulets of Chemistry left in the bank.');
						if (!this.advancePhase()) {
							this.stop(
								'No Amulets of Chemistry left in the bank.',
							);
						}
						break;
					}
					this.wait(
						'withdraw Amulet of chemistry',
						() => game.withdraw(CHEMISTRY, 1),
						() => game.inventory(CHEMISTRY) === 1,
						() => {
							this.state = 'equip-close';
						},
					);
					break;
				}

				game.log(
					`[${current.skill}] ` +
						this.batch.job.label +
						' | batch ' +
						this.batch.quantity +
						' | level ' +
						game.level(current.skill),
				);
				this.withdrawalIndex = 0;
				this.withdrawalTicks = 0;
				this.withdrawalAttempts = 0;

				const tool = this.batch.job.tool;
				const needsDeposit =
					tool !== undefined && game.inventory(tool) > 0
						? game.heldItemIds().some((id) => id !== tool)
						: game.emptySlots() < 28;

				if (needsDeposit) {
					this.state = 'deposit';
				} else {
					this.state = 'withdraw';
				}
				break;
			}
			case 'deposit': {
				const tool =
					this.batch?.job.tool ??
					this.currentPhase?.jobs.find(
						(j) =>
							j.tool !== undefined && game.inventory(j.tool) > 0,
					)?.tool;
				if (tool !== undefined && game.inventory(tool) > 0) {
					const toDeposit = game
						.heldItemIds()
						.filter((id) => id !== tool);
					if (toDeposit.length === 0) {
						this.state = 'plan';
						break;
					}
					const target = toDeposit[0];
					this.wait(
						'deposit item ' + target,
						() => game.deposit(target),
						() => game.inventory(target) === 0,
						() => this.microDelay(1, 2),
					);
				} else {
					if (game.emptySlots() === 28) {
						this.state = 'plan';
					} else {
						this.wait(
							'deposit inventory',
							() => game.deposit(),
							() => game.emptySlots() === 28,
							() => {
								this.state = 'plan';
								this.microDelay(1, 2);
							},
						);
					}
				}
				break;
			}
			case 'equip-close': {
				this.wait(
					'close bank to equip amulet',
					() => game.closeBank(),
					() => !game.bankOpen(),
					() => {
						this.state = 'equip';
					},
				);
				break;
			}
			case 'equip': {
				this.wait(
					'equip Amulet of chemistry',
					() => game.wear(CHEMISTRY),
					() => game.equipped(CHEMISTRY),
					() => {
						this.returnToBank();
					},
				);
				break;
			}
			case 'withdraw': {
				const batch = this.batch;
				if (!batch) {
					this.stop('Missing batch.');
					break;
				}
				const items = batch.job.tool
					? [batch.job.tool, ...batch.job.inputs]
					: batch.job.inputs;
				const id = items[this.withdrawalIndex];
				const requested = id === batch.job.tool ? 1 : batch.quantity;
				if (id === undefined) {
					this.state = 'close';
					break;
				}
				const held = game.inventory(id);
				// The bank helper may still be working after its first inventory delta.
				// Wait for completion before issuing the next ingredient request.
				if (game.bankBusy()) {
					if (++this.withdrawalTicks > 30) {
						this.stop(
							'Bank operation did not finish: item ' +
								id +
								', inventory ' +
								held +
								'/' +
								batch.quantity +
								'.',
						);
					}
					break;
				}
				if (this.withdrawalAttempts > 0) this.withdrawalTicks++;
				if (
					held >= requested ||
					(held > 0 && this.withdrawalTicks >= 15)
				) {
					game.log(
						'Withdraw confirmed: item ' +
							id +
							', inventory ' +
							held +
							', requested ' +
							batch.quantity +
							'.',
					);
					if (id !== batch.job.tool)
						batch.quantity = Math.min(batch.quantity, held);
					this.withdrawalIndex++;
					this.withdrawalAttempts = 0;
					this.withdrawalTicks = 0;
					this.microDelay(1, 2);
					break;
				}
				if (this.withdrawalAttempts > 0 && this.withdrawalTicks < 15)
					break;
				if (this.withdrawalAttempts >= 3) {
					this.stop(
						'Timed out: withdraw ' +
							batch.quantity +
							' of item ' +
							id +
							'. Inventory=' +
							held +
							', bank=' +
							game.bank(id) +
							', noted=' +
							game.noted() +
							'.',
					);
					break;
				}
				if (game.noted()) {
					game.unnoted();
					break;
				}
				this.withdrawalAttempts++;
				this.withdrawalTicks = 0;
				game.log(
					'Withdraw attempt ' +
						this.withdrawalAttempts +
						'/3: item ' +
						id +
						', missing ' +
						(requested - held) +
						', bank=' +
						game.bank(id) +
						'.',
				);
				game.withdraw(id, requested - held);
				break;
			}
			case 'close': {
				this.wait(
					'close bank',
					() => game.closeBank(),
					() => !game.bankOpen(),
					() => {
						this.lastOutput = this.outputCount();
						this.observing = true;
						this.retries = 0;
						this.state = 'work';
						this.microDelay(1, 3);
					},
				);
				break;
			}
			case 'work': {
				const job = this.batch?.job;
				if (!job) {
					this.stop('Missing job.');
					break;
				}
				if (game.bankOpen()) {
					this.returnToBank();
					break;
				}
				const currentSkill = this.currentPhase?.skill;
				if (job.level > game.level(currentSkill)) {
					this.returnToBank();
					break;
				}
				if (job.inputs.some((id) => game.inventory(id) < 1)) {
					this.returnToBank();
					break;
				}
				const first = job.inputs[0];
				if (job.kind === 'clean') {
					const before = game.inventory(first);
					const outputBefore = this.outputCount();
					this.wait(
						'clean herb ' + first,
						() => game.clean(first),
						() =>
							game.inventory(first) < before &&
							this.outputCount() > outputBefore,
						() => {},
					);
				} else {
					this.directActive = false;
					this.menuOutput = this.outputCount();
					game.combine(
						job.tool ?? first,
						job.tool ? first : job.inputs[1],
					);
					this.idleTicks = 0;
					this.state = 'menu';
				}
				break;
			}
			case 'menu': {
				if (game.makeVisible(this.batch?.job)) {
					game.makeAll();
					this.state = 'make';
				} else if (this.outputCount() > this.menuOutput) {
					this.directActive = !!this.batch?.job.direct;
					// Some actions can start directly, without the quantity menu.
					this.state = 'mix';
					this.idleTicks = 0;
				} else if (++this.idleTicks > 12) this.retryMix();
				break;
			}
			case 'make': {
				if (game.makeVisible(this.batch?.job)) {
					game.log(
						'Clicking Make for ' + this.batch?.job.label + '.',
					);
					game.make(this.batch?.job);
				}
				this.state = 'mix';
				this.idleTicks = 0;
				break;
			}
			case 'mix': {
				const job = this.batch?.job;
				if (!job) {
					this.stop('Missing recipe.');
					break;
				}
				if (job.inputs.some((id) => game.inventory(id) < 1)) {
					this.returnToBank();
					break;
				}
				if (produced && this.maybeAfk('making ' + job.label)) break;
				if (this.directActive && ++this.idleTicks >= 2) {
					this.state = 'work';
					break;
				}
				if (!this.directActive) this.idleTicks++;
				if (this.idleTicks === 8) game.continueDialogue();
				if (this.idleTicks > 15) this.retryMix();
				break;
			}
		}
	}

	private retryMix(): void {
		if (++this.retries > 3) {
			this.stop(
				'No production confirmed for ' +
					this.batch?.job.label +
					'. Check requirements and the Make menu.',
			);
			return;
		}
		this.game.log('Production interrupted; retry ' + this.retries + '/3.');
		this.state = 'work';
	}
}
