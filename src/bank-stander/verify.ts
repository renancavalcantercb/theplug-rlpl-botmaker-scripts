import { CRAFTING, craftingJobs, CHISEL } from './crafting.js';
import { FLETCHING, fletchingJobs } from './fletching.js';
import {
	FARMING,
	FILLED_PLANT_POT,
	GARDENING_TROWEL,
	SEEDLINGS,
	WATERING_CANS,
	farmingJobs,
} from './farming.js';
/** Run outside the client: node node_modules/tsx/dist/cli.mjs src/bank-stander/verify.ts */
import {
	BEST_POTION,
	HERBS,
	POTIONS,
	jobsFor,
	selectBatch,
	type Settings,
} from './herblore.js';
import { CHEMISTRY, HerbloreRunner, type Game } from './runner.js';

declare const console: { log(message: string): void };
let checks = 0;
const check = (condition: boolean, message: string): void => {
	if (!condition) throw new Error(message);
	checks++;
};
const settings = (): Settings => ({
	progressive: true,
	chemistry: false,
	targetLevel: 0,
	herbs: {},
});
const all = settings();
for (const herb of HERBS)
	all.herbs[herb.key] = { clean: true, unfinished: true, potion: '' };
const jobs = jobsFor(all);
check(
	HERBS.length === 15 && POTIONS.length === 28,
	'Complete requested herb catalog and 28 recipes',
);
for (const herb of HERBS) {
	check(
		herb.grimy !== herb.clean && herb.clean !== herb.unf,
		herb.name + ' distinct stages',
	);
	const cleanJob = jobs.filter((job) => job.key === herb.key + '.clean');
	check(
		selectBatch(cleanJob, herb.cleanLevel - 1, () => 100, true) === null,
		herb.name + ' cleaning level lock',
	);
	check(
		selectBatch(cleanJob, herb.cleanLevel, () => 100, true)?.quantity ===
			28,
		herb.name + ' 28 herbs',
	);
	const unfJob = jobs.filter((job) => job.key === herb.key + '.unfinished');
	check(
		selectBatch(unfJob, herb.unfLevel - 1, () => 100, true) === null,
		herb.name + ' unfinished level lock',
	);
	check(
		selectBatch(unfJob, herb.unfLevel, () => 100, true)?.quantity === 14,
		herb.name + ' 14 pairs',
	);
}
const selection = settings();
selection.herbs.guam = {
	clean: true,
	unfinished: true,
	potion: 'Attack potion',
};
selection.herbs.marrentill = { clean: true, unfinished: false, potion: '' };
const selectedJobs = jobsFor(selection);
const count = (id: number): number =>
	({ 199: 100, 201: 100, 249: 14, 227: 3, 91: 8, 221: 2 })[id] ?? 0;
check(
	selectBatch(selectedJobs, 3, count, true)?.job.kind === 'finished',
	'Finish available intermediates first at equal level',
);
check(
	selectBatch(selectedJobs, 3, count, true)?.quantity === 2,
	'Partial batch limited by secondary',
);
check(
	selectBatch(selectedJobs, 5, count, true)?.job.key === 'marrentill.clean',
	'Progression selects newly unlocked task',
);
check(
	selectBatch(selectedJobs, 5, count, false)?.job.key === 'guam.finished',
	'Nonprogressive respects list order',
);
check(selectBatch(selectedJobs, 99, () => 0, true) === null, 'No empty batch');
check(jobsFor(settings()).length === 0, 'Unchecked tasks are never implied');

