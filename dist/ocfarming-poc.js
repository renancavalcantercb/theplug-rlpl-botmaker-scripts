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
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

var define$1 = (name, label, sapling, saplingNote, level, payment, paymentAmount, paymentLabel, produce, pickAction, start) => ({
  name,
  label,
  sapling,
  saplingNote,
  level,
  payment,
  paymentNote: payment + 1,
  paymentAmount,
  paymentLabel,
  produce,
  pickAction,
  start,
  cycles: 6,
  cycleSeconds: 9600
});
var APPLE = define$1('APPLE', 'Apple', 5496, 12946, 27, 5986, 9, 'Sweetcorn', 1955, 'Pick-apple', 8);
var BANANA = define$1('BANANA', 'Banana', 5497, 12947, 33, 5386, 4, 'Apples(5)', 1963, 'Pick-banana', 35);
var ORANGE = define$1('ORANGE', 'Orange', 5498, 12948, 39, 5406, 3, 'Strawberries(5)', 2108, 'Pick-orange', 72);
var CURRY = define$1('CURRY', 'Curry', 5499, 12949, 42, 5416, 5, 'Bananas(5)', 5970, 'Pick-leaf', 99);
var PINEAPPLE = define$1('PINEAPPLE', 'Pineapple', 5500, 12950, 51, 5982, 10, 'Watermelon', 2114, 'Pick-pineapple', 136);
var PAPAYA = define$1('PAPAYA', 'Papaya', 5501, 12951, 57, 2114, 10, 'Pineapple', 5972, 'Pick-fruit', 163);
var PALM = define$1('PALM', 'Palm', 5502, 12952, 68, 5972, 15, 'Papaya fruit', 5974, 'Pick-coconut', 200);
var DRAGONFRUIT = define$1('DRAGONFRUIT', 'Dragonfruit', 22866, 22867, 81, 5974, 15, 'Coconut', 22929, 'Pick-dragonfruit', 227);
var FRUITS = [APPLE, BANANA, ORANGE, CURRY, PINEAPPLE, PAPAYA, PALM, DRAGONFRUIT];
var fruitFromRaw = raw => {
  for (var _i = 0, _FRUITS = FRUITS; _i < _FRUITS.length; _i++) {
    var fruit = _FRUITS[_i];
    if (raw >= fruit.start && raw <= fruit.start + 26) return fruit;
  }
  return null;
};
var fruitByName = name => {
  var _FRUITS$find;
  return (_FRUITS$find = FRUITS.find(fruit => fruit.name === String(name).toUpperCase())) !== null && _FRUITS$find !== void 0 ? _FRUITS$find : null;
};
var fruitByProduce = produce => {
  var _FRUITS$find2;
  return (_FRUITS$find2 = FRUITS.find(fruit => fruit.produce === produce)) !== null && _FRUITS$find2 !== void 0 ? _FRUITS$find2 : null;
};

var define = (name, label, ordinal, sapling, level, payment, paymentAmount, paymentLabel, start, check, diseased, dead) => ({
  name,
  label,
  sapling,
  saplingNote: 12941 + ordinal,
  level,
  payment,
  paymentNote: payment + 1,
  paymentAmount,
  paymentLabel,
  start,
  check,
  diseased,
  dead,
  cycles: check - start,
  cycleSeconds: 2400
});
var OAK = define('OAK', 'Oak', 0, 5370, 15, 5968, 1, 'Tomatoes(5)', 8, 12, 73, 137);
var WILLOW = define('WILLOW', 'Willow', 1, 5371, 30, 5386, 1, 'Apples(5)', 15, 21, 80, 144);
var MAPLE = define('MAPLE', 'Maple', 2, 5372, 45, 5396, 1, 'Oranges(5)', 24, 32, 89, 153);
var YEW = define('YEW', 'Yew', 3, 5373, 60, 6016, 10, 'cactus spines', 35, 45, 100, 164);
var MAGIC = define('MAGIC', 'Magic', 4, 5374, 75, 5974, 25, 'coconuts', 48, 60, 113, 177);
var TREES = [OAK, WILLOW, MAPLE, YEW, MAGIC];
var sick = (tree, raw, base) => raw >= base && raw < base + tree.cycles - 1 || raw === base + tree.cycles;
var treeFromRaw = raw => {
  for (var _i = 0, _TREES = TREES; _i < _TREES.length; _i++) {
    var tree = _TREES[_i];
    if (raw >= tree.start && raw <= tree.check + 2 || sick(tree, raw, tree.diseased) || sick(tree, raw, tree.dead) || tree === WILLOW && raw >= 192 && raw <= 197) {
      return tree;
    }
  }
  return null;
};
var treeByName = name => {
  var _TREES$find;
  return (_TREES$find = TREES.find(tree => tree.name === name.toUpperCase())) !== null && _TREES$find !== void 0 ? _TREES$find : null;
};

