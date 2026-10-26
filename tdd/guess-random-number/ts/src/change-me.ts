import type { RandomNumberGenerator } from "./RandomNumberGenerator";

export class Game {

  private randomNumber: number = 0;

  constructor(generator: RandomNumberGenerator) {
    this.randomNumber = generator.generate();
  }

  guess(guess: number): string {
    if (this.randomNumber === guess) return "you win";
    if (this.randomNumber > guess) return 'higher';
    return 'lower'
  }
}