class FakeGame implements Game {
	stock: Record<number, number> = {};
	bag: Record<number, number> = {};
	logs: string[] = [];
	counts: Record<string, number> = {};
	actions: string[] = [];
	lvl = 3;
	online = true;
	opened = false;
	noteMode = true;
	amulet = false;
	alchemist = false;
	stopped = false;
	menu = false;
	allChosen = false;
	production = false;
	failWithdraw = false;
	dropFirstWithdrawal = false;
	partialWithdrawal = false;
	failClean = false;
	failMake = false;
	failBank = false;
	breakAfter = 0;
	made = 0;
	first = 0;
	second = 0;
	delay = 0;
	queued: Array<{ ticks: number; action: () => void }> = [];
	loggedIn(): boolean {
		return this.online;
	}
	level(): number {
		return this.lvl;
	}
	realLevel(): number {
		return this.lvl;
	}
	inventory(id: number): number {
		return this.bag[id] ?? 0;
	}
	bank(id: number): number {
		return this.stock[id] ?? 0;
	}
	emptySlots(): number {
		return (
			28 -
			Object.keys(this.bag).reduce(
				(sum, id) => sum + this.inventory(Number(id)),
				0,
			)
		);
	}
	bankOpen(): boolean {
		return this.opened;
	}
	bankBusy(): boolean {
		return this.queued.length > 0;
	}
	later(action: () => void): void {
		this.queued.push({ ticks: this.delay, action });
	}
	openBank(): void {
		this.actions.push('open');
		if (!this.failBank)
			this.later(() => {
				this.opened = true;
				this.production = false;
				this.menu = false;
			});
	}
	closeBank(): void {
		this.later(() => {
			this.opened = false;
		});
	}
	heldItemIds(): number[] {
		return Object.keys(this.bag)
			.map(Number)
			.filter((id) => (this.bag[id] ?? 0) > 0);
	}
	deposit(id?: number): void {
		check(this.opened, 'Deposit only at an open bank');
		this.actions.push(id !== undefined ? 'deposit:' + id : 'deposit');
		this.later(() => {
			if (id !== undefined) {
				const qty = this.inventory(id);
				this.stock[id] = this.bank(id) + qty;
				delete this.bag[id];
			} else {
				for (const key of Object.keys(this.bag)) {
					const itemId = Number(key);
					this.stock[itemId] =
						this.bank(itemId) + this.inventory(itemId);
				}
				this.bag = {};
			}
		});
	}
	noted(): boolean {
		return this.noteMode;
	}
	unnoted(): void {
		this.later(() => {
			this.noteMode = false;
		});
	}
	withdraw(id: number, quantity: number): void {
		check(
			this.opened && !this.noteMode,
			'Withdraw only from open bank in Item mode',
		);
		this.actions.push('withdraw:' + id + ':' + quantity);
		if (this.dropFirstWithdrawal) {
			this.dropFirstWithdrawal = false;
			return;
		}
		if (!this.failWithdraw)
			this.later(() => {
				const amount = Math.min(
					this.partialWithdrawal ? 5 : quantity,
					this.bank(id),
				);
				this.stock[id] = this.bank(id) - amount;
				this.bag[id] = this.inventory(id) + amount;
			});
	}
	equipped(id: number): boolean {
		return id === CHEMISTRY && this.amulet;
	}
	alchemistEquipped(): boolean {
		return this.alchemist;
	}
	wear(id: number): void {
		this.later(() => {
			this.bag[id]--;
			this.amulet = true;
		});
	}
	clean(id: number): void {
		this.actions.push('clean:' + id);
		if (!this.failClean)
			this.later(() => {
				const herb = HERBS.find((entry) => entry.grimy === id);
				if (!herb || this.inventory(id) < 1)
					throw new Error('Invalid clean');
				this.bag[id]--;
				this.bag[herb.clean] = this.inventory(herb.clean) + 1;
			});
	}
	combine(first: number, second: number): void {
		this.actions.push('combine');
		this.first = first;
		this.second = second;
		if (!this.failMake) {
			this.menu = true;
			this.allChosen = false;
		}
	}
	makeVisible(): boolean {
		return this.menu;
	}
	makeAll(): void {
		this.allChosen = true;
	}
	make(): void {
		check(this.menu && this.allChosen, 'Choose All before Make');
		this.menu = false;
		this.production = true;
	}
	continueDialogue(): void {
		this.actions.push('continue');
	}
	log(message: string): void {
		this.logs.push(message);
	}
	counter(name: string, value: number): void {
		this.counts[name] = value;
	}
	terminate(): void {
		this.stopped = true;
	}
	advance(): void {
		if (!this.online) return;
		this.queued = this.queued.filter((pending) => {
			if (--pending.ticks <= 0) {
				pending.action();
				return false;
			}
			return true;
		});
		if (
			this.production &&
			this.inventory(this.first) > 0 &&
			this.inventory(this.second) > 0
		) {
			const herb = HERBS.find(
				(entry) =>
					entry.clean === this.first || entry.unf === this.first,
			);
			if (!herb) throw new Error('Unknown recipe input');
			const potion = POTIONS.find(
				(entry) =>
					entry.herb === herb.key && entry.secondary === this.second,
			);
			const output = this.second === 227 ? herb.unf : potion?.outputs[0];
			if (output === undefined) throw new Error('Unknown recipe output');
			this.bag[this.first]--;
			this.bag[this.second]--;
			this.bag[output] = this.inventory(output) + 1;
			this.made++;
			if (this.breakAfter > 0 && this.made === this.breakAfter) {
				this.amulet = false;
				this.production = false;
			}
		}
	}
}

