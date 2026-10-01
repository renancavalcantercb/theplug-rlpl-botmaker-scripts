/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument */
import { GameWrapper } from '../game.js';
import { DelayManager, TaskHandler } from '../state.js';
import { AccountBuilderSettings } from '../types.js';
import { getQuestDefinition } from './registry.js';
import { QuestDefinition } from './quest-types.js';

export function createQuestTaskHandler(
	game: GameWrapper,
	settings: AccountBuilderSettings,
	delayManager: DelayManager,
): TaskHandler {
	let questIndex = 0;
	let activeQuest: QuestDefinition | null = null;

	const findNextIncompleteQuest = (): QuestDefinition | null => {
		const selected = settings.quests.selectedQuests;
		while (questIndex < selected.length) {
			const name = selected[questIndex];
			const def = getQuestDefinition(name);
			if (!def) {
				game.log(`Quest [${name}] not yet registered. Skipping to next.`);
				questIndex++;
				continue;
			}
			if (def.isCompleted(game)) {
				questIndex++;
				continue;
			}
			return def;
		}
		return null;
	};

	return {
		category: 'Quests',

		onStart: () => {
			questIndex = 0;
			activeQuest = null;
			const currentQp = game.getQuestPoints();
			game.log(`Initialized Quests task (Current QP: ${currentQp} / Target: ${settings.quests.stopOnQuestPoints || 'All selected'}).`);
		},

		tick: () => {
			// If dialogue is currently open on screen, handle it and wait for it to close
			if (game.isDialogueOpen()) {
				game.handleDialogue();
				delayManager.setDelay(2);
				return;
			}

			if (!activeQuest || activeQuest.isCompleted(game)) {
				if (activeQuest && activeQuest.isCompleted(game)) {
					game.gameMessage(`🎉 Completed quest: ${activeQuest.name} (+${activeQuest.questPoints} QP)!`);
					game.log(`Finished ${activeQuest.name}. Total QP now: ${game.getQuestPoints()}.`);
					activeQuest = null;
					questIndex++;
				}
				activeQuest = findNextIncompleteQuest();
			}

			if (!activeQuest) {
				return;
			}

			// Update visual stats
			game.setCounter('Quest QP', game.getQuestPoints());

			// Find current incomplete step
			const steps = activeQuest.getSteps();
			for (let i = 0; i < steps.length; i++) {
				const step = steps[i];
				if (!step.isCompleted(game)) {
					game.log(`[${activeQuest.name}] Step ${i + 1}/${steps.length}: ${step.description}`);
					step.execute(game);
					delayManager.setDelay(DelayManager.getReactionTicks(settings.general.playStyle) + 1);
					return;
				}
			}
		},

		isComplete: () => {
			const targetQp = settings.quests.stopOnQuestPoints;
			if (targetQp > 0 && game.getQuestPoints() >= targetQp) {
				return true;
			}

			// Or all selected quests are done
			const selected = settings.quests.selectedQuests;
			if (selected.length === 0) return true;

			return selected.every((name) => {
				const def = getQuestDefinition(name);
				return def ? def.isCompleted(game) : true;
			});
		},

		getStatus: () => {
			const qp = game.getQuestPoints();
			const questName = activeQuest ? activeQuest.name : 'Done';
			return `Quests: ${questName} (QP: ${qp})`;
		},
	};
}
