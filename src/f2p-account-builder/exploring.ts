/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument */
import { GameWrapper } from './game.js';
import { DelayManager } from './state.js';

export interface ExplorationWaypoint {
	name: string;
	point: net.runelite.api.coords.WorldPoint;
	description: string;
}

export const EXPLORATION_WAYPOINTS: ExplorationWaypoint[] = [
	{
		name: 'Lumbridge Church',
		point: new net.runelite.api.coords.WorldPoint(3244, 3208, 0),
		description: 'Exploring church grounds and unlocking music tracks',
	},
	{
		name: 'Lumbridge River Bank',
		point: new net.runelite.api.coords.WorldPoint(3240, 3226, 0),
		description: 'Wandering casually near River Lum',
	},
	{
		name: 'Lumbridge Graveyard',
		point: new net.runelite.api.coords.WorldPoint(3246, 3193, 0),
		description: 'Checking out the historic cemetery',
	},
	{
		name: "Bob's Brilliant Axes",
		point: new net.runelite.api.coords.WorldPoint(3230, 3203, 0),
		description: 'Browsing axes and smithing equipment',
	},
	{
		name: 'Lumbridge General Store',
		point: new net.runelite.api.coords.WorldPoint(3212, 3246, 0),
		description: 'Checking out the general store goods',
	},
	{
		name: 'Draynor Crossroads',
		point: new net.runelite.api.coords.WorldPoint(3185, 3228, 0),
		description: 'Walking the scenic highway toward Draynor Village',
	},
	{
		name: 'Fred the Farmer Fields',
		point: new net.runelite.api.coords.WorldPoint(3189, 3273, 0),
		description: 'Strolling past the northern sheep pasture',
	},
];

export class ExplorationHandler {
	private isExploring = false;
	private currentWaypoint: ExplorationWaypoint | null = null;
	private exploreWaitTicks = 0;
	private lastExplorationTime = 0;

	/**
	 * Should we trigger an exploration routine?
	 * In Noob Mode on new accounts (< 75 Total Level), exploration happens more frequently (10-14 mins).
	 * On mature accounts, happens every ~20-30 mins between task switches.
	 */
	public shouldExplore(
		cameraMovementEnabled: boolean,
		noobMode = false,
		totalLevel = 100,
	): boolean {
		if (!cameraMovementEnabled) return false;
		const now = Date.now();
		const intervalMs = noobMode && totalLevel < 75 ? 10 * 60 * 1000 : 20 * 60 * 1000;
		return now - this.lastExplorationTime > intervalMs;
	}

	public startExploration(game: GameWrapper): void {
		const randomIndex = Math.floor(Math.random() * EXPLORATION_WAYPOINTS.length);
		this.currentWaypoint = EXPLORATION_WAYPOINTS[randomIndex];
		this.isExploring = true;
		this.exploreWaitTicks = 0;
		this.lastExplorationTime = Date.now();

		game.log(`[Exploring] Starting casual wander: ${this.currentWaypoint.name} (${this.currentWaypoint.description}).`);
	}

	public tick(game: GameWrapper, delayManager: DelayManager, onDone: () => void): boolean {
		if (!this.isExploring || !this.currentWaypoint) {
			return false;
		}

		const playerLoc = client.getLocalPlayer()?.getWorldLocation();
		if (!playerLoc) {
			this.finish(onDone);
			return true;
		}

		// Check if we arrived near waypoint
		if (playerLoc.distanceTo(this.currentWaypoint.point) <= 4) {
			if (game.isWebWalking()) {
				game.stopWebWalk();
			}

			// Linger a bit like a real human player looking around
			if (++this.exploreWaitTicks >= 4) {
				game.log(`[Exploring] Reached ${this.currentWaypoint.name}. Exploration complete.`);
				this.finish(onDone);
				delayManager.setDelay(2);
				return true;
			}

			delayManager.setDelay(2);
			return true;
		}

		// Walk toward waypoint
		if (!game.isWebWalking()) {
			game.webWalkTo(this.currentWaypoint.point);
		}
		delayManager.setDelay(3);
		return true;
	}

	private finish(onDone: () => void): void {
		this.isExploring = false;
		this.currentWaypoint = null;
		this.exploreWaitTicks = 0;
		onDone();
	}

	public isRunning(): boolean {
		return this.isExploring;
	}
}
