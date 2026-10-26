import { ParrotType } from './parrot-type';

// abstract class BaseParrot {
//   private loadFactor = 9
//   private baseSpeed = 12
//   constructor(
//     private readonly type: number,
//     private readonly numberOfCoconuts: number,
//     private readonly voltage: number,
//     private readonly isNailed: boolean,
//   ) {}

//   abstract getSpeed(): number

//   abstract getCry(): string
// }

const AFRICAN_PARROT_LOAD_FACTOR = 9

abstract class BaseParrot {
  protected baseSpeed = 12
  constructor(
    protected numberOfCoconuts: number,
    protected voltage: number,
    protected isNailed: boolean,
  ) { }

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
        return new AfricanParrot(numberOfCoconuts, voltage, isNailed)
      case ParrotType.European:
        return new EuropeanParrot(numberOfCoconuts, voltage, isNailed)
      case ParrotType.NorwegianBlue:
        return new NorwegianBlueParrot(numberOfCoconuts, voltage, isNailed)
      default:
        throw new Error('Should be unreachable');
    }
  }
}

export class EuropeanParrot extends BaseParrot {
  constructor(
    numberOfCoconuts: number,
    voltage: number,
    isNailed: boolean,
  ) {
    super(numberOfCoconuts, voltage, isNailed)
  }

  getSpeed() {
    return this.baseSpeed;
  }

  getCry() {
    return 'Sqoork!';
  }
}

export class AfricanParrot extends BaseParrot {
  constructor(
    numberOfCoconuts: number,
    voltage: number,
    isNailed: boolean,
  ) {
    super(numberOfCoconuts, voltage, isNailed)
  }

  getSpeed() {
    return Math.max(
      0,
      this.baseSpeed - AFRICAN_PARROT_LOAD_FACTOR * this.numberOfCoconuts,
    );
  }

  getCry() {
    return 'Sqaark!';
  }
}

export class NorwegianBlueParrot extends BaseParrot {
  constructor(
    numberOfCoconuts: number,
    voltage: number,
    isNailed: boolean,
  ) {
    super(numberOfCoconuts, voltage, isNailed)
  }

  getSpeed() {
    return this.isNailed ? 0 : Math.min(24.0, this.voltage * this.baseSpeed);
  }

  getCry() {
    return this.voltage > 0 ? 'Bzzzzzz' : '...';
  }
}