var CYCLE_SECONDS = 2400;
var State = {
  WEEDS: 'Weeds',
  EMPTY: 'Empty',
  GROWING: 'growing',
  DISEASED: 'diseased',
  DEAD: 'dead',
  CHECK_HEALTH: 'check health',
  CHECKED: 'health checked',
  STUMP: 'stump',
  HARVEST: 'fruit ready',
  UNKNOWN: 'Unsupported state'
};
var treeState = (raw, tree) => {
  if (raw >= 0 && raw <= 2) return State.WEEDS;
  if (raw === 3) return State.EMPTY;
  if (tree === null) return State.UNKNOWN;
  if (raw < tree.check && raw >= tree.start) return State.GROWING;
  if (raw === tree.check) return State.CHECK_HEALTH;
  if (raw === tree.check + 2) return State.STUMP;
  if (raw === tree.check + 1 || tree === WILLOW && raw >= 192 && raw <= 197) return State.CHECKED;
  return sick(tree, raw, tree.diseased) ? State.DISEASED : State.DEAD;
};
var fruitState = (raw, fruit) => {
  if (raw >= 0 && raw <= 2) return State.WEEDS;
  if (fruit === null) {
    if (raw === 3) return State.EMPTY;
    return raw >= 0 && raw <= 255 ? State.WEEDS : State.UNKNOWN;
  }
  var stage = raw - fruit.start;
  if (stage < 6) return State.GROWING;
  if (stage === 6) return State.CHECKED;
  if (stage <= 12) return State.HARVEST;
  if (stage <= 18) return State.DISEASED;
  if (stage <= 24) return State.DEAD;
  return stage === 25 ? State.STUMP : State.CHECK_HEALTH;
};
var build = (fruit, raw, observedAt, earliestReadyAt, latestReadyAt) => {
  var tree = fruit ? null : treeFromRaw(raw);
  var fruitTree = fruit ? fruitFromRaw(raw) : null;
  var state = fruit ? fruitState(raw, fruitTree) : treeState(raw, tree);
  var growthStage = -1;
  if (fruit) {
    if (fruitTree !== null && state === State.GROWING) growthStage = raw - fruitTree.start;
  } else if (tree !== null && raw >= tree.start && raw < tree.check) {
    growthStage = raw - tree.start;
  }
  var crop = fruit ? fruitTree === null ? null : fruitTree.name : tree === null ? null : tree.name;
  var speciesLabel = fruit ? fruitTree === null || fruitTree === void 0 ? void 0 : fruitTree.label : tree === null || tree === void 0 ? void 0 : tree.label;
  return {
    fruit,
    raw,
    state,
    tree,
    fruitTree,
    crop,
    growthStage,
    label: speciesLabel === undefined ? state : speciesLabel + ' ' + state,
    observedAt,
    earliestReadyAt,
    latestReadyAt
  };
};
var speciesOf = observation => observation.fruit ? observation.fruitTree : observation.tree;
var cyclesOf = observation => {
  var _speciesOf$cycles, _speciesOf;
  return (_speciesOf$cycles = (_speciesOf = speciesOf(observation)) === null || _speciesOf === void 0 ? void 0 : _speciesOf.cycles) !== null && _speciesOf$cycles !== void 0 ? _speciesOf$cycles : 0;
};
var cycleSecondsOf = observation => {
  var _speciesOf$cycleSecon, _speciesOf2;
  return (_speciesOf$cycleSecon = (_speciesOf2 = speciesOf(observation)) === null || _speciesOf2 === void 0 ? void 0 : _speciesOf2.cycleSeconds) !== null && _speciesOf$cycleSecon !== void 0 ? _speciesOf$cycleSecon : CYCLE_SECONDS;
};
var observe = function observe(fruit, raw, now) {
  var previous = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var continuous = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var base = build(fruit, raw, now, 0, 0);
  if (base.state !== State.GROWING) return base;
  var cycles = cyclesOf(base);
  var seconds = cycleSecondsOf(base);
  if (cycles === 0) return base;
  var remaining = cycles - base.growthStage;
  var earliest = now + (remaining - 1) * seconds;
  var latest = now + remaining * seconds;
  if (continuous && previous !== null && previous.state === State.GROWING && base.fruit === previous.fruit && base.crop === previous.crop && now >= previous.observedAt && now - previous.observedAt <= 2 && (base.growthStage === previous.growthStage || base.growthStage === previous.growthStage + 1)) {
    var lower = Math.max(earliest, previous.earliestReadyAt);
    var upper = Math.min(latest, previous.latestReadyAt);
    if (lower <= upper) {
      earliest = lower;
      latest = upper;
    }
  }
  return build(fruit, raw, now, earliest, latest);
};
var isDue = (observation, now) => observation.state === State.GROWING && observation.latestReadyAt > 0 && now >= observation.latestReadyAt;
var needsWork = observation => {
  switch (observation.state) {
    case State.WEEDS:
    case State.EMPTY:
    case State.DISEASED:
    case State.DEAD:
    case State.CHECK_HEALTH:
    case State.CHECKED:
    case State.STUMP:
    case State.HARVEST:
      {
        return true;
      }
    default:
      {
        return false;
      }
  }
};
var needsVisit = (observation, now) => observation === null || isDue(observation, now) || needsWork(observation);
var encode = observation => (observation.fruit ? 'F1:' : 'T1:') + observation.raw + ':' + observation.observedAt + ':' + observation.earliestReadyAt + ':' + observation.latestReadyAt;
var decode = (stored, now) => {
  if (stored === '') return null;
  var fields = stored.split(':');
  if (fields.length !== 5) return null;
  var marker = fields[0];
  if (marker !== 'T1' && marker !== 'F1') return null;
  var digits = /^\d+$/;
  for (var index = 1; index < 5; index = index + 1) {
    var field = fields[index];
    if (field === undefined || !digits.test(field)) return null;
  }
  var raw = Number(fields[1]);
  var observedAt = Number(fields[2]);
  var earliestReadyAt = Number(fields[3]);
  var latestReadyAt = Number(fields[4]);
  if (raw > 255) return null;
  if (observedAt <= 0 || observedAt > now) return null;
  if (latestReadyAt < earliestReadyAt) return null;
  var result = build(marker === 'F1', raw, observedAt, earliestReadyAt, latestReadyAt);
  if (result.state === State.GROWING) {
    var cycles = cyclesOf(result);
    if (cycles === 0) return null;
    if (earliestReadyAt < observedAt) return null;
    if (latestReadyAt - observedAt > cycles * cycleSecondsOf(result)) return null;
  } else if (earliestReadyAt !== 0 || latestReadyAt !== 0) {
    return null;
  }
  return result;
};
var describeWait = seconds => {
  if (seconds <= 0) return 'due';
  var hours = Math.floor(seconds / 3600);
  var minutes = Math.floor(seconds % 3600 / 60);
  return hours > 0 ? hours + 'h' + minutes + 'm' : minutes + 'm';
};

