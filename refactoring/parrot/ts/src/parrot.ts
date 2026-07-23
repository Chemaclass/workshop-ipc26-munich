import { ParrotType } from './parrot-type';

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
        return this.getBaseSpeed();
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
        return 'Sqoork!';
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
