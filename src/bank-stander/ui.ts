/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument -- Java Swing bindings. */
import { CRAFTING } from './crafting.js';
import { FLETCHING } from './fletching.js';
import { BEST_POTION, HERBS, POTIONS } from './herblore.js';
import {
	SKILL_ORDER,
	Settings,
	SkillType,
	loadSettings,
	saveSettings,
} from './config.js';

let frame: javax.swing.JFrame | null = null;
let submitted: Settings | null = null;
let cancelled = false;

export const selectedSettings = (): Settings | null => submitted;
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

	// Deep Purple Dark Aesthetic (identical to AIO Cooking)
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
	): javax.swing.JLabel => {
		const l = new javax.swing.JLabel(text);
		l.setForeground(color);
		if (bold) {
			l.setFont(new java.awt.Font('Dialog', java.awt.Font.BOLD, 14));
		}
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
		(cb as any).setFocusPainted(false);
		return cb;
	};

	const button = (text: string, isAccent = false): javax.swing.JButton => {
		const btn = new javax.swing.JButton(text);
		btn.setBackground(isAccent ? buttonBg : surface);
		btn.setForeground(isAccent ? buttonFg : foreground);
		btn.setFocusPainted(false);
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

	const section = (
		title: string,
		body: javax.swing.JPanel,
	): javax.swing.JPanel => {
		const result = panel(new java.awt.BorderLayout(8, 8));
		result.setBorder(createSectionBorder(title));
		result.add(body, java.awt.BorderLayout.CENTER);
		return result;
	};

	frame = new javax.swing.JFrame(
		'Bank Stander - Multi-Skill (Herblore, Crafting & Fletching) | by xulixna',
	);

	const mainPanel = panel(new java.awt.BorderLayout(12, 12));
	mainPanel.setBorder(
		javax.swing.BorderFactory.createEmptyBorder(14, 14, 14, 14),
	);

	// Header Panel (identical to AIO Cooking style)
	const headerPanel = panel(new java.awt.GridLayout(2, 1, 2, 2));
	const titleLabel = label('Bank Stander', true);
	titleLabel.setForeground(accent);
	titleLabel.setFont(new java.awt.Font('Dialog', java.awt.Font.BOLD, 22));
	titleLabel.setHorizontalAlignment(0);

	const subtitleLabel = label(
		'Multi-Skill Automation (Herblore • Crafting • Fletching) • by xulixna',
		false,
	);
	subtitleLabel.setForeground(muted);
	subtitleLabel.setFont(new java.awt.Font('Dialog', java.awt.Font.PLAIN, 12));
	subtitleLabel.setHorizontalAlignment(0);

	headerPanel.add(titleLabel);
	headerPanel.add(subtitleLabel);
	mainPanel.add(headerPanel, java.awt.BorderLayout.NORTH);

	// Initial enabled skills set
	const initialEnabled = new Set(
		initial.skills && initial.skills.length > 0
			? initial.skills
			: [initial.skill ?? 'Herblore'],
	);

	// Sidebar (Skill queue + Navigation)
	const sidebarArea = panel(new java.awt.BorderLayout(0, 10));
	sidebarArea.setPreferredSize(new java.awt.Dimension(200, 0));

	const skillBox = panel(new java.awt.GridLayout(0, 1, 0, 8), surface);
	skillBox.setBorder(createSectionBorder('Queue & Skills'));

	const herbCb = checkbox('', initialEnabled.has('Herblore'), surface);
	herbCb.setToolTipText('Include Herblore in the execution queue');
	const herbButton = new javax.swing.JButton('1. Herblore');
	herbButton.setFont(new java.awt.Font('Dialog', java.awt.Font.BOLD, 12));
	herbButton.setFocusPainted(false);
	(herbButton as any).setHorizontalAlignment(2);

	const herbRow = panel(new java.awt.BorderLayout(4, 0), surface);
	herbRow.add(herbCb, java.awt.BorderLayout.WEST);
	herbRow.add(herbButton, java.awt.BorderLayout.CENTER);

	const craftCb = checkbox('', initialEnabled.has('Crafting'), surface);
	craftCb.setToolTipText('Include Crafting in the execution queue');
	const craftButton = new javax.swing.JButton('2. Crafting');
	craftButton.setFont(new java.awt.Font('Dialog', java.awt.Font.BOLD, 12));
	craftButton.setFocusPainted(false);
	(craftButton as any).setHorizontalAlignment(2);

	const craftRow = panel(new java.awt.BorderLayout(4, 0), surface);
	craftRow.add(craftCb, java.awt.BorderLayout.WEST);
	craftRow.add(craftButton, java.awt.BorderLayout.CENTER);

	const fletchCb = checkbox('', initialEnabled.has('Fletching'), surface);
	fletchCb.setToolTipText('Include Fletching in the execution queue');
	const fletchButton = new javax.swing.JButton('3. Fletching');
	fletchButton.setFont(new java.awt.Font('Dialog', java.awt.Font.BOLD, 12));
	fletchButton.setFocusPainted(false);
	(fletchButton as any).setHorizontalAlignment(2);

	const fletchRow = panel(new java.awt.BorderLayout(4, 0), surface);
	fletchRow.add(fletchCb, java.awt.BorderLayout.WEST);
	fletchRow.add(fletchButton, java.awt.BorderLayout.CENTER);

	skillBox.add(herbRow);
	skillBox.add(craftRow);
	skillBox.add(fletchRow);
	sidebarArea.add(skillBox, java.awt.BorderLayout.NORTH);

	const infoBox = panel(new java.awt.GridLayout(0, 1, 0, 4), surface);
	infoBox.setBorder(createSectionBorder('Execution Queue'));
	const info1 = label('Runs checked skills in order:', false);
	info1.setForeground(muted);
	info1.setFont(new java.awt.Font('Dialog', java.awt.Font.BOLD, 11));
	const info2 = label('1. Herblore (Potions)', false);
	info2.setForeground(accent);
	info2.setFont(new java.awt.Font('Dialog', java.awt.Font.PLAIN, 11));
	const info3 = label('2. Crafting (Gem cutting)', false);
	info3.setForeground(accent);
	info3.setFont(new java.awt.Font('Dialog', java.awt.Font.PLAIN, 11));
	const info4 = label('3. Fletching (Bows & darts)', false);
	info4.setForeground(accent);
	info4.setFont(new java.awt.Font('Dialog', java.awt.Font.PLAIN, 11));
	const info5 = label('Auto-deposits & advances', false);
	info5.setForeground(muted);
	info5.setFont(new java.awt.Font('Dialog', java.awt.Font.ITALIC, 11));
	const info6 = label('when bank supplies end.', false);
	info6.setForeground(muted);
	info6.setFont(new java.awt.Font('Dialog', java.awt.Font.ITALIC, 11));
	infoBox.add(info1);
	infoBox.add(info2);
	infoBox.add(info3);
	infoBox.add(info4);
	infoBox.add(info5);
	infoBox.add(info6);
	sidebarArea.add(infoBox, java.awt.BorderLayout.CENTER);

	mainPanel.add(sidebarArea, java.awt.BorderLayout.WEST);

	// Center content area
	const centerArea = panel(new java.awt.BorderLayout(8, 10));
	const heading = label('Herblore', true);
	heading.setForeground(accent);
	heading.setFont(new java.awt.Font('Dialog', java.awt.Font.BOLD, 18));
	centerArea.add(heading, java.awt.BorderLayout.NORTH);

	const pages = panel(new java.awt.BorderLayout());
	centerArea.add(pages, java.awt.BorderLayout.CENTER);
	mainPanel.add(centerArea, java.awt.BorderLayout.CENTER);

	let activeViewSkill: SkillType = initial.skill ?? 'Herblore';

	// General options (Progressive, Chemistry, Target level)
	const progressive = checkbox(
		'Progressive: highest available selected recipe',
		initial.progressive,
		surface,
	);
	const chemistry = checkbox(
		'Use Amulets of Chemistry (Herblore)',
		initial.chemistry,
		surface,
	);
	chemistry.setToolTipText(
		"Regular Amulet of chemistry only. Not Alchemist's amulet.",
	);

	const target = new javax.swing.JTextField(
		String(initial.targetLevel || 0),
		4,
	);
	target.setBackground(surface);
	target.setForeground(foreground);
	target.setCaretColor(accent);
	target.setBorder(
		javax.swing.BorderFactory.createCompoundBorder(
			javax.swing.BorderFactory.createLineBorder(borderLine, 1),
			javax.swing.BorderFactory.createEmptyBorder(4, 6, 4, 6),
		),
	);

	const optionsPanel = panel(
		new java.awt.FlowLayout(java.awt.FlowLayout.LEFT, 16, 6),
		surface,
	);
	optionsPanel.setBorder(createSectionBorder('Execution Options'));
	optionsPanel.add(progressive);
	optionsPanel.add(chemistry);

	const targetSubPanel = panel(
		new java.awt.FlowLayout(java.awt.FlowLayout.LEFT, 6, 0),
		surface,
	);
	const targetLabel = label('Stop at level:');
	const targetHint = label('(0 = no target / until bank is empty)');
	targetHint.setForeground(muted);
	targetSubPanel.add(targetLabel);
	targetSubPanel.add(target);
	targetSubPanel.add(targetHint);
	optionsPanel.add(targetSubPanel);

	// Human timing: reaction delays between batches and random short AFKs.
	const styleSubPanel = panel(
		new java.awt.FlowLayout(java.awt.FlowLayout.LEFT, 6, 0),
		surface,
	);
	const styleCombo = new javax.swing.JComboBox([
		'Normal (active: 1-3s reactions)',
		'Lazy / AFK (relaxed: up to ~10s)',
	]);
	styleCombo.setSelectedIndex(initial.playStyle === 'lazy' ? 1 : 0);
	styleCombo.setBackground(surface);
	styleCombo.setForeground(foreground);
	styleSubPanel.add(label('Play style:'));
	styleSubPanel.add(styleCombo);
	optionsPanel.add(styleSubPanel);
	const afk = checkbox(
		'Random short AFKs while making',
		initial.randomAfk ?? true,
		surface,
	);
	optionsPanel.add(afk);

	// Herblore Content Pages
	const herbPage = panel(new java.awt.BorderLayout(0, 8));
	const herbTop = panel(new java.awt.BorderLayout(0, 4));
	const herbHint = label(
		'Select the stages to run. Enable multiple stages to process your supplies from start to finish.',
		false,
	);
	herbHint.setForeground(muted);
	herbTop.add(herbHint, java.awt.BorderLayout.CENTER);
	herbPage.add(herbTop, java.awt.BorderLayout.NORTH);

	const herbTabs = new javax.swing.JTabbedPane();
	herbTabs.setBackground(surface);
	herbTabs.setForeground(foreground);
	herbPage.add(herbTabs, java.awt.BorderLayout.CENTER);

	const cleanGrid = panel(new java.awt.GridLayout(0, 3, 10, 8));
	const unfGrid = panel(new java.awt.GridLayout(0, 3, 10, 8));
	const finishedGrid = panel(new java.awt.GridLayout(0, 2, 12, 8));

	const rows = HERBS.map((herb) => {
		const cached = initial.herbs[herb.key];
		const clean = checkbox(
			herb.name + '  -  Lv. ' + herb.cleanLevel,
			cached?.clean ?? false,
		);
		const unfinished = checkbox(
			herb.name + '  -  Lv. ' + herb.unfLevel,
			cached?.unfinished ?? false,
		);
		const recipes = POTIONS.filter((entry) => entry.herb === herb.key);
		// Index 0 = None, 1 = Best available, 2+ = a specific recipe.
		const potion = new javax.swing.JComboBox(
			['None', 'Best available (highest you can make)'].concat(
				recipes.map(
					(entry) => entry.name + ' (Lv. ' + entry.level + ')',
				),
			),
		);
		potion.setBackground(surface);
		potion.setForeground(foreground);

		const savedPotion = cached?.potion ?? '';
		const matchedIndex = recipes.findIndex(
			(entry) => entry.name === savedPotion,
		);
		potion.setSelectedIndex(
			savedPotion === BEST_POTION ? 1 : (matchedIndex >= 0 ? matchedIndex + 2 : 0),
		);

		const recipePanel = panel(new java.awt.BorderLayout(4, 4), surface);
		recipePanel.setBorder(
			javax.swing.BorderFactory.createCompoundBorder(
				javax.swing.BorderFactory.createLineBorder(borderLine, 1),
				javax.swing.BorderFactory.createEmptyBorder(6, 8, 6, 8),
			),
		);
		const herbTitle = label(herb.name, true);
		herbTitle.setForeground(accent);
		recipePanel.add(herbTitle, java.awt.BorderLayout.NORTH);
		recipePanel.add(potion, java.awt.BorderLayout.CENTER);

		cleanGrid.add(clean);
		unfGrid.add(unfinished);
		finishedGrid.add(recipePanel);
		return { herb, clean, unfinished, recipes, potion };
	});

	const checklistPage = (
		title: string,
		hint: string,
		grid: javax.swing.JPanel,
		selectAll: () => void,
		clear: () => void,
	): javax.swing.JPanel => {
		const page = panel(new java.awt.BorderLayout(0, 8));
		page.setBorder(javax.swing.BorderFactory.createEmptyBorder(8, 8, 8, 8));

		const top = panel(new java.awt.BorderLayout(8, 8));
		const hintLabel = label(hint, false);
		hintLabel.setForeground(muted);
		hintLabel.setFont(new java.awt.Font('Dialog', java.awt.Font.PLAIN, 12));
		top.add(hintLabel, java.awt.BorderLayout.CENTER);

		const controls = panel(
			new java.awt.FlowLayout(java.awt.FlowLayout.RIGHT, 6, 0),
		);
		const all = button('Select all');
		all.addActionListener(selectAll);
		const none = button('Clear');
		none.addActionListener(clear);
		controls.add(all);
		controls.add(none);
		top.add(controls, java.awt.BorderLayout.EAST);

		page.add(top, java.awt.BorderLayout.NORTH);

		const holder = panel(new java.awt.BorderLayout());
		holder.add(section(title, grid), java.awt.BorderLayout.NORTH);

		const scroll = new javax.swing.JScrollPane(holder);
		scroll.setBorder(javax.swing.BorderFactory.createLineBorder(borderLine, 1));
		(scroll as any).getViewport().setBackground(background);
		scroll.getVerticalScrollBar().setUnitIncrement(16);

		page.add(scroll, java.awt.BorderLayout.CENTER);
		return page;
	};

	herbTabs.addTab(
		'Clean herbs',
		checklistPage(
			'Herbs to clean',
			'Withdraws up to 28 grimy herbs per batch.',
			cleanGrid,
			() => {
				for (const row of rows) row.clean.setSelected(true);
			},
			() => {
				for (const row of rows) row.clean.setSelected(false);
			},
		),
	);

	herbTabs.addTab(
		'Unfinished potions',
		checklistPage(
			'Unfinished potions',
			'Clean herbs + vials of water. Enable Clean herbs as well to use grimy stock.',
			unfGrid,
			() => {
				for (const row of rows) row.unfinished.setSelected(true);
			},
			() => {
				for (const row of rows) row.unfinished.setSelected(false);
			},
		),
	);

	const finishedPage = panel(new java.awt.BorderLayout(0, 8));
	finishedPage.setBorder(
		javax.swing.BorderFactory.createEmptyBorder(8, 8, 8, 8),
	);
	const finishedTop = panel(new java.awt.BorderLayout(8, 8));
	const finishHint = label(
		'Choose one potion per herb, or None. Uses unfinished potions + prepared secondary ingredients.',
		false,
	);
	finishHint.setForeground(muted);
	finishHint.setFont(new java.awt.Font('Dialog', java.awt.Font.PLAIN, 12));
	finishedTop.add(finishHint, java.awt.BorderLayout.CENTER);

	const clearPotions = button('Clear finished potions');
	clearPotions.addActionListener(() => {
		for (const row of rows) row.potion.setSelectedIndex(0);
	});
	const bestPotions = button('All best available');
	bestPotions.addActionListener(() => {
		for (const row of rows) row.potion.setSelectedIndex(1);
	});
	const potionButtons = panel(
		new java.awt.FlowLayout(java.awt.FlowLayout.RIGHT, 6, 0),
	);
	potionButtons.add(bestPotions);
	potionButtons.add(clearPotions);
	finishedTop.add(potionButtons, java.awt.BorderLayout.EAST);

	finishedPage.add(finishedTop, java.awt.BorderLayout.NORTH);

	const finishedHolder = panel(new java.awt.BorderLayout());
	finishedHolder.add(
		section('Finished potions', finishedGrid),
		java.awt.BorderLayout.NORTH,
	);

	const finishScroll = new javax.swing.JScrollPane(finishedHolder);
	finishScroll.setBorder(
		javax.swing.BorderFactory.createLineBorder(borderLine, 1),
	);
	(finishScroll as any).getViewport().setBackground(background);
	finishScroll.getVerticalScrollBar().setUnitIncrement(16);

	finishedPage.add(finishScroll, java.awt.BorderLayout.CENTER);
	herbTabs.addTab('Finished potions', finishedPage);

	// Fletching Content Pages
	const fletchPage = panel(new java.awt.BorderLayout(0, 8));
	const fletchTop = panel(new java.awt.BorderLayout(0, 4));
	const fletchHint = label(
		'Select recipes in any category. All selected categories run together.',
		false,
	);
	fletchHint.setForeground(muted);
	fletchTop.add(fletchHint, java.awt.BorderLayout.CENTER);
	fletchPage.add(fletchTop, java.awt.BorderLayout.NORTH);

	const fletchTabs = new javax.swing.JTabbedPane();
	fletchTabs.setBackground(surface);
	fletchTabs.setForeground(foreground);
	fletchPage.add(fletchTabs, java.awt.BorderLayout.CENTER);

	const initialFletch = new Set(initial.fletching ?? []);
	const fletchRows = FLETCHING.map((job) => ({
		job,
		checkbox: checkbox(
			job.label + '  -  Lv. ' + job.level,
			initialFletch.has(job.key),
		),
	}));

	const categories = [
		{
			kind: 'cut',
			title: 'Cut bows / shafts',
			hint: 'Knife (946) + logs. Select String bows too if you want to finish your bows.',
		},
		{
			kind: 'string',
			title: 'String bows',
			hint: 'Up to 14 unstrung bows + 14 bow strings per batch.',
		},
		{
			kind: 'darts',
			title: 'Darts',
			hint: 'Dart tips + feathers. Uses prepared tips from your bank.',
		},
		{
			kind: 'bolts',
			title: 'Bolts',
			hint: 'Unfinished bolts + feathers. Broad bolts require Broader Fletching.',
		},
		{
			kind: 'arrows',
			title: 'Arrows',
			hint: 'Headless: shafts + feathers. Arrows: headless + tips. Broad requires Broader Fletching.',
		},
	];

	for (const category of categories) {
		const group = fletchRows.filter(
			(row) => row.job.kind === category.kind,
		);
		const grid = panel(new java.awt.GridLayout(0, 2, 8, 8));
		for (const row of group) grid.add(row.checkbox);
		fletchTabs.addTab(
			category.title,
			checklistPage(
				category.title,
				category.hint,
				grid,
				() => {
					for (const row of group) row.checkbox.setSelected(true);
				},
				() => {
					for (const row of group) row.checkbox.setSelected(false);
				},
			),
		);
	}

	// Crafting Content Page (Gem Cutting)
	const initialCraft = new Set(initial.crafting ?? []);
	const craftRows = CRAFTING.map((job) => ({
		job,
		checkbox: checkbox(
			job.label + '  -  Lv. ' + job.level,
			initialCraft.has(job.key),
		),
	}));

	const craftGrid = panel(new java.awt.GridLayout(0, 2, 8, 8));
	for (const row of craftRows) craftGrid.add(row.checkbox);

	const craftPage = checklistPage(
		'Gem Cutting (Chisel + 27 Uncut)',
		'Withdraws 1 Chisel (1755) + 27 uncut gems per batch.',
		craftGrid,
		() => {
			for (const row of craftRows) row.checkbox.setSelected(true);
		},
		() => {
			for (const row of craftRows) row.checkbox.setSelected(false);
		},
	);

	// Footer Action Panel (Start Button + Author info)
	const footer = panel(new java.awt.BorderLayout(0, 10));
	footer.add(optionsPanel, java.awt.BorderLayout.NORTH);

	const buttonPanel = panel(new java.awt.BorderLayout(4, 4));
	const startButton = new javax.swing.JButton('Start Bank Stander');
	startButton.setBackground(buttonBg);
	startButton.setForeground(buttonFg);
	startButton.setFont(new java.awt.Font('Dialog', java.awt.Font.BOLD, 14));
	startButton.setFocusPainted(false);
	startButton.setPreferredSize(new java.awt.Dimension(0, 42));
	startButton.setBorder(
		javax.swing.BorderFactory.createLineBorder(accent, 1),
	);
	buttonPanel.add(startButton, java.awt.BorderLayout.CENTER);

	const footerLabel = label('Created by xulixna • Discord', false);
	footerLabel.setForeground(muted);
	footerLabel.setFont(new java.awt.Font('Dialog', java.awt.Font.PLAIN, 11));
	footerLabel.setHorizontalAlignment(0);
	buttonPanel.add(footerLabel, java.awt.BorderLayout.SOUTH);

	footer.add(buttonPanel, java.awt.BorderLayout.SOUTH);
	mainPanel.add(footer, java.awt.BorderLayout.SOUTH);

	const getChosenSkills = (): SkillType[] => {
		const result: SkillType[] = [];
		if (herbCb.isSelected()) result.push('Herblore');
		if (craftCb.isSelected()) result.push('Crafting');
		if (fletchCb.isSelected()) result.push('Fletching');
		return result;
	};

	const updateStartButtonText = (): void => {
		const chosen = getChosenSkills();
		if (chosen.length === 0) {
			startButton.setText('Select at least one skill in queue');
		} else if (chosen.length === 1) {
			startButton.setText('Start ' + chosen[0]);
		} else {
			startButton.setText(
				`Start Multi-Skill (${chosen.join(' ➔ ')})`,
			);
		}
	};

	herbCb.addActionListener(() => updateStartButtonText());
	craftCb.addActionListener(() => updateStartButtonText());
	fletchCb.addActionListener(() => updateStartButtonText());

	const updateSkillNavButtons = (): void => {
		const isHerb = activeViewSkill === 'Herblore';
		const isCraft = activeViewSkill === 'Crafting';
		const isFletch = activeViewSkill === 'Fletching';

		const setStyle = (btn: javax.swing.JButton, active: boolean) => {
			btn.setBackground(active ? buttonBg : surface);
			btn.setForeground(active ? buttonFg : muted);
			btn.setBorder(
				javax.swing.BorderFactory.createCompoundBorder(
					javax.swing.BorderFactory.createLineBorder(
						active ? accent : borderLine,
						1,
					),
					javax.swing.BorderFactory.createEmptyBorder(6, 10, 6, 10),
				),
			);
		};

		setStyle(herbButton, isHerb);
		setStyle(craftButton, isCraft);
		setStyle(fletchButton, isFletch);
	};

	const selectSkill = (skill: SkillType): void => {
		activeViewSkill = skill;
		pages.removeAll();
		pages.add(
			skill === 'Herblore'
				? herbPage
				: skill === 'Crafting'
					? craftPage
					: fletchPage,
			java.awt.BorderLayout.CENTER,
		);
		pages.revalidate();
		pages.repaint();
		heading.setText(skill + ' Configuration');
		updateSkillNavButtons();
	};

	herbButton.addActionListener(() => selectSkill('Herblore'));
	craftButton.addActionListener(() => selectSkill('Crafting'));
	fletchButton.addActionListener(() => selectSkill('Fletching'));
	selectSkill(activeViewSkill);
	updateStartButtonText();

	// Start Button Action Listener
	startButton.addActionListener(() => {
		const chosenSkills = getChosenSkills();
		if (chosenSkills.length === 0) {
			javax.swing.JOptionPane.showMessageDialog(
				frame,
				'Please check at least one skill in the Queue & Skills panel.',
			);
			return;
		}

		const targetLevel = Number(String(target.getText()).trim());
		if (
			!Number.isFinite(targetLevel) ||
			Math.floor(targetLevel) !== targetLevel ||
			targetLevel < 0 ||
			targetLevel > 99
		) {
			javax.swing.JOptionPane.showMessageDialog(
				frame,
				'Target must be an integer from 0 to 99.',
			);
			return;
		}

		// Validation per enabled skill
		if (chosenSkills.includes('Herblore')) {
			const anyHerb = rows.some(
				(r) =>
					r.clean.isSelected() ||
					r.unfinished.isSelected() ||
					r.potion.getSelectedIndex() > 0,
			);
			if (!anyHerb) {
				javax.swing.JOptionPane.showMessageDialog(
					frame,
					'Herblore is enabled in the queue, but no Herblore recipes are selected.',
				);
				selectSkill('Herblore');
				return;
			}
		}

		if (chosenSkills.includes('Crafting')) {
			const anyCraft = craftRows.some((r) => r.checkbox.isSelected());
			if (!anyCraft) {
				javax.swing.JOptionPane.showMessageDialog(
					frame,
					'Crafting is enabled in the queue, but no gems are selected.',
				);
				selectSkill('Crafting');
				return;
			}
		}

		if (chosenSkills.includes('Fletching')) {
			const anyFletch = fletchRows.some((r) => r.checkbox.isSelected());
			if (!anyFletch) {
				javax.swing.JOptionPane.showMessageDialog(
					frame,
					'Fletching is enabled in the queue, but no Fletching recipes are selected.',
				);
				selectSkill('Fletching');
				return;
			}
		}

		const settings: Settings = {
			skill: chosenSkills[0],
			skills: chosenSkills,
			fletching: fletchRows
				.filter((row) => row.checkbox.isSelected())
				.map((row) => row.job.key),
			crafting: craftRows
				.filter((row) => row.checkbox.isSelected())
				.map((row) => row.job.key),
			progressive: progressive.isSelected(),
			chemistry: chemistry.isSelected(),
			targetLevel,
			herbs: {},
			playStyle: styleCombo.getSelectedIndex() === 1 ? 'lazy' : 'normal',
			randomAfk: afk.isSelected(),
		};

		for (const row of rows) {
			const selection = {
				clean: row.clean.isSelected(),
				unfinished: row.unfinished.isSelected(),
				potion:
					row.potion.getSelectedIndex() === 1
						? BEST_POTION
						: (row.recipes[row.potion.getSelectedIndex() - 2]?.name ?? ''),
			};
			settings.herbs[row.herb.key] = selection;
		}

		saveSettings(settings);
		closeWindow();
		submitted = settings;
	});

	frame.add(mainPanel);
	frame.setSize(1180, 760);
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