var Action = {
  NONE: 'NONE',
  BLOCKED: 'BLOCKED',
  RAKE: 'RAKE',
  CLEAR: 'CLEAR',
  DROP_WEEDS: 'DROP_WEEDS',
  DROP_POTS: 'DROP_POTS',
  PLANT: 'PLANT',
  PAY: 'PAY',
  CHECK_HEALTH: 'CHECK_HEALTH',
  REMOVE_TREE: 'REMOVE_TREE',
  PRUNE: 'PRUNE',
  HARVEST: 'HARVEST',
  NOTE_FRUIT: 'NOTE_FRUIT'
};
var ITEM = {
  WEEDS: 6055,
  EMPTY_POT: 5350,
  RAKE: 5341,
  SPADE: 952,
  COINS: 995,
  SECATEURS: 5329,
  MAGIC_SECATEURS: 7409
};
var plan$1 = function plan(action, item) {
  var amount = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var reason = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : action;
  var pairedItem = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  return {
    action,
    item,
    pairedItem,
    amount,
    reason
  };
};
var blocked = reason => plan$1(Action.BLOCKED, 0, 0, reason);
var paymentItem = (species, inventory) => {
  if (inventory.count(species.paymentNote) >= species.paymentAmount) return species.paymentNote;
  if (inventory.count(species.payment) >= species.paymentAmount) return species.payment;
  return 0;
};
var nextPlan = (observation, inventory, chosen, chosenIsFruit, protect, paid) => {
  if (observation.state === State.UNKNOWN) return blocked('Tree state not supported');
  if (observation.fruit !== chosenIsFruit) return blocked('Wrong tree type for patch');
  if (inventory.count(ITEM.WEEDS) > 0) return plan$1(Action.DROP_WEEDS, ITEM.WEEDS);
  if (inventory.count(ITEM.EMPTY_POT) > 0) return plan$1(Action.DROP_POTS, ITEM.EMPTY_POT);
  if (observation.fruit) {
    var _iterator = _createForOfIteratorHelper(FRUITS),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var species = _step.value;
        var held = inventory.count(species.produce);
        if (held > 0) {
          return plan$1(Action.NOTE_FRUIT, species.produce, held, 'Note ' + species.label + ' produce', species.produce + 1);
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  switch (observation.state) {
    case State.WEEDS:
      {
        if (inventory.count(ITEM.RAKE) === 0) return blocked('Need rake');
        return inventory.free > 0 ? plan$1(Action.RAKE, 0) : blocked('Need space for weeds');
      }
    case State.EMPTY:
      {
        if (inventory.level < chosen.level) return blocked('Need Farming level ' + chosen.level);
        if (inventory.count(ITEM.SPADE) === 0) return blocked('Need spade');
        if (inventory.count(chosen.sapling) === 0) return blocked('Need unnoted ' + chosen.label + ' sapling');
        if (protect && paymentItem(chosen, inventory) === 0) return blocked('Need ' + chosen.paymentAmount + ' ' + chosen.paymentLabel + ' to protect ' + chosen.label + ' (notes accepted)');
        return plan$1(Action.PLANT, chosen.sapling, 1, 'Plant ' + chosen.label + ' sapling');
      }
    case State.GROWING:
      {
        if (!protect || paid) return plan$1(Action.NONE, 0);
        var growing = observation.fruit ? observation.fruitTree : observation.tree;
        if (growing === null) return plan$1(Action.NONE, 0);
        var item = paymentItem(growing, inventory);
        return plan$1(Action.PAY, item === 0 ? growing.paymentNote : item, growing.paymentAmount, 'Protect ' + growing.label);
      }
    case State.CHECK_HEALTH:
      {
        return plan$1(Action.CHECK_HEALTH, 0);
      }
    case State.HARVEST:
      {
        var ripe = fruitFromRaw(observation.raw);
        if (ripe === null) return blocked('Unknown fruit to pick');
        return inventory.free > 0 ? plan$1(Action.HARVEST, ripe.produce, 1, 'Pick ' + ripe.label) : blocked('Need inventory space to pick fruit');
      }
    case State.CHECKED:
      {
        return inventory.count(ITEM.COINS) >= 200 ? plan$1(Action.REMOVE_TREE, ITEM.COINS, 200, 'Pay to remove tree') : blocked('Need 200 coins to remove checked tree');
      }
    case State.STUMP:
    case State.DEAD:
      {
        return inventory.count(ITEM.SPADE) > 0 ? plan$1(Action.CLEAR, 0) : blocked('Need spade');
      }
    case State.DISEASED:
      {
        return inventory.count(ITEM.SECATEURS) > 0 || inventory.count(ITEM.MAGIC_SECATEURS) > 0 ? plan$1(Action.PRUNE, 0) : blocked('Need secateurs to prune tree');
      }
    default:
      {
        return plan$1(Action.NONE, 0);
      }
  }
};
var clean = text => text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();
var isProtectionConfirmation = text => {
  var normalized = clean(text);
  return normalized.indexOf("that'll do nicely") === 0 && normalized.includes('leave it with me') && normalized.includes('patch grows for you') || normalized.includes('already looking after that patch');
};
var confirmed = (pending, before, after, initial, current, receipt) => {
  var text = clean(receipt);
  var fresh = after !== null && before.fruit === after.fruit;
  switch (pending.action) {
    case Action.DROP_WEEDS:
      {
        return current.count(ITEM.WEEDS) < initial.count(ITEM.WEEDS);
      }
    case Action.DROP_POTS:
      {
        return current.count(ITEM.EMPTY_POT) < initial.count(ITEM.EMPTY_POT);
      }
    case Action.RAKE:
      {
        return fresh && after.state === State.EMPTY;
      }
    case Action.CLEAR:
      {
        return fresh && (after.state === State.EMPTY || after.state === State.WEEDS);
      }
    case Action.CHECK_HEALTH:
      {
        return fresh && before.crop === after.crop && (after.state === State.CHECKED || after.state === State.HARVEST);
      }
    case Action.HARVEST:
      {
        return fresh && before.crop === after.crop && after.raw < before.raw && (after.state === State.HARVEST || after.state === State.CHECKED) && current.count(pending.item) > initial.count(pending.item);
      }
    case Action.NOTE_FRUIT:
      {
        return initial.count(pending.item) - current.count(pending.item) === pending.amount && current.count(pending.pairedItem) - initial.count(pending.pairedItem) === pending.amount;
      }
    case Action.PRUNE:
      {
        return fresh && before.crop === after.crop && (after.state === State.GROWING || after.state === State.CHECK_HEALTH);
      }
    case Action.REMOVE_TREE:
      {
        return fresh && (after.state === State.EMPTY || after.state === State.WEEDS) && initial.count(ITEM.COINS) - current.count(ITEM.COINS) === 200;
      }
    case Action.PAY:
      {
        return isProtectionConfirmation(receipt) || initial.count(pending.item) - current.count(pending.item) === pending.amount && text.includes('you pay the gardener') && text.includes('protect the patch');
      }
    case Action.PLANT:
      {
        if (!fresh || after.state !== State.GROWING) return false;
        var planted = after.fruit ? after.fruitTree : after.tree;
        return planted !== null && planted.sapling === pending.item && initial.count(pending.item) - current.count(pending.item) === 1;
      }
    default:
      {
        return false;
      }
  }
};

var tree = function tree(key, label, region, objectId, visitX, visitY, gardener) {
  var aliases = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : [];
  return {
    key,
    label,
    fruit: false,
    region,
    varbit: 4771,
    objectId,
    visitX,
    visitY,
    gardener,
    leprechaun: 0,
    aliases
  };
};
var fruit = function fruit(key, label, region, varbit, objectId, visitX, visitY, gardener, leprechaun) {
  var aliases = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : [];
  return {
    key,
    label,
    fruit: true,
    region,
    varbit,
    objectId,
    visitX,
    visitY,
    gardener,
    leprechaun,
    aliases
  };
};
var TREE_PATCHES = [tree('lumbridge', 'Lumbridge tree', 12594, 8391, 3195, 3228, 2681, [12850]), tree('varrock', 'Varrock tree', 12854, 8390, 3226, 3458, 11957, [12853]), tree('falador', 'Falador Park tree', 11828, 8389, 3001, 3374, 2679, [12084]), tree('taverley', 'Taverley tree', 11573, 8388, 2936, 3440, 2678, [11829]), tree('gnome', 'Gnome Stronghold tree', 9781, 19147, 2437, 3417, 2687, [9782, 9526, 9525]), tree('nemus', 'Nemus Retreat tree', 5427, 56953, 1365, 3320, 14514, [5428, 5684])];
var FRUIT_PATCHES = [fruit('gnomefruit', 'Gnome Stronghold fruit', 9781, 4772, 7962, 2473, 3446, 2682, 0, [9782, 9526, 9525]), fruit('catherby', 'Catherby fruit', 11317, 4771, 7965, 2858, 3432, 2670, 0), fruit('village', 'Tree Gnome Village fruit', 9777, 4771, 7963, 2490, 3181, 2683, 0, [10033]), fruit('brimhaven', 'Brimhaven fruit', 11058, 4771, 7964, 2765, 3213, 2669, 0, [11057]), fruit('kastori', 'Kastori fruit', 5423, 4772, 56955, 1349, 3058, 14516, 12765, [5167, 5424])];
var PATCHES = [].concat(TREE_PATCHES, FRUIT_PATCHES);
var regionOf = (x, y) => x >> 6 << 8 | y >> 6;
var acceptsRegion = (target, actual) => actual === target.region || target.aliases.includes(actual);
var includes = (target, x, y, plane) => {
  if (target.key === 'catherby' && x < 2840 && y >= 3440) return false;
  return plane === 0 && acceptsRegion(target, regionOf(x, y));
};
var visitPoint = target => new net.runelite.api.coords.WorldPoint(target.visitX, target.visitY, 0);

var playerLocation = () => {
  var _player$getWorldLocat;
  var player = client.getLocalPlayer();
  if (player === null) return null;
  return (_player$getWorldLocat = player.getWorldLocation()) !== null && _player$getWorldLocat !== void 0 ? _player$getWorldLocat : null;
};
var inPatchRegion = patch => {
  var location = playerLocation();
  if (location === null) return false;
  return includes(patch, location.getX(), location.getY(), location.getPlane());
};
var distanceToVisitPoint = patch => {
  var location = playerLocation();
  if (location === null) return 9999;
  return location.distanceTo(visitPoint(patch));
};
var isBusy = () => !bot.localPlayerIdle() || bot.localPlayerMoving();
var CHATLEFT_TEXT = 15138822;
var CHATRIGHT_TEXT = 14221318;
var widgetText = componentId => {
  var widget = client.getWidget(componentId);
  if (widget === null || widget.isHidden()) return '';
  var text = widget.getText();
  return text === null ? '' : String(text);
};
var dialogueText = () => (widgetText(CHATLEFT_TEXT) + ' ' + widgetText(CHATRIGHT_TEXT)).trim();
var readPatch = (patch, now, previous) => observe(patch.fruit, client.getVarbitValue(patch.varbit), now, previous, false);
var findPatchObject = patch => {
  var _bot$objects$getTileO;
  var objects = (_bot$objects$getTileO = bot.objects.getTileObjectsWithIds([patch.objectId])) !== null && _bot$objects$getTileO !== void 0 ? _bot$objects$getTileO : [];
  var _iterator = _createForOfIteratorHelper(objects),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var object = _step.value;
      var location = object.getWorldLocation();
      if (location === null) continue;
      if (includes(patch, location.getX(), location.getY(), location.getPlane())) return object;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return null;
};
var distanceToObject = object => {
  var location = playerLocation();
  if (object === null || location === null) return -1;
  var target = object.getWorldLocation();
  if (target === null) return -1;
  return location.distanceTo(target);
};
var trackedItems = () => {
  var ids = [ITEM.WEEDS, ITEM.EMPTY_POT, ITEM.RAKE, ITEM.SPADE, ITEM.COINS, ITEM.SECATEURS, ITEM.MAGIC_SECATEURS, 953, 5342];
  var _iterator2 = _createForOfIteratorHelper(TREES),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var tree = _step2.value;
      ids.push(tree.sapling, tree.saplingNote, tree.payment, tree.paymentNote);
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  var _iterator3 = _createForOfIteratorHelper(FRUITS),
    _step3;
  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var species = _step3.value;
      ids.push(species.sapling, species.saplingNote, species.payment, species.paymentNote, species.produce, species.produce + 1);
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
  return ids;
};
var heldIds = () => {
  var _bot$inventory$getAll;
  var ids = [];
  var widgets = (_bot$inventory$getAll = bot.inventory.getAllWidgets()) !== null && _bot$inventory$getAll !== void 0 ? _bot$inventory$getAll : [];
  var _iterator4 = _createForOfIteratorHelper(widgets),
    _step4;
  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var widget = _step4.value;
      var id = widget.getItemId();
      if (id > 0 && !ids.includes(id)) ids.push(id);
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }
  ids.sort((a, b) => a - b);
  return ids;
};
var snapshotInventory = () => {
  var counts = {};
  var ids = heldIds();
  var _iterator5 = _createForOfIteratorHelper(trackedItems()),
    _step5;
  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
      var id = _step5.value;
      counts[id] = bot.inventory.getQuantityOfId(id);
    }
  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }
  var _iterator6 = _createForOfIteratorHelper(ids),
    _step6;
  try {
    for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
      var _id = _step6.value;
      if (counts[_id] === undefined) counts[_id] = bot.inventory.getQuantityOfId(_id);
    }
  } catch (err) {
    _iterator6.e(err);
  } finally {
    _iterator6.f();
  }
  var free = bot.inventory.getEmptySlots();
  var level = client.getBoostedSkillLevel(net.runelite.api.Skill.FARMING);
  return {
    count: itemId => {
      var _counts$itemId;
      return (_counts$itemId = counts[itemId]) !== null && _counts$itemId !== void 0 ? _counts$itemId : 0;
    },
    ids,
    free,
    level
  };
};
var startTravel = patch => {
  bot.walking.webWalkStartWithConfig(visitPoint(patch), false, true, 20, true, true, true, false, true, false, true);
};
var stopTravel = () => {
  if (bot.walking.isWebWalking()) bot.walking.webWalkCancel();
};
var needsPatchObject = plan => plan.action === Action.RAKE || plan.action === Action.CLEAR || plan.action === Action.CHECK_HEALTH || plan.action === Action.PRUNE || plan.action === Action.HARVEST || plan.action === Action.PLANT;
var OBJECT_OPTION = {
  RAKE: 'Rake',
  CLEAR: 'Clear',
  CHECK_HEALTH: 'Check-health',
  PRUNE: 'Prune'
};
var nearbyNpc = (id, patch) => {
  var _bot$npcs$getWithIds;
  var npcs = (_bot$npcs$getWithIds = bot.npcs.getWithIds([id])) !== null && _bot$npcs$getWithIds !== void 0 ? _bot$npcs$getWithIds : [];
  var centre = visitPoint(patch);
  var best = null;
  var bestDistance = 33;
  var _iterator7 = _createForOfIteratorHelper(npcs),
    _step7;
  try {
    for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
      var npc = _step7.value;
      var location = npc.getWorldLocation();
      if (location === null) continue;
      if (!includes(patch, location.getX(), location.getY(), location.getPlane())) continue;
      var distance = location.distanceTo(centre);
      if (distance < bestDistance) {
        bestDistance = distance;
        best = npc;
      }
    }
  } catch (err) {
    _iterator7.e(err);
  } finally {
    _iterator7.f();
  }
  return best;
};
var execute$1 = (patch, plan, object) => {
  if (plan.action === Action.DROP_WEEDS) {
    bot.inventory.interactWithIds([ITEM.WEEDS], ['Drop']);
    return true;
  }
  if (plan.action === Action.DROP_POTS) {
    bot.inventory.interactWithIds([ITEM.EMPTY_POT], ['Drop']);
    return true;
  }
  if (plan.action === Action.NOTE_FRUIT) {
    var leprechaun = nearbyNpc(patch.leprechaun, patch);
    if (leprechaun === null) return false;
    bot.inventory.itemOnNpcWithIds(plan.item, leprechaun);
    return true;
  }
  if (plan.action === Action.PAY || plan.action === Action.REMOVE_TREE) {
    var npc = nearbyNpc(patch.gardener, patch);
    if (npc === null) return false;
    bot.npcs.interactSupplied(npc, 'Pay');
    return true;
  }
  if (object === null) return false;
  if (plan.action === Action.PLANT) {
    bot.inventory.itemOnObjectWithIds(plan.item, object);
    return true;
  }
  if (plan.action === Action.HARVEST) {
    var species = fruitByProduce(plan.item);
    if (species === null) return false;
    bot.objects.interactSuppliedObject(object, species.pickAction);
    return true;
  }
  var option = OBJECT_OPTION[plan.action];
  if (option === undefined) return false;
  bot.objects.interactSuppliedObject(object, option);
  return true;
};

