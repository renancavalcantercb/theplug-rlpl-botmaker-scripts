/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument */
import {
	MoneyMakerSettings,
	METHOD_CATALOG,
	MoneyMethodId,
	ExecutionMode,
	StoppingMode,
	PlayStyle,
} from './types.js';
import { loadSettings, saveSettings } from './config.js';

let frame: javax.swing.JFrame | null = null;
let submitted: MoneyMakerSettings | null = null;
let cancelled = false;

export const selectedSettings = (): MoneyMakerSettings | null => submitted;
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

	// Deep Velvet Dark Palette
	const background = new java.awt.Color(0x130E20);
	const surface = new java.awt.Color(0x211738);
	const borderLine = new java.awt.Color(0x3E2D60);
	const foreground = new java.awt.Color(0xF5EEFC);
	const muted = new java.awt.Color(0xA594C6);
	const accent = new java.awt.Color(0xF59E0B); // Golden Amber
	const buttonBg = new java.awt.Color(0xD97706);
	const buttonFg = new java.awt.Color(0xFFFFFF);
	const cardBg = new java.awt.Color(0x1A122B);

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
		const callback = new javax.swing.JCheckBox(text, selected);
		callback.setBackground(bg);
		callback.setForeground(foreground);
		callback.setFont(new java.awt.Font('Dialog', java.awt.Font.PLAIN, 12));
		(callback as any).setFocusPainted(false);
		return callback;
	};

	const textField = (text: string, columns = 8): javax.swing.JTextField => {
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
		const callback = new javax.swing.JComboBox(items);
		callback.setBackground(surface);
		callback.setForeground(foreground);
		callback.setFont(new java.awt.Font('Dialog', java.awt.Font.PLAIN, 12));
		if (selected) {
			const index = items.indexOf(selected);
			if (index >= 0) callback.setSelectedIndex(index);
		}
		return callback;
	};

	const button = (text: string, isAccent = false): javax.swing.JButton => {
		const button_ = new javax.swing.JButton(text);
		button_.setBackground(isAccent ? buttonBg : surface);
		button_.setForeground(isAccent ? buttonFg : foreground);
		button_.setFocusPainted(false);
		button_.setFont(new java.awt.Font('Dialog', isAccent ? java.awt.Font.BOLD : java.awt.Font.PLAIN, 12));
		button_.setBorder(
			javax.swing.BorderFactory.createCompoundBorder(
				javax.swing.BorderFactory.createLineBorder(isAccent ? accent : borderLine, 1),
				javax.swing.BorderFactory.createEmptyBorder(6, 16, 6, 16),
			),
		);
		return button_;
	};

	// Window Shell
	frame = new javax.swing.JFrame('AIO F2P Money Maker');
	frame.setSize(760, 570);
	frame.setLayout(new java.awt.BorderLayout(0, 0));
	frame.getContentPane().setBackground(background);
	(frame as any).setDefaultCloseOperation(javax.swing.WindowConstants.DISPOSE_ON_CLOSE);

	// Header Panel
	const header = panel(new java.awt.BorderLayout(), surface);
	header.setBorder(
		javax.swing.BorderFactory.createCompoundBorder(
			javax.swing.BorderFactory.createLineBorder(borderLine, 1),
			javax.swing.BorderFactory.createEmptyBorder(12, 20, 12, 20),
		),
	);

	const titleBox = panel(new java.awt.GridLayout(2, 1, 0, 2), surface);
	titleBox.add(label('💰 AIO F2P Money Maker', true, accent, 18));
	titleBox.add(label('Smart GP Generation & Zero-Cost Skilling for Old School RuneScape', false, muted, 11));
	header.add(titleBox, java.awt.BorderLayout.WEST);

	// Tabbed Pane
	const tabs = new javax.swing.JTabbedPane();
	tabs.setBackground(surface);
	tabs.setForeground(foreground);
	tabs.setFont(new java.awt.Font('Dialog', java.awt.Font.BOLD, 12));

	// --- TAB 1: General & Mode ---
	const tabOverview = panel(new java.awt.BorderLayout(10, 10), cardBg);
	tabOverview.setBorder(javax.swing.BorderFactory.createEmptyBorder(16, 16, 16, 16));

	const modePanel = panel(new java.awt.GridLayout(5, 2, 10, 10), surface);
	modePanel.setBorder(createSectionBorder('Execution Mode & Selection'));

	modePanel.add(label('Selection Mode:'));
	const modeCombo = comboBox(
		['AUTOMATIC (Best by Levels/GP)', 'MANUAL (Pick Method)'],
		initial.general.executionMode === 'AUTO'
			? 'AUTOMATIC (Best by Levels/GP)'
			: 'MANUAL (Pick Method)',
	);
	modePanel.add(modeCombo);

	modePanel.add(label('Manual Method:'));
	const methodNames: string[] = [];
	let initialMethodObject = METHOD_CATALOG[0];
	for (const method of METHOD_CATALOG) {
		methodNames.push(method.name);
		if (method.id === initial.general.selectedMethod) initialMethodObject = method;
	}
	const methodCombo = comboBox(methodNames, initialMethodObject ? initialMethodObject.name : methodNames[0]);
	modePanel.add(methodCombo);

	modePanel.add(label('Stopping Condition:'));
	const stopCombo = comboBox(
		['Indefinite (Until stopped)', 'Target GP', 'Time Limit (Hours)'],
		initial.general.stoppingMode === 'TARGET_GP'
			? 'Target GP'
			: (initial.general.stoppingMode === 'TIME_LIMIT'
				? 'Time Limit (Hours)'
				: 'Indefinite (Until stopped)'),
	);
	modePanel.add(stopCombo);

	modePanel.add(label('Target GP:'));
	const targetGpField = textField(String(initial.general.targetGp), 10);
	modePanel.add(targetGpField);
	modePanel.add(label('Time Limit (Hours):'));
	const timeLimitField = textField(String(initial.general.timeLimitHours), 10);
	modePanel.add(timeLimitField);

	tabOverview.add(modePanel, java.awt.BorderLayout.NORTH);

	// Method catalog preview
	const descBox = panel(new java.awt.BorderLayout(5, 5), surface);
	descBox.setBorder(createSectionBorder('Available Methods in Catalog'));
	const catalogTextArea = new javax.swing.JTextArea();
	catalogTextArea.setBackground(cardBg);
	catalogTextArea.setForeground(muted);
	catalogTextArea.setFont(new java.awt.Font('Monospaced', java.awt.Font.PLAIN, 11));
	catalogTextArea.setEditable(false);

	let catalogText = 'SUPPORTED METHODS IN CATALOG:\n\n';
	for (const method of METHOD_CATALOG) {
		const requirements: string[] = [];
		const skills = method.requiredSkills;
		if (skills.woodcutting) requirements.push(`woodcutting: ${skills.woodcutting}`);
		if (skills.mining) requirements.push(`mining: ${skills.mining}`);
		if (skills.crafting) requirements.push(`crafting: ${skills.crafting}`);
		if (skills.magic) requirements.push(`magic: ${skills.magic}`);
		if (skills.cooking) requirements.push(`cooking: ${skills.cooking}`);
		const requirementText = requirements.length > 0 ? requirements.join(', ') : 'None';
		const cost = method.requiresGp ? 'Requires GP' : 'ZERO Cost';
		catalogText += `- ${method.name}\n  Profit: ~${Math.floor(method.approxGpPerHour / 1000)}k/h | ${cost} | Requirements: ${requirementText}\n\n`;
	}
	catalogTextArea.setText(catalogText);

	const scrollPane = new javax.swing.JScrollPane(catalogTextArea);
	scrollPane.setBorder(null);
	descBox.add(scrollPane, java.awt.BorderLayout.CENTER);
	tabOverview.add(descBox, java.awt.BorderLayout.CENTER);

	tabs.addTab('General & Mode', tabOverview);

	// --- TAB 2: Gathering / Skilling ---
	const tabGathering = panel(new java.awt.GridLayout(3, 1, 10, 10), cardBg);
	tabGathering.setBorder(javax.swing.BorderFactory.createEmptyBorder(16, 16, 16, 16));

	const wcBox = panel(new java.awt.GridLayout(3, 2, 10, 10), surface);
	wcBox.setBorder(createSectionBorder('Woodcutting Configuration (Oaks & Yews)'));
	wcBox.add(label('Yews Location:'));
	const wcYewCombo = comboBox(['Edgeville', 'Varrock Palace'], initial.specific.wcYewLocation);
	wcBox.add(wcYewCombo);
	wcBox.add(label('Oaks Location:'));
	const wcOakCombo = comboBox(['Draynor', 'Lumbridge'], initial.specific.wcOakLocation);
	wcBox.add(wcOakCombo);
	wcBox.add(label('Deposit:'));
	wcBox.add(label('Nearest bank (automatic)', false, muted));
	tabGathering.add(wcBox);

	const mineBox = panel(new java.awt.GridLayout(2, 2, 10, 10), surface);
	mineBox.setBorder(createSectionBorder('Mining Configuration (Clay & Iron)'));
	mineBox.add(label('Mine Location:'));
	const mineLocCombo = comboBox(['Varrock SW', 'Al-Kharid'], initial.specific.mineLocation);
	mineBox.add(mineLocCombo);
	mineBox.add(label('Tool:'));
	mineBox.add(label('Pickaxe in inventory/bank', false, muted));
	tabGathering.add(mineBox);

	tabs.addTab('Gathering', tabGathering);

	// --- TAB 3: Tanning & Shops ---
	const tabTanning = panel(new java.awt.GridLayout(3, 1, 10, 10), cardBg);
	tabTanning.setBorder(javax.swing.BorderFactory.createEmptyBorder(16, 16, 16, 16));

	const tanBox = panel(new java.awt.GridLayout(2, 2, 10, 10), surface);
	tanBox.setBorder(createSectionBorder('Al-Kharid Tanner (Ellis <-> Bank)'));
	tanBox.add(label('Leather Type:'));
	const leatherCombo = comboBox(
		['soft (1 gp / ~240k/h)', 'hard (3 gp)'],
		initial.specific.leatherType === 'hard' ? 'hard (3 gp)' : 'soft (1 gp / ~240k/h)',
	);
	tanBox.add(leatherCombo);
	tanBox.add(label('Route:'));
	tanBox.add(label('Al-Kharid Bank ↔ Ellis', false, muted));
	tabTanning.add(tanBox);

	const shopBox = panel(new java.awt.GridLayout(2, 2, 10, 10), surface);
	shopBox.setBorder(createSectionBorder("Gerrant's Shop (Port Sarim Feathers)"));
	shopBox.add(label('Item Purchased:'));
	shopBox.add(label('Feather packs (100 feathers each)', false, accent));
	shopBox.add(label('Opening:'));
	shopBox.add(label('Opens packs into stackable feathers', false, muted));
	tabTanning.add(shopBox);

	tabs.addTab('Tanning & Shops', tabTanning);

	// --- TAB 4: Magic & Jewelry ---
	const tabMagic = panel(new java.awt.GridLayout(3, 1, 10, 10), cardBg);
	tabMagic.setBorder(javax.swing.BorderFactory.createEmptyBorder(16, 16, 16, 16));

	const alchBox = panel(new java.awt.GridLayout(2, 2, 10, 10), surface);
	alchBox.setBorder(createSectionBorder('High Alchemy (Magic 55)'));
	alchBox.add(label('Item for Alch:'));
	const alchNameField = textField(initial.specific.alchItemName, 12);
	alchBox.add(alchNameField);
	alchBox.add(label('Item ID:'));
	const alchIdField = textField(String(initial.specific.alchItemId), 8);
	alchBox.add(alchIdField);
	tabMagic.add(alchBox);

	const wineBox = panel(new java.awt.GridLayout(2, 2, 10, 10), surface);
	wineBox.setBorder(createSectionBorder('Telegrab Wine of Zamorak (Magic 33)'));
	wineBox.add(label('Location:'));
	wineBox.add(label('Chaos Temple (North of Falador)', false, muted));
	wineBox.add(label('Equipment:'));
	wineBox.add(label('Air staff equipped + Law runes in bank', false, muted));
	tabMagic.add(wineBox);

	tabs.addTab('Magic & Jewelry', tabMagic);

	// --- TAB 5: Humanization & Anti-Ban ---
	const tabHuman = panel(new java.awt.GridLayout(4, 1, 6, 6), cardBg);
	tabHuman.setBorder(javax.swing.BorderFactory.createEmptyBorder(16, 16, 16, 16));

	const playStyleBox = panel(new java.awt.FlowLayout(java.awt.FlowLayout.LEFT, 10, 0), surface);
	playStyleBox.setBorder(createSectionBorder('Play Style (Reaction & Speed)'));
	playStyleBox.add(label('PlayStyle:'));
	const playStyleCombo = comboBox(['normal', 'fast', 'lazy'], initial.general.playStyle);
	playStyleBox.add(playStyleCombo);
	tabHuman.add(playStyleBox);

	const callbackNoob = checkbox(
		'Noob Mode (occasional reaction hesitations)',
		initial.general.noobMode,
		cardBg,
	);
	const callbackBankPauses = checkbox(
		'Bank Micro-Pauses (random delay variation when opening/closing bank)',
		initial.general.bankMicroPauses,
		cardBg,
	);
	const callbackBreaks = checkbox(
		'Automatic Breaks (integrated Break Handler)',
		initial.general.takeBreaks,
		cardBg,
	);
	tabHuman.add(callbackNoob);
	tabHuman.add(callbackBankPauses);
	tabHuman.add(callbackBreaks);

	tabs.addTab('Humanization', tabHuman);

	frame.add(tabs, java.awt.BorderLayout.CENTER);

	// Bottom Action Bar
	const bottomBar = panel(new java.awt.BorderLayout(), surface);
	bottomBar.setBorder(
		javax.swing.BorderFactory.createCompoundBorder(
			javax.swing.BorderFactory.createLineBorder(borderLine, 1),
			javax.swing.BorderFactory.createEmptyBorder(12, 16, 12, 16),
		),
	);

	const buttonCancel = button('Cancel', false);
	(buttonCancel as any).addActionListener(() => {
		cancelled = true;
		frame?.dispose();
		frame = null;
	});

	const buttonStart = button('🚀 Start Money Maker', true);
	(buttonStart as any).addActionListener(() => {
		const isAuto = String(modeCombo.getSelectedItem()).indexOf('AUTOMATIC') === 0;
		const execMode: ExecutionMode = isAuto ? 'AUTO' : 'MANUAL';

		const selectedMethodName = String(methodCombo.getSelectedItem());
		let selectedMethodId: MoneyMethodId = 'TAN_COWHIDE';
		for (const method of METHOD_CATALOG) {
			if (method.name === selectedMethodName) {
				selectedMethodId = method.id;
				break;
			}
		}

		const stopString = String(stopCombo.getSelectedItem());
		const stoppingMode: StoppingMode = stopString.indexOf('Target GP') >= 0
			? 'TARGET_GP'
			: (stopString.indexOf('Time Limit') >= 0
				? 'TIME_LIMIT'
				: 'INDEFINITE');

		const targetGp = parseInt(String(targetGpField.getText()).trim(), 10) || 1000000;
		const timeLimitHours = parseInt(String(timeLimitField.getText()).trim(), 10) || 4;
		const playStyle = String(playStyleCombo.getSelectedItem()) as PlayStyle;

		const settings: MoneyMakerSettings = {
			general: {
				executionMode: execMode,
				selectedMethod: selectedMethodId,
				stoppingMode,
				targetGp,
				timeLimitHours,
				playStyle,
				noobMode: callbackNoob.isSelected(),
				takeBreaks: callbackBreaks.isSelected(),
				bankMicroPauses: callbackBankPauses.isSelected(),
			},
			specific: {
				wcYewLocation: (String(wcYewCombo.getSelectedItem()) as any),
				wcOakLocation: (String(wcOakCombo.getSelectedItem()) as any),
				mineLocation: (String(mineLocCombo.getSelectedItem()) as any),
				leatherType: String(leatherCombo.getSelectedItem()).indexOf('hard') === 0 ? 'hard' : 'soft',
				alchItemName: alchNameField.getText().trim() || 'Rune 2h sword',
				alchItemId: parseInt(String(alchIdField.getText()).trim(), 10) || 1319,
			},
		};

		saveSettings(settings);
		submitted = settings;
		frame?.dispose();
		frame = null;
	});

	bottomBar.add(buttonCancel, java.awt.BorderLayout.WEST);
	bottomBar.add(buttonStart, java.awt.BorderLayout.EAST);
	frame.add(bottomBar, java.awt.BorderLayout.SOUTH);

	frame.setLocationRelativeTo(null);
	frame.setVisible(true);
};
