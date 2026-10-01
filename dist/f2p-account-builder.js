function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
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
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = true,
      o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ; else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = true, n = r;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
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

var ALL_CATEGORIES = ['Combat', 'Ranged', 'Magic', 'Prayer', 'Cooking', 'Crafting', 'Firemaking', 'Fishing', 'Mining', 'Runecrafting', 'Smithing', 'Woodcutting', 'Quests', 'Moneymaking'];
var F2P_QUESTS = [{
  name: "Cook's Assistant",
  points: 1,
  difficulty: 'Novice'
}, {
  name: 'Sheep Shearer',
  points: 1,
  difficulty: 'Novice'
}, {
  name: 'The Restless Ghost',
  points: 1,
  difficulty: 'Novice'
}, {
  name: 'Romeo & Juliet',
  points: 5,
  difficulty: 'Novice'
}, {
  name: 'Ernest the Chicken',
  points: 4,
  difficulty: 'Novice'
}, {
  name: 'Rune Mysteries',
  points: 1,
  difficulty: 'Novice'
}, {
  name: "Witch's Potion",
  points: 1,
  difficulty: 'Novice'
}, {
  name: 'Imp Catcher',
  points: 1,
  difficulty: 'Novice'
}, {
  name: 'Goblin Diplomacy',
  points: 5,
  difficulty: 'Novice'
}, {
  name: "Doric's Quest",
  points: 1,
  difficulty: 'Novice'
}, {
  name: "Pirate's Treasure",
  points: 2,
  difficulty: 'Novice'
}, {
  name: 'Black Knights Fortress',
  points: 3,
  difficulty: 'Novice'
}, {
  name: 'Vampire Slayer',
  points: 3,
  difficulty: 'Intermediate'
}, {
  name: 'Prince Ali Rescue',
  points: 3,
  difficulty: 'Intermediate'
}, {
  name: 'Demon Slayer',
  points: 3,
  difficulty: 'Intermediate'
}, {
  name: "The Knight's Sword",
  points: 1,
  difficulty: 'Intermediate'
}, {
  name: 'Shield of Arrav',
  points: 1,
  difficulty: 'Novice'
}, {
  name: 'Below Ice Mountain',
  points: 1,
  difficulty: 'Intermediate'
}, {
  name: 'X Marks the Spot',
  points: 1,
  difficulty: 'Novice'
}, {
  name: 'Misthalin Mystery',
  points: 1,
  difficulty: 'Novice'
}, {
  name: 'The Corsair Curse',
  points: 2,
  difficulty: 'Intermediate'
}, {
  name: 'Dragon Slayer I',
  points: 2,
  difficulty: 'Experienced'
}];

