import {RndomGenerator} from "./mockRND"

export class Game {
  guess: number;
  answer: number;
  constructor() {
    this.guess = 0;
    this.answer = new RndomGenerator().getNumber();
  }
}
