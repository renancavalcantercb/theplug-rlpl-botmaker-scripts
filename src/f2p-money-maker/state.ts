import { PlayStyle } from './types.js';

export interface PendingAction {
	label: string;
	check: () => boolean;
	done: () => void;
	ticks: number;
}

export interface TaskHandler {
	name: string;
	onStart: () => void;
	tick: () => void;
	isSuppliesExhausted: () => boolean;
	getStatus: () => string;
	onFinish?: () => void;
}

export class DelayManager {
	private remainingTicks = 0;

	public setDelay(ticks: number): void {
		this.remainingTicks = Math.max(this.remainingTicks, ticks);
	}

	public tick(): void {
		if (this.remainingTicks > 0) {
			this.remainingTicks--;
		}
	}

	public isBusy(): boolean {
		return this.remainingTicks > 0;
	}

	public getRemaining(): number {
		return this.remainingTicks;
	}

	public static getReactionTicks(playStyle: PlayStyle, noobMode: boolean): number {
		const roll = Math.random();
		let base = 1;

		if (playStyle === 'fast') {
			base = roll < 0.8 ? 0 : 1;
		} else if (playStyle === 'lazy') {
			base = roll < 0.5 ? 2 : (roll < 0.85 ? 3 : 4);
		} else {
			// Normal
			base = roll < 0.6 ? 1 : 2;
		}

		if (noobMode && Math.random() < 0.1) {
			// Hesitation
			base += Math.floor(Math.random() * 2) + 1;
		}

		return base;
	}

	public static getBankMicroPause(enabled: boolean): number {
		if (!enabled) return 1;
		const rand = Math.random();
		if (rand < 0.5) return 1;
		if (rand < 0.85) return 2;
		return 3;
	}
}

export class SessionStats {
	private readonly startTime: number = Date.now();
	private totalEstimatedGp = 0;
	private itemsProcessed = 0;
	private currentMethodName = 'Starting';

	public addGp(amount: number): void {
		this.totalEstimatedGp += amount;
	}

	public addItem(count = 1): void {
		this.itemsProcessed += count;
	}

	public setMethod(name: string): void {
		this.currentMethodName = name;
	}

	public getElapsedTimeMinutes(): number {
		return Math.floor((Date.now() - this.startTime) / 60000);
	}

	public getElapsedTimeHours(): number {
		return (Date.now() - this.startTime) / 3600000;
	}

	public getTotalGp(): number {
		return this.totalEstimatedGp;
	}

	public getItemsProcessed(): number {
		return this.itemsProcessed;
	}

	public getGpHour(): number {
		const hours = this.getElapsedTimeHours();
		if (hours < 0.01) return 0;
		return Math.floor(this.totalEstimatedGp / hours);
	}

	public getStatusSummary(): string {
		const mins = this.getElapsedTimeMinutes();
		const kGp = Math.floor(this.totalEstimatedGp / 1000);
		return `[${this.currentMethodName}] ${mins}m | GP: ${kGp}k (${Math.floor(this.getGpHour() / 1000)}k/h)`;
	}
}
