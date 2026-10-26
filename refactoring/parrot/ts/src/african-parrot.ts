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
}