var CACHE_PREFIX = 'f2pAccountBuilder.';
var defaultSettings = {
  enabledCategories: ['Combat', 'Cooking', 'Woodcutting', 'Fishing', 'Quests'],
  general: {
    playStyle: 'normal',
    targetTotalLevel: 0,
    takeBreaks: true,
    cameraMovement: true,
    noobMode: true,
    strictLevelGoals: false
  },
  combat: {
    targetAttack: 40,
    targetStrength: 40,
    targetDefence: 40,
    combatOrder: 'balanced',
    monster: 'Chickens (Lumbridge)',
    food: 'Trout',
    eatAtHp: 50,
    lootBones: false,
    lootCoins: true,
    lootRunes: true,
    buryBones: false
  },
  ranged: {
    targetLevel: 40,
    trainDefence: false,
    monster: 'Cows (Lumbridge)',
    bow: 'Oak shortbow',
    arrow: 'Iron arrow',
    safeSpot: true
  },
  magic: {
    targetLevel: 25,
    trainDefence: false,
    method: 'combat_spells',
    spell: 'Wind Strike',
    splashTarget: 'Rat (Lumbridge)',
    staff: 'Staff of Air'
  },
  prayer: {
    targetLevel: 31,
    method: 'collect_and_bury'
  },
  cooking: {
    targetLevel: 40,
    food: 'Trout',
    progressive: true,
    location: 'Al-Kharid',
    dropBurnt: true
  },
  crafting: {
    targetLevel: 30,
    category: 'leather',
    item: 'Leather gloves'
  },
  firemaking: {
    targetLevel: 30,
    log: 'Oak logs',
    mode: 'lines'
  },
  fishing: {
    targetLevel: 40,
    method: 'shrimp_anchovies',
    location: 'Lumbridge Swamp',
    dropFish: false
  },
  mining: {
    targetLevel: 40,
    ore: 'Copper & Tin',
    location: 'Lumbridge Swamp',
    dropOre: false
  },
  runecrafting: {
    targetLevel: 20,
    rune: 'Air',
    mode: 'runes'
  },
  smithing: {
    targetLevel: 35,
    method: 'smelting',
    barOrItem: 'Bronze bar',
    location: 'Al-Kharid furnace'
  },
  woodcutting: {
    targetLevel: 40,
    tree: 'Oak trees',
    location: 'Lumbridge',
    dropLogs: false
  },
  quests: {
    selectedQuests: ["Cook's Assistant", 'Sheep Shearer', 'The Restless Ghost', 'Romeo & Juliet', 'Rune Mysteries'],
    stopOnQuestPoints: 10
  },
  moneymaking: {
    method: 'Tan Cowhides (Al-Kharid)',
    targetGp: 50000
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
    var val = Number(bot.bmCache.getInt(key, fallback));
    return isNaN(val) ? fallback : val;
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
var loadSettings = () => {
  var configured = getCachedBoolean(CACHE_PREFIX + 'configured', false);
  if (!configured) {
    return JSON.parse(JSON.stringify(defaultSettings));
  }
  var enabledCategories = [];
  var _iterator = _createForOfIteratorHelper(ALL_CATEGORIES),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var cat = _step.value;
      if (getCachedBoolean(CACHE_PREFIX + 'queue.' + cat, false)) {
        enabledCategories.push(cat);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  var playStyleStr = getCachedString(CACHE_PREFIX + 'general.playStyle', 'normal');
  var playStyle = playStyleStr === 'lazy' || playStyleStr === 'fast' ? playStyleStr : 'normal';
  var questsConfigured = getCachedBoolean(CACHE_PREFIX + 'quests.configured', false);
  var selectedQuests = [];
  if (questsConfigured) {
    var rawList = getCachedString(CACHE_PREFIX + 'quests.list', '');
    if (rawList.length > 0) {
      selectedQuests = rawList.split(',').map(s => s.trim()).filter(Boolean);
    } else {
      var _iterator2 = _createForOfIteratorHelper(F2P_QUESTS),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var q = _step2.value;
          if (getCachedBoolean(CACHE_PREFIX + 'quests.item.' + q.name, false)) {
            selectedQuests.push(q.name);
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  } else {
    selectedQuests = _toConsumableArray(defaultSettings.quests.selectedQuests);
  }
  return {
    enabledCategories: enabledCategories.length > 0 ? enabledCategories : _toConsumableArray(defaultSettings.enabledCategories),
    general: {
      playStyle,
      targetTotalLevel: getCachedInt(CACHE_PREFIX + 'general.targetTotalLevel', 0),
      takeBreaks: getCachedBoolean(CACHE_PREFIX + 'general.takeBreaks', true),
      cameraMovement: getCachedBoolean(CACHE_PREFIX + 'general.cameraMovement', true),
      noobMode: getCachedBoolean(CACHE_PREFIX + 'general.noobMode', true),
      strictLevelGoals: getCachedBoolean(CACHE_PREFIX + 'general.strictLevelGoals', false)
    },
    combat: {
      targetAttack: getCachedInt(CACHE_PREFIX + 'combat.targetAttack', 40),
      targetStrength: getCachedInt(CACHE_PREFIX + 'combat.targetStrength', 40),
      targetDefence: getCachedInt(CACHE_PREFIX + 'combat.targetDefence', 40),
      combatOrder: getCachedString(CACHE_PREFIX + 'combat.combatOrder', 'balanced'),
      monster: getCachedString(CACHE_PREFIX + 'combat.monster', 'Chickens (Lumbridge)'),
      food: getCachedString(CACHE_PREFIX + 'combat.food', 'Trout'),
      eatAtHp: getCachedInt(CACHE_PREFIX + 'combat.eatAtHp', 50),
      lootBones: getCachedBoolean(CACHE_PREFIX + 'combat.lootBones', false),
      lootCoins: getCachedBoolean(CACHE_PREFIX + 'combat.lootCoins', true),
      lootRunes: getCachedBoolean(CACHE_PREFIX + 'combat.lootRunes', true),
      buryBones: getCachedBoolean(CACHE_PREFIX + 'combat.buryBones', false)
    },
    ranged: {
      targetLevel: getCachedInt(CACHE_PREFIX + 'ranged.targetLevel', 40),
      trainDefence: getCachedBoolean(CACHE_PREFIX + 'ranged.trainDefence', false),
      monster: getCachedString(CACHE_PREFIX + 'ranged.monster', 'Cows (Lumbridge)'),
      bow: getCachedString(CACHE_PREFIX + 'ranged.bow', 'Oak shortbow'),
      arrow: getCachedString(CACHE_PREFIX + 'ranged.arrow', 'Iron arrow'),
      safeSpot: getCachedBoolean(CACHE_PREFIX + 'ranged.safeSpot', true)
    },
    magic: {
      targetLevel: getCachedInt(CACHE_PREFIX + 'magic.targetLevel', 25),
      trainDefence: getCachedBoolean(CACHE_PREFIX + 'magic.trainDefence', false),
      method: getCachedString(CACHE_PREFIX + 'magic.method', 'combat_spells'),
      spell: getCachedString(CACHE_PREFIX + 'magic.spell', 'Wind Strike'),
      splashTarget: getCachedString(CACHE_PREFIX + 'magic.splashTarget', 'Rat (Lumbridge)'),
      staff: getCachedString(CACHE_PREFIX + 'magic.staff', 'Staff of Air')
    },
    prayer: {
      targetLevel: getCachedInt(CACHE_PREFIX + 'prayer.targetLevel', 31),
      method: getCachedString(CACHE_PREFIX + 'prayer.method', 'collect_and_bury')
    },
    cooking: {
      targetLevel: getCachedInt(CACHE_PREFIX + 'cooking.targetLevel', 40),
      food: getCachedString(CACHE_PREFIX + 'cooking.food', 'Trout'),
      progressive: getCachedBoolean(CACHE_PREFIX + 'cooking.progressive', true),
      location: getCachedString(CACHE_PREFIX + 'cooking.location', 'Al-Kharid'),
      dropBurnt: getCachedBoolean(CACHE_PREFIX + 'cooking.dropBurnt', true)
    },
    crafting: {
      targetLevel: getCachedInt(CACHE_PREFIX + 'crafting.targetLevel', 30),
      category: getCachedString(CACHE_PREFIX + 'crafting.category', 'leather'),
      item: getCachedString(CACHE_PREFIX + 'crafting.item', 'Leather gloves')
    },
    firemaking: {
      targetLevel: getCachedInt(CACHE_PREFIX + 'firemaking.targetLevel', 30),
      log: getCachedString(CACHE_PREFIX + 'firemaking.log', 'Oak logs'),
      mode: getCachedString(CACHE_PREFIX + 'firemaking.mode', 'lines')
    },
    fishing: {
      targetLevel: getCachedInt(CACHE_PREFIX + 'fishing.targetLevel', 40),
      method: getCachedString(CACHE_PREFIX + 'fishing.method', 'shrimp_anchovies'),
      location: getCachedString(CACHE_PREFIX + 'fishing.location', 'Lumbridge Swamp'),
      dropFish: getCachedBoolean(CACHE_PREFIX + 'fishing.dropFish', false)
    },
    mining: {
      targetLevel: getCachedInt(CACHE_PREFIX + 'mining.targetLevel', 40),
      ore: getCachedString(CACHE_PREFIX + 'mining.ore', 'Copper & Tin'),
      location: getCachedString(CACHE_PREFIX + 'mining.location', 'Lumbridge Swamp'),
      dropOre: getCachedBoolean(CACHE_PREFIX + 'mining.dropOre', false)
    },
    runecrafting: {
      targetLevel: getCachedInt(CACHE_PREFIX + 'runecrafting.targetLevel', 20),
      rune: getCachedString(CACHE_PREFIX + 'runecrafting.rune', 'Air'),
      mode: getCachedString(CACHE_PREFIX + 'runecrafting.mode', 'runes')
    },
    smithing: {
      targetLevel: getCachedInt(CACHE_PREFIX + 'smithing.targetLevel', 35),
      method: getCachedString(CACHE_PREFIX + 'smithing.method', 'smelting'),
      barOrItem: getCachedString(CACHE_PREFIX + 'smithing.barOrItem', 'Bronze bar'),
      location: getCachedString(CACHE_PREFIX + 'smithing.location', 'Al-Kharid furnace')
    },
    woodcutting: {
      targetLevel: getCachedInt(CACHE_PREFIX + 'woodcutting.targetLevel', 40),
      tree: getCachedString(CACHE_PREFIX + 'woodcutting.tree', 'Oak trees'),
      location: getCachedString(CACHE_PREFIX + 'woodcutting.location', 'Lumbridge'),
      dropLogs: getCachedBoolean(CACHE_PREFIX + 'woodcutting.dropLogs', false)
    },
    quests: {
      selectedQuests,
      stopOnQuestPoints: getCachedInt(CACHE_PREFIX + 'quests.stopOnQuestPoints', 10)
    },
    moneymaking: {
      method: getCachedString(CACHE_PREFIX + 'moneymaking.method', 'Tan Cowhides (Al-Kharid)'),
      targetGp: getCachedInt(CACHE_PREFIX + 'moneymaking.targetGp', 50000)
    }
  };
};
var saveSettings = settings => {
  bot.bmCache.saveBoolean(CACHE_PREFIX + 'configured', true);
  var _iterator3 = _createForOfIteratorHelper(ALL_CATEGORIES),
    _step3;
  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var cat = _step3.value;
      bot.bmCache.saveBoolean(CACHE_PREFIX + 'queue.' + cat, settings.enabledCategories.includes(cat));
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
  bot.bmCache.saveString(CACHE_PREFIX + 'general.playStyle', settings.general.playStyle);
  bot.bmCache.saveInt(CACHE_PREFIX + 'general.targetTotalLevel', settings.general.targetTotalLevel);
  bot.bmCache.saveBoolean(CACHE_PREFIX + 'general.takeBreaks', settings.general.takeBreaks);
  bot.bmCache.saveBoolean(CACHE_PREFIX + 'general.cameraMovement', settings.general.cameraMovement);
  bot.bmCache.saveBoolean(CACHE_PREFIX + 'general.noobMode', settings.general.noobMode);
  bot.bmCache.saveBoolean(CACHE_PREFIX + 'general.strictLevelGoals', settings.general.strictLevelGoals);
  bot.bmCache.saveInt(CACHE_PREFIX + 'combat.targetAttack', settings.combat.targetAttack);
  bot.bmCache.saveInt(CACHE_PREFIX + 'combat.targetStrength', settings.combat.targetStrength);
  bot.bmCache.saveInt(CACHE_PREFIX + 'combat.targetDefence', settings.combat.targetDefence);
  bot.bmCache.saveString(CACHE_PREFIX + 'combat.combatOrder', settings.combat.combatOrder);
  bot.bmCache.saveString(CACHE_PREFIX + 'combat.monster', settings.combat.monster);
  bot.bmCache.saveString(CACHE_PREFIX + 'combat.food', settings.combat.food);
  bot.bmCache.saveInt(CACHE_PREFIX + 'combat.eatAtHp', settings.combat.eatAtHp);
  bot.bmCache.saveBoolean(CACHE_PREFIX + 'combat.lootBones', settings.combat.lootBones);
  bot.bmCache.saveBoolean(CACHE_PREFIX + 'combat.lootCoins', settings.combat.lootCoins);
  bot.bmCache.saveBoolean(CACHE_PREFIX + 'combat.lootRunes', settings.combat.lootRunes);
  bot.bmCache.saveBoolean(CACHE_PREFIX + 'combat.buryBones', settings.combat.buryBones);
  bot.bmCache.saveInt(CACHE_PREFIX + 'ranged.targetLevel', settings.ranged.targetLevel);
  bot.bmCache.saveBoolean(CACHE_PREFIX + 'ranged.trainDefence', settings.ranged.trainDefence);
  bot.bmCache.saveString(CACHE_PREFIX + 'ranged.monster', settings.ranged.monster);
  bot.bmCache.saveString(CACHE_PREFIX + 'ranged.bow', settings.ranged.bow);
  bot.bmCache.saveString(CACHE_PREFIX + 'ranged.arrow', settings.ranged.arrow);
  bot.bmCache.saveBoolean(CACHE_PREFIX + 'ranged.safeSpot', settings.ranged.safeSpot);
  bot.bmCache.saveInt(CACHE_PREFIX + 'magic.targetLevel', settings.magic.targetLevel);
  bot.bmCache.saveBoolean(CACHE_PREFIX + 'magic.trainDefence', settings.magic.trainDefence);
  bot.bmCache.saveString(CACHE_PREFIX + 'magic.method', settings.magic.method);
  bot.bmCache.saveString(CACHE_PREFIX + 'magic.spell', settings.magic.spell);
  bot.bmCache.saveString(CACHE_PREFIX + 'magic.splashTarget', settings.magic.splashTarget);
  bot.bmCache.saveString(CACHE_PREFIX + 'magic.staff', settings.magic.staff);
  bot.bmCache.saveInt(CACHE_PREFIX + 'prayer.targetLevel', settings.prayer.targetLevel);
  bot.bmCache.saveString(CACHE_PREFIX + 'prayer.method', settings.prayer.method);
  bot.bmCache.saveInt(CACHE_PREFIX + 'cooking.targetLevel', settings.cooking.targetLevel);
  bot.bmCache.saveString(CACHE_PREFIX + 'cooking.food', settings.cooking.food);
  bot.bmCache.saveBoolean(CACHE_PREFIX + 'cooking.progressive', settings.cooking.progressive);
  bot.bmCache.saveString(CACHE_PREFIX + 'cooking.location', settings.cooking.location);
  bot.bmCache.saveBoolean(CACHE_PREFIX + 'cooking.dropBurnt', settings.cooking.dropBurnt);
  bot.bmCache.saveInt(CACHE_PREFIX + 'crafting.targetLevel', settings.crafting.targetLevel);
  bot.bmCache.saveString(CACHE_PREFIX + 'crafting.category', settings.crafting.category);
  bot.bmCache.saveString(CACHE_PREFIX + 'crafting.item', settings.crafting.item);
  bot.bmCache.saveInt(CACHE_PREFIX + 'firemaking.targetLevel', settings.firemaking.targetLevel);
  bot.bmCache.saveString(CACHE_PREFIX + 'firemaking.log', settings.firemaking.log);
  bot.bmCache.saveString(CACHE_PREFIX + 'firemaking.mode', settings.firemaking.mode);
  bot.bmCache.saveInt(CACHE_PREFIX + 'fishing.targetLevel', settings.fishing.targetLevel);
  bot.bmCache.saveString(CACHE_PREFIX + 'fishing.method', settings.fishing.method);
  bot.bmCache.saveString(CACHE_PREFIX + 'fishing.location', settings.fishing.location);
  bot.bmCache.saveBoolean(CACHE_PREFIX + 'fishing.dropFish', settings.fishing.dropFish);
  bot.bmCache.saveInt(CACHE_PREFIX + 'mining.targetLevel', settings.mining.targetLevel);
  bot.bmCache.saveString(CACHE_PREFIX + 'mining.ore', settings.mining.ore);
  bot.bmCache.saveString(CACHE_PREFIX + 'mining.location', settings.mining.location);
  bot.bmCache.saveBoolean(CACHE_PREFIX + 'mining.dropOre', settings.mining.dropOre);
  bot.bmCache.saveInt(CACHE_PREFIX + 'runecrafting.targetLevel', settings.runecrafting.targetLevel);
  bot.bmCache.saveString(CACHE_PREFIX + 'runecrafting.rune', settings.runecrafting.rune);
  bot.bmCache.saveString(CACHE_PREFIX + 'runecrafting.mode', settings.runecrafting.mode);
  bot.bmCache.saveInt(CACHE_PREFIX + 'smithing.targetLevel', settings.smithing.targetLevel);
  bot.bmCache.saveString(CACHE_PREFIX + 'smithing.method', settings.smithing.method);
  bot.bmCache.saveString(CACHE_PREFIX + 'smithing.barOrItem', settings.smithing.barOrItem);
  bot.bmCache.saveString(CACHE_PREFIX + 'smithing.location', settings.smithing.location);
  bot.bmCache.saveInt(CACHE_PREFIX + 'woodcutting.targetLevel', settings.woodcutting.targetLevel);
  bot.bmCache.saveString(CACHE_PREFIX + 'woodcutting.tree', settings.woodcutting.tree);
  bot.bmCache.saveString(CACHE_PREFIX + 'woodcutting.location', settings.woodcutting.location);
  bot.bmCache.saveBoolean(CACHE_PREFIX + 'woodcutting.dropLogs', settings.woodcutting.dropLogs);
  bot.bmCache.saveBoolean(CACHE_PREFIX + 'quests.configured', true);
  var _iterator4 = _createForOfIteratorHelper(F2P_QUESTS),
    _step4;
  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var q = _step4.value;
      var isSelected = settings.quests.selectedQuests.includes(q.name);
      bot.bmCache.saveBoolean(CACHE_PREFIX + 'quests.item.' + q.name, isSelected);
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }
  bot.bmCache.saveString(CACHE_PREFIX + 'quests.list', settings.quests.selectedQuests.join(','));
  bot.bmCache.saveInt(CACHE_PREFIX + 'quests.stopOnQuestPoints', settings.quests.stopOnQuestPoints);
  bot.bmCache.saveString(CACHE_PREFIX + 'moneymaking.method', settings.moneymaking.method);
  bot.bmCache.saveInt(CACHE_PREFIX + 'moneymaking.targetGp', settings.moneymaking.targetGp);
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
  var accent = new java.awt.Color(0xC084FC);
  var buttonBg = new java.awt.Color(0x8B5CF6);
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
    var cb = new javax.swing.JCheckBox(text, selected);
    cb.setBackground(bg);
    cb.setForeground(foreground);
    cb.setFont(new java.awt.Font('Dialog', java.awt.Font.PLAIN, 12));
    cb.setFocusPainted(false);
    return cb;
  };
  var textField = function textField(text) {
    var columns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;
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
    var cb = new javax.swing.JComboBox(items);
    cb.setBackground(surface);
    cb.setForeground(foreground);
    cb.setFont(new java.awt.Font('Dialog', java.awt.Font.PLAIN, 12));
    if (selected) {
      var index = items.indexOf(selected);
      if (index >= 0) cb.setSelectedIndex(index);
    }
    return cb;
  };
  var button = function button(text) {
    var isAccent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var btn = new javax.swing.JButton(text);
    btn.setBackground(isAccent ? buttonBg : surface);
    btn.setForeground(isAccent ? buttonFg : foreground);
    btn.setFocusPainted(false);
    btn.setFont(new java.awt.Font('Dialog', isAccent ? java.awt.Font.BOLD : java.awt.Font.PLAIN, 12));
    btn.setBorder(javax.swing.BorderFactory.createCompoundBorder(javax.swing.BorderFactory.createLineBorder(isAccent ? accent : borderLine, 1), javax.swing.BorderFactory.createEmptyBorder(5, 12, 5, 12)));
    return btn;
  };
  var section = (title, body) => {
    var result = panel(new java.awt.BorderLayout(8, 8), surface);
    result.setBorder(createSectionBorder(title));
    result.add(body, java.awt.BorderLayout.CENTER);
    return result;
  };
  var createScrollPane = component => {
    var scroll = new javax.swing.JScrollPane(component);
    scroll.setBorder(javax.swing.BorderFactory.createLineBorder(borderLine, 1));
    scroll.getViewport().setBackground(background);
    scroll.getVerticalScrollBar().setUnitIncrement(16);
    return scroll;
  };
  frame = new javax.swing.JFrame('AIO F2P Account Builder | by xulixna');
  var mainPanel = panel(new java.awt.BorderLayout(12, 12));
  mainPanel.setBorder(javax.swing.BorderFactory.createEmptyBorder(14, 14, 14, 14));
  var headerPanel = panel(new java.awt.GridLayout(2, 1, 2, 2));
  var titleLabel = label('AIO F2P Account Builder', true, accent, 22);
  titleLabel.setHorizontalAlignment(0);
  var subtitleLabel = label('All-In-One Free-to-Play Progression • Combat, Skills, Quests & Moneymaking • by xulixna', false, muted, 12);
  subtitleLabel.setHorizontalAlignment(0);
  headerPanel.add(titleLabel);
  headerPanel.add(subtitleLabel);
  mainPanel.add(headerPanel, java.awt.BorderLayout.NORTH);
  var sidebar = panel(new java.awt.BorderLayout(0, 10));
  sidebar.setPreferredSize(new java.awt.Dimension(250, 0));
  var navBox = panel(new java.awt.GridLayout(0, 1, 0, 4), surface);
  navBox.setBorder(createSectionBorder('Execution Queue & Nav'));
  var categoryRows = {};
  var initialQueue = new Set(initial.enabledCategories);
  var categoryIcons = {
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
    Moneymaking: '💰 Moneymaking'
  };
  var _iterator = _createForOfIteratorHelper(ALL_CATEGORIES),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var cat = _step.value;
      var cb = checkbox('', initialQueue.has(cat), surface);
      cb.setToolTipText("Include ".concat(cat, " in automated execution"));
      var btn = new javax.swing.JButton(categoryIcons[cat]);
      btn.setFont(new java.awt.Font('Dialog', java.awt.Font.BOLD, 12));
      btn.setFocusPainted(false);
      btn.setHorizontalAlignment(2);
      var row = panel(new java.awt.BorderLayout(4, 0), surface);
      row.add(cb, java.awt.BorderLayout.WEST);
      row.add(btn, java.awt.BorderLayout.CENTER);
      navBox.add(row);
      categoryRows[cat] = {
        cb,
        btn
      };
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  var navScroll = createScrollPane(navBox);
  sidebar.add(navScroll, java.awt.BorderLayout.CENTER);
  var queueControls = panel(new java.awt.GridLayout(2, 1, 4, 4), surface);
  queueControls.setBorder(createSectionBorder('Queue Actions'));
  var selectAllBtn = button('Select All Skills');
  var clearQueueBtn = button('Clear Queue');
  selectAllBtn.addActionListener(() => {
    var _iterator2 = _createForOfIteratorHelper(ALL_CATEGORIES),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var cat = _step2.value;
        categoryRows[cat].cb.setSelected(true);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    updateStartButtonText();
  });
  clearQueueBtn.addActionListener(() => {
    var _iterator3 = _createForOfIteratorHelper(ALL_CATEGORIES),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var cat = _step3.value;
        categoryRows[cat].cb.setSelected(false);
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    updateStartButtonText();
  });
  var queueBtnRow = panel(new java.awt.GridLayout(1, 2, 4, 4), surface);
  queueBtnRow.add(selectAllBtn);
  queueBtnRow.add(clearQueueBtn);
  queueControls.add(queueBtnRow);
  var queueHint = label('Runs checked skills in order', false, muted, 11);
  queueHint.setHorizontalAlignment(0);
  queueControls.add(queueHint);
  sidebar.add(queueControls, java.awt.BorderLayout.SOUTH);
  mainPanel.add(sidebar, java.awt.BorderLayout.WEST);
  var centerArea = panel(new java.awt.BorderLayout(8, 10));
  var pageHeading = label('Combat (Melee) Configuration', true, accent, 18);
  centerArea.add(pageHeading, java.awt.BorderLayout.NORTH);
  var pages = panel(new java.awt.BorderLayout());
  centerArea.add(pages, java.awt.BorderLayout.CENTER);
  mainPanel.add(centerArea, java.awt.BorderLayout.CENTER);
  var combatPage = panel(new java.awt.BorderLayout(0, 10));
  var combatContent = panel(new java.awt.GridLayout(0, 1, 0, 8));
  var combatTargetsGrid = panel(new java.awt.GridLayout(2, 3, 10, 6), surface);
  combatTargetsGrid.add(label('Target Attack:'));
  combatTargetsGrid.add(label('Target Strength:'));
  combatTargetsGrid.add(label('Target Defence:'));
  var atkField = textField(String(initial.combat.targetAttack));
  var strField = textField(String(initial.combat.targetStrength));
  var defField = textField(String(initial.combat.targetDefence));
  combatTargetsGrid.add(atkField);
  combatTargetsGrid.add(strField);
  combatTargetsGrid.add(defField);
  combatContent.add(section('Combat Targets (0 = Skip / Level Target)', combatTargetsGrid));
  var combatMonsterPanel = panel(new java.awt.GridLayout(0, 2, 10, 6), surface);
  combatMonsterPanel.add(label('Training Monster / Location:'));
  var combatMonsters = ['Chickens (Lumbridge)', 'Cows (Lumbridge)', 'Goblins (Lumbridge)', 'Minotaurs (Stronghold Lvl 1)', 'Barbarians (Barbarian Village)', 'Flesh Crawlers (Stronghold Lvl 2)', 'Hill Giants (Edgeville Dungeon)', 'Moss Giants (Varrock Sewers)'];
  var monsterCombo = comboBox(combatMonsters, initial.combat.monster);
  combatMonsterPanel.add(monsterCombo);
  combatMonsterPanel.add(label('Combat Stance Order:'));
  var combatOrders = ['Balanced (Equalize stats)', 'Attack -> Strength -> Defence', 'Strength -> Attack -> Defence', 'Focus chosen style only'];
  var combatOrderCombo = comboBox(combatOrders);
  combatMonsterPanel.add(combatOrderCombo);
  combatContent.add(section('Monster Selection & Stance Strategy', combatMonsterPanel));
  var combatHealingPanel = panel(new java.awt.GridLayout(0, 2, 10, 6), surface);
  combatHealingPanel.add(label('Food to Eat:'));
  var foodOptions = ['Trout', 'Salmon', 'Lobster', 'Swordfish', 'None'];
  var combatFoodCombo = comboBox(foodOptions, initial.combat.food);
  combatHealingPanel.add(combatFoodCombo);
  combatHealingPanel.add(label('Eat Food at HP %:'));
  var eatHpField = textField(String(initial.combat.eatAtHp));
  combatHealingPanel.add(eatHpField);
  combatContent.add(section('Healing & Consumables', combatHealingPanel));
  var combatLootPanel = panel(new java.awt.GridLayout(2, 2, 8, 4), surface);
  var lootCoinsCb = checkbox('Loot Coins', initial.combat.lootCoins, surface);
  var lootRunesCb = checkbox('Loot Runes & Arrows', initial.combat.lootRunes, surface);
  var lootBonesCb = checkbox('Loot Bones', initial.combat.lootBones, surface);
  var buryBonesCb = checkbox('Bury Bones on ground', initial.combat.buryBones, surface);
  combatLootPanel.add(lootCoinsCb);
  combatLootPanel.add(lootRunesCb);
  combatLootPanel.add(lootBonesCb);
  combatLootPanel.add(buryBonesCb);
  combatContent.add(section('Looting & Bone Handling', combatLootPanel));
  combatPage.add(createScrollPane(combatContent), java.awt.BorderLayout.CENTER);
  var rangedPage = panel(new java.awt.BorderLayout(0, 10));
  var rangedContent = panel(new java.awt.GridLayout(0, 1, 0, 8));
  var rangedTargetPanel = panel(new java.awt.GridLayout(0, 2, 10, 6), surface);
  rangedTargetPanel.add(label('Target Ranged Level:'));
  var rangedTargetField = textField(String(initial.ranged.targetLevel));
  rangedTargetPanel.add(rangedTargetField);
  var rangedTrainDefCb = checkbox('Train Defence (Use Longrange Stance)', initial.ranged.trainDefence, surface);
  rangedTrainDefCb.setToolTipText('Splits XP between Ranged and Defence');
  rangedTargetPanel.add(rangedTrainDefCb);
  var rangedSafeSpotCb = checkbox('Enable Safe-spotting', initial.ranged.safeSpot, surface);
  rangedTargetPanel.add(rangedSafeSpotCb);
  rangedContent.add(section('Ranged Target & Stance Settings', rangedTargetPanel));
  var rangedGearPanel = panel(new java.awt.GridLayout(0, 2, 10, 6), surface);
  rangedGearPanel.add(label('Bow:'));
  var bowOptions = ['Shortbow', 'Oak shortbow', 'Willow shortbow', 'Maple shortbow'];
  var bowCombo = comboBox(bowOptions, initial.ranged.bow);
  rangedGearPanel.add(bowCombo);
  rangedGearPanel.add(label('Arrows:'));
  var arrowOptions = ['Bronze arrow', 'Iron arrow', 'Steel arrow', 'Mithril arrow', 'Adamant arrow'];
  var arrowCombo = comboBox(arrowOptions, initial.ranged.arrow);
  rangedGearPanel.add(arrowCombo);
  rangedGearPanel.add(label('Target Monster / Location:'));
  var rangedMonsters = ['Chickens (Lumbridge)', 'Cows (Lumbridge)', 'Minotaurs (Stronghold Lvl 1 - Safe-spot)', 'Hill Giants (Edgeville Dungeon - Safe-spot)', 'Lesser Demons (Wizards Tower / Crandor - Safe-spot)'];
  var rangedMonsterCombo = comboBox(rangedMonsters, initial.ranged.monster);
  rangedGearPanel.add(rangedMonsterCombo);
  rangedContent.add(section('Equipment & Monsters', rangedGearPanel));
  rangedPage.add(createScrollPane(rangedContent), java.awt.BorderLayout.CENTER);
  var magicPage = panel(new java.awt.BorderLayout(0, 10));
  var magicContent = panel(new java.awt.GridLayout(0, 1, 0, 8));
  var magicTargetPanel = panel(new java.awt.GridLayout(0, 2, 10, 6), surface);
  magicTargetPanel.add(label('Target Magic Level:'));
  var magicTargetField = textField(String(initial.magic.targetLevel));
  magicTargetPanel.add(magicTargetField);
  var magicTrainDefCb = checkbox('Train Defence (Defensive Casting)', initial.magic.trainDefence, surface);
  magicTrainDefCb.setToolTipText('Splits combat magic XP between Magic and Defence');
  magicTargetPanel.add(magicTrainDefCb);
  magicContent.add(section('Magic Target & Stance', magicTargetPanel));
  var magicMethodPanel = panel(new java.awt.GridLayout(0, 2, 10, 6), surface);
  magicMethodPanel.add(label('Training Method:'));
  var magicMethods = ['Combat Spells (Strike / Bolt / Blast)', 'Splashing (AFK 0 damage)', 'Curse / Weaken / Confuse', 'Teleport Training', 'High Level Alchemy'];
  var magicMethodCombo = comboBox(magicMethods);
  magicMethodPanel.add(magicMethodCombo);
  magicMethodPanel.add(label('Spell to Cast:'));
  var spellOptions = ['Wind Strike', 'Water Strike', 'Earth Strike', 'Fire Strike', 'Wind Bolt', 'Water Bolt', 'Earth Bolt', 'Fire Bolt', 'Curse', 'Varrock Teleport', 'Lumbridge Teleport', 'Falador Teleport', 'High Level Alchemy'];
  var spellCombo = comboBox(spellOptions, initial.magic.spell);
  magicMethodPanel.add(spellCombo);
  magicMethodPanel.add(label('Splashing Target:'));
  var splashOptions = ['Rat (Lumbridge)', 'Chicken (Lumbridge)', 'Seagull (Port Sarim)', 'Monk (Monastery)'];
  var splashCombo = comboBox(splashOptions, initial.magic.splashTarget);
  magicMethodPanel.add(splashCombo);
  magicMethodPanel.add(label('Equipped Staff:'));
  var staffOptions = ['Staff of Air', 'Staff of Water', 'Staff of Earth', 'Staff of Fire'];
  var staffCombo = comboBox(staffOptions, initial.magic.staff);
  magicMethodPanel.add(staffCombo);
  magicContent.add(section('Spell & Casting Method', magicMethodPanel));
  magicPage.add(createScrollPane(magicContent), java.awt.BorderLayout.CENTER);
  var prayerPage = panel(new java.awt.BorderLayout(0, 10));
  var prayerContent = panel(new java.awt.GridLayout(0, 1, 0, 8));
  var prayerTargetPanel = panel(new java.awt.GridLayout(0, 2, 10, 6), surface);
  prayerTargetPanel.add(label('Target Prayer Level:'));
  var prayerTargetField = textField(String(initial.prayer.targetLevel));
  prayerTargetPanel.add(prayerTargetField);
  prayerContent.add(section('Prayer Target Level', prayerTargetPanel));
  var prayerMethodPanel = panel(new java.awt.GridLayout(0, 1, 6, 6), surface);
  var prayerOptions = ['Collect & Bury Cow/Chicken Bones (Lumbridge)', 'Withdraw Normal Bones from Bank & Bury', 'Withdraw Big Bones from Bank & Bury (Fast F2P XP)'];
  var prayerCombo = comboBox(prayerOptions);
  prayerMethodPanel.add(prayerCombo);
  prayerContent.add(section('Prayer Training Method', prayerMethodPanel));
  prayerPage.add(createScrollPane(prayerContent), java.awt.BorderLayout.CENTER);
  var cookingPage = panel(new java.awt.BorderLayout(0, 10));
  var cookingContent = panel(new java.awt.GridLayout(0, 1, 0, 8));
  var cookingTargetPanel = panel(new java.awt.GridLayout(0, 2, 10, 6), surface);
  cookingTargetPanel.add(label('Target Cooking Level:'));
  var cookingTargetField = textField(String(initial.cooking.targetLevel));
  cookingTargetPanel.add(cookingTargetField);
  var cookingProgCb = checkbox('Progressive Mode (Cook highest fish available)', initial.cooking.progressive, surface);
  cookingTargetPanel.add(cookingProgCb);
  cookingContent.add(section('Cooking Mode & Target', cookingTargetPanel));
  var cookingFoodPanel = panel(new java.awt.GridLayout(0, 2, 10, 6), surface);
  cookingFoodPanel.add(label('Selected Food (Fixed Mode):'));
  var cookingFoodList = ['Raw shrimps', 'Raw trout', 'Raw salmon', 'Raw tuna', 'Raw lobster', 'Raw swordfish'];
  var cookingFoodCombo = comboBox(cookingFoodList, initial.cooking.food);
  cookingFoodPanel.add(cookingFoodCombo);
  cookingFoodPanel.add(label('Cooking Range / Spot:'));
  var cookingRanges = ['Al-Kharid range', 'Rogues Den permanent fire', 'Edgeville stove', 'Lumbridge castle range'];
  var cookingRangeCombo = comboBox(cookingRanges, initial.cooking.location);
  cookingFoodPanel.add(cookingRangeCombo);
  var dropBurntCb = checkbox('Drop Burnt Food when inventory finishes', initial.cooking.dropBurnt, surface);
  cookingFoodPanel.add(dropBurntCb);
  cookingContent.add(section('Food & Cooking Range Selection', cookingFoodPanel));
  cookingPage.add(createScrollPane(cookingContent), java.awt.BorderLayout.CENTER);
  var craftingPage = panel(new java.awt.BorderLayout(0, 10));
  var craftingContent = panel(new java.awt.GridLayout(0, 1, 0, 8));
  var craftingTargetPanel = panel(new java.awt.GridLayout(0, 2, 10, 6), surface);
  craftingTargetPanel.add(label('Target Crafting Level:'));
  var craftingTargetField = textField(String(initial.crafting.targetLevel));
  craftingTargetPanel.add(craftingTargetField);
  craftingContent.add(section('Crafting Target Level', craftingTargetPanel));
  var craftingMethodPanel = panel(new java.awt.GridLayout(0, 2, 10, 6), surface);
  craftingMethodPanel.add(label('Crafting Category:'));
  var craftCategories = ['Leather Armour', 'Gem Cutting', 'Gold / Silver Jewelry', 'Pottery'];
  var craftCatCombo = comboBox(craftCategories);
  craftingMethodPanel.add(craftCatCombo);
  craftingMethodPanel.add(label('Item to Produce:'));
  var craftItems = ['Leather gloves (Lvl 1)', 'Leather boots (Lvl 7)', 'Leather cowl (Lvl 9)', 'Leather body (Lvl 14)', 'Leather chaps (Lvl 18)', 'Cut Sapphire (Lvl 20)', 'Cut Emerald (Lvl 27)', 'Cut Ruby (Lvl 34)', 'Cut Diamond (Lvl 43)', 'Gold ring (Lvl 5)', 'Sapphire ring (Lvl 20)', 'Emerald ring (Lvl 27)', 'Ruby ring (Lvl 34)', 'Silver tiara (Lvl 23)'];
  var craftItemCombo = comboBox(craftItems, initial.crafting.item);
  craftingMethodPanel.add(craftItemCombo);
  craftingContent.add(section('Recipe & Materials', craftingMethodPanel));
  craftingPage.add(createScrollPane(craftingContent), java.awt.BorderLayout.CENTER);
  var fmPage = panel(new java.awt.BorderLayout(0, 10));
  var fmContent = panel(new java.awt.GridLayout(0, 1, 0, 8));
  var fmTargetPanel = panel(new java.awt.GridLayout(0, 2, 10, 6), surface);
  fmTargetPanel.add(label('Target Firemaking Level:'));
  var fmTargetField = textField(String(initial.firemaking.targetLevel));
  fmTargetPanel.add(fmTargetField);
  fmContent.add(section('Firemaking Target Level', fmTargetPanel));
  var fmMethodPanel = panel(new java.awt.GridLayout(0, 2, 10, 6), surface);
  fmMethodPanel.add(label('Logs to Burn:'));
  var fmLogs = ['Normal logs (Lvl 1)', 'Oak logs (Lvl 15)', 'Willow logs (Lvl 30)', 'Maple logs (Lvl 45)', 'Yew logs (Lvl 60)'];
  var fmLogCombo = comboBox(fmLogs, initial.firemaking.log);
  fmMethodPanel.add(fmLogCombo);
  fmMethodPanel.add(label('Burn Mode:'));
  var fmModes = ['Firelines (Grand Exchange / Varrock East)', 'Forester Campfire / Bonfire'];
  var fmModeCombo = comboBox(fmModes);
  fmMethodPanel.add(fmModeCombo);
  fmContent.add(section('Firemaking Log & Mode', fmMethodPanel));
  fmPage.add(createScrollPane(fmContent), java.awt.BorderLayout.CENTER);
  var fishPage = panel(new java.awt.BorderLayout(0, 10));
  var fishContent = panel(new java.awt.GridLayout(0, 1, 0, 8));
  var fishTargetPanel = panel(new java.awt.GridLayout(0, 2, 10, 6), surface);
  fishTargetPanel.add(label('Target Fishing Level:'));
  var fishTargetField = textField(String(initial.fishing.targetLevel));
  fishTargetPanel.add(fishTargetField);
  var dropFishCb = checkbox('Drop Fish (Powerfishing / Fast XP)', initial.fishing.dropFish, surface);
  dropFishCb.setToolTipText('Drops caught fish instead of running to bank');
  fishTargetPanel.add(dropFishCb);
  fishContent.add(section('Fishing Target & Behavior', fishTargetPanel));
  var fishMethodPanel = panel(new java.awt.GridLayout(0, 2, 10, 6), surface);
  fishMethodPanel.add(label('Fish Method & Species:'));
  var fishMethods = ['Small Net: Shrimps & Anchovies (Lvl 1/15)', 'Bait Fishing: Sardines & Herrings (Lvl 5/10)', 'Fly Fishing: Trout & Salmon (Lvl 20/30)', 'Harpoon / Cage: Lobsters & Swordfish (Lvl 40/50)'];
  var fishMethodCombo = comboBox(fishMethods);
  fishMethodPanel.add(fishMethodCombo);
  fishMethodPanel.add(label('Fishing Location:'));
  var fishLocations = ['Lumbridge Swamp (Shrimp)', 'Al-Kharid coast (Shrimp/Anchovies)', 'Draynor Village (Sardine/Herring)', 'Barbarian Village (Fly fishing Trout/Salmon)', 'Karamja Docks (Lobster/Swordfish)'];
  var fishLocCombo = comboBox(fishLocations, initial.fishing.location);
  fishMethodPanel.add(fishLocCombo);
  fishContent.add(section('Spot & Tool Configuration', fishMethodPanel));
  fishPage.add(createScrollPane(fishContent), java.awt.BorderLayout.CENTER);
  var miningPage = panel(new java.awt.BorderLayout(0, 10));
  var miningContent = panel(new java.awt.GridLayout(0, 1, 0, 8));
  var miningTargetPanel = panel(new java.awt.GridLayout(0, 2, 10, 6), surface);
  miningTargetPanel.add(label('Target Mining Level:'));
  var miningTargetField = textField(String(initial.mining.targetLevel));
  miningTargetPanel.add(miningTargetField);
  var dropOreCb = checkbox('Drop Ore (Powermining / Fast XP)', initial.mining.dropOre, surface);
  miningTargetPanel.add(dropOreCb);
  miningContent.add(section('Mining Target & Behavior', miningTargetPanel));
  var miningMethodPanel = panel(new java.awt.GridLayout(0, 2, 10, 6), surface);
  miningMethodPanel.add(label('Ore to Mine:'));
  var ores = ['Copper & Tin (Lvl 1)', 'Iron Ore (Lvl 15)', 'Silver Ore (Lvl 20)', 'Coal (Lvl 30)', 'Gold Ore (Lvl 40)', 'Mithril Ore (Lvl 55)', 'Adamantite Ore (Lvl 70)'];
  var miningOreCombo = comboBox(ores, initial.mining.ore);
  miningMethodPanel.add(miningOreCombo);
  miningMethodPanel.add(label('Mining Location:'));
  var miningLocations = ['Lumbridge Swamp (Copper & Tin)', 'Varrock East Mine (Copper, Tin, Iron)', 'Varrock West Mine (Iron, Silver)', 'Al-Kharid Mine (Iron, Silver, Gold, Coal)', 'Mining Guild (Iron, Coal)', 'Falador Dwarven Mine (Iron, Coal)'];
  var miningLocCombo = comboBox(miningLocations, initial.mining.location);
  miningMethodPanel.add(miningLocCombo);
  miningContent.add(section('Rock & Mine Location', miningMethodPanel));
  miningPage.add(createScrollPane(miningContent), java.awt.BorderLayout.CENTER);
  var rcPage = panel(new java.awt.BorderLayout(0, 10));
  var rcContent = panel(new java.awt.GridLayout(0, 1, 0, 8));
  var rcTargetPanel = panel(new java.awt.GridLayout(0, 2, 10, 6), surface);
  rcTargetPanel.add(label('Target Runecrafting Level:'));
  var rcTargetField = textField(String(initial.runecrafting.targetLevel));
  rcTargetPanel.add(rcTargetField);
  rcContent.add(section('Runecrafting Target Level', rcTargetPanel));
  var rcMethodPanel = panel(new java.awt.GridLayout(0, 2, 10, 6), surface);
  rcMethodPanel.add(label('Rune to Craft:'));
  var runes = ['Air Runes (Falador South)', 'Mind Runes (Goblin Village North)', 'Water Runes (Lumbridge Swamp)', 'Earth Runes (Varrock East)', 'Fire Runes (Al-Kharid Duel Arena)', 'Body Runes (Edgeville Monastery)'];
  var rcRuneCombo = comboBox(runes, initial.runecrafting.rune);
  rcMethodPanel.add(rcRuneCombo);
  rcMethodPanel.add(label('Crafting Mode:'));
  var rcModes = ['Runes (Pure/Rune Essence)', 'Tiaras (Talisman + Silver Tiara)'];
  var rcModeCombo = comboBox(rcModes);
  rcMethodPanel.add(rcModeCombo);
  rcContent.add(section('Altar & Runecrafting Method', rcMethodPanel));
  rcPage.add(createScrollPane(rcContent), java.awt.BorderLayout.CENTER);
  var smithingPage = panel(new java.awt.BorderLayout(0, 10));
  var smithingContent = panel(new java.awt.GridLayout(0, 1, 0, 8));
  var smithingTargetPanel = panel(new java.awt.GridLayout(0, 2, 10, 6), surface);
  smithingTargetPanel.add(label('Target Smithing Level:'));
  var smithingTargetField = textField(String(initial.smithing.targetLevel));
  smithingTargetPanel.add(smithingTargetField);
  smithingContent.add(section('Smithing Target Level', smithingTargetPanel));
  var smithingMethodPanel = panel(new java.awt.GridLayout(0, 2, 10, 6), surface);
  smithingMethodPanel.add(label('Operation:'));
  var smithingOps = ['Smelting Furnace (Bars)', 'Anvil Smithing (Items)'];
  var smithingOpCombo = comboBox(smithingOps);
  smithingMethodPanel.add(smithingOpCombo);
  smithingMethodPanel.add(label('Bar / Item Recipe:'));
  var smithingRecipes = ['Bronze Bar (Lvl 1)', 'Iron Bar (Lvl 15)', 'Silver Bar (Lvl 20)', 'Steel Bar (Lvl 30)', 'Gold Bar (Lvl 40)', 'Mithril Bar (Lvl 50)', 'Bronze Dagger (Lvl 1)', 'Bronze Scimitar (Lvl 5)', 'Iron Dagger (Lvl 15)', 'Iron Scimitar (Lvl 20)', 'Iron Platebody (Lvl 33)', 'Steel Platebody (Lvl 48)'];
  var smithingRecipeCombo = comboBox(smithingRecipes, initial.smithing.barOrItem);
  smithingMethodPanel.add(smithingRecipeCombo);
  smithingMethodPanel.add(label('Location:'));
  var smithingLocs = ['Al-Kharid furnace', 'Edgeville furnace', 'Varrock West anvils'];
  var smithingLocCombo = comboBox(smithingLocs, initial.smithing.location);
  smithingMethodPanel.add(smithingLocCombo);
  smithingContent.add(section('Furnace / Anvil Setup', smithingMethodPanel));
  smithingPage.add(createScrollPane(smithingContent), java.awt.BorderLayout.CENTER);
  var wcPage = panel(new java.awt.BorderLayout(0, 10));
  var wcContent = panel(new java.awt.GridLayout(0, 1, 0, 8));
  var wcTargetPanel = panel(new java.awt.GridLayout(0, 2, 10, 6), surface);
  wcTargetPanel.add(label('Target Woodcutting Level:'));
  var wcTargetField = textField(String(initial.woodcutting.targetLevel));
  wcTargetPanel.add(wcTargetField);
  var dropLogsCb = checkbox('Drop Logs (Powerchopping / Fast XP)', initial.woodcutting.dropLogs, surface);
  dropLogsCb.setToolTipText('Drops cut logs instead of banking');
  wcTargetPanel.add(dropLogsCb);
  wcContent.add(section('Woodcutting Target & Behavior', wcTargetPanel));
  var wcMethodPanel = panel(new java.awt.GridLayout(0, 2, 10, 6), surface);
  wcMethodPanel.add(label('Tree Type:'));
  var trees = ['Normal Trees (Lvl 1)', 'Oak Trees (Lvl 15)', 'Willow Trees (Lvl 30)', 'Yew Trees (Lvl 60)'];
  var treeCombo = comboBox(trees, initial.woodcutting.tree);
  wcMethodPanel.add(treeCombo);
  wcMethodPanel.add(label('Location:'));
  var wcLocs = ['Lumbridge (Normal / Oak)', 'Draynor Village (Willows)', 'Port Sarim (Willows)', 'Varrock Castle (Yews)', 'Edgeville (Yews)'];
  var wcLocCombo = comboBox(wcLocs, initial.woodcutting.location);
  wcMethodPanel.add(wcLocCombo);
  wcContent.add(section('Tree & Location Selection', wcMethodPanel));
  wcPage.add(createScrollPane(wcContent), java.awt.BorderLayout.CENTER);
  var questsPage = panel(new java.awt.BorderLayout(0, 10));
  var questsTop = panel(new java.awt.BorderLayout(8, 8), surface);
  questsTop.setBorder(javax.swing.BorderFactory.createEmptyBorder(6, 6, 6, 6));
  var qpPanel = panel(new java.awt.FlowLayout(java.awt.FlowLayout.LEFT, 10, 4), surface);
  qpPanel.add(label('Target Quest Points (0 = no limit):'));
  var qpTargetField = textField(String(initial.quests.stopOnQuestPoints), 4);
  qpPanel.add(qpTargetField);
  questsTop.add(qpPanel, java.awt.BorderLayout.WEST);
  var questActionBtns = panel(new java.awt.FlowLayout(java.awt.FlowLayout.RIGHT, 6, 0), surface);
  var selectAllQuestsBtn = button('Select All');
  var selectStarterQuestsBtn = button('Select Starter / Easy');
  var clearQuestsBtn = button('Clear');
  questActionBtns.add(selectAllQuestsBtn);
  questActionBtns.add(selectStarterQuestsBtn);
  questActionBtns.add(clearQuestsBtn);
  questsTop.add(questActionBtns, java.awt.BorderLayout.EAST);
  questsPage.add(questsTop, java.awt.BorderLayout.NORTH);
  var initialSelectedQuests = new Set(initial.quests.selectedQuests);
  var questCheckboxes = {};
  var questGrid = panel(new java.awt.GridLayout(0, 2, 8, 6), cardBg);
  var _iterator4 = _createForOfIteratorHelper(F2P_QUESTS),
    _step4;
  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var q = _step4.value;
      var _cb = checkbox("".concat(q.name, " (").concat(q.points, " QP - ").concat(q.difficulty, ")"), initialSelectedQuests.has(q.name), cardBg);
      questCheckboxes[q.name] = _cb;
      questGrid.add(_cb);
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }
  selectAllQuestsBtn.addActionListener(() => {
    var _iterator5 = _createForOfIteratorHelper(F2P_QUESTS),
      _step5;
    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var q = _step5.value;
        questCheckboxes[q.name].setSelected(true);
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }
  });
  selectStarterQuestsBtn.addActionListener(() => {
    var _iterator6 = _createForOfIteratorHelper(F2P_QUESTS),
      _step6;
    try {
      for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
        var q = _step6.value;
        questCheckboxes[q.name].setSelected(q.difficulty === 'Novice');
      }
    } catch (err) {
      _iterator6.e(err);
    } finally {
      _iterator6.f();
    }
  });
  clearQuestsBtn.addActionListener(() => {
    var _iterator7 = _createForOfIteratorHelper(F2P_QUESTS),
      _step7;
    try {
      for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
        var q = _step7.value;
        questCheckboxes[q.name].setSelected(false);
      }
    } catch (err) {
      _iterator7.e(err);
    } finally {
      _iterator7.f();
    }
  });
  var questHolder = panel(new java.awt.BorderLayout(0, 6));
  questHolder.add(section('Available Free-to-Play Quests', questGrid), java.awt.BorderLayout.NORTH);
  questsPage.add(createScrollPane(questHolder), java.awt.BorderLayout.CENTER);
  var mmPage = panel(new java.awt.BorderLayout(0, 10));
  var mmContent = panel(new java.awt.GridLayout(0, 1, 0, 8));
  var mmTargetPanel = panel(new java.awt.GridLayout(0, 2, 10, 6), surface);
  mmTargetPanel.add(label('Target Profit (GP):'));
  var mmGpField = textField(String(initial.moneymaking.targetGp), 10);
  mmTargetPanel.add(mmGpField);
  mmContent.add(section('Profit Goal (0 = Run Continuously)', mmTargetPanel));
  var mmMethodPanel = panel(new java.awt.GridLayout(0, 2, 10, 6), surface);
  mmMethodPanel.add(label('F2P Moneymaking Method:'));
  var mmMethods = ['Tan Cowhides (Al-Kharid Tanner)', 'Zamorak Wine Telegrab (Chaos Temple)', 'Smelt Iron Bars (Al-Kharid / Edgeville)', 'Craft Gold Rings / Necklaces', 'Collect Red Spiders Eggs (Varrock Sewers)', 'High Level Alchemy (Profitable F2P Items)', 'Mine Iron Ore & Bank', 'Chop Oak Logs & Bank'];
  var mmCombo = comboBox(mmMethods, initial.moneymaking.method);
  mmMethodPanel.add(mmCombo);
  mmContent.add(section('Moneymaking Activity', mmMethodPanel));
  mmPage.add(createScrollPane(mmContent), java.awt.BorderLayout.CENTER);
  var pageMap = {
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
    Moneymaking: mmPage
  };
  var activeCategory = 'Combat';
  var getChosenCategories = () => {
    var res = [];
    var _iterator8 = _createForOfIteratorHelper(ALL_CATEGORIES),
      _step8;
    try {
      for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
        var cat = _step8.value;
        if (categoryRows[cat].cb.isSelected()) {
          res.push(cat);
        }
      }
    } catch (err) {
      _iterator8.e(err);
    } finally {
      _iterator8.f();
    }
    return res;
  };
  var updateNavButtons = () => {
    var _iterator9 = _createForOfIteratorHelper(ALL_CATEGORIES),
      _step9;
    try {
      for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
        var cat = _step9.value;
        var active = activeCategory === cat;
        var btn = categoryRows[cat].btn;
        btn.setBackground(active ? buttonBg : surface);
        btn.setForeground(active ? buttonFg : muted);
        btn.setBorder(javax.swing.BorderFactory.createCompoundBorder(javax.swing.BorderFactory.createLineBorder(active ? accent : borderLine, 1), javax.swing.BorderFactory.createEmptyBorder(6, 10, 6, 10)));
      }
    } catch (err) {
      _iterator9.e(err);
    } finally {
      _iterator9.f();
    }
  };
  var selectCategory = cat => {
    activeCategory = cat;
    pages.removeAll();
    pages.add(pageMap[cat], java.awt.BorderLayout.CENTER);
    pages.revalidate();
    pages.repaint();
    pageHeading.setText(categoryIcons[cat] + ' Configuration');
    updateNavButtons();
  };
  var _iterator0 = _createForOfIteratorHelper(ALL_CATEGORIES),
    _step0;
  try {
    var _loop = function _loop() {
      var cat = _step0.value;
      categoryRows[cat].btn.addActionListener(() => selectCategory(cat));
      categoryRows[cat].cb.addActionListener(() => updateStartButtonText());
    };
    for (_iterator0.s(); !(_step0 = _iterator0.n()).done;) {
      _loop();
    }
  } catch (err) {
    _iterator0.e(err);
  } finally {
    _iterator0.f();
  }
  var footer = panel(new java.awt.BorderLayout(0, 10));
  var globalOptionsPanel = panel(new java.awt.FlowLayout(java.awt.FlowLayout.LEFT, 16, 6), surface);
  globalOptionsPanel.setBorder(createSectionBorder('Global Play Style & Safety Options'));
  globalOptionsPanel.add(label('Reaction Play Style:'));
  var styleGroup = new javax.swing.ButtonGroup();
  var fastRadio = new javax.swing.JRadioButton('Fast (1-2s)', initial.general.playStyle === 'fast');
  fastRadio.setBackground(surface);
  fastRadio.setForeground(foreground);
  fastRadio.setFocusPainted(false);
  var normalRadio = new javax.swing.JRadioButton('Normal (2-4s)', initial.general.playStyle === 'normal');
  normalRadio.setBackground(surface);
  normalRadio.setForeground(foreground);
  normalRadio.setFocusPainted(false);
  var lazyRadio = new javax.swing.JRadioButton('Lazy / Casual (4-8s)', initial.general.playStyle === 'lazy');
  lazyRadio.setBackground(surface);
  lazyRadio.setForeground(foreground);
  lazyRadio.setFocusPainted(false);
  styleGroup.add(fastRadio);
  styleGroup.add(normalRadio);
  styleGroup.add(lazyRadio);
  globalOptionsPanel.add(fastRadio);
  globalOptionsPanel.add(normalRadio);
  globalOptionsPanel.add(lazyRadio);
  var takeBreaksCb = checkbox('Micro-breaks', initial.general.takeBreaks, surface);
  var cameraMoveCb = checkbox('Camera movement', initial.general.cameraMovement, surface);
  var noobModeCb = checkbox('Noob Mode', initial.general.noobMode, surface);
  var strictGoalsCb = checkbox('Strict Goals', initial.general.strictLevelGoals, surface);
  globalOptionsPanel.add(takeBreaksCb);
  globalOptionsPanel.add(cameraMoveCb);
  globalOptionsPanel.add(noobModeCb);
  globalOptionsPanel.add(strictGoalsCb);
  var totalLevelSubPanel = panel(new java.awt.FlowLayout(java.awt.FlowLayout.LEFT, 4, 0), surface);
  totalLevelSubPanel.add(label('Target Total Level:'));
  var totalLevelField = textField(String(initial.general.targetTotalLevel), 4);
  totalLevelSubPanel.add(totalLevelField);
  totalLevelSubPanel.add(label('(0 = none)', false, muted));
  globalOptionsPanel.add(totalLevelSubPanel);
  footer.add(globalOptionsPanel, java.awt.BorderLayout.NORTH);
  var buttonPanel = panel(new java.awt.BorderLayout(4, 4));
  var startButton = new javax.swing.JButton('Start AIO F2P Account Builder');
  startButton.setBackground(buttonBg);
  startButton.setForeground(buttonFg);
  startButton.setFont(new java.awt.Font('Dialog', java.awt.Font.BOLD, 15));
  startButton.setFocusPainted(false);
  startButton.setPreferredSize(new java.awt.Dimension(0, 44));
  startButton.setBorder(javax.swing.BorderFactory.createLineBorder(accent, 1));
  buttonPanel.add(startButton, java.awt.BorderLayout.CENTER);
  var footerLabel = label('ThePlug RLPL BotMaker • Created by xulixna • Discord', false, muted, 11);
  footerLabel.setHorizontalAlignment(0);
  buttonPanel.add(footerLabel, java.awt.BorderLayout.SOUTH);
  footer.add(buttonPanel, java.awt.BorderLayout.SOUTH);
  mainPanel.add(footer, java.awt.BorderLayout.SOUTH);
  var updateStartButtonText = () => {
    var chosen = getChosenCategories();
    if (chosen.length === 0) {
      startButton.setText('Select at least one task in the queue');
    } else if (chosen.length === 1) {
      startButton.setText('Start ' + chosen[0] + ' Automation');
    } else {
      startButton.setText("Start AIO F2P Account Builder (".concat(chosen.length, " Tasks Queued: ").concat(chosen.slice(0, 3).join(', ')).concat(chosen.length > 3 ? '...' : '', ")"));
    }
  };
  startButton.addActionListener(() => {
    var _monsterCombo$getSele, _combatFoodCombo$getS, _rangedMonsterCombo$g, _bowCombo$getSelected, _arrowCombo$getSelect, _spellCombo$getSelect, _splashCombo$getSelec, _staffCombo$getSelect, _cookingFoodCombo$get, _cookingRangeCombo$ge, _craftItemCombo$getSe, _fmLogCombo$getSelect, _fishLocCombo$getSele, _miningOreCombo$getSe, _miningLocCombo$getSe, _rcRuneCombo$getSelec, _smithingRecipeCombo$, _smithingLocCombo$get, _treeCombo$getSelecte, _wcLocCombo$getSelect, _mmCombo$getSelectedI;
    var chosen = getChosenCategories();
    if (chosen.length === 0) {
      javax.swing.JOptionPane.showMessageDialog(frame, 'Please check at least one skill or activity in the Execution Queue & Nav sidebar.', 'Queue Empty', javax.swing.JOptionPane.WARNING_MESSAGE);
      return;
    }
    var parseNumber = (text, def) => {
      var n = parseInt(text.trim(), 10);
      return isNaN(n) ? def : Math.max(0, n);
    };
    var playStyle = fastRadio.isSelected() ? 'fast' : lazyRadio.isSelected() ? 'lazy' : 'normal';
    var selectedQuestList = [];
    var _iterator1 = _createForOfIteratorHelper(F2P_QUESTS),
      _step1;
    try {
      for (_iterator1.s(); !(_step1 = _iterator1.n()).done;) {
        var _questCheckboxes$q$na;
        var q = _step1.value;
        if ((_questCheckboxes$q$na = questCheckboxes[q.name]) !== null && _questCheckboxes$q$na !== void 0 && _questCheckboxes$q$na.isSelected()) {
          selectedQuestList.push(q.name);
        }
      }
    } catch (err) {
      _iterator1.e(err);
    } finally {
      _iterator1.f();
    }
    if (chosen.includes('Quests') && selectedQuestList.length === 0) {
      javax.swing.JOptionPane.showMessageDialog(frame, 'You included Quests in the queue, but did not select any quests in the Quests tab.\nPlease check at least one quest.', 'No Quests Selected', javax.swing.JOptionPane.WARNING_MESSAGE);
      selectCategory('Quests');
      return;
    }
    var settings = {
      enabledCategories: chosen,
      general: {
        playStyle,
        targetTotalLevel: parseNumber(String(totalLevelField.getText()), 0),
        takeBreaks: takeBreaksCb.isSelected(),
        cameraMovement: cameraMoveCb.isSelected(),
        noobMode: noobModeCb.isSelected(),
        strictLevelGoals: strictGoalsCb.isSelected()
      },
      combat: {
        targetAttack: parseNumber(String(atkField.getText()), 40),
        targetStrength: parseNumber(String(strField.getText()), 40),
        targetDefence: parseNumber(String(defField.getText()), 40),
        combatOrder: (_combatOrderCombo$get => {
          var raw = String((_combatOrderCombo$get = combatOrderCombo.getSelectedItem()) !== null && _combatOrderCombo$get !== void 0 ? _combatOrderCombo$get : '');
          if (raw.includes('Attack -> Strength')) return 'atk_str_def';
          if (raw.includes('Strength -> Attack')) return 'str_atk_def';
          if (raw.includes('Focus')) return 'focus';
          return 'balanced';
        })(),
        monster: String((_monsterCombo$getSele = monsterCombo.getSelectedItem()) !== null && _monsterCombo$getSele !== void 0 ? _monsterCombo$getSele : 'Chickens (Lumbridge)'),
        food: String((_combatFoodCombo$getS = combatFoodCombo.getSelectedItem()) !== null && _combatFoodCombo$getS !== void 0 ? _combatFoodCombo$getS : 'Trout'),
        eatAtHp: parseNumber(String(eatHpField.getText()), 50),
        lootCoins: lootCoinsCb.isSelected(),
        lootRunes: lootRunesCb.isSelected(),
        lootBones: lootBonesCb.isSelected(),
        buryBones: buryBonesCb.isSelected()
      },
      ranged: {
        targetLevel: parseNumber(String(rangedTargetField.getText()), 40),
        trainDefence: rangedTrainDefCb.isSelected(),
        monster: String((_rangedMonsterCombo$g = rangedMonsterCombo.getSelectedItem()) !== null && _rangedMonsterCombo$g !== void 0 ? _rangedMonsterCombo$g : 'Cows (Lumbridge)'),
        bow: String((_bowCombo$getSelected = bowCombo.getSelectedItem()) !== null && _bowCombo$getSelected !== void 0 ? _bowCombo$getSelected : 'Oak shortbow'),
        arrow: String((_arrowCombo$getSelect = arrowCombo.getSelectedItem()) !== null && _arrowCombo$getSelect !== void 0 ? _arrowCombo$getSelect : 'Iron arrow'),
        safeSpot: rangedSafeSpotCb.isSelected()
      },
      magic: {
        targetLevel: parseNumber(String(magicTargetField.getText()), 25),
        trainDefence: magicTrainDefCb.isSelected(),
        method: 'combat_spells',
        spell: String((_spellCombo$getSelect = spellCombo.getSelectedItem()) !== null && _spellCombo$getSelect !== void 0 ? _spellCombo$getSelect : 'Wind Strike'),
        splashTarget: String((_splashCombo$getSelec = splashCombo.getSelectedItem()) !== null && _splashCombo$getSelec !== void 0 ? _splashCombo$getSelec : 'Rat (Lumbridge)'),
        staff: String((_staffCombo$getSelect = staffCombo.getSelectedItem()) !== null && _staffCombo$getSelect !== void 0 ? _staffCombo$getSelect : 'Staff of Air')
      },
      prayer: {
        targetLevel: parseNumber(String(prayerTargetField.getText()), 31),
        method: 'collect_and_bury'
      },
      cooking: {
        targetLevel: parseNumber(String(cookingTargetField.getText()), 40),
        food: String((_cookingFoodCombo$get = cookingFoodCombo.getSelectedItem()) !== null && _cookingFoodCombo$get !== void 0 ? _cookingFoodCombo$get : 'Raw trout'),
        progressive: cookingProgCb.isSelected(),
        location: String((_cookingRangeCombo$ge = cookingRangeCombo.getSelectedItem()) !== null && _cookingRangeCombo$ge !== void 0 ? _cookingRangeCombo$ge : 'Al-Kharid range'),
        dropBurnt: dropBurntCb.isSelected()
      },
      crafting: {
        targetLevel: parseNumber(String(craftingTargetField.getText()), 30),
        category: 'leather',
        item: String((_craftItemCombo$getSe = craftItemCombo.getSelectedItem()) !== null && _craftItemCombo$getSe !== void 0 ? _craftItemCombo$getSe : 'Leather gloves')
      },
      firemaking: {
        targetLevel: parseNumber(String(fmTargetField.getText()), 30),
        log: String((_fmLogCombo$getSelect = fmLogCombo.getSelectedItem()) !== null && _fmLogCombo$getSelect !== void 0 ? _fmLogCombo$getSelect : 'Oak logs'),
        mode: 'lines'
      },
      fishing: {
        targetLevel: parseNumber(String(fishTargetField.getText()), 40),
        method: 'shrimp_anchovies',
        location: String((_fishLocCombo$getSele = fishLocCombo.getSelectedItem()) !== null && _fishLocCombo$getSele !== void 0 ? _fishLocCombo$getSele : 'Lumbridge Swamp'),
        dropFish: dropFishCb.isSelected()
      },
      mining: {
        targetLevel: parseNumber(String(miningTargetField.getText()), 40),
        ore: String((_miningOreCombo$getSe = miningOreCombo.getSelectedItem()) !== null && _miningOreCombo$getSe !== void 0 ? _miningOreCombo$getSe : 'Copper & Tin'),
        location: String((_miningLocCombo$getSe = miningLocCombo.getSelectedItem()) !== null && _miningLocCombo$getSe !== void 0 ? _miningLocCombo$getSe : 'Lumbridge Swamp'),
        dropOre: dropOreCb.isSelected()
      },
      runecrafting: {
        targetLevel: parseNumber(String(rcTargetField.getText()), 20),
        rune: String((_rcRuneCombo$getSelec = rcRuneCombo.getSelectedItem()) !== null && _rcRuneCombo$getSelec !== void 0 ? _rcRuneCombo$getSelec : 'Air'),
        mode: 'runes'
      },
      smithing: {
        targetLevel: parseNumber(String(smithingTargetField.getText()), 35),
        method: 'smelting',
        barOrItem: String((_smithingRecipeCombo$ = smithingRecipeCombo.getSelectedItem()) !== null && _smithingRecipeCombo$ !== void 0 ? _smithingRecipeCombo$ : 'Bronze Bar'),
        location: String((_smithingLocCombo$get = smithingLocCombo.getSelectedItem()) !== null && _smithingLocCombo$get !== void 0 ? _smithingLocCombo$get : 'Al-Kharid furnace')
      },
      woodcutting: {
        targetLevel: parseNumber(String(wcTargetField.getText()), 40),
        tree: String((_treeCombo$getSelecte = treeCombo.getSelectedItem()) !== null && _treeCombo$getSelecte !== void 0 ? _treeCombo$getSelecte : 'Oak trees'),
        location: String((_wcLocCombo$getSelect = wcLocCombo.getSelectedItem()) !== null && _wcLocCombo$getSelect !== void 0 ? _wcLocCombo$getSelect : 'Lumbridge'),
        dropLogs: dropLogsCb.isSelected()
      },
      quests: {
        selectedQuests: selectedQuestList,
        stopOnQuestPoints: parseNumber(String(qpTargetField.getText()), 10)
      },
      moneymaking: {
        method: String((_mmCombo$getSelectedI = mmCombo.getSelectedItem()) !== null && _mmCombo$getSelectedI !== void 0 ? _mmCombo$getSelectedI : 'Tan Cowhides (Al-Kharid)'),
        targetGp: parseNumber(String(mmGpField.getText()), 50000)
      }
    };
    saveSettings(settings);
    closeWindow();
    submitted = settings;
  });
  selectCategory('Combat');
  updateStartButtonText();
  frame.add(mainPanel);
  frame.setSize(1200, 820);
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
  getSkillExperience: skill => {
    try {
      if (typeof client.getSkillExperience === 'function') {
        return client.getSkillExperience(skill) || 0;
      }
    } catch (_unused3) {}
    return 0;
  },
  getTotalLevel: () => {
    try {
      if (typeof client.getTotalLevel === 'function') {
        return client.getTotalLevel() || 0;
      }
    } catch (_unused4) {}
    return 0;
  },
  getHpPercent: () => {
    try {
      var currHp = client.getBoostedSkillLevel(net.runelite.api.Skill.HITPOINTS);
      var maxHp = Math.max(1, client.getRealSkillLevel(net.runelite.api.Skill.HITPOINTS));
      return Math.floor(currHp / maxHp * 100);
    } catch (_unused5) {
      return 100;
    }
  },
  getQuestPoints: () => {
    try {
      if (typeof client.getVarpValue === 'function') {
        return client.getVarpValue(101) || 0;
      }
    } catch (_unused6) {}
    return 0;
  },
  isIdle: () => bot.localPlayerIdle(),
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
    var booths = bot.objects.getTileObjectsWithNames(['Bank booth', 'Open bank booth', 'Bank chest']);
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
      var action = name.toLowerCase().includes('chest') ? 'Use' : 'Bank';
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
      var keepSet = new Set(keepIds);
      var heldIds = bot.inventory.getAllWidgets();
      if (heldIds && Array.isArray(heldIds)) {
        var _iterator = _createForOfIteratorHelper(heldIds),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _item$getItemId, _item$getItemId2;
            var item = _step.value;
            var id = (_item$getItemId = item === null || item === void 0 || (_item$getItemId2 = item.getItemId) === null || _item$getItemId2 === void 0 ? void 0 : _item$getItemId2.call(item)) !== null && _item$getItemId !== void 0 ? _item$getItemId : item === null || item === void 0 ? void 0 : item.id;
            if (id && !keepSet.has(id)) {
              bot.bank.depositAllWithId(id);
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
  isInventoryFull: () => bot.inventory.isFull(),
  getInventoryQuantity: id => bot.inventory.getQuantityOfId(id),
  getBankQuantity: id => bot.bank.getQuantityOfId(id),
  isWebWalking: () => bot.walking.isWebWalking(),
  isNear: function isNear(point) {
    var _client$getLocalPlaye2;
    var maxDistance = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
    var loc = (_client$getLocalPlaye2 = client.getLocalPlayer()) === null || _client$getLocalPlaye2 === void 0 ? void 0 : _client$getLocalPlaye2.getWorldLocation();
    if (!loc || !point) return false;
    if (loc.getPlane() !== point.getPlane()) return false;
    return loc.distanceTo(point) <= maxDistance;
  },
  webWalkTo: point => {
    if (game.isNear(point, 2)) {
      game.stopWebWalk();
      return;
    }
    bot.walking.webWalkStart(point);
  },
  webWalkToNearestBank: () => {
    bot.walking.webWalkToNearestBank();
  },
  stopWebWalk: () => {
    try {
      bot.walking.webWalkCancel();
    } catch (_unused7) {}
  },
  isDialogueOpen: () => {
    try {
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
        } catch (_unused8) {}
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
    } catch (_unused9) {
      return false;
    }
  },
  handleDialogue: function handleDialogue() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    try {
      var commonOptions = ["I'd like to access my bank account, please.", 'Yes.', 'Continue', "What's wrong?", "I'm always happy to help a cook.", 'Actually, I know where to find this stuff.', "I've got all the ingredients right here!", "Here's a bucket of milk.", "Here's a pot of flour.", "Here's an egg.", "Yes, I've got them all here.", 'I am looking for a quest.', "Yes, okay. I'll do it.", 'Yes, I will help you.', 'Yes, I am ready.', 'Can I help at all?', 'I need an extra pot of flour.', 'Yes, of course.', "Okay, I'll shear them.", 'I have sheep shears.'];
      var opts = options.length > 0 ? options : commonOptions;
      return bot.widgets.handleDialogue(opts);
    } catch (_unused0) {
      return false;
    }
  },
  log: message => bot.printLogMessage('[AIO Account Builder] ' + message),
  gameMessage: message => bot.printGameMessage('[AIO Account Builder] ' + message),
  setCounter: (name, value) => bot.counters.setCounter(name, value),
  terminate: () => bot.terminate()
};

