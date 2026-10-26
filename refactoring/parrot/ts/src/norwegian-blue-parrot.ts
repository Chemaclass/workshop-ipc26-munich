import { ParrotParent } from './parrot-parent';

export class NorwegianBlueParrot extends ParrotParent {

    private readonly maxSpeed = 24.0;
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
        return Math.min(this.maxSpeed, voltage * this.getBaseSpeed());
    }
}