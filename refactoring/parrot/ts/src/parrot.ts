import { ParrotType } from './parrot-type';

export class Parrot {
  constructor(
    private readonly type: number,
    protected readonly numberOfCoconuts: number,
    protected readonly voltage: number,
    protected readonly isNailed: boolean,
  ) { }

  getSpeed(): number {
    throw new Error('implement me');
  }

  getCry(): string {
    throw new Error('implement me');
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
}

export class European extends Parrot {
  constructor(numberOfCoconuts: number, voltage: number, isNailed: boolean) {
    super(ParrotType.European, numberOfCoconuts, voltage, isNailed);
  }

  getSpeed(): number {
    return this.getBaseSpeed();
  }

  getCry(): string {
    return 'Sqoork!';
  }
}

export class African extends Parrot {
  constructor(numberOfCoconuts: number, voltage: number, isNailed: boolean) {
    super(ParrotType.African, numberOfCoconuts, voltage, isNailed);
  }

  getSpeed(): number {
    return Math.max(
      0,
      this.getBaseSpeed() - this.getLoadFactor() * this.numberOfCoconuts,
    );
  }

  getCry(): string {
    return 'Sqaark!';
  }
}

export class NorwegianBlue extends Parrot {
  constructor(numberOfCoconuts: number, voltage: number, isNailed: boolean) {
    super(ParrotType.NorwegianBlue, numberOfCoconuts, voltage, isNailed);
  }

  getSpeed(): number {
    return this.isNailed ? 0 : this.getBaseSpeedWith(this.voltage);
  }

  getCry(): string {
    return this.voltage > 0 ? 'Bzzzzzz' : '...';
  }
}

