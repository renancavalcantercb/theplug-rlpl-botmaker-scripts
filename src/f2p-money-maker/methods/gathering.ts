/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument */
import { GameWrapper } from '../game.js';
import { DelayManager, SessionStats } from '../state.js';
import { MoneyMakerSettings, MoneyMethodId } from '../types.js';
import { MoneyMethodHandler } from './base-method.js';

const AXE_IDS = [1359, 1357, 1355, 1361, 1353, 1349, 1351]; // Rune down to Bronze
const PICKAXE_IDS = [1275, 1271, 1273, 1269, 1267, 1265]; // Rune down to Bronze

const OAK_LOGS_ID = 1521;
const YEW_LOGS_ID = 1515;
const CLAY_ID = 434;
const IRON_ORE_ID = 440;

interface GatheringTarget {
	resourceId: number;
	resourceName: string;
	objectNames: string[];
	objectIds?: number[];
	depletedIds?: number[];
	objectAction: string;
	estimatedGp: number;
	toolIds: number[];
	location: net.runelite.api.coords.WorldPoint;
	bankLocation: net.runelite.api.coords.WorldPoint;
}

type GatheringActionState =
	| 'READY'
	| 'WAITING_TO_START'
	| 'GATHERING'
	| 'WAITING_FOR_IDLE';