var RUNES = [556, 554, 557, 555, 563];
var COINS_PER_PATCH = 200 * 25;
var Kind = {
  DEPOSIT: 'DEPOSIT',
  WITHDRAW: 'WITHDRAW',
  READY: 'READY',
  BLOCKED: 'BLOCKED'
};
var required = (item, note, amount, name, withdrawNoted) => ({
  item,
  note,
  amount,
  name,
  withdrawNoted
});
var buildPlan = input => {
  var list = [];
  var saplings = [];
  var counts = [];
  var sites = '';
  var levelRequired = 0;
  var addRequired = added => {
    for (var index = 0; index < list.length; index = index + 1) {
      var existing = list[index];
      if (existing !== undefined && existing.item === added.item && existing.withdrawNoted === added.withdrawNoted) {
        list[index] = required(existing.item, existing.note, existing.amount + added.amount, existing.name, existing.withdrawNoted);
        return;
      }
    }
    list.push(added);
  };
  var _iterator = _createForOfIteratorHelper(input.patches),
    _step;
  try {
    var _loop = function _loop() {
      var patch = _step.value;
      sites = sites + patch.key;
      var species = input.speciesFor(patch);
      var seen = counts.find(entry => entry.species === species);
      if (seen === undefined) {
        counts.push({
          species,
          fruit: patch.fruit,
          amount: 1
        });
      } else {
        seen.amount = seen.amount + 1;
      }
      if (species.level > levelRequired) levelRequired = species.level;
      if (input.protectFor(patch)) {
        addRequired(required(species.payment, species.paymentNote, species.paymentAmount, species.paymentLabel, true));
      }
    };
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      _loop();
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  var spaceReserve = counts.some(entry => entry.fruit) ? 2 : 1;
  var runeTarget = Math.max(0, Math.min(10000, input.runeReserve));
  for (var _i = 0, _counts = counts; _i < _counts.length; _i++) {
    var entry = _counts[_i];
    saplings.push(required(entry.species.sapling, entry.species.saplingNote, entry.amount, entry.species.label + ' sapling', false));
  }
  var ordered = [].concat(saplings, [required(ITEM.SPADE, 953, 1, 'Spade', false), required(ITEM.RAKE, 5342, 1, 'Rake', false)], list, [required(ITEM.COINS, -1, input.patches.length * COINS_PER_PATCH, 'Coins for travel and tree removal', false)]);
  return {
    patches: input.patches.length,
    levelRequired,
    spaceReserve,
    runeTarget,
    required: ordered,
    saplings,
    key: sites + ':' + counts.map(entry => entry.species.name).join('+') + ':' + input.patches.filter(patch => input.protectFor(patch)).length + ':' + runeTarget
  };
};
var planReady = (plan, inventory) => {
  var _iterator2 = _createForOfIteratorHelper(plan.saplings),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var sapling = _step2.value;
      if (inventory.count(sapling.item) !== sapling.amount) return false;
      if (inventory.count(sapling.note) > 0) return false;
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  var _iterator3 = _createForOfIteratorHelper(plan.required),
    _step3;
  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var item = _step3.value;
      var have = item.withdrawNoted ? Math.max(inventory.count(item.item), inventory.count(item.note)) : inventory.count(item.item);
      if (have < item.amount) return false;
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
  return inventory.free >= plan.spaceReserve;
};
var deposit = (item, amount, message) => ({
  kind: Kind.DEPOSIT,
  item,
  amount,
  received: item,
  noted: false,
  message
});
var result = (kind, message) => ({
  kind,
  item: 0,
  amount: 0,
  received: 0,
  noted: false,
  message
});
var makeSpace = (plan, inventory) => {
  var keep = [ITEM.COINS, ITEM.SECATEURS, ITEM.MAGIC_SECATEURS].concat(RUNES);
  var _iterator4 = _createForOfIteratorHelper(plan.required),
    _step4;
  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var item = _step4.value;
      keep.push(item.item, item.note);
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }
  var _iterator5 = _createForOfIteratorHelper(inventory.ids),
    _step5;
  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
      var id = _step5.value;
      if (!keep.includes(id)) return deposit(id, inventory.count(id), 'Bank unused item to make room');
    }
  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }
  return result(Kind.BLOCKED, 'Need inventory space for run supplies and weeds');
};
var nextStep = (plan, inventory, bank) => {
  var _iterator6 = _createForOfIteratorHelper(plan.required),
    _step6;
  try {
    for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
      var item = _step6.value;
      var total = inventory.count(item.item) + (item.note >= 0 ? inventory.count(item.note) : 0) + bank(item.item);
      if (total < item.amount) {
        return result(Kind.BLOCKED, 'Missing ' + (item.amount - total) + ' ' + item.name + ' in bag + bank');
      }
    }
  } catch (err) {
    _iterator6.e(err);
  } finally {
    _iterator6.f();
  }
  var _iterator7 = _createForOfIteratorHelper(plan.saplings),
    _step7;
  try {
    for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
      var sapling = _step7.value;
      var excess = inventory.count(sapling.item) - sapling.amount;
      if (excess > 0) return deposit(sapling.item, excess, 'Store excess saplings');
    }
  } catch (err) {
    _iterator7.e(err);
  } finally {
    _iterator7.f();
  }
  var _iterator8 = _createForOfIteratorHelper(plan.required),
    _step8;
  try {
    for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
      var _item = _step8.value;
      var normalize = _item.withdrawNoted ? _item.item : _item.note;
      if (normalize >= 0 && inventory.count(normalize) > 0) {
        return deposit(normalize, inventory.count(normalize), 'Prepare ' + _item.name);
      }
    }
  } catch (err) {
    _iterator8.e(err);
  } finally {
    _iterator8.f();
  }
  var _iterator9 = _createForOfIteratorHelper(plan.required),
    _step9;
  try {
    for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
      var _item2 = _step9.value;
      var received = _item2.withdrawNoted ? _item2.note : _item2.item;
      var missing = _item2.amount - inventory.count(received);
      if (missing <= 0) continue;
      var slots = _item2.withdrawNoted || _item2.item === ITEM.COINS ? inventory.count(received) > 0 ? 0 : 1 : missing;
      if (inventory.free < slots + plan.spaceReserve) return makeSpace(plan, inventory);
      return {
        kind: Kind.WITHDRAW,
        item: _item2.item,
        amount: missing,
        received,
        noted: _item2.withdrawNoted,
        message: 'Withdraw ' + missing + ' ' + _item2.name
      };
    }
  } catch (err) {
    _iterator9.e(err);
  } finally {
    _iterator9.f();
  }
  for (var _i2 = 0, _RUNES = RUNES; _i2 < _RUNES.length; _i2++) {
    var rune = _RUNES[_i2];
    var amount = Math.min(Math.max(0, plan.runeTarget - inventory.count(rune)), bank(rune));
    if (amount > 0 && (inventory.count(rune) > 0 || inventory.free > plan.spaceReserve)) {
      return {
        kind: Kind.WITHDRAW,
        item: rune,
        amount,
        received: rune,
        noted: false,
        message: 'Optional teleport runes'
      };
    }
  }
  return inventory.free >= plan.spaceReserve ? result(Kind.READY, 'Run supplies ready: ' + plan.patches + ' saplings') : makeSpace(plan, inventory);
};
var isMandatory = (plan, itemId) => plan.required.some(item => item.item === itemId);