var DelayManager = /*#__PURE__*/function () {
  function DelayManager() {
    _classCallCheck(this, DelayManager);
    _defineProperty(this, "delayTicks", 0);
  }
  return _createClass(DelayManager, [{
    key: "isBusy",
    value: function isBusy() {
      return this.delayTicks > 0;
    }
  }, {
    key: "tick",
    value: function tick() {
      if (this.delayTicks > 0) {
        this.delayTicks--;
      }
    }
  }, {
    key: "setDelay",
    value: function setDelay(ticks) {
      if (ticks > this.delayTicks) {
        this.delayTicks = ticks;
      }
    }
  }, {
    key: "getRemaining",
    value: function getRemaining() {
      return this.delayTicks;
    }
  }], [{
    key: "getReactionTicks",
    value: function getReactionTicks(playStyle) {
      var noobMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var totalLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;
      var base;
      switch (playStyle) {
        case 'fast':
          base = Math.floor(Math.random() * 2) + 1;
          break;
        case 'lazy':
          base = Math.floor(Math.random() * 4) + 4;
          break;
        case 'normal':
        default:
          base = Math.floor(Math.random() * 3) + 2;
          break;
      }
      if (noobMode && totalLevel < 120) {
        if (totalLevel < 50) {
          var hesitation = Math.random() < 0.12 ? Math.floor(Math.random() * 3) + 2 : 0;
          return base + Math.floor(Math.random() * 3) + 1 + hesitation;
        } else {
          return base + Math.floor(Math.random() * 2);
        }
      }
      return base;
    }
  }]);
}();

