# ThePlug RLPL BotMaker Scripts

Coleção de scripts modulares em **TypeScript** para o **ThePlug / Sox's BotMaker** (RuneLite), compilados para **Rhino JS (1.7.14)**.

Desenvolvido por **xulixna**.

---

## 📜 Scripts Disponíveis

### 1. AIO Cooking (Rogues' Den)
*Localização: `src/aio-cooking/` | Compilado: `dist/aio-cooking.js`*

Um script completo e inteligente para treinar Cooking no banco de **Rogues' Den** (`WorldPoint(3040, 4969, 1)`):
- **Caminhada Automática (WebWalker)**: Se o jogador estiver fora de Rogues' Den, caminha automaticamente até lá antes de começar.
- **Banco Eficiente**: Prioriza o NPC bancário **Emerald Benedict** (ID `23678`), mais próximo do fogo que o baú.
- **Dois Modos de Cozimento**:
  - **Progressive**: Seleciona e cozinha automaticamente o peixe/alimento de maior nível disponível no banco com base no nível atual do jogador.
  - **Fixed**: Cozinha apenas a comida selecionada na interface.
- **Estilos de Jogo (Anti-Pattern / Human Delay)**:
  - **Normal**: Reações ativas e rápidas (1-3s).
  - **Lazy / AFK**: Delays humanos simulando jogador assistindo vídeos/tabbed out (até 10s antes de voltar ao banco).
  - *Fórmula única de seed baseada no Total Level e nome do jogador (RSN)* para comportamento individualizado por conta.
- **Tratamento de Interrupções**: Retoma automaticamente o cozimento caso a ação seja interrompida por mensagens de level-up ou timeouts.
- **Interface Gráfica (Swing UI)**: Tema escuro **Dark Velvet Purple** com persistência automática de configurações.
- **Display HUD (Overlay ThePlug)**: Exibe nível atual, level alvo, XP obtido, XP/hora e tempo de sessão.

### 2. Mithril Brutal Arrow Ironman
*Localização: `src/mithril-brutal-arrow-ironman/` | Compilado: `dist/mithril-brutal-arrow-ironman.js`*

Fluxo completo de **Mithril brutal arrows** para contas **ironman**, do minério até a flecha, dividido em 3 fases:
1. **Mithril bars — Edgeville**: 5 Mithril ore + Coal → Furnace (`16469`), com **Varrock armour 2** equipada (equipa do inventário ou tira do banco automaticamente).
2. **Mithril nails — Varrock West**: Hammer + 27 Mithril bars → Anvil (`2097`) → 15 nails por barra.
3. **Brutal arrows — Achey trees** (`WorldPoint(2603, 2978, 0)`): Achey logs → Ogre arrow shafts (Knife) → Flighted ogre arrows (Feathers) → Mithril brutal arrows (Mithril nails + Hammer).

- **Dois Modos**:
  - **Progressive**: Você informa quantas flechas quer. O script confere banco + inventário, calcula ore, coal, barras, nails, penas e shafts necessários, pula as fases que já estão prontas e **avisa exatamente o que falta** antes de começar. Se algo acabar no meio, encerra informando o progresso.
  - **Single phase**: Roda apenas uma fase (bars, nails ou arrows) até acabar o material.
- **Aproveita o que já existe**: Nails, barras, shafts e flighted arrows no banco/inventário entram no cálculo — só corta os shafts que faltam.
- **Banco Inteligente**: Reconhece bank booths e bank chests (ex.: Ferox Enclave, Castle Wars) para a checagem inicial.
- **Caminhada Automática (WebWalker)**: Anda entre Edgeville, Varrock West e Achey trees; cancela o WebWalk quando o script é parado.
- **AFK Aleatório por Execução**: Cada run sorteia uma chance própria de pequenas pausas AFK, só enquanto o personagem já está ocupado (fundindo, martelando, cortando, fletchando ou andando), com cooldown entre pausas.
- **Estilos de Jogo (Normal / Lazy AFK)**: Mesmo sistema de delays humanos com seed por conta do AIO Cooking.
- **Tratamento de Interrupções**: Level-ups, timeouts e item selecionado sobrando (ex.: "Use Knife ->") são tratados automaticamente.
- **Interface Gráfica (Swing UI)**: Tema escuro roxo com persistência automática de configurações.
- **Display HUD (Overlay ThePlug)**: Fase atual, níveis, bars/nails/shafts/flighted/brutal feitos, XP/hora de Smithing, Fletching e Woodcutting, tempo e pausas AFK.

> Dica: deixe a quantidade da interface de smithing do anvil em **"All"** antes da fase de nails.

---

## 🚀 Como Usar

### Opção A — Rodar Direto no BotMaker (Sem instalar nada)
1. Baixe ou copie o código compilado do script desejado:
   - [`dist/aio-cooking.js`](dist/aio-cooking.js)
   - [`dist/mithril-brutal-arrow-ironman.js`](dist/mithril-brutal-arrow-ironman.js)
2. No RuneLite com o plugin **ThePlug Bot Maker**, crie um novo script JavaScript e cole o conteúdo.
3. Clique em **Run**. A interface de configuração abrirá para você escolher os parâmetros.

---

### Opção B — Desenvolvimento em TypeScript (Modificar e Compilar)
Se quiser alterar o código-fonte em TypeScript ou adicionar novos scripts:

1. Clone o repositório:
   ```bash
   git clone git@github.com:renancavalcantercb/theplug-rlpl-botmaker-scripts.git
   cd theplug-rlpl-botmaker-scripts
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Compile para JavaScript compatível com o Rhino 1.7.14:
   ```bash
   npm run build
   ```
4. O script compilado será gerado na pasta `dist/`.

---

## 📁 Estrutura do Projeto

```text
theplug-rlpl-botmaker-scripts/
├── dist/                          # Scripts compilados prontos para uso no client
│   ├── aio-cooking.js
│   └── mithril-brutal-arrow-ironman.js
├── src/
│   ├── aio-cooking/               # Código-fonte modular em TypeScript
│   │   ├── config.ts              # Configurações e cache (bot.bmCache)
│   │   ├── food.ts                # Tabela de alimentos, XP e seleção de melhor comida
│   │   ├── game.ts                # Wrappers da API ThePlug / RuneLite Client
│   │   ├── index.ts               # Ciclos onStart, onGameTick, onEnd
│   │   ├── runner.ts              # Máquina de estados e lógica de delay humano
│   │   └── ui.ts                  # Janela de configuração em Swing (Dark Purple)
│   └── mithril-brutal-arrow-ironman/
│       ├── config.ts              # Configurações e cache (bot.bmCache)
│       ├── constants.ts           # IDs de itens/objetos/widgets, locais e fases
│       ├── game.ts                # Wrappers da API ThePlug / RuneLite Client
│       ├── index.ts               # Ciclos onStart, onGameTick, onEnd
│       ├── runner.ts              # Máquina de estados das 3 fases, plano Progressive e AFK
│       └── ui.ts                  # Janela de configuração em Swing
├── package.json
├── rollup.config.js               # Pipeline de build Rollup + Babel (Rhino target)
├── tsconfig.json
└── README.md
```

---

## 👤 Autor
- **Discord**: `xulixna`