const run = (game: FakeGame, config: Settings, limit = 1500): void => {
	const runner = new HerbloreRunner(game, config);
	for (let tick = 0; tick < limit && !game.stopped; tick++) {
		game.advance();
		runner.tick();
	}
	check(
		game.stopped,
		'Runner terminates within bounded ticks: ' + game.logs.join(' | '),
	);
};
const chain = settings();
chain.herbs.guam = { clean: true, unfinished: true, potion: 'Attack potion' };
const game = new FakeGame();
game.stock = { 199: 31, 227: 31, 221: 31 };
game.delay = 3;
run(game, chain);
check(
	game.bank(121) === 31 && game.emptySlots() === 28,
	'Full cleaning -> unfinished -> finished chain, including remainder deposited',
);
check(
	game.counts['Herblore clean'] === 31 &&
		game.counts['Herblore unfinished'] === 31 &&
		game.counts['Herblore finished'] === 31,
	'Counts reflect confirmed output',
);
check(
	game.actions.filter((action) => action === 'clean:199').length === 31,
	'Exactly one click per herb despite delayed inventory changes',
);

const fail = new FakeGame();
fail.stock = { 199: 28 };
fail.failWithdraw = true;
run(fail, chain);
check(
	fail.logs.some((line) => line.includes('Timed out: withdraw')),
	'Unconfirmed withdrawal times out',
);
check(
	fail.actions.filter((action) => action === 'clean:199').length === 0,
	'No production after failed withdrawal',
);
const unclean = new FakeGame();
unclean.stock = { 199: 28 };
unclean.failClean = true;
run(unclean, chain);
check(
	unclean.actions.filter((action) => action === 'clean:199').length === 1,
	'Failed cleaning does not spam duplicate clicks',
);
const brokenMenu = new FakeGame();
brokenMenu.stock = { 249: 14, 227: 14 };
brokenMenu.failMake = true;
run(brokenMenu, chain);
check(
	brokenMenu.actions.filter((action) => action === 'combine').length === 4,
	'Missing menu bounded to initial attempt plus three retries',
);
const noBank = new FakeGame();
noBank.failBank = true;
run(noBank, chain);
check(
	noBank.actions.filter((action) => action === 'open').length === 1,
	'Cannot open nearby bank: stop without travelling or repeated requests',
);

