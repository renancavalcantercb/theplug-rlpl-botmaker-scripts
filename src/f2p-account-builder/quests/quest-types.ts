import { GameWrapper } from '../game.js';

export interface QuestItemRequirement {
	readonly id: number;
	readonly name: string;
	readonly quantity: number;
	readonly gather?: (game: GameWrapper) => boolean;
}

export interface QuestStep {
	readonly description: string;
	readonly isCompleted: (game: GameWrapper) => boolean;
	readonly execute: (game: GameWrapper) => boolean;
}

export interface QuestDefinition {
	readonly key: string;
	readonly name: string;
	readonly varpId: number;
	readonly completedValue: number;
	readonly questPoints: number;
	readonly requiredItems: QuestItemRequirement[];
	isCompleted(game: GameWrapper): boolean;
	getSteps(): QuestStep[];
}
