/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument */
import {
	AccountBuilderSettings,
	ALL_CATEGORIES,
	BuilderCategory,
	F2P_QUESTS,
} from './types.js';
import { loadSettings, saveSettings } from './config.js';

let frame: javax.swing.JFrame | null = null;
let submitted: AccountBuilderSettings | null = null;
let cancelled = false;

export const selectedSettings = (): AccountBuilderSettings | null => submitted;
export const configCancelled = (): boolean => cancelled;
export const closeWindow = (): void => {
	if (frame) {
		frame.dispose();
		frame = null;
	}
};

export const showWindow = (): void => {
	submitted = null;
	cancelled = false;

	const initial = loadSettings();

	// Deep Velvet Purple Palette (identical to AIO-cooking and bank-stander)
	const background = new java.awt.Color(0x130E20); // Obsidian dark purple
	const surface = new java.awt.Color(0x211738);    // Rich card surface purple
	const borderLine = new java.awt.Color(0x3E2D60); // Glowing purple border
	const foreground = new java.awt.Color(0xF5EEFC); // Crisp lavender-white text
	const muted = new java.awt.Color(0xA594C6);      // Soft lilac for subtitles and hints
	const accent = new java.awt.Color(0xC084FC);     // Neon lilac/violet for titles & highlights
	const buttonBg = new java.awt.Color(0x8B5CF6);   // Vivid electric purple CTA
	const buttonFg = new java.awt.Color(0xFFFFFF);   // Pure white text
	const cardBg = new java.awt.Color(0x1A122B);     // Darker nested panel background

	const panel = (
		layout:
			| java.awt.BorderLayout
			| java.awt.GridLayout
			| java.awt.FlowLayout,
		bg = background,
	): javax.swing.JPanel => {
		const p = new javax.swing.JPanel(layout);
		p.setBackground(bg);
		return p;
	};

	const label = (
		text: string,
		bold = false,
		color = foreground,
		size = 12,
	): javax.swing.JLabel => {
		const l = new javax.swing.JLabel(text);
		l.setForeground(color);
		l.setFont(new java.awt.Font('Dialog', bold ? java.awt.Font.BOLD : java.awt.Font.PLAIN, size));
		return l;
	};

	const createSectionBorder = (title: string): javax.swing.border.TitledBorder => {
		const line = javax.swing.BorderFactory.createLineBorder(borderLine, 1);
		const border = javax.swing.BorderFactory.createTitledBorder(line, title);
		border.setTitleColor(accent);
		border.setTitleFont(new java.awt.Font('Dialog', java.awt.Font.BOLD, 12));
		return border;
	};

	const checkbox = (
		text: string,
		selected: boolean,
		bg = background,
	): javax.swing.JCheckBox => {
		const cb = new javax.swing.JCheckBox(text, selected);
		cb.setBackground(bg);
		cb.setForeground(foreground);
		cb.setFont(new java.awt.Font('Dialog', java.awt.Font.PLAIN, 12));
		(cb as any).setFocusPainted(false);
		return cb;
	};

	const textField = (text: string, columns = 6): javax.swing.JTextField => {
		const tf = new javax.swing.JTextField(text, columns);
		tf.setBackground(surface);
		tf.setForeground(foreground);
		tf.setCaretColor(accent);
		tf.setFont(new java.awt.Font('Dialog', java.awt.Font.PLAIN, 12));
		tf.setBorder(
			javax.swing.BorderFactory.createCompoundBorder(
				javax.swing.BorderFactory.createLineBorder(borderLine, 1),
				javax.swing.BorderFactory.createEmptyBorder(4, 6, 4, 6),
			),
		);
		return tf;
	};

	const comboBox = (items: string[], selected = ''): javax.swing.JComboBox => {
		const cb = new javax.swing.JComboBox(items);
		cb.setBackground(surface);
		cb.setForeground(foreground);
		cb.setFont(new java.awt.Font('Dialog', java.awt.Font.PLAIN, 12));
		if (selected) {
			const index = items.indexOf(selected);
			if (index >= 0) cb.setSelectedIndex(index);
		}
		return cb;
	};

	const button = (text: string, isAccent = false): javax.swing.JButton => {
		const btn = new javax.swing.JButton(text);
		btn.setBackground(isAccent ? buttonBg : surface);
		btn.setForeground(isAccent ? buttonFg : foreground);
		btn.setFocusPainted(false);
		btn.setFont(new java.awt.Font('Dialog', isAccent ? java.awt.Font.BOLD : java.awt.Font.PLAIN, 12));
		btn.setBorder(
			javax.swing.BorderFactory.createCompoundBorder(
				javax.swing.BorderFactory.createLineBorder(
					isAccent ? accent : borderLine,
					1,
				),
				javax.swing.BorderFactory.createEmptyBorder(5, 12, 5, 12),
			),
		);
		return btn;
	};

	const section = (title: string, body: javax.swing.JPanel): javax.swing.JPanel => {
		const result = panel(new java.awt.BorderLayout(8, 8), surface);
		result.setBorder(createSectionBorder(title));
		result.add(body, java.awt.BorderLayout.CENTER);
		return result;
	};

	const createScrollPane = (component: javax.swing.JComponent): javax.swing.JScrollPane => {
		const scroll = new javax.swing.JScrollPane(component);
		scroll.setBorder(javax.swing.BorderFactory.createLineBorder(borderLine, 1));
		(scroll as any).getViewport().setBackground(background);
		scroll.getVerticalScrollBar().setUnitIncrement(16);
		return scroll;
	};

	frame = new javax.swing.JFrame('AIO F2P Account Builder | by xulixna');

	const mainPanel = panel(new java.awt.BorderLayout(12, 12));
	mainPanel.setBorder(javax.swing.BorderFactory.createEmptyBorder(14, 14, 14, 14));

	// Header Panel
	const headerPanel = panel(new java.awt.GridLayout(2, 1, 2, 2));
	const titleLabel = label('AIO F2P Account Builder', true, accent, 22);
	titleLabel.setHorizontalAlignment(0);

	const subtitleLabel = label(
		'All-In-One Free-to-Play Progression • Combat, Skills, Quests & Moneymaking • by xulixna',
		false,
		muted,
		12,
	);
	subtitleLabel.setHorizontalAlignment(0);

	headerPanel.add(titleLabel);
	headerPanel.add(subtitleLabel);
	mainPanel.add(headerPanel, java.awt.BorderLayout.NORTH);

	// Sidebar (Navigation & Queue)
	const sidebar = panel(new java.awt.BorderLayout(0, 10));
	sidebar.setPreferredSize(new java.awt.Dimension(250, 0));

	const navBox = panel(new java.awt.GridLayout(0, 1, 0, 4), surface);
	navBox.setBorder(createSectionBorder('Execution Queue & Nav'));

	const categoryRows: Record<BuilderCategory, {
		cb: javax.swing.JCheckBox;
		btn: javax.swing.JButton;
	}> = {} as any;

	const initialQueue = new Set(initial.enabledCategories);

	const categoryIcons: Record<BuilderCategory, string> = {
		Combat: '⚔️ Combat',
		Ranged: '🏹 Ranged',
		Magic: '🧙 Magic',
		Prayer: '✝️ Prayer',
		Cooking: '🍳 Cooking',
		Crafting: '✂️ Crafting',
		Firemaking: '🔥 Firemaking',
		Fishing: '🐟 Fishing',
		Mining: '⛏️ Mining',
		Runecrafting: '⚡ Runecraft',
		Smithing: '🔨 Smithing',
		Woodcutting: '🪓 Woodcutting',
		Quests: '📜 Quests',
		Moneymaking: '💰 Moneymaking',
	};

	for (const cat of ALL_CATEGORIES) {
		const cb = checkbox('', initialQueue.has(cat), surface);
		cb.setToolTipText(`Include ${cat} in automated execution`);

		const btn = new javax.swing.JButton(categoryIcons[cat]);
		btn.setFont(new java.awt.Font('Dialog', java.awt.Font.BOLD, 12));
		btn.setFocusPainted(false);
		(btn as any).setHorizontalAlignment(2);

		const row = panel(new java.awt.BorderLayout(4, 0), surface);
		row.add(cb, java.awt.BorderLayout.WEST);
		row.add(btn, java.awt.BorderLayout.CENTER);

		navBox.add(row);
		categoryRows[cat] = { cb, btn };
	}

	const navScroll = createScrollPane(navBox);
	sidebar.add(navScroll, java.awt.BorderLayout.CENTER);

	// Queue Quick Controls
	const queueControls = panel(new java.awt.GridLayout(2, 1, 4, 4), surface);
	queueControls.setBorder(createSectionBorder('Queue Actions'));

	const selectAllBtn = button('Select All Skills');
	const clearQueueBtn = button('Clear Queue');

	selectAllBtn.addActionListener(() => {
		for (const cat of ALL_CATEGORIES) {
			categoryRows[cat].cb.setSelected(true);
		}
		updateStartButtonText();
	});

	clearQueueBtn.addActionListener(() => {
		for (const cat of ALL_CATEGORIES) {
			categoryRows[cat].cb.setSelected(false);
		}
		updateStartButtonText();
	});

	const queueBtnRow = panel(new java.awt.GridLayout(1, 2, 4, 4), surface);
	queueBtnRow.add(selectAllBtn);
	queueBtnRow.add(clearQueueBtn);
	queueControls.add(queueBtnRow);

	const queueHint = label('Runs checked skills in order', false, muted, 11);
	queueHint.setHorizontalAlignment(0);
	queueControls.add(queueHint);

	sidebar.add(queueControls, java.awt.BorderLayout.SOUTH);
	mainPanel.add(sidebar, java.awt.BorderLayout.WEST);

	// Center Display Area
	const centerArea = panel(new java.awt.BorderLayout(8, 10));
	const pageHeading = label('Combat (Melee) Configuration', true, accent, 18);
	centerArea.add(pageHeading, java.awt.BorderLayout.NORTH);

	const pages = panel(new java.awt.BorderLayout());
	centerArea.add(pages, java.awt.BorderLayout.CENTER);
	mainPanel.add(centerArea, java.awt.BorderLayout.CENTER);

	// BUILD PAGES
	// 1. COMBAT PAGE
	const combatPage = panel(new java.awt.BorderLayout(0, 10));
	const combatContent = panel(new java.awt.GridLayout(0, 1, 0, 8));

	// Combat Targets
	const combatTargetsGrid = panel(new java.awt.GridLayout(2, 3, 10, 6), surface);
	combatTargetsGrid.add(label('Target Attack:'));
	combatTargetsGrid.add(label('Target Strength:'));
	combatTargetsGrid.add(label('Target Defence:'));

	const atkField = textField(String(initial.combat.targetAttack));
	const strField = textField(String(initial.combat.targetStrength));
	const defField = textField(String(initial.combat.targetDefence));
	combatTargetsGrid.add(atkField);
	combatTargetsGrid.add(strField);
	combatTargetsGrid.add(defField);
	combatContent.add(section('Combat Targets (0 = Skip / Level Target)', combatTargetsGrid));

	// Combat Training Method & Monster
	const combatMonsterPanel = panel(new java.awt.GridLayout(0, 2, 10, 6), surface);
	combatMonsterPanel.add(label('Training Monster / Location:'));
	const combatMonsters = [
		'Chickens (Lumbridge)',
		'Cows (Lumbridge)',
		'Goblins (Lumbridge)',
		'Minotaurs (Stronghold Lvl 1)',
		'Barbarians (Barbarian Village)',
		'Flesh Crawlers (Stronghold Lvl 2)',
		'Hill Giants (Edgeville Dungeon)',
		'Moss Giants (Varrock Sewers)',
	];
	const monsterCombo = comboBox(combatMonsters, initial.combat.monster);
	combatMonsterPanel.add(monsterCombo);

	combatMonsterPanel.add(label('Combat Stance Order:'));
	const combatOrders = [
		'Balanced (Equalize stats)',
		'Attack -> Strength -> Defence',
		'Strength -> Attack -> Defence',
		'Focus chosen style only',
	];
	const combatOrderCombo = comboBox(combatOrders);
	combatMonsterPanel.add(combatOrderCombo);

	combatContent.add(section('Monster Selection & Stance Strategy', combatMonsterPanel));

	// Food & Healing
	const combatHealingPanel = panel(new java.awt.GridLayout(0, 2, 10, 6), surface);
	combatHealingPanel.add(label('Food to Eat:'));
	const foodOptions = ['Trout', 'Salmon', 'Lobster', 'Swordfish', 'None'];
	const combatFoodCombo = comboBox(foodOptions, initial.combat.food);
	combatHealingPanel.add(combatFoodCombo);

	combatHealingPanel.add(label('Eat Food at HP %:'));
	const eatHpField = textField(String(initial.combat.eatAtHp));
	combatHealingPanel.add(eatHpField);

	combatContent.add(section('Healing & Consumables', combatHealingPanel));

	// Looting & Bone Burying
	const combatLootPanel = panel(new java.awt.GridLayout(2, 2, 8, 4), surface);
	const lootCoinsCb = checkbox('Loot Coins', initial.combat.lootCoins, surface);
	const lootRunesCb = checkbox('Loot Runes & Arrows', initial.combat.lootRunes, surface);
	const lootBonesCb = checkbox('Loot Bones', initial.combat.lootBones, surface);
	const buryBonesCb = checkbox('Bury Bones on ground', initial.combat.buryBones, surface);
	combatLootPanel.add(lootCoinsCb);
	combatLootPanel.add(lootRunesCb);
	combatLootPanel.add(lootBonesCb);
	combatLootPanel.add(buryBonesCb);
	combatContent.add(section('Looting & Bone Handling', combatLootPanel));

	combatPage.add(createScrollPane(combatContent), java.awt.BorderLayout.CENTER);

	// 2. RANGED PAGE
	const rangedPage = panel(new java.awt.BorderLayout(0, 10));
	const rangedContent = panel(new java.awt.GridLayout(0, 1, 0, 8));

	const rangedTargetPanel = panel(new java.awt.GridLayout(0, 2, 10, 6), surface);
	rangedTargetPanel.add(label('Target Ranged Level:'));
	const rangedTargetField = textField(String(initial.ranged.targetLevel));
	rangedTargetPanel.add(rangedTargetField);

	const rangedTrainDefCb = checkbox('Train Defence (Use Longrange Stance)', initial.ranged.trainDefence, surface);
	rangedTrainDefCb.setToolTipText('Splits XP between Ranged and Defence');
	rangedTargetPanel.add(rangedTrainDefCb);

	const rangedSafeSpotCb = checkbox('Enable Safe-spotting', initial.ranged.safeSpot, surface);
	rangedTargetPanel.add(rangedSafeSpotCb);
	rangedContent.add(section('Ranged Target & Stance Settings', rangedTargetPanel));

	const rangedGearPanel = panel(new java.awt.GridLayout(0, 2, 10, 6), surface);
	rangedGearPanel.add(label('Bow:'));
	const bowOptions = ['Shortbow', 'Oak shortbow', 'Willow shortbow', 'Maple shortbow'];
	const bowCombo = comboBox(bowOptions, initial.ranged.bow);
	rangedGearPanel.add(bowCombo);

	rangedGearPanel.add(label('Arrows:'));
	const arrowOptions = ['Bronze arrow', 'Iron arrow', 'Steel arrow', 'Mithril arrow', 'Adamant arrow'];
	const arrowCombo = comboBox(arrowOptions, initial.ranged.arrow);
	rangedGearPanel.add(arrowCombo);

	rangedGearPanel.add(label('Target Monster / Location:'));
	const rangedMonsters = [
		'Chickens (Lumbridge)',
		'Cows (Lumbridge)',
		'Minotaurs (Stronghold Lvl 1 - Safe-spot)',
		'Hill Giants (Edgeville Dungeon - Safe-spot)',
		'Lesser Demons (Wizards Tower / Crandor - Safe-spot)',
	];
	const rangedMonsterCombo = comboBox(rangedMonsters, initial.ranged.monster);
	rangedGearPanel.add(rangedMonsterCombo);

	rangedContent.add(section('Equipment & Monsters', rangedGearPanel));
	rangedPage.add(createScrollPane(rangedContent), java.awt.BorderLayout.CENTER);

	// 3. MAGIC PAGE
	const magicPage = panel(new java.awt.BorderLayout(0, 10));
	const magicContent = panel(new java.awt.GridLayout(0, 1, 0, 8));

	const magicTargetPanel = panel(new java.awt.GridLayout(0, 2, 10, 6), surface);
	magicTargetPanel.add(label('Target Magic Level:'));
	const magicTargetField = textField(String(initial.magic.targetLevel));
	magicTargetPanel.add(magicTargetField);

	const magicTrainDefCb = checkbox('Train Defence (Defensive Casting)', initial.magic.trainDefence, surface);
	magicTrainDefCb.setToolTipText('Splits combat magic XP between Magic and Defence');
	magicTargetPanel.add(magicTrainDefCb);
	magicContent.add(section('Magic Target & Stance', magicTargetPanel));

	const magicMethodPanel = panel(new java.awt.GridLayout(0, 2, 10, 6), surface);
	magicMethodPanel.add(label('Training Method:'));
	const magicMethods = [
		'Combat Spells (Strike / Bolt / Blast)',
		'Splashing (AFK 0 damage)',
		'Curse / Weaken / Confuse',
		'Teleport Training',
		'High Level Alchemy',
	];
	const magicMethodCombo = comboBox(magicMethods);
	magicMethodPanel.add(magicMethodCombo);

	magicMethodPanel.add(label('Spell to Cast:'));
	const spellOptions = [
		'Wind Strike',
		'Water Strike',
		'Earth Strike',
		'Fire Strike',
		'Wind Bolt',
		'Water Bolt',
		'Earth Bolt',
		'Fire Bolt',
		'Curse',
		'Varrock Teleport',
		'Lumbridge Teleport',
		'Falador Teleport',
		'High Level Alchemy',
	];
	const spellCombo = comboBox(spellOptions, initial.magic.spell);
	magicMethodPanel.add(spellCombo);

	magicMethodPanel.add(label('Splashing Target:'));
	const splashOptions = ['Rat (Lumbridge)', 'Chicken (Lumbridge)', 'Seagull (Port Sarim)', 'Monk (Monastery)'];
	const splashCombo = comboBox(splashOptions, initial.magic.splashTarget);
	magicMethodPanel.add(splashCombo);

	magicMethodPanel.add(label('Equipped Staff:'));
	const staffOptions = ['Staff of Air', 'Staff of Water', 'Staff of Earth', 'Staff of Fire'];
	const staffCombo = comboBox(staffOptions, initial.magic.staff);
	magicMethodPanel.add(staffCombo);

	magicContent.add(section('Spell & Casting Method', magicMethodPanel));
	magicPage.add(createScrollPane(magicContent), java.awt.BorderLayout.CENTER);

	// 4. PRAYER PAGE
	const prayerPage = panel(new java.awt.BorderLayout(0, 10));
	const prayerContent = panel(new java.awt.GridLayout(0, 1, 0, 8));

	const prayerTargetPanel = panel(new java.awt.GridLayout(0, 2, 10, 6), surface);
	prayerTargetPanel.add(label('Target Prayer Level:'));
	const prayerTargetField = textField(String(initial.prayer.targetLevel));
	prayerTargetPanel.add(prayerTargetField);
	prayerContent.add(section('Prayer Target Level', prayerTargetPanel));

	const prayerMethodPanel = panel(new java.awt.GridLayout(0, 1, 6, 6), surface);
	const prayerOptions = [
		'Collect & Bury Cow/Chicken Bones (Lumbridge)',
		'Withdraw Normal Bones from Bank & Bury',
		'Withdraw Big Bones from Bank & Bury (Fast F2P XP)',
	];
	const prayerCombo = comboBox(prayerOptions);
	prayerMethodPanel.add(prayerCombo);
	prayerContent.add(section('Prayer Training Method', prayerMethodPanel));
	prayerPage.add(createScrollPane(prayerContent), java.awt.BorderLayout.CENTER);

	// 5. COOKING PAGE
	const cookingPage = panel(new java.awt.BorderLayout(0, 10));
	const cookingContent = panel(new java.awt.GridLayout(0, 1, 0, 8));

	const cookingTargetPanel = panel(new java.awt.GridLayout(0, 2, 10, 6), surface);
	cookingTargetPanel.add(label('Target Cooking Level:'));
	const cookingTargetField = textField(String(initial.cooking.targetLevel));
	cookingTargetPanel.add(cookingTargetField);

	const cookingProgCb = checkbox('Progressive Mode (Cook highest fish available)', initial.cooking.progressive, surface);
	cookingTargetPanel.add(cookingProgCb);
	cookingContent.add(section('Cooking Mode & Target', cookingTargetPanel));

	const cookingFoodPanel = panel(new java.awt.GridLayout(0, 2, 10, 6), surface);
	cookingFoodPanel.add(label('Selected Food (Fixed Mode):'));
	const cookingFoodList = ['Raw shrimps', 'Raw trout', 'Raw salmon', 'Raw tuna', 'Raw lobster', 'Raw swordfish'];
	const cookingFoodCombo = comboBox(cookingFoodList, initial.cooking.food);
	cookingFoodPanel.add(cookingFoodCombo);

	cookingFoodPanel.add(label('Cooking Range / Spot:'));
	const cookingRanges = ['Al-Kharid range', 'Rogues Den permanent fire', 'Edgeville stove', 'Lumbridge castle range'];
	const cookingRangeCombo = comboBox(cookingRanges, initial.cooking.location);
	cookingFoodPanel.add(cookingRangeCombo);

	const dropBurntCb = checkbox('Drop Burnt Food when inventory finishes', initial.cooking.dropBurnt, surface);
	cookingFoodPanel.add(dropBurntCb);
	cookingContent.add(section('Food & Cooking Range Selection', cookingFoodPanel));

	cookingPage.add(createScrollPane(cookingContent), java.awt.BorderLayout.CENTER);

	// 6. CRAFTING PAGE
	const craftingPage = panel(new java.awt.BorderLayout(0, 10));
	const craftingContent = panel(new java.awt.GridLayout(0, 1, 0, 8));

	const craftingTargetPanel = panel(new java.awt.GridLayout(0, 2, 10, 6), surface);
	craftingTargetPanel.add(label('Target Crafting Level:'));
	const craftingTargetField = textField(String(initial.crafting.targetLevel));
	craftingTargetPanel.add(craftingTargetField);
	craftingContent.add(section('Crafting Target Level', craftingTargetPanel));

	const craftingMethodPanel = panel(new java.awt.GridLayout(0, 2, 10, 6), surface);
	craftingMethodPanel.add(label('Crafting Category:'));
	const craftCategories = ['Leather Armour', 'Gem Cutting', 'Gold / Silver Jewelry', 'Pottery'];
	const craftCatCombo = comboBox(craftCategories);
	craftingMethodPanel.add(craftCatCombo);

	craftingMethodPanel.add(label('Item to Produce:'));
	const craftItems = [
		'Leather gloves (Lvl 1)',
		'Leather boots (Lvl 7)',
		'Leather cowl (Lvl 9)',
		'Leather body (Lvl 14)',
		'Leather chaps (Lvl 18)',
		'Cut Sapphire (Lvl 20)',
		'Cut Emerald (Lvl 27)',
		'Cut Ruby (Lvl 34)',
		'Cut Diamond (Lvl 43)',
		'Gold ring (Lvl 5)',
		'Sapphire ring (Lvl 20)',
		'Emerald ring (Lvl 27)',
		'Ruby ring (Lvl 34)',
		'Silver tiara (Lvl 23)',
	];
	const craftItemCombo = comboBox(craftItems, initial.crafting.item);
	craftingMethodPanel.add(craftItemCombo);
	craftingContent.add(section('Recipe & Materials', craftingMethodPanel));

	craftingPage.add(createScrollPane(craftingContent), java.awt.BorderLayout.CENTER);

	// 7. FIREMAKING PAGE
	const fmPage = panel(new java.awt.BorderLayout(0, 10));
	const fmContent = panel(new java.awt.GridLayout(0, 1, 0, 8));

	const fmTargetPanel = panel(new java.awt.GridLayout(0, 2, 10, 6), surface);
	fmTargetPanel.add(label('Target Firemaking Level:'));
	const fmTargetField = textField(String(initial.firemaking.targetLevel));
	fmTargetPanel.add(fmTargetField);
	fmContent.add(section('Firemaking Target Level', fmTargetPanel));

	const fmMethodPanel = panel(new java.awt.GridLayout(0, 2, 10, 6), surface);
	fmMethodPanel.add(label('Logs to Burn:'));
	const fmLogs = ['Normal logs (Lvl 1)', 'Oak logs (Lvl 15)', 'Willow logs (Lvl 30)', 'Maple logs (Lvl 45)', 'Yew logs (Lvl 60)'];
	const fmLogCombo = comboBox(fmLogs, initial.firemaking.log);
	fmMethodPanel.add(fmLogCombo);

	fmMethodPanel.add(label('Burn Mode:'));
	const fmModes = ['Firelines (Grand Exchange / Varrock East)', 'Forester Campfire / Bonfire'];
	const fmModeCombo = comboBox(fmModes);
	fmMethodPanel.add(fmModeCombo);
	fmContent.add(section('Firemaking Log & Mode', fmMethodPanel));

	fmPage.add(createScrollPane(fmContent), java.awt.BorderLayout.CENTER);

	// 8. FISHING PAGE
	const fishPage = panel(new java.awt.BorderLayout(0, 10));
	const fishContent = panel(new java.awt.GridLayout(0, 1, 0, 8));

	const fishTargetPanel = panel(new java.awt.GridLayout(0, 2, 10, 6), surface);
	fishTargetPanel.add(label('Target Fishing Level:'));
	const fishTargetField = textField(String(initial.fishing.targetLevel));
	fishTargetPanel.add(fishTargetField);

	const dropFishCb = checkbox('Drop Fish (Powerfishing / Fast XP)', initial.fishing.dropFish, surface);
	dropFishCb.setToolTipText('Drops caught fish instead of running to bank');
	fishTargetPanel.add(dropFishCb);
	fishContent.add(section('Fishing Target & Behavior', fishTargetPanel));

	const fishMethodPanel = panel(new java.awt.GridLayout(0, 2, 10, 6), surface);
	fishMethodPanel.add(label('Fish Method & Species:'));
	const fishMethods = [
		'Small Net: Shrimps & Anchovies (Lvl 1/15)',
		'Bait Fishing: Sardines & Herrings (Lvl 5/10)',
		'Fly Fishing: Trout & Salmon (Lvl 20/30)',
		'Harpoon / Cage: Lobsters & Swordfish (Lvl 40/50)',
	];
	const fishMethodCombo = comboBox(fishMethods);
	fishMethodPanel.add(fishMethodCombo);

	fishMethodPanel.add(label('Fishing Location:'));
	const fishLocations = [
		'Lumbridge Swamp (Shrimp)',
		'Al-Kharid coast (Shrimp/Anchovies)',
		'Draynor Village (Sardine/Herring)',
		'Barbarian Village (Fly fishing Trout/Salmon)',
		'Karamja Docks (Lobster/Swordfish)',
	];
	const fishLocCombo = comboBox(fishLocations, initial.fishing.location);
	fishMethodPanel.add(fishLocCombo);
	fishContent.add(section('Spot & Tool Configuration', fishMethodPanel));

	fishPage.add(createScrollPane(fishContent), java.awt.BorderLayout.CENTER);

	// 9. MINING PAGE
	const miningPage = panel(new java.awt.BorderLayout(0, 10));
	const miningContent = panel(new java.awt.GridLayout(0, 1, 0, 8));

	const miningTargetPanel = panel(new java.awt.GridLayout(0, 2, 10, 6), surface);
	miningTargetPanel.add(label('Target Mining Level:'));
	const miningTargetField = textField(String(initial.mining.targetLevel));
	miningTargetPanel.add(miningTargetField);

	const dropOreCb = checkbox('Drop Ore (Powermining / Fast XP)', initial.mining.dropOre, surface);
	miningTargetPanel.add(dropOreCb);
	miningContent.add(section('Mining Target & Behavior', miningTargetPanel));

	const miningMethodPanel = panel(new java.awt.GridLayout(0, 2, 10, 6), surface);
	miningMethodPanel.add(label('Ore to Mine:'));
	const ores = [
		'Copper & Tin (Lvl 1)',
		'Iron Ore (Lvl 15)',
		'Silver Ore (Lvl 20)',
		'Coal (Lvl 30)',
		'Gold Ore (Lvl 40)',
		'Mithril Ore (Lvl 55)',
		'Adamantite Ore (Lvl 70)',
	];
	const miningOreCombo = comboBox(ores, initial.mining.ore);
	miningMethodPanel.add(miningOreCombo);

	miningMethodPanel.add(label('Mining Location:'));
	const miningLocations = [
		'Lumbridge Swamp (Copper & Tin)',
		'Varrock East Mine (Copper, Tin, Iron)',
		'Varrock West Mine (Iron, Silver)',
		'Al-Kharid Mine (Iron, Silver, Gold, Coal)',
		'Mining Guild (Iron, Coal)',
		'Falador Dwarven Mine (Iron, Coal)',
	];
	const miningLocCombo = comboBox(miningLocations, initial.mining.location);
	miningMethodPanel.add(miningLocCombo);
	miningContent.add(section('Rock & Mine Location', miningMethodPanel));

	miningPage.add(createScrollPane(miningContent), java.awt.BorderLayout.CENTER);

	// 10. RUNECRAFTING PAGE
	const rcPage = panel(new java.awt.BorderLayout(0, 10));
	const rcContent = panel(new java.awt.GridLayout(0, 1, 0, 8));

	const rcTargetPanel = panel(new java.awt.GridLayout(0, 2, 10, 6), surface);
	rcTargetPanel.add(label('Target Runecrafting Level:'));
	const rcTargetField = textField(String(initial.runecrafting.targetLevel));
	rcTargetPanel.add(rcTargetField);
	rcContent.add(section('Runecrafting Target Level', rcTargetPanel));

	const rcMethodPanel = panel(new java.awt.GridLayout(0, 2, 10, 6), surface);
	rcMethodPanel.add(label('Rune to Craft:'));
	const runes = [
		'Air Runes (Falador South)',
		'Mind Runes (Goblin Village North)',
		'Water Runes (Lumbridge Swamp)',
		'Earth Runes (Varrock East)',
		'Fire Runes (Al-Kharid Duel Arena)',
		'Body Runes (Edgeville Monastery)',
	];
	const rcRuneCombo = comboBox(runes, initial.runecrafting.rune);
	rcMethodPanel.add(rcRuneCombo);

	rcMethodPanel.add(label('Crafting Mode:'));
	const rcModes = ['Runes (Pure/Rune Essence)', 'Tiaras (Talisman + Silver Tiara)'];
	const rcModeCombo = comboBox(rcModes);
	rcMethodPanel.add(rcModeCombo);
	rcContent.add(section('Altar & Runecrafting Method', rcMethodPanel));

	rcPage.add(createScrollPane(rcContent), java.awt.BorderLayout.CENTER);

	// 11. SMITHING PAGE
	const smithingPage = panel(new java.awt.BorderLayout(0, 10));
	const smithingContent = panel(new java.awt.GridLayout(0, 1, 0, 8));

	const smithingTargetPanel = panel(new java.awt.GridLayout(0, 2, 10, 6), surface);
	smithingTargetPanel.add(label('Target Smithing Level:'));
	const smithingTargetField = textField(String(initial.smithing.targetLevel));
	smithingTargetPanel.add(smithingTargetField);
	smithingContent.add(section('Smithing Target Level', smithingTargetPanel));

	const smithingMethodPanel = panel(new java.awt.GridLayout(0, 2, 10, 6), surface);
	smithingMethodPanel.add(label('Operation:'));
	const smithingOps = ['Smelting Furnace (Bars)', 'Anvil Smithing (Items)'];
	const smithingOpCombo = comboBox(smithingOps);
	smithingMethodPanel.add(smithingOpCombo);

	smithingMethodPanel.add(label('Bar / Item Recipe:'));
	const smithingRecipes = [
		'Bronze Bar (Lvl 1)',
		'Iron Bar (Lvl 15)',
		'Silver Bar (Lvl 20)',
		'Steel Bar (Lvl 30)',
		'Gold Bar (Lvl 40)',
		'Mithril Bar (Lvl 50)',
		'Bronze Dagger (Lvl 1)',
		'Bronze Scimitar (Lvl 5)',
		'Iron Dagger (Lvl 15)',
		'Iron Scimitar (Lvl 20)',
		'Iron Platebody (Lvl 33)',
		'Steel Platebody (Lvl 48)',
	];
	const smithingRecipeCombo = comboBox(smithingRecipes, initial.smithing.barOrItem);
	smithingMethodPanel.add(smithingRecipeCombo);

	smithingMethodPanel.add(label('Location:'));
	const smithingLocs = ['Al-Kharid furnace', 'Edgeville furnace', 'Varrock West anvils'];
	const smithingLocCombo = comboBox(smithingLocs, initial.smithing.location);
	smithingMethodPanel.add(smithingLocCombo);
	smithingContent.add(section('Furnace / Anvil Setup', smithingMethodPanel));

	smithingPage.add(createScrollPane(smithingContent), java.awt.BorderLayout.CENTER);

	// 12. WOODCUTTING PAGE
	const wcPage = panel(new java.awt.BorderLayout(0, 10));
	const wcContent = panel(new java.awt.GridLayout(0, 1, 0, 8));

	const wcTargetPanel = panel(new java.awt.GridLayout(0, 2, 10, 6), surface);
	wcTargetPanel.add(label('Target Woodcutting Level:'));
	const wcTargetField = textField(String(initial.woodcutting.targetLevel));
	wcTargetPanel.add(wcTargetField);

	const dropLogsCb = checkbox('Drop Logs (Powerchopping / Fast XP)', initial.woodcutting.dropLogs, surface);
	dropLogsCb.setToolTipText('Drops cut logs instead of banking');
	wcTargetPanel.add(dropLogsCb);
	wcContent.add(section('Woodcutting Target & Behavior', wcTargetPanel));

	const wcMethodPanel = panel(new java.awt.GridLayout(0, 2, 10, 6), surface);
	wcMethodPanel.add(label('Tree Type:'));
	const trees = [
		'Normal Trees (Lvl 1)',
		'Oak Trees (Lvl 15)',
		'Willow Trees (Lvl 30)',
		'Yew Trees (Lvl 60)',
	];
	const treeCombo = comboBox(trees, initial.woodcutting.tree);
	wcMethodPanel.add(treeCombo);

	wcMethodPanel.add(label('Location:'));
	const wcLocs = [
		'Lumbridge (Normal / Oak)',
		'Draynor Village (Willows)',
		'Port Sarim (Willows)',
		'Varrock Castle (Yews)',
		'Edgeville (Yews)',
	];
	const wcLocCombo = comboBox(wcLocs, initial.woodcutting.location);
	wcMethodPanel.add(wcLocCombo);
	wcContent.add(section('Tree & Location Selection', wcMethodPanel));

	wcPage.add(createScrollPane(wcContent), java.awt.BorderLayout.CENTER);

	// 13. QUESTS PAGE
	const questsPage = panel(new java.awt.BorderLayout(0, 10));
	const questsTop = panel(new java.awt.BorderLayout(8, 8), surface);
	questsTop.setBorder(javax.swing.BorderFactory.createEmptyBorder(6, 6, 6, 6));

	const qpPanel = panel(new java.awt.FlowLayout(java.awt.FlowLayout.LEFT, 10, 4), surface);
	qpPanel.add(label('Target Quest Points (0 = no limit):'));
	const qpTargetField = textField(String(initial.quests.stopOnQuestPoints), 4);
	qpPanel.add(qpTargetField);
	questsTop.add(qpPanel, java.awt.BorderLayout.WEST);

	const questActionBtns = panel(new java.awt.FlowLayout(java.awt.FlowLayout.RIGHT, 6, 0), surface);
	const selectAllQuestsBtn = button('Select All');
	const selectStarterQuestsBtn = button('Select Starter / Easy');
	const clearQuestsBtn = button('Clear');
	questActionBtns.add(selectAllQuestsBtn);
	questActionBtns.add(selectStarterQuestsBtn);
	questActionBtns.add(clearQuestsBtn);
	questsTop.add(questActionBtns, java.awt.BorderLayout.EAST);
	questsPage.add(questsTop, java.awt.BorderLayout.NORTH);

	const initialSelectedQuests = new Set(initial.quests.selectedQuests);
	const questCheckboxes: Record<string, javax.swing.JCheckBox> = {};

	const questGrid = panel(new java.awt.GridLayout(0, 2, 8, 6), cardBg);
	for (const q of F2P_QUESTS) {
		const cb = checkbox(`${q.name} (${q.points} QP - ${q.difficulty})`, initialSelectedQuests.has(q.name), cardBg);
		questCheckboxes[q.name] = cb;
		questGrid.add(cb);
	}

	selectAllQuestsBtn.addActionListener(() => {
		for (const q of F2P_QUESTS) questCheckboxes[q.name].setSelected(true);
	});
	selectStarterQuestsBtn.addActionListener(() => {
		for (const q of F2P_QUESTS) {
			questCheckboxes[q.name].setSelected(q.difficulty === 'Novice');
		}
	});
	clearQuestsBtn.addActionListener(() => {
		for (const q of F2P_QUESTS) questCheckboxes[q.name].setSelected(false);
	});

	const questHolder = panel(new java.awt.BorderLayout(0, 6));
	questHolder.add(section('Available Free-to-Play Quests', questGrid), java.awt.BorderLayout.NORTH);
	questsPage.add(createScrollPane(questHolder), java.awt.BorderLayout.CENTER);

	// 14. MONEYMAKING PAGE
	const mmPage = panel(new java.awt.BorderLayout(0, 10));
	const mmContent = panel(new java.awt.GridLayout(0, 1, 0, 8));

	const mmTargetPanel = panel(new java.awt.GridLayout(0, 2, 10, 6), surface);
	mmTargetPanel.add(label('Target Profit (GP):'));
	const mmGpField = textField(String(initial.moneymaking.targetGp), 10);
	mmTargetPanel.add(mmGpField);
	mmContent.add(section('Profit Goal (0 = Run Continuously)', mmTargetPanel));

	const mmMethodPanel = panel(new java.awt.GridLayout(0, 2, 10, 6), surface);
	mmMethodPanel.add(label('F2P Moneymaking Method:'));
	const mmMethods = [
		'Tan Cowhides (Al-Kharid Tanner)',
		'Zamorak Wine Telegrab (Chaos Temple)',
		'Smelt Iron Bars (Al-Kharid / Edgeville)',
		'Craft Gold Rings / Necklaces',
		'Collect Red Spiders Eggs (Varrock Sewers)',
		'High Level Alchemy (Profitable F2P Items)',
		'Mine Iron Ore & Bank',
		'Chop Oak Logs & Bank',
	];
	const mmCombo = comboBox(mmMethods, initial.moneymaking.method);
	mmMethodPanel.add(mmCombo);
	mmContent.add(section('Moneymaking Activity', mmMethodPanel));

	mmPage.add(createScrollPane(mmContent), java.awt.BorderLayout.CENTER);

	// Page Map
	const pageMap: Record<BuilderCategory, javax.swing.JPanel> = {
		Combat: combatPage,
		Ranged: rangedPage,
		Magic: magicPage,
		Prayer: prayerPage,
		Cooking: cookingPage,
		Crafting: craftingPage,
		Firemaking: fmPage,
		Fishing: fishPage,
		Mining: miningPage,
		Runecrafting: rcPage,
		Smithing: smithingPage,
		Woodcutting: wcPage,
		Quests: questsPage,
		Moneymaking: mmPage,
	};

	let activeCategory: BuilderCategory = 'Combat';

	const getChosenCategories = (): BuilderCategory[] => {
		const res: BuilderCategory[] = [];
		for (const cat of ALL_CATEGORIES) {
			if (categoryRows[cat].cb.isSelected()) {
				res.push(cat);
			}
		}
		return res;
	};

	const updateNavButtons = (): void => {
		for (const cat of ALL_CATEGORIES) {
			const active = activeCategory === cat;
			const btn = categoryRows[cat].btn;
			btn.setBackground(active ? buttonBg : surface);
			btn.setForeground(active ? buttonFg : muted);
			btn.setBorder(
				javax.swing.BorderFactory.createCompoundBorder(
					javax.swing.BorderFactory.createLineBorder(active ? accent : borderLine, 1),
					javax.swing.BorderFactory.createEmptyBorder(6, 10, 6, 10),
				),
			);
		}
	};

	const selectCategory = (cat: BuilderCategory): void => {
		activeCategory = cat;
		pages.removeAll();
		pages.add(pageMap[cat], java.awt.BorderLayout.CENTER);
		pages.revalidate();
		pages.repaint();
		pageHeading.setText(categoryIcons[cat] + ' Configuration');
		updateNavButtons();
	};

	for (const cat of ALL_CATEGORIES) {
		categoryRows[cat].btn.addActionListener(() => selectCategory(cat));
		categoryRows[cat].cb.addActionListener(() => updateStartButtonText());
	}

	// FOOTER ACTION PANEL
	const footer = panel(new java.awt.BorderLayout(0, 10));

	// Global execution options
	const globalOptionsPanel = panel(new java.awt.FlowLayout(java.awt.FlowLayout.LEFT, 16, 6), surface);
	globalOptionsPanel.setBorder(createSectionBorder('Global Play Style & Safety Options'));

	globalOptionsPanel.add(label('Reaction Play Style:'));
	const styleGroup = new javax.swing.ButtonGroup();
	const fastRadio = new javax.swing.JRadioButton('Fast (1-2s)', initial.general.playStyle === 'fast');
	fastRadio.setBackground(surface);
	fastRadio.setForeground(foreground);
	(fastRadio as any).setFocusPainted(false);

	const normalRadio = new javax.swing.JRadioButton('Normal (2-4s)', initial.general.playStyle === 'normal');
	normalRadio.setBackground(surface);
	normalRadio.setForeground(foreground);
	(normalRadio as any).setFocusPainted(false);

	const lazyRadio = new javax.swing.JRadioButton('Lazy / Casual (4-8s)', initial.general.playStyle === 'lazy');
	lazyRadio.setBackground(surface);
	lazyRadio.setForeground(foreground);
	(lazyRadio as any).setFocusPainted(false);

	styleGroup.add(fastRadio);
	styleGroup.add(normalRadio);
	styleGroup.add(lazyRadio);
	globalOptionsPanel.add(fastRadio);
	globalOptionsPanel.add(normalRadio);
	globalOptionsPanel.add(lazyRadio);

	const takeBreaksCb = checkbox('Micro-breaks', initial.general.takeBreaks, surface);
	const cameraMoveCb = checkbox('Camera movement', initial.general.cameraMovement, surface);
	const noobModeCb = checkbox('Noob Mode', initial.general.noobMode, surface);
	const strictGoalsCb = checkbox('Strict Goals', initial.general.strictLevelGoals, surface);
	globalOptionsPanel.add(takeBreaksCb);
	globalOptionsPanel.add(cameraMoveCb);
	globalOptionsPanel.add(noobModeCb);
	globalOptionsPanel.add(strictGoalsCb);

	const totalLevelSubPanel = panel(new java.awt.FlowLayout(java.awt.FlowLayout.LEFT, 4, 0), surface);
	totalLevelSubPanel.add(label('Target Total Level:'));
	const totalLevelField = textField(String(initial.general.targetTotalLevel), 4);
	totalLevelSubPanel.add(totalLevelField);
	totalLevelSubPanel.add(label('(0 = none)', false, muted));
	globalOptionsPanel.add(totalLevelSubPanel);

	footer.add(globalOptionsPanel, java.awt.BorderLayout.NORTH);

	// Start CTA Button
	const buttonPanel = panel(new java.awt.BorderLayout(4, 4));
	const startButton = new javax.swing.JButton('Start AIO F2P Account Builder');
	startButton.setBackground(buttonBg);
	startButton.setForeground(buttonFg);
	startButton.setFont(new java.awt.Font('Dialog', java.awt.Font.BOLD, 15));
	startButton.setFocusPainted(false);
	startButton.setPreferredSize(new java.awt.Dimension(0, 44));
	startButton.setBorder(javax.swing.BorderFactory.createLineBorder(accent, 1));
	buttonPanel.add(startButton, java.awt.BorderLayout.CENTER);

	const footerLabel = label('ThePlug RLPL BotMaker • Created by xulixna • Discord', false, muted, 11);
	footerLabel.setHorizontalAlignment(0);
	buttonPanel.add(footerLabel, java.awt.BorderLayout.SOUTH);

	footer.add(buttonPanel, java.awt.BorderLayout.SOUTH);
	mainPanel.add(footer, java.awt.BorderLayout.SOUTH);

	const updateStartButtonText = (): void => {
		const chosen = getChosenCategories();
		if (chosen.length === 0) {
			startButton.setText('Select at least one task in the queue');
		} else if (chosen.length === 1) {
			startButton.setText('Start ' + chosen[0] + ' Automation');
		} else {
			startButton.setText(
				`Start AIO F2P Account Builder (${chosen.length} Tasks Queued: ${chosen.slice(0, 3).join(', ')}${chosen.length > 3 ? '...' : ''})`,
			);
		}
	};

	// Start button action
	startButton.addActionListener(() => {
		const chosen = getChosenCategories();
		if (chosen.length === 0) {
			javax.swing.JOptionPane.showMessageDialog(
				frame,
				'Please check at least one skill or activity in the Execution Queue & Nav sidebar.',
				'Queue Empty',
				javax.swing.JOptionPane.WARNING_MESSAGE,
			);
			return;
		}

		const parseNumber = (text: string, def: number): number => {
			const n = parseInt(text.trim(), 10);
			return isNaN(n) ? def : Math.max(0, n);
		};

		const playStyle: 'fast' | 'normal' | 'lazy' = fastRadio.isSelected()
			? 'fast'
			: lazyRadio.isSelected()
				? 'lazy'
				: 'normal';

		const selectedQuestList: string[] = [];
		for (const q of F2P_QUESTS) {
			if (questCheckboxes[q.name]?.isSelected()) {
				selectedQuestList.push(q.name);
			}
		}

		if (chosen.includes('Quests') && selectedQuestList.length === 0) {
			javax.swing.JOptionPane.showMessageDialog(
				frame,
				'You included Quests in the queue, but did not select any quests in the Quests tab.\nPlease check at least one quest.',
				'No Quests Selected',
				javax.swing.JOptionPane.WARNING_MESSAGE,
			);
			selectCategory('Quests');
			return;
		}

		const settings: AccountBuilderSettings = {
			enabledCategories: chosen,
			general: {
				playStyle,
				targetTotalLevel: parseNumber(String(totalLevelField.getText()), 0),
				takeBreaks: takeBreaksCb.isSelected(),
				cameraMovement: cameraMoveCb.isSelected(),
				noobMode: noobModeCb.isSelected(),
				strictLevelGoals: strictGoalsCb.isSelected(),
			},
			combat: {
				targetAttack: parseNumber(String(atkField.getText()), 40),
				targetStrength: parseNumber(String(strField.getText()), 40),
				targetDefence: parseNumber(String(defField.getText()), 40),
				combatOrder: (() => {
					const raw = String(combatOrderCombo.getSelectedItem() ?? '');
					if (raw.includes('Attack -> Strength')) return 'atk_str_def';
					if (raw.includes('Strength -> Attack')) return 'str_atk_def';
					if (raw.includes('Focus')) return 'focus';
					return 'balanced';
				})(),
				monster: String(monsterCombo.getSelectedItem() ?? 'Chickens (Lumbridge)'),
				food: String(combatFoodCombo.getSelectedItem() ?? 'Trout'),
				eatAtHp: parseNumber(String(eatHpField.getText()), 50),
				lootCoins: lootCoinsCb.isSelected(),
				lootRunes: lootRunesCb.isSelected(),
				lootBones: lootBonesCb.isSelected(),
				buryBones: buryBonesCb.isSelected(),
			},
			ranged: {
				targetLevel: parseNumber(String(rangedTargetField.getText()), 40),
				trainDefence: rangedTrainDefCb.isSelected(),
				monster: String(rangedMonsterCombo.getSelectedItem() ?? 'Cows (Lumbridge)'),
				bow: String(bowCombo.getSelectedItem() ?? 'Oak shortbow'),
				arrow: String(arrowCombo.getSelectedItem() ?? 'Iron arrow'),
				safeSpot: rangedSafeSpotCb.isSelected(),
			},
			magic: {
				targetLevel: parseNumber(String(magicTargetField.getText()), 25),
				trainDefence: magicTrainDefCb.isSelected(),
				method: 'combat_spells',
				spell: String(spellCombo.getSelectedItem() ?? 'Wind Strike'),
				splashTarget: String(splashCombo.getSelectedItem() ?? 'Rat (Lumbridge)'),
				staff: String(staffCombo.getSelectedItem() ?? 'Staff of Air'),
			},
			prayer: {
				targetLevel: parseNumber(String(prayerTargetField.getText()), 31),
				method: 'collect_and_bury',
			},
			cooking: {
				targetLevel: parseNumber(String(cookingTargetField.getText()), 40),
				food: String(cookingFoodCombo.getSelectedItem() ?? 'Raw trout'),
				progressive: cookingProgCb.isSelected(),
				location: String(cookingRangeCombo.getSelectedItem() ?? 'Al-Kharid range'),
				dropBurnt: dropBurntCb.isSelected(),
			},
			crafting: {
				targetLevel: parseNumber(String(craftingTargetField.getText()), 30),
				category: 'leather',
				item: String(craftItemCombo.getSelectedItem() ?? 'Leather gloves'),
			},
			firemaking: {
				targetLevel: parseNumber(String(fmTargetField.getText()), 30),
				log: String(fmLogCombo.getSelectedItem() ?? 'Oak logs'),
				mode: 'lines',
			},
			fishing: {
				targetLevel: parseNumber(String(fishTargetField.getText()), 40),
				method: 'shrimp_anchovies',
				location: String(fishLocCombo.getSelectedItem() ?? 'Lumbridge Swamp'),
				dropFish: dropFishCb.isSelected(),
			},
			mining: {
				targetLevel: parseNumber(String(miningTargetField.getText()), 40),
				ore: String(miningOreCombo.getSelectedItem() ?? 'Copper & Tin'),
				location: String(miningLocCombo.getSelectedItem() ?? 'Lumbridge Swamp'),
				dropOre: dropOreCb.isSelected(),
			},
			runecrafting: {
				targetLevel: parseNumber(String(rcTargetField.getText()), 20),
				rune: String(rcRuneCombo.getSelectedItem() ?? 'Air'),
				mode: 'runes',
			},
			smithing: {
				targetLevel: parseNumber(String(smithingTargetField.getText()), 35),
				method: 'smelting',
				barOrItem: String(smithingRecipeCombo.getSelectedItem() ?? 'Bronze Bar'),
				location: String(smithingLocCombo.getSelectedItem() ?? 'Al-Kharid furnace'),
			},
			woodcutting: {
				targetLevel: parseNumber(String(wcTargetField.getText()), 40),
				tree: String(treeCombo.getSelectedItem() ?? 'Oak trees'),
				location: String(wcLocCombo.getSelectedItem() ?? 'Lumbridge'),
				dropLogs: dropLogsCb.isSelected(),
			},
			quests: {
				selectedQuests: selectedQuestList,
				stopOnQuestPoints: parseNumber(String(qpTargetField.getText()), 10),
			},
			moneymaking: {
				method: String(mmCombo.getSelectedItem() ?? 'Tan Cowhides (Al-Kharid)'),
				targetGp: parseNumber(String(mmGpField.getText()), 50000),
			},
		};

		saveSettings(settings);
		closeWindow();
		submitted = settings;
	});

	// Default view
	selectCategory('Combat');
	updateStartButtonText();

	frame.add(mainPanel);
	frame.setSize(1200, 820);
	frame.setLocationRelativeTo(null);
	frame.setDefaultCloseOperation(javax.swing.WindowConstants.DO_NOTHING_ON_CLOSE);
	frame.addWindowListener(
		new java.awt.event.WindowAdapter({
			windowClosing: () => {
				cancelled = true;
				closeWindow();
			},
		}),
	);

	frame.setVisible(true);
};