var isOpen = () => bot.bank.isOpen();
var bankCount = itemId => bot.bank.getQuantityOfId(itemId);
var OPEN_WAIT = 10;
var WALK_START = 5;
var stage = 'open';
var stageTicks = 0;
var resetOpen = () => {
  stage = 'open';
  stageTicks = 0;
};
var progressOpen = allowTravel => {
  if (isOpen()) {
    resetOpen();
    return 'open';
  }
  stageTicks = stageTicks + 1;
  switch (stage) {
    case 'open':
      {
        if (stageTicks === 1) bot.bank.open();
        if (stageTicks > OPEN_WAIT) {
          stage = 'walk';
          stageTicks = 0;
        }
        return 'opening';
      }
    case 'walk':
      {
        if (stageTicks === 1) bot.walking.webWalkToNearestBank();
        if (bot.walking.isWebWalking() || stageTicks < WALK_START) return 'walking';
        stage = 'reopen';
        stageTicks = 0;
        return 'walking';
      }
    case 'reopen':
      {
        if (stageTicks === 1) bot.bank.open();
        if (stageTicks > OPEN_WAIT) {
          stage = 'failed';
          return 'failed';
        }
        return 'opening';
      }
    default:
      {
        return 'failed';
      }
  }
};
var requestClose = () => {
  if (bot.bank.getNotedMode()) bot.bank.setNotedMode(false);
  bot.bank.close();
};
var expectedAfter = (step, before) => step.kind === Kind.DEPOSIT ? before - step.amount : before + step.amount;
var heldForStep = step => snapshotInventory().count(step.received);
var execute = step => {
  if (!isOpen()) return false;
  if (step.kind === Kind.DEPOSIT) {
    bot.bank.depositAllWithId(step.item);
    return true;
  }
  if (bot.bank.getNotedMode() !== step.noted) {
    bot.bank.setNotedMode(step.noted);
    return false;
  }
  bot.bank.withdrawQuantityWithId(step.item, step.amount);
  return true;
};

