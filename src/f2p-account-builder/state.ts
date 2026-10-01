import { BuilderCategory } from './types.js';

export interface TaskHandler {
	readonly category: BuilderCategory;
	onStart(): void;
	tick(): void;
	isComplete(): boolean;
	getStatus(): string;
	onFinish?(): void;
}

export interface PendingAction {
	label: string;
	check: () => boolean;
	done: () => void;
	ticks: number;
}

export class DelayManager {
	private delayTicks = 0;

	public isBusy(): boolean {
		return this.delayTicks > 0;
	}

	public tick(): void {
		if (this.delayTicks > 0) {
			this.delayTicks--;
		}
	}

	public setDelay(ticks: number): void {
		if (ticks > this.delayTicks) {
			this.delayTicks = ticks;
		}
	}

	public getRemaining(): number {
		return this.delayTicks;
	}

	public static getReactionTicks(
		playStyle: 'fast' | 'normal' | 'lazy',
		noobMode = false,
		totalLevel = 100,
	): number {
		let base: number;
		switch (playStyle) {
			case 'fast':
				base = Math.floor(Math.random() * 2) + 1; // 1-2 ticks (~0.6s - 1.2s)
				break;
			case 'lazy':
				base = Math.floor(Math.random() * 4) + 4; // 4-7 ticks (~2.4s - 4.2s)
				break;
			case 'normal':
			default:
				base = Math.floor(Math.random() * 3) + 2; // 2-4 ticks (~1.2s - 2.4s)
				break;
		}

		// Dynamic Noob Mode: Low stats accounts behave more slowly with natural hesitation
		if (noobMode && totalLevel < 120) {
			if (totalLevel < 50) {
				// Brand new beginner account (<50 total level): +1 to +3 ticks + occasional hesitation
				const hesitation = Math.random() < 0.12 ? Math.floor(Math.random() * 3) + 2 : 0;
				return base + Math.floor(Math.random() * 3) + 1 + hesitation;
			} else {
				// Maturing account (50-120 total level): +0 to +2 ticks
				return base + Math.floor(Math.random() * 2);
			}
		}

		return base;
	}
}
