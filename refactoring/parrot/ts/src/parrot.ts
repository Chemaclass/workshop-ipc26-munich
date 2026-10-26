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

export class Parrot {
  private baseSpeed = 12
  constructor(
    private readonly type: number,
    private readonly numberOfCoconuts: number,
    private readonly voltage: number,
    private readonly isNailed: boolean,
  ) {}

  getSpeed(): number {
    switch (this.type) {
      case ParrotType.European:
        return this.baseSpeed;
      case ParrotType.African:
        return Math.max(
          0,
          this.baseSpeed - AFRICAN_PARROT_LOAD_FACTOR * this.numberOfCoconuts,
        );
      case ParrotType.NorwegianBlue:
        return this.isNailed ? 0 : Math.min(24.0, this.voltage * this.baseSpeed);
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
}
