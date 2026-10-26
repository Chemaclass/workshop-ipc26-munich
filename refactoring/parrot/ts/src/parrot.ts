import { AfricanParrot } from './african-parrot';
import { EuropeanParrot } from './european-parrot';
import { NorwegianBlueParrot } from './norwegian-blue-parrot';
import type { ParrotParent } from './parrot-parent';
import { ParrotType } from './parrot-type';

export class Parrot {
  private actualClass?: ParrotParent;
 constructor(
    private readonly type: number,
    private readonly numberOfCoconuts: number,
    private readonly voltage: number,
    private readonly isNailed: boolean,
  ) {
    switch (type) {
      case ParrotType.European:
        this.actualClass = new EuropeanParrot(type, numberOfCoconuts, voltage, isNailed);
        
        break;
       case ParrotType.African:
        this.actualClass = new AfricanParrot(type, numberOfCoconuts, voltage, isNailed);
        break;
      case ParrotType.NorwegianBlue:
        this.actualClass = new NorwegianBlueParrot(type, numberOfCoconuts, voltage, isNailed);
        break;
      default:
        throw new Error('Should be unreachable');
    }
  }

  getSpeed(): number {
      return this.actualClass!.getSpeed();
  }

  getCry(): string {
    return this.actualClass!.getCry();
  }

  private getBaseSpeedWith(voltage: number): number {
    return Math.min(24.0, voltage * this.getBaseSpeed());
  }

  private getLoadFactor(): number {
    return 9.0;
  }

  private getBaseSpeed(): number {
    return 12.0;
  }
}
