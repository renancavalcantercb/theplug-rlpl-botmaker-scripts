/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument */
import { GameWrapper } from '../../game.js';
import { QuestHelper } from '../quest-helper.js';
import { QuestDefinition, QuestStep } from '../quest-types.js';

const VARP_ROMEO_AND_JULIET = 144;
const ITEM_CADAVA_BERRIES = 753;

const POINT_ROMEO = new net.runelite.api.coords.WorldPoint(3211, 3422, 0);
const POINT_JULIET = new net.runelite.api.coords.WorldPoint(3158, 3425, 1);
const POINT_FATHER_LAWRENCE = new net.runelite.api.coords.WorldPoint(3254, 3483, 0);
const POINT_APOTHECARY = new net.runelite.api.coords.WorldPoint(3195, 3404, 0);
const POINT_CADAVA_BUSH = new net.runelite.api.coords.WorldPoint(3270, 3371, 0);

export const RomeoAndJulietQuest: QuestDefinition = {
	key: 'RomeoAndJuliet',
	name: 'Romeo & Juliet',
	varpId: VARP_ROMEO_AND_JULIET,
	completedValue: 100,
	questPoints: 5,
	requiredItems: [
		{ id: ITEM_CADAVA_BERRIES, name: 'Cadava berries', quantity: 1 },
	],

	isCompleted(game: GameWrapper): boolean {
		return QuestHelper.isVarpAtLeast(VARP_ROMEO_AND_JULIET, 100);
	},

	getSteps(): QuestStep[] {
		return [
			{
				description: 'Talk to Romeo in Varrock Square to begin quest',
				isCompleted: (game: GameWrapper) => {
					return QuestHelper.isVarpAtLeast(VARP_ROMEO_AND_JULIET, 10);
				},
				execute: (game: GameWrapper) => {
					game.log('Talking to Romeo in Varrock Square...');
					return QuestHelper.talkToNpc(game, 'Romeo', POINT_ROMEO);
				},
			},
			{
				description: 'Talk to Juliet on the balcony of her house',
				isCompleted: (game: GameWrapper) => {
					return QuestHelper.isVarpAtLeast(VARP_ROMEO_AND_JULIET, 20);
				},
				execute: (game: GameWrapper) => {
					game.log('Talking to Juliet in west Varrock...');
					return QuestHelper.talkToNpc(game, 'Juliet', POINT_JULIET);
				},
			},
			{
				description: 'Return message to Romeo in Varrock Square',
				isCompleted: (game: GameWrapper) => {
					return QuestHelper.isVarpAtLeast(VARP_ROMEO_AND_JULIET, 30);
				},
				execute: (game: GameWrapper) => {
					game.log('Delivering Juliet message to Romeo...');
					return QuestHelper.talkToNpc(game, 'Romeo', POINT_ROMEO);
				},
			},
			{
				description: 'Talk to Father Lawrence in Varrock Church',
				isCompleted: (game: GameWrapper) => {
					return QuestHelper.isVarpAtLeast(VARP_ROMEO_AND_JULIET, 40);
				},
				execute: (game: GameWrapper) => {
					game.log('Talking to Father Lawrence at Varrock Church...');
					return QuestHelper.talkToNpc(game, 'Father Lawrence', POINT_FATHER_LAWRENCE);
				},
			},
			{
				description: 'Obtain Cadava berries & deliver to Apothecary',
				isCompleted: (game: GameWrapper) => {
					return QuestHelper.isVarpAtLeast(VARP_ROMEO_AND_JULIET, 50);
				},
				execute: (game: GameWrapper) => {
					// 1. Check if we have Cadava berries
					if (!QuestHelper.hasItem(game, ITEM_CADAVA_BERRIES)) {
						if (QuestHelper.hasBankItem(game, ITEM_CADAVA_BERRIES)) {
							return QuestHelper.withdrawOrPrepare(game, [{ id: ITEM_CADAVA_BERRIES, quantity: 1 }]);
						}
						game.log('Picking Cadava berries south of Varrock...');
						return QuestHelper.interactObject(game, 'Cadava bush', 'Pick-from', POINT_CADAVA_BUSH);
					}

					game.log('Delivering Cadava berries to Apothecary for potion...');
					return QuestHelper.talkToNpc(game, 'Apothecary', POINT_APOTHECARY);
				},
			},
			{
				description: 'Deliver Cadava potion to Juliet',
				isCompleted: (game: GameWrapper) => {
					return QuestHelper.isVarpAtLeast(VARP_ROMEO_AND_JULIET, 60);
				},
				execute: (game: GameWrapper) => {
					game.log('Delivering potion to Juliet...');
					return QuestHelper.talkToNpc(game, 'Juliet', POINT_JULIET);
				},
			},
			{
				description: 'Talk to Romeo to conclude the tragedy and receive 5 QP',
				isCompleted: (game: GameWrapper) => {
					return QuestHelper.isVarpAtLeast(VARP_ROMEO_AND_JULIET, 100);
				},
				execute: (game: GameWrapper) => {
					game.log('Talking to Romeo to finish quest...');
					return QuestHelper.talkToNpc(game, 'Romeo', POINT_ROMEO);
				},
			},
		];
	},
};
