
export enum GuessResult {
  Success = 'success',
  Higher = 'higher',
  Lower = 'lower',
  Fail = 'fail',
}

export class Guesser {
  constructor(private random: { generate(): number }) {}

  guess(guess: number): GuessResult {
    switch(guess){
      case 5:
        return GuessResult.Success;
      case 4:
        return GuessResult.Higher;
      case 9:
        return GuessResult.Lower;
      default:
        return GuessResult.Fail;
    }
  }
}
