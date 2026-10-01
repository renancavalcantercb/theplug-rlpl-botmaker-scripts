/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument */
import { GameWrapper } from '../../game.js';
import { QuestHelper } from '../quest-helper.js';
import { QuestDefinition, QuestStep } from '../quest-types.js';

const VARP_SHEEP_SHEARER = 179;
const ITEM_SHEARS = 1735;
const ITEM_WOOL = 1737;
const ITEM_BALL_OF_WOOL = 1759;

const POINT_FRED = new net.runelite.api.coords.WorldPoint(3189, 3273, 0);
const POINT_SHEEP_PEN = new net.runelite.api.coords.WorldPoint(3202, 3267, 0);
const POINT_SPINNING_WHEEL = new net.runelite.api.coords.WorldPoint(3209, 3213, 1);

export const SheepShearerQuest: QuestDefinition = {
	key: 'SheepShearer',
	name: 'Sheep Shearer',
	varpId: VARP_SHEEP_SHEARER,
	completedValue: 21,
	questPoints: 1,
	requiredItems: [
		{ id: ITEM_BALL_OF_WOOL, name: 'Ball of wool', quantity: 20 },
	],

	isCompleted(game: GameWrapper): boolean {
		return QuestHelper.isVarpAtLeast(VARP_SHEEP_SHEARER, 21);
	},

	getSteps(): QuestStep[] {
		return [
			{
				description: 'Start Sheep Shearer quest with Fred the Farmer',
				isCompleted: (game: GameWrapper) => {
					return QuestHelper.isVarpAtLeast(VARP_SHEEP_SHEARER, 1);
				},
				execute: (game: GameWrapper) => {
					game.log('Talking to Fred the Farmer to start Sheep Shearer...');
					return QuestHelper.talkToNpc(game, 'Fred the Farmer', POINT_FRED);
				},
			},
			{
				description: 'Obtain 20 Balls of wool',
				isCompleted: (game: GameWrapper) => {
					return QuestHelper.hasItem(game, ITEM_BALL_OF_WOOL, 20);
				},
				execute: (game: GameWrapper) => {
					// 1. Bank check
					if (QuestHelper.hasBankItem(game, ITEM_BALL_OF_WOOL, 20)) {
						return QuestHelper.withdrawOrPrepare(game, [{ id: ITEM_BALL_OF_WOOL, quantity: 20 }]);
					}

					// 2. If we already have 20 raw wool, spin it at Lumbridge Castle
					if (QuestHelper.hasItem(game, ITEM_WOOL, 20)) {
						game.log('Spinning wool at Lumbridge Castle spinning wheel...');
						if (!QuestHelper.isNear(POINT_SPINNING_WHEEL, 5)) {
							QuestHelper.walkTo(game, POINT_SPINNING_WHEEL);
							return false;
						}
						// Use wool on spinning wheel or interact with spinning wheel
						return QuestHelper.interactObject(game, 'Spinning wheel', 'Spin', POINT_SPINNING_WHEEL);
					}

					// 3. Fresh gathering: Shear sheep in pen
					if (!QuestHelper.hasItem(game, ITEM_SHEARS)) {
						game.log('Buying or taking Shears...');
						return QuestHelper.lootItem(game, 'Shears', POINT_FRED);
					}

					game.log(`Shearing sheep (${game.getInventoryQuantity(ITEM_WOOL)}/20 wool)...`);
					if (!QuestHelper.isNear(POINT_SHEEP_PEN, 8)) {
						QuestHelper.walkTo(game, POINT_SHEEP_PEN);
						return false;
					}

					const sheep = bot.npcs.getWithNames(['Sheep']);
					if (sheep && sheep.length > 0) {
						bot.npcs.interactSupplied(sheep[0], 'Shear');
						return true;
					}
					return false;
				},
			},
			{
				description: 'Deliver 20 Balls of wool to Fred the Farmer',
				isCompleted: (game: GameWrapper) => {
					return QuestHelper.isVarpAtLeast(VARP_SHEEP_SHEARER, 21);
				},
				execute: (game: GameWrapper) => {
					game.log('Delivering balls of wool to Fred...');
					return QuestHelper.talkToNpc(game, 'Fred the Farmer', POINT_FRED);
				},
			},
		];
	},
};
