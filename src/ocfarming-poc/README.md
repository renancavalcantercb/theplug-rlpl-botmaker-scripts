# ocfarming PoC — árvores comuns

Porte da metade "árvores comuns" do plugin Microbot **Farming Runner 0.9.3**
(`cutguardian-microbot-plugins/ocfarming`) para a API de script do rlpl.

Isto **não é** o port. É uma sonda instrumentada que existe para responder uma
pergunta antes de a gente decidir portar de verdade:

> O walker do rlpl elimina a camada de aproximação que o plugin Java precisa
> carregar (`FarmingApproachProgress` + `FarmingPatchTarget` + `approach()`,
> ~190 linhas que só existem pra compensar o `Rs2Walker` nos últimos tiles)?

Se a resposta for sim, essas linhas são **deletadas** no port, não portadas — e
junto com elas some a origem do `FIX_BOUNCE_0_4_1` e do `FIX_REACH_0_3_2`.

## Rodar

```bash
pnpm build                       # gera dist/ocfarming-poc.js
```

Cola `dist/ocfarming-poc.js` no Botmaker e dá Run. Abre a janela de seleção;
escolhe os patches e clica Start.

```bash
npx tsx src/ocfarming-poc/verify.ts   # 70 checks da lógica pura, fora do jogo
```

## O que ela faz

Uma passada pelos patches habilitados. Em cada um: caminha até lá, espera
estabilizar (3 ticks, porte do `FarmingSamplingGate`), lê o varbit 4771,
decide a ação pela policy portada e executa — rake, plantar, pagar proteção,
check-health, pagar remoção, limpar stump, podar doente.

Cada ação precisa ser **confirmada** por mudança de varbit, delta de inventário
ou fala do jardineiro (porte do `FarmingActionPolicy.confirmed`). Clique não é
recibo — e no rlpl isso deixou de ser boa prática e virou obrigação, porque
**todas as interações retornam `void`**: não existe sinal de "o clique pegou".

### Revisita

Cada visita grava a observação no `bmCache`, com uma janela de maturação
(`earliest`/`latest`) calculada pelos ciclos da espécie. Na run seguinte, o
patch que ainda está dentro da janela é **pulado sem viagem**:

```
Lumbridge tree -> skipped, Willow growing, due in 3h12m
```

Só um patch `growing` e dentro do prazo é pulado. Vazio, com weeds, pedindo
check-health, morto, ilegível ou nunca observado — tudo isso é trabalho e
recebe visita. E "due" significa *"a estimativa venceu, vai conferir"*, nunca
*"a árvore está pronta"*: o varbit diz o estágio, nunca quando ele começou.

As chaves são namespaced por RSN (`ocPoc.obs.<personagem>.<patch>`) porque o
`bmCache` é por script, não por personagem — sem isso duas contas
sobrescreveriam as estimativas uma da outra.

### Banco e preparo de run

Com **Fetch supplies from the bank** ligado, antes de sair a PoC monta o plano
(`FarmingSupplyPlan`), abre o banco e executa um passo por vez: deposita
sapling em excesso, normaliza notas, retira o que falta, e só avança quando a
mudança é confirmada por delta de inventário. Reserva **5.000 moedas por
patch** (25 remoções) para remoção e transporte pago, e um slot livre (dois em
run com frutífera, porque a primeira nota precisa criar a pilha).

Estoque insuficiente **bloqueia antes de tocar em qualquer coisa**: o plano
confere bag + banco de tudo que é obrigatório antes do primeiro clique. Runas
de teleporte são opcionais e nunca impedem a run.

Desligado, a PoC assume que a mochila já está certa e apenas avisa o que falta.

### Frutíferas

Cinco patches (Gnome, Catherby, Tree Gnome Village, Brimhaven, Kastori) e as
oito espécies. O ciclo é check-health → colher → anotar no leprechaun → pagar
remoção → replantar. Crescem em ciclos de 160 min (~16h no total) contra 40
min das árvores comuns.

**Vêm desligadas por padrão.** O ciclo de frutíferas nunca foi validado em
jogo — nem no plugin Java de onde veio.

### Fora de escopo

Overlay (virou `bot.counters` + log) e o backoff por região do
`FarmingVisitPlanner`.

A PoC assume rake, spade, saplings, 200+ coins (e o pagamento, se proteção
estiver ligada) já na mochila. Se faltar, ela loga e pula o patch.

No default (**willow**): nível 30 de Farming, **willow sapling sem nota (5371)**
e, com `ocPoc.protect` ligado, **1 Apples(5) por patch** (id 5386, ou a nota
5387 — notas são aceitas como pagamento).

## Configuração

Ao dar Run abre uma janela com os 6 patches, a espécie e a proteção. O Start
grava tudo no `bmCache` e só então a run começa — nada roda antes.

| chave | escrita por |
| --- | --- |
| `ocPoc.patch.<lumbridge\|varrock\|falador\|taverley\|gnome\|nemus>` | checkbox |
| `ocPoc.tree` | dropdown (default `Willow`) |
| `ocPoc.protect` | checkbox (default desligado) |
| `ocPoc.travelLimit` | só no código: `1500` ticks (~15 min por patch) |
| `ocPoc.stopWhenDone` | só no código: `true` |

