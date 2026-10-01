# ThePlug RLPL BotMaker Scripts

Coleção de scripts modulares em **TypeScript** para o **ThePlug / Sox's BotMaker** (RuneLite), compilados para **Rhino JS 1.7.14**.

Desenvolvido por **xulixna**.

## Scripts disponíveis

| Script | Código-fonte | Bundle pronto | Descrição |
| --- | --- | --- | --- |
| AIO Cooking | [`src/aio-cooking/`](src/aio-cooking/) | [`dist/aio-cooking.js`](dist/aio-cooking.js) | Cooking progressivo ou fixo no Rogues' Den, com interface e delays configuráveis. |
| Mithril Brutal Arrow Ironman | [`src/mithril-brutal-arrow-ironman/`](src/mithril-brutal-arrow-ironman/) | [`dist/mithril-brutal-arrow-ironman.js`](dist/mithril-brutal-arrow-ironman.js) | Cadeia ironman completa de minério e carvão até Mithril brutal arrows. |
| Bank Stander | [`src/bank-stander/`](src/bank-stander/) | [`dist/bank-stander.js`](dist/bank-stander.js) | Herblore, Fletching e Crafting no banco, com seleção de receitas e progressão por nível. |
| AIO F2P Account Builder | [`src/f2p-account-builder/`](src/f2p-account-builder/) | [`dist/f2p-account-builder.js`](dist/f2p-account-builder.js) | Progressão de conta F2P por habilidades, combate, exploração e quests suportadas. |
| AIO F2P Money Maker | [`src/f2p-money-maker/`](src/f2p-money-maker/) | [`dist/f2p-money-maker.js`](dist/f2p-money-maker.js) | Métodos F2P de coleta, processamento, lojas, crafting, magia e tanning. |
| OC Farming PoC | [`src/ocfarming-poc/`](src/ocfarming-poc/) | [`dist/ocfarming-poc.js`](dist/ocfarming-poc.js) | Automação instrumentada de patches de árvores e frutíferas, com banco e telemetria. |
| Quest Helper PoC | [`src/quest-helper-poc/`](src/quest-helper-poc/) | [`dist/quest-helper-poc.js`](dist/quest-helper-poc.js) | Inspeção e execução assistida de etapas de quests. |

Alguns projetos são provas de conceito e ainda possuem pontos que precisam de validação dentro do cliente. Consulte o README da pasta do script quando disponível.

## Uso direto no BotMaker

1. Abra o arquivo desejado em [`dist/`](dist/).
2. Copie o conteúdo para um novo script JavaScript no plugin **ThePlug Bot Maker**.
3. Execute o script e configure as opções na interface exibida.

Os arquivos em `dist/` já estão compilados e não exigem Node.js para uso.

## Desenvolvimento

Requer Node.js 20 ou mais recente.

```bash
git clone git@github.com:renancavalcantercb/theplug-rlpl-botmaker-scripts.git
cd theplug-rlpl-botmaker-scripts
npm install
npm run build
```

O pipeline procura automaticamente por entradas em `src/*/index.ts` e gera um arquivo por projeto em `dist/`.

## Estrutura

```text
theplug-rlpl-botmaker-scripts/
├── dist/                 # JavaScript compilado, pronto para o BotMaker
├── src/                  # Código-fonte TypeScript separado por script
├── package.json
├── rollup.config.js      # Rollup + Babel, com target Rhino 1.7.14
└── tsconfig.json
```

## Autor

- Discord: `xulixna`