var QuestHelper = /*#__PURE__*/function () {
  function QuestHelper() {
    _classCallCheck(this, QuestHelper);
  }
  return _createClass(QuestHelper, null, [{
    key: "getVarp",
    value: function getVarp(varpId) {
      try {
        if (typeof client.getVarpValue === 'function') {
          return client.getVarpValue(varpId) || 0;
        }
      } catch (_unused) {}
      return 0;
    }
  }, {
    key: "isVarpAtLeast",
    value: function isVarpAtLeast(varpId, expected) {
      return this.getVarp(varpId) >= expected;
    }
  }, {
    key: "isNear",
    value: function isNear(target) {
      var _client$getLocalPlaye;
      var maxDistance = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
      var loc = (_client$getLocalPlaye = client.getLocalPlayer()) === null || _client$getLocalPlaye === void 0 ? void 0 : _client$getLocalPlaye.getWorldLocation();
      if (!loc) return false;
      if (loc.getPlane() !== target.getPlane()) return false;
      return loc.distanceTo(target) <= maxDistance;
    }
  }, {
    key: "walkTo",
    value: function walkTo(game, target) {
      var tolerance = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3;
      if (game.isDialogueOpen()) {
        game.stopWebWalk();
        game.handleDialogue();
        return;
      }
      if (this.isNear(target, tolerance)) {
        game.stopWebWalk();
        return;
      }
      if (game.isWebWalking() || game.isMoving()) {
        return;
      }
      var now = Date.now();
      if (this.lastWalkTarget && this.lastWalkTarget.getX() === target.getX() && this.lastWalkTarget.getY() === target.getY() && this.lastWalkTarget.getPlane() === target.getPlane() && now - this.lastWalkTime < 4000) {
        return;
      }
      this.lastWalkTarget = target;
      this.lastWalkTime = now;
      game.webWalkTo(target);
    }
  }, {
    key: "talkToNpc",
    value: function talkToNpc(game, npcName, standPoint) {
      var _client$getLocalPlaye2, _playerLoc$getPlane;
      if (game.isDialogueOpen()) {
        game.stopWebWalk();
        game.handleDialogue();
        return true;
      }
      var npcs = bot.npcs.getWithNames([npcName]);
      var playerLoc = (_client$getLocalPlaye2 = client.getLocalPlayer()) === null || _client$getLocalPlaye2 === void 0 ? void 0 : _client$getLocalPlaye2.getWorldLocation();
      var playerPlane = (_playerLoc$getPlane = playerLoc === null || playerLoc === void 0 ? void 0 : playerLoc.getPlane()) !== null && _playerLoc$getPlane !== void 0 ? _playerLoc$getPlane : 0;
      var visibleNpc = (npcs || []).find(n => {
        var _n$getWorldLocation;
        var loc = n === null || n === void 0 || (_n$getWorldLocation = n.getWorldLocation) === null || _n$getWorldLocation === void 0 ? void 0 : _n$getWorldLocation.call(n);
        return loc && loc.getPlane() === playerPlane && (!playerLoc || playerLoc.distanceTo(loc) <= 8);
      });
      if (visibleNpc) {
        game.stopWebWalk();
        var key = 'talk_' + npcName;
        var now = Date.now();
        if (this.lastActionKey === key && now - this.lastActionTime < 2500) {
          if (game.isDialogueOpen()) {
            game.handleDialogue();
          }
          return true;
        }
        this.lastActionKey = key;
        this.lastActionTime = now;
        bot.npcs.interactSupplied(visibleNpc, 'Talk-to');
        return true;
      }
      if (standPoint && !this.isNear(standPoint, 4)) {
        this.walkTo(game, standPoint, 3);
        return false;
      }
      game.stopWebWalk();
      return false;
    }
  }, {
    key: "interactObject",
    value: function interactObject(game, objectName, action, standPoint) {
      var _client$getLocalPlaye3, _playerLoc$getPlane2;
      if (game.isDialogueOpen()) {
        game.stopWebWalk();
        game.handleDialogue();
        return true;
      }
      var objects = bot.objects.getTileObjectsWithNames([objectName]);
      var playerLoc = (_client$getLocalPlaye3 = client.getLocalPlayer()) === null || _client$getLocalPlaye3 === void 0 ? void 0 : _client$getLocalPlaye3.getWorldLocation();
      var playerPlane = (_playerLoc$getPlane2 = playerLoc === null || playerLoc === void 0 ? void 0 : playerLoc.getPlane()) !== null && _playerLoc$getPlane2 !== void 0 ? _playerLoc$getPlane2 : 0;
      var visibleObj = (objects || []).find(o => {
        var _o$getWorldLocation;
        var loc = o === null || o === void 0 || (_o$getWorldLocation = o.getWorldLocation) === null || _o$getWorldLocation === void 0 ? void 0 : _o$getWorldLocation.call(o);
        return loc && loc.getPlane() === playerPlane && (!playerLoc || playerLoc.distanceTo(loc) <= 7);
      });
      if (visibleObj) {
        game.stopWebWalk();
        var key = 'obj_' + objectName + '_' + action;
        var now = Date.now();
        if (this.lastActionKey === key && now - this.lastActionTime < 2500) {
          return true;
        }
        this.lastActionKey = key;
        this.lastActionTime = now;
        bot.objects.interactSuppliedObject(visibleObj, action);
        return true;
      }
      if (standPoint && !this.isNear(standPoint, 4)) {
        this.walkTo(game, standPoint, 3);
        return false;
      }
      game.stopWebWalk();
      return false;
    }
  }, {
    key: "interactObjectId",
    value: function interactObjectId(game, objectId, action, standPoint) {
      var _client$getLocalPlaye4, _playerLoc$getPlane3;
      if (game.isDialogueOpen()) {
        game.stopWebWalk();
        game.handleDialogue();
        return true;
      }
      var objects = bot.objects.getTileObjectsWithIds([objectId]);
      var playerLoc = (_client$getLocalPlaye4 = client.getLocalPlayer()) === null || _client$getLocalPlaye4 === void 0 ? void 0 : _client$getLocalPlaye4.getWorldLocation();
      var playerPlane = (_playerLoc$getPlane3 = playerLoc === null || playerLoc === void 0 ? void 0 : playerLoc.getPlane()) !== null && _playerLoc$getPlane3 !== void 0 ? _playerLoc$getPlane3 : 0;
      var visibleObj = (objects || []).find(o => {
        var _o$getWorldLocation2;
        var loc = o === null || o === void 0 || (_o$getWorldLocation2 = o.getWorldLocation) === null || _o$getWorldLocation2 === void 0 ? void 0 : _o$getWorldLocation2.call(o);
        return loc && loc.getPlane() === playerPlane && (!playerLoc || playerLoc.distanceTo(loc) <= 7);
      });
      if (visibleObj) {
        game.stopWebWalk();
        var key = 'objId_' + objectId + '_' + action;
        var now = Date.now();
        if (this.lastActionKey === key && now - this.lastActionTime < 2500) {
          return true;
        }
        this.lastActionKey = key;
        this.lastActionTime = now;
        bot.objects.interactSuppliedObject(visibleObj, action);
        return true;
      }
      if (standPoint && !this.isNear(standPoint, 4)) {
        this.walkTo(game, standPoint, 3);
        return false;
      }
      game.stopWebWalk();
      return false;
    }
  }, {
    key: "lootItem",
    value: function lootItem(game, itemName, spawnPoint) {
      var _client$getLocalPlaye5, _playerLoc$getPlane4;
      var tolerance = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 3;
      if (game.isDialogueOpen()) {
        game.stopWebWalk();
        game.handleDialogue();
        return true;
      }
      var nearbyItems = bot.tileItems.getItemsWithNames([itemName]);
      var playerLoc = (_client$getLocalPlaye5 = client.getLocalPlayer()) === null || _client$getLocalPlaye5 === void 0 ? void 0 : _client$getLocalPlaye5.getWorldLocation();
      var playerPlane = (_playerLoc$getPlane4 = playerLoc === null || playerLoc === void 0 ? void 0 : playerLoc.getPlane()) !== null && _playerLoc$getPlane4 !== void 0 ? _playerLoc$getPlane4 : 0;
      var validNearby = (nearbyItems || []).find(it => {
        var _it$getWorldLocation;
        var loc = it === null || it === void 0 || (_it$getWorldLocation = it.getWorldLocation) === null || _it$getWorldLocation === void 0 ? void 0 : _it$getWorldLocation.call(it);
        return loc && loc.getPlane() === playerPlane && (!playerLoc || playerLoc.distanceTo(loc) <= 12);
      });
      if (validNearby) {
        game.stopWebWalk();
        var key = 'loot_' + itemName;
        var now = Date.now();
        if (this.lastActionKey === key && now - this.lastActionTime < 2500) {
          return true;
        }
        this.lastActionKey = key;
        this.lastActionTime = now;
        bot.tileItems.lootItemsWithNames([itemName], 12);
        return true;
      }
      if (spawnPoint && !this.isNear(spawnPoint, tolerance)) {
        this.walkTo(game, spawnPoint, tolerance);
        return false;
      }
      game.stopWebWalk();
      return false;
    }
  }, {
    key: "hasItem",
    value: function hasItem(game, itemId) {
      var minCount = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var name = arguments.length > 3 ? arguments[3] : undefined;
      try {
        if (game.getInventoryQuantity(itemId) >= minCount) return true;
        if (bot.inventory.containsId(itemId)) return true;
        if (name) {
          if (bot.inventory.containsName(name)) return true;
          if (bot.inventory.getQuantityOfName(name) >= minCount) return true;
        }
      } catch (_unused2) {}
      return false;
    }
  }, {
    key: "hasBankItem",
    value: function hasBankItem(game, itemId) {
      var minCount = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var name = arguments.length > 3 ? arguments[3] : undefined;
      try {
        if (!game.isBankOpen()) return false;
        if (game.getBankQuantity(itemId) >= minCount) return true;
        if (name && bot.bank.getQuantityOfName(name) >= minCount) return true;
      } catch (_unused3) {}
      return false;
    }
  }, {
    key: "withdrawOrPrepare",
    value: function withdrawOrPrepare(game, items) {
      var allInInventory = items.every(i => this.hasItem(game, i.id, i.quantity, i.name));
      if (allInInventory) {
        if (game.isBankOpen()) {
          game.closeBank();
        }
        return true;
      }
      if (game.isDialogueOpen()) {
        game.stopWebWalk();
        game.handleDialogue();
        return false;
      }
      if (game.isMoving() || game.isWebWalking()) {
        return false;
      }
      if (!game.isBankOpen()) {
        var now = Date.now();
        if (this.lastActionKey === 'open_bank' && now - this.lastActionTime < 3000) {
          return false;
        }
        this.lastActionKey = 'open_bank';
        this.lastActionTime = now;
        game.log('Opening bank to check quest supplies...');
        game.openBank();
        return false;
      }
      game.stopWebWalk();
      var keepIds = items.map(i => i.id);
      var neededItems = items.filter(i => !this.hasItem(game, i.id, i.quantity, i.name));
      if (game.getEmptySlots() < neededItems.length) {
        game.log('Depositing unnecessary items to make room for quest supplies...');
        game.depositAllExcept(keepIds);
        return false;
      }
      var anyMissing = false;
      var _iterator = _createForOfIteratorHelper(items),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var item = _step.value;
          var hasCount = game.getInventoryQuantity(item.id);
          var needed = item.quantity - hasCount;
          if (needed > 0) {
            if (game.getBankQuantity(item.id) >= needed) {
              game.withdrawQuantity(item.id, needed);
            } else if (item.name && bot.bank.getQuantityOfName(item.name) >= needed) {
              bot.bank.withdrawQuantityWithId(item.id, needed);
            } else {
              anyMissing = true;
            }
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return !anyMissing;
    }
  }]);
}();
_defineProperty(QuestHelper, "lastActionTime", 0);
_defineProperty(QuestHelper, "lastActionKey", '');
_defineProperty(QuestHelper, "lastWalkTarget", null);
_defineProperty(QuestHelper, "lastWalkTime", 0);

var VARP_COOKS_ASSISTANT = 29;
var ITEM_EGG = 1944;
var ITEM_BUCKET_OF_MILK = 1927;
var ITEM_POT_OF_FLOUR = 1933;
var ITEM_EMPTY_POT = 1931;
var ITEM_EMPTY_BUCKET = 1925;
var ITEM_GRAIN = 1947;
var POINT_COOK = new net.runelite.api.coords.WorldPoint(3207, 3214, 0);
var POINT_POT_KITCHEN = new net.runelite.api.coords.WorldPoint(3208, 3214, 0);
var POINT_BUCKET_FARM = new net.runelite.api.coords.WorldPoint(3225, 3294, 0);
var POINT_EGG = new net.runelite.api.coords.WorldPoint(3230, 3299, 0);
var POINT_DAIRY_COW = new net.runelite.api.coords.WorldPoint(3254, 3270, 0);
var POINT_WHEAT = new net.runelite.api.coords.WorldPoint(3161, 3295, 0);
var POINT_WINDMILL_GROUND = new net.runelite.api.coords.WorldPoint(3166, 3307, 0);
var checkedBankForCook = false;
var CooksAssistantQuest = {
  key: 'CooksAssistant',
  name: "Cook's Assistant",
  varpId: VARP_COOKS_ASSISTANT,
  completedValue: 2,
  questPoints: 1,
  requiredItems: [{
    id: ITEM_EGG,
    name: 'Egg',
    quantity: 1
  }, {
    id: ITEM_BUCKET_OF_MILK,
    name: 'Bucket of milk',
    quantity: 1
  }, {
    id: ITEM_POT_OF_FLOUR,
    name: 'Pot of flour',
    quantity: 1
  }],
  isCompleted(game) {
    return QuestHelper.isVarpAtLeast(VARP_COOKS_ASSISTANT, 2);
  },
  getSteps() {
    return [{
      description: 'Talk to Cook in Lumbridge Castle to start quest',
      isCompleted: game => {
        return QuestHelper.isVarpAtLeast(VARP_COOKS_ASSISTANT, 1);
      },
      execute: game => {
        checkedBankForCook = false;
        game.log("Starting Cook's Assistant with Cook in kitchen...");
        return QuestHelper.talkToNpc(game, 'Cook', POINT_COOK);
      }
    }, {
      description: 'Prepare or gather quest supplies',
      isCompleted: game => {
        return QuestHelper.hasItem(game, ITEM_EGG, 1, 'Egg') && QuestHelper.hasItem(game, ITEM_BUCKET_OF_MILK, 1, 'Bucket of milk') && QuestHelper.hasItem(game, ITEM_POT_OF_FLOUR, 1, 'Pot of flour');
      },
      execute: game => {
        var hasEgg = QuestHelper.hasItem(game, ITEM_EGG, 1, 'Egg');
        var hasMilk = QuestHelper.hasItem(game, ITEM_BUCKET_OF_MILK, 1, 'Bucket of milk');
        var hasFlour = QuestHelper.hasItem(game, ITEM_POT_OF_FLOUR, 1, 'Pot of flour');
        if (hasEgg && hasMilk && hasFlour) {
          game.log("Already have all 3 quest supplies (Egg, Milk, Flour)! Proceeding to deliver to Cook.");
          return true;
        }
        if (!checkedBankForCook) {
          if (!game.isBankOpen()) {
            game.log('Opening bank to check for quest supplies (Egg, Milk, Flour)...');
            game.openBank();
            return false;
          }
          game.stopWebWalk();
          game.log('Bank is open. Checking contents for quest supplies...');
          var keepItems = [ITEM_EGG, ITEM_BUCKET_OF_MILK, ITEM_POT_OF_FLOUR, ITEM_EMPTY_BUCKET, ITEM_EMPTY_POT, ITEM_GRAIN];
          if (game.getEmptySlots() < 5) {
            game.log('Depositing non-quest items to make room for supplies...');
            game.depositAllExcept(keepItems);
          }
          if (!hasEgg && (game.getBankQuantity(ITEM_EGG) > 0 || bot.bank.getQuantityOfName('Egg') > 0)) {
            game.log('Withdrawing Egg from bank...');
            if (game.getBankQuantity(ITEM_EGG) > 0) game.withdrawQuantity(ITEM_EGG, 1);else bot.bank.withdrawWithName('Egg');
          }
          if (!hasMilk && (game.getBankQuantity(ITEM_BUCKET_OF_MILK) > 0 || bot.bank.getQuantityOfName('Bucket of milk') > 0)) {
            game.log('Withdrawing Bucket of milk from bank...');
            if (game.getBankQuantity(ITEM_BUCKET_OF_MILK) > 0) game.withdrawQuantity(ITEM_BUCKET_OF_MILK, 1);else bot.bank.withdrawWithName('Bucket of milk');
          }
          if (!hasFlour && (game.getBankQuantity(ITEM_POT_OF_FLOUR) > 0 || bot.bank.getQuantityOfName('Pot of flour') > 0)) {
            game.log('Withdrawing Pot of flour from bank...');
            if (game.getBankQuantity(ITEM_POT_OF_FLOUR) > 0) game.withdrawQuantity(ITEM_POT_OF_FLOUR, 1);else bot.bank.withdrawWithName('Pot of flour');
          }
          if (!hasFlour && (game.getBankQuantity(ITEM_EMPTY_POT) > 0 || bot.bank.getQuantityOfName('Pot') > 0)) {
            game.log('Withdrawing empty Pot from bank...');
            if (game.getBankQuantity(ITEM_EMPTY_POT) > 0) game.withdrawQuantity(ITEM_EMPTY_POT, 1);else bot.bank.withdrawWithName('Pot');
          }
          if (!hasMilk && (game.getBankQuantity(ITEM_EMPTY_BUCKET) > 0 || bot.bank.getQuantityOfName('Bucket') > 0)) {
            game.log('Withdrawing empty Bucket from bank...');
            if (game.getBankQuantity(ITEM_EMPTY_BUCKET) > 0) game.withdrawQuantity(ITEM_EMPTY_BUCKET, 1);else bot.bank.withdrawWithName('Bucket');
          }
          checkedBankForCook = true;
          game.closeBank();
          return true;
        }
        if (!QuestHelper.hasItem(game, ITEM_POT_OF_FLOUR, 1, 'Pot of flour') && !QuestHelper.hasItem(game, ITEM_EMPTY_POT, 1, 'Pot')) {
          game.log('Collecting empty Pot from kitchen table...');
          return QuestHelper.lootItem(game, 'Pot', POINT_POT_KITCHEN, 3);
        }
        if (!QuestHelper.hasItem(game, ITEM_EGG, 1, 'Egg')) {
          game.log('Collecting Egg from chicken coop...');
          return QuestHelper.lootItem(game, 'Egg', POINT_EGG, 3);
        }
        if (!QuestHelper.hasItem(game, ITEM_BUCKET_OF_MILK, 1, 'Bucket of milk')) {
          if (!QuestHelper.hasItem(game, ITEM_EMPTY_BUCKET, 1, 'Bucket')) {
            game.log('Collecting empty Bucket from farmhouse south of hops patch...');
            return QuestHelper.lootItem(game, 'Bucket', POINT_BUCKET_FARM, 3);
          }
          game.log('Milking dairy cow...');
          return QuestHelper.interactObject(game, 'Dairy cow', 'Milk', POINT_DAIRY_COW);
        }
        if (!QuestHelper.hasItem(game, ITEM_POT_OF_FLOUR, 1, 'Pot of flour')) {
          var _client$getLocalPlaye3, _client$getLocalPlaye4;
          if (!QuestHelper.hasItem(game, ITEM_GRAIN, 1, 'Grain')) {
            var _client$getLocalPlaye, _client$getLocalPlaye2;
            var _playerPlane = (_client$getLocalPlaye = (_client$getLocalPlaye2 = client.getLocalPlayer()) === null || _client$getLocalPlaye2 === void 0 || (_client$getLocalPlaye2 = _client$getLocalPlaye2.getWorldLocation()) === null || _client$getLocalPlaye2 === void 0 ? void 0 : _client$getLocalPlaye2.getPlane()) !== null && _client$getLocalPlaye !== void 0 ? _client$getLocalPlaye : 0;
            if (_playerPlane === 0) {
              var bins = bot.objects.getTileObjectsWithNames(['Flour bin']);
              if (bins && bins.length > 0 && QuestHelper.isNear(POINT_WINDMILL_GROUND, 10)) {
                game.log('Emptying flour bin...');
                bot.objects.interactSuppliedObject(bins[0], 'Empty');
                return true;
              }
            }
            game.log('Picking grain from wheat field...');
            return QuestHelper.interactObject(game, 'Wheat', 'Pick', POINT_WHEAT);
          }
          var playerPlane = (_client$getLocalPlaye3 = (_client$getLocalPlaye4 = client.getLocalPlayer()) === null || _client$getLocalPlaye4 === void 0 || (_client$getLocalPlaye4 = _client$getLocalPlaye4.getWorldLocation()) === null || _client$getLocalPlaye4 === void 0 ? void 0 : _client$getLocalPlaye4.getPlane()) !== null && _client$getLocalPlaye3 !== void 0 ? _client$getLocalPlaye3 : 0;
          if (playerPlane === 0) {
            game.log('Climbing windmill ground ladder...');
            return QuestHelper.interactObject(game, 'Ladder', 'Climb-up', POINT_WINDMILL_GROUND);
          } else if (playerPlane === 1) {
            game.log('Climbing windmill middle ladder...');
            return QuestHelper.interactObject(game, 'Ladder', 'Climb-up');
          } else if (playerPlane === 2) {
            var hoppers = bot.objects.getTileObjectsWithNames(['Hopper']);
            if (hoppers && hoppers.length > 0) {
              game.log('Putting grain into Hopper...');
              bot.inventory.itemOnObjectWithIds(ITEM_GRAIN, hoppers[0]);
            }
            game.log('Operating hopper controls...');
            bot.objects.interactObject('Hopper controls', 'Operate');
            return true;
          }
        }
        return true;
      }
    }, {
      description: 'Talk to Cook in Lumbridge Castle to complete quest',
      isCompleted: game => {
        return QuestHelper.isVarpAtLeast(VARP_COOKS_ASSISTANT, 2);
      },
      execute: game => {
        game.log('Talking to Cook in Lumbridge kitchen to complete quest...');
        return QuestHelper.talkToNpc(game, 'Cook', POINT_COOK);
      }
    }];
  }
};

var VARP_SHEEP_SHEARER = 179;
var ITEM_SHEARS = 1735;
var ITEM_WOOL = 1737;
var ITEM_BALL_OF_WOOL = 1759;
var POINT_FRED = new net.runelite.api.coords.WorldPoint(3189, 3273, 0);
var POINT_SHEEP_PEN = new net.runelite.api.coords.WorldPoint(3202, 3267, 0);
var POINT_SPINNING_WHEEL = new net.runelite.api.coords.WorldPoint(3209, 3213, 1);
var SheepShearerQuest = {
  key: 'SheepShearer',
  name: 'Sheep Shearer',
  varpId: VARP_SHEEP_SHEARER,
  completedValue: 21,
  questPoints: 1,
  requiredItems: [{
    id: ITEM_BALL_OF_WOOL,
    name: 'Ball of wool',
    quantity: 20
  }],
  isCompleted(game) {
    return QuestHelper.isVarpAtLeast(VARP_SHEEP_SHEARER, 21);
  },
  getSteps() {
    return [{
      description: 'Start Sheep Shearer quest with Fred the Farmer',
      isCompleted: game => {
        return QuestHelper.isVarpAtLeast(VARP_SHEEP_SHEARER, 1);
      },
      execute: game => {
        game.log('Talking to Fred the Farmer to start Sheep Shearer...');
        return QuestHelper.talkToNpc(game, 'Fred the Farmer', POINT_FRED);
      }
    }, {
      description: 'Obtain 20 Balls of wool',
      isCompleted: game => {
        return QuestHelper.hasItem(game, ITEM_BALL_OF_WOOL, 20);
      },
      execute: game => {
        if (QuestHelper.hasBankItem(game, ITEM_BALL_OF_WOOL, 20)) {
          return QuestHelper.withdrawOrPrepare(game, [{
            id: ITEM_BALL_OF_WOOL,
            quantity: 20
          }]);
        }
        if (QuestHelper.hasItem(game, ITEM_WOOL, 20)) {
          game.log('Spinning wool at Lumbridge Castle spinning wheel...');
          if (!QuestHelper.isNear(POINT_SPINNING_WHEEL, 5)) {
            QuestHelper.walkTo(game, POINT_SPINNING_WHEEL);
            return false;
          }
          return QuestHelper.interactObject(game, 'Spinning wheel', 'Spin', POINT_SPINNING_WHEEL);
        }
        if (!QuestHelper.hasItem(game, ITEM_SHEARS)) {
          game.log('Buying or taking Shears...');
          return QuestHelper.lootItem(game, 'Shears', POINT_FRED);
        }
        game.log("Shearing sheep (".concat(game.getInventoryQuantity(ITEM_WOOL), "/20 wool)..."));
        if (!QuestHelper.isNear(POINT_SHEEP_PEN, 8)) {
          QuestHelper.walkTo(game, POINT_SHEEP_PEN);
          return false;
        }
        var sheep = bot.npcs.getWithNames(['Sheep']);
        if (sheep && sheep.length > 0) {
          bot.npcs.interactSupplied(sheep[0], 'Shear');
          return true;
        }
        return false;
      }
    }, {
      description: 'Deliver 20 Balls of wool to Fred the Farmer',
      isCompleted: game => {
        return QuestHelper.isVarpAtLeast(VARP_SHEEP_SHEARER, 21);
      },
      execute: game => {
        game.log('Delivering balls of wool to Fred...');
        return QuestHelper.talkToNpc(game, 'Fred the Farmer', POINT_FRED);
      }
    }];
  }
};

var VARP_ROMEO_AND_JULIET = 144;
var ITEM_CADAVA_BERRIES = 753;
var POINT_ROMEO = new net.runelite.api.coords.WorldPoint(3211, 3422, 0);
var POINT_JULIET = new net.runelite.api.coords.WorldPoint(3158, 3425, 1);
var POINT_FATHER_LAWRENCE = new net.runelite.api.coords.WorldPoint(3254, 3483, 0);
var POINT_APOTHECARY = new net.runelite.api.coords.WorldPoint(3195, 3404, 0);
var POINT_CADAVA_BUSH = new net.runelite.api.coords.WorldPoint(3270, 3371, 0);
var RomeoAndJulietQuest = {
  key: 'RomeoAndJuliet',
  name: 'Romeo & Juliet',
  varpId: VARP_ROMEO_AND_JULIET,
  completedValue: 100,
  questPoints: 5,
  requiredItems: [{
    id: ITEM_CADAVA_BERRIES,
    name: 'Cadava berries',
    quantity: 1
  }],
  isCompleted(game) {
    return QuestHelper.isVarpAtLeast(VARP_ROMEO_AND_JULIET, 100);
  },
  getSteps() {
    return [{
      description: 'Talk to Romeo in Varrock Square to begin quest',
      isCompleted: game => {
        return QuestHelper.isVarpAtLeast(VARP_ROMEO_AND_JULIET, 10);
      },
      execute: game => {
        game.log('Talking to Romeo in Varrock Square...');
        return QuestHelper.talkToNpc(game, 'Romeo', POINT_ROMEO);
      }
    }, {
      description: 'Talk to Juliet on the balcony of her house',
      isCompleted: game => {
        return QuestHelper.isVarpAtLeast(VARP_ROMEO_AND_JULIET, 20);
      },
      execute: game => {
        game.log('Talking to Juliet in west Varrock...');
        return QuestHelper.talkToNpc(game, 'Juliet', POINT_JULIET);
      }
    }, {
      description: 'Return message to Romeo in Varrock Square',
      isCompleted: game => {
        return QuestHelper.isVarpAtLeast(VARP_ROMEO_AND_JULIET, 30);
      },
      execute: game => {
        game.log('Delivering Juliet message to Romeo...');
        return QuestHelper.talkToNpc(game, 'Romeo', POINT_ROMEO);
      }
    }, {
      description: 'Talk to Father Lawrence in Varrock Church',
      isCompleted: game => {
        return QuestHelper.isVarpAtLeast(VARP_ROMEO_AND_JULIET, 40);
      },
      execute: game => {
        game.log('Talking to Father Lawrence at Varrock Church...');
        return QuestHelper.talkToNpc(game, 'Father Lawrence', POINT_FATHER_LAWRENCE);
      }
    }, {
      description: 'Obtain Cadava berries & deliver to Apothecary',
      isCompleted: game => {
        return QuestHelper.isVarpAtLeast(VARP_ROMEO_AND_JULIET, 50);
      },
      execute: game => {
        if (!QuestHelper.hasItem(game, ITEM_CADAVA_BERRIES)) {
          if (QuestHelper.hasBankItem(game, ITEM_CADAVA_BERRIES)) {
            return QuestHelper.withdrawOrPrepare(game, [{
              id: ITEM_CADAVA_BERRIES,
              quantity: 1
            }]);
          }
          game.log('Picking Cadava berries south of Varrock...');
          return QuestHelper.interactObject(game, 'Cadava bush', 'Pick-from', POINT_CADAVA_BUSH);
        }
        game.log('Delivering Cadava berries to Apothecary for potion...');
        return QuestHelper.talkToNpc(game, 'Apothecary', POINT_APOTHECARY);
      }
    }, {
      description: 'Deliver Cadava potion to Juliet',
      isCompleted: game => {
        return QuestHelper.isVarpAtLeast(VARP_ROMEO_AND_JULIET, 60);
      },
      execute: game => {
        game.log('Delivering potion to Juliet...');
        return QuestHelper.talkToNpc(game, 'Juliet', POINT_JULIET);
      }
    }, {
      description: 'Talk to Romeo to conclude the tragedy and receive 5 QP',
      isCompleted: game => {
        return QuestHelper.isVarpAtLeast(VARP_ROMEO_AND_JULIET, 100);
      },
      execute: game => {
        game.log('Talking to Romeo to finish quest...');
        return QuestHelper.talkToNpc(game, 'Romeo', POINT_ROMEO);
      }
    }];
  }
};

var QUEST_REGISTRY = {
  "Cook's Assistant": CooksAssistantQuest,
  'Sheep Shearer': SheepShearerQuest,
  'Romeo & Juliet': RomeoAndJulietQuest
};
var getQuestDefinition = name => {
  return QUEST_REGISTRY[name];
};

function createQuestTaskHandler(game, settings, delayManager) {
  var questIndex = 0;
  var activeQuest = null;
  var findNextIncompleteQuest = () => {
    var selected = settings.quests.selectedQuests;
    while (questIndex < selected.length) {
      var name = selected[questIndex];
      var def = getQuestDefinition(name);
      if (!def) {
        game.log("Quest [".concat(name, "] not yet registered. Skipping to next."));
        questIndex++;
        continue;
      }
      if (def.isCompleted(game)) {
        questIndex++;
        continue;
      }
      return def;
    }
    return null;
  };
  return {
    category: 'Quests',
    onStart: () => {
      questIndex = 0;
      activeQuest = null;
      var currentQp = game.getQuestPoints();
      game.log("Initialized Quests task (Current QP: ".concat(currentQp, " / Target: ").concat(settings.quests.stopOnQuestPoints || 'All selected', ")."));
    },
    tick: () => {
      if (game.isDialogueOpen()) {
        game.handleDialogue();
        delayManager.setDelay(2);
        return;
      }
      if (!activeQuest || activeQuest.isCompleted(game)) {
        if (activeQuest && activeQuest.isCompleted(game)) {
          game.gameMessage("\uD83C\uDF89 Completed quest: ".concat(activeQuest.name, " (+").concat(activeQuest.questPoints, " QP)!"));
          game.log("Finished ".concat(activeQuest.name, ". Total QP now: ").concat(game.getQuestPoints(), "."));
          activeQuest = null;
          questIndex++;
        }
        activeQuest = findNextIncompleteQuest();
      }
      if (!activeQuest) {
        return;
      }
      game.setCounter('Quest QP', game.getQuestPoints());
      var steps = activeQuest.getSteps();
      for (var i = 0; i < steps.length; i++) {
        var step = steps[i];
        if (!step.isCompleted(game)) {
          game.log("[".concat(activeQuest.name, "] Step ").concat(i + 1, "/").concat(steps.length, ": ").concat(step.description));
          step.execute(game);
          delayManager.setDelay(DelayManager.getReactionTicks(settings.general.playStyle) + 1);
          return;
        }
      }
    },
    isComplete: () => {
      var targetQp = settings.quests.stopOnQuestPoints;
      if (targetQp > 0 && game.getQuestPoints() >= targetQp) {
        return true;
      }
      var selected = settings.quests.selectedQuests;
      if (selected.length === 0) return true;
      return selected.every(name => {
        var def = getQuestDefinition(name);
        return def ? def.isCompleted(game) : true;
      });
    },
    getStatus: () => {
      var qp = game.getQuestPoints();
      var questName = activeQuest ? activeQuest.name : 'Done';
      return "Quests: ".concat(questName, " (QP: ").concat(qp, ")");
    }
  };
}

var AXES = [{
  id: 1359,
  name: 'Rune axe',
  woodcuttingLevel: 41,
  attackLevel: 40
}, {
  id: 1357,
  name: 'Adamant axe',
  woodcuttingLevel: 31,
  attackLevel: 30
}, {
  id: 1355,
  name: 'Mithril axe',
  woodcuttingLevel: 21,
  attackLevel: 20
}, {
  id: 1361,
  name: 'Black axe',
  woodcuttingLevel: 11,
  attackLevel: 10
}, {
  id: 1353,
  name: 'Steel axe',
  woodcuttingLevel: 6,
  attackLevel: 5
}, {
  id: 1349,
  name: 'Iron axe',
  woodcuttingLevel: 1,
  attackLevel: 1
}, {
  id: 1351,
  name: 'Bronze axe',
  woodcuttingLevel: 1,
  attackLevel: 1
}];
var TREES = [{
  key: 'woodcutting:logs',
  label: 'Normal trees',
  objectNames: ['Tree', 'Evergreen tree', 'Dead tree'],
  level: 1,
  logId: 1511,
  logName: 'Logs',
  defaultSpot: new net.runelite.api.coords.WorldPoint(3190, 3225, 0)
}, {
  key: 'woodcutting:oak',
  label: 'Oak trees',
  objectNames: ['Oak', 'Oak tree'],
  level: 15,
  logId: 1521,
  logName: 'Oak logs',
  defaultSpot: new net.runelite.api.coords.WorldPoint(3190, 3245, 0)
}, {
  key: 'woodcutting:willow',
  label: 'Willow trees',
  objectNames: ['Willow', 'Willow tree'],
  level: 30,
  logId: 1519,
  logName: 'Willow logs',
  defaultSpot: new net.runelite.api.coords.WorldPoint(3085, 3235, 0)
}, {
  key: 'woodcutting:yew',
  label: 'Yew trees',
  objectNames: ['Yew', 'Yew tree'],
  level: 60,
  logId: 1515,
  logName: 'Yew logs',
  defaultSpot: new net.runelite.api.coords.WorldPoint(3085, 3470, 0)
}];

var WcHelper = /*#__PURE__*/function () {
  function WcHelper() {
    _classCallCheck(this, WcHelper);
  }
  return _createClass(WcHelper, null, [{
    key: "hasAxe",
    value: function hasAxe(game) {
      var _iterator = _createForOfIteratorHelper(AXES),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var axe = _step.value;
          if (bot.equipment.containsId(axe.id) || game.getInventoryQuantity(axe.id) > 0) {
            return true;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return false;
    }
  }, {
    key: "getBestUsableAxe",
    value: function getBestUsableAxe(game) {
      var wcLevel = game.getRealLevel(net.runelite.api.Skill.WOODCUTTING);
      var _iterator2 = _createForOfIteratorHelper(AXES),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var axe = _step2.value;
          if (wcLevel >= axe.woodcuttingLevel) {
            if (bot.equipment.containsId(axe.id) || game.getInventoryQuantity(axe.id) > 0 || game.getBankQuantity(axe.id) > 0) {
              return axe;
            }
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      return null;
    }
  }, {
    key: "matchTreeDefinition",
    value: function matchTreeDefinition(label, wcLevel) {
      var match = TREES.find(t => t.label.toLowerCase().includes(label.toLowerCase()) || label.toLowerCase().includes(t.logName.toLowerCase()));
      if (match && wcLevel >= match.level) {
        return match;
      }
      for (var i = TREES.length - 1; i >= 0; i--) {
        if (wcLevel >= TREES[i].level) {
          return TREES[i];
        }
      }
      return TREES[0];
    }
  }, {
    key: "isChopping",
    value: function isChopping() {
      try {
        var player = client.getLocalPlayer();
        if (!player) return false;
        var anim = player.getAnimation();
        return anim === 879 || anim === 877 || anim === 875 || anim === 873 || anim === 871 || anim === 869 || anim === 867 || anim === 865;
      } catch (_unused) {
        return false;
      }
    }
  }, {
    key: "findClosestTree",
    value: function findClosestTree(treeDef) {
      var _client$getLocalPlaye;
      var maxDistance = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 25;
      var objects = bot.objects.getTileObjectsWithNames(treeDef.objectNames);
      if (!objects || objects.length === 0) return null;
      var playerLoc = (_client$getLocalPlaye = client.getLocalPlayer()) === null || _client$getLocalPlaye === void 0 ? void 0 : _client$getLocalPlaye.getWorldLocation();
      if (!playerLoc) return null;
      var closest = null;
      var minDistance = maxDistance;
      var _iterator3 = _createForOfIteratorHelper(objects),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var _obj$getWorldLocation;
          var obj = _step3.value;
          var loc = (_obj$getWorldLocation = obj.getWorldLocation) === null || _obj$getWorldLocation === void 0 ? void 0 : _obj$getWorldLocation.call(obj);
          if (loc && loc.getPlane() === playerLoc.getPlane()) {
            var dist = playerLoc.distanceTo(loc);
            if (dist < minDistance) {
              minDistance = dist;
              closest = obj;
            }
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      return closest;
    }
  }, {
    key: "chopTree",
    value: function chopTree(tree) {
      bot.objects.interactSuppliedObject(tree, 'Chop down');
      return true;
    }
  }, {
    key: "dropLogs",
    value: function dropLogs(logName) {
      if (bot.inventory.containsName(logName)) {
        bot.inventory.interactWithNames([logName], ['Drop']);
        return true;
      }
      return false;
    }
  }]);
}();

function createWoodcuttingTaskHandler(game, settings, delayManager) {
  var currentTree = null;
  var idleCount = 0;
  return {
    category: 'Woodcutting',
    onStart: () => {
      var wcLevel = game.getRealLevel(net.runelite.api.Skill.WOODCUTTING);
      currentTree = WcHelper.matchTreeDefinition(settings.woodcutting.tree, wcLevel);
      idleCount = 0;
      game.log("Starting Woodcutting: ".concat(currentTree.label, " (Current Lv: ").concat(wcLevel, " / Target Lv: ").concat(settings.woodcutting.targetLevel || 'Unlimited', ", Mode: ").concat(settings.woodcutting.dropLogs ? 'Powerchop' : 'Bank', ")."));
    },
    tick: () => {
      var _client$getLocalPlaye;
      var wcLevel = game.getRealLevel(net.runelite.api.Skill.WOODCUTTING);
      if (!currentTree || wcLevel < currentTree.level) {
        currentTree = WcHelper.matchTreeDefinition(settings.woodcutting.tree, wcLevel);
      }
      if (!WcHelper.hasAxe(game)) {
        if (game.isBankOpen()) {
          var bestAxe = WcHelper.getBestUsableAxe(game);
          if (bestAxe && game.getBankQuantity(bestAxe.id) > 0) {
            game.log("Withdrawing ".concat(bestAxe.name, " from bank..."));
            game.withdrawQuantity(bestAxe.id, 1);
            delayManager.setDelay(2);
            return;
          }
          if (game.getBankQuantity(1351) > 0) {
            game.withdrawQuantity(1351, 1);
            delayManager.setDelay(2);
            return;
          }
        }
        if (!game.isWebWalking()) {
          game.log('No axe found in inventory. Walking to bank...');
          game.webWalkToNearestBank();
        }
        delayManager.setDelay(3);
        return;
      }
      if (game.isBankOpen() && !game.isInventoryFull()) {
        game.closeBank();
        delayManager.setDelay(1);
        return;
      }
      if (game.isInventoryFull()) {
        if (settings.woodcutting.dropLogs) {
          game.log("Inventory full! Dropping ".concat(currentTree.logName, "..."));
          WcHelper.dropLogs(currentTree.logName);
          delayManager.setDelay(1);
          return;
        } else {
          if (game.isBankOpen()) {
            game.log('Depositing logs into bank...');
            var heldAxe = WcHelper.getBestUsableAxe(game);
            var keepIds = heldAxe ? [heldAxe.id] : [1351];
            game.depositAllExcept(keepIds);
            delayManager.setDelay(2);
            return;
          }
          if (game.isDialogueOpen()) {
            game.handleDialogue();
            delayManager.setDelay(1);
            return;
          }
          if (game.isWebWalking()) {
            delayManager.setDelay(2);
            return;
          }
          game.log('Opening bank to deposit logs...');
          game.openBank();
          delayManager.setDelay(2);
          return;
        }
      }
      var playerLoc = (_client$getLocalPlaye = client.getLocalPlayer()) === null || _client$getLocalPlaye === void 0 ? void 0 : _client$getLocalPlaye.getWorldLocation();
      var targetSpot = currentTree.defaultSpot;
      var isNearTrees = playerLoc && playerLoc.distanceTo(targetSpot) <= 25;
      if (!isNearTrees) {
        if (!game.isWebWalking()) {
          game.log("Navigating to ".concat(currentTree.label, " cluster..."));
          game.webWalkTo(targetSpot);
        }
        delayManager.setDelay(3);
        return;
      }
      if (WcHelper.isChopping()) {
        idleCount = 0;
        delayManager.setDelay(DelayManager.getReactionTicks(settings.general.playStyle, settings.general.noobMode, game.getTotalLevel()));
        return;
      }
      var tree = WcHelper.findClosestTree(currentTree, 25);
      if (tree) {
        idleCount = 0;
        game.log("Chopping ".concat(currentTree.label, "..."));
        WcHelper.chopTree(tree);
        delayManager.setDelay(DelayManager.getReactionTicks(settings.general.playStyle, settings.general.noobMode, game.getTotalLevel()));
        return;
      }
      if (++idleCount > 10) {
        game.log("Waiting for ".concat(currentTree.label, " to respawn..."));
        idleCount = 0;
      }
      delayManager.setDelay(2);
    },
    isComplete: () => {
      var target = settings.woodcutting.targetLevel;
      if (!target || target <= 0) return false;
      var levelReached = game.getRealLevel(net.runelite.api.Skill.WOODCUTTING) >= target;
      if (!levelReached) return false;
      if (settings.general.strictLevelGoals) return true;
      if (currentTree && bot.inventory.containsName(currentTree.logName)) {
        return false;
      }
      return true;
    },
    getStatus: () => {
      var curr = game.getRealLevel(net.runelite.api.Skill.WOODCUTTING);
      var treeLabel = currentTree ? currentTree.label : 'Tree';
      return "WC: Lv. ".concat(curr, "/").concat(settings.woodcutting.targetLevel || 'Max', " (").concat(treeLabel, ")");
    }
  };
}

var ITEM_TINDERBOX = 590;
var FM_LOGS = [{
  key: 'firemaking:logs',
  label: 'Normal logs',
  logId: 1511,
  logName: 'Logs',
  level: 1
}, {
  key: 'firemaking:oak',
  label: 'Oak logs',
  logId: 1521,
  logName: 'Oak logs',
  level: 15
}, {
  key: 'firemaking:willow',
  label: 'Willow logs',
  logId: 1519,
  logName: 'Willow logs',
  level: 30
}, {
  key: 'firemaking:maple',
  label: 'Maple logs',
  logId: 1517,
  logName: 'Maple logs',
  level: 45
}, {
  key: 'firemaking:yew',
  label: 'Yew logs',
  logId: 1515,
  logName: 'Yew logs',
  level: 60
}];
var FIRELINE_SPOTS = [{
  name: 'Grand Exchange',
  startPoint: new net.runelite.api.coords.WorldPoint(3185, 3485, 0)
}, {
  name: 'Varrock East',
  startPoint: new net.runelite.api.coords.WorldPoint(3255, 3430, 0)
}, {
  name: 'Draynor Bank',
  startPoint: new net.runelite.api.coords.WorldPoint(3095, 3240, 0)
}, {
  name: 'Lumbridge Courtyard',
  startPoint: new net.runelite.api.coords.WorldPoint(3205, 3225, 0)
}];

var FmHelper = /*#__PURE__*/function () {
  function FmHelper() {
    _classCallCheck(this, FmHelper);
  }
  return _createClass(FmHelper, null, [{
    key: "hasTinderbox",
    value: function hasTinderbox(game) {
      return game.getInventoryQuantity(ITEM_TINDERBOX) > 0;
    }
  }, {
    key: "matchLogDefinition",
    value: function matchLogDefinition(label, fmLevel) {
      var match = FM_LOGS.find(l => l.label.toLowerCase().includes(label.toLowerCase()) || label.toLowerCase().includes(l.logName.toLowerCase()));
      if (match && fmLevel >= match.level) {
        return match;
      }
      for (var i = FM_LOGS.length - 1; i >= 0; i--) {
        if (fmLevel >= FM_LOGS[i].level) {
          return FM_LOGS[i];
        }
      }
      return FM_LOGS[0];
    }
  }, {
    key: "isLighting",
    value: function isLighting() {
      try {
        var player = client.getLocalPlayer();
        if (!player) return false;
        return player.getAnimation() === 733;
      } catch (_unused) {
        return false;
      }
    }
  }, {
    key: "lightLog",
    value: function lightLog(logId) {
      if (bot.inventory.containsId(ITEM_TINDERBOX) && bot.inventory.containsId(logId)) {
        bot.inventory.itemOnItemWithIds(ITEM_TINDERBOX, logId);
        return true;
      }
      return false;
    }
  }, {
    key: "getClosestFirelineSpot",
    value: function getClosestFirelineSpot(playerLoc) {
      if (!playerLoc) return FIRELINE_SPOTS[0];
      var closest = FIRELINE_SPOTS[0];
      var minDistance = 999999;
      var _iterator = _createForOfIteratorHelper(FIRELINE_SPOTS),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var spot = _step.value;
          var dist = playerLoc.distanceTo(spot.startPoint);
          if (dist < minDistance) {
            minDistance = dist;
            closest = spot;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return closest;
    }
  }, {
    key: "isCurrentTileOnFire",
    value: function isCurrentTileOnFire() {
      var _client$getLocalPlaye;
      var playerLoc = (_client$getLocalPlaye = client.getLocalPlayer()) === null || _client$getLocalPlaye === void 0 ? void 0 : _client$getLocalPlaye.getWorldLocation();
      if (!playerLoc) return false;
      var fires = bot.objects.getTileObjectsWithNames(['Fire']);
      if (!fires || fires.length === 0) return false;
      var _iterator2 = _createForOfIteratorHelper(fires),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _fire$getWorldLocatio;
          var fire = _step2.value;
          var loc = (_fire$getWorldLocatio = fire.getWorldLocation) === null || _fire$getWorldLocatio === void 0 ? void 0 : _fire$getWorldLocatio.call(fire);
          if (loc && loc.getX() === playerLoc.getX() && loc.getY() === playerLoc.getY()) {
            return true;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      return false;
    }
  }]);
}();

function createFiremakingTaskHandler(game, settings, delayManager) {
  var currentLog = null;
  var outOfLogs = false;
  return {
    category: 'Firemaking',
    onStart: () => {
      var fmLevel = game.getRealLevel(net.runelite.api.Skill.FIREMAKING);
      currentLog = FmHelper.matchLogDefinition(settings.firemaking.log, fmLevel);
      outOfLogs = false;
      game.log("Starting Firemaking: ".concat(currentLog.label, " (Current Lv: ").concat(fmLevel, " / Target Lv: ").concat(settings.firemaking.targetLevel || 'Unlimited', ")."));
    },
    tick: () => {
      var _client$getLocalPlaye;
      var fmLevel = game.getRealLevel(net.runelite.api.Skill.FIREMAKING);
      if (!currentLog || fmLevel < currentLog.level) {
        currentLog = FmHelper.matchLogDefinition(settings.firemaking.log, fmLevel);
      }
      var hasLogsInInv = game.getInventoryQuantity(currentLog.logId) > 0;
      var hasTinderbox = FmHelper.hasTinderbox(game);
      if (!hasLogsInInv || !hasTinderbox) {
        if (game.isBankOpen()) {
          game.depositAllExcept([ITEM_TINDERBOX]);
          if (!hasTinderbox) {
            if (game.getBankQuantity(ITEM_TINDERBOX) > 0) {
              game.log('Withdrawing Tinderbox from bank...');
              game.withdrawQuantity(ITEM_TINDERBOX, 1);
              delayManager.setDelay(2);
              return;
            } else {
              game.log('No Tinderbox found in bank!');
              outOfLogs = true;
              return;
            }
          }
          if (game.getBankQuantity(currentLog.logId) > 0) {
            game.log("Withdrawing ".concat(currentLog.logName, " from bank..."));
            game.withdrawAll(currentLog.logId);
            delayManager.setDelay(2);
            return;
          } else {
            game.log("No ".concat(currentLog.logName, " remaining in bank."));
            outOfLogs = true;
            return;
          }
        }
        if (game.isDialogueOpen()) {
          game.handleDialogue();
          delayManager.setDelay(1);
          return;
        }
        if (game.isWebWalking()) {
          delayManager.setDelay(2);
          return;
        }
        game.log('Need firemaking supplies. Opening bank...');
        game.openBank();
        delayManager.setDelay(2);
        return;
      }
      if (game.isBankOpen()) {
        game.closeBank();
        delayManager.setDelay(1);
        return;
      }
      var playerLoc = (_client$getLocalPlaye = client.getLocalPlayer()) === null || _client$getLocalPlaye === void 0 ? void 0 : _client$getLocalPlaye.getWorldLocation();
      var spot = FmHelper.getClosestFirelineSpot(playerLoc);
      if (playerLoc && playerLoc.distanceTo(spot.startPoint) > 30) {
        if (!game.isWebWalking()) {
          game.log("Navigating to open firemaking spot at ".concat(spot.name, "..."));
          game.webWalkTo(spot.startPoint);
        }
        delayManager.setDelay(3);
        return;
      }
      if (FmHelper.isCurrentTileOnFire()) {
        if (playerLoc) {
          var nextTile = new net.runelite.api.coords.WorldPoint(playerLoc.getX() - 1, playerLoc.getY(), playerLoc.getPlane());
          bot.walking.walkToTrueWorldPoint(nextTile.getX(), nextTile.getY());
          delayManager.setDelay(2);
          return;
        }
      }
      if (FmHelper.isLighting()) {
        delayManager.setDelay(2);
        return;
      }
      game.log("Lighting ".concat(currentLog.logName, "..."));
      FmHelper.lightLog(currentLog.logId);
      delayManager.setDelay(DelayManager.getReactionTicks(settings.general.playStyle, settings.general.noobMode, game.getTotalLevel()) + 1);
    },
    isComplete: () => {
      if (outOfLogs) return true;
      var target = settings.firemaking.targetLevel;
      if (!target || target <= 0) return false;
      var levelReached = game.getRealLevel(net.runelite.api.Skill.FIREMAKING) >= target;
      if (!levelReached) return false;
      if (settings.general.strictLevelGoals) return true;
      if (currentLog && game.getInventoryQuantity(currentLog.logId) > 0) {
        return false;
      }
      return true;
    },
    getStatus: () => {
      var curr = game.getRealLevel(net.runelite.api.Skill.FIREMAKING);
      var logName = currentLog ? currentLog.label : 'Logs';
      return "FM: Lv. ".concat(curr, "/").concat(settings.firemaking.targetLevel || 'Max', " (").concat(logName, ")");
    }
  };
}

var FISH_METHODS = [{
  key: 'fishing:shrimp',
  label: 'Small Net: Shrimps & Anchovies',
  level: 1,
  toolId: 303,
  toolName: 'Small fishing net',
  spotAction: 'Net',
  rawFishNames: ['Raw shrimps', 'Raw anchovies'],
  defaultSpot: new net.runelite.api.coords.WorldPoint(3242, 3151, 0)
}, {
  key: 'fishing:sardine',
  label: 'Bait Fishing: Sardines & Herrings',
  level: 5,
  toolId: 307,
  toolName: 'Fishing rod',
  baitId: 313,
  baitName: 'Fishing bait',
  spotAction: 'Bait',
  rawFishNames: ['Raw sardine', 'Raw herring'],
  defaultSpot: new net.runelite.api.coords.WorldPoint(3088, 3228, 0)
}, {
  key: 'fishing:trout',
  label: 'Fly Fishing: Trout & Salmon',
  level: 20,
  toolId: 309,
  toolName: 'Fly fishing rod',
  baitId: 314,
  baitName: 'Feather',
  spotAction: 'Lure',
  rawFishNames: ['Raw trout', 'Raw salmon'],
  defaultSpot: new net.runelite.api.coords.WorldPoint(3105, 3430, 0)
}, {
  key: 'fishing:lobster',
  label: 'Harpoon / Cage: Lobsters & Swordfish',
  level: 40,
  toolId: 301,
  toolName: 'Lobster pot',
  spotAction: 'Cage',
  rawFishNames: ['Raw lobster', 'Raw swordfish', 'Raw tuna'],
  defaultSpot: new net.runelite.api.coords.WorldPoint(2925, 3177, 0)
}];

var FishHelper = /*#__PURE__*/function () {
  function FishHelper() {
    _classCallCheck(this, FishHelper);
  }
  return _createClass(FishHelper, null, [{
    key: "hasSupplies",
    value: function hasSupplies(game, method) {
      var hasTool = game.getInventoryQuantity(method.toolId) > 0 || bot.equipment.containsId(method.toolId);
      if (!hasTool) return false;
      if (method.baitId) {
        return game.getInventoryQuantity(method.baitId) > 0;
      }
      return true;
    }
  }, {
    key: "matchMethod",
    value: function matchMethod(label, fishingLevel) {
      var match = FISH_METHODS.find(m => m.label.toLowerCase().includes(label.toLowerCase()) || label.toLowerCase().includes(m.key.toLowerCase()));
      if (match && fishingLevel >= match.level) {
        return match;
      }
      for (var i = FISH_METHODS.length - 1; i >= 0; i--) {
        if (fishingLevel >= FISH_METHODS[i].level) {
          return FISH_METHODS[i];
        }
      }
      return FISH_METHODS[0];
    }
  }, {
    key: "isFishing",
    value: function isFishing() {
      try {
        var player = client.getLocalPlayer();
        if (!player) return false;
        var anim = player.getAnimation();
        return anim === 621 || anim === 622 || anim === 623 || anim === 619 || anim === 618;
      } catch (_unused) {
        return false;
      }
    }
  }, {
    key: "findClosestFishingSpot",
    value: function findClosestFishingSpot() {
      var _client$getLocalPlaye;
      var maxDistance = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 25;
      var npcs = bot.npcs.getWithNames(['Fishing spot', 'Rod Fishing spot']);
      if (!npcs || npcs.length === 0) return null;
      var playerLoc = (_client$getLocalPlaye = client.getLocalPlayer()) === null || _client$getLocalPlaye === void 0 ? void 0 : _client$getLocalPlaye.getWorldLocation();
      if (!playerLoc) return null;
      var closest = null;
      var minDistance = maxDistance;
      var _iterator = _createForOfIteratorHelper(npcs),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _npc$getWorldLocation;
          var npc = _step.value;
          var loc = (_npc$getWorldLocation = npc.getWorldLocation) === null || _npc$getWorldLocation === void 0 ? void 0 : _npc$getWorldLocation.call(npc);
          if (loc && loc.getPlane() === playerLoc.getPlane()) {
            var dist = playerLoc.distanceTo(loc);
            if (dist < minDistance) {
              minDistance = dist;
              closest = npc;
            }
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return closest;
    }
  }, {
    key: "fishAtSpot",
    value: function fishAtSpot(spot, action) {
      bot.npcs.interactSupplied(spot, action);
      return true;
    }
  }, {
    key: "dropFish",
    value: function dropFish(fishNames) {
      var _iterator2 = _createForOfIteratorHelper(fishNames),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var name = _step2.value;
          if (bot.inventory.containsName(name)) {
            bot.inventory.interactWithNames([name], ['Drop']);
            return true;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      return false;
    }
  }]);
}();

function createFishingTaskHandler(game, settings, delayManager) {
  var currentMethod = null;
  var idleCount = 0;
  return {
    category: 'Fishing',
    onStart: () => {
      var fishLvl = game.getRealLevel(net.runelite.api.Skill.FISHING);
      currentMethod = FishHelper.matchMethod(settings.fishing.method, fishLvl);
      idleCount = 0;
      game.log("Starting Fishing: ".concat(currentMethod.label, " (Current Lv: ").concat(fishLvl, " / Target Lv: ").concat(settings.fishing.targetLevel || 'Unlimited', ", Mode: ").concat(settings.fishing.dropFish ? 'Powerfish' : 'Bank', ")."));
    },
    tick: () => {
      var _client$getLocalPlaye;
      var fishLvl = game.getRealLevel(net.runelite.api.Skill.FISHING);
      if (!currentMethod || fishLvl < currentMethod.level) {
        currentMethod = FishHelper.matchMethod(settings.fishing.method, fishLvl);
      }
      if (!FishHelper.hasSupplies(game, currentMethod)) {
        if (game.isBankOpen()) {
          if (game.getInventoryQuantity(currentMethod.toolId) === 0 && !bot.equipment.containsId(currentMethod.toolId)) {
            if (game.getBankQuantity(currentMethod.toolId) > 0) {
              game.log("Withdrawing ".concat(currentMethod.toolName, " from bank..."));
              game.withdrawQuantity(currentMethod.toolId, 1);
              delayManager.setDelay(2);
              return;
            } else {
              game.log("No ".concat(currentMethod.toolName, " found in bank!"));
            }
          }
          if (currentMethod.baitId && game.getInventoryQuantity(currentMethod.baitId) === 0) {
            if (game.getBankQuantity(currentMethod.baitId) > 0) {
              game.log("Withdrawing ".concat(currentMethod.baitName, " from bank..."));
              game.withdrawQuantity(currentMethod.baitId, 1000);
              delayManager.setDelay(2);
              return;
            } else {
              game.log("No ".concat(currentMethod.baitName, " found in bank!"));
            }
          }
        }
        if (game.isDialogueOpen()) {
          game.handleDialogue();
          delayManager.setDelay(1);
          return;
        }
        if (game.isWebWalking()) {
          delayManager.setDelay(2);
          return;
        }
        game.log("Missing fishing supplies (".concat(currentMethod.toolName, "). Opening bank..."));
        game.openBank();
        delayManager.setDelay(2);
        return;
      }
      if (game.isBankOpen() && !game.isInventoryFull()) {
        game.closeBank();
        delayManager.setDelay(1);
        return;
      }
      if (game.isInventoryFull()) {
        if (settings.fishing.dropFish) {
          game.log('Inventory full! Dropping caught fish...');
          FishHelper.dropFish(currentMethod.rawFishNames);
          delayManager.setDelay(1);
          return;
        } else {
          if (game.isBankOpen()) {
            game.log('Depositing fish into bank...');
            var keep = [currentMethod.toolId];
            if (currentMethod.baitId) keep.push(currentMethod.baitId);
            game.depositAllExcept(keep);
            delayManager.setDelay(2);
            return;
          }
          if (game.isDialogueOpen()) {
            game.handleDialogue();
            delayManager.setDelay(1);
            return;
          }
          if (game.isWebWalking()) {
            delayManager.setDelay(2);
            return;
          }
          game.log('Opening bank to deposit fish...');
          game.openBank();
          delayManager.setDelay(2);
          return;
        }
      }
      var playerLoc = (_client$getLocalPlaye = client.getLocalPlayer()) === null || _client$getLocalPlaye === void 0 ? void 0 : _client$getLocalPlaye.getWorldLocation();
      var targetSpot = currentMethod.defaultSpot;
      var isNear = playerLoc && playerLoc.distanceTo(targetSpot) <= 25;
      if (!isNear) {
        if (!game.isWebWalking()) {
          game.log("Navigating to ".concat(currentMethod.label, " spot..."));
          game.webWalkTo(targetSpot);
        }
        delayManager.setDelay(3);
        return;
      }
      if (FishHelper.isFishing()) {
        idleCount = 0;
        delayManager.setDelay(DelayManager.getReactionTicks(settings.general.playStyle, settings.general.noobMode, game.getTotalLevel()));
        return;
      }
      var spot = FishHelper.findClosestFishingSpot(25);
      if (spot) {
        idleCount = 0;
        game.log("Interacting with Fishing spot (".concat(currentMethod.spotAction, ")..."));
        FishHelper.fishAtSpot(spot, currentMethod.spotAction);
        delayManager.setDelay(DelayManager.getReactionTicks(settings.general.playStyle, settings.general.noobMode, game.getTotalLevel()) + 1);
        return;
      }
      if (++idleCount > 8) {
        game.log('Searching for active fishing spot...');
        idleCount = 0;
      }
      delayManager.setDelay(2);
    },
    isComplete: () => {
      var target = settings.fishing.targetLevel;
      if (!target || target <= 0) return false;
      var levelReached = game.getRealLevel(net.runelite.api.Skill.FISHING) >= target;
      if (!levelReached) return false;
      if (settings.general.strictLevelGoals) return true;
      if (currentMethod && bot.inventory.containsAnyNames(currentMethod.rawFishNames)) {
        return false;
      }
      return true;
    },
    getStatus: () => {
      var curr = game.getRealLevel(net.runelite.api.Skill.FISHING);
      var label = currentMethod ? currentMethod.label : 'Fishing';
      return "Fish: Lv. ".concat(curr, "/").concat(settings.fishing.targetLevel || 'Max', " (").concat(label, ")");
    }
  };
}

var COOK_WIDGET_ID = 17694735;
var BURNT_FOOD_NAMES = ['Burnt fish', 'Burnt shrimp', 'Burnt anchovies', 'Burnt sardine', 'Burnt herring', 'Burnt trout', 'Burnt salmon', 'Burnt tuna', 'Burnt lobster', 'Burnt swordfish', 'Burnt meat', 'Burnt chicken', 'Burnt bread'];
var COOKABLE_FOODS = [{
  id: 317,
  name: 'Raw shrimps',
  cookedId: 315,
  level: 1,
  xp: 30
}, {
  id: 321,
  name: 'Raw anchovies',
  cookedId: 319,
  level: 1,
  xp: 30
}, {
  id: 2132,
  name: 'Raw beef',
  cookedId: 2142,
  level: 1,
  xp: 30
}, {
  id: 2138,
  name: 'Raw chicken',
  cookedId: 2140,
  level: 1,
  xp: 30
}, {
  id: 2134,
  name: 'Raw meat',
  cookedId: 2142,
  level: 1,
  xp: 30
}, {
  id: 327,
  name: 'Raw sardine',
  cookedId: 325,
  level: 1,
  xp: 40
}, {
  id: 345,
  name: 'Raw herring',
  cookedId: 347,
  level: 5,
  xp: 50
}, {
  id: 335,
  name: 'Raw trout',
  cookedId: 333,
  level: 15,
  xp: 70
}, {
  id: 349,
  name: 'Raw pike',
  cookedId: 351,
  level: 20,
  xp: 80
}, {
  id: 331,
  name: 'Raw salmon',
  cookedId: 329,
  level: 25,
  xp: 90
}, {
  id: 359,
  name: 'Raw tuna',
  cookedId: 361,
  level: 30,
  xp: 100
}, {
  id: 377,
  name: 'Raw lobster',
  cookedId: 379,
  level: 40,
  xp: 120
}, {
  id: 371,
  name: 'Raw swordfish',
  cookedId: 373,
  level: 45,
  xp: 140
}];
var COOKING_LOCATIONS = [{
  label: 'Al-Kharid range',
  objectNames: ['Range'],
  spotPoint: new net.runelite.api.coords.WorldPoint(3272, 3180, 0),
  bankPoint: new net.runelite.api.coords.WorldPoint(3269, 3166, 0)
}, {
  label: 'Edgeville stove',
  objectNames: ['Stove', 'Range'],
  spotPoint: new net.runelite.api.coords.WorldPoint(3079, 3496, 0),
  bankPoint: new net.runelite.api.coords.WorldPoint(3093, 3493, 0)
}, {
  label: 'Lumbridge castle range',
  objectNames: ['Cooks range', 'Range'],
  spotPoint: new net.runelite.api.coords.WorldPoint(3212, 3215, 0),
  bankPoint: new net.runelite.api.coords.WorldPoint(3208, 3219, 2)
}, {
  label: 'Rogues Den permanent fire',
  objectNames: ['Fire'],
  spotPoint: new net.runelite.api.coords.WorldPoint(3043, 4973, 1),
  bankPoint: new net.runelite.api.coords.WorldPoint(3040, 4969, 1)
}];

var CookHelper = /*#__PURE__*/function () {
  function CookHelper() {
    _classCallCheck(this, CookHelper);
  }
  return _createClass(CookHelper, null, [{
    key: "matchLocation",
    value: function matchLocation(label) {
      var lower = label.toLowerCase();
      var match = COOKING_LOCATIONS.find(loc => lower.includes(loc.label.toLowerCase()) || loc.label.toLowerCase().includes(lower));
      return match !== null && match !== void 0 ? match : COOKING_LOCATIONS[0];
    }
  }, {
    key: "matchFood",
    value: function matchFood(labelOrName, cookingLevel) {
      var lower = labelOrName.toLowerCase();
      var match = COOKABLE_FOODS.find(f => lower.includes(f.name.toLowerCase()) || f.name.toLowerCase().includes(lower));
      if (match && cookingLevel >= match.level) {
        return match;
      }
      for (var i = COOKABLE_FOODS.length - 1; i >= 0; i--) {
        if (cookingLevel >= COOKABLE_FOODS[i].level) {
          return COOKABLE_FOODS[i];
        }
      }
      return COOKABLE_FOODS[0];
    }
  }, {
    key: "findHighestFoodInBank",
    value: function findHighestFoodInBank(cookingLevel, game) {
      var sorted = _toConsumableArray(COOKABLE_FOODS).sort((a, b) => b.level - a.level);
      var _iterator = _createForOfIteratorHelper(sorted),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var food = _step.value;
          if (food.level <= cookingLevel && game.getBankQuantity(food.id) > 0) {
            return food;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return null;
    }
  }, {
    key: "findRawFoodInInventory",
    value: function findRawFoodInInventory(game) {
      var _iterator2 = _createForOfIteratorHelper(COOKABLE_FOODS),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var food = _step2.value;
          if (game.getInventoryQuantity(food.id) > 0) {
            return food;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      return null;
    }
  }, {
    key: "isMakeMenuVisible",
    value: function isMakeMenuVisible() {
      try {
        var widget = client.getWidget(COOK_WIDGET_ID);
        if (widget !== null && !widget.isHidden()) {
          return true;
        }
        var parent = client.getWidget(270, 0);
        if (parent !== null && !parent.isHidden()) {
          return true;
        }
      } catch (_unused) {}
      return false;
    }
  }, {
    key: "clickCookWidget",
    value: function clickCookWidget() {
      bot.widgets.interactSpecifiedWidget(COOK_WIDGET_ID, 1, 57, -1);
    }
  }, {
    key: "isCookingAnimation",
    value: function isCookingAnimation() {
      try {
        var player = client.getLocalPlayer();
        if (!player) return false;
        var anim = player.getAnimation();
        return anim === 896 || anim === 897 || anim === 883;
      } catch (_unused2) {
        return false;
      }
    }
  }, {
    key: "interactCookingObject",
    value: function interactCookingObject(loc) {
      var _client$getLocalPlaye;
      var playerLoc = (_client$getLocalPlaye = client.getLocalPlayer()) === null || _client$getLocalPlaye === void 0 ? void 0 : _client$getLocalPlaye.getWorldLocation();
      if (!playerLoc) return false;
      var _iterator3 = _createForOfIteratorHelper(loc.objectNames),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var name = _step3.value;
          var objects = bot.objects.getTileObjectsWithNames([name]);
          if (objects && objects.length > 0) {
            var closest = objects[0];
            var minDist = 999;
            var _iterator4 = _createForOfIteratorHelper(objects),
              _step4;
            try {
              for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                var _obj$getWorldLocation;
                var obj = _step4.value;
                var wLoc = (_obj$getWorldLocation = obj.getWorldLocation) === null || _obj$getWorldLocation === void 0 ? void 0 : _obj$getWorldLocation.call(obj);
                if (wLoc && wLoc.getPlane() === playerLoc.getPlane()) {
                  var d = playerLoc.distanceTo(wLoc);
                  if (d < minDist) {
                    minDist = d;
                    closest = obj;
                  }
                }
              }
            } catch (err) {
              _iterator4.e(err);
            } finally {
              _iterator4.f();
            }
            if (minDist <= 15) {
              bot.objects.interactSuppliedObject(closest, 'Cook');
              return true;
            }
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      bot.objects.interactObject(loc.objectNames[0], 'Cook');
      return true;
    }
  }, {
    key: "hasBurntFood",
    value: function hasBurntFood() {
      try {
        var widgets = bot.inventory.getAllWidgets();
        if (widgets && Array.isArray(widgets)) {
          var _iterator5 = _createForOfIteratorHelper(widgets),
            _step5;
          try {
            for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
              var _w$getName;
              var w = _step5.value;
              var name = w === null || w === void 0 || (_w$getName = w.getName) === null || _w$getName === void 0 ? void 0 : _w$getName.call(w);
              if (name && name.toLowerCase().includes('burnt')) {
                return true;
              }
            }
          } catch (err) {
            _iterator5.e(err);
          } finally {
            _iterator5.f();
          }
        }
      } catch (_unused3) {}
      var _iterator6 = _createForOfIteratorHelper(BURNT_FOOD_NAMES),
        _step6;
      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var _name = _step6.value;
          if (bot.inventory.containsName(_name)) {
            return true;
          }
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
      return false;
    }
  }, {
    key: "dropBurntFood",
    value: function dropBurntFood() {
      try {
        var widgets = bot.inventory.getAllWidgets();
        if (widgets && Array.isArray(widgets)) {
          var _iterator7 = _createForOfIteratorHelper(widgets),
            _step7;
          try {
            for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
              var _w$getName2;
              var w = _step7.value;
              var name = w === null || w === void 0 || (_w$getName2 = w.getName) === null || _w$getName2 === void 0 ? void 0 : _w$getName2.call(w);
              if (name && name.toLowerCase().includes('burnt')) {
                bot.inventory.interactWithNames([name], ['Drop']);
                return true;
              }
            }
          } catch (err) {
            _iterator7.e(err);
          } finally {
            _iterator7.f();
          }
        }
      } catch (_unused4) {}
      var _iterator8 = _createForOfIteratorHelper(BURNT_FOOD_NAMES),
        _step8;
      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          var _name2 = _step8.value;
          if (bot.inventory.containsName(_name2)) {
            bot.inventory.interactWithNames([_name2], ['Drop']);
            return true;
          }
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }
      return false;
    }
  }]);
}();

function createCookingTaskHandler(game, settings, delayManager) {
  var currentLocation = CookHelper.matchLocation(settings.cooking.location);
  var currentFood = null;
  var outOfSupplies = false;
  var lastRawCount = 0;
  var idleCount = 0;
  var totalCooked = 0;
  return {
    category: 'Cooking',
    onStart: () => {
      var _currentFood$name, _currentFood;
      var cookLvl = game.getRealLevel(net.runelite.api.Skill.COOKING);
      currentLocation = CookHelper.matchLocation(settings.cooking.location);
      currentFood = settings.cooking.progressive ? null : CookHelper.matchFood(settings.cooking.food, cookLvl);
      outOfSupplies = false;
      lastRawCount = 0;
      idleCount = 0;
      game.log("Starting Cooking: Target Lv ".concat(settings.cooking.targetLevel || 'Unlimited', ", Mode: ").concat(settings.cooking.progressive ? 'Progressive' : (_currentFood$name = (_currentFood = currentFood) === null || _currentFood === void 0 ? void 0 : _currentFood.name) !== null && _currentFood$name !== void 0 ? _currentFood$name : settings.cooking.food, ", Spot: ").concat(currentLocation.label, "."));
    },
    tick: () => {
      var _client$getLocalPlaye2;
      var cookLvl = game.getRealLevel(net.runelite.api.Skill.COOKING);
      if (settings.cooking.dropBurnt && CookHelper.hasBurntFood()) {
        game.log('Dropping burnt food...');
        CookHelper.dropBurntFood();
        delayManager.setDelay(1);
        return;
      }
      var rawInInv = CookHelper.findRawFoodInInventory(game);
      if (rawInInv) {
        var _client$getLocalPlaye;
        currentFood = rawInInv;
        if (game.isBankOpen()) {
          game.closeBank();
          delayManager.setDelay(1);
          return;
        }
        var _playerLoc = (_client$getLocalPlaye = client.getLocalPlayer()) === null || _client$getLocalPlaye === void 0 ? void 0 : _client$getLocalPlaye.getWorldLocation();
        var isNearSpot = _playerLoc !== null && _playerLoc !== undefined && _playerLoc.distanceTo(currentLocation.spotPoint) <= 12;
        if (!isNearSpot) {
          if (!game.isWebWalking()) {
            game.log("Walking to cooking spot (".concat(currentLocation.label, ")..."));
            game.webWalkTo(currentLocation.spotPoint);
          }
          delayManager.setDelay(3);
          return;
        }
        if (CookHelper.isMakeMenuVisible()) {
          game.log("Make menu visible. Starting to cook ".concat(currentFood.name, "..."));
          CookHelper.clickCookWidget();
          lastRawCount = game.getInventoryQuantity(currentFood.id);
          idleCount = 0;
          delayManager.setDelay(DelayManager.getReactionTicks(settings.general.playStyle) + 1);
          return;
        }
        if (game.isDialogueOpen()) {
          game.log('Handling dialogue / level-up interruption...');
          game.handleDialogue([]);
          delayManager.setDelay(1);
          return;
        }
        var currentRawCount = game.getInventoryQuantity(currentFood.id);
        if (currentRawCount < lastRawCount) {
          totalCooked += lastRawCount - currentRawCount;
          lastRawCount = currentRawCount;
          idleCount = 0;
          delayManager.setDelay(DelayManager.getReactionTicks(settings.general.playStyle, settings.general.noobMode, game.getTotalLevel()));
          return;
        }
        if (CookHelper.isCookingAnimation()) {
          idleCount = 0;
          delayManager.setDelay(DelayManager.getReactionTicks(settings.general.playStyle, settings.general.noobMode, game.getTotalLevel()));
          return;
        }
        if (++idleCount > 3) {
          idleCount = 0;
          game.log("Interacting with ".concat(currentLocation.label, " to cook ").concat(currentFood.name, "..."));
          CookHelper.interactCookingObject(currentLocation);
          delayManager.setDelay(2);
          return;
        }
        delayManager.setDelay(1);
        return;
      }
      if (game.isBankOpen()) {
        if (game.getEmptySlots() < 28) {
          game.log('Depositing inventory into bank...');
          game.depositAll();
          delayManager.setDelay(2);
          return;
        }
        var foodToWithdraw = null;
        if (settings.cooking.progressive) {
          foodToWithdraw = CookHelper.findHighestFoodInBank(cookLvl, game);
        } else {
          var targetDef = CookHelper.matchFood(settings.cooking.food, cookLvl);
          if (game.getBankQuantity(targetDef.id) > 0) {
            foodToWithdraw = targetDef;
          }
        }
        if (!foodToWithdraw) {
          game.log('No cookable raw food found in bank! Marking cooking task complete.');
          outOfSupplies = true;
          game.closeBank();
          delayManager.setDelay(2);
          return;
        }
        game.log("Withdrawing all ".concat(foodToWithdraw.name, " from bank..."));
        currentFood = foodToWithdraw;
        game.withdrawAll(foodToWithdraw.id);
        lastRawCount = 28;
        idleCount = 0;
        delayManager.setDelay(2);
        return;
      }
      if (game.isDialogueOpen()) {
        game.handleDialogue();
        delayManager.setDelay(1);
        return;
      }
      if (game.isWebWalking()) {
        delayManager.setDelay(2);
        return;
      }
      var playerLoc = (_client$getLocalPlaye2 = client.getLocalPlayer()) === null || _client$getLocalPlaye2 === void 0 ? void 0 : _client$getLocalPlaye2.getWorldLocation();
      var nearBank = currentLocation.bankPoint && playerLoc && playerLoc.distanceTo(currentLocation.bankPoint) <= 6;
      if (nearBank) {
        game.log('Opening bank...');
        game.openBank();
        delayManager.setDelay(2);
        return;
      }
      game.log('Out of raw food. Walking to bank...');
      if (currentLocation.bankPoint) {
        game.webWalkTo(currentLocation.bankPoint);
      } else {
        game.openBank();
      }
      delayManager.setDelay(3);
    },
    isComplete: () => {
      if (outOfSupplies) return true;
      var target = settings.cooking.targetLevel;
      if (!target || target <= 0) return false;
      var levelReached = game.getRealLevel(net.runelite.api.Skill.COOKING) >= target;
      if (!levelReached) return false;
      if (settings.general.strictLevelGoals) return true;
      if (currentFood && game.getInventoryQuantity(currentFood.id) > 0) {
        return false;
      }
      return true;
    },
    getStatus: () => {
      var curr = game.getRealLevel(net.runelite.api.Skill.COOKING);
      var label = currentFood ? currentFood.name : settings.cooking.progressive ? 'Progressive' : settings.cooking.food;
      return "Cook: Lv. ".concat(curr, "/").concat(settings.cooking.targetLevel || 'Max', " (").concat(label, ", Done: ").concat(totalCooked, ")");
    }
  };
}

var COMBAT_ZONES = {
  'Chickens (Lumbridge)': {
    label: 'Chickens (Lumbridge)',
    npcNames: ['Chicken'],
    areaCenter: new net.runelite.api.coords.WorldPoint(3230, 3298, 0),
    radius: 12
  },
  'Cows (Lumbridge)': {
    label: 'Cows (Lumbridge)',
    npcNames: ['Cow', 'Cow calf'],
    areaCenter: new net.runelite.api.coords.WorldPoint(3258, 3274, 0),
    radius: 15
  },
  'Goblins (Lumbridge)': {
    label: 'Goblins (Lumbridge)',
    npcNames: ['Goblin'],
    areaCenter: new net.runelite.api.coords.WorldPoint(3250, 3245, 0),
    radius: 14
  }
};
var COMMON_FOOD_IDS = {
  Trout: 333,
  Salmon: 329,
  'Cooked meat': 2142,
  'Cooked chicken': 2140,
  Shrimps: 315,
  Bread: 2309
};
var LOOT_IDS = {
  FEATHER: 314,
  BONES: 526,
  COWHIDE: 1739,
  COINS: 995,
  AIR_RUNE: 556,
  WATER_RUNE: 555,
  EARTH_RUNE: 557,
  FIRE_RUNE: 554,
  MIND_RUNE: 558,
  BODY_RUNE: 559
};
var MELEE_WEAPONS_TIER = [{
  id: 1333,
  name: 'Rune scimitar',
  reqLevel: 40
}, {
  id: 1303,
  name: 'Rune longsword',
  reqLevel: 40
}, {
  id: 1289,
  name: 'Rune sword',
  reqLevel: 40
}, {
  id: 1329,
  name: 'Adamant scimitar',
  reqLevel: 30
}, {
  id: 1287,
  name: 'Adamant sword',
  reqLevel: 30
}, {
  id: 1325,
  name: 'Mithril scimitar',
  reqLevel: 20
}, {
  id: 1285,
  name: 'Mithril sword',
  reqLevel: 20
}, {
  id: 1323,
  name: 'Black scimitar',
  reqLevel: 10
}, {
  id: 1321,
  name: 'Steel scimitar',
  reqLevel: 5
}, {
  id: 1281,
  name: 'Steel sword',
  reqLevel: 5
}, {
  id: 1335,
  name: 'Iron scimitar',
  reqLevel: 1
}, {
  id: 1279,
  name: 'Iron sword',
  reqLevel: 1
}, {
  id: 1277,
  name: 'Bronze sword',
  reqLevel: 1
}, {
  id: 1337,
  name: 'Bronze scimitar',
  reqLevel: 1
}, {
  id: 1205,
  name: 'Bronze dagger',
  reqLevel: 1
}];
var CONFLICTING_TOOLS = ['Bronze axe', 'Iron axe', 'Steel axe', 'Black axe', 'Mithril axe', 'Adamant axe', 'Rune axe', 'Bronze pickaxe', 'Iron pickaxe', 'Steel pickaxe', 'Mithril pickaxe', 'Adamant pickaxe', 'Rune pickaxe', 'Small fishing net', 'Fishing rod', 'Fly fishing rod', 'Harpoon', 'Lobster pot', 'Tinderbox'];

var CombatHelper = /*#__PURE__*/function () {
  function CombatHelper() {
    _classCallCheck(this, CombatHelper);
  }
  return _createClass(CombatHelper, null, [{
    key: "findTarget",
    value: function findTarget(game, zone) {
      var localPlayer = client.getLocalPlayer();
      if (!localPlayer) return null;
      var playerLoc = localPlayer.getWorldLocation();
      if (!playerLoc) return null;
      var npcs = bot.npcs.getWithNames(zone.npcNames);
      if (!npcs || npcs.length === 0) return null;
      var bestP1 = null;
      var bestP2 = null;
      var _iterator = _createForOfIteratorHelper(npcs),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var npc = _step.value;
          if (!npc) continue;
          if (npc.isDead() || npc.getHealthRatio() === 0) {
            continue;
          }
          var npcLoc = npc.getWorldLocation();
          if (!npcLoc || npcLoc.getPlane() !== playerLoc.getPlane()) {
            continue;
          }
          var distToCenter = npcLoc.distanceTo(zone.areaCenter);
          if (distToCenter > zone.radius + 6) {
            continue;
          }
          var distToPlayer = playerLoc.distanceTo(npcLoc);
          var interacting = npc.getInteracting();
          var healthRatio = npc.getHealthRatio();
          var healthScale = npc.getHealthScale();
          var isInteractingWithMe = interacting === localPlayer;
          var isDamagedByMe = healthRatio > 0 && healthRatio < healthScale && (!interacting || interacting === localPlayer);
          if (isInteractingWithMe || isDamagedByMe) {
            if (!bestP1 || distToPlayer < bestP1.dist) {
              bestP1 = {
                npc,
                dist: distToPlayer
              };
            }
            continue;
          }
          var isIdleOrFree = !interacting || interacting === localPlayer;
          var isFullHealth = healthRatio === -1 || healthRatio === healthScale;
          if (isIdleOrFree && isFullHealth) {
            if (!bestP2 || distToPlayer < bestP2.dist) {
              bestP2 = {
                npc,
                dist: distToPlayer
              };
            }
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      if (bestP1) {
        return {
          npc: bestP1.npc,
          priority: 'p1'
        };
      }
      if (bestP2) {
        return {
          npc: bestP2.npc,
          priority: 'p2'
        };
      }
      return null;
    }
  }, {
    key: "isTargetDeadOrLost",
    value: function isTargetDeadOrLost(npc) {
      if (!npc) return true;
      try {
        if (npc.isDead()) return true;
        if (npc.getHealthRatio() === 0) return true;
        var loc = npc.getWorldLocation();
        if (!loc) return true;
        return false;
      } catch (_unused) {
        return true;
      }
    }
  }, {
    key: "determineSkillToTrain",
    value: function determineSkillToTrain(game, settings) {
      var curAtk = game.getRealLevel(net.runelite.api.Skill.ATTACK);
      var curStr = game.getRealLevel(net.runelite.api.Skill.STRENGTH);
      var curDef = game.getRealLevel(net.runelite.api.Skill.DEFENCE);
      var atkDone = settings.targetAttack <= 0 || curAtk >= settings.targetAttack;
      var strDone = settings.targetStrength <= 0 || curStr >= settings.targetStrength;
      var defDone = settings.targetDefence <= 0 || curDef >= settings.targetDefence;
      if (atkDone && strDone && defDone) {
        return 'DONE';
      }
      switch (settings.combatOrder) {
        case 'balanced':
          {
            var candidates = [];
            if (!atkDone) candidates.push({
              skill: 'ATTACK',
              level: curAtk
            });
            if (!strDone) candidates.push({
              skill: 'STRENGTH',
              level: curStr
            });
            if (!defDone) candidates.push({
              skill: 'DEFENCE',
              level: curDef
            });
            candidates.sort((a, b) => a.level - b.level);
            return candidates[0].skill;
          }
        case 'atk_str_def':
          {
            if (!atkDone) return 'ATTACK';
            if (!strDone) return 'STRENGTH';
            return 'DEFENCE';
          }
        case 'str_atk_def':
          {
            if (!strDone) return 'STRENGTH';
            if (!atkDone) return 'ATTACK';
            return 'DEFENCE';
          }
        case 'focus':
        default:
          {
            if (!atkDone) return 'ATTACK';
            if (!strDone) return 'STRENGTH';
            if (!defDone) return 'DEFENCE';
            return 'DONE';
          }
      }
    }
  }, {
    key: "setDesiredAttackStyle",
    value: function setDesiredAttackStyle(skill) {
      try {
        if (skill === 'ATTACK') {
          bot.attackStyle.setStyle('Accurate');
        } else if (skill === 'STRENGTH') {
          bot.attackStyle.setStyle('Aggressive');
        } else if (skill === 'DEFENCE') {
          bot.attackStyle.setStyle('Defensive');
        }
      } catch (_unused2) {}
    }
  }, {
    key: "eatFoodIfNeeded",
    value: function eatFoodIfNeeded(game, foodName, eatAtHp) {
      var hpPercent = game.getHpPercent();
      if (hpPercent > eatAtHp) {
        return false;
      }
      if (foodName && bot.inventory.containsName(foodName)) {
        game.log("HP low (".concat(hpPercent, "%). Eating ").concat(foodName, "..."));
        bot.inventory.interactWithNames([foodName], ['Eat']);
        return true;
      }
      for (var _i = 0, _Object$entries = Object.entries(COMMON_FOOD_IDS); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          name = _Object$entries$_i[0],
          id = _Object$entries$_i[1];
        if (bot.inventory.containsId(id)) {
          game.log("HP low (".concat(hpPercent, "%). Eating ").concat(name, "..."));
          bot.inventory.interactWithIds([id], ['Eat']);
          return true;
        }
      }
      return false;
    }
  }, {
    key: "checkAndEquipBestWeapon",
    value: function checkAndEquipBestWeapon(game) {
      var atkLevel = game.getRealLevel(net.runelite.api.Skill.ATTACK);
      var _iterator2 = _createForOfIteratorHelper(MELEE_WEAPONS_TIER),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var weapon = _step2.value;
          if (atkLevel >= weapon.reqLevel) {
            if (bot.equipment.containsId(weapon.id)) {
              return false;
            }
            if (bot.inventory.containsId(weapon.id)) {
              game.log("Equipping weapon upgrade: ".concat(weapon.name, " (req Lv. ").concat(weapon.reqLevel, ")."));
              bot.inventory.interactWithIds([weapon.id], ['Wield', 'Equip', 'Wear']);
              return true;
            }
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      return false;
    }
  }, {
    key: "unequipConflictingTools",
    value: function unequipConflictingTools(game) {
      if (bot.inventory.isFull()) {
        return false;
      }
      var _iterator3 = _createForOfIteratorHelper(CONFLICTING_TOOLS),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var toolName = _step3.value;
          if (bot.equipment.containsName(toolName)) {
            game.log("Unequipping conflicting tool: ".concat(toolName));
            var equipped = bot.equipment.getEquipment();
            if (equipped && Array.isArray(equipped)) {
              var _iterator4 = _createForOfIteratorHelper(equipped),
                _step4;
              try {
                for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                  var _item$getId, _item$getId2;
                  var item = _step4.value;
                  var id = (_item$getId = item === null || item === void 0 || (_item$getId2 = item.getId) === null || _item$getId2 === void 0 ? void 0 : _item$getId2.call(item)) !== null && _item$getId !== void 0 ? _item$getId : item === null || item === void 0 ? void 0 : item.id;
                  if (id && id > 0) {
                    try {
                      var def = client.getItemDefinition(id);
                      if (def && def.getName() === toolName) {
                        bot.equipment.unequip(id);
                        return true;
                      }
                    } catch (_unused3) {}
                  }
                }
              } catch (err) {
                _iterator4.e(err);
              } finally {
                _iterator4.f();
              }
            }
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      return false;
    }
  }, {
    key: "buryBonesIfNeeded",
    value: function buryBonesIfNeeded(game) {
      if (bot.inventory.containsId(LOOT_IDS.BONES)) {
        game.log('Burying bones for Prayer XP...');
        bot.inventory.interactWithIds([LOOT_IDS.BONES], ['Bury']);
        return true;
      }
      return false;
    }
  }, {
    key: "lootDrops",
    value: function lootDrops(game, settings, zoneLabel) {
      var lootIds = [];
      if (settings.lootCoins) {
        lootIds.push(LOOT_IDS.COINS);
      }
      if (settings.lootRunes) {
        lootIds.push(LOOT_IDS.AIR_RUNE, LOOT_IDS.WATER_RUNE, LOOT_IDS.EARTH_RUNE, LOOT_IDS.FIRE_RUNE, LOOT_IDS.MIND_RUNE, LOOT_IDS.BODY_RUNE);
      }
      var isInvFull = bot.inventory.isFull();
      if (!isInvFull) {
        if (settings.lootBones) {
          lootIds.push(LOOT_IDS.BONES);
        }
        if (zoneLabel.includes('Chickens')) {
          lootIds.push(LOOT_IDS.FEATHER);
        }
        if (zoneLabel.includes('Cows')) {
          lootIds.push(LOOT_IDS.COWHIDE);
        }
      } else {
        if (zoneLabel.includes('Chickens') && bot.inventory.containsId(LOOT_IDS.FEATHER)) {
          lootIds.push(LOOT_IDS.FEATHER);
        }
      }
      if (lootIds.length === 0) {
        return false;
      }
      try {
        var groundItems = bot.tileItems.getItemsWithIds(lootIds);
        if (groundItems && groundItems.length > 0) {
          return bot.tileItems.lootItemsWithIds(lootIds, 8);
        }
      } catch (_unused4) {}
      return false;
    }
  }, {
    key: "getZone",
    value: function getZone(monsterName) {
      for (var _i2 = 0, _Object$entries2 = Object.entries(COMBAT_ZONES); _i2 < _Object$entries2.length; _i2++) {
        var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
          key = _Object$entries2$_i[0],
          zone = _Object$entries2$_i[1];
        if (key.toLowerCase().includes(monsterName.toLowerCase()) || monsterName.toLowerCase().includes(key.toLowerCase())) {
          return zone;
        }
      }
      return COMBAT_ZONES['Chickens (Lumbridge)'];
    }
  }]);
}();

function createCombatTaskHandler(game, settings, delayManager) {
  var currentZone = null;
  var currentTarget = null;
  var currentTrainedSkill = 'ATTACK';
  var idleCount = 0;
  return {
    category: 'Combat',
    onStart: () => {
      currentZone = CombatHelper.getZone(settings.combat.monster);
      currentTarget = null;
      idleCount = 0;
      CombatHelper.unequipConflictingTools(game);
      CombatHelper.checkAndEquipBestWeapon(game);
      currentTrainedSkill = CombatHelper.determineSkillToTrain(game, settings.combat);
      if (currentTrainedSkill !== 'DONE') {
        CombatHelper.setDesiredAttackStyle(currentTrainedSkill);
      }
      var atk = game.getRealLevel(net.runelite.api.Skill.ATTACK);
      var str = game.getRealLevel(net.runelite.api.Skill.STRENGTH);
      var def = game.getRealLevel(net.runelite.api.Skill.DEFENCE);
      game.log("Starting Combat: ".concat(currentZone.label, " (Current: ").concat(atk, "/").concat(str, "/").concat(def, " -> Target: ").concat(settings.combat.targetAttack, "/").concat(settings.combat.targetStrength, "/").concat(settings.combat.targetDefence, ", Training: ").concat(currentTrainedSkill, ")."));
    },
    tick: () => {
      if (!currentZone) {
        currentZone = CombatHelper.getZone(settings.combat.monster);
      }
      currentTrainedSkill = CombatHelper.determineSkillToTrain(game, settings.combat);
      if (currentTrainedSkill === 'DONE') {
        game.log('Combat targets reached!');
        return;
      }
      CombatHelper.setDesiredAttackStyle(currentTrainedSkill);
      if (CombatHelper.unequipConflictingTools(game)) {
        delayManager.setDelay(1);
        return;
      }
      if (CombatHelper.checkAndEquipBestWeapon(game)) {
        delayManager.setDelay(2);
        return;
      }
      if (CombatHelper.eatFoodIfNeeded(game, settings.combat.food, settings.combat.eatAtHp)) {
        delayManager.setDelay(2);
        return;
      }
      if (game.getHpPercent() < 20) {
        if (!game.isWebWalking()) {
          game.log('HP critically low (<20%) and out of food! Walking to safety / bank...');
          game.webWalkToNearestBank();
        }
        delayManager.setDelay(4);
        return;
      }
      if (settings.combat.buryBones && CombatHelper.buryBonesIfNeeded(game)) {
        delayManager.setDelay(2);
        return;
      }
      if (CombatHelper.lootDrops(game, settings.combat, currentZone.label)) {
        delayManager.setDelay(2);
        return;
      }
      if (currentTarget) {
        if (CombatHelper.isTargetDeadOrLost(currentTarget)) {
          game.log('Target eliminated / 0 HP. Swapping to next target.');
          currentTarget = null;
          delayManager.setDelay(1);
          return;
        }
      }
      var localPlayer = client.getLocalPlayer();
      var interacting = localPlayer ? localPlayer.getInteracting() : null;
      if (interacting && interacting instanceof net.runelite.api.NPC) {
        var activeNpc = interacting;
        if (!activeNpc.isDead() && activeNpc.getHealthRatio() !== 0) {
          currentTarget = activeNpc;
          idleCount = 0;
          delayManager.setDelay(DelayManager.getReactionTicks(settings.general.playStyle, settings.general.noobMode, game.getTotalLevel()));
          return;
        } else {
          currentTarget = null;
        }
      }
      var playerLoc = localPlayer ? localPlayer.getWorldLocation() : null;
      if (playerLoc && playerLoc.distanceTo(currentZone.areaCenter) > currentZone.radius + 4) {
        if (!game.isWebWalking()) {
          game.log("Navigating to ".concat(currentZone.label, "..."));
          game.webWalkTo(currentZone.areaCenter);
        }
        delayManager.setDelay(3);
        return;
      }
      var targetInfo = CombatHelper.findTarget(game, currentZone);
      if (targetInfo) {
        currentTarget = targetInfo.npc;
        idleCount = 0;
        game.log("Targeting [".concat(targetInfo.priority, "]: ").concat(currentTarget.getName(), " (dist: ").concat(playerLoc ? playerLoc.distanceTo(currentTarget.getWorldLocation()) : '?', ")"));
        bot.npcs.interactSupplied(currentTarget, 'Attack');
        delayManager.setDelay(DelayManager.getReactionTicks(settings.general.playStyle, settings.general.noobMode, game.getTotalLevel()));
        return;
      }
      if (++idleCount > 6) {
        game.log("Waiting for ".concat(currentZone.label, " monsters to spawn..."));
        idleCount = 0;
      }
      delayManager.setDelay(2);
    },
    isComplete: () => {
      var atk = game.getRealLevel(net.runelite.api.Skill.ATTACK);
      var str = game.getRealLevel(net.runelite.api.Skill.STRENGTH);
      var def = game.getRealLevel(net.runelite.api.Skill.DEFENCE);
      var atkDone = settings.combat.targetAttack <= 0 || atk >= settings.combat.targetAttack;
      var strDone = settings.combat.targetStrength <= 0 || str >= settings.combat.targetStrength;
      var defDone = settings.combat.targetDefence <= 0 || def >= settings.combat.targetDefence;
      if (!atkDone || !strDone || !defDone) {
        return false;
      }
      if (settings.general.strictLevelGoals) return true;
      if (currentTarget && !CombatHelper.isTargetDeadOrLost(currentTarget)) {
        return false;
      }
      return true;
    },
    getStatus: () => {
      var atk = game.getRealLevel(net.runelite.api.Skill.ATTACK);
      var str = game.getRealLevel(net.runelite.api.Skill.STRENGTH);
      var def = game.getRealLevel(net.runelite.api.Skill.DEFENCE);
      return "Combat: ".concat(atk, "/").concat(str, "/").concat(def, " (Training: ").concat(currentTrainedSkill, ")");
    }
  };
}

var EXPLORATION_WAYPOINTS = [{
  name: 'Lumbridge Church',
  point: new net.runelite.api.coords.WorldPoint(3244, 3208, 0),
  description: 'Exploring church grounds and unlocking music tracks'
}, {
  name: 'Lumbridge River Bank',
  point: new net.runelite.api.coords.WorldPoint(3240, 3226, 0),
  description: 'Wandering casually near River Lum'
}, {
  name: 'Lumbridge Graveyard',
  point: new net.runelite.api.coords.WorldPoint(3246, 3193, 0),
  description: 'Checking out the historic cemetery'
}, {
  name: "Bob's Brilliant Axes",
  point: new net.runelite.api.coords.WorldPoint(3230, 3203, 0),
  description: 'Browsing axes and smithing equipment'
}, {
  name: 'Lumbridge General Store',
  point: new net.runelite.api.coords.WorldPoint(3212, 3246, 0),
  description: 'Checking out the general store goods'
}, {
  name: 'Draynor Crossroads',
  point: new net.runelite.api.coords.WorldPoint(3185, 3228, 0),
  description: 'Walking the scenic highway toward Draynor Village'
}, {
  name: 'Fred the Farmer Fields',
  point: new net.runelite.api.coords.WorldPoint(3189, 3273, 0),
  description: 'Strolling past the northern sheep pasture'
}];
var ExplorationHandler = /*#__PURE__*/function () {
  function ExplorationHandler() {
    _classCallCheck(this, ExplorationHandler);
    _defineProperty(this, "isExploring", false);
    _defineProperty(this, "currentWaypoint", null);
    _defineProperty(this, "exploreWaitTicks", 0);
    _defineProperty(this, "lastExplorationTime", 0);
  }
  return _createClass(ExplorationHandler, [{
    key: "shouldExplore",
    value: function shouldExplore(cameraMovementEnabled) {
      var noobMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var totalLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;
      if (!cameraMovementEnabled) return false;
      var now = Date.now();
      var intervalMs = noobMode && totalLevel < 75 ? 10 * 60 * 1000 : 20 * 60 * 1000;
      return now - this.lastExplorationTime > intervalMs;
    }
  }, {
    key: "startExploration",
    value: function startExploration(game) {
      var randomIndex = Math.floor(Math.random() * EXPLORATION_WAYPOINTS.length);
      this.currentWaypoint = EXPLORATION_WAYPOINTS[randomIndex];
      this.isExploring = true;
      this.exploreWaitTicks = 0;
      this.lastExplorationTime = Date.now();
      game.log("[Exploring] Starting casual wander: ".concat(this.currentWaypoint.name, " (").concat(this.currentWaypoint.description, ")."));
    }
  }, {
    key: "tick",
    value: function tick(game, delayManager, onDone) {
      var _client$getLocalPlaye;
      if (!this.isExploring || !this.currentWaypoint) {
        return false;
      }
      var playerLoc = (_client$getLocalPlaye = client.getLocalPlayer()) === null || _client$getLocalPlaye === void 0 ? void 0 : _client$getLocalPlaye.getWorldLocation();
      if (!playerLoc) {
        this.finish(onDone);
        return true;
      }
      if (playerLoc.distanceTo(this.currentWaypoint.point) <= 4) {
        if (game.isWebWalking()) {
          game.stopWebWalk();
        }
        if (++this.exploreWaitTicks >= 4) {
          game.log("[Exploring] Reached ".concat(this.currentWaypoint.name, ". Exploration complete."));
          this.finish(onDone);
          delayManager.setDelay(2);
          return true;
        }
        delayManager.setDelay(2);
        return true;
      }
      if (!game.isWebWalking()) {
        game.webWalkTo(this.currentWaypoint.point);
      }
      delayManager.setDelay(3);
      return true;
    }
  }, {
    key: "finish",
    value: function finish(onDone) {
      this.isExploring = false;
      this.currentWaypoint = null;
      this.exploreWaitTicks = 0;
      onDone();
    }
  }, {
    key: "isRunning",
    value: function isRunning() {
      return this.isExploring;
    }
  }]);
}();

var AccountBuilderRunner = /*#__PURE__*/function () {
  function AccountBuilderRunner(game, settings) {
    _classCallCheck(this, AccountBuilderRunner);
    _defineProperty(this, "game", void 0);
    _defineProperty(this, "settings", void 0);
    _defineProperty(this, "delayManager", new DelayManager());
    _defineProperty(this, "exploration", new ExplorationHandler());
    _defineProperty(this, "handlers", new Map());
    _defineProperty(this, "state", 'PLANNING');
    _defineProperty(this, "queueIndex", 0);
    _defineProperty(this, "currentTask", null);
    _defineProperty(this, "pending", null);
    _defineProperty(this, "startTime", Date.now());
    _defineProperty(this, "totalCompletedTasks", 0);
    _defineProperty(this, "isInitialized", false);
    this.game = game;
    this.settings = settings;
    this.registerDefaultHandlers();
  }
  return _createClass(AccountBuilderRunner, [{
    key: "registerHandler",
    value: function registerHandler(handler) {
      this.handlers.set(handler.category, handler);
    }
  }, {
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
      if (this.pending) {
        if (this.game.isDialogueOpen()) {
          this.game.handleDialogue();
        }
        if (++this.pending.ticks > 25) {
          this.game.log("Action timeout: ".concat(this.pending.label, ". Retrying..."));
          this.pending = null;
          return;
        }
        if (this.pending.check()) {
          var done = this.pending.done;
          this.pending = null;
          done();
        }
        return;
      }
      if (this.settings.general.targetTotalLevel > 0 && this.game.getTotalLevel() >= this.settings.general.targetTotalLevel) {
        this.game.gameMessage("Target Total Level reached: ".concat(this.game.getTotalLevel(), " / ").concat(this.settings.general.targetTotalLevel, "! Stopping."));
        this.state = 'ALL_COMPLETED';
      }
      switch (this.state) {
        case 'PLANNING':
          this.handlePlanning();
          break;
        case 'WALK_TO_BANK':
          this.handleWalkToBank();
          break;
        case 'BANKING':
          this.handleBanking();
          break;
        case 'RUNNING_TASK':
          this.handleRunningTask();
          break;
        case 'EXPLORING':
          this.handleExploring();
          break;
        case 'TASK_COMPLETED':
          this.handleTaskCompleted();
          break;
        case 'ALL_COMPLETED':
          this.handleAllCompleted();
          break;
      }
    }
  }, {
    key: "handlePlanning",
    value: function handlePlanning() {
      var queue = this.settings.enabledCategories;
      if (!queue || queue.length === 0) {
        this.game.log('Queue is empty. No tasks to execute.');
        this.state = 'ALL_COMPLETED';
        return;
      }
      var remainingCategories = queue.filter(cat => {
        var h = this.handlers.get(cat);
        return h && !h.isComplete();
      });
      if (remainingCategories.length === 0) {
        this.game.log('All enabled tasks have completed their goals!');
        this.state = 'ALL_COMPLETED';
        return;
      }
      var targetCategory = null;
      if (!targetCategory) {
        while (this.queueIndex < queue.length) {
          var candidate = queue[this.queueIndex];
          var h = this.handlers.get(candidate);
          if (h && !h.isComplete()) {
            targetCategory = candidate;
            break;
          }
          this.queueIndex++;
        }
      }
      if (!targetCategory) {
        this.game.log('All queued tasks have been completed!');
        this.state = 'ALL_COMPLETED';
        return;
      }
      var handler = this.handlers.get(targetCategory);
      if (!handler) {
        this.game.log("No handler registered for ".concat(targetCategory, ". Advancing..."));
        this.queueIndex++;
        return;
      }
      CombatHelper.unequipConflictingTools(this.game);
      this.currentTask = handler;
      this.game.log("Starting task: ".concat(targetCategory, " (Remaining tasks: ").concat(remainingCategories.length, ")."));
      this.game.gameMessage("Switched active task to: ".concat(targetCategory, "."));
      handler.onStart();
      this.state = 'RUNNING_TASK';
    }
  }, {
    key: "handleWalkToBank",
    value: function handleWalkToBank() {
      this.state = 'BANKING';
    }
  }, {
    key: "handleBanking",
    value: function handleBanking() {
      if (this.game.isBankOpen()) {
        if (this.game.getEmptySlots() < 28) {
          this.game.log('Depositing inventory into bank...');
          this.game.depositAll();
          this.delay(2);
          return;
        }
        this.game.closeBank();
        if (this.currentTask) {
          this.currentTask.onStart();
          this.state = 'RUNNING_TASK';
        } else {
          this.state = 'PLANNING';
        }
        return;
      }
      if (this.game.isDialogueOpen()) {
        this.game.log('Handling dialogue / tutorial during banking...');
        this.game.handleDialogue();
        this.delay(1);
        return;
      }
      if (this.game.isWebWalking()) {
        return;
      }
      this.game.log('Opening bank...');
      this.game.openBank();
      this.delay(2);
    }
  }, {
    key: "handleRunningTask",
    value: function handleRunningTask() {
      if (!this.currentTask) {
        this.state = 'PLANNING';
        return;
      }
      if (this.currentTask.isComplete()) {
        this.state = 'TASK_COMPLETED';
        return;
      }
      this.currentTask.tick();
    }
  }, {
    key: "handleTaskCompleted",
    value: function handleTaskCompleted() {
      var finishedCat = this.currentTask ? this.currentTask.category : 'Task';
      this.game.gameMessage("\uD83C\uDF89 Goal reached for ".concat(finishedCat, "!"));
      this.game.log("Goal reached for ".concat(finishedCat, ". Advancing queue..."));
      if (this.currentTask && typeof this.currentTask.onFinish === 'function') {
        this.currentTask.onFinish();
      }
      this.totalCompletedTasks++;
      this.queueIndex++;
      this.currentTask = null;
      if (this.exploration.shouldExplore(this.settings.general.cameraMovement, this.settings.general.noobMode, this.game.getTotalLevel())) {
        this.exploration.startExploration(this.game);
        this.state = 'EXPLORING';
        return;
      }
      this.delay(DelayManager.getReactionTicks(this.settings.general.playStyle, this.settings.general.noobMode, this.game.getTotalLevel()));
      this.state = 'PLANNING';
    }
  }, {
    key: "handleExploring",
    value: function handleExploring() {
      this.exploration.tick(this.game, this.delayManager, () => {
        this.state = 'PLANNING';
      });
    }
  }, {
    key: "handleAllCompleted",
    value: function handleAllCompleted() {
      if (!this.isInitialized) {
        this.isInitialized = true;
        this.game.gameMessage('🏁 All tasks in execution queue completed successfully!');
        this.game.log('All tasks in execution queue completed. Stopping bot.');
        this.game.terminate();
      }
    }
  }, {
    key: "updateCounters",
    value: function updateCounters() {
      var elapsedMinutes = Math.floor((Date.now() - this.startTime) / 60000);
      this.game.setCounter('Time (min)', elapsedMinutes);
      this.game.setCounter('Total Lvl', this.game.getTotalLevel());
      this.game.setCounter('Tasks Done', this.totalCompletedTasks);
      this.game.setCounter('Queue Left', Math.max(0, this.settings.enabledCategories.length - this.queueIndex));
    }
  }, {
    key: "wait",
    value: function wait(label, check, done) {
      this.pending = {
        label,
        check,
        done,
        ticks: 0
      };
    }
  }, {
    key: "delay",
    value: function delay(ticks) {
      this.delayManager.setDelay(ticks);
    }
  }, {
    key: "registerDefaultHandlers",
    value: function registerDefaultHandlers() {
      var _this = this;
      var skillMap = {
        Combat: net.runelite.api.Skill.ATTACK,
        Ranged: net.runelite.api.Skill.RANGED,
        Magic: net.runelite.api.Skill.MAGIC,
        Prayer: net.runelite.api.Skill.PRAYER,
        Cooking: net.runelite.api.Skill.COOKING,
        Crafting: net.runelite.api.Skill.CRAFTING,
        Firemaking: net.runelite.api.Skill.FIREMAKING,
        Fishing: net.runelite.api.Skill.FISHING,
        Mining: net.runelite.api.Skill.MINING,
        Runecrafting: net.runelite.api.Skill.RUNECRAFT,
        Smithing: net.runelite.api.Skill.SMITHING,
        Woodcutting: net.runelite.api.Skill.WOODCUTTING
      };
      var getTargetLevel = cat => {
        switch (cat) {
          case 'Combat':
            return Math.max(this.settings.combat.targetAttack, this.settings.combat.targetStrength, this.settings.combat.targetDefence);
          case 'Ranged':
            return this.settings.ranged.targetLevel;
          case 'Magic':
            return this.settings.magic.targetLevel;
          case 'Prayer':
            return this.settings.prayer.targetLevel;
          case 'Cooking':
            return this.settings.cooking.targetLevel;
          case 'Crafting':
            return this.settings.crafting.targetLevel;
          case 'Firemaking':
            return this.settings.firemaking.targetLevel;
          case 'Fishing':
            return this.settings.fishing.targetLevel;
          case 'Mining':
            return this.settings.mining.targetLevel;
          case 'Runecrafting':
            return this.settings.runecrafting.targetLevel;
          case 'Smithing':
            return this.settings.smithing.targetLevel;
          case 'Woodcutting':
            return this.settings.woodcutting.targetLevel;
          default:
            return 0;
        }
      };
      var _loop = function _loop() {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          cat = _Object$entries$_i[0],
          skill = _Object$entries$_i[1];
        var category = cat;
        var targetLvl = getTargetLevel(category);
        _this.registerHandler({
          category,
          onStart: () => {
            var curr = _this.game.getRealLevel(skill);
            _this.game.log("Initialized ".concat(category, " (Current: ").concat(curr, " / Target: ").concat(targetLvl || 'Unlimited', ")."));
          },
          tick: () => {
            _this.delay(5);
          },
          isComplete: () => {
            if (!targetLvl || targetLvl <= 0) return false;
            return _this.game.getRealLevel(skill) >= targetLvl;
          },
          getStatus: () => {
            return "".concat(category, ": Lv. ").concat(_this.game.getRealLevel(skill), " / ").concat(targetLvl || 'Max');
          }
        });
      };
      for (var _i = 0, _Object$entries = Object.entries(skillMap); _i < _Object$entries.length; _i++) {
        _loop();
      }
      this.registerHandler(createCombatTaskHandler(this.game, this.settings, this.delayManager));
      this.registerHandler(createQuestTaskHandler(this.game, this.settings, this.delayManager));
      this.registerHandler(createWoodcuttingTaskHandler(this.game, this.settings, this.delayManager));
      this.registerHandler(createFiremakingTaskHandler(this.game, this.settings, this.delayManager));
      this.registerHandler(createFishingTaskHandler(this.game, this.settings, this.delayManager));
      this.registerHandler(createCookingTaskHandler(this.game, this.settings, this.delayManager));
      this.registerHandler({
        category: 'Moneymaking',
        onStart: () => {
          this.game.log("Initialized Moneymaking: ".concat(this.settings.moneymaking.method, " (Target GP: ").concat(this.settings.moneymaking.targetGp, ")."));
        },
        tick: () => {
          this.delay(5);
        },
        isComplete: () => {
          return false;
        },
        getStatus: () => "Moneymaking: ".concat(this.settings.moneymaking.method)
      });
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
      game.gameMessage('Configuration was cancelled.');
      game.terminate();
      return;
    }
    if (!runner) {
      var settings = selectedSettings();
      if (!settings) return;
      runner = new AccountBuilderRunner(game, settings);
      var queue = settings.enabledCategories;
      game.gameMessage("Started! Queued ".concat(queue.length, " tasks: ").concat(queue.join(', '), " (Playstyle: ").concat(settings.general.playStyle, ")."));
      game.setCounter('Queued Tasks', queue.length);
      game.setCounter('Play Style', settings.general.playStyle === 'fast' ? 1 : settings.general.playStyle === 'lazy' ? 3 : 2);
    }
    runner.tick();
  } catch (error) {
    game.stopWebWalk();
    game.gameMessage('Error: ' + String(error));
    game.log('Fatal script error: ' + String(error));
    game.terminate();
  }
}
function onEnd() {
  game.stopWebWalk();
  closeWindow();
  game.gameMessage('Stopped.');
}
