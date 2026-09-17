# ThePlug RLPL BotMaker Scripts

Coleção de scripts modulares em **TypeScript** para o **ThePlug / Sox's BotMaker** (RuneLite), compilados para **Rhino JS (1.7.14)**.

Desenvolvido por **xulixna**.

---

## 🍳 Scripts Disponíveis

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

---

## 🚀 Como Usar

### Opção A — Rodar Direto no BotMaker (Sem instalar nada)
1. Baixe ou copie o código compilado em:
   [`dist/aio-cooking.js`](dist/aio-cooking.js)
2. No RuneLite com o plugin **ThePlug Bot Maker**, crie um novo script JavaScript e cole o conteúdo.
3. Clique em **Run**. A interface de configuração roxa abrirá para você escolher os parâmetros.

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
│   └── aio-cooking.js
├── src/
│   └── aio-cooking/               # Código-fonte modular em TypeScript
│       ├── config.ts              # Configurações e cache (bot.bmCache)
│       ├── food.ts                # Tabela de alimentos, XP e seleção de melhor comida
│       ├── game.ts                # Wrappers da API ThePlug / RuneLite Client
│       ├── index.ts               # Ciclos onStart, onGameTick, onEnd
│       ├── runner.ts              # Máquina de estados e lógica de delay humano
│       └── ui.ts                  # Janela de configuração em Swing (Dark Purple)
├── package.json
├── rollup.config.js               # Pipeline de build Rollup + Babel (Rhino target)
├── tsconfig.json
└── README.md
```

---

## 👤 Autor
- **Discord**: `xulixna`
