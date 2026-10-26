import { ParrotType } from './parrot-type';

const BASE_SPEED = 12.0;
const LOAD_FACTOR = 9.0;

export class Parrot {
  constructor(
    private readonly type: number,
    private readonly numberOfCoconuts: number,
    private readonly voltage: number,
    private readonly isNailed: boolean,
  ) {}

  getSpeed(): number {
    switch (this.type) {
      case ParrotType.European:
        return new EuropeanParrot().getSpeed();
      case ParrotType.African:
        return Math.max(0, BASE_SPEED - LOAD_FACTOR * this.numberOfCoconuts);
      case ParrotType.NorwegianBlue:
        return this.isNailed ? 0 : this.getBaseSpeedWith(this.voltage);
      default:
        throw new Error('Should be unreachable');
    }
  }

  getCry(): string {
    switch (this.type) {
      case ParrotType.European:
        return new EuropeanParrot().getCry();
      case ParrotType.African:
        return 'Sqaark!';
      case ParrotType.NorwegianBlue:
        return this.voltage > 0 ? 'Bzzzzzz' : '...';
      default:
        throw new Error('Should be unreachable');
    }
  }

  private getBaseSpeedWith(voltage: number): number {
    return Math.min(24.0, voltage * BASE_SPEED);
  }
}

class EuropeanParrot {
  getSpeed(): number {
    return BASE_SPEED;
  }

  getCry(): string {
    return 'Sqoork!';
  }
}
