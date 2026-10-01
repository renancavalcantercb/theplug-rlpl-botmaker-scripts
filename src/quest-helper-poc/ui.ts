/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument */
import { DEFAULT_CONFIG, QuestHelperPocConfig } from './types.js';

let frame: javax.swing.JFrame | null = null;
let activeConfig: QuestHelperPocConfig | null = null;
let ready = false;

export const isConfigReady = (): boolean => ready;
export const getConfig = (): QuestHelperPocConfig => activeConfig || DEFAULT_CONFIG;

export const closeUi = (): void => {
	if (frame) {
		frame.dispose();
		frame = null;
	}
};

export const showConfigUi = (): void => {
	ready = false;
	activeConfig = null;

	const background = new java.awt.Color(0x130E20);
	const surface = new java.awt.Color(0x211738);
	const borderLine = new java.awt.Color(0x3E2D60);
	const foreground = new java.awt.Color(0xF5EEFC);
	const muted = new java.awt.Color(0xA594C6);
	const accent = new java.awt.Color(0xC084FC);
	const buttonBg = new java.awt.Color(0x8B5CF6);
	const buttonFg = new java.awt.Color(0xFFFFFF);

	frame = new javax.swing.JFrame('Quest Helper PoC');
	frame.setSize(480, 460);
	frame.setLocationRelativeTo(null);
	frame.setDefaultCloseOperation(javax.swing.WindowConstants.DISPOSE_ON_CLOSE);

	const root = new javax.swing.JPanel(new java.awt.BorderLayout(12, 12));
	root.setBackground(background);
	root.setBorder(javax.swing.BorderFactory.createEmptyBorder(16, 16, 16, 16));

	// HEADER
	const header = new javax.swing.JPanel(new java.awt.GridLayout(0, 1, 4, 4));
	header.setBackground(background);

	const title = new javax.swing.JLabel('🎯 Quest Helper PoC');
	title.setFont(new java.awt.Font('SansSerif', java.awt.Font.BOLD, 18));
	title.setForeground(accent);
	header.add(title);

	const subtitle = new javax.swing.JLabel(
		'<html>Validador da API <code>bot.plugins.questHelper</code> no BotMaker.<br>' +
		'Certifique-se de que o plugin <b>Quest Helper</b> está ativo no RuneLite e uma quest selecionada.</html>'
	);
	subtitle.setFont(new java.awt.Font('SansSerif', java.awt.Font.PLAIN, 12));
	subtitle.setForeground(muted);
	header.add(subtitle);

	root.add(header, java.awt.BorderLayout.NORTH);

	// CENTER CARD
	const body = new javax.swing.JPanel(new java.awt.GridLayout(0, 1, 8, 8));
	body.setBackground(surface);
	body.setBorder(javax.swing.BorderFactory.createCompoundBorder(
		javax.swing.BorderFactory.createLineBorder(borderLine, 1),
		javax.swing.BorderFactory.createEmptyBorder(12, 12, 12, 12)
	));

	const modeLabel = new javax.swing.JLabel('Modo de Operação:');
	modeLabel.setFont(new java.awt.Font('SansSerif', java.awt.Font.BOLD, 13));
	modeLabel.setForeground(foreground);
	body.add(modeLabel);

	const modeInspect = new javax.swing.JRadioButton(
		'<html><b>1. Apenas Inspecionar (Read-Only)</b><br>' +
		'<font color="#A594C6">Lê os alvos, overlays, pontos e NPCs do Quest Helper sem clicar nem andar.</font></html>',
		true
	);
	modeInspect.setBackground(surface);
	modeInspect.setForeground(foreground);
	body.add(modeInspect);

	const modeExecute = new javax.swing.JRadioButton(
		'<html><b>2. Auto Executor (performNextStep)</b><br>' +
		'<font color="#A594C6">Chama performNextStep() e usa web walker até o destino se estiver longe.</font></html>',
		false
	);
	modeExecute.setBackground(surface);
	modeExecute.setForeground(foreground);
	body.add(modeExecute);

	const group = new javax.swing.ButtonGroup();
	group.add(modeInspect);
	group.add(modeExecute);

	const optionsLabel = new javax.swing.JLabel('Opções de Execução:');
	optionsLabel.setFont(new java.awt.Font('SansSerif', java.awt.Font.BOLD, 13));
	optionsLabel.setForeground(foreground);
	body.add(optionsLabel);

	const autoWalkCb = new javax.swing.JCheckBox('Auto Web-Walk até o WorldPoint (se distância > 6 tiles)', true);
	autoWalkCb.setBackground(surface);
	autoWalkCb.setForeground(foreground);
	body.add(autoWalkCb);

	const autoDialogueCb = new javax.swing.JCheckBox('Auto avançar diálogos (bot.widgets.handleDialogue)', true);
	autoDialogueCb.setBackground(surface);
	autoDialogueCb.setForeground(foreground);
	body.add(autoDialogueCb);

	const delayPanel = new javax.swing.JPanel(new java.awt.FlowLayout(java.awt.FlowLayout.LEFT, 6, 0));
	delayPanel.setBackground(surface);
	const delayLabel = new javax.swing.JLabel('Intervalo entre ações (ticks):');
	delayLabel.setForeground(foreground);
	delayPanel.add(delayLabel);

	const delayField = new javax.swing.JTextField('3', 4);
	delayField.setBackground(background);
	delayField.setForeground(foreground);
	delayField.setCaretColor(accent);
	delayPanel.add(delayField);
	body.add(delayPanel);

	root.add(body, java.awt.BorderLayout.CENTER);

	// FOOTER BUTTON
	const startBtn = new javax.swing.JButton('🚀 Iniciar Teste');
	startBtn.setBackground(buttonBg);
	startBtn.setForeground(buttonFg);
	startBtn.setFont(new java.awt.Font('SansSerif', java.awt.Font.BOLD, 14));
	startBtn.setFocusPainted(false);
	startBtn.setBorder(javax.swing.BorderFactory.createEmptyBorder(10, 16, 10, 16));

	startBtn.addActionListener(() => {
		let ticks = 3;
		try {
			ticks = Math.max(1, parseInt(String(delayField.getText()).trim(), 10) || 3);
		} catch {
			ticks = 3;
		}

		activeConfig = {
			mode: modeExecute.isSelected() ? 'PERFORM_STEP' : 'INSPECT_ONLY',
			autoWalk: autoWalkCb.isSelected(),
			autoDialogue: autoDialogueCb.isSelected(),
			actionDelayTicks: ticks,
		};

		ready = true;
		frame?.dispose();
		frame = null;
	});

	root.add(startBtn, java.awt.BorderLayout.SOUTH);

	frame.setContentPane(root);
	frame.setVisible(true);
};