var PREFIX = 'ocPoc.';
var KEY = {
  configured: PREFIX + 'configured',
  tree: PREFIX + 'tree',
  fruit: PREFIX + 'fruit',
  protectTrees: PREFIX + 'protect',
  protectFruit: PREFIX + 'protectFruit',
  useBank: PREFIX + 'useBank',
  runeReserve: PREFIX + 'runeReserve',
  travelLimit: PREFIX + 'travelLimit',
  stopWhenDone: PREFIX + 'stopWhenDone',
  patch: key => PREFIX + 'patch.' + key
};
var readConfig = () => {
  var _treeByName, _fruitByName;
  var patches = PATCHES.filter(patch => bot.bmCache.getBoolean(KEY.patch(patch.key), false));
  var tree = (_treeByName = treeByName(String(bot.bmCache.getString(KEY.tree, WILLOW.label)))) !== null && _treeByName !== void 0 ? _treeByName : WILLOW;
  var fruitTree = (_fruitByName = fruitByName(String(bot.bmCache.getString(KEY.fruit, APPLE.label)))) !== null && _fruitByName !== void 0 ? _fruitByName : APPLE;
  var travelLimit = bot.bmCache.getInt(KEY.travelLimit, 1500);
  var runeReserve = bot.bmCache.getInt(KEY.runeReserve, 0);
  return {
    patches,
    tree,
    fruitTree,
    protectTrees: bot.bmCache.getBoolean(KEY.protectTrees, false),
    protectFruit: bot.bmCache.getBoolean(KEY.protectFruit, false),
    useBank: bot.bmCache.getBoolean(KEY.useBank, false),
    runeReserve: runeReserve > 0 ? runeReserve : 0,
    travelLimit: travelLimit > 0 ? travelLimit : 1500,
    stopWhenDone: bot.bmCache.getBoolean(KEY.stopWhenDone, true)
  };
};
var speciesFor = (config, patch) => patch.fruit ? config.fruitTree : config.tree;
var protectFor = (config, patch) => patch.fruit ? config.protectFruit : config.protectTrees;

var profile = () => {
  var player = client.getLocalPlayer();
  if (player === null) return 'unknown';
  var name = player.getName();
  return name === null ? 'unknown' : String(name);
};
var observationKey = patch => 'ocPoc.obs.' + profile() + '.' + patch.key;
var protectionKey = patch => 'ocPoc.prot.' + profile() + '.' + patch.key;
var remember = (patch, observation) => {
  bot.bmCache.saveString(observationKey(patch), encode(observation));
};
var recall = (patch, now) => {
  var stored = String(bot.bmCache.getString(observationKey(patch), ''));
  return decode(stored, now);
};
var rememberProtection = (patch, observation) => {
  if (observation.state !== State.GROWING || observation.crop === null) return;
  bot.bmCache.saveString(protectionKey(patch), '1:' + observation.crop);
};
var clearProtection = patch => {
  bot.bmCache.saveString(protectionKey(patch), '');
};
var isProtected = (patch, observation) => {
  if (observation === null || observation.state !== State.GROWING || observation.crop === null) {
    return false;
  }
  var stored = String(bot.bmCache.getString(protectionKey(patch), ''));
  return stored === '1:' + observation.crop;
};
var nowSeconds = () => Math.floor(Date.now() / 1000);

var visits = [];
var current$1 = null;
var printed = false;
var log = message => {
  bot.printLogMessage('[oc-poc] ' + message);
  bot.printGameMessage('[oc-poc] ' + message);
};
var startVisit = patch => {
  current$1 = {
    patch,
    travelTicks: 0,
    walkRestarts: 0,
    arrivalDistance: -1,
    objectDistance: -1,
    objectLoaded: false,
    bounced: false,
    settleTicks: 0,
    observed: '',
    outcome: 'incomplete',
    actions: []
  };
  visits.push(current$1);
  log('visiting ' + patch);
  return current$1;
};
var visit = () => current$1;
var recordAction = (action, reason) => {
  var report = {
    action,
    reason,
    attempts: 0,
    confirmTicks: 0,
    confirmed: false
  };
  if (current$1 !== null) current$1.actions.push(report);
  return report;
};
var finishVisit = outcome => {
  if (current$1 === null) return;
  current$1.outcome = outcome;
  log(current$1.patch + ' -> ' + outcome);
  current$1 = null;
};
var createApproachProbe = (destination, initial, tick) => {
  var best = initial === null ? 9999 : initial.distanceTo(destination);
  var lastProgress = tick;
  var _bounced = false;
  return {
    observe: (position, now) => {
      if (position === null) return;
      var distance = position.distanceTo(destination);
      if (distance < best) {
        best = distance;
        lastProgress = now;
      }
      if (distance <= 3 && now - lastProgress >= 10) _bounced = true;
    },
    bounced: () => _bounced
  };
};
var line = report => {
  var actions = report.actions.map(a => a.action + (a.confirmed ? '=ok/' + a.confirmTicks + 't' : '=FAIL') + 'x' + a.attempts).join(' ');
  return report.patch + ' | travel ' + report.travelTicks + 't restarts ' + report.walkRestarts + ' | arrive d=' + report.arrivalDistance + ' obj d=' + report.objectDistance + (report.objectLoaded ? '' : ' OBJ-MISSING') + (report.bounced ? ' BOUNCE' : '') + ' | settle ' + report.settleTicks + 't | ' + report.observed + ' | ' + report.outcome + (actions === '' ? '' : ' | ' + actions);
};
var summary = () => {
  if (printed) return;
  printed = true;
  log('=== walker report ===');
  for (var _i = 0, _visits = visits; _i < _visits.length; _i++) {
    var report = _visits[_i];
    log(line(report));
  }
  var bounced = visits.filter(r => r.bounced).length;
  var restarts = visits.reduce((total, r) => total + r.walkRestarts, 0);
  var missing = visits.filter(r => !r.objectLoaded).length;
  var failed = visits.reduce((total, r) => total + r.actions.filter(a => !a.confirmed).length, 0);
  log('patches ' + visits.length + ' | bounced ' + bounced + ' | walk restarts ' + restarts + ' | object missing on arrival ' + missing + ' | unconfirmed actions ' + failed);
  log('bounced/restarts near zero => the approach layer can be deleted, not ported.');
};

