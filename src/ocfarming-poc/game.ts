/// <reference types="@deafwave/osrs-botmaker-types" />

/**
 * The rlpl adapter — everything that touches the client lives here.
 *
 * This is the layer FarmingGameActions.java occupies in the plugin, and the
 * only layer the port actually had to rewrite. Note what is NOT here: no
 * approach(), no patchTarget(), no reachable-tile query, no canvas-walk
 * fallback. The PoC issues the plain interact and lets the rlpl walker handle
 * the last tiles — measured over six patches at zero bounces, zero restarts.
 *
 * Note also that every rlpl interaction returns void. There is no "the click
 * landed" signal at all, which makes the plugin's rule — a click is never a
 * receipt — not just good practice here but the only option.
 */

import { FRUITS, fruitByProduce } from './fruit.js';
import { type Observation, observe } from './observation.js';
import { Action, ITEM, type Inventory, type Plan } from './policy.js';
import { includes, type TreePatch, visitPoint } from './patches.js';
import { TREES } from './trees.js';

type WorldPoint = net.runelite.api.coords.WorldPoint;
type TileObject = net.runelite.api.TileObject;
type Npc = net.runelite.api.NPC;

/** The types declare these non-null; at runtime they are not. */
export const playerLocation = (): WorldPoint | null => {
	const player = client.getLocalPlayer() as net.runelite.api.Player | null;
	if (player === null) return null;
	return (player.getWorldLocation() as WorldPoint | null) ?? null;
};

export const inPatchRegion = (patch: TreePatch): boolean => {
	const location = playerLocation();
	if (location === null) return false;
	return includes(patch, location.getX(), location.getY(), location.getPlane());
};

export const distanceToVisitPoint = (patch: TreePatch): number => {
	const location = playerLocation();
	if (location === null) return 9999;
	return location.distanceTo(visitPoint(patch));
};

export const isBusy = (): boolean => !bot.localPlayerIdle() || bot.localPlayerMoving();

// Packed gameval component ids for the NPC and player dialogue boxes.
// Written without numeric separators on purpose: babel's rhino target does
// NOT transpile them, and 15_138_822 is a syntax error on the way in.
const CHATLEFT_TEXT = 15138822;
const CHATRIGHT_TEXT = 14221318;

const widgetText = (componentId: number): string => {
	const widget = client.getWidget(componentId);
	if (widget === null || widget.isHidden()) return '';
	const text = widget.getText();
	// String(): getText hands back a java.lang.String.
	return text === null ? '' : String(text);
};

/**
 * The gardener's answers arrive here, not in the chatbox. Without this the
 * "already looking after that patch" line never reaches confirmed(), PAY
 * never confirms, protection is never recorded, and the patch is revisited
 * on every run forever. The Java version built its receipt from chat plus
 * dialogue text; this is the half that was missing.
 */
export const dialogueText = (): string =>
	(widgetText(CHATLEFT_TEXT) + ' ' + widgetText(CHATRIGHT_TEXT)).trim();

/** The varbit only describes the patch of the region the player stands in. */
export const readPatch = (
	patch: TreePatch,
	now: number,
	previous: Observation | null,
): Observation => observe(patch.fruit, client.getVarbitValue(patch.varbit), now, previous, false);

export const findPatchObject = (patch: TreePatch): TileObject | null => {
	const objects = bot.objects.getTileObjectsWithIds([patch.objectId]) ?? [];
	for (const object of objects) {
		const location = object.getWorldLocation() as WorldPoint | null;
		if (location === null) continue;
		if (includes(patch, location.getX(), location.getY(), location.getPlane())) return object;
	}
	return null;
};

export const distanceToObject = (object: TileObject | null): number => {
	const location = playerLocation();
	if (object === null || location === null) return -1;
	const target = object.getWorldLocation() as WorldPoint | null;
	if (target === null) return -1;
	return location.distanceTo(target);
};

const trackedItems = (): number[] => {
	const ids: number[] = [
		ITEM.WEEDS,
		ITEM.EMPTY_POT,
		ITEM.RAKE,
		ITEM.SPADE,
		ITEM.COINS,
		ITEM.SECATEURS,
		ITEM.MAGIC_SECATEURS,
		953, // noted spade
		5342, // noted rake
	];
	for (const tree of TREES) ids.push(tree.sapling, tree.saplingNote, tree.payment, tree.paymentNote);
	for (const species of FRUITS) {
		ids.push(
			species.sapling,
			species.saplingNote,
			species.payment,
			species.paymentNote,
			species.produce,
			species.produce + 1,
		);
	}
	return ids;
};

