# Bank Stander — Herblore

Primeiro módulo do bank stander: limpeza das 15 ervas de Guam a Torstol,
unfinished com vial of water e 28 receitas finais. A entrada é `index.ts`;
o arquivo para colar no Botmaker é **`dist/bank-stander.js`**.

## Uso

1. Comece junto a um banco, com os materiais no banco ou na mochila.
2. Rode o script e marque **Clean** e/ou **Unfinished** para cada erva.
3. Em **Finished potion**, selecione uma receita por erva ou **None**.
4. Se desejar, ative **Use Amulets of Chemistry** e deixe os amuletos no banco.
5. Clique **Start Herblore** ou **Start Fletching**. As escolhas ficam salvas para a próxima execução.

A mochila é depositada antes do planejamento de cada lote. O script abre
o banco próximo pela API; não busca outro banco nem compra materiais no GE.
Itens são retirados sem nota. Falha de depósito, saque ou abertura encerra
a execução com o motivo no log, sem repetir cliques indefinidamente.

Cada opção habilita somente sua própria etapa. Para começar de grimy herbs
e chegar a poções finais, habilite as três etapas. Com apenas Finished,
o banco precisa ter unfinished potions e os secundários já preparados.
Com apenas Unfinished, precisa ter clean herbs e vials of water.

## Progressão

**Progressive ligado:** a cada lote, escolhe a tarefa selecionada com maior
requisito de nível que seja executável com o nível atual e o estoque. O
nível para limpar é independente do nível para unfinished/final. Tarefas
desbloqueadas por um level-up entram na próxima escolha. Não há boosts
automáticos nem escolha de uma poção final diferente da selecionada.

**Desligado:** segue a ordem das ervas da tabela. Dentro da mesma erva,
prioriza finalizar intermediários existentes, depois fazer unfinished e
depois limpar. Em empate de nível, Progressive usa essa mesma ordem.

Sem materiais/nível para nenhuma tarefa selecionada, deposita os resultados,
registra os requisitos ou IDs faltantes e encerra. Um alvo de nível opcional
também encerra após depositar a mochila; `0` deixa o alvo desativado.
Não calcula lucro com preços de GE nem ordena receitas por GP/XP.

## Lotes e confirmação

- Limpeza: até **28 grimy herbs**, um clique no slot de cada erva, aguardando
  sua transformação antes do próximo clique.
- Unfinished: até **14 clean herbs + 14 vials of water**.
- Final: até **14 unfinished + 14 secundários**, inclusive para secundários
  empilháveis. Estoque menor produz um lote parcial.
- Produção usa item-on-item, seleciona **All** quando disponível e depois **Make**. O progresso
  é confirmado pelos IDs dos produtos na mochila, incluindo a variante de
  quatro doses. Level-up/interrupções permitem até três tentativas sem progresso.
- Logout suspende ações e contagem dos timeouts. O script não faz login.

Os contadores `Herblore clean`, `Herblore unfinished` e `Herblore finished`
contam itens produzidos nesta execução, não cliques nem doses.

## Amuletos

Só equipa **Amulet of chemistry (21163)** para receitas finais compatíveis.
Quando ele quebra, abre o banco para interromper a produção, deposita o lote,
retira/equipa outro e planeja os ingredientes restantes. Sem reposição,
encerra com aviso. Uma quebra pode ser percebida apenas no próximo game tick.

Não administra o **Alchemist's amulet**: com a opção Chemistry ligada e esse
item equipado, encerra e pede para removê-lo ou desativar a opção. Com a opção
desligada, o equipamento é mantido. Weapon poison não solicita chemistry.

## Receitas finais

| Erva | Opções |
| --- | --- |
| Guam | Attack potion |
| Marrentill | Antipoison |
| Tarromin | Strength potion, Serum 207 |
| Harralander | Compost, Restore, Energy, Combat, Goading |
| Ranarr | Defence, Prayer |
| Toadflax | Agility, Saradomin brew |
| Irit | Super attack, Superantipoison |
| Avantoe | Fishing, Super energy, Hunter |
| Kwuarm | Super strength, Weapon poison |
| Huasca | Prayer regeneration |
| Snapdragon | Super restore |
| Cadantine | Super defence |
| Lantadyme | Antifire, Magic |
| Dwarf weed | Ranging, Menaphite remedy |
| Torstol | Zamorak brew |

Serum 207 exige o desbloqueio da receita de Shades of Mort'ton; ele não é
obtido automaticamente. Receitas especiais com coconut milk, vial of blood,
múltiplas poções, pós por dose e etapas adicionais não fazem parte desta versão.
Os módulos de Fletching, Smithing, Crafting e Magic ainda não foram implementados.

## Desenvolvimento e validação

```sh
pnpm build
pnpm lint
pnpm exec tsx src/bank-stander/verify.ts
node src/bank-stander/verify-menu.js
```

Alternativa usando as dependências locais, inclusive para ambientes em que
o `tsx` falha ao consultar o usuário do sistema:

