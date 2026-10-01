/**
 * Persistence — the bmCache half of FarmingTracker and
 * FarmingProtectionTracker.
 *
 * Namespaced by RSN. bmCache is per script, not per character, so without
 * this two accounts would overwrite each other's growth estimates and both
 * would get the wrong answer about what is due.
 */

import { decode, encode, type Observation, State } from './observation.js';
import type { TreePatch } from './patches.js';

const profile = (): string => {
	const player = client.getLocalPlayer() as net.runelite.api.Player | null;
	if (player === null) return 'unknown';
	const name = player.getName();
	// String(): bmCache keys must be JS strings, and getName hands back a Java one.
	return name === null ? 'unknown' : String(name);
};

const observationKey = (patch: TreePatch): string => 'ocPoc.obs.' + profile() + '.' + patch.key;
const protectionKey = (patch: TreePatch): string => 'ocPoc.prot.' + profile() + '.' + patch.key;

export const remember = (patch: TreePatch, observation: Observation): void => {
	bot.bmCache.saveString(observationKey(patch), encode(observation));
};

export const recall = (patch: TreePatch, now: number): Observation | null => {
	// String(): a Rhino-wrapped java.lang.String has no JS split().
	const stored = String(bot.bmCache.getString(observationKey(patch), ''));
	return decode(stored, now);
};

/**
 * Port of FarmingProtectionTracker's encode/restore. Protection is recorded
 * against the crop that was growing when the gardener confirmed, so a replant
 * of a different species — or a patch that went back to weeds — drops it.
 */
export const rememberProtection = (patch: TreePatch, observation: Observation): void => {
	if (observation.state !== State.GROWING || observation.crop === null) return;
	bot.bmCache.saveString(protectionKey(patch), '1:' + observation.crop);
};

export const clearProtection = (patch: TreePatch): void => {
	bot.bmCache.saveString(protectionKey(patch), '');
};

export const isProtected = (patch: TreePatch, observation: Observation | null): boolean => {
	if (observation === null || observation.state !== State.GROWING || observation.crop === null) {
		return false;
	}
	const stored = String(bot.bmCache.getString(protectionKey(patch), ''));
	return stored === '1:' + observation.crop;
};

export const nowSeconds = (): number => Math.floor(Date.now() / 1000);
