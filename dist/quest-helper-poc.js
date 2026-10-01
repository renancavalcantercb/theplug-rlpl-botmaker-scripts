var DEFAULT_CONFIG = {
  mode: 'INSPECT_ONLY',
  autoWalk: true,
  autoDialogue: true,
  actionDelayTicks: 3
};

var frame = null;
var activeConfig = null;
var ready = false;
var isConfigReady = () => ready;
var getConfig = () => activeConfig || DEFAULT_CONFIG;
var closeUi = () => {
  if (frame) {
    frame.dispose();
    frame = null;
  }
};
var showConfigUi = () => {
  ready = false;
  activeConfig = null;
  var background = new java.awt.Color(0x130E20);
  var surface = new java.awt.Color(0x211738);
  var borderLine = new java.awt.Color(0x3E2D60);
  var foreground = new java.awt.Color(0xF5EEFC);
  var muted = new java.awt.Color(0xA594C6);
  var accent = new java.awt.Color(0xC084FC);
  var buttonBg = new java.awt.Color(0x8B5CF6);
  var buttonFg = new java.awt.Color(0xFFFFFF);
  frame = new javax.swing.JFrame('Quest Helper PoC');
  frame.setSize(480, 460);
  frame.setLocationRelativeTo(null);
  frame.setDefaultCloseOperation(javax.swing.WindowConstants.DISPOSE_ON_CLOSE);
  var root = new javax.swing.JPanel(new java.awt.BorderLayout(12, 12));
  root.setBackground(background);
  root.setBorder(javax.swing.BorderFactory.createEmptyBorder(16, 16, 16, 16));
  var header = new javax.swing.JPanel(new java.awt.GridLayout(0, 1, 4, 4));
  header.setBackground(background);
  var title = new javax.swing.JLabel('🎯 Quest Helper PoC');
  title.setFont(new java.awt.Font('SansSerif', java.awt.Font.BOLD, 18));
  title.setForeground(accent);
  header.add(title);
  var subtitle = new javax.swing.JLabel('<html>Validador da API <code>bot.plugins.questHelper</code> no BotMaker.<br>' + 'Certifique-se de que o plugin <b>Quest Helper</b> está ativo no RuneLite e uma quest selecionada.</html>');
  subtitle.setFont(new java.awt.Font('SansSerif', java.awt.Font.PLAIN, 12));
  subtitle.setForeground(muted);
  header.add(subtitle);
  root.add(header, java.awt.BorderLayout.NORTH);
  var body = new javax.swing.JPanel(new java.awt.GridLayout(0, 1, 8, 8));
  body.setBackground(surface);
  body.setBorder(javax.swing.BorderFactory.createCompoundBorder(javax.swing.BorderFactory.createLineBorder(borderLine, 1), javax.swing.BorderFactory.createEmptyBorder(12, 12, 12, 12)));
  var modeLabel = new javax.swing.JLabel('Modo de Operação:');
  modeLabel.setFont(new java.awt.Font('SansSerif', java.awt.Font.BOLD, 13));
  modeLabel.setForeground(foreground);
  body.add(modeLabel);
  var modeInspect = new javax.swing.JRadioButton('<html><b>1. Apenas Inspecionar (Read-Only)</b><br>' + '<font color="#A594C6">Lê os alvos, overlays, pontos e NPCs do Quest Helper sem clicar nem andar.</font></html>', true);
  modeInspect.setBackground(surface);
  modeInspect.setForeground(foreground);
  body.add(modeInspect);
  var modeExecute = new javax.swing.JRadioButton('<html><b>2. Auto Executor (performNextStep)</b><br>' + '<font color="#A594C6">Chama performNextStep() e usa web walker até o destino se estiver longe.</font></html>', false);
  modeExecute.setBackground(surface);
  modeExecute.setForeground(foreground);
  body.add(modeExecute);
  var group = new javax.swing.ButtonGroup();
  group.add(modeInspect);
  group.add(modeExecute);
  var optionsLabel = new javax.swing.JLabel('Opções de Execução:');
  optionsLabel.setFont(new java.awt.Font('SansSerif', java.awt.Font.BOLD, 13));
  optionsLabel.setForeground(foreground);
  body.add(optionsLabel);
  var autoWalkCb = new javax.swing.JCheckBox('Auto Web-Walk até o WorldPoint (se distância > 6 tiles)', true);
  autoWalkCb.setBackground(surface);
  autoWalkCb.setForeground(foreground);
  body.add(autoWalkCb);
  var autoDialogueCb = new javax.swing.JCheckBox('Auto avançar diálogos (bot.widgets.handleDialogue)', true);
  autoDialogueCb.setBackground(surface);
  autoDialogueCb.setForeground(foreground);
  body.add(autoDialogueCb);
  var delayPanel = new javax.swing.JPanel(new java.awt.FlowLayout(java.awt.FlowLayout.LEFT, 6, 0));
  delayPanel.setBackground(surface);
  var delayLabel = new javax.swing.JLabel('Intervalo entre ações (ticks):');
  delayLabel.setForeground(foreground);
  delayPanel.add(delayLabel);
  var delayField = new javax.swing.JTextField('3', 4);
  delayField.setBackground(background);
  delayField.setForeground(foreground);
  delayField.setCaretColor(accent);
  delayPanel.add(delayField);
  body.add(delayPanel);
  root.add(body, java.awt.BorderLayout.CENTER);
  var startBtn = new javax.swing.JButton('🚀 Iniciar Teste');
  startBtn.setBackground(buttonBg);
  startBtn.setForeground(buttonFg);
  startBtn.setFont(new java.awt.Font('SansSerif', java.awt.Font.BOLD, 14));
  startBtn.setFocusPainted(false);
  startBtn.setBorder(javax.swing.BorderFactory.createEmptyBorder(10, 16, 10, 16));
  startBtn.addActionListener(() => {
    var _frame;
    var ticks = 3;
    try {
      ticks = Math.max(1, parseInt(String(delayField.getText()).trim(), 10) || 3);
    } catch (_unused) {
      ticks = 3;
    }
    activeConfig = {
      mode: modeExecute.isSelected() ? 'PERFORM_STEP' : 'INSPECT_ONLY',
      autoWalk: autoWalkCb.isSelected(),
      autoDialogue: autoDialogueCb.isSelected(),
      actionDelayTicks: ticks
    };
    ready = true;
    (_frame = frame) === null || _frame === void 0 || _frame.dispose();
    frame = null;
  });
  root.add(startBtn, java.awt.BorderLayout.SOUTH);
  frame.setContentPane(root);
  frame.setVisible(true);
};

