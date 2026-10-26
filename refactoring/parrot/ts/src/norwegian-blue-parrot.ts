import { ParrotParent } from './parrot-parent';

export class NorwegianBlueParrot extends ParrotParent {

    constructor(
        private readonly voltage: number,
        private readonly isNailed: boolean,
    ) {
        super();
    }

    getSpeed(): number {
        return this.isNailed ? 0 : this.getBaseSpeedWith(this.voltage);
    }

    getCry(): string {
        return this.voltage > 0 ? 'Bzzzzzz' : '...';
    }

    protected getBaseSpeedWith(voltage: number): number {
        return Math.min(24.0, voltage * this.getBaseSpeed());
    }
}