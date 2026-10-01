# Bank Stander

Bank-based multi-skill automation for Herblore, Crafting, Fletching, and Farming. The source entry point is `index.ts`; the ready-to-use BotMaker bundle is `dist/bank-stander.js`.

## Usage

1. Start next to a bank with the required materials in your bank or inventory.
2. Run the script and select one or more skills in the execution queue.
3. Select the recipes to process in each enabled skill.
4. Choose Progressive mode, an optional target level, and a play style.
5. Click **Start Bank Stander**.

Selections are saved for the next run. The script deposits results and advances through the enabled skills when the current skill runs out of doable tasks. It does not travel to another bank or buy supplies.

## Progression

With **Progressive** enabled, the runner selects the highest-level configured recipe that the account can perform with the available bank supplies. Newly unlocked recipes are considered after each batch.

With Progressive disabled, configured recipes follow their catalog order. A target level from 1 to 99 stops the current skill after depositing the inventory; `0` runs until supplies are exhausted.

## Supported Skills

### Herblore

- Clean all 15 herbs from Guam to Torstol.
- Make unfinished potions with vials of water.
- Make 28 supported finished potion recipes.
- Optionally manage regular Amulets of chemistry.
- Counters: `Herblore clean`, `Herblore unfinished`, and `Herblore finished`.

### Crafting

- Cut opal, jade, red topaz, sapphire, emerald, ruby, diamond, and dragonstone.
- Requires a Chisel (`1755`).
- Processes up to 27 gems per batch.
- Counter: `Crafting gems`.

### Fletching

- Cut and string standard shortbows and longbows from normal through magic logs.
- Make arrow shafts, a redwood hiking staff, darts, bolts, headless arrows, and arrows.
- Broad ammunition still requires the account unlock.
- Counters: `Fletching cut`, `Fletching string`, `Fletching darts`, `Fletching bolts`, and `Fletching arrows`.

### Farming Seedlings

Farming supports 24 tree, fruit-tree, hardwood, special-tree, and sailing-tree seedlings from Oak at level 15 through Rosewood at level 92.

The runner uses two ordered stages:

1. Plant every selected and available seed into a Filled plant pot (`5354`) while keeping a Gardening trowel (`5325`) in the inventory.
2. After no selected seeds remain doable, water every produced seedling with charged standard watering cans (`5333` through `5340`).

The watering-can item ID changes as charges are consumed, so the runner resolves the currently charged can before each seedling. Watered seedlings are deposited and can grow into saplings while stored in the bank. Empty watering cans are not treated as charged cans.

Counters: `Farming plant` and `Farming water`.

## Reliability

Bank actions, inventory changes, recipe output, and Make-All interactions are confirmed before the state machine advances. Failed actions use bounded retries and terminate with a reason in the script log instead of clicking indefinitely. Logout pauses the runner; the script does not perform login.

The Farming, direct Fletching, and other item-on-item paths confirm production through output item IDs. In-client validation is still recommended after game or BotMaker updates.

## Development and Validation

```sh
npm run build
node node_modules/tsx/dist/cli.mjs src/bank-stander/verify.ts
node src/bank-stander/verify-menu.js
```

If `tsx` cannot run in the local environment, compile the verification files with the installed TypeScript compiler and execute the emitted `verify.js`. The local suite covers delayed bank operations, partial batches, failures, level targets, multi-skill chaining, recipe selection, Farming stage ordering, mandatory tools, and watering-can charge transitions.

Item IDs are checked against the RuneLite `ItemID` table included with `@deafwave/osrs-botmaker-types`.
