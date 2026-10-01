function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray(r);
}
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: false
  }), e;
}
function _createForOfIteratorHelper(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e) {
      t && (r = t);
      var n = 0,
        F = function () {};
      return {
        s: F,
        n: function () {
          return n >= r.length ? {
            done: true
          } : {
            done: false,
            value: r[n++]
          };
        },
        e: function (r) {
          throw r;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o,
    a = true,
    u = false;
  return {
    s: function () {
      t = t.call(r);
    },
    n: function () {
      var r = t.next();
      return a = r.done, r;
    },
    e: function (r) {
      u = true, o = r;
    },
    f: function () {
      try {
        a || null == t.return || t.return();
      } finally {
        if (u) throw o;
      }
    }
  };
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[r] = t, e;
}
function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (String )(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

var METHOD_CATALOG = [{
  id: 'TAN_COWHIDE',
  name: 'Tanning Cowhides (Al-Kharid)',
  category: 'Tanning',
  description: 'Take coins and cowhides to Ellis in Al-Kharid to tan into soft leather.',
  approxGpPerHour: 240000,
  requiresGp: true,
  requiredSkills: {}
}, {
  id: 'BUY_FEATHERS',
  name: 'Buying Feather Packs (Port Sarim)',
  category: 'ShopRun',
  description: 'Buy feather packs from Gerrant in Port Sarim, open them into stackable feathers, and bank.',
  approxGpPerHour: 235000,
  requiresGp: true,
  requiredSkills: {}
}, {
  id: 'GRIND_CHOCOLATE',
  name: 'Grinding Chocolate (Pestle & Mortar)',
  category: 'Processing',
  description: 'Grind chocolate bars into chocolate dust at the bank using a pestle and mortar.',
  approxGpPerHour: 190000,
  requiresGp: true,
  requiredSkills: {}
}, {
  id: 'CRAFT_EMERALD_RING',
  name: 'Crafting Emerald Rings (Al-Kharid)',
  category: 'Jewelry',
  description: 'Craft gold bars and emeralds into emerald rings at the Al-Kharid furnace.',
  approxGpPerHour: 300000,
  requiresGp: true,
  requiredSkills: {
    crafting: 27
  }
}, {
  id: 'CRAFT_SAPPHIRE_RING',
  name: 'Crafting Sapphire Rings (Al-Kharid)',
  category: 'Jewelry',
  description: 'Craft gold bars and sapphires into sapphire rings at the Al-Kharid furnace.',
  approxGpPerHour: 275000,
  requiresGp: true,
  requiredSkills: {
    crafting: 20
  }
}, {
  id: 'CRAFT_RUBY_RING',
  name: 'Crafting Ruby Rings (Al-Kharid)',
  category: 'Jewelry',
  description: 'Craft gold bars and rubies into ruby rings at the Al-Kharid furnace.',
  approxGpPerHour: 255000,
  requiresGp: true,
  requiredSkills: {
    crafting: 34
  }
}, {
  id: 'CRAFT_GOLD_AMULET',
  name: 'Crafting Gold Amulets (Al-Kharid)',
  category: 'Jewelry',
  description: 'Craft gold bars into unstrung gold amulets at the Al-Kharid furnace.',
  approxGpPerHour: 135000,
  requiresGp: true,
  requiredSkills: {
    crafting: 8
  }
}, {
  id: 'HIGH_ALCH',
  name: 'High Alchemy (Varrock/Bank)',
  category: 'Magic',
  description: 'Convert high-value items into coins using a Fire Staff and Nature Runes.',
  approxGpPerHour: 540000,
  requiresGp: true,
  requiredSkills: {
    magic: 55
  }
}, {
  id: 'TELEGRAB_WINE',
  name: 'Telegrab Wine of Zamorak (Chaos Temple)',
  category: 'Magic',
  description: 'Collect Wine of Zamorak at the Chaos Temple using Telekinetic Grab.',
  approxGpPerHour: 82000,
  requiresGp: true,
  requiredSkills: {
    magic: 33
  }
}, {
  id: 'MAKE_PIE_SHELLS',
  name: 'Making Pie Shells (Bank)',
  category: 'Processing',
  description: 'Mix pastry dough with pie dishes at the bank.',
  approxGpPerHour: 260000,
  requiresGp: true,
  requiredSkills: {}
}, {
  id: 'MAKE_PIZZA_BASES',
  name: 'Making Pizza Bases (Bank)',
  category: 'Processing',
  description: 'Mix pots of flour with buckets of water to create pizza bases.',
  approxGpPerHour: 62000,
  requiresGp: true,
  requiredSkills: {
    cooking: 35
  }
}, {
  id: 'WC_YEWS',
  name: 'Cutting Yew Logs (Draynor/Edgeville)',
  category: 'Gathering',
  description: 'Chop Yew trees and deposit logs into the nearest bank. Zero cost.',
  approxGpPerHour: 110000,
  requiresGp: false,
  requiredSkills: {
    woodcutting: 60
  }
}, {
  id: 'WC_OAKS',
  name: 'Cutting Oak Logs (Draynor/Lumbridge)',
  category: 'Gathering',
  description: 'Chop Oak trees and deposit logs into the nearest bank. Zero cost.',
  approxGpPerHour: 51000,
  requiresGp: false,
  requiredSkills: {
    woodcutting: 15
  }
}, {
  id: 'MINE_IRON',
  name: 'Mining Iron Ore (Al-Kharid/Varrock)',
  category: 'Gathering',
  description: 'Mine iron ore and deposit into the nearest bank. Zero cost.',
  approxGpPerHour: 75000,
  requiresGp: false,
  requiredSkills: {
    mining: 15
  }
}, {
  id: 'MINE_CLAY',
  name: 'Mining Clay (South-west Varrock)',
  category: 'Gathering',
  description: 'Mine clay at South-west Varrock mine close to the west bank. Zero cost.',
  approxGpPerHour: 55000,
  requiresGp: false,
  requiredSkills: {
    mining: 1
  }
}];

var CACHE_PREFIX = 'f2pMoneyMaker.';
var defaultSettings = {
  general: {
    executionMode: 'AUTO',
    selectedMethod: 'TAN_COWHIDE',
    stoppingMode: 'INDEFINITE',
    targetGp: 1000000,
    timeLimitHours: 4,
    playStyle: 'normal',
    noobMode: true,
    takeBreaks: true,
    bankMicroPauses: true
  },
  specific: {
    wcOakLocation: 'Draynor',
    wcYewLocation: 'Edgeville',
    mineLocation: 'Varrock SW',
    alchItemName: 'Rune 2h sword',
    alchItemId: 1319,
    leatherType: 'soft'
  }
};
var getCachedString = (key, fallback) => {
  try {
    return String(bot.bmCache.getString(key, fallback));
  } catch (_unused) {
    return fallback;
  }
};
var getCachedInt = (key, fallback) => {
  try {
    var value = Number(bot.bmCache.getInt(key, fallback));
    return isNaN(value) ? fallback : value;
  } catch (_unused2) {
    return fallback;
  }
};
var getCachedBoolean = (key, fallback) => {
  try {
    return Boolean(bot.bmCache.getBoolean(key, fallback));
  } catch (_unused3) {
    return fallback;
  }
};
var getOakLocation = () => {
  var value = getCachedString(CACHE_PREFIX + 'specific.wcOakLocation', getCachedString(CACHE_PREFIX + 'specific.wcLocation', 'Draynor'));
  return value === 'Lumbridge' ? 'Lumbridge' : 'Draynor';
};
var getYewLocation = () => getCachedString(CACHE_PREFIX + 'specific.wcYewLocation', 'Edgeville') === 'Varrock Palace' ? 'Varrock Palace' : 'Edgeville';
var getMineLocation = () => {
  var value = getCachedString(CACHE_PREFIX + 'specific.mineLocation', 'Varrock SW');
  if (value === 'Al-Kharid' || value === 'Lumbridge West') return value;
  return 'Varrock SW';
};
var loadSettings = () => {
  var configured = getCachedBoolean(CACHE_PREFIX + 'configured', false);
  if (!configured) {
    return JSON.parse(JSON.stringify(defaultSettings));
  }
  var execModeString = getCachedString(CACHE_PREFIX + 'general.executionMode', 'AUTO');
  var executionMode = execModeString === 'MANUAL' ? 'MANUAL' : 'AUTO';
  var selectedMethod = getCachedString(CACHE_PREFIX + 'general.selectedMethod', 'TAN_COWHIDE');
  var stoppingModeString = getCachedString(CACHE_PREFIX + 'general.stoppingMode', 'INDEFINITE');
  var stoppingMode = stoppingModeString === 'TARGET_GP' ? 'TARGET_GP' : stoppingModeString === 'TIME_LIMIT' ? 'TIME_LIMIT' : 'INDEFINITE';
  var playStyleString = getCachedString(CACHE_PREFIX + 'general.playStyle', 'normal');
  var playStyle = playStyleString === 'fast' || playStyleString === 'lazy' ? playStyleString : 'normal';
  return {
    general: {
      executionMode,
      selectedMethod,
      stoppingMode,
      targetGp: getCachedInt(CACHE_PREFIX + 'general.targetGp', 1000000),
      timeLimitHours: getCachedInt(CACHE_PREFIX + 'general.timeLimitHours', 4),
      playStyle,
      noobMode: getCachedBoolean(CACHE_PREFIX + 'general.noobMode', true),
      takeBreaks: getCachedBoolean(CACHE_PREFIX + 'general.takeBreaks', true),
      bankMicroPauses: getCachedBoolean(CACHE_PREFIX + 'general.bankMicroPauses', true)
    },
    specific: {
      wcOakLocation: getOakLocation(),
      wcYewLocation: getYewLocation(),
      mineLocation: getMineLocation(),
      alchItemName: getCachedString(CACHE_PREFIX + 'specific.alchItemName', 'Rune 2h sword'),
      alchItemId: getCachedInt(CACHE_PREFIX + 'specific.alchItemId', 1319),
      leatherType: getCachedString(CACHE_PREFIX + 'specific.leatherType', 'soft') === 'hard' ? 'hard' : 'soft'
    }
  };
};
var saveSettings = settings => {
  bot.bmCache.saveBoolean(CACHE_PREFIX + 'configured', true);
  bot.bmCache.saveString(CACHE_PREFIX + 'general.executionMode', settings.general.executionMode);
  bot.bmCache.saveString(CACHE_PREFIX + 'general.selectedMethod', settings.general.selectedMethod);
  bot.bmCache.saveString(CACHE_PREFIX + 'general.stoppingMode', settings.general.stoppingMode);
  bot.bmCache.saveInt(CACHE_PREFIX + 'general.targetGp', settings.general.targetGp);
  bot.bmCache.saveInt(CACHE_PREFIX + 'general.timeLimitHours', settings.general.timeLimitHours);
  bot.bmCache.saveString(CACHE_PREFIX + 'general.playStyle', settings.general.playStyle);
  bot.bmCache.saveBoolean(CACHE_PREFIX + 'general.noobMode', settings.general.noobMode);
  bot.bmCache.saveBoolean(CACHE_PREFIX + 'general.takeBreaks', settings.general.takeBreaks);
  bot.bmCache.saveBoolean(CACHE_PREFIX + 'general.bankMicroPauses', settings.general.bankMicroPauses);
  bot.bmCache.saveString(CACHE_PREFIX + 'specific.wcOakLocation', settings.specific.wcOakLocation);
  bot.bmCache.saveString(CACHE_PREFIX + 'specific.wcYewLocation', settings.specific.wcYewLocation);
  bot.bmCache.saveString(CACHE_PREFIX + 'specific.mineLocation', settings.specific.mineLocation);
  bot.bmCache.saveString(CACHE_PREFIX + 'specific.alchItemName', settings.specific.alchItemName);
  bot.bmCache.saveInt(CACHE_PREFIX + 'specific.alchItemId', settings.specific.alchItemId);
  bot.bmCache.saveString(CACHE_PREFIX + 'specific.leatherType', settings.specific.leatherType);
};

var frame = null;
var submitted = null;
var cancelled = false;
var selectedSettings = () => submitted;
var configCancelled = () => cancelled;
var closeWindow = () => {
  if (frame) {
    frame.dispose();
    frame = null;
  }
};
var showWindow = () => {
  submitted = null;
  cancelled = false;
  var initial = loadSettings();
  var background = new java.awt.Color(0x130E20);
  var surface = new java.awt.Color(0x211738);
  var borderLine = new java.awt.Color(0x3E2D60);
  var foreground = new java.awt.Color(0xF5EEFC);
  var muted = new java.awt.Color(0xA594C6);
  var accent = new java.awt.Color(0xF59E0B);
  var buttonBg = new java.awt.Color(0xD97706);
  var buttonFg = new java.awt.Color(0xFFFFFF);
  var cardBg = new java.awt.Color(0x1A122B);
  var panel = function panel(layout) {
    var bg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : background;
    var p = new javax.swing.JPanel(layout);
    p.setBackground(bg);
    return p;
  };
  var label = function label(text) {
    var bold = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : foreground;
    var size = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 12;
    var l = new javax.swing.JLabel(text);
    l.setForeground(color);
    l.setFont(new java.awt.Font('Dialog', bold ? java.awt.Font.BOLD : java.awt.Font.PLAIN, size));
    return l;
  };
  var createSectionBorder = title => {
    var line = javax.swing.BorderFactory.createLineBorder(borderLine, 1);
    var border = javax.swing.BorderFactory.createTitledBorder(line, title);
    border.setTitleColor(accent);
    border.setTitleFont(new java.awt.Font('Dialog', java.awt.Font.BOLD, 12));
    return border;
  };
  var checkbox = function checkbox(text, selected) {
    var bg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : background;
    var callback = new javax.swing.JCheckBox(text, selected);
    callback.setBackground(bg);
    callback.setForeground(foreground);
    callback.setFont(new java.awt.Font('Dialog', java.awt.Font.PLAIN, 12));
    callback.setFocusPainted(false);
    return callback;
  };
  var textField = function textField(text) {
    var columns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 8;
    var tf = new javax.swing.JTextField(text, columns);
    tf.setBackground(surface);
    tf.setForeground(foreground);
    tf.setCaretColor(accent);
    tf.setFont(new java.awt.Font('Dialog', java.awt.Font.PLAIN, 12));
    tf.setBorder(javax.swing.BorderFactory.createCompoundBorder(javax.swing.BorderFactory.createLineBorder(borderLine, 1), javax.swing.BorderFactory.createEmptyBorder(4, 6, 4, 6)));
    return tf;
  };
  var comboBox = function comboBox(items) {
    var selected = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var callback = new javax.swing.JComboBox(items);
    callback.setBackground(surface);
    callback.setForeground(foreground);
    callback.setFont(new java.awt.Font('Dialog', java.awt.Font.PLAIN, 12));
    if (selected) {
      var index = items.indexOf(selected);
      if (index >= 0) callback.setSelectedIndex(index);
    }
    return callback;
  };
  var button = function button(text) {
    var isAccent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var button_ = new javax.swing.JButton(text);
    button_.setBackground(isAccent ? buttonBg : surface);
    button_.setForeground(isAccent ? buttonFg : foreground);
    button_.setFocusPainted(false);
    button_.setFont(new java.awt.Font('Dialog', isAccent ? java.awt.Font.BOLD : java.awt.Font.PLAIN, 12));
    button_.setBorder(javax.swing.BorderFactory.createCompoundBorder(javax.swing.BorderFactory.createLineBorder(isAccent ? accent : borderLine, 1), javax.swing.BorderFactory.createEmptyBorder(6, 16, 6, 16)));
    return button_;
  };
  frame = new javax.swing.JFrame('AIO F2P Money Maker');
  frame.setSize(760, 570);
  frame.setLayout(new java.awt.BorderLayout(0, 0));
  frame.getContentPane().setBackground(background);
  frame.setDefaultCloseOperation(javax.swing.WindowConstants.DISPOSE_ON_CLOSE);
  var header = panel(new java.awt.BorderLayout(), surface);
  header.setBorder(javax.swing.BorderFactory.createCompoundBorder(javax.swing.BorderFactory.createLineBorder(borderLine, 1), javax.swing.BorderFactory.createEmptyBorder(12, 20, 12, 20)));
  var titleBox = panel(new java.awt.GridLayout(2, 1, 0, 2), surface);
  titleBox.add(label('💰 AIO F2P Money Maker', true, accent, 18));
  titleBox.add(label('Smart GP Generation & Zero-Cost Skilling for Old School RuneScape', false, muted, 11));
  header.add(titleBox, java.awt.BorderLayout.WEST);
  var tabs = new javax.swing.JTabbedPane();
  tabs.setBackground(surface);
  tabs.setForeground(foreground);
  tabs.setFont(new java.awt.Font('Dialog', java.awt.Font.BOLD, 12));
  var tabOverview = panel(new java.awt.BorderLayout(10, 10), cardBg);
  tabOverview.setBorder(javax.swing.BorderFactory.createEmptyBorder(16, 16, 16, 16));
  var modePanel = panel(new java.awt.GridLayout(5, 2, 10, 10), surface);
  modePanel.setBorder(createSectionBorder('Execution Mode & Selection'));
  modePanel.add(label('Selection Mode:'));
  var modeCombo = comboBox(['AUTOMATIC (Best by Levels/GP)', 'MANUAL (Pick Method)'], initial.general.executionMode === 'AUTO' ? 'AUTOMATIC (Best by Levels/GP)' : 'MANUAL (Pick Method)');
  modePanel.add(modeCombo);
  modePanel.add(label('Manual Method:'));
  var methodNames = [];
  var initialMethodObject = METHOD_CATALOG[0];
  var _iterator = _createForOfIteratorHelper(METHOD_CATALOG),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var method = _step.value;
      methodNames.push(method.name);
      if (method.id === initial.general.selectedMethod) initialMethodObject = method;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  var methodCombo = comboBox(methodNames, initialMethodObject ? initialMethodObject.name : methodNames[0]);
  modePanel.add(methodCombo);
  modePanel.add(label('Stopping Condition:'));
  var stopCombo = comboBox(['Indefinite (Until stopped)', 'Target GP', 'Time Limit (Hours)'], initial.general.stoppingMode === 'TARGET_GP' ? 'Target GP' : initial.general.stoppingMode === 'TIME_LIMIT' ? 'Time Limit (Hours)' : 'Indefinite (Until stopped)');
  modePanel.add(stopCombo);
  modePanel.add(label('Target GP:'));
  var targetGpField = textField(String(initial.general.targetGp), 10);
  modePanel.add(targetGpField);
  modePanel.add(label('Time Limit (Hours):'));
  var timeLimitField = textField(String(initial.general.timeLimitHours), 10);
  modePanel.add(timeLimitField);
  tabOverview.add(modePanel, java.awt.BorderLayout.NORTH);
  var descBox = panel(new java.awt.BorderLayout(5, 5), surface);
  descBox.setBorder(createSectionBorder('Available Methods in Catalog'));
  var catalogTextArea = new javax.swing.JTextArea();
  catalogTextArea.setBackground(cardBg);
  catalogTextArea.setForeground(muted);
  catalogTextArea.setFont(new java.awt.Font('Monospaced', java.awt.Font.PLAIN, 11));
  catalogTextArea.setEditable(false);
  var catalogText = 'SUPPORTED METHODS IN CATALOG:\n\n';
  var _iterator2 = _createForOfIteratorHelper(METHOD_CATALOG),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var _method = _step2.value;
      var requirements = [];
      var skills = _method.requiredSkills;
      if (skills.woodcutting) requirements.push("woodcutting: ".concat(skills.woodcutting));
      if (skills.mining) requirements.push("mining: ".concat(skills.mining));
      if (skills.crafting) requirements.push("crafting: ".concat(skills.crafting));
      if (skills.magic) requirements.push("magic: ".concat(skills.magic));
      if (skills.cooking) requirements.push("cooking: ".concat(skills.cooking));
      var requirementText = requirements.length > 0 ? requirements.join(', ') : 'None';
      var cost = _method.requiresGp ? 'Requires GP' : 'ZERO Cost';
      catalogText += "- ".concat(_method.name, "\n  Profit: ~").concat(Math.floor(_method.approxGpPerHour / 1000), "k/h | ").concat(cost, " | Requirements: ").concat(requirementText, "\n\n");
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  catalogTextArea.setText(catalogText);
  var scrollPane = new javax.swing.JScrollPane(catalogTextArea);
  scrollPane.setBorder(null);
  descBox.add(scrollPane, java.awt.BorderLayout.CENTER);
  tabOverview.add(descBox, java.awt.BorderLayout.CENTER);
  tabs.addTab('General & Mode', tabOverview);
  var tabGathering = panel(new java.awt.GridLayout(3, 1, 10, 10), cardBg);
  tabGathering.setBorder(javax.swing.BorderFactory.createEmptyBorder(16, 16, 16, 16));
  var wcBox = panel(new java.awt.GridLayout(3, 2, 10, 10), surface);
  wcBox.setBorder(createSectionBorder('Woodcutting Configuration (Oaks & Yews)'));
  wcBox.add(label('Yews Location:'));
  var wcYewCombo = comboBox(['Edgeville', 'Varrock Palace'], initial.specific.wcYewLocation);
  wcBox.add(wcYewCombo);
  wcBox.add(label('Oaks Location:'));
  var wcOakCombo = comboBox(['Draynor', 'Lumbridge'], initial.specific.wcOakLocation);
  wcBox.add(wcOakCombo);
  wcBox.add(label('Deposit:'));
  wcBox.add(label('Nearest bank (automatic)', false, muted));
  tabGathering.add(wcBox);
  var mineBox = panel(new java.awt.GridLayout(2, 2, 10, 10), surface);
  mineBox.setBorder(createSectionBorder('Mining Configuration (Clay & Iron)'));
  mineBox.add(label('Mine Location:'));
  var mineLocCombo = comboBox(['Varrock SW', 'Al-Kharid'], initial.specific.mineLocation);
  mineBox.add(mineLocCombo);
  mineBox.add(label('Tool:'));
  mineBox.add(label('Pickaxe in inventory/bank', false, muted));
  tabGathering.add(mineBox);
  tabs.addTab('Gathering', tabGathering);
  var tabTanning = panel(new java.awt.GridLayout(3, 1, 10, 10), cardBg);
  tabTanning.setBorder(javax.swing.BorderFactory.createEmptyBorder(16, 16, 16, 16));
  var tanBox = panel(new java.awt.GridLayout(2, 2, 10, 10), surface);
  tanBox.setBorder(createSectionBorder('Al-Kharid Tanner (Ellis <-> Bank)'));
  tanBox.add(label('Leather Type:'));
  var leatherCombo = comboBox(['soft (1 gp / ~240k/h)', 'hard (3 gp)'], initial.specific.leatherType === 'hard' ? 'hard (3 gp)' : 'soft (1 gp / ~240k/h)');
  tanBox.add(leatherCombo);
  tanBox.add(label('Route:'));
  tanBox.add(label('Al-Kharid Bank ↔ Ellis', false, muted));
  tabTanning.add(tanBox);
  var shopBox = panel(new java.awt.GridLayout(2, 2, 10, 10), surface);
  shopBox.setBorder(createSectionBorder("Gerrant's Shop (Port Sarim Feathers)"));
  shopBox.add(label('Item Purchased:'));
  shopBox.add(label('Feather packs (100 feathers each)', false, accent));
  shopBox.add(label('Opening:'));
  shopBox.add(label('Opens packs into stackable feathers', false, muted));
  tabTanning.add(shopBox);
  tabs.addTab('Tanning & Shops', tabTanning);
  var tabMagic = panel(new java.awt.GridLayout(3, 1, 10, 10), cardBg);
  tabMagic.setBorder(javax.swing.BorderFactory.createEmptyBorder(16, 16, 16, 16));
  var alchBox = panel(new java.awt.GridLayout(2, 2, 10, 10), surface);
  alchBox.setBorder(createSectionBorder('High Alchemy (Magic 55)'));
  alchBox.add(label('Item for Alch:'));
  var alchNameField = textField(initial.specific.alchItemName, 12);
  alchBox.add(alchNameField);
  alchBox.add(label('Item ID:'));
  var alchIdField = textField(String(initial.specific.alchItemId), 8);
  alchBox.add(alchIdField);
  tabMagic.add(alchBox);
  var wineBox = panel(new java.awt.GridLayout(2, 2, 10, 10), surface);
  wineBox.setBorder(createSectionBorder('Telegrab Wine of Zamorak (Magic 33)'));
  wineBox.add(label('Location:'));
  wineBox.add(label('Chaos Temple (North of Falador)', false, muted));
  wineBox.add(label('Equipment:'));
  wineBox.add(label('Air staff equipped + Law runes in bank', false, muted));
  tabMagic.add(wineBox);
  tabs.addTab('Magic & Jewelry', tabMagic);
  var tabHuman = panel(new java.awt.GridLayout(4, 1, 6, 6), cardBg);
  tabHuman.setBorder(javax.swing.BorderFactory.createEmptyBorder(16, 16, 16, 16));
  var playStyleBox = panel(new java.awt.FlowLayout(java.awt.FlowLayout.LEFT, 10, 0), surface);
  playStyleBox.setBorder(createSectionBorder('Play Style (Reaction & Speed)'));
  playStyleBox.add(label('PlayStyle:'));
  var playStyleCombo = comboBox(['normal', 'fast', 'lazy'], initial.general.playStyle);
  playStyleBox.add(playStyleCombo);
  tabHuman.add(playStyleBox);
  var callbackNoob = checkbox('Noob Mode (occasional reaction hesitations)', initial.general.noobMode, cardBg);
  var callbackBankPauses = checkbox('Bank Micro-Pauses (random delay variation when opening/closing bank)', initial.general.bankMicroPauses, cardBg);
  var callbackBreaks = checkbox('Automatic Breaks (integrated Break Handler)', initial.general.takeBreaks, cardBg);
  tabHuman.add(callbackNoob);
  tabHuman.add(callbackBankPauses);
  tabHuman.add(callbackBreaks);
  tabs.addTab('Humanization', tabHuman);
  frame.add(tabs, java.awt.BorderLayout.CENTER);
  var bottomBar = panel(new java.awt.BorderLayout(), surface);
  bottomBar.setBorder(javax.swing.BorderFactory.createCompoundBorder(javax.swing.BorderFactory.createLineBorder(borderLine, 1), javax.swing.BorderFactory.createEmptyBorder(12, 16, 12, 16)));
  var buttonCancel = button('Cancel', false);
  buttonCancel.addActionListener(() => {
    var _frame;
    cancelled = true;
    (_frame = frame) === null || _frame === void 0 || _frame.dispose();
    frame = null;
  });
  var buttonStart = button('🚀 Start Money Maker', true);
  buttonStart.addActionListener(() => {
    var _frame2;
    var isAuto = String(modeCombo.getSelectedItem()).indexOf('AUTOMATIC') === 0;
    var execMode = isAuto ? 'AUTO' : 'MANUAL';
    var selectedMethodName = String(methodCombo.getSelectedItem());
    var selectedMethodId = 'TAN_COWHIDE';
    var _iterator3 = _createForOfIteratorHelper(METHOD_CATALOG),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var method = _step3.value;
        if (method.name === selectedMethodName) {
          selectedMethodId = method.id;
          break;
        }
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    var stopString = String(stopCombo.getSelectedItem());
    var stoppingMode = stopString.indexOf('Target GP') >= 0 ? 'TARGET_GP' : stopString.indexOf('Time Limit') >= 0 ? 'TIME_LIMIT' : 'INDEFINITE';
    var targetGp = parseInt(String(targetGpField.getText()).trim(), 10) || 1000000;
    var timeLimitHours = parseInt(String(timeLimitField.getText()).trim(), 10) || 4;
    var playStyle = String(playStyleCombo.getSelectedItem());
    var settings = {
      general: {
        executionMode: execMode,
        selectedMethod: selectedMethodId,
        stoppingMode,
        targetGp,
        timeLimitHours,
        playStyle,
        noobMode: callbackNoob.isSelected(),
        takeBreaks: callbackBreaks.isSelected(),
        bankMicroPauses: callbackBankPauses.isSelected()
      },
      specific: {
        wcYewLocation: String(wcYewCombo.getSelectedItem()),
        wcOakLocation: String(wcOakCombo.getSelectedItem()),
        mineLocation: String(mineLocCombo.getSelectedItem()),
        leatherType: String(leatherCombo.getSelectedItem()).indexOf('hard') === 0 ? 'hard' : 'soft',
        alchItemName: alchNameField.getText().trim() || 'Rune 2h sword',
        alchItemId: parseInt(String(alchIdField.getText()).trim(), 10) || 1319
      }
    };
    saveSettings(settings);
    submitted = settings;
    (_frame2 = frame) === null || _frame2 === void 0 || _frame2.dispose();
    frame = null;
  });
  bottomBar.add(buttonCancel, java.awt.BorderLayout.WEST);
  bottomBar.add(buttonStart, java.awt.BorderLayout.EAST);
  frame.add(bottomBar, java.awt.BorderLayout.SOUTH);
  frame.setLocationRelativeTo(null);
  frame.setVisible(true);
};

var game = {
  isLoggedIn: () => client.getGameState() === net.runelite.api.GameState.LOGGED_IN && client.getLocalPlayer() !== null,
  playerLocation: () => {
    var _player$getWorldLocat;
    var player = client.getLocalPlayer();
    if (!player) return null;
    return (_player$getWorldLocat = player.getWorldLocation()) !== null && _player$getWorldLocat !== void 0 ? _player$getWorldLocat : null;
  },
  getRealLevel: skill => {
    try {
      return client.getRealSkillLevel(skill) || 1;
    } catch (_unused) {
      return 1;
    }
  },
  getBoostedLevel: skill => {
    try {
      return client.getBoostedSkillLevel(skill) || 1;
    } catch (_unused2) {
      return 1;
    }
  },
  isIdle: () => bot.localPlayerIdle(),
  isIdleFor: ticks => bot.localPlayerIdleFor(ticks),
  isMoving: () => bot.localPlayerMoving(),
  isBankOpen: () => bot.bank.isOpen(),
  isBankBusy: () => bot.bank.isBanking(),
  openBank: () => {
    var _client$getLocalPlaye, _playerLoc$getPlane;
    if (game.isDialogueOpen()) {
      game.handleDialogue();
      return;
    }
    if (bot.bank.isOpen()) {
      return;
    }
    var playerLoc = (_client$getLocalPlaye = client.getLocalPlayer()) === null || _client$getLocalPlaye === void 0 ? void 0 : _client$getLocalPlaye.getWorldLocation();
    var playerPlane = (_playerLoc$getPlane = playerLoc === null || playerLoc === void 0 ? void 0 : playerLoc.getPlane()) !== null && _playerLoc$getPlane !== void 0 ? _playerLoc$getPlane : 0;
    var booths = bot.objects.getTileObjectsWithNames(['Bank booth', 'Open bank booth', 'Bank chest', 'Bank counter']);
    var samePlaneBooths = (booths || []).filter(b => {
      var _b$getWorldLocation;
      var loc = (_b$getWorldLocation = b.getWorldLocation) === null || _b$getWorldLocation === void 0 ? void 0 : _b$getWorldLocation.call(b);
      return loc && loc.getPlane() === playerPlane && (!playerLoc || playerLoc.distanceTo(loc) <= 8);
    });
    var bankers = (bot.npcs.getWithNames(['Banker']) || []).filter(n => {
      var _n$getWorldLocation;
      var loc = (_n$getWorldLocation = n.getWorldLocation) === null || _n$getWorldLocation === void 0 ? void 0 : _n$getWorldLocation.call(n);
      return loc && loc.getPlane() === playerPlane && (!playerLoc || playerLoc.distanceTo(loc) <= 8);
    });
    if (samePlaneBooths.length > 0) {
      var _b$getName;
      var b = samePlaneBooths[0];
      var name = ((_b$getName = b.getName) === null || _b$getName === void 0 ? void 0 : _b$getName.call(b)) || '';
      var action = name.toLowerCase().indexOf('chest') >= 0 ? 'Use' : 'Bank';
      bot.objects.interactSuppliedObject(b, action);
      bot.bank.open();
      return;
    }
    if (bankers.length > 0) {
      bot.npcs.interactSupplied(bankers[0], 'Bank');
      bot.bank.open();
      return;
    }
    if (!bot.walking.isWebWalking()) {
      bot.walking.webWalkToNearestBank();
    }
  },
  closeBank: () => {
    bot.bank.close();
  },
  depositAll: () => {
    bot.bank.depositAll();
  },
  depositAllExcept: keepIds => {
    if (bot.bank.isOpen()) {
      var _bot$inventory$getAll;
      var inventoryWidgets = (_bot$inventory$getAll = bot.inventory.getAllWidgets()) !== null && _bot$inventory$getAll !== void 0 ? _bot$inventory$getAll : [];
      if (inventoryWidgets.length > 0) {
        var depositedIds = [];
        var _iterator = _createForOfIteratorHelper(inventoryWidgets),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var item = _step.value;
            var id = item.getItemId();
            if (id > 0 && keepIds.indexOf(id) < 0 && depositedIds.indexOf(id) < 0) {
              bot.bank.depositAllWithId(id);
              depositedIds.push(id);
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      } else {
        bot.bank.depositAll();
      }
    }
  },
  withdrawAll: id => {
    bot.bank.withdrawAllWithId(id);
  },
  withdrawQuantity: (id, qty) => {
    bot.bank.withdrawQuantityWithId(id, qty);
  },
  getEmptySlots: () => bot.inventory.getEmptySlots(),
  isInventoryFull: () => bot.inventory.getEmptySlots() === 0,
  getInventoryQuantity: id => {
    try {
      return bot.inventory.getQuantityOfId(id) || 0;
    } catch (_unused3) {
      return 0;
    }
  },
  getBankQuantity: id => {
    try {
      return bot.bank.getQuantityOfId(id) || 0;
    } catch (_unused4) {
      return 0;
    }
  },
  isEquipped: id => bot.equipment.containsId(id),
  wearInventoryItem: id => {
    bot.inventory.interactWithIds([id], ['Wield', 'Wear']);
  },
  getTotalCoins: () => {
    var invCoins = game.getInventoryQuantity(995);
    var bankCoins = game.getBankQuantity(995);
    return invCoins + bankCoins;
  },
  isWebWalking: () => bot.walking.isWebWalking(),
  isNear: function isNear(point) {
    var _client$getLocalPlaye2;
    var maxDistance = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;
    var playerLoc = (_client$getLocalPlaye2 = client.getLocalPlayer()) === null || _client$getLocalPlaye2 === void 0 ? void 0 : _client$getLocalPlaye2.getWorldLocation();
    if (!playerLoc) return false;
    return playerLoc.getPlane() === point.getPlane() && playerLoc.distanceTo(point) <= maxDistance;
  },
  webWalkTo: point => {
    bot.walking.webWalkStart(point);
  },
  webWalkToNearestBank: () => {
    bot.walking.webWalkToNearestBank();
  },
  stopWebWalk: () => {
    if (bot.walking.isWebWalking()) {
      bot.walking.webWalkCancel();
    }
  },
  isDialogueOpen: () => {
    try {
      var productionWidget = client.getWidget(17694735);
      if (productionWidget && !productionWidget.isHidden()) return true;
      var check = (groupId, childId) => {
        try {
          var w = client.getWidget(groupId, childId);
          if (w && typeof w.isHidden === 'function' && !w.isHidden()) {
            return true;
          }
          var packed = groupId << 16 | childId;
          w = client.getWidget(packed);
          if (w && typeof w.isHidden === 'function' && !w.isHidden()) {
            return true;
          }
        } catch (_unused5) {
          return false;
        }
        return false;
      };
      var groups = [231, 217, 219, 193, 229, 233, 11, 153];
      for (var _i = 0, _groups = groups; _i < _groups.length; _i++) {
        var g = _groups[_i];
        for (var c = 0; c <= 6; c++) {
          if (check(g, c)) return true;
        }
      }
      return false;
    } catch (_unused6) {
      return false;
    }
  },
  handleDialogue: function handleDialogue() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    try {
      var defaultOptions = ['Tan All', 'Soft leather', 'Hard leather', 'Continue', 'Yes.', 'Trade'];
      var dialogueOptions = options.length > 0 ? options : defaultOptions;
      return bot.widgets.handleDialogue(dialogueOptions);
    } catch (_unused7) {
      return false;
    }
  },
  isTannerOpen: () => {
    var tanAllSoftLeatherWidgetId = 21233788;
    var widget = client.getWidget(tanAllSoftLeatherWidgetId);
    return widget !== null && !widget.isHidden();
  },
  tanAllLeather: hardLeather => {
    var tanAllSoftLeatherWidgetId = 21233788;
    var tanAllHardLeatherWidgetId = 21233789;
    bot.widgets.interactSpecifiedWidget(hardLeather ? tanAllHardLeatherWidgetId : tanAllSoftLeatherWidgetId, 1, 57, -1);
  },
  interactWithObject: (names, action) => {
    try {
      var objects = bot.objects.getTileObjectsWithNames(names);
      if (objects && objects.length > 0) {
        bot.objects.interactSuppliedObject(objects[0], action);
        return true;
      }
    } catch (error) {
      game.log("interactWithObject error: ".concat(String(error)));
    }
    return false;
  },
  interactWithNpc: (names, action) => {
    try {
      var npcs = bot.npcs.getWithNames(names);
      if (npcs && npcs.length > 0) {
        bot.npcs.interactSupplied(npcs[0], action);
        return true;
      }
    } catch (error) {
      game.log("interactWithNpc error: ".concat(String(error)));
    }
    return false;
  },
  useItemOnItem: (firstId, secondId) => {
    try {
      bot.inventory.itemOnItemWithIds(firstId, secondId);
      return true;
    } catch (_unused8) {
      return false;
    }
  },
  useItemOnObject: (itemId, objectNames) => {
    try {
      var objects = bot.objects.getTileObjectsWithNames(objectNames);
      if (objects && objects.length > 0) {
        bot.inventory.itemOnObjectWithIds(itemId, objects[0]);
        return true;
      }
    } catch (_unused9) {
      return false;
    }
    return false;
  },
  handleProductionMenu: outputItemId => {
    try {
      var _findProductionWidget;
      var makeWidgetId = (_findProductionWidget = findProductionWidget(outputItemId)) !== null && _findProductionWidget !== void 0 ? _findProductionWidget : 17694735;
      var widget = client.getWidget(makeWidgetId);
      if (widget && !widget.isHidden()) {
        bot.widgets.interactSpecifiedWidget(makeWidgetId, 1, 57, -1);
        return true;
      }
    } catch (_unused0) {
      return false;
    }
    return false;
  },
  isShopOpen: () => bot.shop.isOpen(),
  buyFiftyFromShop: itemId => {
    bot.shop.buy(itemId, 50);
  },
  closeShop: () => {
    try {
      var _client$getWidget;
      var closeButton = (_client$getWidget = client.getWidget(300, 1)) === null || _client$getWidget === void 0 ? void 0 : _client$getWidget.getChild(11);
      if (closeButton) {
        bot.menuAction(closeButton.getIndex(), closeButton.getId(), net.runelite.api.MenuAction.CC_OP, 1, -1, 'Close', '');
      }
    } catch (_unused1) {}
  },
  openInventoryItem: (itemId, action) => {
    try {
      bot.inventory.interactWithIds([itemId], [action]);
      return true;
    } catch (_unused10) {
      return false;
    }
  },
  castSpellOnInventory: (spellName, itemId) => {
    try {
      bot.magic.castOnInventoryItemId(spellName, itemId);
      return true;
    } catch (_unused11) {
      return false;
    }
  },
  castSpellOnGroundItem: (spellName, groundItemName) => {
    try {
      var groundItems = bot.tileItems.getItemsWithNames([groundItemName]);
      if (groundItems && groundItems.length > 0) {
        bot.magic.castOnTileItem(spellName, groundItems[0].item);
        return true;
      }
    } catch (_unused12) {
      return false;
    }
    return false;
  },
  log: message => {
    bot.printLogMessage("[F2P-MoneyMaker] ".concat(message));
  },
  gameMessage: message => {
    bot.printGameMessage("[F2P-MoneyMaker] ".concat(message));
  },
  setCounter: (name, value) => {
    bot.counters.setCounter(name, value);
  },
  terminate: () => {
    bot.terminate();
  }
};
var _widgetContainsItem = function widgetContainsItem(widget, itemId) {
  var _widget$getChildren;
  var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  if (widget.isHidden()) return false;
  if (widget.getItemId() === itemId) return true;
  if (depth >= 4) return false;
  var _iterator2 = _createForOfIteratorHelper((_widget$getChildren = widget.getChildren()) !== null && _widget$getChildren !== void 0 ? _widget$getChildren : []),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var child = _step2.value;
      if (child && _widgetContainsItem(child, itemId, depth + 1)) return true;
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  return false;
};
var findProductionWidget = outputItemId => {
  if (outputItemId === undefined) return null;
  var firstMakeWidgetId = 17694735;
  for (var widgetId = firstMakeWidgetId; widgetId <= firstMakeWidgetId + 17; widgetId++) {
    var widget = client.getWidget(widgetId);
    if (widget && _widgetContainsItem(widget, outputItemId)) return widgetId;
  }
  return null;
};

var DelayManager = /*#__PURE__*/function () {
  function DelayManager() {
    _classCallCheck(this, DelayManager);
    _defineProperty(this, "remainingTicks", 0);
  }
  return _createClass(DelayManager, [{
    key: "setDelay",
    value: function setDelay(ticks) {
      this.remainingTicks = Math.max(this.remainingTicks, ticks);
    }
  }, {
    key: "tick",
    value: function tick() {
      if (this.remainingTicks > 0) {
        this.remainingTicks--;
      }
    }
  }, {
    key: "isBusy",
    value: function isBusy() {
      return this.remainingTicks > 0;
    }
  }, {
    key: "getRemaining",
    value: function getRemaining() {
      return this.remainingTicks;
    }
  }], [{
    key: "getReactionTicks",
    value: function getReactionTicks(playStyle, noobMode) {
      var roll = Math.random();
      var base = 1;
      if (playStyle === 'fast') {
        base = roll < 0.8 ? 0 : 1;
      } else if (playStyle === 'lazy') {
        base = roll < 0.5 ? 2 : roll < 0.85 ? 3 : 4;
      } else {
        base = roll < 0.6 ? 1 : 2;
      }
      if (noobMode && Math.random() < 0.1) {
        base += Math.floor(Math.random() * 2) + 1;
      }
      return base;
    }
  }, {
    key: "getBankMicroPause",
    value: function getBankMicroPause(enabled) {
      if (!enabled) return 1;
      var rand = Math.random();
      if (rand < 0.5) return 1;
      if (rand < 0.85) return 2;
      return 3;
    }
  }]);
}();
var SessionStats = /*#__PURE__*/function () {
  function SessionStats() {
    _classCallCheck(this, SessionStats);
    _defineProperty(this, "startTime", Date.now());
    _defineProperty(this, "totalEstimatedGp", 0);
    _defineProperty(this, "itemsProcessed", 0);
    _defineProperty(this, "currentMethodName", 'Starting');
  }
  return _createClass(SessionStats, [{
    key: "addGp",
    value: function addGp(amount) {
      this.totalEstimatedGp += amount;
    }
  }, {
    key: "addItem",
    value: function addItem() {
      var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      this.itemsProcessed += count;
    }
  }, {
    key: "setMethod",
    value: function setMethod(name) {
      this.currentMethodName = name;
    }
  }, {
    key: "getElapsedTimeMinutes",
    value: function getElapsedTimeMinutes() {
      return Math.floor((Date.now() - this.startTime) / 60000);
    }
  }, {
    key: "getElapsedTimeHours",
    value: function getElapsedTimeHours() {
      return (Date.now() - this.startTime) / 3600000;
    }
  }, {
    key: "getTotalGp",
    value: function getTotalGp() {
      return this.totalEstimatedGp;
    }
  }, {
    key: "getItemsProcessed",
    value: function getItemsProcessed() {
      return this.itemsProcessed;
    }
  }, {
    key: "getGpHour",
    value: function getGpHour() {
      var hours = this.getElapsedTimeHours();
      if (hours < 0.01) return 0;
      return Math.floor(this.totalEstimatedGp / hours);
    }
  }, {
    key: "getStatusSummary",
    value: function getStatusSummary() {
      var mins = this.getElapsedTimeMinutes();
      var kGp = Math.floor(this.totalEstimatedGp / 1000);
      return "[".concat(this.currentMethodName, "] ").concat(mins, "m | GP: ").concat(kGp, "k (").concat(Math.floor(this.getGpHour() / 1000), "k/h)");
    }
  }]);
}();

var COWHIDE_ID = 1739;
var SOFT_LEATHER_ID = 1741;
var HARD_LEATHER_ID = 1743;
var COINS_ID$1 = 995;
var ELLIS_POINT = new net.runelite.api.coords.WorldPoint(3274, 3192, 0);
function createTanningHandler(game, settings, delayManager, stats) {
  var exhausted = false;
  var tannedCount = 0;
  return {
    id: 'TAN_COWHIDE',
    name: 'Tanning Cowhides (Al-Kharid)',
    onStart: () => {
      exhausted = false;
      tannedCount = 0;
      stats.setMethod('Tanning Cowhides');
      game.log('Starting Tanning Cowhides in Al-Kharid...');
    },
    tick: () => {
      if (game.isTannerOpen()) {
        game.tanAllLeather(settings.specific.leatherType === 'hard');
        delayManager.setDelay(2);
        return;
      }
      if (game.isDialogueOpen()) {
        var option = settings.specific.leatherType === 'hard' ? 'Hard leather' : 'Soft leather';
        game.handleDialogue(['Tan All', option, 'Tan all soft leather', 'Tan all hard leather']);
        delayManager.setDelay(2);
        return;
      }
      var softCount = game.getInventoryQuantity(SOFT_LEATHER_ID);
      var hardCount = game.getInventoryQuantity(HARD_LEATHER_ID);
      var hasLeather = softCount > 0 || hardCount > 0;
      var cowhidesInInv = game.getInventoryQuantity(COWHIDE_ID);
      var coinsInInv = game.getInventoryQuantity(COINS_ID$1);
      if (hasLeather || cowhidesInInv === 0 && !exhausted) {
        if (game.isBankOpen()) {
          if (hasLeather) {
            stats.addItem(softCount + hardCount);
            stats.addGp((softCount + hardCount) * 90);
            tannedCount += softCount + hardCount;
            game.log("Depositing ".concat(softCount + hardCount, " tanned hides..."));
            game.depositAllExcept([COINS_ID$1]);
            delayManager.setDelay(DelayManager.getBankMicroPause(settings.general.bankMicroPauses));
            return;
          }
          if (coinsInInv < 100) {
            var bankCoins = game.getBankQuantity(COINS_ID$1);
            if (bankCoins > 0) {
              game.log('Withdrawing coins from bank...');
              game.withdrawQuantity(COINS_ID$1, Math.min(bankCoins, 50000));
              delayManager.setDelay(1);
              return;
            } else {
              game.log('Not enough coins in bank to pay the tanner!');
              exhausted = true;
              return;
            }
          }
          var bankHides = game.getBankQuantity(COWHIDE_ID);
          if (bankHides === 0 && cowhidesInInv === 0) {
            game.log('Cowhides depleted in bank!');
            exhausted = true;
            return;
          }
          game.log("Withdrawing Cowhides from bank (".concat(bankHides, " remaining)..."));
          game.withdrawAll(COWHIDE_ID);
          delayManager.setDelay(DelayManager.getBankMicroPause(settings.general.bankMicroPauses));
          return;
        }
        if (!game.isWebWalking()) {
          game.log('Walking to Al-Kharid bank...');
          game.openBank();
        }
        delayManager.setDelay(2);
        return;
      }
      if (game.isBankOpen()) {
        game.closeBank();
        delayManager.setDelay(1);
        return;
      }
      if (!game.isNear(ELLIS_POINT, 4)) {
        if (!game.isWebWalking()) {
          game.log('Walking to tanner (Ellis)...');
          game.webWalkTo(ELLIS_POINT);
        }
        delayManager.setDelay(2);
        return;
      }
      var ellis = bot.npcs.getWithNames(['Ellis']);
      if (ellis && ellis.length > 0) {
        game.log('Interacting with Ellis to tan hides...');
        bot.npcs.interactSupplied(ellis[0], 'Trade');
        delayManager.setDelay(3);
      } else {
        game.interactWithNpc(['Ellis'], 'Trade');
        delayManager.setDelay(3);
      }
    },
    isSuppliesExhausted: () => exhausted,
    getStatus: () => "Tanning: ".concat(tannedCount, " tanned")
  };
}

var AXE_IDS = [1359, 1357, 1355, 1361, 1353, 1349, 1351];
var PICKAXE_IDS = [1275, 1271, 1273, 1269, 1267, 1265];
var OAK_LOGS_ID = 1521;
var YEW_LOGS_ID = 1515;
var CLAY_ID = 434;
var IRON_ORE_ID = 440;
function createGatheringHandler(game, settings, delayManager, stats, methodId) {
  var collectedCount = 0;
  var currentTargetTile = null;
  var exhausted = false;
  var arrivalSettled = false;
  var bankArrivalSettled = false;
  var actionState = 'READY';
  var actionStartTick = 0;
  var lastActivityTick = 0;
  var resourceCountBeforeAction = 0;
  var getTargetConfig = () => {
    switch (methodId) {
      case 'WC_YEWS':
        {
          return {
            resourceId: YEW_LOGS_ID,
            resourceName: 'Yew logs',
            objectNames: ['Yew', 'Yew tree'],
            objectAction: 'Chop down',
            estimatedGp: 250,
            toolIds: AXE_IDS,
            location: settings.specific.wcYewLocation === 'Edgeville' ? new net.runelite.api.coords.WorldPoint(3086, 3478, 0) : new net.runelite.api.coords.WorldPoint(3228, 3474, 0),
            bankLocation: settings.specific.wcYewLocation === 'Edgeville' ? new net.runelite.api.coords.WorldPoint(3094, 3492, 0) : new net.runelite.api.coords.WorldPoint(3253, 3420, 0)
          };
        }
      case 'WC_OAKS':
        {
          return {
            resourceId: OAK_LOGS_ID,
            resourceName: 'Oak logs',
            objectNames: ['Oak', 'Oak tree'],
            objectAction: 'Chop down',
            estimatedGp: 50,
            toolIds: AXE_IDS,
            location: settings.specific.wcOakLocation === 'Lumbridge' ? new net.runelite.api.coords.WorldPoint(3204, 3243, 0) : new net.runelite.api.coords.WorldPoint(3106, 3244, 0),
            bankLocation: settings.specific.wcOakLocation === 'Lumbridge' ? new net.runelite.api.coords.WorldPoint(3208, 3220, 2) : new net.runelite.api.coords.WorldPoint(3092, 3243, 0)
          };
        }
      case 'MINE_IRON':
        {
          return {
            resourceId: IRON_ORE_ID,
            resourceName: 'Iron ore',
            objectNames: ['Iron rocks', 'Rocks'],
            objectAction: 'Mine',
            estimatedGp: 120,
            toolIds: PICKAXE_IDS,
            location: settings.specific.mineLocation === 'Al-Kharid' ? new net.runelite.api.coords.WorldPoint(3298, 3313, 0) : new net.runelite.api.coords.WorldPoint(3181, 3366, 0),
            bankLocation: settings.specific.mineLocation === 'Al-Kharid' ? new net.runelite.api.coords.WorldPoint(3269, 3167, 0) : new net.runelite.api.coords.WorldPoint(3185, 3436, 0)
          };
        }
      default:
        {
          return {
            resourceId: CLAY_ID,
            resourceName: 'Clay',
            objectNames: ['Clay rocks', 'Rocks'],
            objectIds: [11362, 11363],
            depletedIds: [11390, 11391],
            objectAction: 'Mine',
            estimatedGp: 180,
            toolIds: PICKAXE_IDS,
            location: new net.runelite.api.coords.WorldPoint(3181, 3366, 0),
            bankLocation: new net.runelite.api.coords.WorldPoint(3185, 3436, 0)
          };
        }
    }
  };
  var target = getTargetConfig();
  var hasTool = () => {
    var _iterator = _createForOfIteratorHelper(target.toolIds),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var id = _step.value;
        if (game.getInventoryQuantity(id) > 0 || game.isEquipped(id)) return true;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return false;
  };
  var resetCurrentAction = () => {
    currentTargetTile = null;
    actionState = 'READY';
    actionStartTick = 0;
    lastActivityTick = 0;
    resourceCountBeforeAction = 0;
  };
  var travelToConfiguredBank = message => {
    if (!game.isNear(target.bankLocation, 10)) {
      bankArrivalSettled = false;
      if (!game.isWebWalking()) {
        game.log(message);
        game.webWalkTo(target.bankLocation);
      }
      delayManager.setDelay(2);
      return true;
    }
    if (!bankArrivalSettled) {
      if (game.isWebWalking()) {
        game.stopWebWalk();
        delayManager.setDelay(1);
        return true;
      }
      if (game.isMoving()) {
        delayManager.setDelay(1);
        return true;
      }
      bankArrivalSettled = true;
      delayManager.setDelay(1);
      return true;
    }
    return false;
  };
  return {
    id: methodId,
    name: target.resourceName,
    onStart: () => {
      collectedCount = 0;
      resetCurrentAction();
      exhausted = false;
      arrivalSettled = false;
      bankArrivalSettled = false;
      stats.setMethod(target.resourceName);
      game.log("Starting gathering: ".concat(target.resourceName, "..."));
    },
    tick: () => {
      var _bot$objects$getTileO2, _bot$objects$getTileO3, _client$getLocalPlaye;
      if (!hasTool()) {
        resetCurrentAction();
        arrivalSettled = false;
        if (game.isBankOpen()) {
          var _iterator2 = _createForOfIteratorHelper(target.toolIds),
            _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var id = _step2.value;
              if (game.getBankQuantity(id) > 0) {
                game.log("Withdrawing tool (ID ".concat(id, ") from bank..."));
                game.withdrawQuantity(id, 1);
                delayManager.setDelay(1);
                return;
              }
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
          game.log("No ".concat(methodId.indexOf('WC_') === 0 ? 'axe' : 'pickaxe', " found in the bank."));
          exhausted = true;
          return;
        }
        if (travelToConfiguredBank('No tool in inventory. Walking to the configured bank...')) {
          return;
        }
        game.openBank();
        delayManager.setDelay(2);
        return;
      }
      if (game.isInventoryFull()) {
        arrivalSettled = false;
        if (game.isBankOpen()) {
          var count = game.getInventoryQuantity(target.resourceId);
          if (count > 0) {
            stats.addItem(count);
            stats.addGp(count * target.estimatedGp);
            collectedCount += count;
            game.log("Depositing ".concat(count, " ").concat(target.resourceName, "..."));
          }
          game.depositAllExcept(target.toolIds);
          delayManager.setDelay(DelayManager.getBankMicroPause(settings.general.bankMicroPauses));
          return;
        }
        if (game.isDialogueOpen()) {
          game.handleDialogue();
          delayManager.setDelay(1);
          return;
        }
        if (travelToConfiguredBank('Inventory full! Walking to the configured bank...')) {
          return;
        }
        game.openBank();
        delayManager.setDelay(2);
        return;
      }
      if (game.isBankOpen()) {
        arrivalSettled = false;
        bankArrivalSettled = false;
        game.closeBank();
        delayManager.setDelay(1);
        return;
      }
      if (!game.isNear(target.location, 12)) {
        arrivalSettled = false;
        if (!game.isWebWalking()) {
          game.log("Walking to ".concat(target.resourceName, " area..."));
          game.webWalkTo(target.location);
        }
        delayManager.setDelay(2);
        return;
      }
      if (!arrivalSettled) {
        if (game.isWebWalking()) {
          game.stopWebWalk();
          delayManager.setDelay(1);
          return;
        }
        if (game.isMoving()) {
          delayManager.setDelay(1);
          return;
        }
        arrivalSettled = true;
        resetCurrentAction();
        game.log("Arrived at ".concat(target.resourceName, " area. Route stopped; starting gathering."));
        delayManager.setDelay(1);
        return;
      }
      if (currentTargetTile && target.depletedIds && target.depletedIds.length > 0) {
        var _bot$objects$getTileO;
        var depletedObjects = (_bot$objects$getTileO = bot.objects.getTileObjectsWithIds(target.depletedIds)) !== null && _bot$objects$getTileO !== void 0 ? _bot$objects$getTileO : [];
        var isDepleted = depletedObjects.some(d => {
          var _d$getWorldLocation, _currentTargetTile, _currentTargetTile2;
          var loc = (_d$getWorldLocation = d.getWorldLocation) === null || _d$getWorldLocation === void 0 ? void 0 : _d$getWorldLocation.call(d);
          return loc && loc.getX() === ((_currentTargetTile = currentTargetTile) === null || _currentTargetTile === void 0 ? void 0 : _currentTargetTile.getX()) && loc.getY() === ((_currentTargetTile2 = currentTargetTile) === null || _currentTargetTile2 === void 0 ? void 0 : _currentTargetTile2.getY());
        });
        if (isDepleted) {
          game.log('Target rock depleted. Waiting for the mining action to finish...');
          currentTargetTile = null;
          actionState = 'WAITING_FOR_IDLE';
          delayManager.setDelay(1);
          return;
        }
      }
      if (actionState !== 'READY') {
        var player = client.getLocalPlayer();
        if (!player) return;
        var currentTick = client.getTickCount();
        var isAnimating = player.getAnimation() !== -1;
        var isMoving = game.isMoving();
        var resourceCount = game.getInventoryQuantity(target.resourceId);
        var receivedResource = resourceCount > resourceCountBeforeAction;
        if (actionState === 'WAITING_TO_START') {
          if (receivedResource) {
            actionState = 'WAITING_FOR_IDLE';
          } else if (isMoving || isAnimating) {
            actionState = 'GATHERING';
            lastActivityTick = currentTick;
          } else if (currentTick - actionStartTick >= 10) {
            resetCurrentAction();
          }
          delayManager.setDelay(1);
          return;
        }
        if (actionState === 'GATHERING') {
          if (receivedResource) {
            actionState = 'WAITING_FOR_IDLE';
          } else if (isMoving || isAnimating) {
            lastActivityTick = currentTick;
          } else if (currentTick - lastActivityTick > 3 && game.isIdleFor(2)) {
            resetCurrentAction();
          }
          delayManager.setDelay(1);
          return;
        }
        if (actionState === 'WAITING_FOR_IDLE' && game.isIdleFor(2)) {
          resetCurrentAction();
        }
        delayManager.setDelay(1);
        return;
      }
      var nearbyObjects = [];
      nearbyObjects = target.objectIds && target.objectIds.length > 0 ? (_bot$objects$getTileO2 = bot.objects.getTileObjectsWithIds(target.objectIds)) !== null && _bot$objects$getTileO2 !== void 0 ? _bot$objects$getTileO2 : [] : (_bot$objects$getTileO3 = bot.objects.getTileObjectsWithNames(target.objectNames)) !== null && _bot$objects$getTileO3 !== void 0 ? _bot$objects$getTileO3 : [];
      var playerLoc = (_client$getLocalPlaye = client.getLocalPlayer()) === null || _client$getLocalPlaye === void 0 ? void 0 : _client$getLocalPlaye.getWorldLocation();
      var validObjects = (nearbyObjects || []).filter(object => {
        var _object$getWorldLocat, _object$getActions;
        var loc = (_object$getWorldLocat = object.getWorldLocation) === null || _object$getWorldLocat === void 0 ? void 0 : _object$getWorldLocat.call(object);
        if (!loc) return false;
        if (loc.distanceTo(target.location) > 8) return false;
        var actions = (_object$getActions = object.getActions) === null || _object$getActions === void 0 ? void 0 : _object$getActions.call(object);
        if (actions && Array.isArray(actions)) {
          return actions.indexOf(target.objectAction) >= 0;
        }
        return true;
      });
      if (validObjects.length > 0) {
        var _object$getWorldLocat2, _object$getWorldLocat3;
        if (playerLoc) {
          validObjects.sort((a, b) => {
            var _a$getWorldLocation, _a$getWorldLocation2, _b$getWorldLocation, _b$getWorldLocation2;
            var distributionA = playerLoc.distanceTo((_a$getWorldLocation = (_a$getWorldLocation2 = a.getWorldLocation) === null || _a$getWorldLocation2 === void 0 ? void 0 : _a$getWorldLocation2.call(a)) !== null && _a$getWorldLocation !== void 0 ? _a$getWorldLocation : playerLoc);
            var distributionB = playerLoc.distanceTo((_b$getWorldLocation = (_b$getWorldLocation2 = b.getWorldLocation) === null || _b$getWorldLocation2 === void 0 ? void 0 : _b$getWorldLocation2.call(b)) !== null && _b$getWorldLocation !== void 0 ? _b$getWorldLocation : playerLoc);
            return distributionA - distributionB;
          });
        }
        var object = validObjects[0];
        currentTargetTile = (_object$getWorldLocat2 = (_object$getWorldLocat3 = object.getWorldLocation) === null || _object$getWorldLocat3 === void 0 ? void 0 : _object$getWorldLocat3.call(object)) !== null && _object$getWorldLocat2 !== void 0 ? _object$getWorldLocat2 : null;
        actionState = 'WAITING_TO_START';
        actionStartTick = client.getTickCount();
        lastActivityTick = actionStartTick;
        resourceCountBeforeAction = game.getInventoryQuantity(target.resourceId);
        bot.objects.interactSuppliedObject(object, target.objectAction);
        delayManager.setDelay(DelayManager.getReactionTicks(settings.general.playStyle, settings.general.noobMode));
      } else {
        resetCurrentAction();
        delayManager.setDelay(2);
      }
    },
    isSuppliesExhausted: () => exhausted,
    getStatus: () => "".concat(target.resourceName, ": ").concat(collectedCount, " gathered")
  };
}

var PESTLE_AND_MORTAR = 233;
var CHOCOLATE_BAR = 1973;
var CHOCOLATE_DUST = 1975;
var PASTRY_DOUGH = 1953;
var PIE_DISH = 2313;
var PIE_SHELL = 2315;
var POT_OF_FLOUR = 1933;
var BUCKET_OF_WATER = 1929;
var PIZZA_BASE = 2283;
var EMPTY_BUCKET = 1925;
var EMPTY_POT = 1931;
function createProcessingHandler(game, settings, delayManager, stats, methodId) {
  var exhausted = false;
  var processedCount = 0;
  var isMaking = false;
  var makeTicks = 0;
  return {
    id: methodId,
    name: methodId === 'GRIND_CHOCOLATE' ? 'Grinding Chocolate' : methodId === 'MAKE_PIE_SHELLS' ? 'Making Pie Shells' : 'Making Pizza Bases',
    onStart: () => {
      exhausted = false;
      processedCount = 0;
      isMaking = false;
      makeTicks = 0;
      stats.setMethod(methodId === 'GRIND_CHOCOLATE' ? 'Grinding Chocolate' : 'Making Dough');
      game.log("Starting bank processing: ".concat(methodId, "..."));
    },
    tick: () => {
      if (game.isDialogueOpen()) {
        game.handleProductionMenu();
        isMaking = true;
        makeTicks = 0;
        delayManager.setDelay(2);
        return;
      }
      if (isMaking) {
        makeTicks++;
        if (methodId === 'GRIND_CHOCOLATE' && game.getInventoryQuantity(CHOCOLATE_BAR) === 0) {
          isMaking = false;
        } else if (methodId === 'MAKE_PIE_SHELLS' && (game.getInventoryQuantity(PASTRY_DOUGH) === 0 || game.getInventoryQuantity(PIE_DISH) === 0)) {
          isMaking = false;
        } else if (methodId === 'MAKE_PIZZA_BASES' && (game.getInventoryQuantity(POT_OF_FLOUR) === 0 || game.getInventoryQuantity(BUCKET_OF_WATER) === 0)) {
          isMaking = false;
        } else if (makeTicks > 35 || game.isIdle()) {
          isMaking = false;
        } else {
          delayManager.setDelay(1);
          return;
        }
      }
      var needsBank = false;
      switch (methodId) {
        case 'GRIND_CHOCOLATE':
          {
            needsBank = game.getInventoryQuantity(CHOCOLATE_BAR) === 0;
            break;
          }
        case 'MAKE_PIE_SHELLS':
          {
            needsBank = game.getInventoryQuantity(PASTRY_DOUGH) === 0 || game.getInventoryQuantity(PIE_DISH) === 0;
            break;
          }
        case 'MAKE_PIZZA_BASES':
          {
            needsBank = game.getInventoryQuantity(POT_OF_FLOUR) === 0 || game.getInventoryQuantity(BUCKET_OF_WATER) === 0;
            break;
          }
      }
      if (needsBank) {
        if (game.isBankOpen()) {
          if (methodId === 'GRIND_CHOCOLATE') {
            var dust = game.getInventoryQuantity(CHOCOLATE_DUST);
            if (dust > 0) {
              stats.addItem(dust);
              stats.addGp(dust * 80);
              processedCount += dust;
              game.depositAllExcept([PESTLE_AND_MORTAR]);
              delayManager.setDelay(1);
              return;
            }
            if (game.getInventoryQuantity(PESTLE_AND_MORTAR) === 0) {
              if (game.getBankQuantity(PESTLE_AND_MORTAR) > 0) {
                game.withdrawQuantity(PESTLE_AND_MORTAR, 1);
                delayManager.setDelay(1);
                return;
              } else {
                game.log('Pestle and mortar not found in bank!');
                exhausted = true;
                return;
              }
            }
            var bankBars = game.getBankQuantity(CHOCOLATE_BAR);
            if (bankBars === 0) {
              game.log('Chocolate bars depleted in bank!');
              exhausted = true;
              return;
            }
            game.withdrawAll(CHOCOLATE_BAR);
            delayManager.setDelay(DelayManager.getBankMicroPause(settings.general.bankMicroPauses));
            return;
          }
          if (methodId === 'MAKE_PIE_SHELLS') {
            var shells = game.getInventoryQuantity(PIE_SHELL);
            if (shells > 0) {
              stats.addItem(shells);
              stats.addGp(shells * 180);
              processedCount += shells;
              game.depositAll();
              delayManager.setDelay(1);
              return;
            }
            var dough = game.getBankQuantity(PASTRY_DOUGH);
            var dishes = game.getBankQuantity(PIE_DISH);
            if (game.getInventoryQuantity(PASTRY_DOUGH) === 0 && dough === 0 || game.getInventoryQuantity(PIE_DISH) === 0 && dishes === 0) {
              game.log('Pie shell ingredients depleted in bank!');
              exhausted = true;
              return;
            }
            if (game.getInventoryQuantity(PASTRY_DOUGH) === 0) {
              game.withdrawQuantity(PASTRY_DOUGH, 14);
            } else {
              game.withdrawQuantity(PIE_DISH, 14);
            }
            delayManager.setDelay(DelayManager.getBankMicroPause(settings.general.bankMicroPauses));
            return;
          }
          if (methodId === 'MAKE_PIZZA_BASES') {
            var bases = game.getInventoryQuantity(PIZZA_BASE);
            var emptyB = game.getInventoryQuantity(EMPTY_BUCKET);
            var emptyP = game.getInventoryQuantity(EMPTY_POT);
            if (bases > 0 || emptyB > 0 || emptyP > 0) {
              stats.addItem(bases);
              stats.addGp(bases * 60);
              processedCount += bases;
              game.depositAll();
              delayManager.setDelay(1);
              return;
            }
            var flour = game.getBankQuantity(POT_OF_FLOUR);
            var water = game.getBankQuantity(BUCKET_OF_WATER);
            if (game.getInventoryQuantity(POT_OF_FLOUR) === 0 && flour === 0 || game.getInventoryQuantity(BUCKET_OF_WATER) === 0 && water === 0) {
              game.log('Flour or water depleted in bank!');
              exhausted = true;
              return;
            }
            if (game.getInventoryQuantity(POT_OF_FLOUR) === 0) {
              game.withdrawQuantity(POT_OF_FLOUR, 14);
            } else {
              game.withdrawQuantity(BUCKET_OF_WATER, 14);
            }
            delayManager.setDelay(DelayManager.getBankMicroPause(settings.general.bankMicroPauses));
            return;
          }
        }
        if (!game.isWebWalking()) {
          game.openBank();
        }
        delayManager.setDelay(2);
        return;
      }
      if (game.isBankOpen()) {
        game.closeBank();
        delayManager.setDelay(1);
        return;
      }
      if (methodId === 'GRIND_CHOCOLATE') {
        game.useItemOnItem(PESTLE_AND_MORTAR, CHOCOLATE_BAR);
        delayManager.setDelay(2);
        return;
      }
      if (methodId === 'MAKE_PIE_SHELLS') {
        game.useItemOnItem(PASTRY_DOUGH, PIE_DISH);
        delayManager.setDelay(2);
        return;
      }
      if (methodId === 'MAKE_PIZZA_BASES') {
        game.useItemOnItem(POT_OF_FLOUR, BUCKET_OF_WATER);
        delayManager.setDelay(2);
        return;
      }
    },
    isSuppliesExhausted: () => exhausted,
    getStatus: () => "Processed: ".concat(processedCount)
  };
}

var GOLD_BAR_ID = 2357;
var RING_MOULD_ID = 1592;
var AMULET_MOULD_ID = 1595;
var SAPPHIRE_ID = 1607;
var EMERALD_ID = 1605;
var RUBY_ID = 1603;
var SAPPHIRE_RING_ID = 1637;
var EMERALD_RING_ID = 1639;
var RUBY_RING_ID = 1641;
var UNSTRUNG_AMULET_ID = 1673;
var AL_KHARID_FURNACE_POINT = new net.runelite.api.coords.WorldPoint(3275, 3186, 0);
function createJewelryHandler(game, settings, delayManager, stats, methodId) {
  var _gemIds$methodId, _resultIds$methodId, _profits$methodId;
  var exhausted = false;
  var craftedCount = 0;
  var isCrafting = false;
  var craftTicks = 0;
  var isAmulet = methodId === 'CRAFT_GOLD_AMULET';
  var mouldId = isAmulet ? AMULET_MOULD_ID : RING_MOULD_ID;
  var gemIds = {
    CRAFT_SAPPHIRE_RING: SAPPHIRE_ID,
    CRAFT_EMERALD_RING: EMERALD_ID,
    CRAFT_RUBY_RING: RUBY_ID
  };
  var resultIds = {
    CRAFT_GOLD_AMULET: UNSTRUNG_AMULET_ID,
    CRAFT_SAPPHIRE_RING: SAPPHIRE_RING_ID,
    CRAFT_EMERALD_RING: EMERALD_RING_ID,
    CRAFT_RUBY_RING: RUBY_RING_ID
  };
  var profits = {
    CRAFT_GOLD_AMULET: 110,
    CRAFT_SAPPHIRE_RING: 230,
    CRAFT_EMERALD_RING: 250,
    CRAFT_RUBY_RING: 210
  };
  var gemId = (_gemIds$methodId = gemIds[methodId]) !== null && _gemIds$methodId !== void 0 ? _gemIds$methodId : null;
  var resultId = (_resultIds$methodId = resultIds[methodId]) !== null && _resultIds$methodId !== void 0 ? _resultIds$methodId : UNSTRUNG_AMULET_ID;
  var estimatedProfitPerItem = (_profits$methodId = profits[methodId]) !== null && _profits$methodId !== void 0 ? _profits$methodId : 0;
  return {
    id: methodId,
    name: 'Crafting Jewelry (Al-Kharid)',
    onStart: () => {
      exhausted = false;
      craftedCount = 0;
      isCrafting = false;
      craftTicks = 0;
      stats.setMethod('Crafting Jewelry');
      game.log("Starting jewelry crafting at Al-Kharid furnace: ".concat(methodId, "..."));
    },
    tick: () => {
      if (game.isDialogueOpen()) {
        game.handleProductionMenu(resultId);
        isCrafting = true;
        craftTicks = 0;
        delayManager.setDelay(2);
        return;
      }
      if (isCrafting) {
        craftTicks++;
        var goldBarsLeft = game.getInventoryQuantity(GOLD_BAR_ID);
        var gemsLeft = gemId ? game.getInventoryQuantity(gemId) : 1;
        if (goldBarsLeft === 0 || gemsLeft === 0 || craftTicks > 35 || game.isIdle()) {
          isCrafting = false;
        } else {
          delayManager.setDelay(1);
          return;
        }
      }
      var hasProduct = game.getInventoryQuantity(resultId) > 0;
      var hasGold = game.getInventoryQuantity(GOLD_BAR_ID) > 0;
      var hasGems = gemId ? game.getInventoryQuantity(gemId) > 0 : true;
      if (hasProduct || !hasGold || !hasGems) {
        if (game.isBankOpen()) {
          if (hasProduct) {
            var count = game.getInventoryQuantity(resultId);
            stats.addItem(count);
            stats.addGp(count * estimatedProfitPerItem);
            craftedCount += count;
            game.depositAllExcept([mouldId]);
            delayManager.setDelay(1);
            return;
          }
          if (game.getInventoryQuantity(mouldId) === 0) {
            if (game.getBankQuantity(mouldId) > 0) {
              game.withdrawQuantity(mouldId, 1);
              delayManager.setDelay(1);
              return;
            } else {
              game.log('Required mould not found in bank!');
              exhausted = true;
              return;
            }
          }
          var bankGold = game.getBankQuantity(GOLD_BAR_ID);
          if (!hasGold && bankGold === 0) {
            game.log('Gold bars depleted in bank!');
            exhausted = true;
            return;
          }
          if (gemId === null) {
            game.withdrawAll(GOLD_BAR_ID);
          } else {
            var bankGems = game.getBankQuantity(gemId);
            if (!hasGems && bankGems === 0) {
              game.log('Gems depleted in bank!');
              exhausted = true;
              return;
            }
            if (hasGold) {
              game.withdrawQuantity(gemId, 13);
            } else {
              game.withdrawQuantity(GOLD_BAR_ID, 13);
            }
          }
          delayManager.setDelay(DelayManager.getBankMicroPause(settings.general.bankMicroPauses));
          return;
        }
        if (!game.isWebWalking()) {
          game.openBank();
        }
        delayManager.setDelay(2);
        return;
      }
      if (game.isBankOpen()) {
        game.closeBank();
        delayManager.setDelay(1);
        return;
      }
      if (!game.isNear(AL_KHARID_FURNACE_POINT, 4)) {
        if (!game.isWebWalking()) {
          game.log('Walking to Al-Kharid furnace...');
          game.webWalkTo(AL_KHARID_FURNACE_POINT);
        }
        delayManager.setDelay(2);
        return;
      }
      game.useItemOnObject(GOLD_BAR_ID, ['Furnace']);
      delayManager.setDelay(DelayManager.getReactionTicks(settings.general.playStyle, settings.general.noobMode));
    },
    isSuppliesExhausted: () => exhausted,
    getStatus: () => "Jewelry Crafted: ".concat(craftedCount)
  };
}

var NATURE_RUNE_ID = 561;
var LAW_RUNE_ID = 563;
var FIRE_STAFF_ID = 1387;
var AIR_STAFF_ID = 1381;
var WINE_OF_ZAMORAK_ID = 245;
var CHAOS_TEMPLE_POINT = new net.runelite.api.coords.WorldPoint(2951, 3514, 0);
function createMagicHandler(game, settings, delayManager, stats, methodId) {
  var exhausted = false;
  var alchedCount = 0;
  var grabbedCount = 0;
  var observedAlchItemCount = -1;
  return {
    id: methodId,
    name: methodId === 'HIGH_ALCH' ? 'High Alchemy' : 'Telegrab Wine of Zamorak',
    onStart: () => {
      exhausted = false;
      alchedCount = 0;
      grabbedCount = 0;
      observedAlchItemCount = -1;
      stats.setMethod(methodId === 'HIGH_ALCH' ? 'High Alchemy' : 'Telegrab Wine');
      game.log("Starting Magic method: ".concat(methodId, "..."));
    },
    tick: () => {
      if (methodId === 'HIGH_ALCH') {
        if (!game.isEquipped(FIRE_STAFF_ID)) {
          if (game.getInventoryQuantity(FIRE_STAFF_ID) > 0) {
            if (game.isBankOpen()) {
              game.closeBank();
              delayManager.setDelay(1);
              return;
            }
            game.wearInventoryItem(FIRE_STAFF_ID);
            delayManager.setDelay(2);
            return;
          }
          if (game.isBankOpen()) {
            if (game.getBankQuantity(FIRE_STAFF_ID) === 0) {
              game.log('Fire staff not found in inventory, equipment, or bank!');
              exhausted = true;
              return;
            }
            game.withdrawQuantity(FIRE_STAFF_ID, 1);
            delayManager.setDelay(1);
            return;
          }
          if (!game.isWebWalking()) game.openBank();
          delayManager.setDelay(2);
          return;
        }
        var natCount = game.getInventoryQuantity(NATURE_RUNE_ID);
        var alchItemCount = game.getInventoryQuantity(settings.specific.alchItemId);
        if (observedAlchItemCount >= 0 && alchItemCount < observedAlchItemCount) {
          var completed = observedAlchItemCount - alchItemCount;
          stats.addItem(completed);
          stats.addGp(completed * 220);
          alchedCount += completed;
        }
        observedAlchItemCount = alchItemCount;
        if (natCount === 0 || alchItemCount === 0) {
          if (game.isBankOpen()) {
            var bankNats = game.getBankQuantity(NATURE_RUNE_ID);
            var bankItems = game.getBankQuantity(settings.specific.alchItemId);
            if (natCount === 0 && bankNats === 0 || alchItemCount === 0 && bankItems === 0) {
              game.log("Nature runes (".concat(bankNats, ") or alch items (").concat(bankItems, ") depleted in bank!"));
              exhausted = true;
              return;
            }
            if (natCount === 0) {
              game.withdrawAll(NATURE_RUNE_ID);
            } else {
              game.withdrawAll(settings.specific.alchItemId);
            }
            delayManager.setDelay(DelayManager.getBankMicroPause(settings.general.bankMicroPauses));
            return;
          }
          if (!game.isWebWalking()) {
            game.openBank();
          }
          delayManager.setDelay(2);
          return;
        }
        if (game.isBankOpen()) {
          game.closeBank();
          delayManager.setDelay(1);
          return;
        }
        try {
          game.castSpellOnInventory('HIGH_LEVEL_ALCHEMY', settings.specific.alchItemId);
          delayManager.setDelay(DelayManager.getReactionTicks(settings.general.playStyle, settings.general.noobMode));
        } catch (_unused) {
          delayManager.setDelay(3);
        }
        return;
      }
      if (methodId === 'TELEGRAB_WINE') {
        if (!game.isEquipped(AIR_STAFF_ID)) {
          if (game.getInventoryQuantity(AIR_STAFF_ID) > 0) {
            if (game.isBankOpen()) {
              game.closeBank();
              delayManager.setDelay(1);
              return;
            }
            game.wearInventoryItem(AIR_STAFF_ID);
            delayManager.setDelay(2);
            return;
          }
          if (game.isBankOpen()) {
            if (game.getBankQuantity(AIR_STAFF_ID) === 0) {
              game.log('Air staff not found in inventory, equipment, or bank!');
              exhausted = true;
              return;
            }
            game.withdrawQuantity(AIR_STAFF_ID, 1);
            delayManager.setDelay(1);
            return;
          }
          if (!game.isWebWalking()) game.openBank();
          delayManager.setDelay(2);
          return;
        }
        var lawCount = game.getInventoryQuantity(LAW_RUNE_ID);
        if (lawCount === 0 || game.isInventoryFull()) {
          if (game.isBankOpen()) {
            var wines = game.getInventoryQuantity(WINE_OF_ZAMORAK_ID);
            if (wines > 0) {
              stats.addItem(wines);
              stats.addGp(wines * 1200);
              grabbedCount += wines;
              game.depositAllExcept([LAW_RUNE_ID, AIR_STAFF_ID]);
              delayManager.setDelay(1);
              return;
            }
            var bankLaws = game.getBankQuantity(LAW_RUNE_ID);
            if (bankLaws === 0 && lawCount === 0) {
              game.log('Law runes depleted in bank!');
              exhausted = true;
              return;
            }
            if (lawCount === 0) {
              game.withdrawAll(LAW_RUNE_ID);
            }
            delayManager.setDelay(DelayManager.getBankMicroPause(settings.general.bankMicroPauses));
            return;
          }
          if (!game.isWebWalking()) {
            game.log('Walking to bank to deposit wines or withdraw Law runes...');
            game.openBank();
          }
          delayManager.setDelay(2);
          return;
        }
        if (game.isBankOpen()) {
          game.closeBank();
          delayManager.setDelay(1);
          return;
        }
        if (!game.isNear(CHAOS_TEMPLE_POINT, 5)) {
          if (!game.isWebWalking()) {
            game.log('Walking to Chaos Temple...');
            game.webWalkTo(CHAOS_TEMPLE_POINT);
          }
          delayManager.setDelay(2);
          return;
        }
        try {
          var grabbed = game.castSpellOnGroundItem('TELEKINETIC_GRAB', 'Wine of zamorak');
          if (grabbed) {
            delayManager.setDelay(4);
          } else {
            delayManager.setDelay(2);
          }
        } catch (_unused2) {
          delayManager.setDelay(2);
        }
      }
    },
    isSuppliesExhausted: () => exhausted,
    getStatus: () => methodId === 'HIGH_ALCH' ? "Alched: ".concat(alchedCount) : "Wines Collected: ".concat(grabbedCount)
  };
}

var COINS_ID = 995;
var FEATHER_PACK_ID = 11881;
var FEATHER_ID = 314;
var GERRANT_SHOP_POINT = new net.runelite.api.coords.WorldPoint(3014, 3224, 0);
function createShopRunHandler(game, settings, delayManager, stats) {
  var exhausted = false;
  var feathersPurchased = 0;
  var pendingPackCount = 0;
  return {
    id: 'BUY_FEATHERS',
    name: 'Buying Feather Packs (Port Sarim)',
    onStart: () => {
      exhausted = false;
      feathersPurchased = 0;
      pendingPackCount = 0;
      stats.setMethod('Feather Packs');
      game.log('Starting buying feather packs from Gerrant in Port Sarim...');
    },
    tick: () => {
      var packCount = game.getInventoryQuantity(FEATHER_PACK_ID);
      if (pendingPackCount > packCount) {
        var opened = (pendingPackCount - packCount) * 100;
        stats.addItem(opened);
        stats.addGp(opened / 100 * 60);
        feathersPurchased += opened;
      }
      pendingPackCount = 0;
      if (packCount > 0) {
        if (game.isShopOpen()) {
          game.closeShop();
          delayManager.setDelay(1);
          return;
        }
        game.openInventoryItem(FEATHER_PACK_ID, 'Open');
        pendingPackCount = packCount;
        delayManager.setDelay(1);
        return;
      }
      var coinsInInv = game.getInventoryQuantity(COINS_ID);
      if (coinsInInv < 200) {
        if (game.isBankOpen()) {
          var feathers = game.getInventoryQuantity(FEATHER_ID);
          if (feathers > 0) {
            game.depositAllExcept([COINS_ID]);
            delayManager.setDelay(1);
            return;
          }
          var bankCoins = game.getBankQuantity(COINS_ID);
          if (bankCoins < 200) {
            game.log('Coins depleted in bank for buying feathers!');
            exhausted = true;
            return;
          }
          game.withdrawAll(COINS_ID);
          delayManager.setDelay(DelayManager.getBankMicroPause(settings.general.bankMicroPauses));
          return;
        }
        if (game.isShopOpen()) {
          game.closeShop();
          delayManager.setDelay(1);
          return;
        }
        if (!game.isWebWalking()) {
          game.log('Walking to bank to withdraw coins...');
          game.openBank();
        }
        delayManager.setDelay(2);
        return;
      }
      if (game.isBankOpen()) {
        game.closeBank();
        delayManager.setDelay(1);
        return;
      }
      if (game.isShopOpen()) {
        if (game.getEmptySlots() > 0) {
          game.buyFiftyFromShop(FEATHER_PACK_ID);
          delayManager.setDelay(DelayManager.getReactionTicks(settings.general.playStyle, settings.general.noobMode));
          return;
        } else {
          game.closeShop();
          delayManager.setDelay(1);
          return;
        }
      }
      if (!game.isNear(GERRANT_SHOP_POINT, 4)) {
        if (!game.isWebWalking()) {
          game.log('Walking to Port Sarim fishing shop...');
          game.webWalkTo(GERRANT_SHOP_POINT);
        }
        delayManager.setDelay(2);
        return;
      }
      var gerrant = bot.npcs.getWithNames(['Gerrant']);
      if (gerrant && gerrant.length > 0) {
        bot.npcs.interactSupplied(gerrant[0], 'Trade');
        delayManager.setDelay(2);
      } else {
        game.interactWithNpc(['Gerrant'], 'Trade');
        delayManager.setDelay(2);
      }
    },
    isSuppliesExhausted: () => exhausted,
    getStatus: () => "Feathers Purchased: ".concat(feathersPurchased)
  };
}

var MoneyMakerRunner = /*#__PURE__*/function () {
  function MoneyMakerRunner(game, settings) {
    _classCallCheck(this, MoneyMakerRunner);
    _defineProperty(this, "game", void 0);
    _defineProperty(this, "settings", void 0);
    _defineProperty(this, "delayManager", new DelayManager());
    _defineProperty(this, "stats", new SessionStats());
    _defineProperty(this, "state", 'INITIALIZING');
    _defineProperty(this, "currentHandler", null);
    _defineProperty(this, "exhaustedMethods", []);
    _defineProperty(this, "isInitialized", false);
    this.game = game;
    this.settings = settings;
    bot.breakHandler.setBreakHandlerStatus(settings.general.takeBreaks);
  }
  return _createClass(MoneyMakerRunner, [{
    key: "tick",
    value: function tick() {
      if (!this.game.isLoggedIn()) {
        return;
      }
      this.updateCounters();
      this.delayManager.tick();
      if (this.delayManager.isBusy()) {
        return;
      }
      if (this.checkStoppingConditions()) {
        this.state = 'COMPLETED';
      }
      switch (this.state) {
        case 'INITIALIZING':
          {
            this.handleInitializing();
            break;
          }
        case 'RUNNING':
          {
            this.handleRunning();
            break;
          }
        case 'HANDLING_FALLBACK':
          {
            this.handleFallback();
            break;
          }
        case 'COMPLETED':
          {
            this.handleCompleted();
            break;
          }
      }
    }
  }, {
    key: "handleInitializing",
    value: function handleInitializing() {
      var chosenMethod;
      if (this.settings.general.executionMode === 'MANUAL') {
        chosenMethod = this.settings.general.selectedMethod;
        this.game.log("Manual mode selected: ".concat(chosenMethod, "."));
      } else {
        var bestMethod = this.selectBestMethod();
        if (!bestMethod) {
          this.game.gameMessage('No viable method is available.');
          this.state = 'COMPLETED';
          return;
        }
        chosenMethod = bestMethod;
        this.game.log("Auto mode selected best viable method: ".concat(chosenMethod, "."));
      }
      this.currentHandler = this.instantiateHandler(chosenMethod);
      this.currentHandler.onStart();
      this.state = 'RUNNING';
    }
  }, {
    key: "handleRunning",
    value: function handleRunning() {
      if (!this.currentHandler) {
        this.state = 'INITIALIZING';
        return;
      }
      if (this.currentHandler.isSuppliesExhausted()) {
        this.game.log("Supplies depleted for method ".concat(this.currentHandler.name, "!"));
        if (this.exhaustedMethods.indexOf(this.currentHandler.id) < 0) {
          this.exhaustedMethods.push(this.currentHandler.id);
        }
        this.state = 'HANDLING_FALLBACK';
        return;
      }
      this.currentHandler.tick();
    }
  }, {
    key: "handleFallback",
    value: function handleFallback() {
      if (this.settings.general.executionMode === 'MANUAL') {
        this.game.gameMessage('Materials depleted in Manual mode. Terminating script.');
        this.game.log('Materials depleted in Manual mode. Terminating script.');
        this.state = 'COMPLETED';
        return;
      }
      this.game.log('Searching for next best available method (Auto Fallback)...');
      var nextMethod = this.selectBestMethod();
      if (!nextMethod) {
        this.game.gameMessage('No viable method remains. Check tools and supplies.');
        this.state = 'COMPLETED';
        return;
      }
      this.currentHandler = this.instantiateHandler(nextMethod);
      this.currentHandler.onStart();
      this.state = 'RUNNING';
    }
  }, {
    key: "handleCompleted",
    value: function handleCompleted() {
      if (!this.isInitialized) {
        this.isInitialized = true;
        bot.breakHandler.setBreakHandlerStatus(false);
        this.game.stopWebWalk();
        if (this.game.isBankOpen()) this.game.closeBank();
        if (this.game.isShopOpen()) this.game.closeShop();
        this.game.gameMessage('Session completed successfully.');
        this.game.log("Session finished. Total estimated GP: ".concat(this.stats.getTotalGp(), " gp."));
        this.game.terminate();
      }
    }
  }, {
    key: "selectBestMethod",
    value: function selectBestMethod() {
      var wcLevel = this.game.getRealLevel(net.runelite.api.Skill.WOODCUTTING);
      var mineLevel = this.game.getRealLevel(net.runelite.api.Skill.MINING);
      var craftLevel = this.game.getRealLevel(net.runelite.api.Skill.CRAFTING);
      var magicLevel = this.game.getRealLevel(net.runelite.api.Skill.MAGIC);
      var cookLevel = this.game.getRealLevel(net.runelite.api.Skill.COOKING);
      var sorted = _toConsumableArray(METHOD_CATALOG).sort((a, b) => b.approxGpPerHour - a.approxGpPerHour);
      var _iterator = _createForOfIteratorHelper(sorted),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var method = _step.value;
          if (this.exhaustedMethods.indexOf(method.id) >= 0) {
            continue;
          }
          if (method.requiredSkills.woodcutting && wcLevel < method.requiredSkills.woodcutting) continue;
          if (method.requiredSkills.mining && mineLevel < method.requiredSkills.mining) continue;
          if (method.requiredSkills.crafting && craftLevel < method.requiredSkills.crafting) continue;
          if (method.requiredSkills.magic && magicLevel < method.requiredSkills.magic) continue;
          if (method.requiredSkills.cooking && cookLevel < method.requiredSkills.cooking) continue;
          return method.id;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return null;
    }
  }, {
    key: "instantiateHandler",
    value: function instantiateHandler(methodId) {
      switch (methodId) {
        case 'TAN_COWHIDE':
          {
            return createTanningHandler(this.game, this.settings, this.delayManager, this.stats);
          }
        case 'BUY_FEATHERS':
          {
            return createShopRunHandler(this.game, this.settings, this.delayManager, this.stats);
          }
        case 'GRIND_CHOCOLATE':
        case 'MAKE_PIE_SHELLS':
        case 'MAKE_PIZZA_BASES':
          {
            return createProcessingHandler(this.game, this.settings, this.delayManager, this.stats, methodId);
          }
        case 'CRAFT_GOLD_AMULET':
        case 'CRAFT_SAPPHIRE_RING':
        case 'CRAFT_EMERALD_RING':
        case 'CRAFT_RUBY_RING':
          {
            return createJewelryHandler(this.game, this.settings, this.delayManager, this.stats, methodId);
          }
        case 'HIGH_ALCH':
        case 'TELEGRAB_WINE':
          {
            return createMagicHandler(this.game, this.settings, this.delayManager, this.stats, methodId);
          }
        default:
          {
            return createGatheringHandler(this.game, this.settings, this.delayManager, this.stats, methodId);
          }
      }
    }
  }, {
    key: "checkStoppingConditions",
    value: function checkStoppingConditions() {
      var gen = this.settings.general;
      if (gen.stoppingMode === 'TARGET_GP' && gen.targetGp > 0 && this.stats.getTotalGp() >= gen.targetGp) {
        this.game.gameMessage("Target GP of ".concat(gen.targetGp, " reached!"));
        return true;
      }
      if (gen.stoppingMode === 'TIME_LIMIT' && gen.timeLimitHours > 0 && this.stats.getElapsedTimeHours() >= gen.timeLimitHours) {
        this.game.gameMessage("Time limit of ".concat(gen.timeLimitHours, "h reached!"));
        return true;
      }
      return false;
    }
  }, {
    key: "updateCounters",
    value: function updateCounters() {
      var mins = this.stats.getElapsedTimeMinutes();
      var kGp = Math.floor(this.stats.getTotalGp() / 1000);
      var kGpHour = Math.floor(this.stats.getGpHour() / 1000);
      this.game.setCounter('Time (min)', mins);
      this.game.setCounter('GP Earned (k)', kGp);
      this.game.setCounter('GP/hr (k)', kGpHour);
      this.game.setCounter('Items Done', this.stats.getItemsProcessed());
    }
  }]);
}();

var runner = null;
function onStart() {
  runner = null;
  game.stopWebWalk();
  showWindow();
}
function onGameTick() {
  try {
    if (configCancelled()) {
      game.stopWebWalk();
      game.gameMessage('Money Maker configuration was cancelled.');
      game.terminate();
      return;
    }
    if (!runner) {
      var settings = selectedSettings();
      if (!settings) return;
      runner = new MoneyMakerRunner(game, settings);
      var mode = settings.general.executionMode;
      var method = settings.general.selectedMethod;
      game.gameMessage("F2P Money Maker started! Mode: ".concat(mode, " (").concat(mode === 'MANUAL' ? method : 'Adaptive Auto', "), Playstyle: ").concat(settings.general.playStyle, "."));
      game.setCounter('Play Style', settings.general.playStyle === 'fast' ? 1 : settings.general.playStyle === 'lazy' ? 3 : 2);
    }
    runner.tick();
  } catch (error) {
    game.stopWebWalk();
    game.gameMessage('Error in Money Maker: ' + String(error));
    game.log('Fatal script error: ' + String(error));
    game.terminate();
  }
}
function onEnd() {
  game.stopWebWalk();
  bot.breakHandler.setBreakHandlerStatus(false);
  closeWindow();
  game.gameMessage('F2P Money Maker stopped.');
}