const withChemistry = settings();
withChemistry.chemistry = true;
withChemistry.herbs.guam = {
	clean: false,
	unfinished: false,
	potion: 'Attack potion',
};
const amulets = new FakeGame();
amulets.stock = { 91: 14, 221: 14, [CHEMISTRY]: 2 };
amulets.breakAfter = 3;
run(amulets, withChemistry);
check(
	amulets.bank(121) === 14 && amulets.bank(CHEMISTRY) === 0 && amulets.amulet,
	'Replace broken amulet and finish the interrupted batch',
);
const noAmulet = new FakeGame();
noAmulet.stock = { 91: 14, 221: 14 };
run(noAmulet, withChemistry);
check(
	noAmulet.made === 0 &&
		noAmulet.logs.some((line) => line.includes('No Amulets')),
	'Chemistry requested without stock stops before production',
);
const alchemist = new FakeGame();
alchemist.stock = { 91: 14, 221: 14, [CHEMISTRY]: 1 };
alchemist.alchemist = true;
run(alchemist, withChemistry);
check(
	alchemist.made === 0 && alchemist.bank(CHEMISTRY) === 1,
	'Do not replace Alchemist amulet',
);

const targetConfig = settings();
targetConfig.targetLevel = 3;
targetConfig.herbs = chain.herbs;
const atTarget = new FakeGame();
atTarget.bag = { 249: 5 };
atTarget.stock = { 199: 28 };
run(atTarget, targetConfig);
check(
	atTarget.bank(249) === 5 && atTarget.bank(199) === 28,
	'Target level deposits inventory and prevents further production',
);
const offline = new FakeGame();
offline.online = false;
const paused = new HerbloreRunner(offline, chain);
for (let tick = 0; tick < 100; tick++) paused.tick();
check(
	offline.actions.length === 0 && !offline.stopped,
	'Logged out: no actions or expired timers',
);
const missedClick = new FakeGame();
missedClick.stock = { 249: 10, 227: 10 };
missedClick.dropFirstWithdrawal = true;
run(missedClick, chain);
check(
	missedClick.bank(91) === 10,
	'A missed withdrawal is retried and the batch completes',
);
const partial = new FakeGame();
partial.stock = { 249: 10, 227: 10 };
partial.partialWithdrawal = true;
run(partial, chain);
check(
	partial.bank(91) === 10,
	'Partial withdrawals produce smaller batches without losing supplies',
);

// Human timing: same results as the instant runner, just slower and with AFKs.
const seeded = (seed: number): (() => number) => {
	let state = seed;
	return () => {
		state = (state * 1664525 + 1013904223) % 4294967296;
		return state / 4294967296;
	};
};
const ticksToFinish = (
	game: FakeGame,
	config: Settings,
	random?: () => number,
	limit = 20000,
): number => {
	const runner = new HerbloreRunner(game, config, random);
	let tick = 0;
	for (; tick < limit && !game.stopped; tick++) {
		game.advance();
		runner.tick();
	}
	check(
		game.stopped,
		'Humanized runner terminates: ' + game.logs.join(' | '),
	);
	return tick;
};
const chainStock = (): Record<number, number> => ({
	199: 31,
	227: 31,
	221: 31,
});
const instant = new FakeGame();
instant.stock = chainStock();
instant.delay = 3;
const instantTicks = ticksToFinish(instant, chain);

const normalConfig: Settings = {
	...chain,
	playStyle: 'normal',
	randomAfk: false,
};
const normal = new FakeGame();
normal.stock = chainStock();
normal.delay = 3;
const normalTicks = ticksToFinish(normal, normalConfig, seeded(7));
check(
	normal.bank(121) === 31 &&
		normal.counts['Herblore finished'] === 31 &&
		normal.emptySlots() === 28,
	'Normal play style completes the same chain',
);
check(normalTicks > instantTicks, 'Normal play style adds reaction delays');
check(
	!normal.logs.some((line) => line.includes('Going AFK')),
	'Random AFKs off: no AFK breaks',
);

const lazy = new FakeGame();
lazy.stock = chainStock();
lazy.delay = 3;
const lazyTicks = ticksToFinish(
	lazy,
	{ ...chain, playStyle: 'lazy', randomAfk: false },
	seeded(7),
);
check(lazy.bank(121) === 31, 'Lazy play style completes the same chain');
check(lazyTicks > normalTicks, 'Lazy play style is slower than Normal');

