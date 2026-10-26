import { EuropeanParrot } from './european-parrot';
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
     /*  case ParrotType.African:
        this.actualClass = new AfricanParrot(type, numberOfCoconuts, voltage, isNailed);
        break;
      case ParrotType.NorwegianBlue:
        this.actualClass = new NorwegianBlueParrot(type, numberOfCoconuts, voltage, isNailed);
        break;
      default:
        throw new Error('Should be unreachable'); */
    }
  }

  getSpeed(): number {
    switch (this.type) {
      case ParrotType.European:
        return this.actualClass!.getSpeed();
      case ParrotType.African:
        return Math.max(
          0,
          this.getBaseSpeed() - this.getLoadFactor() * this.numberOfCoconuts,
        );
      case ParrotType.NorwegianBlue:
        return this.isNailed ? 0 : this.getBaseSpeedWith(this.voltage);
      default:
        throw new Error('Should be unreachable');
    }
  }

  getCry(): string {
    switch (this.type) {
      case ParrotType.European:
        return this.actualClass!.getCry();
      case ParrotType.African:
        return 'Sqaark!';
      case ParrotType.NorwegianBlue:
        return this.voltage > 0 ? 'Bzzzzzz' : '...';
      default:
        throw new Error('Should be unreachable');
    }
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
