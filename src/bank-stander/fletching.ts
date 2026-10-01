import { type Job, type Settings } from './herblore.js';
export const FLETCHING: Job[] = [];
const add = (
	label: string,
	level: number,
	kind: Job['kind'],
	inputs: number[],
	output: number,
	tool?: number,
): void => {
	FLETCHING.push({
		key: label,
		label,
		level,
		kind,
		inputs,
		outputs: [output],
		chemistry: false,
		tool,
		limit: tool ? 27 : (kind === 'string' ? 14 : 1500),
		direct: kind === 'darts' || kind === 'bolts',
	});
};
add('String Shortbow', 5, 'string', [50, 1777], 841);
add('Cut Shortbow (u)', 5, 'cut', [1511], 50, 946);
add('String Longbow', 10, 'string', [48, 1777], 839);
add('Cut Longbow (u)', 10, 'cut', [1511], 48, 946);
add('String Oak shortbow', 20, 'string', [54, 1777], 843);
add('Cut Oak shortbow (u)', 20, 'cut', [1521], 54, 946);
add('String Oak longbow', 25, 'string', [56, 1777], 845);
add('Cut Oak longbow (u)', 25, 'cut', [1521], 56, 946);
add('String Willow shortbow', 35, 'string', [60, 1777], 849);
add('Cut Willow shortbow (u)', 35, 'cut', [1519], 60, 946);
add('String Willow longbow', 40, 'string', [58, 1777], 847);
add('Cut Willow longbow (u)', 40, 'cut', [1519], 58, 946);
add('String Maple shortbow', 50, 'string', [64, 1777], 853);
add('Cut Maple shortbow (u)', 50, 'cut', [1517], 64, 946);
add('String Maple longbow', 55, 'string', [62, 1777], 851);
add('Cut Maple longbow (u)', 55, 'cut', [1517], 62, 946);
add('String Yew shortbow', 65, 'string', [68, 1777], 857);
add('Cut Yew shortbow (u)', 65, 'cut', [1515], 68, 946);
add('String Yew longbow', 70, 'string', [66, 1777], 855);
add('Cut Yew longbow (u)', 70, 'cut', [1515], 66, 946);
add('String Magic shortbow', 80, 'string', [72, 1777], 861);
add('Cut Magic shortbow (u)', 80, 'cut', [1513], 72, 946);
add('String Magic longbow', 85, 'string', [70, 1777], 859);
add('Cut Magic longbow (u)', 85, 'cut', [1513], 70, 946);
add('Arrow shafts (normal logs)', 1, 'cut', [1511], 52, 946);
add('Redwood hiking staff', 90, 'cut', [19669], 31049, 946);
add('Bronze darts', 10, 'darts', [819, 314], 806);
add('Iron darts', 22, 'darts', [820, 314], 807);
add('Steel darts', 37, 'darts', [821, 314], 808);
add('Mithril darts', 52, 'darts', [822, 314], 809);
add('Adamant darts', 67, 'darts', [823, 314], 810);
add('Rune darts', 81, 'darts', [824, 314], 811);
add('Amethyst darts', 90, 'darts', [25853, 314], 25849);
add('Dragon darts', 95, 'darts', [11232, 314], 11230);
add('Bronze bolts', 9, 'bolts', [9375, 314], 877);
add('Blurite bolts', 24, 'bolts', [9376, 314], 9139);
add('Iron bolts', 39, 'bolts', [9377, 314], 9140);
add('Silver bolts', 43, 'bolts', [9382, 314], 9145);
add('Steel bolts', 46, 'bolts', [9378, 314], 9141);
add('Mithril bolts', 54, 'bolts', [9379, 314], 9142);
add('Broad bolts', 55, 'bolts', [11876, 314], 11875);
add('Adamant bolts', 61, 'bolts', [9380, 314], 9143);
add('Rune bolts', 69, 'bolts', [9381, 314], 9144);
add('Dragon bolts', 84, 'bolts', [21930, 314], 21905);
add('Headless arrows', 1, 'arrows', [52, 314], 53);
add('Bronze arrows', 1, 'arrows', [53, 39], 882);
add('Iron arrows', 15, 'arrows', [53, 40], 884);
add('Steel arrows', 30, 'arrows', [53, 41], 886);
add('Mithril arrows', 45, 'arrows', [53, 42], 888);
add('Broad arrows', 52, 'arrows', [53, 11874], 4160);
add('Adamant arrows', 60, 'arrows', [53, 43], 890);
add('Rune arrows', 75, 'arrows', [53, 44], 892);
add('Amethyst arrows', 82, 'arrows', [53, 21350], 21326);
add('Dragon arrows', 90, 'arrows', [53, 11237], 11212);
export const fletchingJobs = (settings: Settings): Job[] =>
	FLETCHING.filter((job) => (settings.fletching ?? []).includes(job.key));