// random() = 0 always rolls the AFK: breaks happen, with cooldown, and nothing is lost.
const afkGame = new FakeGame();
afkGame.stock = chainStock();
afkGame.delay = 3;
ticksToFinish(
	afkGame,
	{ ...chain, playStyle: 'normal', randomAfk: true },
	() => 0,
);
const afkBreaks = afkGame.logs.filter((line) =>
	line.includes('Going AFK'),
).length;
check(
	afkBreaks > 0 && afkGame.counts['AFK Breaks'] === afkBreaks,
	'AFK breaks are logged and counted',
);
check(
	afkGame.bank(121) === 31 && afkGame.counts['Herblore finished'] === 31,
	'AFK breaks never lose or skip production',
);
check(
	afkGame.logs.some((line) =>
		line.includes('Play style: Normal, AFK chance this run'),
	),
	'AFK chance is rolled and logged once per run',
);

// "Best available" potion: highest recipe of the herb that the level and bank allow.
const bestConfig = settings();
bestConfig.herbs.dwarf = {
	clean: false,
	unfinished: false,
	potion: BEST_POTION,
};
const bestJobs = jobsFor(bestConfig);
const plenty = (): number => 100;
const noMenaphiteSecondary = (id: number): number => (id === 27272 ? 0 : 100);
check(
	bestJobs.length ===
		POTIONS.filter((entry) => entry.herb === 'dwarf').length,
	'Best available lists every recipe of the herb',
);
check(
	selectBatch(bestJobs, 80, plenty, true)?.job.label.startsWith(
		'Ranging potion',
	) === true,
	'Best available at 80: Ranging potion (Menaphite needs 88)',
);
check(
	selectBatch(bestJobs, 90, plenty, true)?.job.label.startsWith(
		'Menaphite remedy',
	) === true,
	'Best available at 90: Menaphite remedy',
);
check(
	selectBatch(bestJobs, 90, plenty, false)?.job.label.startsWith(
		'Menaphite remedy',
	) === true,
	'Best available also picks the highest when not progressive',
);
check(
	selectBatch(bestJobs, 90, noMenaphiteSecondary, true)?.job.label.startsWith(
		'Ranging potion',
	) === true,
	'Best available falls back when the best secondary is missing',
);
check(
	jobsFor(selection).filter((job) => job.kind === 'finished').length === 1,
	'A specific potion still creates exactly one recipe',
);
const bestRun = new FakeGame();
bestRun.lvl = 90;
bestRun.stock = { 109: 14, 245: 14, 27272: 5 };
run(bestRun, bestConfig);
check(
	bestRun.bank(27205) === 5 &&
		bestRun.bank(169) === 9 &&
		bestRun.bank(109) === 0,
	'Best available makes the top recipe until its secondary runs out, then the next',
);
console.log('Bank Stander: ' + checks + ' checks passed.');

const fSettings: Settings = {
	skill: 'Fletching',
	progressive: true,
	chemistry: false,
	targetLevel: 0,
	herbs: {},
	fletching: FLETCHING.map((job) => job.key),
};
check(FLETCHING.length === 54, '54 fletching recipes');
check(
	selectBatch(
		fletchingJobs(fSettings),
		99,
		(id) => (id === 946 ? 0 : 100),
		true,
	)?.job.kind !== 'cut',
	'Missing knife excludes cutting',
);
class FletchGame extends FakeGame {
	active = FLETCHING[0];
	directMode = false;
	combine(first: number, second: number): void {
		check(
			this.inventory(first) > 0 && this.inventory(second) > 0,
			'Fletching has both items',
		);
		if (this.directMode) this.produce();
		else super.combine(first, second);
	}
	produce(): void {
		if (this.active.inputs.some((id) => this.inventory(id) < 1)) return;
		const amount = this.directMode
			? Math.min(
					10,
					...this.active.inputs.map((id) => this.inventory(id)),
				)
			: 1;
		for (const id of this.active.inputs) this.bag[id] -= amount;
		const out = this.active.outputs[0];
		this.bag[out] = this.inventory(out) + amount;
	}
	advance(): void {
		const producing = this.production;
		this.production = false;
		super.advance();
		this.production = producing && !this.opened;
		if (this.production) this.produce();
	}
}
for (const label of [
	'Cut Oak longbow (u)',
	'String Magic longbow',
	'Dragon darts',
	'Rune bolts',
	'Headless arrows',
]) {
	for (const direct of [false, true]) {
		const g = new FletchGame();
		g.lvl = 99;
		g.active = FLETCHING.find((job) => job.key === label)!;
		g.directMode = direct && !!g.active.direct;
		g.delay = 2;
		for (const id of g.active.inputs) g.stock[id] = 20;
		if (g.active.tool) g.stock[g.active.tool] = 1;
		run(g, { ...fSettings, fletching: [label] });
		check(
			g.bank(g.active.outputs[0]) === 20,
			label + ' completes and deposits',
		);
		if (g.active.tool)
			check(g.bank(g.active.tool) === 1, 'Knife is retained');
	}
}
console.log('Bank Stander with Fletching: ' + checks + ' checks passed.');

