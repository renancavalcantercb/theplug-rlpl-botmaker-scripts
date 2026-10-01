export type PocMode = 'INSPECT_ONLY' | 'PERFORM_STEP';

export interface QuestHelperPocConfig {
	mode: PocMode;
	autoWalk: boolean;
	autoDialogue: boolean;
	actionDelayTicks: number;
}

export const DEFAULT_CONFIG: QuestHelperPocConfig = {
	mode: 'INSPECT_ONLY',
	autoWalk: true,
	autoDialogue: true,
	actionDelayTicks: 3,
};
