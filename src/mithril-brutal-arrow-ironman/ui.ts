/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument */
import { BrutalSettings, defaultSettings, loadSettings, saveSettings } from './config.js';
import { PHASE_NAMES, PHASES } from './constants.js';

let frame: javax.swing.JFrame | null = null;
let submitted: BrutalSettings | null = null;
let cancelled = false;

export const selectedSettings = (): BrutalSettings | null => submitted;
export const configCancelled = (): boolean => cancelled;
export const closeWindow = (): void => {
	if (frame) {
		frame.dispose();
		frame = null;
	}
};

const parseIntField = (
	field: javax.swing.JTextField,
	fallback: number,
	min: number,
	max: number,
): number => {
	const parsed = parseInt(String(field.getText()).trim(), 10);
	if (isNaN(parsed)) return fallback;
	return Math.max(min, Math.min(max, parsed));
};

export const showWindow = (): void => {
	submitted = null;
	cancelled = false;

	const initial = loadSettings();

	// A single packed RGB integer avoids Rhino selecting Color(float, float, float).
	const background = new java.awt.Color(0x14111a);
	const surface = new java.awt.Color(0x221d2b);
	const borderLine = new java.awt.Color(0x443a55);
	const foreground = new java.awt.Color(0xf2eef7);
	const muted = new java.awt.Color(0xa89cb8);
	const accent = new java.awt.Color(0xc4b5fd);
	const buttonBg = new java.awt.Color(0x7c3aed);
	const buttonFg = new java.awt.Color(0xffffff);

	const panel = (
		layout: java.awt.BorderLayout | java.awt.GridLayout | java.awt.FlowLayout,
	): javax.swing.JPanel => {
		const p = new javax.swing.JPanel(layout);
		p.setBackground(background);
		return p;
	};

	const label = (text: string): javax.swing.JLabel => {
		const l = new javax.swing.JLabel(text);
		l.setForeground(foreground);
		return l;
	};

	const createSectionBorder = (title: string): javax.swing.border.TitledBorder => {
		const line = javax.swing.BorderFactory.createLineBorder(borderLine, 1);
		const border = javax.swing.BorderFactory.createTitledBorder(line, title);
		border.setTitleColor(accent);
		return border;
	};

	const textField = (value: number): javax.swing.JTextField => {
		const f = new javax.swing.JTextField(String(value), 5);
		f.setBackground(surface);
		f.setForeground(foreground);
		f.setCaretColor(accent);
		return f;
	};

	const radio = (text: string, selected: boolean): javax.swing.JRadioButton => {
		const r = new javax.swing.JRadioButton(text, selected);
		r.setBackground(background);
		r.setForeground(foreground);
		return r;
	};

	frame = new javax.swing.JFrame('Mithril Brutal Arrow Ironman | by xulixna');

	const mainPanel = panel(new java.awt.BorderLayout(10, 10));
	mainPanel.setBorder(javax.swing.BorderFactory.createEmptyBorder(15, 15, 15, 15));

	const headerPanel = panel(new java.awt.GridLayout(2, 1, 2, 2));
	const titleLabel = label('Mithril Brutal Arrow Ironman');
	titleLabel.setForeground(accent);
	titleLabel.setFont(new java.awt.Font('Dialog', java.awt.Font.BOLD, 20));
	titleLabel.setHorizontalAlignment(0);

	const subtitleLabel = label('Bars -> Nails -> Brutal arrows • by xulixna');
	subtitleLabel.setForeground(muted);
	subtitleLabel.setFont(new java.awt.Font('Dialog', java.awt.Font.PLAIN, 12));
	subtitleLabel.setHorizontalAlignment(0);

	headerPanel.add(titleLabel);
	headerPanel.add(subtitleLabel);
	mainPanel.add(headerPanel, java.awt.BorderLayout.NORTH);

	const contentPanel = panel(new java.awt.GridLayout(0, 1, 8, 8));

	const modePanel = panel(new java.awt.GridLayout(2, 2, 6, 6));
	modePanel.setBorder(createSectionBorder('Mode'));
	const progressiveRadio = radio('Progressive - arrows to make:', initial.mode === 'progressive');
	const singleRadio = radio('Single phase:', initial.mode === 'single');
	const modeGroup = new javax.swing.ButtonGroup();
	modeGroup.add(progressiveRadio);
	modeGroup.add(singleRadio);
	const targetField = textField(initial.arrowTarget);
	const phaseLabels = PHASES.map((p, i) => `${i + 1}. ${PHASE_NAMES[p]}`);
	const phaseCombo = new javax.swing.JComboBox(phaseLabels);
	phaseCombo.setSelectedIndex(Math.max(0, PHASES.indexOf(initial.singlePhase)));
	phaseCombo.setBackground(surface);
	phaseCombo.setForeground(foreground);
	targetField.setEnabled(initial.mode === 'progressive');
	phaseCombo.setEnabled(initial.mode === 'single');
	progressiveRadio.addActionListener(() => {
		targetField.setEnabled(true);
		phaseCombo.setEnabled(false);
	});
	singleRadio.addActionListener(() => {
		targetField.setEnabled(false);
		phaseCombo.setEnabled(true);
	});
	modePanel.add(progressiveRadio);
	modePanel.add(targetField);
	modePanel.add(singleRadio);
	modePanel.add(phaseCombo);
	contentPanel.add(modePanel);

	const helpLabel = label(
		'<html>Progressive checks the bank for everything first (ore, coal, hammer, knife, feathers, armour) and stops telling you what is missing. Single phase runs one phase until its materials run out.</html>',
	);
	helpLabel.setForeground(muted);
	contentPanel.add(helpLabel);

	const slotsPanel = panel(new java.awt.GridLayout(2, 2, 6, 6));
	slotsPanel.setBorder(createSectionBorder('Arrows: fletch when free slots between (random)'));
	const minField = textField(initial.minFreeSlots);
	const maxField = textField(initial.maxFreeSlots);
	slotsPanel.add(label('Min free slots'));
	slotsPanel.add(minField);
	slotsPanel.add(label('Max free slots'));
	slotsPanel.add(maxField);
	contentPanel.add(slotsPanel);

	const optionsPanel = panel(new java.awt.GridLayout(1, 1, 4, 4));
	optionsPanel.setBorder(createSectionBorder('Options'));
	const afkCheckbox = new javax.swing.JCheckBox('Random short AFKs during actions', initial.randomAfk);
	afkCheckbox.setBackground(background);
	afkCheckbox.setForeground(foreground);
	optionsPanel.add(afkCheckbox);
	contentPanel.add(optionsPanel);

	const stylePanel = panel(new java.awt.GridLayout(2, 1, 4, 4));
	stylePanel.setBorder(createSectionBorder('Play Style (Human Reaction Timers)'));
	const normalRadio = radio('Normal (Active player: 1-3s reaction)', initial.playStyle === 'normal');
	const lazyRadio = radio('Lazy / AFK (Relaxed: up to ~10s reaction)', initial.playStyle === 'lazy');
	const styleGroup = new javax.swing.ButtonGroup();
	styleGroup.add(normalRadio);
	styleGroup.add(lazyRadio);
	stylePanel.add(normalRadio);
	stylePanel.add(lazyRadio);
	contentPanel.add(stylePanel);

	mainPanel.add(contentPanel, java.awt.BorderLayout.CENTER);

	const startButton = new javax.swing.JButton('Start');
	startButton.setBackground(buttonBg);
	startButton.setForeground(buttonFg);
	startButton.setFont(new java.awt.Font('Dialog', java.awt.Font.BOLD, 14));
	startButton.setFocusPainted(false);

	startButton.addActionListener(() => {
		const minFree = parseIntField(minField, defaultSettings.minFreeSlots, 0, 20);
		const maxFree = parseIntField(maxField, defaultSettings.maxFreeSlots, 0, 20);
		const settings: BrutalSettings = {
			mode: singleRadio.isSelected() ? 'single' : 'progressive',
			arrowTarget: parseIntField(targetField, defaultSettings.arrowTarget, 1, 1000000),
			singlePhase: PHASES[Math.max(0, phaseCombo.getSelectedIndex())] ?? 'bars',
			minFreeSlots: Math.min(minFree, maxFree),
			maxFreeSlots: Math.max(minFree, maxFree),
			randomAfk: afkCheckbox.isSelected(),
			playStyle: lazyRadio.isSelected() ? 'lazy' : 'normal',
		};
		saveSettings(settings);
		submitted = settings;
		closeWindow();
	});

	const buttonPanel = panel(new java.awt.BorderLayout(4, 4));
	buttonPanel.setBorder(javax.swing.BorderFactory.createEmptyBorder(10, 0, 0, 0));
	buttonPanel.add(startButton, java.awt.BorderLayout.CENTER);

	const footerLabel = label('Set the anvil quantity to "All" before the nails phase • by xulixna');
	footerLabel.setForeground(muted);
	footerLabel.setFont(new java.awt.Font('Dialog', java.awt.Font.PLAIN, 11));
	footerLabel.setHorizontalAlignment(0);
	buttonPanel.add(footerLabel, java.awt.BorderLayout.SOUTH);

	mainPanel.add(buttonPanel, java.awt.BorderLayout.SOUTH);

	frame.add(mainPanel);
	frame.setSize(540, 640);
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
