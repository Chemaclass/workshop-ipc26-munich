import { ParrotType } from './parrot-type';

export class ParrotParent {

    constructor(
    private readonly type: number,
    private readonly numberOfCoconuts: number,
    private readonly voltage: number,
    private readonly isNailed: boolean,
  ) {}

    getSpeed(): number {
    switch (this.type) {
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
}