const cSettings: Settings = {
	skill: 'Crafting',
	progressive: true,
	chemistry: false,
	targetLevel: 0,
	herbs: {},
	crafting: CRAFTING.map((job) => job.key),
};
check(CRAFTING.length === 8, '8 gem cutting recipes');
for (const gem of CRAFTING) {
	check(gem.tool === CHISEL, gem.label + ' requires chisel');
	check(gem.limit === 27, gem.label + ' limit is 27 gems');
	check(gem.kind === 'gems', gem.label + ' kind is gems');
}
check(
	selectBatch(
		craftingJobs(cSettings),
		99,
		(id) => (id === CHISEL ? 0 : 100),
		true,
	) === null,
	'Missing chisel excludes gem cutting',
);
check(
	selectBatch(craftingJobs(cSettings), 99, (id) => 100, true)?.quantity ===
		27,
	'27 gems per batch with chisel',
);
// Test level lock: Opal at 1, Sapphire at 20
check(
	selectBatch(
		craftingJobs({ ...cSettings, crafting: ['Cut Sapphire'] }),
		19,
		() => 100,
		true,
	) === null,
	'Sapphire locked below level 20',
);
check(
	selectBatch(
		craftingJobs({ ...cSettings, crafting: ['Cut Sapphire'] }),
		20,
		() => 100,
		true,
	)?.job.key === 'Cut Sapphire',
	'Sapphire unlocked at level 20',
);

class CraftGame extends FakeGame {
	active = CRAFTING[3]; // Cut Sapphire
	advance(): void {
		const producing = this.production;
		this.production = false;
		super.advance();
		this.production = producing && !this.opened;
		if (
			this.production &&
			this.inventory(this.first) > 0 &&
			this.inventory(this.second) > 0
		) {
			const uncut = this.first === CHISEL ? this.second : this.first;
			this.bag[uncut]--;
			const out = this.active.outputs[0];
			this.bag[out] = this.inventory(out) + 1;
			this.made++;
		}
	}
}

const cg = new CraftGame();
cg.lvl = 20;
cg.stock[CHISEL] = 1;
cg.stock[1623] = 27; // 27 uncut sapphires
run(cg, { ...cSettings, crafting: ['Cut Sapphire'] });
check(cg.bank(1607) === 27, '27 cut sapphires in bank');
check(cg.bank(CHISEL) === 1, 'Chisel is retained in bank');

// Multi-batch test: Chisel must NOT be deposited/re-withdrawn between batches
const cg2 = new CraftGame();
cg2.lvl = 20;
cg2.stock[CHISEL] = 1;
cg2.stock[1623] = 54; // 54 uncut sapphires = 2 batches of 27
run(cg2, { ...cSettings, crafting: ['Cut Sapphire'] }, 3000);
check(cg2.bank(1607) === 54, '54 cut sapphires in bank across 2 batches');
check(
	cg2.bank(CHISEL) === 1,
	'Chisel is retained in bank after all batches finished',
);
const chiselWithdrawals = cg2.actions.filter(
	(a) => a === 'withdraw:' + CHISEL + ':1',
).length;
check(
	chiselWithdrawals === 1,
	'Chisel withdrawn only ONCE across multiple batches (actual: ' +
		chiselWithdrawals +
		')',
);

