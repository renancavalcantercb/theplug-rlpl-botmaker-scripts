import { MoneyMethodId } from '../types.js';

export interface MoneyMethodHandler {
	readonly id: MoneyMethodId;
	readonly name: string;
	onStart: () => void;
	tick: () => void;
	isSuppliesExhausted: () => boolean;
	getStatus: () => string;
	onFinish?: () => void;
}
