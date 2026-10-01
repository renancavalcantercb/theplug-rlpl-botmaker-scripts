import { QuestDefinition } from './quest-types.js';
import { CooksAssistantQuest } from './impl/cooks-assistant.js';
import { SheepShearerQuest } from './impl/sheep-shearer.js';
import { RomeoAndJulietQuest } from './impl/romeo-and-juliet.js';

const QUEST_REGISTRY: Record<string, QuestDefinition> = {
	"Cook's Assistant": CooksAssistantQuest,
	'Sheep Shearer': SheepShearerQuest,
	'Romeo & Juliet': RomeoAndJulietQuest,
};

export const getQuestDefinition = (name: string): QuestDefinition | undefined => {
	return QUEST_REGISTRY[name];
};

export const getAllRegisteredQuests = (): QuestDefinition[] => {
	return Object.values(QUEST_REGISTRY);
};