// Pre-held chisel test: Starting with chisel already in inventory should withdraw it 0 times
const cg3 = new CraftGame();
cg3.lvl = 20;
cg3.bag[CHISEL] = 1; // pre-held
cg3.stock[1623] = 27;
run(cg3, { ...cSettings, crafting: ['Cut Sapphire'] });
check(cg3.bank(1607) === 27, '27 cut sapphires in bank with pre-held chisel');
check(
	cg3.bank(CHISEL) === 1,
	'Pre-held chisel retained in bank upon script completion',
);
const preHeldWithdrawals = cg3.actions.filter(
	(a) => a === 'withdraw:' + CHISEL + ':1',
).length;
check(
	preHeldWithdrawals === 0,
	'Pre-held chisel withdrawn 0 times (actual: ' + preHeldWithdrawals + ')',
);

console.log('Bank Stander with Crafting: ' + checks + ' checks passed.');

// Multi-Skill Chaining Test: Herblore -> Crafting -> Fletching in sequence
const multiSettings: Settings = {
	skills: ['Herblore', 'Crafting', 'Fletching'],
	progressive: true,
	chemistry: false,
	targetLevel: 0,
	herbs: {
		guam: { clean: true, unfinished: false, potion: '' },
	},
	crafting: ['Cut Sapphire'],
	fletching: ['Cut Shortbow (u)'],
};

class MultiSkillGame extends FakeGame {
	advance(): void {
		const producing = this.production;
		this.production = false;
		super.advance();
		this.production = producing && !this.opened;
		if (
			this.production &&
			this.inventory(this.first) > 0 &&
			this.inventory(this.second) > 0
		) {
			// Crafting gems (Chisel 1755 + Uncut Sapphire 1623 -> Cut Sapphire 1607)
			if (this.first === CHISEL || this.second === CHISEL) {
				const uncut = this.first === CHISEL ? this.second : this.first;
				this.bag[uncut]--;
				this.bag[1607] = this.inventory(1607) + 1;
				this.made++;
			}
			// Fletching bows (Knife 946 + Normal logs 1511 -> Shortbow (u) 50)
			else if (this.first === 946 || this.second === 946) {
				const logs = this.first === 946 ? this.second : this.first;
				this.bag[logs]--;
				this.bag[50] = this.inventory(50) + 1;
				this.made++;
			}
		}
	}
}

const mg = new MultiSkillGame();
mg.lvl = 99;
mg.delay = 1;
// Initial supplies:
mg.stock[199] = 28; // 28 grimy guam
mg.stock[CHISEL] = 1;
mg.stock[1623] = 27; // 27 uncut sapphires
mg.stock[946] = 1; // knife
mg.stock[1511] = 27; // 27 normal logs

run(mg, multiSettings, 3000);

check(
	mg.bank(249) === 28,
	'Multi-skill: 28 clean guam herbs deposited from Herblore phase',
);
check(
	mg.bank(1607) === 27,
	'Multi-skill: 27 cut sapphires deposited from Crafting phase',
);
check(
	mg.bank(50) === 27,
	'Multi-skill: 27 shortbow (u) deposited from Fletching phase',
);
check(mg.bank(CHISEL) === 1, 'Multi-skill: Chisel retained in bank');
check(mg.bank(946) === 1, 'Multi-skill: Knife retained in bank');
check(
	mg.counts['Herblore clean'] === 28,
	'Multi-skill: Herblore clean counter is 28',
);
check(
	mg.counts['Crafting gems'] === 27,
	'Multi-skill: Crafting gems counter is 27',
);
check(
	mg.counts['Fletching cut'] === 27,
	'Multi-skill: Fletching cut counter is 27',
);
check(
	mg.stopped,
	'Multi-skill: Runner gracefully terminated after completing all queues',
);

