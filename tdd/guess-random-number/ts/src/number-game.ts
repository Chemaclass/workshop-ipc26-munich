export class NumberGame {
  private storedValue: number | undefined;
  private numberGenerator = () => Math.ceil((Math.random() * 10))
  

  init() {
    this.storedValue = this.numberGenerator();
  }

  setNumberGenerator(generator: () => number) {
    this.numberGenerator = generator
  }

  guess(number: number): string {
    if(this.storedValue === undefined) {
      throw new Error('number not initialized')
    }
    if (number < this.storedValue) return 'LOWER';
    throw new Error('not implemented');
  }
}

export class NumberGameTestingService {
  static getNumberGameWithSetResultNumber(value: number) {
    const fakeNumberGenerator = () => value
    const game = new NumberGame()
    game.setNumberGenerator(fakeNumberGenerator)
    return game
  }
}
