
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
    return Math.floor(Math.random() * 10) + 1;
  }}

export class Guesser {
  private randomNumber: number;
  constructor(private randomGenerator: { generate(): number }) {
    this.randomNumber = randomGenerator.generate();
  }

  guess(guess: number): GuessResult {
    if (guess === this.randomNumber) {
      return GuessResult.Success;
    } else if (guess < this.randomNumber) {
      return GuessResult.Higher;
    } else {
      return GuessResult.Lower;
    }

  }
}
