/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

/**
 * Patch picker.
 *
 * Originally skipped on the grounds that a config UI measures nothing about
 * the walker. That was wrong for a different reason: without it there is no
 * way to choose patches at all, since bmCache can only be written by running
 * another script. The window is also what makes "start with one patch" a
 * two-second decision instead of a rebuild.
 *
 * It writes every value explicitly on Start, so nothing downstream depends on
 * bmCache honouring a default — which is what broke the first run.
 */

import { APPLE, FRUITS } from './fruit.js';
import { KEY } from './config.js';
import { FRUIT_PATCHES, TREE_PATCHES, type TreePatch } from './patches.js';
import { TREES, WILLOW } from './trees.js';

let ready = false;

export const configReady = (): boolean => ready;

export const showConfigWindow = (): void => {
	// On a first run nothing is stored, so seed from code, never from cache.
	const configured = bot.bmCache.getBoolean(KEY.configured, false);
	const seedPatch = (key: string, fallback: boolean): boolean =>
		configured ? bot.bmCache.getBoolean(KEY.patch(key), false) : fallback;
	const seedString = (key: string, fallback: string): string =>
		configured ? String(bot.bmCache.getString(key, fallback)) : fallback;
	const seedBool = (key: string, fallback: boolean): boolean =>
		configured ? bot.bmCache.getBoolean(key, fallback) : fallback;

	const frame = new javax.swing.JFrame('ocfarming PoC');
	const panel = new javax.swing.JPanel(new java.awt.GridLayout(0, 1));

	const boxes: javax.swing.JCheckBox[] = [];
	const patches: TreePatch[] = [];

	const addGroup = (title: string, group: readonly TreePatch[], fallback: boolean): void => {
		panel.add(new javax.swing.JLabel(title));
		for (const patch of group) {
			const box = new javax.swing.JCheckBox(patch.label, seedPatch(patch.key, fallback));
			boxes.push(box);
			patches.push(patch);
			panel.add(box);
		}
	};

	// Fruit trees default off: the cycle was never validated in game, not even
	// in the Java plugin it was ported from.
	addGroup('Tree patches:', TREE_PATCHES, true);
	addGroup('Fruit tree patches:', FRUIT_PATCHES, false);

	panel.add(new javax.swing.JLabel('Tree species:'));
	const species = new javax.swing.JComboBox(TREES.map((tree) => tree.label));
	species.setSelectedItem(seedString(KEY.tree, WILLOW.label));
	panel.add(species);

	panel.add(new javax.swing.JLabel('Fruit tree species:'));
	const fruitSpecies = new javax.swing.JComboBox(FRUITS.map((fruit) => fruit.label));
	fruitSpecies.setSelectedItem(seedString(KEY.fruit, APPLE.label));
	panel.add(fruitSpecies);

	const protectTrees = new javax.swing.JCheckBox(
		'Pay the gardener to protect trees',
		seedBool(KEY.protectTrees, false),
	);
	panel.add(protectTrees);

	const protectFruit = new javax.swing.JCheckBox(
		'Pay the gardener to protect fruit trees',
		seedBool(KEY.protectFruit, false),
	);
	panel.add(protectFruit);

	const useBank = new javax.swing.JCheckBox(
		'Fetch supplies from the bank before the run',
		seedBool(KEY.useBank, false),
	);
	panel.add(useBank);

	const start = new javax.swing.JButton('Start');
	start.addActionListener(() => {
		let chosen = 0;
		// Indexed loop, not boxes.entries(): that returns an array iterator and
		// Rhino's Symbol.iterator support is not something to bet the Start
		// button on.
		// eslint-disable-next-line unicorn/no-for-loop -- see above
		for (let index = 0; index < boxes.length; index = index + 1) {
			const patch = patches[index];
			const box = boxes[index];
			if (patch === undefined || box === undefined) continue;
			const selected: boolean = box.isSelected();
			bot.bmCache.saveBoolean(KEY.patch(patch.key), selected);
			if (selected) chosen = chosen + 1;
		}

		if (chosen === 0) {
			javax.swing.JOptionPane.showMessageDialog(
				frame,
				'Pick at least one patch.',
				'Nothing selected',
				javax.swing.JOptionPane.WARNING_MESSAGE,
			);
			return;
		}

		bot.bmCache.saveString(KEY.tree, String(species.getSelectedItem()));
		bot.bmCache.saveString(KEY.fruit, String(fruitSpecies.getSelectedItem()));
		bot.bmCache.saveBoolean(KEY.protectTrees, protectTrees.isSelected());
		bot.bmCache.saveBoolean(KEY.protectFruit, protectFruit.isSelected());
		bot.bmCache.saveBoolean(KEY.useBank, useBank.isSelected());
		bot.bmCache.saveBoolean(KEY.configured, true);

		frame.dispose();
		// Nothing is called on the client here: onGameTick picks this up and
		// starts the run on the client thread, where every bot.* call belongs.
		ready = true;
	});
	panel.add(start);

	frame.add(new javax.swing.JScrollPane(panel));
	frame.setSize(440, 560);
	frame.setDefaultCloseOperation(javax.swing.WindowConstants.DO_NOTHING_ON_CLOSE);
	frame.addWindowListener(
		new java.awt.event.WindowAdapter({
			windowClosing: () => {
				frame.dispose();
				bot.terminate();
			},
		}),
	);

	const pointer = java.awt.MouseInfo.getPointerInfo().getLocation();
	frame.setLocation(pointer.getX() - 220, pointer.getY() - 280);
	frame.setVisible(true);
};
