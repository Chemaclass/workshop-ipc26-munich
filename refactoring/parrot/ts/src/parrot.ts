import { ParrotType } from './parrot-type';

const BASE_SPEED = 12.0;
const LOAD_FACTOR = 9.0;

export class Parrot {
  private readonly kind: ParrotKind;

  constructor(
    type: number,
    numberOfCoconuts: number,
    voltage: number,
    isNailed: boolean,
  ) {
    this.kind = createParrotKind(type, numberOfCoconuts, voltage, isNailed);
  }

  getSpeed(): number {
    return this.kind.getSpeed();
  }

  getCry(): string {
    return this.kind.getCry();
  }
}

function createParrotKind(
  type: number,
  numberOfCoconuts: number,
  voltage: number,
  isNailed: boolean,
): ParrotKind {
  switch (type) {
    case ParrotType.European:
      return new EuropeanParrot();
    case ParrotType.African:
      return new AfricanParrot(numberOfCoconuts);
    case ParrotType.NorwegianBlue:
      return new NorwegianBlueParrot(voltage, isNailed);
    default:
      throw new Error('Should be unreachable');
  }
}

interface ParrotKind {
  getSpeed(): number;
  getCry(): string;
}

class EuropeanParrot implements ParrotKind {
  getSpeed(): number {
    return BASE_SPEED;
  }

  getCry(): string {
    return 'Sqoork!';
  }
}

class AfricanParrot implements ParrotKind {
  constructor(private readonly numberOfCoconuts: number) {}

  getSpeed(): number {
    return Math.max(0, BASE_SPEED - LOAD_FACTOR * this.numberOfCoconuts);
  }

  getCry(): string {
    return 'Sqaark!';
  }
}

class NorwegianBlueParrot implements ParrotKind {
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
