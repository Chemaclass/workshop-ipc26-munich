import { Parrot } from './parrot';
import { ParrotParent } from './parrot-parent';

export class EuropeanParrot extends ParrotParent {

    constructor(
         type: number,
         numberOfCoconuts: number,
         voltage: number,
         isNailed: boolean,
    ) {
        super(type, numberOfCoconuts, voltage, isNailed);
    }

    getSpeed(): number {
        return this.getBaseSpeed();
    }

    getCry(): string {
        return 'Sqoork!';
    }
}