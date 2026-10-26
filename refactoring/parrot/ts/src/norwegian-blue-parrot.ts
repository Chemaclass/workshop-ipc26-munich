import { Parrot } from './parrot';
import { ParrotParent } from './parrot-parent';

export class NorwegianBlueParrot extends ParrotParent {

    constructor(
         type: number,
         numberOfCoconuts: number,
         voltage: number,
         isNailed: boolean,
    ) {
        super(type, numberOfCoconuts, voltage, isNailed);
    }

    getSpeed(): number {
        return this.isNailed ? 0 : this.getBaseSpeedWith(this.voltage);
    }

    getCry(): string {
          return this.voltage > 0 ? 'Bzzzzzz' : '...';}
}