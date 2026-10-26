import { Parrot } from './parrot';
import { ParrotParent } from './parrot-parent';

export class AfricanParrot extends ParrotParent {

    constructor(
        type: number,
        numberOfCoconuts: number,
        voltage: number,
        isNailed: boolean,
    ) {
        super(type, numberOfCoconuts, voltage, isNailed);
    }


    getSpeed(): number {
        return Math.max(0, this.getBaseSpeed() - this.getLoadFactor() * this.numberOfCoconuts);
    }

    getCry(): string {

        return 'Sqaark!';

    }
}