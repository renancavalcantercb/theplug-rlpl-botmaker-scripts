/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument */
import { GameWrapper } from '../../game.js';
import { QuestHelper } from '../quest-helper.js';
import { QuestDefinition, QuestStep } from '../quest-types.js';

const VARP_COOKS_ASSISTANT = 29;
const ITEM_EGG = 1944;
const ITEM_BUCKET_OF_MILK = 1927;
const ITEM_POT_OF_FLOUR = 1933;
const ITEM_EMPTY_POT = 1931;
const ITEM_EMPTY_BUCKET = 1925;
const ITEM_GRAIN = 1947;

const POINT_COOK = new net.runelite.api.coords.WorldPoint(3207, 3214, 0);
const POINT_POT_KITCHEN = new net.runelite.api.coords.WorldPoint(3208, 3214, 0);
const POINT_BUCKET_FARM = new net.runelite.api.coords.WorldPoint(3225, 3294, 0);
const POINT_EGG = new net.runelite.api.coords.WorldPoint(3230, 3299, 0);
const POINT_DAIRY_COW = new net.runelite.api.coords.WorldPoint(3254, 3270, 0);
const POINT_WHEAT = new net.runelite.api.coords.WorldPoint(3161, 3295, 0);
const POINT_WINDMILL_GROUND = new net.runelite.api.coords.WorldPoint(3166, 3307, 0);

let checkedBankForCook = false;

