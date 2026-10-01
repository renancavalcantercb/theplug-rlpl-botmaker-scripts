/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument */
import { QuestHelperPocConfig } from './types.js';

let tickCount = 0;
let lastActionTick = 0;
let lastLogQuest = '';
let lastLogStep = '';

// Rastreamento de movimento preciso para nunca travar enquanto anda
let lastX = 0;
let lastY = 0;
let lastPlane = 0;
let stationaryTicks = 0;

function log(msg: string): void {
	try {
		bot.printLogMessage('[QH-POC] ' + msg);
	} catch {
		// Fallback
	}
}

function gameMsg(msg: string): void {
	try {
		bot.printGameMessage('[QH-POC] ' + msg);
	} catch {
		// Fallback
	}
}

function safeCall<T>(fn: () => T, fallback: T): T {
	try {
		const val = fn();
		return val !== undefined && val !== null ? val : fallback;
	} catch {
		return fallback;
	}
}

function isPlayerMoving(): boolean {
	try {
		const player = client.getLocalPlayer();
		if (!player) return false;

		// Checagem de animação de caminhada/corrida
		const pose = player.getPoseAnimation();
		const idlePose = player.getIdlePoseAnimation();
		if (pose !== idlePose && pose !== -1) {
			return true;
		}

		if (bot.localPlayerMoving()) {
			return true;
		}

		if (bot.walking.isWebWalking() || bot.walking.isRlplWebWalking()) {
			return true;
		}
	} catch {
		// Fallback
	}
	return false;
}

function isDialogueOpen(): boolean {
	try {
		const dialogWidget =
			client.getWidget(231, 5) ||
			client.getWidget(217, 5) ||
			client.getWidget(219, 1) ||
			client.getWidget(193, 2);
		if (dialogWidget && !dialogWidget.isHidden()) {
			return true;
		}
	} catch {
		// Fallback
	}
	return false;
}

function handleDialogue(): boolean {
	try {
		return bot.widgets.handleDialogue([
			'Continue',
			'Yes.',
			'Yes',
			'Okay',
			'Talk',
			'Can you help me',
			'I am looking for a quest',
			'What can I do?',
		]);
	} catch {
		return false;
	}
}

export function startRunner(config: QuestHelperPocConfig): void {
	tickCount = 0;
	lastActionTick = 0;
	lastLogQuest = '';
	lastLogStep = '';
	lastX = 0;
	lastY = 0;
	lastPlane = 0;
	stationaryTicks = 0;

	gameMsg('=== INICIANDO QUEST HELPER POC ===');
	log(`Modo: ${config.mode} | Intervalo: ${config.actionDelayTicks} ticks`);

	if (typeof bot?.plugins?.questHelper === 'undefined') {
		gameMsg('❌ ERRO: bot.plugins.questHelper NÃO está disponível no client!');
		log('bot.plugins.questHelper é indefinido. Certifique-se de que o plugin Quest Helper está ativo no RuneLite.');
		return;
	}

	gameMsg('✅ bot.plugins.questHelper detectado com sucesso!');
}

export function tickRunner(config: QuestHelperPocConfig): void {
	tickCount++;

	if (typeof bot?.plugins?.questHelper === 'undefined') {
		if (tickCount % 20 === 0) {
			log('Aguardando bot.plugins.questHelper ficar disponível...');
		}
		return;
	}

	// 1. VERIFICAÇÃO DE MOVIMENTO PELAS COORDENADAS DO JOGADOR
	// Se o jogador estiver andando (mudando de tile ou com animação de andar),
	// NÃO fazemos absolutamente nada para o jogo rodar a 60 FPS lisinho sem engasgos.
	const player = client.getLocalPlayer();
	if (player) {
		const loc = player.getWorldLocation();
		if (loc) {
			const currentX = loc.getX();
			const currentY = loc.getY();
			const currentPlane = loc.getPlane();

			// Mudou de posição? Está andando!
			if (currentX !== lastX || currentY !== lastY || currentPlane !== lastPlane) {
				lastX = currentX;
				lastY = currentY;
				lastPlane = currentPlane;
				stationaryTicks = 0;
				return; // Sai imediatamente, sem escanear o mapa nem chamar nada
			}
		}
	}

	// Também checa pose de animação e flags de movimentação
	if (isPlayerMoving()) {
		stationaryTicks = 0;
		return;
	}

	// Jogador está parado. Conta quantos ticks ele está parado antes de agir (estabilização)
	stationaryTicks++;
	if (stationaryTicks < 2) {
		// Espera pelo menos 2 ticks parado (1.2s) para garantir que terminou o movimento
		return;
	}

	// 2. Respeita o cooldown de ações
	if (tickCount - lastActionTick < config.actionDelayTicks) {
		return;
	}

	// 3. DIÁLOGOS: Se houver diálogo aberto, avança
	if (config.autoDialogue && isDialogueOpen()) {
		log('Avançando diálogo da quest...');
		handleDialogue();
		lastActionTick = tickCount;
		return;
	}

	const qh = bot.plugins.questHelper;

	// 4. LÊ INFORMAÇÕES DA QUEST (agora que o player está 100% parado)
	const questName = safeCall(() => qh.getCurrentQuestName(), '');
	const isStarted = safeCall(() => qh.isQuestStarted(), false);
	const overlayText = safeCall(() => qh.getOverlayText(), '');

	if (!questName) {
		if (tickCount % 15 === 0) {
			log('Nenhuma quest ativa no Quest Helper. Selecione uma no painel do RuneLite!');
			gameMsg('⚠️ Nenhuma quest ativa no Quest Helper.');
			lastActionTick = tickCount;
		}
		return;
	}

	const stepChanged = questName !== lastLogQuest || overlayText !== lastLogStep;
	if (stepChanged) {
		lastLogQuest = questName;
		lastLogStep = overlayText;

		log(`----------------------------------------`);
		log(`📖 Quest: ${questName} (Iniciada: ${isStarted})`);
		log(`📝 Passo: "${overlayText || 'Sem instrução'}"`);
		gameMsg(`📝 Passo: ${overlayText || '...'}`);
	}

	// Se estiver no modo somente leitura (Inspect), encerra aqui
	if (config.mode === 'INSPECT_ONLY') {
		lastActionTick = tickCount;
		return;
	}

	// 5. EXECUTA O PRÓXIMO PASSO (performNextStep)
	try {
		log('Executando performNextStep()...');
		const result = qh.performNextStep();
		log(`⚡ performNextStep() -> ${result}`);

		// Reinicia a contagem de parado para dar tempo da ação/caminhada começar
		stationaryTicks = 0;
		lastActionTick = tickCount + 2; // Cooldown de 2 ticks adicionais
	} catch (err) {
		log(`Erro no performNextStep: ${String(err)}`);
		lastActionTick = tickCount;
	}
}

export function stopRunner(): void {
	gameMsg('=== QUEST HELPER POC ENCERRADO ===');
	log('Finalizado.');
}
