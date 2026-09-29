function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
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
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
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

var MITHRIL_ORE_ID = 447;
var COAL_ID = 453;
var MITHRIL_BAR_ID = 2359;
var VARROCK_ARMOUR_2_ID = 13105;
var HAMMER_ID = 2347;
var MITHRIL_NAILS_ID = 4822;
var KNIFE_ID = 946;
var FEATHER_ID = 314;
var ACHEY_LOGS_ID = 2862;
var OGRE_SHAFTS_ID = 2864;
var FLIGHTED_OGRE_ARROW_ID = 2865;
var MITHRIL_BRUTAL_ID = 4793;
var EDGE_BANK_BOOTH_ID = 10355;
var VARROCK_BANK_BOOTH_ID = 34810;
var FURNACE_ID = 16469;
var ANVIL_ID = 2097;
var ACHEY_TREE_ID = 2023;
var MAKE_WIDGET_ID = 17694735;
var SMITH_NAILS_WIDGET_ID = 20447255;
var worldPoint = (x, y) => new net.runelite.api.coords.WorldPoint(x, y, 0);
var EDGE_BANK_POINT = worldPoint(3096, 3494);
var FURNACE_POINT = worldPoint(3109, 3499);
var VARROCK_BANK_POINT = worldPoint(3185, 3436);
var ANVIL_POINT = worldPoint(3188, 3427);
var ACHEY_AREA = worldPoint(2603, 2978);
var ORE_PER_TRIP = 5;
var NAILS_PER_BAR = 15;
var COAL_PER_BAR = 4;
var FEATHERS_PER_ARROW = 4;
var OBJECT_SEARCH_RADIUS = 20;
var BANK_AREA_RADIUS = 25;
var ACHEY_AREA_RADIUS = 15;
var ARRIVED_RADIUS = 4;
var SMELT_ANIMATIONS = [899, 2416];
var SMITH_ANIMATIONS = [898];
var CHOP_ANIMATIONS = [879, 877, 875, 873, 871, 869, 867, 865, 2846, 8303, 10071, 24, 2117, 7264];
var PHASES = ['bars', 'nails', 'arrows'];
var PHASE_NAMES = {
  bars: 'Mithril bars (Edgeville)',
  nails: 'Mithril nails (Varrock West)',
  arrows: 'Brutal arrows (Achey trees)'
};
var PHASE_LEVELS = {
  bars: {
    skill: 'Smithing',
    level: 50
  },
  nails: {
    skill: 'Smithing',
    level: 54
  },
  arrows: {
    skill: 'Fletching',
    level: 49
  }
};
var ITEM_NAMES = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, KNIFE_ID, 'Knife'), ACHEY_LOGS_ID, 'Achey tree logs'), OGRE_SHAFTS_ID, 'Ogre arrow shafts'), FEATHER_ID, 'Feathers'), FLIGHTED_OGRE_ARROW_ID, 'Flighted ogre arrows'), MITHRIL_NAILS_ID, 'Mithril nails'), HAMMER_ID, 'Hammer');