/** Every distinct id actually held, so the supply plan can free slots. */
const heldIds = (): number[] => {
	const ids: number[] = [];
	const widgets = bot.inventory.getAllWidgets() ?? [];
	for (const widget of widgets) {
		const id = widget.getItemId();
		if (id > 0 && !ids.includes(id)) ids.push(id);
	}
	ids.sort((a, b) => a - b);
	return ids;
};

/** Frozen at capture time so confirmed() can compare real deltas. */
export const snapshotInventory = (): Inventory => {
	const counts: Record<number, number> = {};
	const ids = heldIds();
	for (const id of trackedItems()) counts[id] = bot.inventory.getQuantityOfId(id);
	for (const id of ids) {
		if (counts[id] === undefined) counts[id] = bot.inventory.getQuantityOfId(id);
	}
	const free = bot.inventory.getEmptySlots();
	const level = client.getBoostedSkillLevel(net.runelite.api.Skill.FARMING);
	return {
		count: (itemId: number): number => counts[itemId] ?? 0,
		ids,
		free,
		level,
	};
};

export const startTravel = (patch: TreePatch): void => {
	bot.walking.webWalkStartWithConfig(
		visitPoint(patch),
		false, // eatFood
		true, // useStamina
		20, // runEnergyMin
		true, // useTransports
		true, // useTeleports
		true, // useEquipmentJewellery
		false, // useMinigameTeleports
		true, // avoidWilderness
		false, // usePoh
		true, // useCharterShips
	);
};

export const stopTravel = (): void => {
	if (bot.walking.isWebWalking()) bot.walking.webWalkCancel();
};

export const needsPatchObject = (plan: Plan): boolean =>
	plan.action === Action.RAKE ||
	plan.action === Action.CLEAR ||
	plan.action === Action.CHECK_HEALTH ||
	plan.action === Action.PRUNE ||
	plan.action === Action.HARVEST ||
	plan.action === Action.PLANT;

const OBJECT_OPTION: Record<string, string> = {
	RAKE: 'Rake',
	CLEAR: 'Clear',
	CHECK_HEALTH: 'Check-health',
	PRUNE: 'Prune',
};

const nearbyNpc = (id: number, patch: TreePatch): Npc | null => {
	const npcs = bot.npcs.getWithIds([id]) ?? [];
	const centre = visitPoint(patch);
	let best: Npc | null = null;
	let bestDistance = 33;
	for (const npc of npcs) {
		const location = npc.getWorldLocation() as WorldPoint | null;
		if (location === null) continue;
		if (!includes(patch, location.getX(), location.getY(), location.getPlane())) continue;
		const distance = location.distanceTo(centre);
		if (distance < bestDistance) {
			bestDistance = distance;
			best = npc;
		}
	}
	return best;
};

/** Returns whether the click was issued, never whether it worked. */
export const execute = (patch: TreePatch, plan: Plan, object: TileObject | null): boolean => {
	if (plan.action === Action.DROP_WEEDS) {
		bot.inventory.interactWithIds([ITEM.WEEDS], ['Drop']);
		return true;
	}
	if (plan.action === Action.DROP_POTS) {
		bot.inventory.interactWithIds([ITEM.EMPTY_POT], ['Drop']);
		return true;
	}

	if (plan.action === Action.NOTE_FRUIT) {
		const leprechaun = nearbyNpc(patch.leprechaun, patch);
		if (leprechaun === null) return false;
		bot.inventory.itemOnNpcWithIds(plan.item, leprechaun);
		return true;
	}

	if (plan.action === Action.PAY || plan.action === Action.REMOVE_TREE) {
		const npc = nearbyNpc(patch.gardener, patch);
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
		const species = fruitByProduce(plan.item);
		if (species === null) return false;
		bot.objects.interactSuppliedObject(object, species.pickAction);
		return true;
	}

	const option = OBJECT_OPTION[plan.action];
	if (option === undefined) return false;
	bot.objects.interactSuppliedObject(object, option);
	return true;
};
