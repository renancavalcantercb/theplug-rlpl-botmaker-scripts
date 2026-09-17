function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
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

var FoodItem;
(function (FoodItem) {
  FoodItem[FoodItem["RAW_BEEF"] = 2132] = "RAW_BEEF";
  FoodItem[FoodItem["RAW_CHICKEN"] = 2138] = "RAW_CHICKEN";
  FoodItem[FoodItem["RAW_MEAT"] = 2134] = "RAW_MEAT";
  FoodItem[FoodItem["RAW_SHRIMPS"] = 317] = "RAW_SHRIMPS";
  FoodItem[FoodItem["RAW_SARDINE"] = 327] = "RAW_SARDINE";
  FoodItem[FoodItem["RAW_ANCHOVIES"] = 321] = "RAW_ANCHOVIES";
  FoodItem[FoodItem["RAW_HERRING"] = 345] = "RAW_HERRING";
  FoodItem[FoodItem["RAW_MACKEREL"] = 353] = "RAW_MACKEREL";
  FoodItem[FoodItem["RAW_TROUT"] = 335] = "RAW_TROUT";
  FoodItem[FoodItem["RAW_COD"] = 341] = "RAW_COD";
  FoodItem[FoodItem["RAW_PIKE"] = 349] = "RAW_PIKE";
  FoodItem[FoodItem["RAW_SALMON"] = 331] = "RAW_SALMON";
  FoodItem[FoodItem["RAW_TUNA"] = 359] = "RAW_TUNA";
  FoodItem[FoodItem["RAW_KARAMBWAN"] = 3142] = "RAW_KARAMBWAN";
  FoodItem[FoodItem["RAW_RAINBOW_FISH"] = 10138] = "RAW_RAINBOW_FISH";
  FoodItem[FoodItem["RAW_LOBSTER"] = 377] = "RAW_LOBSTER";
  FoodItem[FoodItem["RAW_BASS"] = 363] = "RAW_BASS";
  FoodItem[FoodItem["RAW_SWORDFISH"] = 371] = "RAW_SWORDFISH";
  FoodItem[FoodItem["RAW_LAVA_EEL"] = 2149] = "RAW_LAVA_EEL";
  FoodItem[FoodItem["RAW_MONKFISH"] = 7944] = "RAW_MONKFISH";
  FoodItem[FoodItem["RAW_SHARK"] = 383] = "RAW_SHARK";
  FoodItem[FoodItem["RAW_SEA_TURTLE"] = 395] = "RAW_SEA_TURTLE";
  FoodItem[FoodItem["RAW_ANGLERFISH"] = 13439] = "RAW_ANGLERFISH";
  FoodItem[FoodItem["RAW_DARK_CRAB"] = 11934] = "RAW_DARK_CRAB";
  FoodItem[FoodItem["RAW_MANTA_RAY"] = 389] = "RAW_MANTA_RAY";
})(FoodItem || (FoodItem = {}));
var COOKABLE_FOODS = [{
  id: FoodItem.RAW_BEEF,
  name: 'Raw beef',
  level: 1,
  cookedId: 2142,
  xp: 30
}, {
  id: FoodItem.RAW_CHICKEN,
  name: 'Raw chicken',
  level: 1,
  cookedId: 2140,
  xp: 30
}, {
  id: FoodItem.RAW_MEAT,
  name: 'Raw meat',
  level: 1,
  cookedId: 2142,
  xp: 30
}, {
  id: FoodItem.RAW_SHRIMPS,
  name: 'Raw shrimps',
  level: 1,
  cookedId: 315,
  xp: 30
}, {
  id: FoodItem.RAW_SARDINE,
  name: 'Raw sardine',
  level: 1,
  cookedId: 325,
  xp: 40
}, {
  id: FoodItem.RAW_ANCHOVIES,
  name: 'Raw anchovies',
  level: 1,
  cookedId: 319,
  xp: 30
}, {
  id: FoodItem.RAW_HERRING,
  name: 'Raw herring',
  level: 5,
  cookedId: 347,
  xp: 50
}, {
  id: FoodItem.RAW_MACKEREL,
  name: 'Raw mackerel',
  level: 10,
  cookedId: 355,
  xp: 60
}, {
  id: FoodItem.RAW_TROUT,
  name: 'Raw trout',
  level: 15,
  cookedId: 333,
  xp: 70
}, {
  id: FoodItem.RAW_COD,
  name: 'Raw cod',
  level: 18,
  cookedId: 339,
  xp: 75
}, {
  id: FoodItem.RAW_PIKE,
  name: 'Raw pike',
  level: 20,
  cookedId: 351,
  xp: 80
}, {
  id: FoodItem.RAW_SALMON,
  name: 'Raw salmon',
  level: 25,
  cookedId: 329,
  xp: 90
}, {
  id: FoodItem.RAW_TUNA,
  name: 'Raw tuna',
  level: 30,
  cookedId: 361,
  xp: 100
}, {
  id: FoodItem.RAW_KARAMBWAN,
  name: 'Raw karambwan',
  level: 30,
  cookedId: 3144,
  xp: 190
}, {
  id: FoodItem.RAW_RAINBOW_FISH,
  name: 'Raw rainbow fish',
  level: 35,
  cookedId: 10136,
  xp: 110
}, {
  id: FoodItem.RAW_LOBSTER,
  name: 'Raw lobster',
  level: 40,
  cookedId: 379,
  xp: 120
}, {
  id: FoodItem.RAW_BASS,
  name: 'Raw bass',
  level: 43,
  cookedId: 365,
  xp: 130
}, {
  id: FoodItem.RAW_SWORDFISH,
  name: 'Raw swordfish',
  level: 45,
  cookedId: 373,
  xp: 140
}, {
  id: FoodItem.RAW_LAVA_EEL,
  name: 'Raw lava eel',
  level: 53,
  cookedId: 2149,
  xp: 30
}, {
  id: FoodItem.RAW_MONKFISH,
  name: 'Raw monkfish',
  level: 62,
  cookedId: 7946,
  xp: 150
}, {
  id: FoodItem.RAW_SHARK,
  name: 'Raw shark',
  level: 80,
  cookedId: 385,
  xp: 210
}, {
  id: FoodItem.RAW_SEA_TURTLE,
  name: 'Raw sea turtle',
  level: 82,
  cookedId: 397,
  xp: 211
}, {
  id: FoodItem.RAW_ANGLERFISH,
  name: 'Raw anglerfish',
  level: 84,
  cookedId: 13441,
  xp: 230
}, {
  id: FoodItem.RAW_DARK_CRAB,
  name: 'Raw dark crab',
  level: 90,
  cookedId: 11936,
  xp: 215
}, {
  id: FoodItem.RAW_MANTA_RAY,
  name: 'Raw manta ray',
  level: 91,
  cookedId: 391,
  xp: 216
}];
var getFoodDefById = id => {
  return COOKABLE_FOODS.find(f => f.id === id);
};
var findHighestLevelFoodInBank = (currentLevel, getBankQuantity) => {
  var sorted = [].concat(COOKABLE_FOODS).sort((a, b) => b.level - a.level);
  var _iterator = _createForOfIteratorHelper(sorted),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var food = _step.value;
      if (food.level <= currentLevel && getBankQuantity(food.id) > 0) {
        return food;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return null;
};

var ROGUES_DEN_BANK_POINT = new net.runelite.api.coords.WorldPoint(3040, 4969, 1);
var ROGUES_DEN_REGION_ID = 12190;
var CHEST_OBJECT_ID = 26707;
var FIRE_OBJECT_ID = 43475;
var COOK_WIDGET_ID = 17694735;
var EMERALD_BENEDICT_NAME = 'Emerald Benedict';
var game = {
  isLoggedIn: () => client.getGameState() === net.runelite.api.GameState.LOGGED_IN && client.getLocalPlayer() !== null,
  playerLocation: () => {
    var _player$getWorldLocat;
    var player = client.getLocalPlayer();
    if (!player) return null;
    return (_player$getWorldLocat = player.getWorldLocation()) !== null && _player$getWorldLocat !== void 0 ? _player$getWorldLocat : null;
  },
  isAtRoguesDen: function isAtRoguesDen() {
    var maxDistance = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 20;
    var loc = game.playerLocation();
    if (!loc) return false;
    if (loc.getPlane() !== ROGUES_DEN_BANK_POINT.getPlane()) return false;
    if (typeof loc.getRegionID === 'function' && loc.getRegionID() === ROGUES_DEN_REGION_ID) {
      return true;
    }
    return loc.distanceTo(ROGUES_DEN_BANK_POINT) <= maxDistance;
  },
  getCookingLevel: () => client.getBoostedSkillLevel(net.runelite.api.Skill.COOKING),
  getRealCookingLevel: () => client.getRealSkillLevel(net.runelite.api.Skill.COOKING),
  getCookingExperience: () => {
    try {
      if (typeof client.getSkillExperience === 'function') {
        return client.getSkillExperience(net.runelite.api.Skill.COOKING) || 0;
      }
    } catch (_unused) {}
    return 0;
  },
  getEmptySlots: () => bot.inventory.getEmptySlots(),
  getInventoryQuantity: id => bot.inventory.getQuantityOfId(id),
  getBankQuantity: id => bot.bank.getQuantityOfId(id),
  isBankOpen: () => bot.bank.isOpen(),
  isBankBusy: () => bot.bank.isBanking(),
  openBank: () => {
    var bankers = bot.npcs.getWithNames([EMERALD_BENEDICT_NAME]);
    if (bankers && bankers.length > 0) {
      bot.npcs.interactSupplied(bankers[0], 'Bank');
      return;
    }
    var chests = bot.objects.getTileObjectsWithIds([CHEST_OBJECT_ID]);
    if (chests && chests.length > 0) {
      bot.objects.interactSuppliedObject(chests[0], 'Use');
    } else {
      bot.bank.open();
    }
  },
  closeBank: () => {
    bot.bank.close();
  },
  depositAll: () => {
    bot.bank.depositAll();
  },
  withdrawAll: id => {
    bot.bank.withdrawAllWithId(id);
  },
  interactFire: () => {
    var fires = bot.objects.getTileObjectsWithIds([FIRE_OBJECT_ID]);
    if (fires && fires.length > 0) {
      bot.objects.interactSuppliedObject(fires[0], 'Cook');
    } else {
      bot.objects.interactObject('Fire', 'Cook');
    }
  },
  isMakeMenuVisible: () => {
    var widget = client.getWidget(COOK_WIDGET_ID);
    return widget !== null && !widget.isHidden();
  },
  clickCookWidget: () => {
    bot.widgets.interactSpecifiedWidget(COOK_WIDGET_ID, 1, 57, -1);
  },
  handleDialogue: () => {
    bot.widgets.handleDialogue([]);
  },
  isIdle: () => bot.localPlayerIdle(),
  isMoving: () => bot.localPlayerMoving(),
  isWebWalking: () => bot.walking.isWebWalking(),
  webWalkToRoguesDen: () => {
    bot.walking.webWalkStart(ROGUES_DEN_BANK_POINT);
  },
  stopWebWalk: () => {
    if (bot.walking.isWebWalking()) {
      bot.walking.webWalkCancel();
    }
  },
  getTotalLevel: () => {
    try {
      if (typeof client.getTotalLevel === 'function') {
        return client.getTotalLevel() || 0;
      }
    } catch (_unused2) {}
    return 0;
  },
  getPlayerName: () => {
    try {
      var player = client.getLocalPlayer();
      if (player) {
        var _player$getName;
        return String((_player$getName = player.getName()) !== null && _player$getName !== void 0 ? _player$getName : '');
      }
    } catch (_unused3) {}
    return '';
  },
  log: message => bot.printLogMessage('[AIO Cooking - xulixna] ' + message),
  gameMessage: message => bot.printGameMessage('[AIO Cooking - xulixna] ' + message),
  setCounter: (name, value) => bot.counters.setCounter(name, value),
  terminate: () => bot.terminate()
};

function createCookingRunner(game, settings) {
  var state = 'check_location';
  var pending = null;
  var currentFood = null;
  var targetReached = false;
  var idleTicks = 0;
  var lastRawCount = 0;
  var totalCooked = 0;
  var retries = 0;
  var delayTicks = 0;
  var startTime = Date.now();
  var startXp = -1;
  var fallbackXpGained = 0;
  var ticksSinceCounterUpdate = 0;
  var updateDisplayCounters = () => {
    var _getFoodDefById$name, _getFoodDefById;
    var elapsedMs = Math.max(1, Date.now() - startTime);
    var elapsedHours = elapsedMs / 3600000;
    if (startXp === -1) {
      var _currentXp = game.getCookingExperience();
      if (_currentXp > 0) {
        startXp = _currentXp;
      }
    }
    var xpGained = 0;
    var currentXp = game.getCookingExperience();
    if (startXp > 0 && currentXp >= startXp) {
      xpGained = currentXp - startXp;
    } else {
      xpGained = fallbackXpGained;
    }
    var xpPerHour = elapsedHours > 0.002 ? Math.floor(xpGained / elapsedHours) : 0;
    var modeLabel = settings.mode === 'progressive' ? 'Mode [Progressive]' : "Mode [Fixed: ".concat((_getFoodDefById$name = (_getFoodDefById = getFoodDefById(settings.fixedFoodId)) === null || _getFoodDefById === void 0 ? void 0 : _getFoodDefById.name) !== null && _getFoodDefById$name !== void 0 ? _getFoodDefById$name : 'Food', "]");
    game.setCounter(modeLabel, 1);
    var styleLabel = settings.playStyle === 'lazy' ? 'Style [Lazy AFK]' : 'Style [Normal]';
    game.setCounter(styleLabel, 1);
    var currentLvl = game.getRealCookingLevel();
    if (currentLvl > 0) {
      game.setCounter('Cooking Level', currentLvl);
    }
    if (settings.targetLevel > 0) {
      game.setCounter('Target Level', settings.targetLevel);
    }
    game.setCounter('XP Gained', xpGained);
    game.setCounter('XP / hr', xpPerHour);
    game.setCounter('Time (min)', Math.floor(elapsedMs / 60000));
  };
  var stop = reason => {
    state = 'stopped';
    pending = null;
    game.log(reason);
    game.gameMessage(reason);
    game.terminate();
  };
  var calculatePostCookingDelay = () => {
    var totalLevel = game.getTotalLevel();
    var playerName = game.getPlayerName();
    var seed = totalLevel > 0 ? totalLevel * 17 : 1337;
    for (var i = 0; i < playerName.length; i++) {
      seed = (seed << 5) - seed + playerName.charCodeAt(i) | 0;
    }
    seed = Math.abs(seed);
    if (settings.playStyle === 'lazy') {
      var accountBias = seed % 6;
      var base = 5 + accountBias;
      var variance = Math.floor(Math.random() * 8) - 1;
      var delay = Math.max(4, Math.min(16, base + variance));
      return delay;
    } else {
      var _accountBias = seed % 2;
      var _variance = Math.floor(Math.random() * 2);
      return Math.max(1, Math.min(4, 1 + _accountBias + _variance));
    }
  };
  var microDelay = (minTicks, maxTicks) => {
    var diff = Math.max(0, maxTicks - minTicks);
    var ticks = minTicks + Math.floor(Math.random() * (diff + 1));
    if (ticks > 0) {
      delayTicks = ticks;
    }
  };
  var wait = function wait(label, action, check, done) {
    var ticks = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 15;
    pending = {
      label,
      check,
      done,
      ticks
    };
    action();
  };
  var tick = () => {
    if (state === 'stopped' || !game.isLoggedIn()) {
      return;
    }
    if (delayTicks > 0) {
      delayTicks--;
      return;
    }
    if (++ticksSinceCounterUpdate >= 5) {
      ticksSinceCounterUpdate = 0;
      updateDisplayCounters();
    }
    if (!targetReached && settings.targetLevel > 0 && game.getRealCookingLevel() >= settings.targetLevel) {
      targetReached = true;
      game.log("Target level ".concat(settings.targetLevel, " reached! Returning to bank to finish."));
      state = 'open_bank';
      pending = null;
    }
    if (pending) {
      if (pending.check()) {
        var done = pending.done;
        pending = null;
        done();
      } else if (--pending.ticks <= 0) {
        var label = pending.label;
        pending = null;
        game.log("Action timed out: ".concat(label, ". Retrying..."));
        if (++retries > 3) {
          stop("Failed repeatedly on action: ".concat(label));
          return;
        }
        state = 'open_bank';
      }
      return;
    }
    switch (state) {
      case 'check_location':
        {
          if (!game.isAtRoguesDen(20)) {
            game.log('Player is not at Rogues\' Den bank. Starting WebWalk to WorldPoint(3040, 4969, 1)...');
            game.gameMessage('Walking to Rogues\' Den via WebWalker...');
            game.webWalkToRoguesDen();
            state = 'walking_to_bank';
            break;
          }
          game.log('Verified location: Rogues\' Den Bank.');
          state = 'open_bank';
          break;
        }
      case 'walking_to_bank':
        {
          if (game.isAtRoguesDen(20)) {
            game.log('Arrived at Rogues\' Den! Transitioning to bank.');
            game.stopWebWalk();
            state = 'open_bank';
            break;
          }
          if (!game.isWebWalking()) {
            game.log('WebWalk stopped before arriving. Restarting WebWalk to Rogues\' Den...');
            game.webWalkToRoguesDen();
          }
          break;
        }
      case 'open_bank':
        {
          if (game.isBankOpen()) {
            state = 'deposit';
          } else {
            wait('open bank (Emerald Benedict)', () => game.openBank(), () => game.isBankOpen(), () => {
              retries = 0;
              state = 'deposit';
            }, 20);
          }
          break;
        }
      case 'deposit':
        {
          if (game.getEmptySlots() === 28) {
            state = 'plan_food';
          } else {
            wait('deposit inventory', () => game.depositAll(), () => game.getEmptySlots() === 28, () => {
              retries = 0;
              if (settings.playStyle === 'lazy') {
                microDelay(1, 2);
              }
              state = 'plan_food';
            }, 15);
          }
          break;
        }
      case 'plan_food':
        {
          if (targetReached) {
            stop("Finished! Target level ".concat(settings.targetLevel, " reached. Total food cooked: ").concat(totalCooked));
            break;
          }
          var currentLevel = game.getCookingLevel();
          if (settings.mode === 'progressive') {
            var bestFood = findHighestLevelFoodInBank(currentLevel, id => game.getBankQuantity(id));
            if (!bestFood) {
              stop("Progressive mode: No cookable raw food found in bank for cooking level ".concat(currentLevel, "."));
              break;
            }
            currentFood = bestFood;
            game.log("[Progressive] Selected highest level food: ".concat(bestFood.name, " (Lvl ").concat(bestFood.level, "), bank count: ").concat(game.getBankQuantity(bestFood.id)));
          } else {
            var food = getFoodDefById(settings.fixedFoodId);
            if (!food) {
              stop("Invalid fixed food ID: ".concat(settings.fixedFoodId));
              break;
            }
            if (food.level > currentLevel) {
              stop("Cooking level too low for ".concat(food.name, "! Required: ").concat(food.level, ", Current: ").concat(currentLevel));
              break;
            }
            if (game.getBankQuantity(food.id) <= 0) {
              stop("Out of raw food in bank for fixed item: ".concat(food.name, ". Finished!"));
              break;
            }
            currentFood = food;
            game.log("[Fixed] Selected food: ".concat(food.name, ", bank count: ").concat(game.getBankQuantity(food.id)));
          }
          state = 'withdraw';
          break;
        }
      case 'withdraw':
        {
          var _food = currentFood;
          if (!_food) {
            state = 'plan_food';
            break;
          }
          wait("withdraw ".concat(_food.name), () => game.withdrawAll(_food.id), () => game.getInventoryQuantity(_food.id) > 0, () => {
            retries = 0;
            lastRawCount = game.getInventoryQuantity(_food.id);
            state = 'close_bank';
          }, 15);
          break;
        }
      case 'close_bank':
        {
          wait('close bank', () => game.closeBank(), () => !game.isBankOpen(), () => {
            retries = 0;
            if (settings.playStyle === 'lazy') {
              microDelay(1, 3);
            } else {
              microDelay(0, 1);
            }
            state = 'cook_fire';
          }, 15);
          break;
        }
      case 'cook_fire':
        {
          var _food2 = currentFood;
          if (!_food2 || game.getInventoryQuantity(_food2.id) === 0) {
            state = 'open_bank';
            break;
          }
          if (game.isMakeMenuVisible()) {
            if (settings.playStyle === 'lazy') {
              microDelay(1, 2);
            }
            state = 'make_menu';
            break;
          }
          wait('cook on fire', () => game.interactFire(), () => game.isMakeMenuVisible(), () => {
            retries = 0;
            state = 'make_menu';
          }, 15);
          break;
        }
      case 'make_menu':
        {
          if (!game.isMakeMenuVisible()) {
            state = 'cook_fire';
            break;
          }
          wait('click cook option in make widget', () => game.clickCookWidget(), () => !game.isMakeMenuVisible(), () => {
            retries = 0;
            idleTicks = 0;
            if (settings.playStyle === 'lazy') {
              microDelay(1, 2);
            }
            state = 'cooking';
          }, 10);
          break;
        }
      case 'cooking':
        {
          var _food3 = currentFood;
          if (!_food3) {
            state = 'open_bank';
            break;
          }
          var currentRaw = game.getInventoryQuantity(_food3.id);
          if (currentRaw === 0) {
            var cookedInBatch = lastRawCount;
            totalCooked += cookedInBatch;
            if (_food3.xp) {
              fallbackXpGained += cookedInBatch * _food3.xp;
            }
            updateDisplayCounters();
            game.log("Batch complete! Total ".concat(_food3.name, " cooked: ").concat(totalCooked));
            var delay = calculatePostCookingDelay();
            var secs = (delay * 0.6).toFixed(1);
            game.log("[Reaction] Waiting ".concat(delay, " ticks (~").concat(secs, "s) before banking (").concat(settings.playStyle, " mode)..."));
            delayTicks = delay;
            state = 'open_bank';
            break;
          }
          if (currentRaw < lastRawCount) {
            var cooked = lastRawCount - currentRaw;
            totalCooked += cooked;
            if (_food3.xp) {
              fallbackXpGained += cooked * _food3.xp;
            }
            lastRawCount = currentRaw;
            idleTicks = 0;
            updateDisplayCounters();
          } else {
            idleTicks++;
          }
          game.handleDialogue();
          if (idleTicks > 6) {
            game.log("Cooking paused or interrupted (".concat(currentRaw, " raw food remaining). Re-cooking on fire..."));
            idleTicks = 0;
            state = 'cook_fire';
          }
          break;
        }
    }
  };
  return {
    tick
  };
}

var CACHE_PREFIX = 'aioCooking.';
var defaultSettings = {
  mode: 'progressive',
  fixedFoodId: FoodItem.RAW_PIKE,
  targetLevel: 0,
  playStyle: 'normal'
};
var loadSettings = () => {
  var configured = bot.bmCache.getBoolean(CACHE_PREFIX + 'configured', false);
  if (!configured) {
    return _objectSpread2({}, defaultSettings);
  }
  var modeStr = bot.bmCache.getString(CACHE_PREFIX + 'mode', 'progressive');
  var mode = modeStr === 'fixed' ? 'fixed' : 'progressive';
  var fixedFoodId = bot.bmCache.getInt(CACHE_PREFIX + 'fixedFoodId', FoodItem.RAW_PIKE);
  var targetLevel = bot.bmCache.getInt(CACHE_PREFIX + 'targetLevel', 0);
  var playStyleStr = bot.bmCache.getString(CACHE_PREFIX + 'playStyle', 'normal');
  var playStyle = playStyleStr === 'lazy' ? 'lazy' : 'normal';
  return {
    mode,
    fixedFoodId,
    targetLevel,
    playStyle
  };
};
var saveSettings = settings => {
  bot.bmCache.saveBoolean(CACHE_PREFIX + 'configured', true);
  bot.bmCache.saveString(CACHE_PREFIX + 'mode', settings.mode);
  bot.bmCache.saveInt(CACHE_PREFIX + 'fixedFoodId', settings.fixedFoodId);
  bot.bmCache.saveInt(CACHE_PREFIX + 'targetLevel', settings.targetLevel);
  bot.bmCache.saveString(CACHE_PREFIX + 'playStyle', settings.playStyle);
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
  var panel = layout => {
    var p = new javax.swing.JPanel(layout);
    p.setBackground(background);
    return p;
  };
  var label = function label(text) {
    var bold = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var l = new javax.swing.JLabel(text);
    l.setForeground(foreground);
    if (bold) {
      l.setFont(new java.awt.Font('Dialog', java.awt.Font.BOLD, 14));
    }
    return l;
  };
  var createSectionBorder = title => {
    var line = javax.swing.BorderFactory.createLineBorder(borderLine, 1);
    var border = javax.swing.BorderFactory.createTitledBorder(line, title);
    border.setTitleColor(accent);
    return border;
  };
  frame = new javax.swing.JFrame("AIO Cooking - Rogues' Den | by xulixna");
  var mainPanel = panel(new java.awt.BorderLayout(10, 10));
  mainPanel.setBorder(javax.swing.BorderFactory.createEmptyBorder(15, 15, 15, 15));
  var headerPanel = panel(new java.awt.GridLayout(2, 1, 2, 2));
  var titleLabel = label('AIO Cooking', true);
  titleLabel.setForeground(accent);
  titleLabel.setFont(new java.awt.Font('Dialog', java.awt.Font.BOLD, 20));
  titleLabel.setHorizontalAlignment(0);
  var subtitleLabel = label("Rogues' Den • by xulixna", false);
  subtitleLabel.setForeground(muted);
  subtitleLabel.setFont(new java.awt.Font('Dialog', java.awt.Font.PLAIN, 12));
  subtitleLabel.setHorizontalAlignment(0);
  headerPanel.add(titleLabel);
  headerPanel.add(subtitleLabel);
  mainPanel.add(headerPanel, java.awt.BorderLayout.NORTH);
  var contentPanel = panel(new java.awt.GridLayout(0, 1, 8, 8));
  var modePanel = panel(new java.awt.GridLayout(2, 1, 4, 4));
  modePanel.setBorder(createSectionBorder('Cooking Mode'));
  var progressiveRadio = new javax.swing.JRadioButton('Progressive (Cook highest level food in bank)', initial.mode === 'progressive');
  progressiveRadio.setBackground(background);
  progressiveRadio.setForeground(foreground);
  var fixedRadio = new javax.swing.JRadioButton('Fixed (Cook single selected food)', initial.mode === 'fixed');
  fixedRadio.setBackground(background);
  fixedRadio.setForeground(foreground);
  var buttonGroup = new javax.swing.ButtonGroup();
  buttonGroup.add(progressiveRadio);
  buttonGroup.add(fixedRadio);
  modePanel.add(progressiveRadio);
  modePanel.add(fixedRadio);
  contentPanel.add(modePanel);
  var foodPanel = panel(new java.awt.BorderLayout(6, 6));
  foodPanel.setBorder(createSectionBorder('Select Food (Fixed Mode)'));
  var foodNames = COOKABLE_FOODS.map(f => "".concat(f.name, " (Lvl ").concat(f.level, ")"));
  var foodCombo = new javax.swing.JComboBox(foodNames);
  foodCombo.setBackground(surface);
  foodCombo.setForeground(foreground);
  var initialIndex = COOKABLE_FOODS.findIndex(f => f.id === initial.fixedFoodId);
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
  var targetPanel = panel(new java.awt.BorderLayout(6, 6));
  targetPanel.setBorder(createSectionBorder('Target Level (0 = Cook until out of food)'));
  var targetField = new javax.swing.JTextField(String(initial.targetLevel || 0), 10);
  targetField.setBackground(surface);
  targetField.setForeground(foreground);
  targetField.setCaretColor(accent);
  targetPanel.add(targetField, java.awt.BorderLayout.CENTER);
  contentPanel.add(targetPanel);
  var stylePanel = panel(new java.awt.GridLayout(2, 1, 4, 4));
  stylePanel.setBorder(createSectionBorder('Play Style (Human Reaction Timers)'));
  var normalRadio = new javax.swing.JRadioButton('Normal (Active player: 1-3s reaction)', initial.playStyle === 'normal');
  normalRadio.setBackground(background);
  normalRadio.setForeground(foreground);
  var lazyRadio = new javax.swing.JRadioButton('Lazy / AFK (Relaxed: up to 10s delay before banking)', initial.playStyle === 'lazy');
  lazyRadio.setBackground(background);
  lazyRadio.setForeground(foreground);
  var styleButtonGroup = new javax.swing.ButtonGroup();
  styleButtonGroup.add(normalRadio);
  styleButtonGroup.add(lazyRadio);
  stylePanel.add(normalRadio);
  stylePanel.add(lazyRadio);
  contentPanel.add(stylePanel);
  mainPanel.add(contentPanel, java.awt.BorderLayout.CENTER);
  var startButton = new javax.swing.JButton('Start Cooking');
  startButton.setBackground(buttonBg);
  startButton.setForeground(buttonFg);
  startButton.setFont(new java.awt.Font('Dialog', java.awt.Font.BOLD, 14));
  startButton.setFocusPainted(false);
  startButton.addActionListener(() => {
    var isProgressive = progressiveRadio.isSelected();
    var selectedFoodIndex = foodCombo.getSelectedIndex();
    var selectedFood = selectedFoodIndex >= 0 && selectedFoodIndex < COOKABLE_FOODS.length ? COOKABLE_FOODS[selectedFoodIndex] : COOKABLE_FOODS[0];
    var targetLevel = 0;
    try {
      var parsed = parseInt(String(targetField.getText()).trim(), 10);
      if (!isNaN(parsed) && parsed >= 0) {
        targetLevel = Math.min(parsed, 99);
      }
    } catch (_unused) {
      targetLevel = 0;
    }
    var settings = {
      mode: isProgressive ? 'progressive' : 'fixed',
      fixedFoodId: selectedFood.id,
      targetLevel,
      playStyle: lazyRadio.isSelected() ? 'lazy' : 'normal'
    };
    saveSettings(settings);
    submitted = settings;
    closeWindow();
  });
  var buttonPanel = panel(new java.awt.BorderLayout(4, 4));
  buttonPanel.setBorder(javax.swing.BorderFactory.createEmptyBorder(10, 0, 0, 0));
  buttonPanel.add(startButton, java.awt.BorderLayout.CENTER);
  var footerLabel = label('Created by xulixna • Discord', false);
  footerLabel.setForeground(muted);
  footerLabel.setFont(new java.awt.Font('Dialog', java.awt.Font.PLAIN, 11));
  footerLabel.setHorizontalAlignment(0);
  buttonPanel.add(footerLabel, java.awt.BorderLayout.SOUTH);
  mainPanel.add(buttonPanel, java.awt.BorderLayout.SOUTH);
  frame.add(mainPanel);
  frame.setSize(480, 560);
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
      var _getFoodDefById$name, _getFoodDefById;
      var settings = selectedSettings();
      if (!settings) return;
      runner = createCookingRunner(game, settings);
      var modeLabel = settings.mode === 'progressive' ? 'Mode [Progressive]' : "Mode [Fixed: ".concat((_getFoodDefById$name = (_getFoodDefById = getFoodDefById(settings.fixedFoodId)) === null || _getFoodDefById === void 0 ? void 0 : _getFoodDefById.name) !== null && _getFoodDefById$name !== void 0 ? _getFoodDefById$name : 'Food', "]");
      var styleLabel = settings.playStyle === 'lazy' ? 'Style [Lazy AFK]' : 'Style [Normal]';
      game.setCounter(modeLabel, 1);
      game.setCounter(styleLabel, 1);
      var currentLvl = game.getRealCookingLevel();
      if (currentLvl > 0) {
        game.setCounter('Cooking Level', currentLvl);
      }
      if (settings.targetLevel > 0) {
        game.setCounter('Target Level', settings.targetLevel);
      }
      game.setCounter('XP Gained', 0);
      game.setCounter('XP / hr', 0);
      game.setCounter('Time (min)', 0);
      game.log("Started AIO Cooking by xulixna in ".concat(settings.mode, " mode, ").concat(settings.playStyle, " style (Target Level: ").concat(settings.targetLevel || 'Unlimited', ")."));
    }
    runner.tick();
  } catch (error) {
    game.log('Stopped after error: ' + String(error));
    bot.terminate();
  }
}
function onEnd() {
  closeWindow();
  game.log('AIO Cooking stopped.');
}