export function createGatheringHandler(
	game: GameWrapper,
	settings: MoneyMakerSettings,
	delayManager: DelayManager,
	stats: SessionStats,
	methodId: MoneyMethodId,
): MoneyMethodHandler {
	let collectedCount = 0;
	let currentTargetTile: net.runelite.api.coords.WorldPoint | null = null;
	let exhausted = false;
	let arrivalSettled = false;
	let bankArrivalSettled = false;
	let actionState: GatheringActionState = 'READY';
	let actionStartTick = 0;
	let lastActivityTick = 0;
	let resourceCountBeforeAction = 0;

	const getTargetConfig = (): GatheringTarget => {
		switch (methodId) {
			case 'WC_YEWS': {
				return {
					resourceId: YEW_LOGS_ID,
					resourceName: 'Yew logs',
					objectNames: ['Yew', 'Yew tree'],
					objectAction: 'Chop down',
					estimatedGp: 250,
					toolIds: AXE_IDS,
					location:
						settings.specific.wcYewLocation === 'Edgeville'
							? new net.runelite.api.coords.WorldPoint(3086, 3478, 0)
							: new net.runelite.api.coords.WorldPoint(3228, 3474, 0),
					bankLocation:
						settings.specific.wcYewLocation === 'Edgeville'
							? new net.runelite.api.coords.WorldPoint(3094, 3492, 0)
							: new net.runelite.api.coords.WorldPoint(3253, 3420, 0),
				};
			}
			case 'WC_OAKS': {
				return {
					resourceId: OAK_LOGS_ID,
					resourceName: 'Oak logs',
					objectNames: ['Oak', 'Oak tree'],
					objectAction: 'Chop down',
					estimatedGp: 50,
					toolIds: AXE_IDS,
					location:
						settings.specific.wcOakLocation === 'Lumbridge'
							? new net.runelite.api.coords.WorldPoint(3204, 3243, 0)
							: new net.runelite.api.coords.WorldPoint(3106, 3244, 0),
					bankLocation:
						settings.specific.wcOakLocation === 'Lumbridge'
							? new net.runelite.api.coords.WorldPoint(3208, 3220, 2)
							: new net.runelite.api.coords.WorldPoint(3092, 3243, 0),
				};
			}
			case 'MINE_IRON': {
				return {
					resourceId: IRON_ORE_ID,
					resourceName: 'Iron ore',
					objectNames: ['Iron rocks', 'Rocks'],
					objectAction: 'Mine',
					estimatedGp: 120,
					toolIds: PICKAXE_IDS,
					location:
						settings.specific.mineLocation === 'Al-Kharid'
							? new net.runelite.api.coords.WorldPoint(3298, 3313, 0)
							: new net.runelite.api.coords.WorldPoint(3181, 3366, 0),
					bankLocation:
						settings.specific.mineLocation === 'Al-Kharid'
							? new net.runelite.api.coords.WorldPoint(3269, 3167, 0)
							: new net.runelite.api.coords.WorldPoint(3185, 3436, 0),
				};
			}
			default: {
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
					bankLocation: new net.runelite.api.coords.WorldPoint(3185, 3436, 0),
				};
			}
		}
	};

	const target = getTargetConfig();

	const hasTool = (): boolean => {
		for (const id of target.toolIds) {
			if (game.getInventoryQuantity(id) > 0 || game.isEquipped(id)) return true;
		}
		return false;
	};

	const resetCurrentAction = (): void => {
		currentTargetTile = null;
		actionState = 'READY';
		actionStartTick = 0;
		lastActivityTick = 0;
		resourceCountBeforeAction = 0;
	};

	const travelToConfiguredBank = (message: string): boolean => {
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
			game.log(`Starting gathering: ${target.resourceName}...`);
		},

		tick: () => {
			// 1. Tool check
			if (!hasTool()) {
				resetCurrentAction();
				arrivalSettled = false;
				if (game.isBankOpen()) {
					for (const id of target.toolIds) {
						if (game.getBankQuantity(id) > 0) {
							game.log(`Withdrawing tool (ID ${id}) from bank...`);
							game.withdrawQuantity(id, 1);
							delayManager.setDelay(1);
							return;
						}
					}
					game.log(`No ${methodId.indexOf('WC_') === 0 ? 'axe' : 'pickaxe'} found in the bank.`);
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

			// 2. Full inventory -> Bank
			if (game.isInventoryFull()) {
				arrivalSettled = false;
				if (game.isBankOpen()) {
					const count = game.getInventoryQuantity(target.resourceId);
					if (count > 0) {
						stats.addItem(count);
						stats.addGp(count * target.estimatedGp);
						collectedCount += count;
						game.log(`Depositing ${count} ${target.resourceName}...`);
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

			// 3. Close bank if open
			if (game.isBankOpen()) {
				arrivalSettled = false;
				bankArrivalSettled = false;
				game.closeBank();
				delayManager.setDelay(1);
				return;
			}

			// 4. If far from gathering area, walk there
			if (!game.isNear(target.location, 12)) {
				arrivalSettled = false;
				if (!game.isWebWalking()) {
					game.log(`Walking to ${target.resourceName} area...`);
					game.webWalkTo(target.location);
				}
				delayManager.setDelay(2);
				return;
			}

			// Stop the route completely and wait for the player to settle before
			// interacting. Being inside the radius does not mean the walker has
			// finished its final steps yet.
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
				game.log(`Arrived at ${target.resourceName} area. Route stopped; starting gathering.`);
				delayManager.setDelay(1);
				return;
			}

			// 5. If target rock depleted (turns into 11390 or 11391), immediately switch to next rock
			if (currentTargetTile && target.depletedIds && target.depletedIds.length > 0) {
				const depletedObjects = bot.objects.getTileObjectsWithIds(target.depletedIds) ?? [];
				const isDepleted = depletedObjects.some((d: any) => {
					const loc = d.getWorldLocation?.();
					return (
						loc &&
						loc.getX() === currentTargetTile?.getX() &&
						loc.getY() === currentTargetTile?.getY()
					);
				});
				if (isDepleted) {
					game.log('Target rock depleted. Waiting for the mining action to finish...');
					currentTargetTile = null;
					actionState = 'WAITING_FOR_IDLE';
					delayManager.setDelay(1);
					return;
				}
			}

			// Explicit action lifecycle: click once, observe movement/animation,
			// confirm the inventory delta, and wait for stable idle before retrying.
			if (actionState !== 'READY') {
				const player = client.getLocalPlayer();
				if (!player) return;
				const currentTick = client.getTickCount();
				const isAnimating = player.getAnimation() !== -1;
				const isMoving = game.isMoving();
				const resourceCount = game.getInventoryQuantity(target.resourceId);
				const receivedResource = resourceCount > resourceCountBeforeAction;

				if (actionState === 'WAITING_TO_START') {
					if (receivedResource) {
						actionState = 'WAITING_FOR_IDLE';
					} else if (isMoving || isAnimating) {
						actionState = 'GATHERING';
						lastActivityTick = currentTick;
					} else if (currentTick - actionStartTick >= 10) {
						// The click was not accepted by the client.
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
					} else if (
						currentTick - lastActivityTick > 3 &&
						game.isIdleFor(2)
					) {
						// Movement/animation ended without producing the resource.
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

			// 6. Find and interact with resource object
			let nearbyObjects: any[] = [];
			nearbyObjects = target.objectIds && target.objectIds.length > 0 ? bot.objects.getTileObjectsWithIds(target.objectIds) ?? [] : bot.objects.getTileObjectsWithNames(target.objectNames) ?? [];

			const playerLoc = client.getLocalPlayer()?.getWorldLocation();
			const validObjects = (nearbyObjects || []).filter((object: any) => {
				const loc = object.getWorldLocation?.();
				if (!loc) return false;
				// Constrain to gathering location radius
				if (loc.distanceTo(target.location) > 8) return false;

				// Verify object has the desired action if available
				const actions = object.getActions?.();
				if (actions && Array.isArray(actions)) {
					return actions.indexOf(target.objectAction) >= 0;
				}
				return true;
			});

			if (validObjects.length > 0) {
				if (playerLoc) {
					validObjects.sort((a: any, b: any) => {
						const distributionA = playerLoc.distanceTo(a.getWorldLocation?.() ?? playerLoc);
						const distributionB = playerLoc.distanceTo(b.getWorldLocation?.() ?? playerLoc);
						return distributionA - distributionB;
					});
				}
				const object = validObjects[0];
				currentTargetTile = (object.getWorldLocation?.() as net.runelite.api.coords.WorldPoint) ?? null;
				actionState = 'WAITING_TO_START';
				actionStartTick = client.getTickCount();
				lastActivityTick = actionStartTick;
				resourceCountBeforeAction = game.getInventoryQuantity(target.resourceId);
				bot.objects.interactSuppliedObject(object, target.objectAction);
				delayManager.setDelay(DelayManager.getReactionTicks(settings.general.playStyle, settings.general.noobMode));
			} else {
				// Wait for rock respawn
				resetCurrentAction();
				delayManager.setDelay(2);
			}
		},

		isSuppliesExhausted: () => exhausted,

		getStatus: () => `${target.resourceName}: ${collectedCount} gathered`,
	};
}
