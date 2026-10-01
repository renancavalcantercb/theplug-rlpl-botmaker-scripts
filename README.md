# ThePlug RLPL BotMaker Scripts

A collection of modular **TypeScript** scripts for **ThePlug / Sox's BotMaker** (RuneLite), compiled for **Rhino JS 1.7.14**.

Developed by **xulixna**.

## Available Scripts

| Script | Source | Ready-to-use Bundle | Description |
| --- | --- | --- | --- |
| AIO Cooking | [`src/aio-cooking/`](src/aio-cooking/) | [`dist/aio-cooking.js`](dist/aio-cooking.js) | Progressive or fixed Cooking at Rogues' Den, with a configuration interface and customizable delays. |
| Mithril Brutal Arrow Ironman | [`src/mithril-brutal-arrow-ironman/`](src/mithril-brutal-arrow-ironman/) | [`dist/mithril-brutal-arrow-ironman.js`](dist/mithril-brutal-arrow-ironman.js) | Complete Ironman production chain from mithril ore and coal to Mithril brutal arrows. |
| Bank Stander | [`src/bank-stander/`](src/bank-stander/) | [`dist/bank-stander.js`](dist/bank-stander.js) | Bank-based Herblore, Fletching, Crafting, and Farming seedlings with recipe selection and level-based progression. |
| AIO F2P Account Builder | [`src/f2p-account-builder/`](src/f2p-account-builder/) | [`dist/f2p-account-builder.js`](dist/f2p-account-builder.js) | F2P account progression through skills, combat, exploration, and supported quests. |
| AIO F2P Money Maker | [`src/f2p-money-maker/`](src/f2p-money-maker/) | [`dist/f2p-money-maker.js`](dist/f2p-money-maker.js) | F2P gathering, processing, shop, Crafting, Magic, and tanning methods. |
| OC Farming PoC | [`src/ocfarming-poc/`](src/ocfarming-poc/) | [`dist/ocfarming-poc.js`](dist/ocfarming-poc.js) | Instrumented tree and fruit-tree patch automation with banking and telemetry. |
| Quest Helper PoC | [`src/quest-helper-poc/`](src/quest-helper-poc/) | [`dist/quest-helper-poc.js`](dist/quest-helper-poc.js) | Assisted inspection and execution of quest steps. |

Some projects are proofs of concept and still contain features that require in-client validation. Refer to the script's own README when available.

## Using a Script in BotMaker

1. Open the desired file in [`dist/`](dist/).
2. Copy its contents into a new JavaScript script in the **ThePlug Bot Maker** plugin.
3. Run the script and configure it through the displayed interface.

Files in `dist/` are already compiled and do not require Node.js to run.

## Development

Node.js 20 or newer is required.

```bash
git clone git@github.com:renancavalcantercb/theplug-rlpl-botmaker-scripts.git
cd theplug-rlpl-botmaker-scripts
npm install
npm run build
```

The build pipeline automatically discovers entry points matching `src/*/index.ts` and generates one bundle per project in `dist/`.

## Project Structure

```text
theplug-rlpl-botmaker-scripts/
├── dist/                 # Compiled JavaScript ready for BotMaker
├── src/                  # TypeScript source organized by script
├── package.json
├── rollup.config.js      # Rollup + Babel pipeline targeting Rhino 1.7.14
└── tsconfig.json
```

## Author

- Discord: `xulixna`