var ARRIVAL_DISTANCE = 4;
var SETTLE_TICKS = 3;
var SETTLE_LIMIT = 40;
var AWAIT_LIMIT = 25;
var AWAIT_WALK_LIMIT = 60;
var MAX_ACTIONS_PER_PATCH = 12;
var MAX_ATTEMPTS_PER_ACTION = 3;
var BANK_STEP_LIMIT = 20;
var BANK_OPEN_LIMIT = 400;
var GARDENER_OPTIONS = ['Yes', 'Yes.', 'Yes please.', "Yes, I'd like to pay."];
var config;
var queue = [];
var phase = 'prepare';
var current = null;
var wait = 0;
var travelTicks = 0;
var walkIssued = false;
var probe = null;
var settleTicks = 0;
var gateRegion = -1;
var gateStable = 0;
var observation = null;
var object = null;
var actionsDone = 0;
var attempts = 0;
var pending = null;
var before = null;
var initial = null;
var awaitTicks = 0;
var walkTicks = 0;
var receipt = '';
var paid = false;
var plan = null;
var bankTicks = 0;
var step = null;
var stepHeld = 0;
var stepTicks = 0;
var skippedOptional = [];
var lastBankStage = '';
var onChatReceipt = message => {
  receipt = receipt + ' ' + message;
};
var start = () => {
  config = readConfig();
  queue = config.patches.map(patch => ({
    patch,
    done: false
  }));
  phase = 'prepare';
  log('farming PoC | trees ' + config.tree.label + ' | fruit ' + config.fruitTree.label + ' | protect ' + config.protectTrees + '/' + config.protectFruit + ' | bank ' + config.useBank + ' | patches ' + config.patches.map(patch => patch.key).join(','));
};
var stop = () => {
  stopTravel();
  summary();
};
var failVisit = reason => {
  stopTravel();
  if (current !== null) current.done = true;
  finishVisit(reason);
  current = null;
  phase = 'select';
};
var completeVisit = reason => {
  stopTravel();
  if (current !== null) {
    if (observation !== null) remember(current.patch, observation);
    current.done = true;
  }
  finishVisit(reason);
  current = null;
  phase = 'select';
};
var gateAccepts = (region, eligible) => {
  if (!eligible) {
    gateRegion = -1;
    gateStable = 0;
    return false;
  }
  if (gateRegion !== region) {
    gateRegion = region;
    gateStable = 0;
  }
  gateStable = Math.min(SETTLE_TICKS, gateStable + 1);
  return gateStable >= SETTLE_TICKS;
};
var patchNeedsVisit = (patch, now) => {
  var stored = recall(patch, now);
  if (needsVisit(stored, now)) return true;
  return protectFor(config, patch) && stored !== null && stored.state === State.GROWING && !isProtected(patch, stored);
};
var prepare = () => {
  if (queue.length === 0) {
    log('no patches enabled');
    phase = 'stopped';
    return;
  }
  var now = nowSeconds();
  var _iterator = _createForOfIteratorHelper(queue),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var entry = _step.value;
      var stored = recall(entry.patch, now);
      if (stored === null) {
        log(entry.patch.label + ': never observed');
        continue;
      }
      var growing = stored.state === State.GROWING;
      log(entry.patch.label + ': ' + stored.label + (growing ? ' — ' + (isDue(stored, now) ? 'due' : 'due in ' + describeWait(stored.latestReadyAt - now)) : '') + (protectFor(config, entry.patch) && growing ? isProtected(entry.patch, stored) ? ' (protected)' : ' (UNPROTECTED)' : ''));
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  var due = config.patches.filter(patch => patchNeedsVisit(patch, now));
  if (due.length === 0) {
    log('nothing due — skipping the bank trip');
    phase = 'select';
    return;
  }
  plan = buildPlan({
    patches: due,
    speciesFor: patch => speciesFor(config, patch),
    protectFor: patch => protectFor(config, patch),
    runeReserve: config.runeReserve
  });
  var inventory = snapshotInventory();
  if (inventory.level < plan.levelRequired) {
    log('blocked: need Farming level ' + plan.levelRequired);
    phase = 'stopped';
    return;
  }
  if (planReady(plan, inventory)) {
    log('supplies already in the bag');
    phase = 'select';
    return;
  }
  if (!config.useBank) {
    log('supplies incomplete and banking is off — patches may be skipped');
    phase = 'select';
    return;
  }
  bankTicks = 0;
  skippedOptional = [];
  resetOpen();
  lastBankStage = '';
  phase = 'supplies';
};
var availableInBank = itemId => skippedOptional.includes(itemId) ? 0 : bankCount(itemId);
var supplies = () => {
  if (plan === null) {
    phase = 'select';
    return;
  }
  bankTicks = bankTicks + 1;
  if (bankTicks > BANK_OPEN_LIMIT) {
    log('could not reach a bank — continuing with what is in the bag');
    phase = 'select';
    return;
  }
  if (!isOpen()) {
    var progress = progressOpen();
    if (progress !== lastBankStage) {
      lastBankStage = progress;
      log('bank: ' + progress);
    }
    if (progress === 'failed') {
      log('could not open a bank — continuing with what is in the bag');
      phase = 'select';
      return;
    }
    wait = 1;
    return;
  }
  lastBankStage = '';
  var next = nextStep(plan, snapshotInventory(), availableInBank);
  if (next.kind === Kind.BLOCKED) {
    log('supplies blocked: ' + next.message);
    requestClose();
    phase = 'select';
    return;
  }
  if (next.kind === Kind.READY) {
    log(next.message);
    requestClose();
    wait = 3;
    phase = 'select';
    return;
  }
  step = next;
  stepHeld = heldForStep(next);
  stepTicks = 0;
  log(next.message);
  phase = 'supplyStep';
};
var supplyStep = () => {
  if (step === null || plan === null) {
    phase = 'supplies';
    return;
  }
  stepTicks = stepTicks + 1;
  if (stepTicks === 1) {
    if (!execute(step)) stepTicks = 0;
    wait = 1;
    return;
  }
  if (heldForStep(step) === expectedAfter(step, stepHeld)) {
    step = null;
    phase = 'supplies';
    return;
  }
  if (stepTicks > BANK_STEP_LIMIT) {
    if (step.kind === Kind.WITHDRAW && !isMandatory(plan, step.item)) {
      log('skipping optional item ' + step.item);
      skippedOptional.push(step.item);
      step = null;
      phase = 'supplies';
      return;
    }
    log('supplies blocked: ' + step.message + ' not confirmed');
    requestClose();
    step = null;
    phase = 'select';
  }
};
var select = () => {
  var now = nowSeconds();
  var next = queue.find(entry => !entry.done);
  while (next !== undefined) {
    if (patchNeedsVisit(next.patch, now)) break;
    var stored = recall(next.patch, now);
    next.done = true;
    log(next.patch.label + ' -> skipped, ' + (stored === null ? '' : stored.label + ', ') + 'due in ' + describeWait(stored === null ? 0 : stored.latestReadyAt - now));
    next = queue.find(entry => !entry.done);
  }
  if (next === undefined) {
    phase = 'stopped';
    if (queue.length > 0) log('no patch is due — nothing to walk to');
    summary();
    if (config.stopWhenDone) bot.terminate();
    return;
  }
  current = next;
  paid = isProtected(next.patch, recall(next.patch, now));
  travelTicks = 0;
  walkIssued = false;
  settleTicks = 0;
  gateRegion = -1;
  gateStable = 0;
  startVisit(next.patch.label);
  probe = createApproachProbe(visitPoint(next.patch), playerLocation(), 0);
  phase = 'travel';
};
var travel = () => {
  if (current === null) {
    phase = 'select';
    return;
  }
  var patch = current.patch;
  var report = visit();
  var location = playerLocation();
  var distance = distanceToVisitPoint(patch);
  if (probe !== null) probe.observe(location, travelTicks);
  if (distance <= ARRIVAL_DISTANCE) {
    stopTravel();
    if (report !== null) {
      report.travelTicks = travelTicks;
      report.arrivalDistance = distance;
      report.bounced = probe !== null && probe.bounced();
    }
    phase = 'settle';
    return;
  }
  if (!bot.walking.isWebWalking()) {
    if (walkIssued && report !== null) report.walkRestarts = report.walkRestarts + 1;
    startTravel(patch);
    walkIssued = true;
    wait = 2;
  }
  travelTicks = travelTicks + 1;
  bot.counters.setCounter('TravelTicks', travelTicks);
  if (travelTicks > config.travelLimit) failVisit('travel timeout at distance ' + distance);
};
var settle = () => {
  if (current === null) {
    phase = 'select';
    return;
  }
  var patch = current.patch;
  var report = visit();
  var location = playerLocation();
  settleTicks = settleTicks + 1;
  var eligible = location !== null && !bot.localPlayerMoving() && inPatchRegion(patch);
  var region = location === null ? -1 : regionOf(location.getX(), location.getY());
  if (!gateAccepts(region, eligible)) {
    if (settleTicks > SETTLE_LIMIT) failVisit('never settled inside the patch region');
    return;
  }
  var now = nowSeconds();
  observation = readPatch(patch, now, recall(patch, now));
  remember(patch, observation);
  if (!isProtected(patch, observation)) {
    paid = false;
    if (observation.state !== State.GROWING) clearProtection(patch);
  }
  object = findPatchObject(patch);
  if (report !== null) {
    report.settleTicks = settleTicks;
    report.observed = observation.label + ' (raw ' + observation.raw + ')';
    report.objectLoaded = object !== null;
    report.objectDistance = distanceToObject(object);
  }
  actionsDone = 0;
  attempts = 0;
  phase = 'act';
};
var act = () => {
  if (current === null || observation === null) {
    phase = 'select';
    return;
  }
  if (isBusy()) return;
  if (actionsDone >= MAX_ACTIONS_PER_PATCH) {
    completeVisit('action cap reached');
    return;
  }
  var patch = current.patch;
  var inventory = snapshotInventory();
  var nextAction = nextPlan(observation, inventory, speciesFor(config, patch), patch.fruit, protectFor(config, patch), paid);
  if (nextAction.action === Action.NONE) {
    completeVisit('nothing to do: ' + observation.label);
    return;
  }
  if (nextAction.action === Action.BLOCKED) {
    completeVisit('blocked: ' + nextAction.reason);
    return;
  }
  object = findPatchObject(patch);
  if (object === null && needsPatchObject(nextAction)) {
    completeVisit('patch object not in scene for ' + nextAction.action);
    return;
  }
  var report = recordAction(nextAction.action, nextAction.reason);
  attempts = attempts + 1;
  report.attempts = attempts;
  if (!execute$1(patch, nextAction, object)) {
    completeVisit('no target for ' + nextAction.action);
    return;
  }
  pending = nextAction;
  before = observation;
  initial = inventory;
  walkTicks = 0;
  awaitTicks = 0;
  receipt = '';
  phase = 'await';
};
var settleAwait = () => {
  if (current === null || pending === null || before === null || initial === null) {
    phase = 'act';
    return;
  }
  var patch = current.patch;
  if (bot.localPlayerMoving()) {
    walkTicks = walkTicks + 1;
  } else {
    awaitTicks = awaitTicks + 1;
  }
  if (!inPatchRegion(patch)) {
    failVisit('left the patch region during ' + pending.action);
    return;
  }
  if (pending.action === Action.PAY || pending.action === Action.REMOVE_TREE) {
    bot.widgets.handleDialogue(GARDENER_OPTIONS);
  }
  var spoken = dialogueText();
  if (spoken !== '' && !receipt.includes(spoken)) receipt = receipt + ' ' + spoken;
  var after = readPatch(patch, nowSeconds(), observation);
  var currentInventory = snapshotInventory();
  if (confirmed(pending, before, after, initial, currentInventory, receipt)) {
    var report = visit();
    if (report !== null && report.actions.length > 0) {
      var last = report.actions[report.actions.length - 1];
      if (last !== undefined) {
        last.confirmed = true;
        last.confirmTicks = awaitTicks + walkTicks;
      }
    }
    if (pending.action === Action.PAY) {
      paid = true;
      rememberProtection(patch, before);
    }
    observation = after;
    remember(patch, after);
    actionsDone = actionsDone + 1;
    attempts = 0;
    pending = null;
    phase = 'act';
    wait = 1;
    return;
  }
  if (awaitTicks > AWAIT_LIMIT || walkTicks > AWAIT_WALK_LIMIT) {
    log(patch.label + ': ' + pending.action + ' never confirmed (' + awaitTicks + 't idle, ' + walkTicks + 't walking)');
    observation = after;
    pending = null;
    if (attempts >= MAX_ATTEMPTS_PER_ACTION) {
      completeVisit('unconfirmed after ' + attempts + ' attempts');
      return;
    }
    phase = 'act';
  }
};
var tick = () => {
  bot.breakHandler.setBreakHandlerStatus(false);
  if (wait > 0) {
    wait = wait - 1;
    return;
  }
  switch (phase) {
    case 'prepare':
      {
        prepare();
        return;
      }
    case 'supplies':
      {
        supplies();
        return;
      }
    case 'supplyStep':
      {
        supplyStep();
        return;
      }
    case 'select':
      {
        select();
        return;
      }
    case 'travel':
      {
        travel();
        return;
      }
    case 'settle':
      {
        settle();
        return;
      }
    case 'act':
      {
        act();
        return;
      }
    case 'await':
      {
        settleAwait();
        return;
      }
    default:
      {
        return;
      }
  }
};

