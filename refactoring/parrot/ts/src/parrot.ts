import {ParrotType} from './parrot-type';
import {type ParrotInterface} from "./parrot-interface";

export class Parrot implements ParrotInterface {
  constructor(
    readonly type: number = 0,
    readonly numberOfCoconuts: number = 0,
    readonly voltage: number = 0,
    readonly nailedState: boolean = false,
  ) {
  }

  getSpeed(): number {
    switch (this.type) {
      case ParrotType.European:
        return this.getBaseSpeed();
      case ParrotType.African:
        return Math.max(
          0,
          this.getBaseSpeed() - this.getLoadFactor() * this.numberOfCoconuts,
        );
      case ParrotType.NorwegianBlue:
        return this.nailedState ? 0 : this.getBaseSpeedWith(this.voltage);
      default:
        throw new Error('Should be unreachable');
    }
  }

  getCry(): string {
    switch (this.type) {
      case ParrotType.European:
        return 'Sqoork!';
      case ParrotType.African:
        return 'Sqaark!';
      case ParrotType.NorwegianBlue:
        return this.voltage > 0 ? 'Bzzzzzz' : '...';
      default:
        throw new Error('Should be unreachable');
    }
  }

  protected getBaseSpeedWith(voltage: number): number {
    return Math.min(24.0, voltage * this.getBaseSpeed());
  }

  protected getLoadFactor(): number {
    return 9.0;
  }

  protected getBaseSpeed(): number {
    return 12.0;
  }

  protected isNailed(): boolean {
    return this.nailedState;
  }
}