var LOG_PREFIX = '[Mithril Brutal Arrow - xulixna] ';
var closestOf = objects => {
  var loc = game.playerLocation();
  if (!loc || !objects || objects.length === 0) return null;
  var closest = null;
  var minDistance = OBJECT_SEARCH_RADIUS;
  var _iterator = _createForOfIteratorHelper(objects),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var obj = _step.value;
      var objLoc = obj.getWorldLocation();
      if (!objLoc || objLoc.getPlane() !== loc.getPlane()) continue;
      var dist = loc.distanceTo(objLoc);
      if (dist < minDistance) {
        minDistance = dist;
        closest = obj;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return closest;
};
var game = {
  isLoggedIn: () => client.getGameState() === net.runelite.api.GameState.LOGGED_IN && client.getLocalPlayer() !== null,
  playerLocation: () => {
    var _player$getWorldLocat;
    var player = client.getLocalPlayer();
    return player ? (_player$getWorldLocat = player.getWorldLocation()) !== null && _player$getWorldLocat !== void 0 ? _player$getWorldLocat : null : null;
  },
  isAnimating: animations => {
    var player = client.getLocalPlayer();
    return player ? animations.indexOf(player.getAnimation()) !== -1 : false;
  },
  isMoving: () => bot.localPlayerMoving(),
  distanceTo: point => {
    var loc = game.playerLocation();
    if (!loc || loc.getPlane() !== point.getPlane()) return 9999;
    return loc.distanceTo(point);
  },
  isWebWalking: () => bot.walking.isWebWalking(),
  webWalkTo: point => {
    bot.walking.webWalkStart(point);
  },
  webWalkToNearestBank: () => {
    bot.walking.webWalkToNearestBank();
  },
  stopWebWalk: () => {
    if (bot.walking.isWebWalking()) bot.walking.webWalkCancel();
  },
  cancelWebWalk: () => {
    try {
      bot.walking.webWalkCancel();
    } catch (_unused) {}
  },
  getLevel: skill => client.getRealSkillLevel(skill),
  getExperience: skill => {
    try {
      return client.getSkillExperience(skill) || 0;
    } catch (_unused2) {
      return 0;
    }
  },
  getTotalLevel: () => {
    try {
      return client.getTotalLevel() || 0;
    } catch (_unused3) {
      return 0;
    }
  },
  getPlayerName: () => {
    try {
      var _player$getName;
      var player = client.getLocalPlayer();
      return player ? String((_player$getName = player.getName()) !== null && _player$getName !== void 0 ? _player$getName : '') : '';
    } catch (_unused4) {
      return '';
    }
  },
  getEmptySlots: () => bot.inventory.getEmptySlots(),
  qty: id => bot.inventory.getQuantityOfId(id),
  hasItem: id => bot.inventory.containsId(id),
  isEquipped: id => bot.equipment.containsId(id),
  wearItem: id => {
    bot.inventory.interactWithIds([id], ['Wear', 'Equip']);
  },
  findClosestObject: ids => closestOf(bot.objects.getTileObjectsWithIds(ids)),
  findAnyBank: () => {
    var _game$findClosestObje;
    var booth = (_game$findClosestObje = game.findClosestObject([VARROCK_BANK_BOOTH_ID, EDGE_BANK_BOOTH_ID])) !== null && _game$findClosestObje !== void 0 ? _game$findClosestObje : closestOf(bot.objects.getTileObjectsWithNames(['Bank booth']));
    var chest = closestOf(bot.objects.getTileObjectsWithNames(['Bank chest']));
    var loc = game.playerLocation();
    if (booth && chest && loc) {
      return loc.distanceTo(chest.getWorldLocation()) < loc.distanceTo(booth.getWorldLocation()) ? {
        obj: chest,
        action: 'Use'
      } : {
        obj: booth,
        action: 'Bank'
      };
    }
    if (chest) return {
      obj: chest,
      action: 'Use'
    };
    if (booth) return {
      obj: booth,
      action: 'Bank'
    };
    return null;
  },
  interactObject: (obj, action) => {
    bot.objects.interactSuppliedObject(obj, action);
  },
  isBankOpen: () => bot.bank.isOpen(),
  closeBank: () => {
    bot.bank.close();
  },
  depositAll: () => {
    bot.bank.depositAll();
  },
  depositAllWithId: id => {
    bot.bank.depositAllWithId(id);
  },
  withdrawQuantity: (id, qty) => {
    bot.bank.withdrawQuantityWithId(id, qty);
  },
  withdrawAll: id => {
    bot.bank.withdrawAllWithId(id);
  },
  bankQty: id => bot.bank.getQuantityOfId(id),
  getInventoryIds: () => {
    var ids = [];
    try {
      var items = bot.inventory.getAllWidgets();
      for (var i = 0; items && i < items.length; i++) {
        var id = items[i].getItemId ? items[i].getItemId() : items[i].id;
        if (id && id > 0 && ids.indexOf(id) === -1) ids.push(id);
      }
    } catch (_unused5) {}
    return ids;
  },
  isWidgetVisible: id => {
    var widget = client.getWidget(id);
    return widget !== null && !widget.isHidden();
  },
  clickWidget: id => {
    bot.widgets.interactSpecifiedWidget(id, 1, 57, -1);
  },
  useItemOnItem: (itemId, targetId) => {
    bot.inventory.itemOnItemWithIds(itemId, targetId);
  },
  isItemSelected: () => {
    try {
      return Boolean(client.isWidgetSelected());
    } catch (_unused6) {
      return false;
    }
  },
  clearSelectedItem: () => {
    try {
      client.setWidgetSelected(false);
    } catch (_unused7) {}
  },
  handleDialogue: () => {
    bot.widgets.handleDialogue([]);
  },
  log: message => bot.printLogMessage(LOG_PREFIX + message),
  gameMessage: message => bot.printGameMessage(LOG_PREFIX + message),
  setCounter: (name, value) => bot.counters.setCounter(name, value),
  terminate: () => bot.terminate()
};

function createBrutalRunner(game, settings) {
  var SMITH = net.runelite.api.Skill.SMITHING;
  var FLETCH = net.runelite.api.Skill.FLETCHING;
  var WC = net.runelite.api.Skill.WOODCUTTING;
  var q = game.qty;
  var isProgressive = settings.mode === 'progressive';
  var phaseOrder = isProgressive ? [] : [settings.singlePhase];
  var plan = {
    bars: Infinity,
    nails: Infinity,
    arrows: Infinity
  };
  var phaseIndex = -1;
  var phase = null;
  var state = 'start';
  var pending = null;
  var retries = 0;
  var delayTicks = 0;
  var idleTicks = 0;
  var startTime = Date.now();
  var startXp = {};
  var ticksSinceCounterUpdate = 0;
  var afkChance = 0;
  var afkCooldown = 0;
  var totalAfks = 0;
  var trips = 0;
  var totals = {
    bars: 0,
    nails: 0,
    logs: 0,
    shafts: 0,
    flighted: 0,
    brutal: 0
  };
  var last = {};
  var randomInt = (min, max) => min + Math.floor(Math.random() * (Math.max(0, max - min) + 1));
  var accountSeed = () => {
    var name = game.getPlayerName();
    var seed = game.getTotalLevel() > 0 ? game.getTotalLevel() * 17 : 1337;
    for (var i = 0; i < name.length; i++) {
      seed = (seed << 5) - seed + name.charCodeAt(i) | 0;
    }
    return Math.abs(seed);
  };
  var reactionDelay = () => {
    var seed = accountSeed();
    if (settings.playStyle === 'lazy') {
      return Math.max(4, Math.min(16, 5 + seed % 6 + randomInt(-1, 6)));
    }
    return Math.max(1, Math.min(4, 1 + seed % 2 + randomInt(0, 1)));
  };
  var rollAfkChance = () => {
    afkChance = settings.playStyle === 'lazy' ? 0.006 + Math.random() * 0.014 : 0.002 + Math.random() * 0.008;
    game.log("AFK chance this run: ".concat((afkChance * 100).toFixed(2), "% per busy tick."));
  };
  var maybeAfk = action => {
    if (!settings.randomAfk || afkCooldown > 0) return false;
    if (Math.random() >= afkChance) return false;
    var ticks = settings.playStyle === 'lazy' ? randomInt(10, 50) : randomInt(4, 20);
    totalAfks++;
    afkCooldown = randomInt(60, 200);
    game.log("Going AFK for ".concat(ticks, " ticks (~").concat((ticks * 0.6).toFixed(1), "s) while ").concat(action, "."));
    delayTicks = ticks;
    return true;
  };
  var microDelay = (minTicks, maxTicks) => {
    var ticks = randomInt(minTicks, maxTicks);
    if (ticks > 0) delayTicks = ticks;
  };
  var trackGain = (key, id) => {
    var current = q(id);
    var previous = last[key];
    if (previous !== undefined && current > previous) totals[key] += current - previous;
    last[key] = current;
  };
  var updateCounters = () => {
    var elapsedMs = Math.max(1, Date.now() - startTime);
    var elapsedHours = elapsedMs / 3600000;
    var perHour = value => elapsedHours > 0.002 ? Math.floor(value / elapsedHours) : 0;
    var xpGained = skill => {
      var key = String(skill);
      var xp = game.getExperience(skill);
      if (startXp[key] === undefined && xp > 0) startXp[key] = xp;
      var start = startXp[key];
      return start ? xp - start : 0;
    };
    game.setCounter(settings.playStyle === 'lazy' ? 'Style [Lazy AFK]' : 'Style [Normal]', 1);
    game.setCounter('Phase (1 Bars / 2 Nails / 3 Arrows)', phase ? PHASES.indexOf(phase) + 1 : 0);
    game.setCounter('Smithing Level', game.getLevel(SMITH));
    game.setCounter('Fletching Level', game.getLevel(FLETCH));
    game.setCounter('Bars Made', totals.bars);
    game.setCounter('Nails Made', totals.nails);
    game.setCounter('Shafts Made', totals.shafts);
    game.setCounter('Flighted Made', totals.flighted);
    game.setCounter('Brutal Arrows Made', totals.brutal);
    game.setCounter('Smithing XP / hr', perHour(xpGained(SMITH)));
    game.setCounter('Fletch XP / hr', perHour(xpGained(FLETCH)));
    game.setCounter('WC XP / hr', perHour(xpGained(WC)));
    game.setCounter('Time (min)', Math.floor(elapsedMs / 60000));
    if (settings.randomAfk) game.setCounter('AFK Breaks', totalAfks);
  };
  var summary = () => "Bars: ".concat(totals.bars, ", nails: ").concat(totals.nails, ", shafts: ").concat(totals.shafts, ", flighted: ").concat(totals.flighted, ", brutal: ").concat(totals.brutal, ".");
  var stop = reason => {
    state = 'stopped';
    pending = null;
    game.stopWebWalk();
    updateCounters();
    game.log("".concat(reason, " ").concat(summary()));
    game.gameMessage(reason);
    game.terminate();
  };
  var wait = function wait(label, action, check, done) {
    var ticks = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 15;
    var onTimeout = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
    var afkAction = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
    pending = {
      label,
      check,
      done,
      ticks,
      onTimeout,
      afkAction
    };
    action();
  };
  var nextPhase = reason => {
    if (reason) game.log(reason);
    phaseIndex++;
    pending = null;
    idleTicks = 0;
    var next = phaseOrder[phaseIndex];
    if (!next) {
      stop('All phases finished.');
      return;
    }
    phase = next;
    var req = PHASE_LEVELS[next];
    var level = game.getLevel(req.skill === 'Smithing' ? SMITH : FLETCH);
    if (level < req.level) {
      game.log("Warning: ".concat(PHASE_NAMES[next], " needs ").concat(req.skill, " ").concat(req.level, " (you have ").concat(level, ")."));
    }
    game.log("=== Phase ".concat(PHASES.indexOf(next) + 1, ": ").concat(PHASE_NAMES[next], " ==="));
    state = next === 'bars' ? 'bars_armour' : next === 'nails' ? 'nails_bank' : 'arrows_prepare';
    updateCounters();
  };
  var openBank = (point, boothId, placeName) => {
    var bank = null;
    if (point && game.distanceTo(point) <= BANK_AREA_RADIUS) {
      var booth = game.findClosestObject([boothId]);
      if (booth) bank = {
        obj: booth,
        action: 'Bank'
      };
    } else if (!point) {
      bank = game.findAnyBank();
    }
    if (!bank) {
      if (!game.isWebWalking()) {
        game.log("Walking to ".concat(placeName, " bank..."));
        if (point) game.webWalkTo(point);else game.webWalkToNearestBank();
      } else {
        maybeAfk('walking');
      }
      return;
    }
    game.stopWebWalk();
    var target = bank;
    wait("open ".concat(placeName, " bank"), () => game.interactObject(target.obj, target.action), () => game.isBankOpen(), () => {
      retries = 0;
      microDelay(0, 1);
    }, 25, null, 'walking to bank');
  };
  var depositExcept = keepIds => {
    var id = game.getInventoryIds().find(itemId => keepIds.indexOf(itemId) === -1);
    if (id === undefined) return false;
    wait("deposit item ".concat(id), () => game.depositAllWithId(id), () => !game.hasItem(id), () => {
      retries = 0;
    }, 6);
    return true;
  };
  var walkPhaseTo = (point, label) => {
    if (!game.isWebWalking()) {
      game.log("".concat(label, " not found. Walking to ").concat(point, "..."));
      game.webWalkTo(point);
    } else {
      maybeAfk('walking');
    }
  };
  var tickPlan = () => {
    if (!game.isBankOpen()) {
      openBank(null, 0, 'nearest');
      return;
    }
    var have = id => game.bankQty(id) + q(id);
    var target = settings.arrowTarget;
    var nailsToMake = Math.max(0, target - have(MITHRIL_NAILS_ID));
    var barsNeeded = Math.ceil(nailsToMake / NAILS_PER_BAR);
    var barsToMake = Math.max(0, barsNeeded - have(MITHRIL_BAR_ID));
    var feathersNeeded = FEATHERS_PER_ARROW * Math.max(0, target - have(FLIGHTED_OGRE_ARROW_ID));
    var shaftsReady = have(OGRE_SHAFTS_ID) + have(FLIGHTED_OGRE_ARROW_ID);
    var missing = [];
    var need = (name, amount, owned) => {
      if (owned < amount) missing.push("".concat(name, " (need ").concat(amount, ", have ").concat(owned, ")"));
    };
    need('Mithril ore', barsToMake, have(MITHRIL_ORE_ID));
    need('Coal', barsToMake * COAL_PER_BAR, have(COAL_ID));
    if (barsToMake > 0) {
      need('Varrock armour 2', 1, game.isEquipped(VARROCK_ARMOUR_2_ID) ? 1 : have(VARROCK_ARMOUR_2_ID));
    }
    need('Hammer', 1, have(HAMMER_ID));
    need('Knife', 1, have(KNIFE_ID));
    need('Feathers', feathersNeeded, have(FEATHER_ID));
    game.log("Plan for ".concat(target, " brutal arrows: smelt ").concat(barsToMake, " bars (").concat(barsToMake, " ore, ").concat(barsToMake * COAL_PER_BAR, " coal), ") + "smith ".concat(nailsToMake, " nails (").concat(barsNeeded, " bars), ").concat(feathersNeeded, " feathers, ") + "chop ".concat(Math.max(0, target - shaftsReady), " more shafts (have ").concat(shaftsReady, " shafts/flighted)."));
    if (missing.length > 0) {
      stop("Missing materials for ".concat(target, " arrows: ").concat(missing.join(', '), "."));
      return;
    }
    plan = {
      bars: barsToMake,
      nails: nailsToMake,
      arrows: target
    };
    if (barsToMake > 0) phaseOrder.push('bars');
    if (nailsToMake > 0) phaseOrder.push('nails');
    phaseOrder.push('arrows');
    game.log("Phases: ".concat(phaseOrder.map(p => PHASE_NAMES[p]).join(' -> ')));
    nextPhase();
  };
  var ranOut = (what, progress) => {
    if (isProgressive) {
      stop("Ran out of ".concat(what, " before the target (").concat(progress, ")."));
    } else {
      nextPhase("Out of ".concat(what, ". Phase done (").concat(progress, ")."));
    }
  };
  var progressOf = (done, target, unit) => "".concat(done).concat(isProgressive ? '/' + target : '', " ").concat(unit);
  var barsCanSmelt = () => q(MITHRIL_ORE_ID) > 0 && q(COAL_ID) >= COAL_PER_BAR;
  var tickBars = () => {
    switch (state) {
      case 'bars_armour':
        {
          if (game.isEquipped(VARROCK_ARMOUR_2_ID)) {
            state = barsCanSmelt() ? 'bars_furnace' : 'bars_bank';
            break;
          }
          if (game.hasItem(VARROCK_ARMOUR_2_ID)) {
            if (game.isBankOpen()) {
              game.closeBank();
              microDelay(1, 2);
              break;
            }
            game.log('Equipping Varrock armour 2...');
            wait('wear Varrock armour 2', () => game.wearItem(VARROCK_ARMOUR_2_ID), () => game.isEquipped(VARROCK_ARMOUR_2_ID), () => {
              retries = 0;
              microDelay(1, 2);
            }, 6);
            break;
          }
          if (!game.isBankOpen()) {
            openBank(EDGE_BANK_POINT, EDGE_BANK_BOOTH_ID, 'Edgeville');
            break;
          }
          if (game.bankQty(VARROCK_ARMOUR_2_ID) <= 0) {
            stop('Varrock armour 2 (13105) not equipped, not in inventory and not in bank.');
            break;
          }
          if (game.getEmptySlots() === 0) {
            game.depositAll();
            microDelay(1, 2);
            break;
          }
          wait('withdraw Varrock armour 2', () => game.withdrawQuantity(VARROCK_ARMOUR_2_ID, 1), () => game.hasItem(VARROCK_ARMOUR_2_ID), () => {
            retries = 0;
          }, 6);
          break;
        }
      case 'bars_bank':
        {
          if (!game.isEquipped(VARROCK_ARMOUR_2_ID)) {
            state = 'bars_armour';
            break;
          }
          if (!game.isBankOpen()) {
            openBank(EDGE_BANK_POINT, EDGE_BANK_BOOTH_ID, 'Edgeville');
            break;
          }
          if (depositExcept([MITHRIL_ORE_ID, COAL_ID])) break;
          var barsRemaining = plan.bars - totals.bars;
          if (barsRemaining <= 0) {
            game.depositAll();
            nextPhase("Bars target reached (".concat(totals.bars, " bars)."));
            break;
          }
          var tripOre = Math.min(ORE_PER_TRIP, barsRemaining);
          var ore = q(MITHRIL_ORE_ID);
          var coal = q(COAL_ID);
          if (ore > tripOre) {
            wait('deposit extra ore', () => game.depositAllWithId(MITHRIL_ORE_ID), () => !game.hasItem(MITHRIL_ORE_ID), () => {
              retries = 0;
            }, 6);
            break;
          }
          if (ore < tripOre && game.bankQty(MITHRIL_ORE_ID) > 0) {
            wait('withdraw Mithril ore', () => game.withdrawQuantity(MITHRIL_ORE_ID, tripOre - ore), () => q(MITHRIL_ORE_ID) > ore, () => {
              retries = 0;
              microDelay(0, 1);
            }, 6);
            break;
          }
          if (coal < ore * COAL_PER_BAR && game.bankQty(COAL_ID) > 0 && game.getEmptySlots() > 0) {
            wait('withdraw Coal', () => game.withdrawAll(COAL_ID), () => q(COAL_ID) > coal, () => {
              retries = 0;
              microDelay(0, 1);
            }, 6);
            break;
          }
          if (!barsCanSmelt()) {
            game.depositAll();
            ranOut('Mithril ore / Coal', progressOf(totals.bars, plan.bars, 'bars'));
            break;
          }
          trips++;
          game.log("Bars trip ".concat(trips, ": ").concat(ore, " ore, ").concat(coal, " coal. Heading to the furnace."));
          game.closeBank();
          microDelay(0, settings.playStyle === 'lazy' ? 3 : 1);
          state = 'bars_furnace';
          break;
        }
      case 'bars_furnace':
        {
          if (!barsCanSmelt()) {
            state = 'bars_bank';
            break;
          }
          if (game.isWidgetVisible(MAKE_WIDGET_ID)) {
            state = 'bars_menu';
            break;
          }
          var furnace = game.findClosestObject([FURNACE_ID]);
          if (!furnace) {
            walkPhaseTo(FURNACE_POINT, 'Furnace');
            break;
          }
          game.stopWebWalk();
          wait('click Furnace', () => game.interactObject(furnace, 'Smelt'), () => game.isWidgetVisible(MAKE_WIDGET_ID), () => {
            retries = 0;
            if (settings.playStyle === 'lazy') microDelay(0, 2);
            state = 'bars_menu';
          }, 25, null, 'walking to furnace');
          break;
        }
      case 'bars_menu':
        {
          if (!game.isWidgetVisible(MAKE_WIDGET_ID)) {
            state = 'bars_furnace';
            break;
          }
          wait('click Smelt Mithril bar', () => game.clickWidget(MAKE_WIDGET_ID), () => !game.isWidgetVisible(MAKE_WIDGET_ID), () => {
            retries = 0;
            idleTicks = 0;
            last['ore'] = q(MITHRIL_ORE_ID);
            state = 'bars_smelting';
          }, 8, () => {
            state = 'bars_furnace';
          });
          break;
        }
      case 'bars_smelting':
        {
          var _last$ore;
          if (!barsCanSmelt()) {
            var delay = reactionDelay();
            game.log("Smelted all ore. Total bars: ".concat(totals.bars, ". Waiting ").concat(delay, " ticks before banking."));
            delayTicks = delay;
            idleTicks = 0;
            state = 'bars_bank';
            break;
          }
          var oreLeft = q(MITHRIL_ORE_ID);
          if (oreLeft < ((_last$ore = last['ore']) !== null && _last$ore !== void 0 ? _last$ore : oreLeft)) {
            last['ore'] = oreLeft;
            idleTicks = 0;
            if (maybeAfk('smelting')) break;
          } else if (game.isAnimating(SMELT_ANIMATIONS)) {
            idleTicks = 0;
          } else {
            idleTicks++;
          }
          game.handleDialogue();
          if (idleTicks > 8) {
            game.log("Smelting interrupted (".concat(oreLeft, " ore left). Restarting..."));
            idleTicks = 0;
            state = 'bars_furnace';
          }
          break;
        }
    }
  };
  var tickNails = () => {
    switch (state) {
      case 'nails_bank':
        {
          if (!game.isBankOpen()) {
            openBank(VARROCK_BANK_POINT, VARROCK_BANK_BOOTH_ID, 'Varrock West');
            break;
          }
          if (depositExcept([HAMMER_ID, MITHRIL_BAR_ID])) break;
          if (!game.hasItem(HAMMER_ID)) {
            if (game.bankQty(HAMMER_ID) <= 0) {
              stop('No Hammer (2347) in inventory or bank.');
              break;
            }
            wait('withdraw Hammer', () => game.withdrawQuantity(HAMMER_ID, 1), () => game.hasItem(HAMMER_ID), () => {
              retries = 0;
              microDelay(0, 1);
            }, 6);
            break;
          }
          var nailsRemaining = plan.nails - totals.nails;
          if (nailsRemaining <= 0) {
            if (game.hasItem(MITHRIL_BAR_ID)) {
              game.depositAllWithId(MITHRIL_BAR_ID);
              microDelay(1, 2);
              break;
            }
            nextPhase("Nails target reached (".concat(totals.nails, " nails)."));
            break;
          }
          var bars = q(MITHRIL_BAR_ID);
          var barsWanted = Math.ceil(nailsRemaining / NAILS_PER_BAR);
          if (bars > barsWanted) {
            wait('deposit extra bars', () => game.depositAllWithId(MITHRIL_BAR_ID), () => !game.hasItem(MITHRIL_BAR_ID), () => {
              retries = 0;
            }, 6);
            break;
          }
          if (bars < barsWanted && game.getEmptySlots() > 0 && game.bankQty(MITHRIL_BAR_ID) > 0) {
            var take = Math.min(barsWanted - bars, game.getEmptySlots());
            wait('withdraw Mithril bars', () => isProgressive ? game.withdrawQuantity(MITHRIL_BAR_ID, take) : game.withdrawAll(MITHRIL_BAR_ID), () => q(MITHRIL_BAR_ID) > bars, () => {
              retries = 0;
              microDelay(0, 1);
            }, 6);
            break;
          }
          if (bars === 0) {
            ranOut('Mithril bars', progressOf(totals.nails, plan.nails, 'nails'));
            break;
          }
          trips++;
          game.log("Nails trip ".concat(trips, ": ").concat(bars, " bars. Heading to the anvil."));
          game.closeBank();
          microDelay(0, settings.playStyle === 'lazy' ? 3 : 1);
          state = 'nails_anvil';
          break;
        }
      case 'nails_anvil':
        {
          if (!game.hasItem(MITHRIL_BAR_ID) || !game.hasItem(HAMMER_ID)) {
            state = 'nails_bank';
            break;
          }
          if (game.isWidgetVisible(SMITH_NAILS_WIDGET_ID)) {
            state = 'nails_menu';
            break;
          }
          var anvil = game.findClosestObject([ANVIL_ID]);
          if (!anvil) {
            walkPhaseTo(ANVIL_POINT, 'Anvil');
            break;
          }
          game.stopWebWalk();
          wait('click Anvil', () => game.interactObject(anvil, 'Smith'), () => game.isWidgetVisible(SMITH_NAILS_WIDGET_ID), () => {
            retries = 0;
            if (settings.playStyle === 'lazy') microDelay(0, 2);
            state = 'nails_menu';
          }, 25, null, 'walking to anvil');
          break;
        }
      case 'nails_menu':
        {
          if (!game.isWidgetVisible(SMITH_NAILS_WIDGET_ID)) {
            state = 'nails_anvil';
            break;
          }
          wait('click Smith set Mithril nails', () => game.clickWidget(SMITH_NAILS_WIDGET_ID), () => !game.isWidgetVisible(SMITH_NAILS_WIDGET_ID), () => {
            retries = 0;
            idleTicks = 0;
            last['barsLeft'] = q(MITHRIL_BAR_ID);
            state = 'nails_smithing';
          }, 8, () => {
            state = 'nails_anvil';
          });
          break;
        }
      case 'nails_smithing':
        {
          var _last$barsLeft;
          var barsLeft = q(MITHRIL_BAR_ID);
          if (barsLeft === 0) {
            var delay = reactionDelay();
            game.log("Smithed all bars. Total nails: ".concat(totals.nails, ". Waiting ").concat(delay, " ticks before banking."));
            delayTicks = delay;
            idleTicks = 0;
            state = 'nails_bank';
            break;
          }
          if (barsLeft < ((_last$barsLeft = last['barsLeft']) !== null && _last$barsLeft !== void 0 ? _last$barsLeft : barsLeft)) {
            last['barsLeft'] = barsLeft;
            idleTicks = 0;
            if (maybeAfk('smithing')) break;
          } else if (game.isAnimating(SMITH_ANIMATIONS)) {
            idleTicks = 0;
          } else {
            idleTicks++;
          }
          game.handleDialogue();
          if (idleTicks > 7) {
            game.log("Smithing interrupted (".concat(barsLeft, " bars left). Restarting..."));
            idleTicks = 0;
            state = 'nails_anvil';
          }
          break;
        }
    }
  };
  var fletchThreshold = 0;
  var rollFletchThreshold = () => {
    fletchThreshold = randomInt(settings.minFreeSlots, settings.maxFreeSlots);
  };
  var STEPS = [{
    name: 'Ogre arrow shafts',
    use: KNIFE_ID,
    on: ACHEY_LOGS_ID,
    input: ACHEY_LOGS_ID,
    canDo: () => q(ACHEY_LOGS_ID) > 0
  }, {
    name: 'Flighted ogre arrows',
    use: FEATHER_ID,
    on: OGRE_SHAFTS_ID,
    input: OGRE_SHAFTS_ID,
    canDo: () => q(FEATHER_ID) >= FEATHERS_PER_ARROW && q(OGRE_SHAFTS_ID) > 0
  }, {
    name: 'Mithril brutal arrows',
    use: MITHRIL_NAILS_ID,
    on: FLIGHTED_OGRE_ARROW_ID,
    input: FLIGHTED_OGRE_ARROW_ID,
    canDo: () => game.hasItem(HAMMER_ID) && q(MITHRIL_NAILS_ID) > 0 && q(FLIGHTED_OGRE_ARROW_ID) > 0
  }];
  var SHAFTS_STEP = STEPS[0];
  var FLIGHTED_STEP = STEPS[1];
  var step = SHAFTS_STEP;
  var walkRestarts = 0;
  var bestWalkDistance = 9999;
  var lastInputCount = 0;
  var nextStep = () => {
    var _STEPS$find;
    return (_STEPS$find = STEPS.find(s => s.canDo())) !== null && _STEPS$find !== void 0 ? _STEPS$find : null;
  };
  var arrowsRemaining = () => plan.arrows - totals.brutal;
  var targetReached = () => arrowsRemaining() <= 0;
  var arrowsFinished = () => targetReached() || !game.hasItem(HAMMER_ID) || q(MITHRIL_NAILS_ID) === 0 || q(FEATHER_ID) < FEATHERS_PER_ARROW && q(FLIGHTED_OGRE_ARROW_ID) === 0;
  var enoughShafts = () => q(OGRE_SHAFTS_ID) + q(FLIGHTED_OGRE_ARROW_ID) >= Math.min(q(MITHRIL_NAILS_ID), arrowsRemaining());
  var shouldFletch = () => q(ACHEY_LOGS_ID) > 0 && (game.getEmptySlots() <= fletchThreshold || enoughShafts());
  var trackArrows = () => {
    trackGain('logs', ACHEY_LOGS_ID);
    trackGain('shafts', OGRE_SHAFTS_ID);
    if (step === FLIGHTED_STEP) trackGain('flighted', FLIGHTED_OGRE_ARROW_ID);else last['flighted'] = q(FLIGHTED_OGRE_ARROW_ID);
    trackGain('brutal', MITHRIL_BRUTAL_ID);
  };
  var tickArrows = () => {
    switch (state) {
      case 'arrows_prepare':
        {
          var remaining = arrowsRemaining();
          var flightedWant = isProgressive ? remaining : Infinity;
          var shaftsWant = isProgressive ? Math.max(0, remaining - q(FLIGHTED_OGRE_ARROW_ID)) : Infinity;
          var nailsWant = isProgressive ? remaining : Infinity;
          var feathersWant = isProgressive ? FEATHERS_PER_ARROW * Math.max(0, remaining - q(FLIGHTED_OGRE_ARROW_ID)) : Infinity;
          var needsFeathers = isProgressive ? feathersWant > 0 : q(FLIGHTED_OGRE_ARROW_ID) === 0;
          var hasFeathers = !needsFeathers || q(FEATHER_ID) >= Math.min(feathersWant, FEATHERS_PER_ARROW * Math.max(1, q(OGRE_SHAFTS_ID)));
          var ready = game.hasItem(KNIFE_ID) && game.hasItem(HAMMER_ID) && q(MITHRIL_NAILS_ID) > 0 && (!isProgressive || q(MITHRIL_NAILS_ID) >= nailsWant) && (isProgressive ? !needsFeathers || q(FEATHER_ID) >= feathersWant : hasFeathers);
          if (ready && !game.isBankOpen()) {
            rollFletchThreshold();
            idleTicks = 0;
            if (enoughShafts()) {
              game.log("Already have ".concat(q(OGRE_SHAFTS_ID), " shafts / ").concat(q(FLIGHTED_OGRE_ARROW_ID), " flighted - no chopping needed, fletching here."));
              state = 'arrows_chopping';
            } else {
              state = 'arrows_location';
            }
            break;
          }
          if (!game.isBankOpen()) {
            openBank(null, 0, 'nearest');
            break;
          }
          var keep = [KNIFE_ID, HAMMER_ID, FEATHER_ID, MITHRIL_NAILS_ID, OGRE_SHAFTS_ID, FLIGHTED_OGRE_ARROW_ID, MITHRIL_BRUTAL_ID];
          if (depositExcept(keep)) break;
          var needs = [[KNIFE_ID, 'Knife', 1], [HAMMER_ID, 'Hammer', 1], [MITHRIL_NAILS_ID, 'Mithril nails', nailsWant], [FLIGHTED_OGRE_ARROW_ID, 'Flighted ogre arrows', flightedWant], [OGRE_SHAFTS_ID, 'Ogre arrow shafts', shaftsWant], [FEATHER_ID, 'Feathers', feathersWant]];
          var missingItem = needs.find(_ref => {
            var _ref2 = _slicedToArray(_ref, 3),
              id = _ref2[0],
              want = _ref2[2];
            return q(id) < want && game.bankQty(id) > 0;
          });
          if (missingItem) {
            var _missingItem = _slicedToArray(missingItem, 3),
              id = _missingItem[0],
              name = _missingItem[1],
              want = _missingItem[2];
            var before = q(id);
            wait("withdraw ".concat(name), () => want === Infinity ? game.withdrawAll(id) : game.withdrawQuantity(id, want - before), () => q(id) > before, () => {
              retries = 0;
              microDelay(0, 1);
            }, 6);
            break;
          }
          if (!game.hasItem(KNIFE_ID)) {
            stop('No Knife (946) in inventory or bank.');
            break;
          }
          if (!game.hasItem(HAMMER_ID)) {
            stop('No Hammer (2347) in inventory or bank - needed to add nails to flighted arrows.');
            break;
          }
          if (q(MITHRIL_NAILS_ID) === 0) {
            stop('No Mithril nails to make brutal arrows.');
            break;
          }
          if (isProgressive && q(MITHRIL_NAILS_ID) < nailsWant) {
            stop("Missing Mithril nails: need ".concat(nailsWant, ", have ").concat(q(MITHRIL_NAILS_ID), "."));
            break;
          }
          if (isProgressive && q(FEATHER_ID) < feathersWant) {
            stop("Missing Feathers: need ".concat(feathersWant, ", have ").concat(q(FEATHER_ID), "."));
            break;
          }
          if (!isProgressive && !hasFeathers) {
            stop('Not enough Feathers (314) to make brutal arrows.');
            break;
          }
          game.log("Arrow supplies: ".concat(q(MITHRIL_NAILS_ID), " nails, ").concat(q(FEATHER_ID), " feathers, ").concat(q(OGRE_SHAFTS_ID), " shafts, ").concat(q(FLIGHTED_OGRE_ARROW_ID), " flighted."));
          game.closeBank();
          microDelay(1, 2);
          break;
        }
      case 'arrows_location':
        {
          var distance = game.distanceTo(ACHEY_AREA);
          var nearArea = distance <= ACHEY_AREA_RADIUS;
          if (!nearArea || !game.findClosestObject([ACHEY_TREE_ID]) && distance > ARRIVED_RADIUS) {
            game.log("Not at Achey trees (distance ".concat(distance, "). Walking to ").concat(ACHEY_AREA, "..."));
            game.webWalkTo(ACHEY_AREA);
            walkRestarts = 0;
            bestWalkDistance = distance;
            state = 'arrows_walking';
            break;
          }
          idleTicks = 0;
          state = 'arrows_chopping';
          break;
        }
      case 'arrows_walking':
        {
          if (game.distanceTo(ACHEY_AREA) <= ARRIVED_RADIUS) {
            game.log('Arrived at Achey tree area.');
            game.stopWebWalk();
            microDelay(1, 2);
            idleTicks = 0;
            state = 'arrows_chopping';
            break;
          }
          if (!game.isWebWalking()) {
            var dist = game.distanceTo(ACHEY_AREA);
            if (dist < bestWalkDistance - 5) {
              bestWalkDistance = dist;
              walkRestarts = 0;
            }
            if (++walkRestarts > 5) {
              stop("WebWalk could not reach Achey trees (stuck at distance ".concat(dist, ", ").concat(game.playerLocation(), ")."));
              break;
            }
            game.log("WebWalk stopped at distance ".concat(dist, ". Restarting (").concat(walkRestarts, "/5)..."));
            game.webWalkTo(ACHEY_AREA);
            delayTicks = 2;
            break;
          }
          maybeAfk('walking');
          break;
        }
      case 'arrows_chopping':
        {
          trackArrows();
          game.handleDialogue();
          if (arrowsFinished() || enoughShafts() && q(ACHEY_LOGS_ID) === 0) {
            if (!targetReached() && nextStep()) {
              state = 'arrows_fletch_start';
              break;
            }
            if (arrowsFinished()) {
              if (targetReached()) {
                nextPhase("Target reached: ".concat(totals.brutal, " Mithril brutal arrows."));
              } else {
                var lacking = !game.hasItem(HAMMER_ID) ? 'Hammer' : q(MITHRIL_NAILS_ID) === 0 ? 'Mithril nails' : 'Feathers';
                ranOut(lacking, progressOf(totals.brutal, plan.arrows, 'brutal arrows'));
              }
              break;
            }
          }
          if (shouldFletch()) {
            microDelay(0, settings.playStyle === 'lazy' ? 4 : 2);
            state = 'arrows_fletch_start';
            break;
          }
          if (game.getEmptySlots() === 0) {
            stop('Inventory is full with no Achey logs. Clear some space.');
            break;
          }
          var chopping = game.isAnimating(CHOP_ANIMATIONS);
          if (chopping || game.isMoving()) {
            idleTicks = 0;
            if (chopping) maybeAfk('chopping');
            break;
          }
          if (game.distanceTo(ACHEY_AREA) > ACHEY_AREA_RADIUS) {
            state = 'arrows_location';
            break;
          }
          if (++idleTicks < 2) break;
          var tree = game.findClosestObject([ACHEY_TREE_ID]);
          if (!tree) {
            if (game.distanceTo(ACHEY_AREA) > ARRIVED_RADIUS) {
              state = 'arrows_location';
              break;
            }
            if (idleTicks % 15 === 0) game.log('Waiting for Achey trees to respawn...');
            if (idleTicks > 5 && q(ACHEY_LOGS_ID) > 0) state = 'arrows_fletch_start';
            break;
          }
          var logsBefore = q(ACHEY_LOGS_ID);
          wait('chop Achey tree', () => game.interactObject(tree, 'Chop'), () => game.isAnimating(CHOP_ANIMATIONS) || q(ACHEY_LOGS_ID) > logsBefore, () => {
            retries = 0;
            idleTicks = 0;
          }, 12, () => {
            idleTicks = 0;
          });
          break;
        }
      case 'arrows_fletch_start':
        {
          var _ITEM_NAMES$current$u, _ITEM_NAMES$current$o;
          var next = nextStep();
          if (!next) {
            state = 'arrows_chopping';
            break;
          }
          step = next;
          if (game.isWidgetVisible(MAKE_WIDGET_ID)) {
            state = 'arrows_make_menu';
            break;
          }
          if (step.use === KNIFE_ID && q(ACHEY_LOGS_ID) === 0) {
            state = 'arrows_chopping';
            break;
          }
          if (game.isItemSelected()) {
            game.clearSelectedItem();
            microDelay(1, 1);
            break;
          }
          var current = step;
          game.log("Using ".concat((_ITEM_NAMES$current$u = ITEM_NAMES[current.use]) !== null && _ITEM_NAMES$current$u !== void 0 ? _ITEM_NAMES$current$u : current.use, " on ").concat((_ITEM_NAMES$current$o = ITEM_NAMES[current.on]) !== null && _ITEM_NAMES$current$o !== void 0 ? _ITEM_NAMES$current$o : current.on, " -> ").concat(current.name, "."));
          wait("use item for ".concat(current.name), () => game.useItemOnItem(current.use, current.on), () => game.isWidgetVisible(MAKE_WIDGET_ID), () => {
            retries = 0;
            if (settings.playStyle === 'lazy') microDelay(0, 2);
            state = 'arrows_make_menu';
          }, 10);
          break;
        }
      case 'arrows_make_menu':
        {
          if (!game.isWidgetVisible(MAKE_WIDGET_ID)) {
            state = 'arrows_fletch_start';
            break;
          }
          wait("click Make ".concat(step.name), () => game.clickWidget(MAKE_WIDGET_ID), () => !game.isWidgetVisible(MAKE_WIDGET_ID), () => {
            retries = 0;
            idleTicks = 0;
            lastInputCount = q(step.input);
            state = 'arrows_fletching';
          }, 8, () => {
            state = 'arrows_fletch_start';
          });
          break;
        }
      case 'arrows_fletching':
        {
          trackArrows();
          if (targetReached()) {
            state = 'arrows_chopping';
            break;
          }
          if (!step.canDo()) {
            updateCounters();
            var following = nextStep();
            if (following && following !== SHAFTS_STEP) {
              game.log("Finished ".concat(step.name, ". Next: ").concat(following.name, "."));
              microDelay(1, settings.playStyle === 'lazy' ? 4 : 2);
              idleTicks = 0;
              state = 'arrows_fletch_start';
              break;
            }
            var delay = reactionDelay();
            game.log("Fletching done. ".concat(summary(), " Nails left: ").concat(q(MITHRIL_NAILS_ID), "."));
            delayTicks = delay;
            rollFletchThreshold();
            idleTicks = 0;
            state = 'arrows_chopping';
            break;
          }
          var inputLeft = q(step.input);
          if (inputLeft < lastInputCount) {
            lastInputCount = inputLeft;
            idleTicks = 0;
            if (maybeAfk('fletching')) break;
          } else {
            idleTicks++;
          }
          game.handleDialogue();
          if (idleTicks > 6) {
            game.log("".concat(step.name, " interrupted (").concat(inputLeft, " left). Restarting..."));
            idleTicks = 0;
            state = 'arrows_fletch_start';
          }
          break;
        }
    }
  };
  var tick = () => {
    if (state === 'stopped' || !game.isLoggedIn()) return;
    if (delayTicks > 0) {
      delayTicks--;
      return;
    }
    if (afkCooldown > 0) afkCooldown--;
    if (++ticksSinceCounterUpdate >= 5) {
      ticksSinceCounterUpdate = 0;
      updateCounters();
    }
    if (pending) {
      var action = pending;
      if (action.check()) {
        pending = null;
        action.done();
      } else if (action.afkAction && game.isMoving() && maybeAfk(action.afkAction)) {
        return;
      } else if (--action.ticks <= 0) {
        pending = null;
        game.log("Action timed out: ".concat(action.label, ". Retrying..."));
        if (++retries > 3) {
          stop("Failed repeatedly on action: ".concat(action.label, "."));
          return;
        }
        if (action.onTimeout) action.onTimeout();
      }
      return;
    }
    if (phase === 'bars') trackGain('bars', MITHRIL_BAR_ID);
    if (phase === 'nails') trackGain('nails', MITHRIL_NAILS_ID);
    if (state === 'start') {
      rollAfkChance();
      if (isProgressive) {
        game.log("Progressive mode: ".concat(settings.arrowTarget, " Mithril brutal arrows. Checking bank..."));
        state = 'plan';
      } else {
        game.log("Single phase mode: ".concat(PHASE_NAMES[settings.singlePhase], " until out of materials."));
        nextPhase();
      }
      return;
    }
    if (state === 'plan') tickPlan();else if (phase === 'bars') tickBars();else if (phase === 'nails') tickNails();else if (phase === 'arrows') tickArrows();
  };
  var describe = () => "phase=".concat(phase !== null && phase !== void 0 ? phase : '-', ", state=").concat(state, ", at ").concat(game.playerLocation(), ", webWalking=").concat(game.isWebWalking(), ", ").concat(summary());
  return {
    tick,
    describe
  };
}

var CACHE_PREFIX = 'brutalIronman.';
var defaultSettings = {
  mode: 'progressive',
  arrowTarget: 1000,
  singlePhase: 'bars',
  minFreeSlots: 0,
  maxFreeSlots: 3,
  randomAfk: true,
  playStyle: 'normal'
};
var loadSettings = () => {
  var configured = bot.bmCache.getBoolean(CACHE_PREFIX + 'configured', false);
  if (!configured) {
    return _objectSpread2({}, defaultSettings);
  }
  var modeStr = bot.bmCache.getString(CACHE_PREFIX + 'mode', 'progressive');
  var phaseStr = String(bot.bmCache.getString(CACHE_PREFIX + 'singlePhase', 'bars'));
  var playStyleStr = bot.bmCache.getString(CACHE_PREFIX + 'playStyle', 'normal');
  return {
    mode: modeStr === 'single' ? 'single' : 'progressive',
    arrowTarget: bot.bmCache.getInt(CACHE_PREFIX + 'arrowTarget', defaultSettings.arrowTarget),
    singlePhase: PHASES.indexOf(phaseStr) !== -1 ? phaseStr : 'bars',
    minFreeSlots: bot.bmCache.getInt(CACHE_PREFIX + 'minFreeSlots', defaultSettings.minFreeSlots),
    maxFreeSlots: bot.bmCache.getInt(CACHE_PREFIX + 'maxFreeSlots', defaultSettings.maxFreeSlots),
    randomAfk: bot.bmCache.getBoolean(CACHE_PREFIX + 'randomAfk', true),
    playStyle: playStyleStr === 'lazy' ? 'lazy' : 'normal'
  };
};
var saveSettings = settings => {
  bot.bmCache.saveBoolean(CACHE_PREFIX + 'configured', true);
  bot.bmCache.saveString(CACHE_PREFIX + 'mode', settings.mode);
  bot.bmCache.saveInt(CACHE_PREFIX + 'arrowTarget', settings.arrowTarget);
  bot.bmCache.saveString(CACHE_PREFIX + 'singlePhase', settings.singlePhase);
  bot.bmCache.saveInt(CACHE_PREFIX + 'minFreeSlots', settings.minFreeSlots);
  bot.bmCache.saveInt(CACHE_PREFIX + 'maxFreeSlots', settings.maxFreeSlots);
  bot.bmCache.saveBoolean(CACHE_PREFIX + 'randomAfk', settings.randomAfk);
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
var parseIntField = (field, fallback, min, max) => {
  var parsed = parseInt(String(field.getText()).trim(), 10);
  if (isNaN(parsed)) return fallback;
  return Math.max(min, Math.min(max, parsed));
};
var showWindow = () => {
  submitted = null;
  cancelled = false;
  var initial = loadSettings();
  var background = new java.awt.Color(0x14111a);
  var surface = new java.awt.Color(0x221d2b);
  var borderLine = new java.awt.Color(0x443a55);
  var foreground = new java.awt.Color(0xf2eef7);
  var muted = new java.awt.Color(0xa89cb8);
  var accent = new java.awt.Color(0xc4b5fd);
  var buttonBg = new java.awt.Color(0x7c3aed);
  var buttonFg = new java.awt.Color(0xffffff);
  var panel = layout => {
    var p = new javax.swing.JPanel(layout);
    p.setBackground(background);
    return p;
  };
  var label = text => {
    var l = new javax.swing.JLabel(text);
    l.setForeground(foreground);
    return l;
  };
  var createSectionBorder = title => {
    var line = javax.swing.BorderFactory.createLineBorder(borderLine, 1);
    var border = javax.swing.BorderFactory.createTitledBorder(line, title);
    border.setTitleColor(accent);
    return border;
  };
  var textField = value => {
    var f = new javax.swing.JTextField(String(value), 5);
    f.setBackground(surface);
    f.setForeground(foreground);
    f.setCaretColor(accent);
    return f;
  };
  var radio = (text, selected) => {
    var r = new javax.swing.JRadioButton(text, selected);
    r.setBackground(background);
    r.setForeground(foreground);
    return r;
  };
  frame = new javax.swing.JFrame('Mithril Brutal Arrow Ironman | by xulixna');
  var mainPanel = panel(new java.awt.BorderLayout(10, 10));
  mainPanel.setBorder(javax.swing.BorderFactory.createEmptyBorder(15, 15, 15, 15));
  var headerPanel = panel(new java.awt.GridLayout(2, 1, 2, 2));
  var titleLabel = label('Mithril Brutal Arrow Ironman');
  titleLabel.setForeground(accent);
  titleLabel.setFont(new java.awt.Font('Dialog', java.awt.Font.BOLD, 20));
  titleLabel.setHorizontalAlignment(0);
  var subtitleLabel = label('Bars -> Nails -> Brutal arrows • by xulixna');
  subtitleLabel.setForeground(muted);
  subtitleLabel.setFont(new java.awt.Font('Dialog', java.awt.Font.PLAIN, 12));
  subtitleLabel.setHorizontalAlignment(0);
  headerPanel.add(titleLabel);
  headerPanel.add(subtitleLabel);
  mainPanel.add(headerPanel, java.awt.BorderLayout.NORTH);
  var contentPanel = panel(new java.awt.GridLayout(0, 1, 8, 8));
  var modePanel = panel(new java.awt.GridLayout(2, 2, 6, 6));
  modePanel.setBorder(createSectionBorder('Mode'));
  var progressiveRadio = radio('Progressive - arrows to make:', initial.mode === 'progressive');
  var singleRadio = radio('Single phase:', initial.mode === 'single');
  var modeGroup = new javax.swing.ButtonGroup();
  modeGroup.add(progressiveRadio);
  modeGroup.add(singleRadio);
  var targetField = textField(initial.arrowTarget);
  var phaseLabels = PHASES.map((p, i) => "".concat(i + 1, ". ").concat(PHASE_NAMES[p]));
  var phaseCombo = new javax.swing.JComboBox(phaseLabels);
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
  var helpLabel = label('<html>Progressive checks the bank for everything first (ore, coal, hammer, knife, feathers, armour) and stops telling you what is missing. Single phase runs one phase until its materials run out.</html>');
  helpLabel.setForeground(muted);
  contentPanel.add(helpLabel);
  var slotsPanel = panel(new java.awt.GridLayout(2, 2, 6, 6));
  slotsPanel.setBorder(createSectionBorder('Arrows: fletch when free slots between (random)'));
  var minField = textField(initial.minFreeSlots);
  var maxField = textField(initial.maxFreeSlots);
  slotsPanel.add(label('Min free slots'));
  slotsPanel.add(minField);
  slotsPanel.add(label('Max free slots'));
  slotsPanel.add(maxField);
  contentPanel.add(slotsPanel);
  var optionsPanel = panel(new java.awt.GridLayout(1, 1, 4, 4));
  optionsPanel.setBorder(createSectionBorder('Options'));
  var afkCheckbox = new javax.swing.JCheckBox('Random short AFKs during actions', initial.randomAfk);
  afkCheckbox.setBackground(background);
  afkCheckbox.setForeground(foreground);
  optionsPanel.add(afkCheckbox);
  contentPanel.add(optionsPanel);
  var stylePanel = panel(new java.awt.GridLayout(2, 1, 4, 4));
  stylePanel.setBorder(createSectionBorder('Play Style (Human Reaction Timers)'));
  var normalRadio = radio('Normal (Active player: 1-3s reaction)', initial.playStyle === 'normal');
  var lazyRadio = radio('Lazy / AFK (Relaxed: up to ~10s reaction)', initial.playStyle === 'lazy');
  var styleGroup = new javax.swing.ButtonGroup();
  styleGroup.add(normalRadio);
  styleGroup.add(lazyRadio);
  stylePanel.add(normalRadio);
  stylePanel.add(lazyRadio);
  contentPanel.add(stylePanel);
  mainPanel.add(contentPanel, java.awt.BorderLayout.CENTER);
  var startButton = new javax.swing.JButton('Start');
  startButton.setBackground(buttonBg);
  startButton.setForeground(buttonFg);
  startButton.setFont(new java.awt.Font('Dialog', java.awt.Font.BOLD, 14));
  startButton.setFocusPainted(false);
  startButton.addActionListener(() => {
    var _PHASES$Math$max;
    var minFree = parseIntField(minField, defaultSettings.minFreeSlots, 0, 20);
    var maxFree = parseIntField(maxField, defaultSettings.maxFreeSlots, 0, 20);
    var settings = {
      mode: singleRadio.isSelected() ? 'single' : 'progressive',
      arrowTarget: parseIntField(targetField, defaultSettings.arrowTarget, 1, 1000000),
      singlePhase: (_PHASES$Math$max = PHASES[Math.max(0, phaseCombo.getSelectedIndex())]) !== null && _PHASES$Math$max !== void 0 ? _PHASES$Math$max : 'bars',
      minFreeSlots: Math.min(minFree, maxFree),
      maxFreeSlots: Math.max(minFree, maxFree),
      randomAfk: afkCheckbox.isSelected(),
      playStyle: lazyRadio.isSelected() ? 'lazy' : 'normal'
    };
    saveSettings(settings);
    submitted = settings;
    closeWindow();
  });
  var buttonPanel = panel(new java.awt.BorderLayout(4, 4));
  buttonPanel.setBorder(javax.swing.BorderFactory.createEmptyBorder(10, 0, 0, 0));
  buttonPanel.add(startButton, java.awt.BorderLayout.CENTER);
  var footerLabel = label('Set the anvil quantity to "All" before the nails phase • by xulixna');
  footerLabel.setForeground(muted);
  footerLabel.setFont(new java.awt.Font('Dialog', java.awt.Font.PLAIN, 11));
  footerLabel.setHorizontalAlignment(0);
  buttonPanel.add(footerLabel, java.awt.BorderLayout.SOUTH);
  mainPanel.add(buttonPanel, java.awt.BorderLayout.SOUTH);
  frame.add(mainPanel);
  frame.setSize(540, 640);
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
      game.log('Settings window closed - stopping.');
      bot.terminate();
      return;
    }
    if (!runner) {
      var settings = selectedSettings();
      if (!settings) return;
      runner = createBrutalRunner(game, settings);
      game.log("Started Mithril Brutal Arrow Ironman by xulixna in ".concat(settings.mode, " mode, ").concat(settings.playStyle, " style."));
    }
    runner.tick();
  } catch (error) {
    game.log('Stopped after error: ' + String(error));
    bot.terminate();
  }
}
function onEnd() {
  closeWindow();
  game.cancelWebWalk();
  try {
    if (runner) game.log('Last status: ' + runner.describe());
  } catch (_unused) {}
  game.log('Mithril Brutal Arrow Ironman stopped.');
}