```sh
node node_modules/typescript/bin/tsc src/bank-stander/verify.ts --outDir tmp/bank-stander-check --target ES2020 --module NodeNext --moduleResolution NodeNext --skipLibCheck
node tmp/bank-stander-check/verify.js
node node_modules/rollup/dist/bin/rollup -c rollup.config.js
```

`herblore.ts` contém catálogo e planejamento puro. `runner.ts` contém a
máquina de estados testável por meio da interface `Game`; `game.ts` adapta
essa interface ao Botmaker. `ui.ts` configura a execução.

Os testes simulam alterações atrasadas do banco/inventário, lotes parciais,
encadeamento completo, falhas, amuletos, logout e nível-alvo. **Não substituem
a validação no cliente.** A janela Swing, o índice retornado pelos widgets
da mochila e o menu Make-All ainda precisam da primeira execução real.

O componente Make `17694735`, identifier `1`, opcode `57`, param0 `-1` vem
do log fornecido. All `17694732` vem de `InterfaceID.SKILLMULTI_ALL` nos tipos
instalados. Se o menu não confirmar produção, o log indica a interrupção;
uma captura de menu do cliente permite conferir esses parâmetros.

IDs conferidos em `@deafwave/osrs-botmaker-types` 0.8.39, tabela RuneLite
`ItemID`. Requisitos e ingredientes consultados na [tabela de níveis](https://oldschool.runescape.wiki/w/Herblore/Level_up_table),
na [tabela de experiência](https://oldschool.runescape.wiki/w/Herblore/Experience_table),
no [catálogo de Herblore](https://oldschool.runescape.wiki/w/Herblore) e no
[guia de treinamento](https://oldschool.runescape.wiki/w/Herblore_training).
Mecânica do equipamento: [Amulet of chemistry](https://oldschool.runescape.wiki/w/Amulet_of_chemistry).


## Fletching

Selecione **Fletching** no menu lateral, marque as receitas e clique **Start Herblore** ou **Start Fletching**.
Somente a habilidade selecionada no menu lateral roda. As sele??es ficam salvas. Progressive e a meta de
n?vel se aplicam ? habilidade selecionada; Chemistry s? se aplica a Herblore.

S?o 54 op??es: cortar e encordoar shortbows/longbows normais, oak, willow, maple,
yew e magic; arrow shafts com logs normais; redwood hiking staff; os oito darts,
os dez bolts e os dez tipos de arrows/headless apresentados nas tabelas.

- Corte: **Knife (946)** e at? 27 logs. Esta vers?o usa a faca comum.
- Encordoamento: at? 14 unstrung bows e 14 bow strings.
- Darts/bolts: at? 1500 pontas ou bolts inacabados e a mesma quantidade de feathers.
- Headless arrows: shafts + feathers. Arrows: headless arrows + arrowheads.
- Marque corte e encordoamento para executar as duas etapas. Apenas string exige arcos (u) prontos.
- Progressive escolhe o maior requisito dispon?vel a cada ida ao banco. Sem ele,
  segue a ordem do cat?logo, com encordoamento antes do corte de cada arco.
- Broad arrows/bolts exigem o desbloqueio Broader Fletching. O script n?o compra o desbloqueio;
  aus?ncia de produ??o encerra ap?s tentativas limitadas e informa a receita.

O menu ? localizado pelo ID do produto dentro das op??es SKILLMULTI, sem depender
da posi??o de shortbow/longbow. Darts e bolts aceitam produ??o direta ou menu de
quantidade. Os contadores medem itens produzidos, n?o cliques. N?o s?o calculados
lucro ou XP/h com os pre?os das tabelas, que variam.

Refer?ncias: [Fletching](https://oldschool.runescape.wiki/w/Fletching),
[Darts](https://oldschool.runescape.wiki/w/Dart),
[Broad arrows](https://oldschool.runescape.wiki/w/Broad_arrows).
IDs conferidos na tabela ItemID instalada. Valida??o local com simula??o do banco,
ferramenta n?o consum?vel, corte, string, muni??o direta e com menu, al?m das
regress?es de Herblore; Fletching ainda precisa de valida??o no cliente.


## Interface

Menu lateral para Herblore e Fletching, com destaque na habilidade ativa e bot?o
inferior Start Herblore / Start Fletching. As categorias internas apenas organizam
as escolhas: todas as receitas marcadas da habilidade ativa participam da execu??o.
Herblore separa limpeza, unfinished e finaliza??o; Fletching separa corte, string,
darts, bolts e arrows. Select all / Clear afeta somente a categoria correspondente.
Chemistry fica em Herblore. As escolhas antigas continuam compat?veis com o cache.

A refer?ncia visual fornecida orientou a organiza??o e as cores. O arquivo
`examples/repcal_bank_skiller.js` foi consultado: usa configura??es via `api.*`,
sem uma interface Swing reutiliz?vel diretamente neste projeto.