var tickCount = 0;
var lastActionTick = 0;
var lastLogQuest = '';
var lastLogStep = '';
var lastX = 0;
var lastY = 0;
var lastPlane = 0;
var stationaryTicks = 0;
function log(msg) {
  try {
    bot.printLogMessage('[QH-POC] ' + msg);
  } catch (_unused) {}
}
function gameMsg(msg) {
  try {
    bot.printGameMessage('[QH-POC] ' + msg);
  } catch (_unused2) {}
}
function safeCall(fn, fallback) {
  try {
    var val = fn();
    return val !== undefined && val !== null ? val : fallback;
  } catch (_unused3) {
    return fallback;
  }
}
function isPlayerMoving() {
  try {
    var player = client.getLocalPlayer();
    if (!player) return false;
    var pose = player.getPoseAnimation();
    var idlePose = player.getIdlePoseAnimation();
    if (pose !== idlePose && pose !== -1) {
      return true;
    }
    if (bot.localPlayerMoving()) {
      return true;
    }
    if (bot.walking.isWebWalking() || bot.walking.isRlplWebWalking()) {
      return true;
    }
  } catch (_unused4) {}
  return false;
}
function isDialogueOpen() {
  try {
    var dialogWidget = client.getWidget(231, 5) || client.getWidget(217, 5) || client.getWidget(219, 1) || client.getWidget(193, 2);
    if (dialogWidget && !dialogWidget.isHidden()) {
      return true;
    }
  } catch (_unused5) {}
  return false;
}
function handleDialogue() {
  try {
    return bot.widgets.handleDialogue(['Continue', 'Yes.', 'Yes', 'Okay', 'Talk', 'Can you help me', 'I am looking for a quest', 'What can I do?']);
  } catch (_unused6) {
    return false;
  }
}
function startRunner(config) {
  var _bot;
  tickCount = 0;
  lastActionTick = 0;
  lastLogQuest = '';
  lastLogStep = '';
  lastX = 0;
  lastY = 0;
  lastPlane = 0;
  stationaryTicks = 0;
  gameMsg('=== INICIANDO QUEST HELPER POC ===');
  log("Modo: ".concat(config.mode, " | Intervalo: ").concat(config.actionDelayTicks, " ticks"));
  if (typeof ((_bot = bot) === null || _bot === void 0 || (_bot = _bot.plugins) === null || _bot === void 0 ? void 0 : _bot.questHelper) === 'undefined') {
    gameMsg('❌ ERRO: bot.plugins.questHelper NÃO está disponível no client!');
    log('bot.plugins.questHelper é indefinido. Certifique-se de que o plugin Quest Helper está ativo no RuneLite.');
    return;
  }
  gameMsg('✅ bot.plugins.questHelper detectado com sucesso!');
}
function tickRunner(config) {
  var _bot2;
  tickCount++;
  if (typeof ((_bot2 = bot) === null || _bot2 === void 0 || (_bot2 = _bot2.plugins) === null || _bot2 === void 0 ? void 0 : _bot2.questHelper) === 'undefined') {
    if (tickCount % 20 === 0) {
      log('Aguardando bot.plugins.questHelper ficar disponível...');
    }
    return;
  }
  var player = client.getLocalPlayer();
  if (player) {
    var loc = player.getWorldLocation();
    if (loc) {
      var currentX = loc.getX();
      var currentY = loc.getY();
      var currentPlane = loc.getPlane();
      if (currentX !== lastX || currentY !== lastY || currentPlane !== lastPlane) {
        lastX = currentX;
        lastY = currentY;
        lastPlane = currentPlane;
        stationaryTicks = 0;
        return;
      }
    }
  }
  if (isPlayerMoving()) {
    stationaryTicks = 0;
    return;
  }
  stationaryTicks++;
  if (stationaryTicks < 2) {
    return;
  }
  if (tickCount - lastActionTick < config.actionDelayTicks) {
    return;
  }
  if (config.autoDialogue && isDialogueOpen()) {
    log('Avançando diálogo da quest...');
    handleDialogue();
    lastActionTick = tickCount;
    return;
  }
  var qh = bot.plugins.questHelper;
  var questName = safeCall(() => qh.getCurrentQuestName(), '');
  var isStarted = safeCall(() => qh.isQuestStarted(), false);
  var overlayText = safeCall(() => qh.getOverlayText(), '');
  if (!questName) {
    if (tickCount % 15 === 0) {
      log('Nenhuma quest ativa no Quest Helper. Selecione uma no painel do RuneLite!');
      gameMsg('⚠️ Nenhuma quest ativa no Quest Helper.');
      lastActionTick = tickCount;
    }
    return;
  }
  var stepChanged = questName !== lastLogQuest || overlayText !== lastLogStep;
  if (stepChanged) {
    lastLogQuest = questName;
    lastLogStep = overlayText;
    log("----------------------------------------");
    log("\uD83D\uDCD6 Quest: ".concat(questName, " (Iniciada: ").concat(isStarted, ")"));
    log("\uD83D\uDCDD Passo: \"".concat(overlayText || 'Sem instrução', "\""));
    gameMsg("\uD83D\uDCDD Passo: ".concat(overlayText || '...'));
  }
  if (config.mode === 'INSPECT_ONLY') {
    lastActionTick = tickCount;
    return;
  }
  try {
    log('Executando performNextStep()...');
    var result = qh.performNextStep();
    log("\u26A1 performNextStep() -> ".concat(result));
    stationaryTicks = 0;
    lastActionTick = tickCount + 2;
  } catch (err) {
    log("Erro no performNextStep: ".concat(String(err)));
    lastActionTick = tickCount;
  }
}
function stopRunner() {
  gameMsg('=== QUEST HELPER POC ENCERRADO ===');
  log('Finalizado.');
}

var running = false;
function onStart() {
  running = false;
  showConfigUi();
}
function onGameTick() {
  try {
    if (!running) {
      if (!isConfigReady()) return;
      startRunner(getConfig());
      running = true;
    }
    tickRunner(getConfig());
  } catch (err) {
    bot.printLogMessage('[QH-POC] Erro no tick: ' + String(err));
  }
}
function onEnd() {
  if (running) {
    stopRunner();
    running = false;
  }
  closeUi();
}