export const CooksAssistantQuest: QuestDefinition = {
	key: 'CooksAssistant',
	name: "Cook's Assistant",
	varpId: VARP_COOKS_ASSISTANT,
	completedValue: 2,
	questPoints: 1,
	requiredItems: [
		{ id: ITEM_EGG, name: 'Egg', quantity: 1 },
		{ id: ITEM_BUCKET_OF_MILK, name: 'Bucket of milk', quantity: 1 },
		{ id: ITEM_POT_OF_FLOUR, name: 'Pot of flour', quantity: 1 },
	],

	isCompleted(game: GameWrapper): boolean {
		return QuestHelper.isVarpAtLeast(VARP_COOKS_ASSISTANT, 2);
	},

	getSteps(): QuestStep[] {
		return [
			{
				description: 'Talk to Cook in Lumbridge Castle to start quest',
				isCompleted: (game: GameWrapper) => {
					return QuestHelper.isVarpAtLeast(VARP_COOKS_ASSISTANT, 1);
				},
				execute: (game: GameWrapper) => {
					checkedBankForCook = false;
					game.log("Starting Cook's Assistant with Cook in kitchen...");
					return QuestHelper.talkToNpc(game, 'Cook', POINT_COOK);
				},
			},
			{
				description: 'Prepare or gather quest supplies',
				isCompleted: (game: GameWrapper) => {
					return (
						QuestHelper.hasItem(game, ITEM_EGG, 1, 'Egg') &&
						QuestHelper.hasItem(game, ITEM_BUCKET_OF_MILK, 1, 'Bucket of milk') &&
						QuestHelper.hasItem(game, ITEM_POT_OF_FLOUR, 1, 'Pot of flour')
					);
				},
				execute: (game: GameWrapper) => {
					const hasEgg = QuestHelper.hasItem(game, ITEM_EGG, 1, 'Egg');
					const hasMilk = QuestHelper.hasItem(game, ITEM_BUCKET_OF_MILK, 1, 'Bucket of milk');
					const hasFlour = QuestHelper.hasItem(game, ITEM_POT_OF_FLOUR, 1, 'Pot of flour');

					// If player already has all 3 required supplies, skip any banking or gathering!
					if (hasEgg && hasMilk && hasFlour) {
						game.log("Already have all 3 quest supplies (Egg, Milk, Flour)! Proceeding to deliver to Cook.");
						return true;
					}

					// 1. Check the bank first for any missing supplies!
					if (!checkedBankForCook) {
						if (!game.isBankOpen()) {
							game.log('Opening bank to check for quest supplies (Egg, Milk, Flour)...');
							game.openBank();
							return false;
						}

						// Bank is open: cancel walking and check items
						game.stopWebWalk();
						game.log('Bank is open. Checking contents for quest supplies...');

						// Deposit only junk/unneeded items, preserving existing quest items!
						const keepItems = [
							ITEM_EGG,
							ITEM_BUCKET_OF_MILK,
							ITEM_POT_OF_FLOUR,
							ITEM_EMPTY_BUCKET,
							ITEM_EMPTY_POT,
							ITEM_GRAIN,
						];
						if (game.getEmptySlots() < 5) {
							game.log('Depositing non-quest items to make room for supplies...');
							game.depositAllExcept(keepItems);
						}

						if (!hasEgg && (game.getBankQuantity(ITEM_EGG) > 0 || bot.bank.getQuantityOfName('Egg') > 0)) {
							game.log('Withdrawing Egg from bank...');
							if (game.getBankQuantity(ITEM_EGG) > 0) game.withdrawQuantity(ITEM_EGG, 1);
							else bot.bank.withdrawWithName('Egg');
						}

						if (!hasMilk && (game.getBankQuantity(ITEM_BUCKET_OF_MILK) > 0 || bot.bank.getQuantityOfName('Bucket of milk') > 0)) {
							game.log('Withdrawing Bucket of milk from bank...');
							if (game.getBankQuantity(ITEM_BUCKET_OF_MILK) > 0) game.withdrawQuantity(ITEM_BUCKET_OF_MILK, 1);
							else bot.bank.withdrawWithName('Bucket of milk');
						}

						if (!hasFlour && (game.getBankQuantity(ITEM_POT_OF_FLOUR) > 0 || bot.bank.getQuantityOfName('Pot of flour') > 0)) {
							game.log('Withdrawing Pot of flour from bank...');
							if (game.getBankQuantity(ITEM_POT_OF_FLOUR) > 0) game.withdrawQuantity(ITEM_POT_OF_FLOUR, 1);
							else bot.bank.withdrawWithName('Pot of flour');
						}

						// Also check for empty containers in bank if we still need to gather:
						if (!hasFlour && (game.getBankQuantity(ITEM_EMPTY_POT) > 0 || bot.bank.getQuantityOfName('Pot') > 0)) {
							game.log('Withdrawing empty Pot from bank...');
							if (game.getBankQuantity(ITEM_EMPTY_POT) > 0) game.withdrawQuantity(ITEM_EMPTY_POT, 1);
							else bot.bank.withdrawWithName('Pot');
						}

						if (!hasMilk && (game.getBankQuantity(ITEM_EMPTY_BUCKET) > 0 || bot.bank.getQuantityOfName('Bucket') > 0)) {
							game.log('Withdrawing empty Bucket from bank...');
							if (game.getBankQuantity(ITEM_EMPTY_BUCKET) > 0) game.withdrawQuantity(ITEM_EMPTY_BUCKET, 1);
							else bot.bank.withdrawWithName('Bucket');
						}

						checkedBankForCook = true;
						game.closeBank();
						return true;
					}

					// 2. Fresh account gathering: only for supplies still missing after checking bank
					// Empty Pot
					if (
						!QuestHelper.hasItem(game, ITEM_POT_OF_FLOUR, 1, 'Pot of flour') &&
						!QuestHelper.hasItem(game, ITEM_EMPTY_POT, 1, 'Pot')
					) {
						game.log('Collecting empty Pot from kitchen table...');
						return QuestHelper.lootItem(game, 'Pot', POINT_POT_KITCHEN, 3);
					}

					// Egg (chicken coop north of Lumbridge)
					if (!QuestHelper.hasItem(game, ITEM_EGG, 1, 'Egg')) {
						game.log('Collecting Egg from chicken coop...');
						return QuestHelper.lootItem(game, 'Egg', POINT_EGG, 3);
					}

					// Milk (farmhouse south of hops patch, then dairy cow)
					if (!QuestHelper.hasItem(game, ITEM_BUCKET_OF_MILK, 1, 'Bucket of milk')) {
						if (!QuestHelper.hasItem(game, ITEM_EMPTY_BUCKET, 1, 'Bucket')) {
							game.log('Collecting empty Bucket from farmhouse south of hops patch...');
							return QuestHelper.lootItem(game, 'Bucket', POINT_BUCKET_FARM, 3);
						}
						game.log('Milking dairy cow...');
						return QuestHelper.interactObject(game, 'Dairy cow', 'Milk', POINT_DAIRY_COW);
					}

					// Flour (Wheat field + Windmill)
					if (!QuestHelper.hasItem(game, ITEM_POT_OF_FLOUR, 1, 'Pot of flour')) {
						if (!QuestHelper.hasItem(game, ITEM_GRAIN, 1, 'Grain')) {
							const playerPlane = client.getLocalPlayer()?.getWorldLocation()?.getPlane() ?? 0;
							if (playerPlane === 0) {
								const bins = bot.objects.getTileObjectsWithNames(['Flour bin']);
								if (bins && bins.length > 0 && QuestHelper.isNear(POINT_WINDMILL_GROUND, 10)) {
									game.log('Emptying flour bin...');
									bot.objects.interactSuppliedObject(bins[0], 'Empty');
									return true;
								}
							}
							game.log('Picking grain from wheat field...');
							return QuestHelper.interactObject(game, 'Wheat', 'Pick', POINT_WHEAT);
						}

						const playerPlane = client.getLocalPlayer()?.getWorldLocation()?.getPlane() ?? 0;
						if (playerPlane === 0) {
							game.log('Climbing windmill ground ladder...');
							return QuestHelper.interactObject(game, 'Ladder', 'Climb-up', POINT_WINDMILL_GROUND);
						} else if (playerPlane === 1) {
							game.log('Climbing windmill middle ladder...');
							return QuestHelper.interactObject(game, 'Ladder', 'Climb-up');
						} else if (playerPlane === 2) {
							const hoppers = bot.objects.getTileObjectsWithNames(['Hopper']);
							if (hoppers && hoppers.length > 0) {
								game.log('Putting grain into Hopper...');
								bot.inventory.itemOnObjectWithIds(ITEM_GRAIN, hoppers[0]);
							}
							game.log('Operating hopper controls...');
							bot.objects.interactObject('Hopper controls', 'Operate');
							return true;
						}
					}

					return true;
				},
			},
			{
				description: 'Talk to Cook in Lumbridge Castle to complete quest',
				isCompleted: (game: GameWrapper) => {
					return QuestHelper.isVarpAtLeast(VARP_COOKS_ASSISTANT, 2);
				},
				execute: (game: GameWrapper) => {
					game.log('Talking to Cook in Lumbridge kitchen to complete quest...');
					return QuestHelper.talkToNpc(game, 'Cook', POINT_COOK);
				},
			},
		];
	},
};
