export class NumberGame {
  private storedValue: number | undefined;
  private numberGenerator = () => Math.ceil((Math.random() * 10))
  private attempts = 0
  private maxAttempts = 3

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
    if(this.attempts >= this.maxAttempts) {
      return `You lose! The number was ${this.storedValue}`
    }
    this.attempts++
    if (number < this.storedValue) return 'Lower';
    if (number > this.storedValue) return 'Higher'
    return 'You win!';
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
