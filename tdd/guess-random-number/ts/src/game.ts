import {RndomGenerator} from "./mockRND"

export class Game {
  guess: number;
  answer: number;
  guesses: number;
  won: string
  hint: string;

  constructor() {
    this.guess = 0;
    this.guesses = 0;
    this.answer = new RndomGenerator().getNumber();
    this.won = '';
    this.hint = '';
  }

  makeGuess(guessedNumber: number) {
    if (this.guesses >= 3) {
      this.hint = `Sorry, the game is over.`
      return;
    }
    this.guess = guessedNumber;
    if (this.guess === this.answer) {
      this.won = 'won';
      return;
    }
    if (this.guess > this.answer) {
      this.hint = `it's lower!`;
    } else {
      this.hint = `it's higher!`;
    }
    this.guesses++;
    if (this.guesses >= 3) this.won = 'lost'
  }
}
