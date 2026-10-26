import {RndomGenerator} from "./mockRND"

export class Game {
  guess: number;
  answer: number;
  guesses: number;
  won: string

  constructor() {
    this.guess = 0;
    this.guesses = 0;
    this.answer = new RndomGenerator().getNumber();
    this.won = '';
  }

  makeGuess(guessedNumber: number) {
    this.guess = guessedNumber;
    if (this.guess === this.answer) {
      this.won = 'won';
    }
    this.guesses++;
    if (this.guesses >= 3) this.won = 'lost'
  }
}
