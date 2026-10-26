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
        this.actualClass = new EuropeanParrot();
        
        break;
       case ParrotType.African:
        this.actualClass = new AfricanParrot(numberOfCoconuts);
        break;
      case ParrotType.NorwegianBlue:
        this.actualClass = new NorwegianBlueParrot(voltage, isNailed);
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

}
