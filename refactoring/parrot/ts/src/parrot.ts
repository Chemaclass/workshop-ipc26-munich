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
        return new AfricanParrot(this.numberOfCoconuts).getSpeed();
      case ParrotType.NorwegianBlue:
        return new NorwegianBlueParrot(this.voltage, this.isNailed).getSpeed();
      default:
        throw new Error('Should be unreachable');
    }
  }

  getCry(): string {
    switch (this.type) {
      case ParrotType.European:
        return new EuropeanParrot().getCry();
      case ParrotType.African:
        return new AfricanParrot(this.numberOfCoconuts).getCry();
      case ParrotType.NorwegianBlue:
        return new NorwegianBlueParrot(this.voltage, this.isNailed).getCry();
      default:
        throw new Error('Should be unreachable');
    }
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

class AfricanParrot {
  constructor(private readonly numberOfCoconuts: number) {}

  getSpeed(): number {
    return Math.max(0, BASE_SPEED - LOAD_FACTOR * this.numberOfCoconuts);
  }

  getCry(): string {
    return 'Sqaark!';
  }
}

class NorwegianBlueParrot {
  constructor(
    private readonly voltage: number,
    private readonly isNailed: boolean,
  ) {}

  getSpeed(): number {
    return this.isNailed ? 0 : this.getBaseSpeedWith(this.voltage);
  }

  getCry(): string {
    return this.voltage > 0 ? 'Bzzzzzz' : '...';
  }

  private getBaseSpeedWith(voltage: number): number {
    return Math.min(24.0, voltage * BASE_SPEED);
  }
}
