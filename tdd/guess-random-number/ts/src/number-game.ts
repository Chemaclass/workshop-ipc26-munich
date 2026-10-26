type GuessingResponses = 'Lower' | 'Higher' | 'You win!' | {message: 'You lose!', correctNumber: number}

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

  guess(guessedNumber: number): GuessingResponses {
    if(this.storedValue === undefined) {
      throw new Error('number not initialized')
    }
    this.attempts++
    if((this.attempts === this.maxAttempts && guessedNumber !== this.storedValue) || this.attempts > this.maxAttempts) {
      return {message: 'You lose!', correctNumber: this.storedValue}
    }
    if (guessedNumber < this.storedValue) return 'Higher';
    if (guessedNumber > this.storedValue) return 'Lower'
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
