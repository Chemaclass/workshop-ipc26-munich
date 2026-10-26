import {RndomGenerator} from "./mockRND"

export class Game {
  guess: number;
  answer: number;
  guesses: number;

  constructor() {
    this.guess = 0;
    this.guesses = 0;
    this.answer = new RndomGenerator().getNumber();
  }

  makeGuess(guessedNumber: number) {
    this.guess = guessedNumber;
    this.guesses++;
  }
}
