// Exercise the real adapter with RuneLite widget visibility combinations.
// node src/bank-stander/verify-menu.js
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const source = readFileSync(new URL('./game.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, {
	compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
});
const MAKE = 17694735;
const ALL = 17694732;
const widgets = new Map();
const calls = [];
const context = {
	exports: {},
	client: { getWidget: (id) => widgets.get(id) ?? null },
	bot: { widgets: { interactSpecifiedWidget: (...args) => calls.push(args) } },
};
vm.runInNewContext(outputText, context);
const { game } = context.exports;
let scenarios = 0;
for (const allVisible of [false, true]) {
	for (const neighbourVisible of [false, true]) {
		widgets.set(MAKE, { isHidden: () => false });
		widgets.set(ALL, { isHidden: () => !allVisible });
		widgets.set(MAKE + 1, { isHidden: () => !neighbourVisible });
		calls.length = 0;
		assert.equal(game.makeVisible(), true, 'Make must not depend on other components');
		game.makeAll();
		game.make();
		assert.deepEqual(calls, allVisible
			? [[ALL, 1, 57, -1], [MAKE, 1, 57, -1]]
			: [[MAKE, 1, 57, -1]]);
		scenarios++;
	}
}
widgets.delete(ALL);
calls.length = 0;
assert.equal(game.makeVisible(), true);
game.makeAll();
game.make();
assert.deepEqual(calls, [[MAKE, 1, 57, -1]], 'Absent All still permits Make');
scenarios++;
widgets.set(MAKE, { isHidden: () => true });
assert.equal(game.makeVisible(), false, 'Hidden Make is not actionable');
scenarios++;
widgets.delete(MAKE);
assert.equal(game.makeVisible(), false, 'Missing Make is not actionable');
scenarios++;
console.log('Bank Stander menu: ' + scenarios + ' adapter scenarios passed.');

const { fletchingGame } = context.exports;
const w = (id, children = [], hidden = false) => ({ isHidden: () => hidden, getItemId: () => id, getChildren: () => children });
widgets.clear();
widgets.set(MAKE, w(-1, [w(50)]));
widgets.set(MAKE + 2, w(-1, [w(-1, [w(48)])]));
calls.length = 0;
assert.equal(fletchingGame.makeVisible({ outputs: [48] }), true);
fletchingGame.make({ outputs: [48] });
assert.deepEqual(calls, [[MAKE + 2, 1, 57, -1]]);
assert.equal(fletchingGame.makeVisible({ outputs: [72] }), false);
widgets.set(MAKE + 2, w(-1, [w(48)], true));
assert.equal(fletchingGame.makeVisible({ outputs: [48] }), false);
console.log('Fletching menu: product selection, absent product and hidden product passed.');
