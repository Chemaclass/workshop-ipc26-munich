export class NewNumberGame {
  private readonly number: number;

  constructor(numberGenerator: () => number) {}

  generateNumber() {
    return this.numberGenerator();
  }

  guess(number: Number): string {
    if (number < this.number) return 'LOWER';
    throw new Error('not implemented');
  }
}