var ready = false;
var configReady = () => ready;
var showConfigWindow = () => {
  var configured = bot.bmCache.getBoolean(KEY.configured, false);
  var seedPatch = (key, fallback) => configured ? bot.bmCache.getBoolean(KEY.patch(key), false) : fallback;
  var seedString = (key, fallback) => configured ? String(bot.bmCache.getString(key, fallback)) : fallback;
  var seedBool = (key, fallback) => configured ? bot.bmCache.getBoolean(key, fallback) : fallback;
  var frame = new javax.swing.JFrame('ocfarming PoC');
  var panel = new javax.swing.JPanel(new java.awt.GridLayout(0, 1));
  var boxes = [];
  var patches = [];
  var addGroup = (title, group, fallback) => {
    panel.add(new javax.swing.JLabel(title));
    var _iterator = _createForOfIteratorHelper(group),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var patch = _step.value;
        var box = new javax.swing.JCheckBox(patch.label, seedPatch(patch.key, fallback));
        boxes.push(box);
        patches.push(patch);
        panel.add(box);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  };
  addGroup('Tree patches:', TREE_PATCHES, true);
  addGroup('Fruit tree patches:', FRUIT_PATCHES, false);
  panel.add(new javax.swing.JLabel('Tree species:'));
  var species = new javax.swing.JComboBox(TREES.map(tree => tree.label));
  species.setSelectedItem(seedString(KEY.tree, WILLOW.label));
  panel.add(species);
  panel.add(new javax.swing.JLabel('Fruit tree species:'));
  var fruitSpecies = new javax.swing.JComboBox(FRUITS.map(fruit => fruit.label));
  fruitSpecies.setSelectedItem(seedString(KEY.fruit, APPLE.label));
  panel.add(fruitSpecies);
  var protectTrees = new javax.swing.JCheckBox('Pay the gardener to protect trees', seedBool(KEY.protectTrees, false));
  panel.add(protectTrees);
  var protectFruit = new javax.swing.JCheckBox('Pay the gardener to protect fruit trees', seedBool(KEY.protectFruit, false));
  panel.add(protectFruit);
  var useBank = new javax.swing.JCheckBox('Fetch supplies from the bank before the run', seedBool(KEY.useBank, false));
  panel.add(useBank);
  var start = new javax.swing.JButton('Start');
  start.addActionListener(() => {
    var chosen = 0;
    for (var index = 0; index < boxes.length; index = index + 1) {
      var patch = patches[index];
      var box = boxes[index];
      if (patch === undefined || box === undefined) continue;
      var selected = box.isSelected();
      bot.bmCache.saveBoolean(KEY.patch(patch.key), selected);
      if (selected) chosen = chosen + 1;
    }
    if (chosen === 0) {
      javax.swing.JOptionPane.showMessageDialog(frame, 'Pick at least one patch.', 'Nothing selected', javax.swing.JOptionPane.WARNING_MESSAGE);
      return;
    }
    bot.bmCache.saveString(KEY.tree, String(species.getSelectedItem()));
    bot.bmCache.saveString(KEY.fruit, String(fruitSpecies.getSelectedItem()));
    bot.bmCache.saveBoolean(KEY.protectTrees, protectTrees.isSelected());
    bot.bmCache.saveBoolean(KEY.protectFruit, protectFruit.isSelected());
    bot.bmCache.saveBoolean(KEY.useBank, useBank.isSelected());
    bot.bmCache.saveBoolean(KEY.configured, true);
    frame.dispose();
    ready = true;
  });
  panel.add(start);
  frame.add(new javax.swing.JScrollPane(panel));
  frame.setSize(440, 560);
  frame.setDefaultCloseOperation(javax.swing.WindowConstants.DO_NOTHING_ON_CLOSE);
  frame.addWindowListener(new java.awt.event.WindowAdapter({
    windowClosing: () => {
      frame.dispose();
      bot.terminate();
    }
  }));
  var pointer = java.awt.MouseInfo.getPointerInfo().getLocation();
  frame.setLocation(pointer.getX() - 220, pointer.getY() - 280);
  frame.setVisible(true);
};

var running = false;
function onStart() {
  showConfigWindow();
}
function onGameTick() {
  try {
    if (!running) {
      if (!configReady()) return;
      start();
      running = true;
    }
    tick();
  } catch (error) {
    log('crashed: ' + String(error));
    bot.terminate();
  }
}
function onEnd() {
  if (running) stop();
}
function onChatMessage(_type, _name, message) {
  onChatReceipt(message);
}
