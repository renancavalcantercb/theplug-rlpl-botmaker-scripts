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
  return r && _defineProperties(e.prototype, r), Object.defineProperty(e, "prototype", {
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
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
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
  return ("string" === r ? String : Number)(t);
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

var MAKE = 17694735;
var ALL = 17694732;
var visible = id => {
  var widget = client.getWidget(id);
  return widget !== null && !widget.isHidden();
};
var skillToApi = skill => {
  switch (skill) {
    case 'Fletching':
      return net.runelite.api.Skill.FLETCHING;
    case 'Crafting':
      return net.runelite.api.Skill.CRAFTING;
    case 'Farming':
      return net.runelite.api.Skill.FARMING;
    case 'Herblore':
    default:
      return net.runelite.api.Skill.HERBLORE;
  }
};
var game = {
  loggedIn: () => client.getGameState() === net.runelite.api.GameState.LOGGED_IN && client.getLocalPlayer() !== null,
  level: skill => client.getBoostedSkillLevel(skillToApi(skill)),
  realLevel: skill => client.getRealSkillLevel(skillToApi(skill)),
  inventory: id => bot.inventory.getQuantityOfId(id),
  bank: id => bot.bank.getQuantityOfId(id),
  emptySlots: () => bot.inventory.getEmptySlots(),
  bankOpen: () => bot.bank.isOpen(),
  bankBusy: () => bot.bank.isBanking(),
  openBank: () => bot.bank.open(),
  closeBank: () => bot.bank.close(),
  deposit: id => {
    if (id === undefined) {
      bot.bank.depositAll();
    } else {
      bot.bank.depositAllWithId(id);
    }
  },
  heldItemIds: () => {
    var _bot$inventory$getAll;
    var ids = [];
    var widgets = (_bot$inventory$getAll = bot.inventory.getAllWidgets()) !== null && _bot$inventory$getAll !== void 0 ? _bot$inventory$getAll : [];
    var _iterator = _createForOfIteratorHelper(widgets),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var widget = _step.value;
        var id = widget.getItemId();
        if (id > 0 && !ids.includes(id)) ids.push(id);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return ids;
  },
  noted: () => bot.bank.getNotedMode(),
  unnoted: () => bot.bank.setNotedMode(false),
  withdraw: (id, quantity) => bot.bank.withdrawQuantityWithId(id, quantity),
  equipped: id => bot.equipment.containsId(id),
  alchemistEquipped: () => bot.equipment.containsAnyIds([29988, 29990, 29992]),
  wear: id => bot.inventory.interactWithIds([id], ['Wear']),
  clean: id => {
    var widgets = bot.inventory.getAllWidgets();
    var _iterator2 = _createForOfIteratorHelper(widgets),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var widget = _step2.value;
        if (widget.getItemId() === id) {
          bot.inventory.interactAtIndex(widget.getIndex(), ['Clean']);
          return;
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  },
  combine: (first, second) => bot.inventory.itemOnItemWithIds(first, second),
  makeVisible: job => {
    if ((job === null || job === void 0 ? void 0 : job.kind) === 'clean') return false;
    var id = productWidget(job);
    return id !== null || visible(MAKE);
  },
  makeAll: () => {
    if (visible(ALL)) bot.widgets.interactSpecifiedWidget(ALL, 1, 57, -1);
  },
  make: job => {
    var id = productWidget(job);
    if (id !== null) bot.widgets.interactSpecifiedWidget(id, 1, 57, -1);else bot.widgets.interactSpecifiedWidget(MAKE, 1, 57, -1);
  },
  continueDialogue: () => bot.widgets.handleDialogue([]),
  log: message => bot.printLogMessage('[Bank Stander] ' + message),
  counter: (name, value) => bot.counters.setCounter(name, value),
  terminate: () => bot.terminate(),
  accountSeed: () => {
    try {
      var _player$getName;
      var player = client.getLocalPlayer();
      var name = player ? String((_player$getName = player.getName()) !== null && _player$getName !== void 0 ? _player$getName : '') : '';
      var total = client.getTotalLevel();
      var seed = total > 0 ? total * 17 : 1337;
      var _iterator3 = _createForOfIteratorHelper(name),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var _char$codePointAt;
          var char = _step3.value;
          seed = (seed * 31 + ((_char$codePointAt = char.codePointAt(0)) !== null && _char$codePointAt !== void 0 ? _char$codePointAt : 0)) % 2_147_483_647;
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      return Math.abs(seed);
    } catch (_unused) {
      return 1337;
    }
  }
};
var _containsProduct = function containsProduct(widget, outputs) {
  var _widget$getChildren;
  var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  if (widget.isHidden()) return false;
  if (outputs.includes(widget.getItemId())) return true;
  if (depth >= 4) return false;
  var _iterator4 = _createForOfIteratorHelper((_widget$getChildren = widget.getChildren()) !== null && _widget$getChildren !== void 0 ? _widget$getChildren : []),
    _step4;
  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var child = _step4.value;
      if (child && _containsProduct(child, outputs, depth + 1)) return true;
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }
  return false;
};
var productWidget = job => {
  if (!job) return null;
  for (var id = MAKE; id <= MAKE + 17; id++) {
    var widget = client.getWidget(id);
    if (widget && _containsProduct(widget, job.outputs)) return id;
  }
  return null;
};
_objectSpread2(_objectSpread2({}, game), {}, {
  level: () => client.getBoostedSkillLevel(net.runelite.api.Skill.FLETCHING),
  realLevel: () => client.getRealSkillLevel(net.runelite.api.Skill.FLETCHING),
  makeVisible: job => productWidget(job) !== null,
  make: job => {
    var id = productWidget(job);
    if (id !== null) bot.widgets.interactSpecifiedWidget(id, 1, 57, -1);
  }
});
_objectSpread2(_objectSpread2({}, game), {}, {
  level: () => client.getBoostedSkillLevel(net.runelite.api.Skill.CRAFTING),
  realLevel: () => client.getRealSkillLevel(net.runelite.api.Skill.CRAFTING),
  makeVisible: job => productWidget(job) !== null || visible(MAKE),
  make: job => {
    var id = productWidget(job);
    if (id !== null) bot.widgets.interactSpecifiedWidget(id, 1, 57, -1);else bot.widgets.interactSpecifiedWidget(MAKE, 1, 57, -1);
  }
});

var CRAFTING = [];
var CHISEL = 1755;
var CRUSHED_GEM = 1633;
var addGem = function addGem(label, level, uncutId, cutId) {
  var canCrush = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  CRAFTING.push({
    key: label,
    label,
    level,
    kind: 'gems',
    inputs: [uncutId],
    outputs: canCrush ? [cutId, CRUSHED_GEM] : [cutId],
    chemistry: false,
    tool: CHISEL,
    limit: 27
  });
};
addGem('Cut Opal', 1, 1625, 1609, true);
addGem('Cut Jade', 13, 1627, 1611, true);
addGem('Cut Red topaz', 16, 1629, 1613, true);
addGem('Cut Sapphire', 20, 1623, 1607);
addGem('Cut Emerald', 27, 1621, 1605);
addGem('Cut Ruby', 34, 1619, 1603);
addGem('Cut Diamond', 43, 1617, 1601);
addGem('Cut Dragonstone', 55, 1631, 1615);
var craftingJobs = settings => CRAFTING.filter(job => {
  var _settings$crafting;
  return ((_settings$crafting = settings.crafting) !== null && _settings$crafting !== void 0 ? _settings$crafting : []).includes(job.key);
});

var FLETCHING = [];
var add = (label, level, kind, inputs, output, tool) => {
  FLETCHING.push({
    key: label,
    label,
    level,
    kind,
    inputs,
    outputs: [output],
    chemistry: false,
    tool,
    limit: tool ? 27 : kind === 'string' ? 14 : 1500,
    direct: kind === 'darts' || kind === 'bolts'
  });
};
add('String Shortbow', 5, 'string', [50, 1777], 841);
add('Cut Shortbow (u)', 5, 'cut', [1511], 50, 946);
add('String Longbow', 10, 'string', [48, 1777], 839);
add('Cut Longbow (u)', 10, 'cut', [1511], 48, 946);
add('String Oak shortbow', 20, 'string', [54, 1777], 843);
add('Cut Oak shortbow (u)', 20, 'cut', [1521], 54, 946);
add('String Oak longbow', 25, 'string', [56, 1777], 845);
add('Cut Oak longbow (u)', 25, 'cut', [1521], 56, 946);
add('String Willow shortbow', 35, 'string', [60, 1777], 849);
add('Cut Willow shortbow (u)', 35, 'cut', [1519], 60, 946);
add('String Willow longbow', 40, 'string', [58, 1777], 847);
add('Cut Willow longbow (u)', 40, 'cut', [1519], 58, 946);
add('String Maple shortbow', 50, 'string', [64, 1777], 853);
add('Cut Maple shortbow (u)', 50, 'cut', [1517], 64, 946);
add('String Maple longbow', 55, 'string', [62, 1777], 851);
add('Cut Maple longbow (u)', 55, 'cut', [1517], 62, 946);
add('String Yew shortbow', 65, 'string', [68, 1777], 857);
add('Cut Yew shortbow (u)', 65, 'cut', [1515], 68, 946);
add('String Yew longbow', 70, 'string', [66, 1777], 855);
add('Cut Yew longbow (u)', 70, 'cut', [1515], 66, 946);
add('String Magic shortbow', 80, 'string', [72, 1777], 861);
add('Cut Magic shortbow (u)', 80, 'cut', [1513], 72, 946);
add('String Magic longbow', 85, 'string', [70, 1777], 859);
add('Cut Magic longbow (u)', 85, 'cut', [1513], 70, 946);
add('Arrow shafts (normal logs)', 1, 'cut', [1511], 52, 946);
add('Redwood hiking staff', 90, 'cut', [19669], 31049, 946);
add('Bronze darts', 10, 'darts', [819, 314], 806);
add('Iron darts', 22, 'darts', [820, 314], 807);
add('Steel darts', 37, 'darts', [821, 314], 808);
add('Mithril darts', 52, 'darts', [822, 314], 809);
add('Adamant darts', 67, 'darts', [823, 314], 810);
add('Rune darts', 81, 'darts', [824, 314], 811);
add('Amethyst darts', 90, 'darts', [25853, 314], 25849);
add('Dragon darts', 95, 'darts', [11232, 314], 11230);
add('Bronze bolts', 9, 'bolts', [9375, 314], 877);
add('Blurite bolts', 24, 'bolts', [9376, 314], 9139);
add('Iron bolts', 39, 'bolts', [9377, 314], 9140);
add('Silver bolts', 43, 'bolts', [9382, 314], 9145);
add('Steel bolts', 46, 'bolts', [9378, 314], 9141);
add('Mithril bolts', 54, 'bolts', [9379, 314], 9142);
add('Broad bolts', 55, 'bolts', [11876, 314], 11875);
add('Adamant bolts', 61, 'bolts', [9380, 314], 9143);
add('Rune bolts', 69, 'bolts', [9381, 314], 9144);
add('Dragon bolts', 84, 'bolts', [21930, 314], 21905);
add('Headless arrows', 1, 'arrows', [52, 314], 53);
add('Bronze arrows', 1, 'arrows', [53, 39], 882);
add('Iron arrows', 15, 'arrows', [53, 40], 884);
add('Steel arrows', 30, 'arrows', [53, 41], 886);
add('Mithril arrows', 45, 'arrows', [53, 42], 888);
add('Broad arrows', 52, 'arrows', [53, 11874], 4160);
add('Adamant arrows', 60, 'arrows', [53, 43], 890);
add('Rune arrows', 75, 'arrows', [53, 44], 892);
add('Amethyst arrows', 82, 'arrows', [53, 21350], 21326);
add('Dragon arrows', 90, 'arrows', [53, 11237], 11212);
var fletchingJobs = settings => FLETCHING.filter(job => {
  var _settings$fletching;
  return ((_settings$fletching = settings.fletching) !== null && _settings$fletching !== void 0 ? _settings$fletching : []).includes(job.key);
});

var GARDENING_TROWEL = 5325;
var FILLED_PLANT_POT = 5354;
var WATERING_CANS = [5340, 5339, 5338, 5337, 5336, 5335, 5334, 5333];
var SEEDLINGS = [{
  key: 'oak',
  label: 'Oak',
  level: 15,
  seed: 5312,
  seedling: 5358,
  watered: 5364,
  sapling: 5370
}, {
  key: 'white-tree',
  label: 'White tree shoot',
  level: 25,
  seed: 6461,
  seedling: 6462,
  watered: 6463,
  sapling: 6464
}, {
  key: 'apple',
  label: 'Apple',
  level: 27,
  seed: 5283,
  seedling: 5480,
  watered: 5488,
  sapling: 5496
}, {
  key: 'willow',
  label: 'Willow',
  level: 30,
  seed: 5313,
  seedling: 5359,
  watered: 5365,
  sapling: 5371
}, {
  key: 'banana',
  label: 'Banana',
  level: 33,
  seed: 5284,
  seedling: 5481,
  watered: 5489,
  sapling: 5497
}, {
  key: 'teak',
  label: 'Teak',
  level: 35,
  seed: 21486,
  seedling: 21469,
  watered: 21473,
  sapling: 21477
}, {
  key: 'orange',
  label: 'Orange',
  level: 39,
  seed: 5285,
  seedling: 5482,
  watered: 5490,
  sapling: 5498
}, {
  key: 'curry',
  label: 'Curry',
  level: 42,
  seed: 5286,
  seedling: 5483,
  watered: 5491,
  sapling: 5499
}, {
  key: 'maple',
  label: 'Maple',
  level: 45,
  seed: 5314,
  seedling: 5360,
  watered: 5366,
  sapling: 5372
}, {
  key: 'pineapple',
  label: 'Pineapple',
  level: 51,
  seed: 5287,
  seedling: 5484,
  watered: 5492,
  sapling: 5500
}, {
  key: 'mahogany',
  label: 'Mahogany',
  level: 55,
  seed: 21488,
  seedling: 21471,
  watered: 21475,
  sapling: 21480
}, {
  key: 'papaya',
  label: 'Papaya',
  level: 57,
  seed: 5288,
  seedling: 5485,
  watered: 5493,
  sapling: 5501
}, {
  key: 'yew',
  label: 'Yew',
  level: 60,
  seed: 5315,
  seedling: 5361,
  watered: 5367,
  sapling: 5373
}, {
  key: 'camphor',
  label: 'Camphor',
  level: 66,
  seed: 31547,
  seedling: 31490,
  watered: 31496,
  sapling: 31502
}, {
  key: 'palm',
  label: 'Palm',
  level: 68,
  seed: 5289,
  seedling: 5486,
  watered: 5494,
  sapling: 5502
}, {
  key: 'calquat',
  label: 'Calquat',
  level: 72,
  seed: 5290,
  seedling: 5487,
  watered: 5495,
  sapling: 5503
}, {
  key: 'crystal',
  label: 'Crystal',
  level: 74,
  seed: 23661,
  seedling: 23655,
  watered: 23657,
  sapling: 23659
}, {
  key: 'magic',
  label: 'Magic',
  level: 75,
  seed: 5316,
  seedling: 5362,
  watered: 5368,
  sapling: 5374
}, {
  key: 'ironwood',
  label: 'Ironwood',
  level: 80,
  seed: 31549,
  seedling: 31492,
  watered: 31498,
  sapling: 31505
}, {
  key: 'dragonfruit',
  label: 'Dragonfruit',
  level: 81,
  seed: 22877,
  seedling: 22862,
  watered: 22864,
  sapling: 22866
}, {
  key: 'spirit',
  label: 'Spirit',
  level: 83,
  seed: 5317,
  seedling: 5363,
  watered: 5369,
  sapling: 5375
}, {
  key: 'celastrus',
  label: 'Celastrus',
  level: 85,
  seed: 22869,
  seedling: 22848,
  watered: 22852,
  sapling: 22856
}, {
  key: 'redwood',
  label: 'Redwood',
  level: 90,
  seed: 22871,
  seedling: 22850,
  watered: 22854,
  sapling: 22859
}, {
  key: 'rosewood',
  label: 'Rosewood',
  level: 92,
  seed: 31551,
  seedling: 31494,
  watered: 31500,
  sapling: 31508
}];
var FARMING = [].concat(_toConsumableArray(SEEDLINGS.map(recipe => ({
  key: recipe.key,
  label: recipe.label + ' seedling',
  level: recipe.level,
  kind: 'plant',
  inputs: [FILLED_PLANT_POT, recipe.seed],
  outputs: [recipe.seedling],
  chemistry: false,
  tool: GARDENING_TROWEL,
  passiveTool: true,
  limit: 13,
  direct: true,
  stage: 0
}))), _toConsumableArray(SEEDLINGS.map(recipe => ({
  key: recipe.key + '.water',
  label: 'Water ' + recipe.label + ' seedling',
  level: recipe.level,
  kind: 'water',
  inputs: [recipe.seedling],
  outputs: [recipe.watered, recipe.sapling],
  chemistry: false,
  tools: WATERING_CANS,
  limit: 1,
  direct: true,
  stage: 1
}))));
var farmingJobs = settings => {
  var _settings$farming;
  var selected = new Set((_settings$farming = settings.farming) !== null && _settings$farming !== void 0 ? _settings$farming : []);
  return FARMING.filter(job => selected.has(job.key.replace(/\.water$/, '')));
};

var HERBS = [{
  key: 'guam',
  name: 'Guam leaf',
  grimy: 199,
  clean: 249,
  unf: 91,
  cleanLevel: 3,
  unfLevel: 3
}, {
  key: 'marrentill',
  name: 'Marrentill',
  grimy: 201,
  clean: 251,
  unf: 93,
  cleanLevel: 5,
  unfLevel: 5
}, {
  key: 'tarromin',
  name: 'Tarromin',
  grimy: 203,
  clean: 253,
  unf: 95,
  cleanLevel: 11,
  unfLevel: 12
}, {
  key: 'harralander',
  name: 'Harralander',
  grimy: 205,
  clean: 255,
  unf: 97,
  cleanLevel: 20,
  unfLevel: 22
}, {
  key: 'ranarr',
  name: 'Ranarr weed',
  grimy: 207,
  clean: 257,
  unf: 99,
  cleanLevel: 25,
  unfLevel: 30
}, {
  key: 'toadflax',
  name: 'Toadflax',
  grimy: 3049,
  clean: 2998,
  unf: 3002,
  cleanLevel: 30,
  unfLevel: 30
}, {
  key: 'irit',
  name: 'Irit leaf',
  grimy: 209,
  clean: 259,
  unf: 101,
  cleanLevel: 40,
  unfLevel: 45
}, {
  key: 'avantoe',
  name: 'Avantoe',
  grimy: 211,
  clean: 261,
  unf: 103,
  cleanLevel: 48,
  unfLevel: 50
}, {
  key: 'kwuarm',
  name: 'Kwuarm',
  grimy: 213,
  clean: 263,
  unf: 105,
  cleanLevel: 54,
  unfLevel: 55
}, {
  key: 'huasca',
  name: 'Huasca',
  grimy: 30094,
  clean: 30097,
  unf: 30100,
  cleanLevel: 58,
  unfLevel: 58
}, {
  key: 'snapdragon',
  name: 'Snapdragon',
  grimy: 3051,
  clean: 3000,
  unf: 3004,
  cleanLevel: 59,
  unfLevel: 63
}, {
  key: 'cadantine',
  name: 'Cadantine',
  grimy: 215,
  clean: 265,
  unf: 107,
  cleanLevel: 65,
  unfLevel: 66
}, {
  key: 'lantadyme',
  name: 'Lantadyme',
  grimy: 2485,
  clean: 2481,
  unf: 2483,
  cleanLevel: 67,
  unfLevel: 69
}, {
  key: 'dwarf',
  name: 'Dwarf weed',
  grimy: 217,
  clean: 267,
  unf: 109,
  cleanLevel: 70,
  unfLevel: 72
}, {
  key: 'torstol',
  name: 'Torstol',
  grimy: 219,
  clean: 269,
  unf: 111,
  cleanLevel: 75,
  unfLevel: 78
}];
var POTIONS = [{
  herb: 'guam',
  name: 'Attack potion',
  level: 3,
  secondary: 221,
  outputs: [121, 2428],
  chemistry: true
}, {
  herb: 'marrentill',
  name: 'Antipoison',
  level: 5,
  secondary: 235,
  outputs: [175, 2446],
  chemistry: true
}, {
  herb: 'tarromin',
  name: 'Strength potion',
  level: 12,
  secondary: 225,
  outputs: [115, 113],
  chemistry: true
}, {
  herb: 'tarromin',
  name: 'Serum 207',
  level: 15,
  secondary: 592,
  outputs: [3410, 3408],
  chemistry: true
}, {
  herb: 'harralander',
  name: 'Compost potion',
  level: 22,
  secondary: 21622,
  outputs: [6472, 6470],
  chemistry: true
}, {
  herb: 'harralander',
  name: 'Restore potion',
  level: 22,
  secondary: 223,
  outputs: [127, 2430],
  chemistry: true
}, {
  herb: 'harralander',
  name: 'Energy potion',
  level: 26,
  secondary: 1975,
  outputs: [3010, 3008],
  chemistry: true
}, {
  herb: 'harralander',
  name: 'Combat potion',
  level: 36,
  secondary: 9736,
  outputs: [9741, 9739],
  chemistry: true
}, {
  herb: 'harralander',
  name: 'Goading potion',
  level: 54,
  secondary: 29993,
  outputs: [30140, 30137],
  chemistry: true
}, {
  herb: 'ranarr',
  name: 'Defence potion',
  level: 30,
  secondary: 239,
  outputs: [133, 2432],
  chemistry: true
}, {
  herb: 'ranarr',
  name: 'Prayer potion',
  level: 38,
  secondary: 231,
  outputs: [139, 2434],
  chemistry: true
}, {
  herb: 'toadflax',
  name: 'Agility potion',
  level: 34,
  secondary: 2152,
  outputs: [3034, 3032],
  chemistry: true
}, {
  herb: 'toadflax',
  name: 'Saradomin brew',
  level: 81,
  secondary: 6693,
  outputs: [6687, 6685],
  chemistry: true
}, {
  herb: 'irit',
  name: 'Super attack',
  level: 45,
  secondary: 221,
  outputs: [145, 2436],
  chemistry: true
}, {
  herb: 'irit',
  name: 'Superantipoison',
  level: 48,
  secondary: 235,
  outputs: [181, 2448],
  chemistry: true
}, {
  herb: 'avantoe',
  name: 'Fishing potion',
  level: 50,
  secondary: 231,
  outputs: [151, 2438],
  chemistry: true
}, {
  herb: 'avantoe',
  name: 'Super energy',
  level: 52,
  secondary: 2970,
  outputs: [3018, 3016],
  chemistry: true
}, {
  herb: 'avantoe',
  name: 'Hunter potion',
  level: 53,
  secondary: 10111,
  outputs: [10000, 9998],
  chemistry: true
}, {
  herb: 'kwuarm',
  name: 'Super strength',
  level: 55,
  secondary: 225,
  outputs: [157, 2440],
  chemistry: true
}, {
  herb: 'kwuarm',
  name: 'Weapon poison',
  level: 60,
  secondary: 241,
  outputs: [187],
  chemistry: false
}, {
  herb: 'huasca',
  name: 'Prayer regeneration potion',
  level: 58,
  secondary: 29993,
  outputs: [30128, 30125],
  chemistry: true
}, {
  herb: 'snapdragon',
  name: 'Super restore',
  level: 63,
  secondary: 223,
  outputs: [3026, 3024],
  chemistry: true
}, {
  herb: 'cadantine',
  name: 'Super defence',
  level: 66,
  secondary: 239,
  outputs: [163, 2442],
  chemistry: true
}, {
  herb: 'lantadyme',
  name: 'Antifire potion',
  level: 69,
  secondary: 241,
  outputs: [2454, 2452],
  chemistry: true
}, {
  herb: 'lantadyme',
  name: 'Magic potion',
  level: 76,
  secondary: 3138,
  outputs: [3042, 3040],
  chemistry: true
}, {
  herb: 'dwarf',
  name: 'Ranging potion',
  level: 72,
  secondary: 245,
  outputs: [169, 2444],
  chemistry: true
}, {
  herb: 'dwarf',
  name: 'Menaphite remedy',
  level: 88,
  secondary: 27272,
  outputs: [27205, 27202],
  chemistry: true
}, {
  herb: 'torstol',
  name: 'Zamorak brew',
  level: 78,
  secondary: 247,
  outputs: [189, 2450],
  chemistry: true
}];
var BEST_POTION = 'best';
var jobsFor = settings => {
  var jobs = [];
  var _loop = function _loop() {
    var herb = _HERBS[_i];
    var selection = settings.herbs[herb.key];
    if (!selection) return 1; // continue
    if (selection.potion === BEST_POTION) {
      var recipes = POTIONS.filter(entry => entry.herb === herb.key).slice().sort((a, b) => b.level - a.level);
      var _iterator = _createForOfIteratorHelper(recipes),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var potion = _step.value;
          jobs.push({
            key: herb.key + '.finished.' + potion.name,
            label: potion.name + ' (best available)',
            kind: 'finished',
            level: potion.level,
            inputs: [herb.unf, potion.secondary],
            outputs: potion.outputs,
            chemistry: potion.chemistry
          });
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    } else {
      var _potion = POTIONS.find(entry => entry.herb === herb.key && entry.name === selection.potion);
      if (_potion) jobs.push({
        key: herb.key + '.finished',
        label: _potion.name,
        kind: 'finished',
        level: _potion.level,
        inputs: [herb.unf, _potion.secondary],
        outputs: _potion.outputs,
        chemistry: _potion.chemistry
      });
    }
    if (selection.unfinished) jobs.push({
      key: herb.key + '.unfinished',
      label: herb.name + ' (unf)',
      kind: 'unfinished',
      level: herb.unfLevel,
      inputs: [herb.clean, 227],
      outputs: [herb.unf],
      chemistry: false
    });
    if (selection.clean) jobs.push({
      key: herb.key + '.clean',
      label: 'Clean ' + herb.name,
      kind: 'clean',
      level: herb.cleanLevel,
      inputs: [herb.grimy],
      outputs: [herb.clean],
      chemistry: false
    });
  };
  for (var _i = 0, _HERBS = HERBS; _i < _HERBS.length; _i++) {
    if (_loop()) continue;
  }
  return jobs;
};
var selectBatch = (jobs, level, count, progressive) => {
  var chosen = null;
  var _iterator2 = _createForOfIteratorHelper(jobs),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var _job$tools, _job$limit, _job$stage, _chosen$job$stage, _chosen;
      var job = _step2.value;
      if (job.level > level) continue;
      var tool = job.tool === undefined ? (_job$tools = job.tools) === null || _job$tools === void 0 ? void 0 : _job$tools.find(id => count(id) > 0) : count(job.tool) > 0 ? job.tool : undefined;
      if ((job.tool !== undefined || job.tools !== undefined) && tool === undefined) continue;
      var quantity = (_job$limit = job.limit) !== null && _job$limit !== void 0 ? _job$limit : job.kind === 'clean' ? 28 : 14;
      var _iterator3 = _createForOfIteratorHelper(job.inputs),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var id = _step3.value;
          quantity = Math.min(quantity, count(id));
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      if (quantity < 1) continue;
      var stage = (_job$stage = job.stage) !== null && _job$stage !== void 0 ? _job$stage : 0;
      var chosenStage = (_chosen$job$stage = (_chosen = chosen) === null || _chosen === void 0 ? void 0 : _chosen.job.stage) !== null && _chosen$job$stage !== void 0 ? _chosen$job$stage : 0;
      if (!chosen || stage < chosenStage || stage === chosenStage && progressive && job.level > chosen.job.level) chosen = {
        job,
        quantity,
        tool
      };
      if (!progressive && chosen) break;
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  return chosen;
};

var CHEMISTRY = 21163;
var HerbloreRunner = /*#__PURE__*/function () {
  function HerbloreRunner(game, settings) {
    var _settings$skill;
    var random = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Math.random;
    _classCallCheck(this, HerbloreRunner);
    _defineProperty(this, "game", void 0);
    _defineProperty(this, "settings", void 0);
    _defineProperty(this, "random", void 0);
    _defineProperty(this, "state", 'bank');
    _defineProperty(this, "pending", null);
    _defineProperty(this, "batch", null);
    _defineProperty(this, "withdrawalIndex", 0);
    _defineProperty(this, "withdrawalTicks", 0);
    _defineProperty(this, "withdrawalAttempts", 0);
    _defineProperty(this, "idleTicks", 0);
    _defineProperty(this, "retries", 0);
    _defineProperty(this, "lastOutput", 0);
    _defineProperty(this, "menuOutput", 0);
    _defineProperty(this, "directActive", false);
    _defineProperty(this, "observing", false);
    _defineProperty(this, "targetReached", false);
    _defineProperty(this, "phases", []);
    _defineProperty(this, "phaseIndex", 0);
    _defineProperty(this, "humanized", void 0);
    _defineProperty(this, "lazy", void 0);
    _defineProperty(this, "delayTicks", 0);
    _defineProperty(this, "afkChance", 0);
    _defineProperty(this, "afkCooldown", 0);
    _defineProperty(this, "afks", 0);
    _defineProperty(this, "timingReady", false);
    _defineProperty(this, "totals", {
      clean: 0,
      unfinished: 0,
      finished: 0,
      cut: 0,
      string: 0,
      darts: 0,
      bolts: 0,
      arrows: 0,
      gems: 0,
      plant: 0,
      water: 0
    });
    this.game = game;
    this.settings = settings;
    this.random = random;
    this.humanized = settings.playStyle !== undefined;
    this.lazy = settings.playStyle === 'lazy';
    var enabledSkills = settings.skills && settings.skills.length > 0 ? settings.skills : [(_settings$skill = settings.skill) !== null && _settings$skill !== void 0 ? _settings$skill : 'Herblore'];
    var _iterator = _createForOfIteratorHelper(enabledSkills),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var skill = _step.value;
        var jobs = skill === 'Herblore' ? jobsFor(settings) : skill === 'Crafting' ? craftingJobs(settings) : skill === 'Fletching' ? fletchingJobs(settings) : farmingJobs(settings);
        if (jobs.length > 0) {
          this.phases.push({
            skill,
            jobs
          });
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  return _createClass(HerbloreRunner, [{
    key: "currentPhase",
    get: function get() {
      var _this$phases$this$pha;
      return (_this$phases$this$pha = this.phases[this.phaseIndex]) !== null && _this$phases$this$pha !== void 0 ? _this$phases$this$pha : null;
    }
  }, {
    key: "advancePhase",
    value: function advancePhase() {
      this.phaseIndex++;
      if (this.phaseIndex < this.phases.length) {
        var next = this.phases[this.phaseIndex];
        this.game.log("Advancing to next skill: [".concat(next.skill, "] (").concat(next.jobs.length, " recipes configured)."));
        this.batch = null;
        this.returnToBank();
        return true;
      }
      return false;
    }
  }, {
    key: "checkTargetLevel",
    value: function checkTargetLevel() {
      var phase = this.currentPhase;
      if (!phase || this.settings.targetLevel <= 0) return false;
      return this.game.realLevel(phase.skill) >= this.settings.targetLevel;
    }
  }, {
    key: "stop",
    value: function stop(reason) {
      this.state = 'stopped';
      this.pending = null;
      this.game.log(reason);
      this.game.terminate();
    }
  }, {
    key: "wait",
    value: function wait(label, action, check, done) {
      var ticks = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 15;
      this.pending = {
        label,
        check,
        done,
        ticks
      };
      action();
    }
  }, {
    key: "randomInt",
    value: function randomInt(min, max) {
      return min + Math.floor(this.random() * (Math.max(0, max - min) + 1));
    }
  }, {
    key: "setupTiming",
    value: function setupTiming() {
      this.timingReady = true;
      if (!this.humanized) return;
      this.afkChance = this.lazy ? 0.006 + this.random() * 0.014 : 0.002 + this.random() * 0.008;
      this.game.log("Play style: ".concat(this.lazy ? 'Lazy / AFK' : 'Normal') + (this.settings.randomAfk ? ", AFK chance this run ".concat((this.afkChance * 100).toFixed(2), "% per busy tick.") : ', random AFKs off.'));
      this.game.counter(this.lazy ? 'Style [Lazy AFK]' : 'Style [Normal]', 1);
    }
  }, {
    key: "reactionDelay",
    value: function reactionDelay() {
      var _this$game$accountSee, _this$game$accountSee2, _this$game;
      if (!this.humanized) return 0;
      var seed = Math.abs((_this$game$accountSee = (_this$game$accountSee2 = (_this$game = this.game).accountSeed) === null || _this$game$accountSee2 === void 0 ? void 0 : _this$game$accountSee2.call(_this$game)) !== null && _this$game$accountSee !== void 0 ? _this$game$accountSee : 1337);
      if (this.lazy) return Math.max(4, Math.min(16, 5 + seed % 6 + this.randomInt(-1, 6)));
      return Math.max(1, Math.min(4, 1 + seed % 2 + this.randomInt(0, 1)));
    }
  }, {
    key: "microDelay",
    value: function microDelay(normalMax, lazyMax) {
      if (!this.humanized) return;
      var ticks = this.randomInt(0, this.lazy ? lazyMax : normalMax);
      if (ticks > this.delayTicks) this.delayTicks = ticks;
    }
  }, {
    key: "maybeAfk",
    value: function maybeAfk(action) {
      if (!this.humanized || !this.settings.randomAfk || this.afkCooldown > 0) return false;
      if (this.random() >= this.afkChance) return false;
      var ticks = this.lazy ? this.randomInt(10, 50) : this.randomInt(4, 20);
      this.afks++;
      this.afkCooldown = this.randomInt(60, 200);
      this.delayTicks = ticks;
      this.game.log("Going AFK for ".concat(ticks, " ticks (~").concat((ticks * 0.6).toFixed(1), "s) while ").concat(action, "."));
      this.game.counter('AFK Breaks', this.afks);
      return true;
    }
  }, {
    key: "outputCount",
    value: function outputCount() {
      var quantity = 0;
      if (this.batch) {
        var _iterator2 = _createForOfIteratorHelper(this.batch.job.outputs),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var id = _step2.value;
            quantity += this.game.inventory(id);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
      return quantity;
    }
  }, {
    key: "observe",
    value: function observe() {
      if (!this.observing || !this.batch) return false;
      var quantity = this.outputCount();
      var grew = quantity > this.lastOutput;
      if (grew) {
        var _this$currentPhase$sk, _this$currentPhase;
        this.totals[this.batch.job.kind] += quantity - this.lastOutput;
        this.idleTicks = 0;
        this.retries = 0;
        var skill = (_this$currentPhase$sk = (_this$currentPhase = this.currentPhase) === null || _this$currentPhase === void 0 ? void 0 : _this$currentPhase.skill) !== null && _this$currentPhase$sk !== void 0 ? _this$currentPhase$sk : 'Herblore';
        this.game.counter(skill + ' ' + this.batch.job.kind, this.totals[this.batch.job.kind]);
      }
      this.lastOutput = quantity;
      return grew;
    }
  }, {
    key: "returnToBank",
    value: function returnToBank() {
      if (this.observing) {
        var delay = this.reactionDelay();
        if (delay > this.delayTicks) this.delayTicks = delay;
      }
      this.observing = false;
      this.pending = null;
      this.state = 'bank';
      this.idleTicks = 0;
    }
  }, {
    key: "tick",
    value: function tick() {
      var _this$batch;
      var game = this.game;
      if (this.state === 'stopped' || !game.loggedIn()) return;
      if (!this.timingReady) this.setupTiming();
      var produced = this.observe();
      if (this.delayTicks > 0) {
        this.delayTicks--;
        return;
      }
      if (this.afkCooldown > 0) this.afkCooldown--;
      if (!this.targetReached && this.checkTargetLevel()) {
        this.targetReached = true;
        this.returnToBank();
      }
      if (this.observing && (_this$batch = this.batch) !== null && _this$batch !== void 0 && _this$batch.job.chemistry && this.settings.chemistry && !game.equipped(CHEMISTRY)) {
        game.log('Amulet of chemistry depleted; returning to the bank.');
        this.returnToBank();
      }
      if (this.pending) {
        var pending = this.pending;
        if (pending.check()) {
          this.pending = null;
          pending.done();
        } else if (--pending.ticks <= 0) this.stop('Timed out: ' + pending.label + '. Check the bank/menu and script log.');
        return;
      }
      if ((this.state === 'deposit' || this.state === 'plan' || this.state === 'withdraw') && !game.bankOpen()) {
        this.returnToBank();
        return;
      }
      switch (this.state) {
        case 'bank':
          {
            if (game.bankOpen()) this.state = 'deposit';else this.wait('open nearby bank', () => game.openBank(), () => game.bankOpen(), () => {
              this.state = 'deposit';
            }, 25);
            break;
          }
        case 'plan':
          {
            if (this.phases.length === 0) {
              this.stop('No tasks selected for any enabled skill.');
              break;
            }
            var current = this.currentPhase;
            if (!current) {
              if (game.emptySlots() < 28) {
                this.wait('deposit inventory', () => game.deposit(), () => game.emptySlots() === 28, () => {
                  this.stop('All tasks across enabled skills completed; inventory deposited.');
                });
                break;
              }
              this.stop('All tasks across enabled skills completed; inventory deposited.');
              break;
            }
            if (this.checkTargetLevel()) {
              game.log("[".concat(current.skill, "] Target level ").concat(this.settings.targetLevel, " reached."));
              if (game.emptySlots() < 28) {
                this.wait('deposit inventory', () => game.deposit(), () => game.emptySlots() === 28, () => {
                  if (!this.advancePhase()) {
                    this.stop('Target level reached; inventory deposited.');
                  }
                });
                break;
              }
              if (!this.advancePhase()) {
                this.stop('Target level reached; inventory deposited.');
              }
              break;
            }
            if (game.noted()) {
              this.wait('switch bank to Item mode', () => game.unnoted(), () => !game.noted(), () => {});
              break;
            }
            this.batch = selectBatch(current.jobs, game.level(current.skill), id => game.bank(id) + (current.jobs.some(j => {
              var _j$tools;
              return j.tool === id || ((_j$tools = j.tools) === null || _j$tools === void 0 ? void 0 : _j$tools.includes(id));
            }) ? game.inventory(id) : 0), this.settings.progressive);
            if (!this.batch) {
              var _iterator3 = _createForOfIteratorHelper(current.jobs),
                _step3;
              try {
                for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                  var job = _step3.value;
                  var missing = job.inputs.filter(id => game.bank(id) < 1);
                  if (missing.length > 0 || job.level > game.level(current.skill)) {
                    game.log("[".concat(current.skill, "] ").concat(job.label, ": ") + (job.level > game.level(current.skill) ? 'requires level ' + job.level : 'missing item IDs ' + missing.join(', ')));
                  }
                }
              } catch (err) {
                _iterator3.e(err);
              } finally {
                _iterator3.f();
              }
              game.log("[".concat(current.skill, "] No more doable tasks with current supplies."));
              if (game.emptySlots() < 28) {
                this.wait('deposit inventory', () => game.deposit(), () => game.emptySlots() === 28, () => {
                  if (!this.advancePhase()) {
                    this.stop('All tasks across enabled skills completed; inventory deposited.');
                  }
                });
                break;
              }
              if (!this.advancePhase()) {
                this.stop('All tasks across enabled skills completed; inventory deposited.');
              }
              break;
            }
            if (current.skill === 'Herblore' && this.settings.chemistry && this.batch.job.chemistry && !game.equipped(CHEMISTRY)) {
              if (game.alchemistEquipped()) {
                this.stop("Remove the Alchemist's amulet or disable Use Amulets of Chemistry.");
                break;
              }
              if (game.bank(CHEMISTRY) < 1) {
                game.log('No Amulets of Chemistry left in the bank.');
                if (!this.advancePhase()) {
                  this.stop('No Amulets of Chemistry left in the bank.');
                }
                break;
              }
              this.wait('withdraw Amulet of chemistry', () => game.withdraw(CHEMISTRY, 1), () => game.inventory(CHEMISTRY) === 1, () => {
                this.state = 'equip-close';
              });
              break;
            }
            game.log("[".concat(current.skill, "] ") + this.batch.job.label + ' | batch ' + this.batch.quantity + ' | level ' + game.level(current.skill));
            this.withdrawalIndex = 0;
            this.withdrawalTicks = 0;
            this.withdrawalAttempts = 0;
            var tool = this.batch.tool;
            var needsDeposit = tool !== undefined && game.inventory(tool) > 0 ? game.heldItemIds().some(id => id !== tool) : game.emptySlots() < 28;
            if (needsDeposit) {
              this.state = 'deposit';
            } else {
              this.state = 'withdraw';
            }
            break;
          }
        case 'deposit':
          {
            var _this$batch$tool, _this$batch2, _this$currentPhase2;
            var heldTool = (_this$batch$tool = (_this$batch2 = this.batch) === null || _this$batch2 === void 0 ? void 0 : _this$batch2.tool) !== null && _this$batch$tool !== void 0 ? _this$batch$tool : (_this$currentPhase2 = this.currentPhase) === null || _this$currentPhase2 === void 0 ? void 0 : _this$currentPhase2.jobs.flatMap(job => {
              var _job$tools, _job$tools2;
              return job.tool === undefined ? (_job$tools = job.tools) !== null && _job$tools !== void 0 ? _job$tools : [] : [job.tool].concat(_toConsumableArray((_job$tools2 = job.tools) !== null && _job$tools2 !== void 0 ? _job$tools2 : []));
            }).find(id => game.inventory(id) > 0);
            if (heldTool !== undefined && game.inventory(heldTool) > 0) {
              var toDeposit = game.heldItemIds().filter(id => id !== heldTool);
              if (toDeposit.length === 0) {
                this.state = 'plan';
                break;
              }
              var target = toDeposit[0];
              this.wait('deposit item ' + target, () => game.deposit(target), () => game.inventory(target) === 0, () => this.microDelay(1, 2));
            } else {
              if (game.emptySlots() === 28) {
                this.state = 'plan';
              } else {
                this.wait('deposit inventory', () => game.deposit(), () => game.emptySlots() === 28, () => {
                  this.state = 'plan';
                  this.microDelay(1, 2);
                });
              }
            }
            break;
          }
        case 'equip-close':
          {
            this.wait('close bank to equip amulet', () => game.closeBank(), () => !game.bankOpen(), () => {
              this.state = 'equip';
            });
            break;
          }
        case 'equip':
          {
            this.wait('equip Amulet of chemistry', () => game.wear(CHEMISTRY), () => game.equipped(CHEMISTRY), () => {
              this.returnToBank();
            });
            break;
          }
        case 'withdraw':
          {
            var batch = this.batch;
            if (!batch) {
              this.stop('Missing batch.');
              break;
            }
            var items = batch.tool ? [batch.tool].concat(_toConsumableArray(batch.job.inputs)) : batch.job.inputs;
            var id = items[this.withdrawalIndex];
            var requested = id === batch.tool ? 1 : batch.quantity;
            if (id === undefined) {
              this.state = 'close';
              break;
            }
            var held = game.inventory(id);
            if (game.bankBusy()) {
              if (++this.withdrawalTicks > 30) {
                this.stop('Bank operation did not finish: item ' + id + ', inventory ' + held + '/' + batch.quantity + '.');
              }
              break;
            }
            if (this.withdrawalAttempts > 0) this.withdrawalTicks++;
            if (held >= requested || held > 0 && this.withdrawalTicks >= 15) {
              game.log('Withdraw confirmed: item ' + id + ', inventory ' + held + ', requested ' + batch.quantity + '.');
              if (id !== batch.tool) batch.quantity = Math.min(batch.quantity, held);
              this.withdrawalIndex++;
              this.withdrawalAttempts = 0;
              this.withdrawalTicks = 0;
              this.microDelay(1, 2);
              break;
            }
            if (this.withdrawalAttempts > 0 && this.withdrawalTicks < 15) break;
            if (this.withdrawalAttempts >= 3) {
              this.stop('Timed out: withdraw ' + batch.quantity + ' of item ' + id + '. Inventory=' + held + ', bank=' + game.bank(id) + ', noted=' + game.noted() + '.');
              break;
            }
            if (game.noted()) {
              game.unnoted();
              break;
            }
            this.withdrawalAttempts++;
            this.withdrawalTicks = 0;
            game.log('Withdraw attempt ' + this.withdrawalAttempts + '/3: item ' + id + ', missing ' + (requested - held) + ', bank=' + game.bank(id) + '.');
            game.withdraw(id, requested - held);
            break;
          }
        case 'close':
          {
            this.wait('close bank', () => game.closeBank(), () => !game.bankOpen(), () => {
              this.lastOutput = this.outputCount();
              this.observing = true;
              this.retries = 0;
              this.state = 'work';
              this.microDelay(1, 3);
            });
            break;
          }
        case 'work':
          {
            var _this$batch3, _this$currentPhase3;
            var _job = (_this$batch3 = this.batch) === null || _this$batch3 === void 0 ? void 0 : _this$batch3.job;
            if (!_job) {
              this.stop('Missing job.');
              break;
            }
            if (game.bankOpen()) {
              this.returnToBank();
              break;
            }
            var currentSkill = (_this$currentPhase3 = this.currentPhase) === null || _this$currentPhase3 === void 0 ? void 0 : _this$currentPhase3.skill;
            if (_job.level > game.level(currentSkill)) {
              this.returnToBank();
              break;
            }
            if (_job.inputs.some(id => game.inventory(id) < 1)) {
              this.returnToBank();
              break;
            }
            var first = _job.inputs[0];
            if (_job.kind === 'clean') {
              var before = game.inventory(first);
              var outputBefore = this.outputCount();
              this.wait('clean herb ' + first, () => game.clean(first), () => game.inventory(first) < before && this.outputCount() > outputBefore, () => {});
            } else {
              var _this$batch4, _this$batch5;
              this.directActive = false;
              this.menuOutput = this.outputCount();
              game.combine((_this$batch4 = this.batch) !== null && _this$batch4 !== void 0 && _this$batch4.tool && !_job.passiveTool ? this.batch.tool : first, (_this$batch5 = this.batch) !== null && _this$batch5 !== void 0 && _this$batch5.tool && !_job.passiveTool ? first : _job.inputs[1]);
              this.idleTicks = 0;
              this.state = 'menu';
            }
            break;
          }
        case 'menu':
          {
            var _this$batch6;
            if (game.makeVisible((_this$batch6 = this.batch) === null || _this$batch6 === void 0 ? void 0 : _this$batch6.job)) {
              game.makeAll();
              this.state = 'make';
            } else if (this.outputCount() > this.menuOutput) {
              var _this$batch7;
              this.directActive = !!((_this$batch7 = this.batch) !== null && _this$batch7 !== void 0 && _this$batch7.job.direct);
              this.state = 'mix';
              this.idleTicks = 0;
            } else if (++this.idleTicks > 12) this.retryMix();
            break;
          }
        case 'make':
          {
            var _this$batch8;
            if (game.makeVisible((_this$batch8 = this.batch) === null || _this$batch8 === void 0 ? void 0 : _this$batch8.job)) {
              var _this$batch9, _this$batch0;
              game.log('Clicking Make for ' + ((_this$batch9 = this.batch) === null || _this$batch9 === void 0 ? void 0 : _this$batch9.job.label) + '.');
              game.make((_this$batch0 = this.batch) === null || _this$batch0 === void 0 ? void 0 : _this$batch0.job);
            }
            this.state = 'mix';
            this.idleTicks = 0;
            break;
          }
        case 'mix':
          {
            var _this$batch1;
            var _job2 = (_this$batch1 = this.batch) === null || _this$batch1 === void 0 ? void 0 : _this$batch1.job;
            if (!_job2) {
              this.stop('Missing recipe.');
              break;
            }
            if (_job2.inputs.some(id => game.inventory(id) < 1)) {
              this.returnToBank();
              break;
            }
            if (produced && this.maybeAfk('making ' + _job2.label)) break;
            if (this.directActive && ++this.idleTicks >= 2) {
              this.state = 'work';
              break;
            }
            if (!this.directActive) this.idleTicks++;
            if (this.idleTicks === 8) game.continueDialogue();
            if (this.idleTicks > 15) this.retryMix();
            break;
          }
      }
    }
  }, {
    key: "retryMix",
    value: function retryMix() {
      if (++this.retries > 3) {
        var _this$batch10;
        this.stop('No production confirmed for ' + ((_this$batch10 = this.batch) === null || _this$batch10 === void 0 ? void 0 : _this$batch10.job.label) + '. Check requirements and the Make menu.');
        return;
      }
      this.game.log('Production interrupted; retry ' + this.retries + '/3.');
      this.state = 'work';
    }
  }]);
}();

var SKILL_ORDER = ['Herblore', 'Crafting', 'Fletching', 'Farming'];
var CACHE_PREFIX = 'bankStander.';
var HERB_PREFIX = 'bankStander.herblore.';
var FLETCH_PREFIX = 'bankStander.fletching.';
var CRAFT_PREFIX = 'bankStander.crafting.';
var FARM_PREFIX = 'bankStander.farming.';
var defaultSettings = {
  skill: 'Herblore',
  skills: ['Herblore', 'Crafting', 'Fletching'],
  fletching: [],
  crafting: [],
  farming: [],
  progressive: true,
  chemistry: false,
  targetLevel: 0,
  herbs: {},
  playStyle: 'normal',
  randomAfk: true
};
var loadSettings = () => {
  var configured = bot.bmCache.getBoolean(HERB_PREFIX + 'configured', false) || bot.bmCache.getBoolean(CACHE_PREFIX + 'configured', false);
  if (!configured) {
    return _objectSpread2(_objectSpread2({}, defaultSettings), {}, {
      herbs: {},
      fletching: [],
      crafting: [],
      farming: []
    });
  }
  var playStyle = bot.bmCache.getString(CACHE_PREFIX + 'playStyle', 'normal') === 'lazy' ? 'lazy' : 'normal';
  var randomAfk = bot.bmCache.getBoolean(CACHE_PREFIX + 'randomAfk', true);
  var skillStr = bot.bmCache.getString(CACHE_PREFIX + 'skill', 'Herblore');
  var skill = skillStr === 'Farming' ? 'Farming' : skillStr === 'Fletching' ? 'Fletching' : skillStr === 'Crafting' ? 'Crafting' : 'Herblore';
  var hasMultiSkillCache = bot.bmCache.getBoolean(CACHE_PREFIX + 'skills.configured', false);
  var skills = [];
  if (hasMultiSkillCache) {
    for (var _i = 0, _SKILL_ORDER = SKILL_ORDER; _i < _SKILL_ORDER.length; _i++) {
      var s = _SKILL_ORDER[_i];
      if (bot.bmCache.getBoolean(CACHE_PREFIX + 'skill.' + s, false)) {
        skills.push(s);
      }
    }
  }
  if (skills.length === 0) {
    skills.push(skill);
  }
  var progressive = bot.bmCache.getBoolean(HERB_PREFIX + 'progressive', true);
  var chemistry = bot.bmCache.getBoolean(HERB_PREFIX + 'chemistry', false);
  var targetLevel = bot.bmCache.getInt(HERB_PREFIX + 'target', 0);
  var herbs = {};
  var _iterator = _createForOfIteratorHelper(HERBS),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var herb = _step.value;
      var clean = bot.bmCache.getBoolean(HERB_PREFIX + herb.key + '.clean', false);
      var unfinished = bot.bmCache.getBoolean(HERB_PREFIX + herb.key + '.unfinished', false);
      var potion = String(bot.bmCache.getString(HERB_PREFIX + herb.key + '.potion', ''));
      herbs[herb.key] = {
        clean,
        unfinished,
        potion
      };
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  var fletching = [];
  var _iterator2 = _createForOfIteratorHelper(FLETCHING),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var job = _step2.value;
      if (bot.bmCache.getBoolean(FLETCH_PREFIX + job.key, false)) {
        fletching.push(job.key);
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  var crafting = [];
  var _iterator3 = _createForOfIteratorHelper(CRAFTING),
    _step3;
  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var _job = _step3.value;
      if (bot.bmCache.getBoolean(CRAFT_PREFIX + _job.key, false)) {
        crafting.push(_job.key);
      }
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
  var farming = [];
  var _iterator4 = _createForOfIteratorHelper(SEEDLINGS),
    _step4;
  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var recipe = _step4.value;
      if (bot.bmCache.getBoolean(FARM_PREFIX + recipe.key, false)) {
        farming.push(recipe.key);
      }
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }
  return {
    skill,
    skills,
    fletching,
    crafting,
    farming,
    progressive,
    chemistry,
    targetLevel,
    herbs,
    playStyle,
    randomAfk
  };
};
var saveSettings = settings => {
  var _settings$skill, _settings$skills, _settings$skill2, _settings$playStyle, _settings$randomAfk, _settings$fletching, _settings$crafting, _settings$farming;
  bot.bmCache.saveBoolean(CACHE_PREFIX + 'configured', true);
  bot.bmCache.saveBoolean(HERB_PREFIX + 'configured', true);
  bot.bmCache.saveBoolean(CACHE_PREFIX + 'skills.configured', true);
  bot.bmCache.saveString(CACHE_PREFIX + 'skill', (_settings$skill = settings.skill) !== null && _settings$skill !== void 0 ? _settings$skill : 'Herblore');
  var enabledSet = new Set((_settings$skills = settings.skills) !== null && _settings$skills !== void 0 ? _settings$skills : [(_settings$skill2 = settings.skill) !== null && _settings$skill2 !== void 0 ? _settings$skill2 : 'Herblore']);
  for (var _i2 = 0, _SKILL_ORDER2 = SKILL_ORDER; _i2 < _SKILL_ORDER2.length; _i2++) {
    var s = _SKILL_ORDER2[_i2];
    bot.bmCache.saveBoolean(CACHE_PREFIX + 'skill.' + s, enabledSet.has(s));
  }
  bot.bmCache.saveBoolean(HERB_PREFIX + 'progressive', settings.progressive);
  bot.bmCache.saveBoolean(HERB_PREFIX + 'chemistry', settings.chemistry);
  bot.bmCache.saveInt(HERB_PREFIX + 'target', settings.targetLevel);
  bot.bmCache.saveString(CACHE_PREFIX + 'playStyle', (_settings$playStyle = settings.playStyle) !== null && _settings$playStyle !== void 0 ? _settings$playStyle : 'normal');
  bot.bmCache.saveBoolean(CACHE_PREFIX + 'randomAfk', (_settings$randomAfk = settings.randomAfk) !== null && _settings$randomAfk !== void 0 ? _settings$randomAfk : true);
  var _iterator5 = _createForOfIteratorHelper(HERBS),
    _step5;
  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
      var _settings$herbs$herb$;
      var herb = _step5.value;
      var sel = (_settings$herbs$herb$ = settings.herbs[herb.key]) !== null && _settings$herbs$herb$ !== void 0 ? _settings$herbs$herb$ : {
        clean: false,
        unfinished: false,
        potion: ''
      };
      bot.bmCache.saveBoolean(HERB_PREFIX + herb.key + '.clean', sel.clean);
      bot.bmCache.saveBoolean(HERB_PREFIX + herb.key + '.unfinished', sel.unfinished);
      bot.bmCache.saveString(HERB_PREFIX + herb.key + '.potion', sel.potion);
    }
  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }
  var selectedFletch = new Set((_settings$fletching = settings.fletching) !== null && _settings$fletching !== void 0 ? _settings$fletching : []);
  var _iterator6 = _createForOfIteratorHelper(FLETCHING),
    _step6;
  try {
    for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
      var job = _step6.value;
      bot.bmCache.saveBoolean(FLETCH_PREFIX + job.key, selectedFletch.has(job.key));
    }
  } catch (err) {
    _iterator6.e(err);
  } finally {
    _iterator6.f();
  }
  var selectedCraft = new Set((_settings$crafting = settings.crafting) !== null && _settings$crafting !== void 0 ? _settings$crafting : []);
  var _iterator7 = _createForOfIteratorHelper(CRAFTING),
    _step7;
  try {
    for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
      var _job2 = _step7.value;
      bot.bmCache.saveBoolean(CRAFT_PREFIX + _job2.key, selectedCraft.has(_job2.key));
    }
  } catch (err) {
    _iterator7.e(err);
  } finally {
    _iterator7.f();
  }
  var selectedFarm = new Set((_settings$farming = settings.farming) !== null && _settings$farming !== void 0 ? _settings$farming : []);
  var _iterator8 = _createForOfIteratorHelper(SEEDLINGS),
    _step8;
  try {
    for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
      var recipe = _step8.value;
      bot.bmCache.saveBoolean(FARM_PREFIX + recipe.key, selectedFarm.has(recipe.key));
    }
  } catch (err) {
    _iterator8.e(err);
  } finally {
    _iterator8.f();
  }
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
  var _initial$skill, _initial$skill2, _initial$randomAfk, _initial$fletching, _initial$crafting, _initial$farming;
  submitted = null;
  cancelled = false;
  var initial = loadSettings();
  var background = new java.awt.Color(0x130e20);
  var surface = new java.awt.Color(0x211738);
  var borderLine = new java.awt.Color(0x3e2d60);
  var foreground = new java.awt.Color(0xf5eefc);
  var muted = new java.awt.Color(0xa594c6);
  var accent = new java.awt.Color(0xc084fc);
  var buttonBg = new java.awt.Color(0x8b5cf6);
  var buttonFg = new java.awt.Color(0xffffff);
  var panel = function panel(layout) {
    var bg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : background;
    var p = new javax.swing.JPanel(layout);
    p.setBackground(bg);
    return p;
  };
  var label = function label(text) {
    var bold = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : foreground;
    var l = new javax.swing.JLabel(text);
    l.setForeground(color);
    if (bold) {
      l.setFont(new java.awt.Font('Dialog', java.awt.Font.BOLD, 14));
    }
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
    var cb = new javax.swing.JCheckBox(text, selected);
    cb.setBackground(bg);
    cb.setForeground(foreground);
    cb.setFocusPainted(false);
    return cb;
  };
  var button = function button(text) {
    var isAccent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var btn = new javax.swing.JButton(text);
    btn.setBackground(isAccent ? buttonBg : surface);
    btn.setForeground(isAccent ? buttonFg : foreground);
    btn.setFocusPainted(false);
    btn.setBorder(javax.swing.BorderFactory.createCompoundBorder(javax.swing.BorderFactory.createLineBorder(isAccent ? accent : borderLine, 1), javax.swing.BorderFactory.createEmptyBorder(5, 12, 5, 12)));
    return btn;
  };
  var section = (title, body) => {
    var result = panel(new java.awt.BorderLayout(8, 8));
    result.setBorder(createSectionBorder(title));
    result.add(body, java.awt.BorderLayout.CENTER);
    return result;
  };
  frame = new javax.swing.JFrame('Bank Stander - Multi-Skill (Herblore, Crafting, Fletching & Farming) | by xulixna');
  var mainPanel = panel(new java.awt.BorderLayout(12, 12));
  mainPanel.setBorder(javax.swing.BorderFactory.createEmptyBorder(14, 14, 14, 14));
  var headerPanel = panel(new java.awt.GridLayout(2, 1, 2, 2));
  var titleLabel = label('Bank Stander', true);
  titleLabel.setForeground(accent);
  titleLabel.setFont(new java.awt.Font('Dialog', java.awt.Font.BOLD, 22));
  titleLabel.setHorizontalAlignment(0);
  var subtitleLabel = label('Multi-Skill Automation (Herblore • Crafting • Fletching • Farming) • by xulixna', false);
  subtitleLabel.setForeground(muted);
  subtitleLabel.setFont(new java.awt.Font('Dialog', java.awt.Font.PLAIN, 12));
  subtitleLabel.setHorizontalAlignment(0);
  headerPanel.add(titleLabel);
  headerPanel.add(subtitleLabel);
  mainPanel.add(headerPanel, java.awt.BorderLayout.NORTH);
  var initialEnabled = new Set(initial.skills && initial.skills.length > 0 ? initial.skills : [(_initial$skill = initial.skill) !== null && _initial$skill !== void 0 ? _initial$skill : 'Herblore']);
  var sidebarArea = panel(new java.awt.BorderLayout(0, 10));
  sidebarArea.setPreferredSize(new java.awt.Dimension(200, 0));
  var skillBox = panel(new java.awt.GridLayout(0, 1, 0, 8), surface);
  skillBox.setBorder(createSectionBorder('Queue & Skills'));
  var herbCb = checkbox('', initialEnabled.has('Herblore'), surface);
  herbCb.setToolTipText('Include Herblore in the execution queue');
  var herbButton = new javax.swing.JButton('1. Herblore');
  herbButton.setFont(new java.awt.Font('Dialog', java.awt.Font.BOLD, 12));
  herbButton.setFocusPainted(false);
  herbButton.setHorizontalAlignment(2);
  var herbRow = panel(new java.awt.BorderLayout(4, 0), surface);
  herbRow.add(herbCb, java.awt.BorderLayout.WEST);
  herbRow.add(herbButton, java.awt.BorderLayout.CENTER);
  var craftCb = checkbox('', initialEnabled.has('Crafting'), surface);
  craftCb.setToolTipText('Include Crafting in the execution queue');
  var craftButton = new javax.swing.JButton('2. Crafting');
  craftButton.setFont(new java.awt.Font('Dialog', java.awt.Font.BOLD, 12));
  craftButton.setFocusPainted(false);
  craftButton.setHorizontalAlignment(2);
  var craftRow = panel(new java.awt.BorderLayout(4, 0), surface);
  craftRow.add(craftCb, java.awt.BorderLayout.WEST);
  craftRow.add(craftButton, java.awt.BorderLayout.CENTER);
  var fletchCb = checkbox('', initialEnabled.has('Fletching'), surface);
  fletchCb.setToolTipText('Include Fletching in the execution queue');
  var fletchButton = new javax.swing.JButton('3. Fletching');
  fletchButton.setFont(new java.awt.Font('Dialog', java.awt.Font.BOLD, 12));
  fletchButton.setFocusPainted(false);
  fletchButton.setHorizontalAlignment(2);
  var fletchRow = panel(new java.awt.BorderLayout(4, 0), surface);
  fletchRow.add(fletchCb, java.awt.BorderLayout.WEST);
  fletchRow.add(fletchButton, java.awt.BorderLayout.CENTER);
  var farmCb = checkbox('', initialEnabled.has('Farming'), surface);
  farmCb.setToolTipText('Include Farming in the execution queue');
  var farmButton = new javax.swing.JButton('4. Farming');
  farmButton.setFont(new java.awt.Font('Dialog', java.awt.Font.BOLD, 12));
  farmButton.setFocusPainted(false);
  farmButton.setHorizontalAlignment(2);
  var farmRow = panel(new java.awt.BorderLayout(4, 0), surface);
  farmRow.add(farmCb, java.awt.BorderLayout.WEST);
  farmRow.add(farmButton, java.awt.BorderLayout.CENTER);
  skillBox.add(herbRow);
  skillBox.add(craftRow);
  skillBox.add(fletchRow);
  skillBox.add(farmRow);
  sidebarArea.add(skillBox, java.awt.BorderLayout.NORTH);
  var infoBox = panel(new java.awt.GridLayout(0, 1, 0, 4), surface);
  infoBox.setBorder(createSectionBorder('Execution Queue'));
  var info1 = label('Runs checked skills in order:', false);
  info1.setForeground(muted);
  info1.setFont(new java.awt.Font('Dialog', java.awt.Font.BOLD, 11));
  var info2 = label('1. Herblore (Potions)', false);
  info2.setForeground(accent);
  info2.setFont(new java.awt.Font('Dialog', java.awt.Font.PLAIN, 11));
  var info3 = label('2. Crafting (Gem cutting)', false);
  info3.setForeground(accent);
  info3.setFont(new java.awt.Font('Dialog', java.awt.Font.PLAIN, 11));
  var info4 = label('3. Fletching (Bows & darts)', false);
  info4.setForeground(accent);
  info4.setFont(new java.awt.Font('Dialog', java.awt.Font.PLAIN, 11));
  var infoFarm = label('4. Farming (Seedlings)', false);
  infoFarm.setForeground(accent);
  infoFarm.setFont(new java.awt.Font('Dialog', java.awt.Font.PLAIN, 11));
  var info5 = label('Auto-deposits & advances', false);
  info5.setForeground(muted);
  info5.setFont(new java.awt.Font('Dialog', java.awt.Font.ITALIC, 11));
  var info6 = label('when bank supplies end.', false);
  info6.setForeground(muted);
  info6.setFont(new java.awt.Font('Dialog', java.awt.Font.ITALIC, 11));
  infoBox.add(info1);
  infoBox.add(info2);
  infoBox.add(info3);
  infoBox.add(info4);
  infoBox.add(infoFarm);
  infoBox.add(info5);
  infoBox.add(info6);
  sidebarArea.add(infoBox, java.awt.BorderLayout.CENTER);
  mainPanel.add(sidebarArea, java.awt.BorderLayout.WEST);
  var centerArea = panel(new java.awt.BorderLayout(8, 10));
  var heading = label('Herblore', true);
  heading.setForeground(accent);
  heading.setFont(new java.awt.Font('Dialog', java.awt.Font.BOLD, 18));
  centerArea.add(heading, java.awt.BorderLayout.NORTH);
  var pages = panel(new java.awt.BorderLayout());
  centerArea.add(pages, java.awt.BorderLayout.CENTER);
  mainPanel.add(centerArea, java.awt.BorderLayout.CENTER);
  var activeViewSkill = (_initial$skill2 = initial.skill) !== null && _initial$skill2 !== void 0 ? _initial$skill2 : 'Herblore';
  var progressive = checkbox('Progressive: highest available selected recipe', initial.progressive, surface);
  var chemistry = checkbox('Use Amulets of Chemistry (Herblore)', initial.chemistry, surface);
  chemistry.setToolTipText("Regular Amulet of chemistry only. Not Alchemist's amulet.");
  var target = new javax.swing.JTextField(String(initial.targetLevel || 0), 4);
  target.setBackground(surface);
  target.setForeground(foreground);
  target.setCaretColor(accent);
  target.setBorder(javax.swing.BorderFactory.createCompoundBorder(javax.swing.BorderFactory.createLineBorder(borderLine, 1), javax.swing.BorderFactory.createEmptyBorder(4, 6, 4, 6)));
  var optionsPanel = panel(new java.awt.FlowLayout(java.awt.FlowLayout.LEFT, 16, 6), surface);
  optionsPanel.setBorder(createSectionBorder('Execution Options'));
  optionsPanel.add(progressive);
  optionsPanel.add(chemistry);
  var targetSubPanel = panel(new java.awt.FlowLayout(java.awt.FlowLayout.LEFT, 6, 0), surface);
  var targetLabel = label('Stop at level:');
  var targetHint = label('(0 = no target / until bank is empty)');
  targetHint.setForeground(muted);
  targetSubPanel.add(targetLabel);
  targetSubPanel.add(target);
  targetSubPanel.add(targetHint);
  optionsPanel.add(targetSubPanel);
  var styleSubPanel = panel(new java.awt.FlowLayout(java.awt.FlowLayout.LEFT, 6, 0), surface);
  var styleCombo = new javax.swing.JComboBox(['Normal (active: 1-3s reactions)', 'Lazy / AFK (relaxed: up to ~10s)']);
  styleCombo.setSelectedIndex(initial.playStyle === 'lazy' ? 1 : 0);
  styleCombo.setBackground(surface);
  styleCombo.setForeground(foreground);
  styleSubPanel.add(label('Play style:'));
  styleSubPanel.add(styleCombo);
  optionsPanel.add(styleSubPanel);
  var afk = checkbox('Random short AFKs while making', (_initial$randomAfk = initial.randomAfk) !== null && _initial$randomAfk !== void 0 ? _initial$randomAfk : true, surface);
  optionsPanel.add(afk);
  var herbPage = panel(new java.awt.BorderLayout(0, 8));
  var herbTop = panel(new java.awt.BorderLayout(0, 4));
  var herbHint = label('Select the stages to run. Enable multiple stages to process your supplies from start to finish.', false);
  herbHint.setForeground(muted);
  herbTop.add(herbHint, java.awt.BorderLayout.CENTER);
  herbPage.add(herbTop, java.awt.BorderLayout.NORTH);
  var herbTabs = new javax.swing.JTabbedPane();
  herbTabs.setBackground(surface);
  herbTabs.setForeground(foreground);
  herbPage.add(herbTabs, java.awt.BorderLayout.CENTER);
  var cleanGrid = panel(new java.awt.GridLayout(0, 3, 10, 8));
  var unfGrid = panel(new java.awt.GridLayout(0, 3, 10, 8));
  var finishedGrid = panel(new java.awt.GridLayout(0, 2, 12, 8));
  var rows = HERBS.map(herb => {
    var _cached$clean, _cached$unfinished, _cached$potion;
    var cached = initial.herbs[herb.key];
    var clean = checkbox(herb.name + '  -  Lv. ' + herb.cleanLevel, (_cached$clean = cached === null || cached === void 0 ? void 0 : cached.clean) !== null && _cached$clean !== void 0 ? _cached$clean : false);
    var unfinished = checkbox(herb.name + '  -  Lv. ' + herb.unfLevel, (_cached$unfinished = cached === null || cached === void 0 ? void 0 : cached.unfinished) !== null && _cached$unfinished !== void 0 ? _cached$unfinished : false);
    var recipes = POTIONS.filter(entry => entry.herb === herb.key);
    var potion = new javax.swing.JComboBox(['None', 'Best available (highest you can make)'].concat(recipes.map(entry => entry.name + ' (Lv. ' + entry.level + ')')));
    potion.setBackground(surface);
    potion.setForeground(foreground);
    var savedPotion = (_cached$potion = cached === null || cached === void 0 ? void 0 : cached.potion) !== null && _cached$potion !== void 0 ? _cached$potion : '';
    var matchedIndex = recipes.findIndex(entry => entry.name === savedPotion);
    potion.setSelectedIndex(savedPotion === BEST_POTION ? 1 : matchedIndex >= 0 ? matchedIndex + 2 : 0);
    var recipePanel = panel(new java.awt.BorderLayout(4, 4), surface);
    recipePanel.setBorder(javax.swing.BorderFactory.createCompoundBorder(javax.swing.BorderFactory.createLineBorder(borderLine, 1), javax.swing.BorderFactory.createEmptyBorder(6, 8, 6, 8)));
    var herbTitle = label(herb.name, true);
    herbTitle.setForeground(accent);
    recipePanel.add(herbTitle, java.awt.BorderLayout.NORTH);
    recipePanel.add(potion, java.awt.BorderLayout.CENTER);
    cleanGrid.add(clean);
    unfGrid.add(unfinished);
    finishedGrid.add(recipePanel);
    return {
      herb,
      clean,
      unfinished,
      recipes,
      potion
    };
  });
  var checklistPage = (title, hint, grid, selectAll, clear) => {
    var page = panel(new java.awt.BorderLayout(0, 8));
    page.setBorder(javax.swing.BorderFactory.createEmptyBorder(8, 8, 8, 8));
    var top = panel(new java.awt.BorderLayout(8, 8));
    var hintLabel = label(hint, false);
    hintLabel.setForeground(muted);
    hintLabel.setFont(new java.awt.Font('Dialog', java.awt.Font.PLAIN, 12));
    top.add(hintLabel, java.awt.BorderLayout.CENTER);
    var controls = panel(new java.awt.FlowLayout(java.awt.FlowLayout.RIGHT, 6, 0));
    var all = button('Select all');
    all.addActionListener(selectAll);
    var none = button('Clear');
    none.addActionListener(clear);
    controls.add(all);
    controls.add(none);
    top.add(controls, java.awt.BorderLayout.EAST);
    page.add(top, java.awt.BorderLayout.NORTH);
    var holder = panel(new java.awt.BorderLayout());
    holder.add(section(title, grid), java.awt.BorderLayout.NORTH);
    var scroll = new javax.swing.JScrollPane(holder);
    scroll.setBorder(javax.swing.BorderFactory.createLineBorder(borderLine, 1));
    scroll.getViewport().setBackground(background);
    scroll.getVerticalScrollBar().setUnitIncrement(16);
    page.add(scroll, java.awt.BorderLayout.CENTER);
    return page;
  };
  herbTabs.addTab('Clean herbs', checklistPage('Herbs to clean', 'Withdraws up to 28 grimy herbs per batch.', cleanGrid, () => {
    var _iterator = _createForOfIteratorHelper(rows),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var row = _step.value;
        row.clean.setSelected(true);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }, () => {
    var _iterator2 = _createForOfIteratorHelper(rows),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var row = _step2.value;
        row.clean.setSelected(false);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }));
  herbTabs.addTab('Unfinished potions', checklistPage('Unfinished potions', 'Clean herbs + vials of water. Enable Clean herbs as well to use grimy stock.', unfGrid, () => {
    var _iterator3 = _createForOfIteratorHelper(rows),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var row = _step3.value;
        row.unfinished.setSelected(true);
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
  }, () => {
    var _iterator4 = _createForOfIteratorHelper(rows),
      _step4;
    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var row = _step4.value;
        row.unfinished.setSelected(false);
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
  }));
  var finishedPage = panel(new java.awt.BorderLayout(0, 8));
  finishedPage.setBorder(javax.swing.BorderFactory.createEmptyBorder(8, 8, 8, 8));
  var finishedTop = panel(new java.awt.BorderLayout(8, 8));
  var finishHint = label('Choose one potion per herb, or None. Uses unfinished potions + prepared secondary ingredients.', false);
  finishHint.setForeground(muted);
  finishHint.setFont(new java.awt.Font('Dialog', java.awt.Font.PLAIN, 12));
  finishedTop.add(finishHint, java.awt.BorderLayout.CENTER);
  var clearPotions = button('Clear finished potions');
  clearPotions.addActionListener(() => {
    var _iterator5 = _createForOfIteratorHelper(rows),
      _step5;
    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var row = _step5.value;
        row.potion.setSelectedIndex(0);
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }
  });
  var bestPotions = button('All best available');
  bestPotions.addActionListener(() => {
    var _iterator6 = _createForOfIteratorHelper(rows),
      _step6;
    try {
      for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
        var row = _step6.value;
        row.potion.setSelectedIndex(1);
      }
    } catch (err) {
      _iterator6.e(err);
    } finally {
      _iterator6.f();
    }
  });
  var potionButtons = panel(new java.awt.FlowLayout(java.awt.FlowLayout.RIGHT, 6, 0));
  potionButtons.add(bestPotions);
  potionButtons.add(clearPotions);
  finishedTop.add(potionButtons, java.awt.BorderLayout.EAST);
  finishedPage.add(finishedTop, java.awt.BorderLayout.NORTH);
  var finishedHolder = panel(new java.awt.BorderLayout());
  finishedHolder.add(section('Finished potions', finishedGrid), java.awt.BorderLayout.NORTH);
  var finishScroll = new javax.swing.JScrollPane(finishedHolder);
  finishScroll.setBorder(javax.swing.BorderFactory.createLineBorder(borderLine, 1));
  finishScroll.getViewport().setBackground(background);
  finishScroll.getVerticalScrollBar().setUnitIncrement(16);
  finishedPage.add(finishScroll, java.awt.BorderLayout.CENTER);
  herbTabs.addTab('Finished potions', finishedPage);
  var fletchPage = panel(new java.awt.BorderLayout(0, 8));
  var fletchTop = panel(new java.awt.BorderLayout(0, 4));
  var fletchHint = label('Select recipes in any category. All selected categories run together.', false);
  fletchHint.setForeground(muted);
  fletchTop.add(fletchHint, java.awt.BorderLayout.CENTER);
  fletchPage.add(fletchTop, java.awt.BorderLayout.NORTH);
  var fletchTabs = new javax.swing.JTabbedPane();
  fletchTabs.setBackground(surface);
  fletchTabs.setForeground(foreground);
  fletchPage.add(fletchTabs, java.awt.BorderLayout.CENTER);
  var initialFletch = new Set((_initial$fletching = initial.fletching) !== null && _initial$fletching !== void 0 ? _initial$fletching : []);
  var fletchRows = FLETCHING.map(job => ({
    job,
    checkbox: checkbox(job.label + '  -  Lv. ' + job.level, initialFletch.has(job.key))
  }));
  var categories = [{
    kind: 'cut',
    title: 'Cut bows / shafts',
    hint: 'Knife (946) + logs. Select String bows too if you want to finish your bows.'
  }, {
    kind: 'string',
    title: 'String bows',
    hint: 'Up to 14 unstrung bows + 14 bow strings per batch.'
  }, {
    kind: 'darts',
    title: 'Darts',
    hint: 'Dart tips + feathers. Uses prepared tips from your bank.'
  }, {
    kind: 'bolts',
    title: 'Bolts',
    hint: 'Unfinished bolts + feathers. Broad bolts require Broader Fletching.'
  }, {
    kind: 'arrows',
    title: 'Arrows',
    hint: 'Headless: shafts + feathers. Arrows: headless + tips. Broad requires Broader Fletching.'
  }];
  var _loop = function _loop() {
    var category = _categories[_i];
    var group = fletchRows.filter(row => row.job.kind === category.kind);
    var grid = panel(new java.awt.GridLayout(0, 2, 8, 8));
    var _iterator7 = _createForOfIteratorHelper(group),
      _step7;
    try {
      for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
        var row = _step7.value;
        grid.add(row.checkbox);
      }
    } catch (err) {
      _iterator7.e(err);
    } finally {
      _iterator7.f();
    }
    fletchTabs.addTab(category.title, checklistPage(category.title, category.hint, grid, () => {
      var _iterator8 = _createForOfIteratorHelper(group),
        _step8;
      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          var row = _step8.value;
          row.checkbox.setSelected(true);
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }
    }, () => {
      var _iterator9 = _createForOfIteratorHelper(group),
        _step9;
      try {
        for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
          var row = _step9.value;
          row.checkbox.setSelected(false);
        }
      } catch (err) {
        _iterator9.e(err);
      } finally {
        _iterator9.f();
      }
    }));
  };
  for (var _i = 0, _categories = categories; _i < _categories.length; _i++) {
    _loop();
  }
  var initialCraft = new Set((_initial$crafting = initial.crafting) !== null && _initial$crafting !== void 0 ? _initial$crafting : []);
  var craftRows = CRAFTING.map(job => ({
    job,
    checkbox: checkbox(job.label + '  -  Lv. ' + job.level, initialCraft.has(job.key))
  }));
  var craftGrid = panel(new java.awt.GridLayout(0, 2, 8, 8));
  var _iterator0 = _createForOfIteratorHelper(craftRows),
    _step0;
  try {
    for (_iterator0.s(); !(_step0 = _iterator0.n()).done;) {
      var row = _step0.value;
      craftGrid.add(row.checkbox);
    }
  } catch (err) {
    _iterator0.e(err);
  } finally {
    _iterator0.f();
  }
  var craftPage = checklistPage('Gem Cutting (Chisel + 27 Uncut)', 'Withdraws 1 Chisel (1755) + 27 uncut gems per batch.', craftGrid, () => {
    var _iterator1 = _createForOfIteratorHelper(craftRows),
      _step1;
    try {
      for (_iterator1.s(); !(_step1 = _iterator1.n()).done;) {
        var row = _step1.value;
        row.checkbox.setSelected(true);
      }
    } catch (err) {
      _iterator1.e(err);
    } finally {
      _iterator1.f();
    }
  }, () => {
    var _iterator10 = _createForOfIteratorHelper(craftRows),
      _step10;
    try {
      for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
        var row = _step10.value;
        row.checkbox.setSelected(false);
      }
    } catch (err) {
      _iterator10.e(err);
    } finally {
      _iterator10.f();
    }
  });
  var initialFarm = new Set((_initial$farming = initial.farming) !== null && _initial$farming !== void 0 ? _initial$farming : []);
  var farmRows = SEEDLINGS.map(recipe => ({
    recipe,
    checkbox: checkbox(recipe.label + ' seedling  -  Lv. ' + recipe.level, initialFarm.has(recipe.key))
  }));
  var farmGrid = panel(new java.awt.GridLayout(0, 2, 8, 8));
  var _iterator11 = _createForOfIteratorHelper(farmRows),
    _step11;
  try {
    for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
      var _row = _step11.value;
      farmGrid.add(_row.checkbox);
    }
  } catch (err) {
    _iterator11.e(err);
  } finally {
    _iterator11.f();
  }
  var farmPage = checklistPage('Seedlings (plant, then water)', 'Requires a Gardening trowel, filled plant pots and charged watering cans. Plants all selected seeds before watering.', farmGrid, () => {
    var _iterator12 = _createForOfIteratorHelper(farmRows),
      _step12;
    try {
      for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
        var row = _step12.value;
        row.checkbox.setSelected(true);
      }
    } catch (err) {
      _iterator12.e(err);
    } finally {
      _iterator12.f();
    }
  }, () => {
    var _iterator13 = _createForOfIteratorHelper(farmRows),
      _step13;
    try {
      for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
        var row = _step13.value;
        row.checkbox.setSelected(false);
      }
    } catch (err) {
      _iterator13.e(err);
    } finally {
      _iterator13.f();
    }
  });
  var footer = panel(new java.awt.BorderLayout(0, 10));
  footer.add(optionsPanel, java.awt.BorderLayout.NORTH);
  var buttonPanel = panel(new java.awt.BorderLayout(4, 4));
  var startButton = new javax.swing.JButton('Start Bank Stander');
  startButton.setBackground(buttonBg);
  startButton.setForeground(buttonFg);
  startButton.setFont(new java.awt.Font('Dialog', java.awt.Font.BOLD, 14));
  startButton.setFocusPainted(false);
  startButton.setPreferredSize(new java.awt.Dimension(0, 42));
  startButton.setBorder(javax.swing.BorderFactory.createLineBorder(accent, 1));
  buttonPanel.add(startButton, java.awt.BorderLayout.CENTER);
  var footerLabel = label('Created by xulixna • Discord', false);
  footerLabel.setForeground(muted);
  footerLabel.setFont(new java.awt.Font('Dialog', java.awt.Font.PLAIN, 11));
  footerLabel.setHorizontalAlignment(0);
  buttonPanel.add(footerLabel, java.awt.BorderLayout.SOUTH);
  footer.add(buttonPanel, java.awt.BorderLayout.SOUTH);
  mainPanel.add(footer, java.awt.BorderLayout.SOUTH);
  var getChosenSkills = () => {
    var result = [];
    if (herbCb.isSelected()) result.push('Herblore');
    if (craftCb.isSelected()) result.push('Crafting');
    if (fletchCb.isSelected()) result.push('Fletching');
    if (farmCb.isSelected()) result.push('Farming');
    return result;
  };
  var updateStartButtonText = () => {
    var chosen = getChosenSkills();
    if (chosen.length === 0) {
      startButton.setText('Select at least one skill in queue');
    } else if (chosen.length === 1) {
      startButton.setText('Start ' + chosen[0]);
    } else {
      startButton.setText("Start Multi-Skill (".concat(chosen.join(' ➔ '), ")"));
    }
  };
  herbCb.addActionListener(() => updateStartButtonText());
  craftCb.addActionListener(() => updateStartButtonText());
  fletchCb.addActionListener(() => updateStartButtonText());
  farmCb.addActionListener(() => updateStartButtonText());
  var updateSkillNavButtons = () => {
    var isHerb = activeViewSkill === 'Herblore';
    var isCraft = activeViewSkill === 'Crafting';
    var isFletch = activeViewSkill === 'Fletching';
    var isFarm = activeViewSkill === 'Farming';
    var setStyle = (btn, active) => {
      btn.setBackground(active ? buttonBg : surface);
      btn.setForeground(active ? buttonFg : muted);
      btn.setBorder(javax.swing.BorderFactory.createCompoundBorder(javax.swing.BorderFactory.createLineBorder(active ? accent : borderLine, 1), javax.swing.BorderFactory.createEmptyBorder(6, 10, 6, 10)));
    };
    setStyle(herbButton, isHerb);
    setStyle(craftButton, isCraft);
    setStyle(fletchButton, isFletch);
    setStyle(farmButton, isFarm);
  };
  var selectSkill = skill => {
    activeViewSkill = skill;
    pages.removeAll();
    pages.add(skill === 'Herblore' ? herbPage : skill === 'Crafting' ? craftPage : skill === 'Fletching' ? fletchPage : farmPage, java.awt.BorderLayout.CENTER);
    pages.revalidate();
    pages.repaint();
    heading.setText(skill + ' Configuration');
    updateSkillNavButtons();
  };
  herbButton.addActionListener(() => selectSkill('Herblore'));
  craftButton.addActionListener(() => selectSkill('Crafting'));
  fletchButton.addActionListener(() => selectSkill('Fletching'));
  farmButton.addActionListener(() => selectSkill('Farming'));
  selectSkill(activeViewSkill);
  updateStartButtonText();
  startButton.addActionListener(() => {
    var chosenSkills = getChosenSkills();
    if (chosenSkills.length === 0) {
      javax.swing.JOptionPane.showMessageDialog(frame, 'Please check at least one skill in the Queue & Skills panel.');
      return;
    }
    var targetLevel = Number(String(target.getText()).trim());
    if (!Number.isFinite(targetLevel) || Math.floor(targetLevel) !== targetLevel || targetLevel < 0 || targetLevel > 99) {
      javax.swing.JOptionPane.showMessageDialog(frame, 'Target must be an integer from 0 to 99.');
      return;
    }
    if (chosenSkills.includes('Herblore')) {
      var anyHerb = rows.some(r => r.clean.isSelected() || r.unfinished.isSelected() || r.potion.getSelectedIndex() > 0);
      if (!anyHerb) {
        javax.swing.JOptionPane.showMessageDialog(frame, 'Herblore is enabled in the queue, but no Herblore recipes are selected.');
        selectSkill('Herblore');
        return;
      }
    }
    if (chosenSkills.includes('Crafting')) {
      var anyCraft = craftRows.some(r => r.checkbox.isSelected());
      if (!anyCraft) {
        javax.swing.JOptionPane.showMessageDialog(frame, 'Crafting is enabled in the queue, but no gems are selected.');
        selectSkill('Crafting');
        return;
      }
    }
    if (chosenSkills.includes('Fletching')) {
      var anyFletch = fletchRows.some(r => r.checkbox.isSelected());
      if (!anyFletch) {
        javax.swing.JOptionPane.showMessageDialog(frame, 'Fletching is enabled in the queue, but no Fletching recipes are selected.');
        selectSkill('Fletching');
        return;
      }
    }
    if (chosenSkills.includes('Farming')) {
      var anyFarm = farmRows.some(r => r.checkbox.isSelected());
      if (!anyFarm) {
        javax.swing.JOptionPane.showMessageDialog(frame, 'Farming is enabled in the queue, but no seedlings are selected.');
        selectSkill('Farming');
        return;
      }
    }
    var settings = {
      skill: chosenSkills[0],
      skills: chosenSkills,
      fletching: fletchRows.filter(row => row.checkbox.isSelected()).map(row => row.job.key),
      crafting: craftRows.filter(row => row.checkbox.isSelected()).map(row => row.job.key),
      farming: farmRows.filter(row => row.checkbox.isSelected()).map(row => row.recipe.key),
      progressive: progressive.isSelected(),
      chemistry: chemistry.isSelected(),
      targetLevel,
      herbs: {},
      playStyle: styleCombo.getSelectedIndex() === 1 ? 'lazy' : 'normal',
      randomAfk: afk.isSelected()
    };
    var _iterator14 = _createForOfIteratorHelper(rows),
      _step14;
    try {
      for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
        var _row$recipes$name, _row$recipes;
        var row = _step14.value;
        var selection = {
          clean: row.clean.isSelected(),
          unfinished: row.unfinished.isSelected(),
          potion: row.potion.getSelectedIndex() === 1 ? BEST_POTION : (_row$recipes$name = (_row$recipes = row.recipes[row.potion.getSelectedIndex() - 2]) === null || _row$recipes === void 0 ? void 0 : _row$recipes.name) !== null && _row$recipes$name !== void 0 ? _row$recipes$name : ''
        };
        settings.herbs[row.herb.key] = selection;
      }
    } catch (err) {
      _iterator14.e(err);
    } finally {
      _iterator14.f();
    }
    saveSettings(settings);
    closeWindow();
    submitted = settings;
  });
  frame.add(mainPanel);
  frame.setSize(1180, 760);
  frame.setLocationRelativeTo(null);
  frame.setDefaultCloseOperation(javax.swing.WindowConstants.DO_NOTHING_ON_CLOSE);
  frame.addWindowListener(new java.awt.event.WindowAdapter({
    windowClosing: () => {
      cancelled = true;
      closeWindow();
    }
  }));
  frame.setVisible(true);
};

