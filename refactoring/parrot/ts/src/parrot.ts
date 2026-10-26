import { ParrotType } from './parrot-type';

abstract class BaseParrot {
  protected baseSpeed = 12
  abstract getSpeed(): number;
  abstract getCry(): string;
}

export class Parrot {
  constructor(type: number,
    numberOfCoconuts: number,
    voltage: number,
    isNailed: boolean) {
    switch (type) {
      case ParrotType.African:
        return new AfricanParrot(numberOfCoconuts)
      case ParrotType.European:
        return new EuropeanParrot()
      case ParrotType.NorwegianBlue:
        return new NorwegianBlueParrot(voltage, isNailed)
      default:
        throw new Error('Should be unreachable');
    }
  }
}

export class EuropeanParrot extends BaseParrot {
  constructor() {
    super()
  }

  getSpeed() {
    return this.baseSpeed;
  }

  getCry() {
    return 'Sqoork!';
  }
}

export class AfricanParrot extends BaseParrot {
  private readonly loadFactor = 9
  private numberOfCoconuts: number
  constructor(
    numberOfCoconuts: number
  ) {
    super()
    this.numberOfCoconuts = numberOfCoconuts
  }

  getSpeed() {
    return Math.max(
      0,
      this.baseSpeed - this.loadFactor * this.numberOfCoconuts,
    );
  }

  getCry() {
    return 'Sqaark!';
  }
}

export class NorwegianBlueParrot extends BaseParrot {
  private voltage: number
  private isNailed: boolean
  constructor(
    voltage: number,
    isNailed: boolean,
  ) {
    super()
    this.voltage = voltage
    this.isNailed = isNailed
  }

  getSpeed() {
    return this.isNailed ? 0 : Math.min(24.0, this.voltage * this.baseSpeed);
  }

  getCry() {
    return this.voltage > 0 ? 'Bzzzzzz' : '...';
  }
}

