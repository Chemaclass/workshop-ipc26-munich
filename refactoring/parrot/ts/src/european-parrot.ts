import { ParrotParent } from './parrot-parent';

export class EuropeanParrot extends ParrotParent {

    constructor() {
        super();
    }

    getSpeed(): number {
        return this.getBaseSpeed();
    }

    getCry(): string {
        return 'Sqoork!';
    }
}