var runner = null;
function onStart() {
  runner = null;
  showWindow();
}
function onGameTick() {
  try {
    if (configCancelled()) {
      bot.terminate();
      return;
    }
    if (!runner) {
      var _settings$skill;
      var settings = selectedSettings();
      if (!settings) return;
      runner = new HerbloreRunner(game, settings);
      var enabledSkills = settings.skills && settings.skills.length > 0 ? settings.skills : [(_settings$skill = settings.skill) !== null && _settings$skill !== void 0 ? _settings$skill : 'Herblore'];
      var _iterator = _createForOfIteratorHelper(enabledSkills),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var skill = _step.value;
          var counters = skill === 'Fletching' ? ['cut', 'string', 'darts', 'bolts', 'arrows'] : skill === 'Crafting' ? ['gems'] : skill === 'Farming' ? ['plant', 'water'] : ['clean', 'unfinished', 'finished'];
          for (var _i = 0, _counters = counters; _i < _counters.length; _i++) {
            var name = _counters[_i];
            game.counter(skill + ' ' + name, 0);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      game.log('Bank Stander started: ' + enabledSkills.join(' -> ') + '.');
    }
    runner.tick();
  } catch (error) {
    game.log('Stopped after error: ' + String(error));
    bot.terminate();
  }
}
function onEnd() {
  closeWindow();
  game.log('Bank Stander stopped.');
}
