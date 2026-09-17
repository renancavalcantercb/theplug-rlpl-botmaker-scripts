/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument */
import { COOKABLE_FOODS, FoodItem } from './food.js';
import { CookingSettings, loadSettings, saveSettings } from './config.js';

let frame: javax.swing.JFrame | null = null;
let submitted: CookingSettings | null = null;
let cancelled = false;

export const selectedSettings = (): CookingSettings | null => submitted;
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

	// Deep Purple Dark Aesthetic
	// A single packed RGB integer avoids Rhino selecting Color(float, float, float).
	const background = new java.awt.Color(0x130E20); // Deep velvet obsidian purple
	const surface = new java.awt.Color(0x211738);    // Rich card surface purple
	const borderLine = new java.awt.Color(0x3E2D60); // Subtle glowing purple border
	const foreground = new java.awt.Color(0xF5EEFC); // Crisp lavender-white text
	const muted = new java.awt.Color(0xA594C6);      // Soft lilac for subtitles and hints
	const accent = new java.awt.Color(0xC084FC);     // Neon lilac/violet for titles & highlights
	const buttonBg = new java.awt.Color(0x8B5CF6);   // Vivid electric purple CTA
	const buttonFg = new java.awt.Color(0xFFFFFF);   // Pure white button text

	const panel = (
		layout:
			| java.awt.BorderLayout
			| java.awt.GridLayout
			| java.awt.FlowLayout,
	): javax.swing.JPanel => {
		const p = new javax.swing.JPanel(layout);
		p.setBackground(background);
		return p;
	};

	const label = (text: string, bold = false): javax.swing.JLabel => {
		const l = new javax.swing.JLabel(text);
		l.setForeground(foreground);
		if (bold) {
			l.setFont(new java.awt.Font('Dialog', java.awt.Font.BOLD, 14));
		}
		return l;
	};

	const createSectionBorder = (title: string): javax.swing.border.TitledBorder => {
		const line = javax.swing.BorderFactory.createLineBorder(borderLine, 1);
		const border = javax.swing.BorderFactory.createTitledBorder(line, title);
		border.setTitleColor(accent);
		return border;
	};

	frame = new javax.swing.JFrame("AIO Cooking - Rogues' Den | by xulixna");

	const mainPanel = panel(new java.awt.BorderLayout(10, 10));
	mainPanel.setBorder(
		javax.swing.BorderFactory.createEmptyBorder(15, 15, 15, 15),
	);

	// Header
	const headerPanel = panel(new java.awt.GridLayout(2, 1, 2, 2));
	const titleLabel = label('AIO Cooking', true);
	titleLabel.setForeground(accent);
	titleLabel.setFont(new java.awt.Font('Dialog', java.awt.Font.BOLD, 20));
	titleLabel.setHorizontalAlignment(0);

	const subtitleLabel = label("Rogues' Den • by xulixna", false);
	subtitleLabel.setForeground(muted);
	subtitleLabel.setFont(new java.awt.Font('Dialog', java.awt.Font.PLAIN, 12));
	subtitleLabel.setHorizontalAlignment(0);

	headerPanel.add(titleLabel);
	headerPanel.add(subtitleLabel);
	mainPanel.add(headerPanel, java.awt.BorderLayout.NORTH);

	// Content
	const contentPanel = panel(new java.awt.GridLayout(0, 1, 8, 8));

	// Mode Selection
	const modePanel = panel(new java.awt.GridLayout(2, 1, 4, 4));
	modePanel.setBorder(createSectionBorder('Cooking Mode'));

	const progressiveRadio = new javax.swing.JRadioButton(
		'Progressive (Cook highest level food in bank)',
		initial.mode === 'progressive',
	);
	progressiveRadio.setBackground(background);
	progressiveRadio.setForeground(foreground);

	const fixedRadio = new javax.swing.JRadioButton(
		'Fixed (Cook single selected food)',
		initial.mode === 'fixed',
	);
	fixedRadio.setBackground(background);
	fixedRadio.setForeground(foreground);

	const buttonGroup = new javax.swing.ButtonGroup();
	buttonGroup.add(progressiveRadio);
	buttonGroup.add(fixedRadio);

	modePanel.add(progressiveRadio);
	modePanel.add(fixedRadio);
	contentPanel.add(modePanel);

	// Fixed food dropdown
	const foodPanel = panel(new java.awt.BorderLayout(6, 6));
	foodPanel.setBorder(createSectionBorder('Select Food (Fixed Mode)'));

	const foodNames = COOKABLE_FOODS.map(
		(f) => `${f.name} (Lvl ${f.level})`,
	);
	const foodCombo = new javax.swing.JComboBox(foodNames);
	foodCombo.setBackground(surface);
	foodCombo.setForeground(foreground);

	// Pre-select cached food
	const initialIndex = COOKABLE_FOODS.findIndex(
		(f) => f.id === initial.fixedFoodId,
	);
	if (initialIndex >= 0) {
		foodCombo.setSelectedIndex(initialIndex);
	}
	foodCombo.setEnabled(initial.mode === 'fixed');

	progressiveRadio.addActionListener(() => {
		foodCombo.setEnabled(false);
	});
	fixedRadio.addActionListener(() => {
		foodCombo.setEnabled(true);
	});

	foodPanel.add(foodCombo, java.awt.BorderLayout.CENTER);
	contentPanel.add(foodPanel);

	// Target Level
	const targetPanel = panel(new java.awt.BorderLayout(6, 6));
	targetPanel.setBorder(
		createSectionBorder('Target Level (0 = Cook until out of food)'),
	);

	const targetField = new javax.swing.JTextField(
		String(initial.targetLevel || 0),
		10,
	);
	targetField.setBackground(surface);
	targetField.setForeground(foreground);
	targetField.setCaretColor(accent);

	targetPanel.add(targetField, java.awt.BorderLayout.CENTER);
	contentPanel.add(targetPanel);

	// Play Style (Delays & Reaction)
	const stylePanel = panel(new java.awt.GridLayout(2, 1, 4, 4));
	stylePanel.setBorder(
		createSectionBorder('Play Style (Human Reaction Timers)'),
	);

	const normalRadio = new javax.swing.JRadioButton(
		'Normal (Active player: 1-3s reaction)',
		initial.playStyle === 'normal',
	);
	normalRadio.setBackground(background);
	normalRadio.setForeground(foreground);

	const lazyRadio = new javax.swing.JRadioButton(
		'Lazy / AFK (Relaxed: up to 10s delay before banking)',
		initial.playStyle === 'lazy',
	);
	lazyRadio.setBackground(background);
	lazyRadio.setForeground(foreground);

	const styleButtonGroup = new javax.swing.ButtonGroup();
	styleButtonGroup.add(normalRadio);
	styleButtonGroup.add(lazyRadio);

	stylePanel.add(normalRadio);
	stylePanel.add(lazyRadio);
	contentPanel.add(stylePanel);

	mainPanel.add(contentPanel, java.awt.BorderLayout.CENTER);

	// Start button
	const startButton = new javax.swing.JButton('Start Cooking');
	startButton.setBackground(buttonBg);
	startButton.setForeground(buttonFg);
	startButton.setFont(new java.awt.Font('Dialog', java.awt.Font.BOLD, 14));
	startButton.setFocusPainted(false);

	startButton.addActionListener(() => {
		const isProgressive = progressiveRadio.isSelected();
		const selectedFoodIndex = foodCombo.getSelectedIndex();
		const selectedFood =
			selectedFoodIndex >= 0 && selectedFoodIndex < COOKABLE_FOODS.length
				? COOKABLE_FOODS[selectedFoodIndex]
				: COOKABLE_FOODS[0];

		let targetLevel = 0;
		try {
			const parsed = parseInt(String(targetField.getText()).trim(), 10);
			if (!isNaN(parsed) && parsed >= 0) {
				targetLevel = Math.min(parsed, 99);
			}
		} catch {
			targetLevel = 0;
		}

		const settings: CookingSettings = {
			mode: isProgressive ? 'progressive' : 'fixed',
			fixedFoodId: selectedFood.id,
			targetLevel,
			playStyle: lazyRadio.isSelected() ? 'lazy' : 'normal',
		};

		saveSettings(settings);
		submitted = settings;
		closeWindow();
	});

	const buttonPanel = panel(new java.awt.BorderLayout(4, 4));
	buttonPanel.setBorder(
		javax.swing.BorderFactory.createEmptyBorder(10, 0, 0, 0),
	);
	buttonPanel.add(startButton, java.awt.BorderLayout.CENTER);

	const footerLabel = label('Created by xulixna • Discord', false);
	footerLabel.setForeground(muted);
	footerLabel.setFont(new java.awt.Font('Dialog', java.awt.Font.PLAIN, 11));
	footerLabel.setHorizontalAlignment(0);
	buttonPanel.add(footerLabel, java.awt.BorderLayout.SOUTH);

	mainPanel.add(buttonPanel, java.awt.BorderLayout.SOUTH);

	frame.add(mainPanel);
	frame.setSize(480, 560);
	frame.setLocationRelativeTo(null);
	frame.setDefaultCloseOperation(
		javax.swing.WindowConstants.DO_NOTHING_ON_CLOSE,
	);
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
