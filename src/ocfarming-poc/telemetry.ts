/**
 * The actual point of this PoC: measuring the rlpl walker against the
 * behaviour the Java plugin had to work around.
 *
 * FarmingApproachProgress is ported here as a DETECTOR, never as a
 * correction. If the probe fires, the walker bounces on the last tiles and
 * the port would need the same ~190 lines of approach code the Microbot
 * version carries (FarmingApproachProgress + FarmingPatchTarget + approach()).
 * If it never fires, that whole subsystem can be deleted instead of ported.
 */

export interface ActionReport {
	readonly action: string;
	readonly reason: string;
	attempts: number;
	confirmTicks: number;
	confirmed: boolean;
}

export interface VisitReport {
	readonly patch: string;
	travelTicks: number;
	/** How many times the web walk had to be re-issued to keep moving. */
	walkRestarts: number;
	arrivalDistance: number;
	objectDistance: number;
	objectLoaded: boolean;
	bounced: boolean;
	settleTicks: number;
	observed: string;
	outcome: string;
	readonly actions: ActionReport[];
}

const visits: VisitReport[] = [];
let current: VisitReport | null = null;
let printed = false;

export const log = (message: string): void => {
	bot.printLogMessage('[oc-poc] ' + message);
	bot.printGameMessage('[oc-poc] ' + message);
};

export const startVisit = (patch: string): VisitReport => {
	current = {
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
		actions: [],
	};
	visits.push(current);
	log('visiting ' + patch);
	return current;
};

export const visit = (): VisitReport | null => current;

export const recordAction = (action: string, reason: string): ActionReport => {
	const report: ActionReport = { action, reason, attempts: 0, confirmTicks: 0, confirmed: false };
	if (current !== null) current.actions.push(report);
	return report;
};

export const finishVisit = (outcome: string): void => {
	if (current === null) return;
	current.outcome = outcome;
	log(current.patch + ' -> ' + outcome);
	current = null;
};

/** Port of FarmingApproachProgress, in ticks instead of seconds. */
export interface ApproachProbe {
	observe: (position: net.runelite.api.coords.WorldPoint | null, tick: number) => void;
	bounced: () => boolean;
}

export const createApproachProbe = (
	destination: net.runelite.api.coords.WorldPoint,
	initial: net.runelite.api.coords.WorldPoint | null,
	tick: number,
): ApproachProbe => {
	let best = initial === null ? 9999 : initial.distanceTo(destination);
	let lastProgress = tick;
	let bounced = false;
	return {
		observe: (position, now) => {
			if (position === null) return;
			const distance = position.distanceTo(destination);
			if (distance < best) {
				best = distance;
				lastProgress = now;
			}
			// Only the final few tiles count: long routes legitimately detour.
			if (distance <= 3 && now - lastProgress >= 10) bounced = true;
		},
		bounced: () => bounced,
	};
};

const line = (report: VisitReport): string => {
	const actions = report.actions
		.map((a) => a.action + (a.confirmed ? '=ok/' + a.confirmTicks + 't' : '=FAIL') + 'x' + a.attempts)
		.join(' ');
	return (
		report.patch +
		' | travel ' +
		report.travelTicks +
		't restarts ' +
		report.walkRestarts +
		' | arrive d=' +
		report.arrivalDistance +
		' obj d=' +
		report.objectDistance +
		(report.objectLoaded ? '' : ' OBJ-MISSING') +
		(report.bounced ? ' BOUNCE' : '') +
		' | settle ' +
		report.settleTicks +
		't | ' +
		report.observed +
		' | ' +
		report.outcome +
		(actions === '' ? '' : ' | ' + actions)
	);
};

export const summary = (): void => {
	// Both the end of the queue and onEnd ask for this; print it once.
	if (printed) return;
	printed = true;
	log('=== walker report ===');
	for (const report of visits) log(line(report));
	const bounced = visits.filter((r) => r.bounced).length;
	const restarts = visits.reduce((total, r) => total + r.walkRestarts, 0);
	const missing = visits.filter((r) => !r.objectLoaded).length;
	const failed = visits.reduce(
		(total, r) => total + r.actions.filter((a) => !a.confirmed).length,
		0,
	);
	log(
		'patches ' +
			visits.length +
			' | bounced ' +
			bounced +
			' | walk restarts ' +
			restarts +
			' | object missing on arrival ' +
			missing +
			' | unconfirmed actions ' +
			failed,
	);
	log('bounced/restarts near zero => the approach layer can be deleted, not ported.');
};
