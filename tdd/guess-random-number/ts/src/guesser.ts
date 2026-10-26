
export enum GuessResult {
  Success = 'you win',
  Higher = 'higher',
  Lower = 'lower',
  Fail = 'fail',
}
export interface IGenerator {
  generate(): number;
}
export class RandomGenerator implements IGenerator {

  generate(): number {
    return Math.floor(Math.random() * 100) + 1;
  }
}

export class Guesser {
  private randomNumber: number;
  private attempts: number = 0;
  private maxAttempts: number = 3;

  constructor(private randomGenerator: { generate(): number }) {
    this.randomNumber = randomGenerator.generate();
  }

  guess(guess: number): GuessResult {
    this.attempts++;

    if (guess === this.randomNumber) {
      return GuessResult.Success;
    }

    if (this.attempts >= this.maxAttempts) {
      return GuessResult.Fail;
    }

    if (guess < this.randomNumber) {
      return GuessResult.Higher;

    }

    return GuessResult.Lower;


  }
}
