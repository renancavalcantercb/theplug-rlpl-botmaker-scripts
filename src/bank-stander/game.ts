import { type Job } from './herblore.js';
/// <reference types="@deafwave/osrs-botmaker-types" />
import { type Game } from './runner.js';
import { type SkillType } from './config.js';

// From the supplied Botmaker menu log and RuneLite gameval InterfaceID.SKILLMULTI.
const MAKE = 17694735;
const ALL = 17694732;

const visible = (id: number): boolean => {
	const widget = client.getWidget(id);
	return widget !== null && !widget.isHidden();
};

const skillToApi = (skill?: SkillType): net.runelite.api.Skill => {
	switch (skill) {
		case 'Fletching':
			return net.runelite.api.Skill.FLETCHING;
		case 'Crafting':
			return net.runelite.api.Skill.CRAFTING;
		case 'Herblore':
		default:
			return net.runelite.api.Skill.HERBLORE;
	}
};

export const game: Game = {
	loggedIn: () =>
		client.getGameState() === net.runelite.api.GameState.LOGGED_IN &&
		client.getLocalPlayer() !== null,
	level: (skill?: SkillType) =>
		client.getBoostedSkillLevel(skillToApi(skill)),
	realLevel: (skill?: SkillType) =>
		client.getRealSkillLevel(skillToApi(skill)),
	inventory: (id) => bot.inventory.getQuantityOfId(id),
	bank: (id) => bot.bank.getQuantityOfId(id),
	emptySlots: () => bot.inventory.getEmptySlots(),
	bankOpen: () => bot.bank.isOpen(),
	bankBusy: () => bot.bank.isBanking(),
	openBank: () => bot.bank.open(),
	closeBank: () => bot.bank.close(),
	deposit: (id?: number) => {
		if (id === undefined) {
			bot.bank.depositAll();
		} else {
			bot.bank.depositAllWithId(id);
		}
	},
	heldItemIds: () => {
		const ids: number[] = [];
		const widgets = bot.inventory.getAllWidgets() ?? [];
		for (const widget of widgets) {
			const id = widget.getItemId();
			if (id > 0 && !ids.includes(id)) ids.push(id);
		}
		return ids;
	},
	noted: () => bot.bank.getNotedMode(),
	unnoted: () => bot.bank.setNotedMode(false),
	withdraw: (id, quantity) => bot.bank.withdrawQuantityWithId(id, quantity),
	equipped: (id) => bot.equipment.containsId(id),
	alchemistEquipped: () =>
		bot.equipment.containsAnyIds([29988, 29990, 29992]),
	wear: (id) => bot.inventory.interactWithIds([id], ['Wear']),
	clean: (id) => {
		// Select the actual slot, not all matching herbs. One click per confirmed herb.
		const widgets = bot.inventory.getAllWidgets();
		for (const widget of widgets) {
			if (widget.getItemId() === id) {
				bot.inventory.interactAtIndex(widget.getIndex(), ['Clean']);
				return;
			}
		}
	},
	combine: (first, second) => bot.inventory.itemOnItemWithIds(first, second),
	// The Make component is the actionable control captured in the client log.
	makeVisible: (job?: Job) => {
		if (job?.kind === 'clean') return false;
		const id = productWidget(job);
		return id !== null || visible(MAKE);
	},
	makeAll: () => {
		if (visible(ALL)) bot.widgets.interactSpecifiedWidget(ALL, 1, 57, -1);
	},
	make: (job?: Job) => {
		const id = productWidget(job);
		if (id !== null) bot.widgets.interactSpecifiedWidget(id, 1, 57, -1);
		else bot.widgets.interactSpecifiedWidget(MAKE, 1, 57, -1);
	},
	continueDialogue: () => bot.widgets.handleDialogue([]),
	log: (message) => bot.printLogMessage('[Bank Stander] ' + message),
	counter: (name, value) => bot.counters.setCounter(name, value),
	terminate: () => bot.terminate(),
	accountSeed: () => {
		try {
			const player = client.getLocalPlayer();
			const name = player ? String(player.getName() ?? '') : '';
			const total = client.getTotalLevel();
			let seed = total > 0 ? total * 17 : 1337;
			for (const char of name) seed = (seed * 31 + (char.codePointAt(0) ?? 0)) % 2_147_483_647;
			return Math.abs(seed);
		} catch {
			return 1337;
		}
	},
};

// Match the product inside a SKILLMULTI option, then click its actionable parent.
const containsProduct = (
	widget: net.runelite.api.widgets.Widget,
	outputs: number[],
	depth = 0,
): boolean => {
	if (widget.isHidden()) return false;
	if (outputs.includes(widget.getItemId())) return true;
	if (depth >= 4) return false;
	for (const child of widget.getChildren() ?? []) {
		if (child && containsProduct(child, outputs, depth + 1)) return true;
	}
	return false;
};

export const productWidget = (job?: Job): number | null => {
	if (!job) return null;
	for (let id = MAKE; id <= MAKE + 17; id++) {
		const widget = client.getWidget(id);
		if (widget && containsProduct(widget, job.outputs)) return id;
	}
	return null;
};

export const fletchingGame: Game = {
	...game,
	level: () => client.getBoostedSkillLevel(net.runelite.api.Skill.FLETCHING),
	realLevel: () => client.getRealSkillLevel(net.runelite.api.Skill.FLETCHING),
	makeVisible: (job) => productWidget(job) !== null,
	make: (job) => {
		const id = productWidget(job);
		if (id !== null) bot.widgets.interactSpecifiedWidget(id, 1, 57, -1);
	},
};

export const craftingGame: Game = {
	...game,
	level: () => client.getBoostedSkillLevel(net.runelite.api.Skill.CRAFTING),
	realLevel: () => client.getRealSkillLevel(net.runelite.api.Skill.CRAFTING),
	makeVisible: (job) => productWidget(job) !== null || visible(MAKE),
	make: (job) => {
		const id = productWidget(job);
		if (id !== null) bot.widgets.interactSpecifiedWidget(id, 1, 57, -1);
		else bot.widgets.interactSpecifiedWidget(MAKE, 1, 57, -1);
	},
};