A primeira versão guardava os patches numa string CSV e confiava no
`getString(key, fallback)` devolver o fallback quando a chave não existe. Ele
devolve vazio, e a run morria com `no patches enabled` sem dar um passo. Agora
cada patch é um boolean próprio e a janela escreve todos explicitamente antes
de liberar a run — nada depende mais de default vindo do cache.

Break handler fica **desligado** durante toda a run: uma pausa no meio de uma
aproximação envenena justamente os números que a PoC existe pra coletar.

## Lendo o relatório

Sai no log e no chat ao terminar (`onEnd`), uma linha por patch:

```
Falador Park tree | travel 143t restarts 0 | arrive d=7 obj d=2 | settle 3t | Willow growing (raw 17) | nothing to do
```

Os números que decidem:

| campo | o que significa |
| --- | --- |
| `restarts` | quantas vezes o web walk teve que ser reemitido porque parou antes do destino |
| `BOUNCE` | o detector de bounce disparou: o jogador ficou ≤3 tiles do alvo por 10 ticks sem se aproximar |
| `OBJ-MISSING` | chegou na região mas o objeto do patch não estava na cena |
| `obj d=` | distância até o patch quando a ação foi emitida |
| `=ok/12t` | ticks do clique até o recibo, caminhada incluída |
| `=FAIL` numa ação | a ação nunca confirmou — clicou e nada aconteceu |

**Critério:** `restarts` e `BOUNCE` perto de zero nos 6 patches ⇒ a camada de
aproximação pode ser deletada no port. Qualquer um dos dois aparecendo com
frequência ⇒ o rlpl precisa do mesmo workaround, e a principal vantagem
alegada da migração cai por terra.

## Mapa do porte

| arquivo | origem no plugin | natureza |
| --- | --- | --- |
| `trees.ts` | `FarmingTree.java` | puro |
| `observation.ts` | `FarmingObservation.java` | puro |
| `patches.ts` | `FarmingPatchData.java` (só árvores comuns) | puro |
| `policy.ts` | `FarmingTreePolicy` + `FarmingActionPolicy` + `isConfirmation` | puro |
| `telemetry.ts` | `FarmingApproachProgress` **como detector** | puro |
| `game.ts` | `FarmingGameActions.java` | adapter rlpl |
| `fruit.ts` | `FarmingFruitTree.java` | puro |
| `supplies.ts` | `FarmingSupplyPlan.java` | puro |
| `runner.ts` | `FarmingVisitRunner` + `ActionExecutor` + `RunSupplies` | máquina de estados |
| `storage.ts` | `FarmingTracker` + `FarmingProtectionTracker` | adapter rlpl |
| `bank.ts` | `FarmingBankActions.java` | adapter rlpl |
| `ui.ts` | `OcFarmingConfig` (`@ConfigItem`) | janela Swing |
| `verify.ts` | o equivalente dos 95 testes, na parte que sobrevive | teste Node |

A lógica pura saiu quase 1:1 do Java e continua testável fora do jogo
(`verify.ts`). Só o `game.ts` perdeu cobertura na mudança de plataforma — é
exatamente a camada onde os cinco `FIX_*` do plugin nasceram.

`runner.ts` é a medida honesta do segundo custo do port: no plugin,
`FarmingVisitRunner` roda em thread própria com `sleepUntil` bloqueante; aqui
cada espera virou uma fase explícita porque `onGameTick` tem que retornar na
hora.

## Resultado do primeiro run (6 patches, willow, proteção ligada)

```
patches 6 | bounced 0 | walk restarts 0 | object missing on arrival 0 | unconfirmed actions 1
```

12 minutos para os seis patches, Gnome Stronghold e Nemus Retreat inclusos.
O ciclo completo confirmou em todos: CHECK_HEALTH → REMOVE_TREE → PLANT →
DROP_POTS → PAY. **A camada de aproximação pode ser deletada no port.**

A única ação não confirmada foi `REMOVE_TREE` em Taverley, e a culpa era daqui,
não do walker: `ARRIVAL_DISTANCE` era 12 e **cancelava o web walk no meio**.
Os seis chegaram a 11-12 tiles do visit point porque era o limiar, não porque o
walker parou. Em Taverley isso deixou o jogador a 12 tiles do patch e a espera
de 25 ticks estourou enquanto ele ainda caminhava. Corrigido: limiar de 4 tiles
e a espera não conta tick enquanto o jogador se move.

## Não verificado em jogo

Restam estes pontos:

1. **`bot.widgets.handleDialogue`** no pagamento/remoção. As opções do
   jardineiro em `runner.ts` (`GARDENER_OPTIONS`) são um chute; o plugin usa
   casamento de texto próprio (`FarmingOwnedDialogue`). Se o pagamento não
   confirmar, é aqui.
2. **`bot.objects.interactSuppliedObject` caminhar sozinho até o patch.** É a
   aposta central da PoC. Se não caminhar, `obj d=` vem alto e as ações falham.
3. **`bot.inventory.itemOnObjectWithIds`** para plantar (sapling no patch).
4. **Nemus Retreat e Gnome Stronghold**: regiões que se estendem além da cena.
   O plugin já tratava "varbit fresco não implica objeto carregado" — daí a
   coluna `OBJ-MISSING`.