console.log('Bank Stander with Multi-Skill: ' + checks + ' checks passed.');

const farmSettings: Settings = {
	skill: 'Farming',
	progressive: true,
	chemistry: false,
	targetLevel: 0,
	herbs: {},
	farming: SEEDLINGS.map((recipe) => recipe.key),
};
check(SEEDLINGS.length === 24, '24 seedling recipes');
check(
	FARMING.length === SEEDLINGS.length * 2,
	'Each seedling has planting and watering jobs',
);
const oak = SEEDLINGS.find((recipe) => recipe.key === 'oak')!;
const redwood = SEEDLINGS.find((recipe) => recipe.key === 'redwood')!;
const staged = selectBatch(
	farmingJobs(farmSettings),
	99,
	(id) =>
		({
			[GARDENING_TROWEL]: 1,
			[FILLED_PLANT_POT]: 1,
			[oak.seed]: 1,
			[redwood.seedling]: 1,
			[WATERING_CANS[0]]: 1,
		})[id] ?? 0,
	true,
);
check(staged?.job.key === 'oak', 'Planting finishes before watering begins');
check(staged?.tool === GARDENING_TROWEL, 'Gardening trowel is mandatory');
check(
	selectBatch(
		farmingJobs({ ...farmSettings, farming: ['oak'] }),
		99,
		(id) => ({ [FILLED_PLANT_POT]: 1, [oak.seed]: 1 })[id] ?? 0,
		true,
	) === null,
	'Missing gardening trowel prevents planting',
);

class FarmingGame extends FakeGame {
	combine(first: number, second: number): void {
		const recipe = SEEDLINGS.find(
			(entry) =>
				(first === FILLED_PLANT_POT && second === entry.seed) ||
				(second === FILLED_PLANT_POT && first === entry.seed),
		);
		if (recipe) {
			check(
				this.inventory(GARDENING_TROWEL) > 0,
				'Planting has a gardening trowel',
			);
			this.bag[FILLED_PLANT_POT]--;
			this.bag[recipe.seed]--;
			this.bag[recipe.seedling] = this.inventory(recipe.seedling) + 1;
			this.actions.push('plant:' + recipe.key);
			return;
		}

		const wateringCan = WATERING_CANS.find(
			(id) => id === first || id === second,
		);
		const seedling = SEEDLINGS.find(
			(entry) => entry.seedling === first || entry.seedling === second,
		);
		if (!wateringCan || !seedling)
			throw new Error('Unknown Farming action');
		this.bag[wateringCan]--;
		this.bag[seedling.seedling]--;
		const nextCan = wateringCan === 5333 ? 5331 : wateringCan - 1;
		this.bag[nextCan] = this.inventory(nextCan) + 1;
		this.bag[seedling.watered] = this.inventory(seedling.watered) + 1;
		this.actions.push('water:' + seedling.key);
	}
	makeVisible(): boolean {
		return false;
	}
}

const fg = new FarmingGame();
fg.lvl = oak.level;
fg.stock[GARDENING_TROWEL] = 1;
fg.stock[FILLED_PLANT_POT] = 14;
fg.stock[oak.seed] = 14;
fg.stock[WATERING_CANS[0]] = 2;
run(fg, { ...farmSettings, farming: ['oak'] }, 5000);
check(fg.bank(oak.watered) === 14, '14 Oak seedlings planted and watered');
check(fg.bank(GARDENING_TROWEL) === 1, 'Gardening trowel is retained');
const firstWater = fg.actions.findIndex((action) => action === 'water:oak');
const lastPlant = fg.actions.lastIndexOf('plant:oak');
check(firstWater > lastPlant, 'All seeds are planted before watering starts');
check(fg.counts['Farming plant'] === 14, 'Farming planting counter is 14');
check(fg.counts['Farming water'] === 14, 'Farming watering counter is 14');

console.log('Bank Stander with Farming: ' + checks + ' checks passed.');
