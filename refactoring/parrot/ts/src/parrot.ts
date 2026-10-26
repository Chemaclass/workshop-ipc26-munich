import { ParrotType } from './parrot-type';

interface ParrotBehavior {
  getSpeed(): number;
  getCry(): string;
}

export class Parrot {
  private readonly behavior: ParrotBehavior;

  constructor(
    type: number,
    numberOfCoconuts: number,
    voltage: number,
    isNailed: boolean,
  ) {
    switch (type) {
      case ParrotType.European:
        this.behavior = new European();
        break;
      case ParrotType.African:
        this.behavior = new African(numberOfCoconuts);
        break;
      case ParrotType.NorwegianBlue:
        this.behavior = new NorwegianBlue(voltage, isNailed);
        break;
      default:
        throw new Error('Should be unreachable');
    }
  }

  getSpeed(): number {
    return this.behavior.getSpeed();
  }

  getCry(): string {
    return this.behavior.getCry();
  }
}

export class European implements ParrotBehavior {
  getSpeed(): number {
    return 12.0;
  }

  getCry(): string {
    return 'Sqoork!';
  }
}

export class African implements ParrotBehavior {
  constructor(private readonly numberOfCoconuts: number) {}

  getSpeed(): number {
    return Math.max(
      0,
      12.0 - 9.0 * this.numberOfCoconuts,
    );
  }

  getCry(): string {
    return 'Sqaark!';
  }
}

export class NorwegianBlue implements ParrotBehavior {
  constructor(private readonly voltage: number, private readonly isNailed: boolean) {}

  getSpeed(): number {
    return this.isNailed ? 0 : Math.min(24.0, this.voltage * 12.0);
  }

  getCry(): string {
    return this.voltage > 0 ? 'Bzzzzzz' : '...';
  }
}

