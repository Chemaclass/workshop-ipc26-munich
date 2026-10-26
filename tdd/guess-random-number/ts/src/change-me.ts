import type { RandomNumberGenerator } from "./RandomNumberGenerator";

export class Game {

  private randomNumber: number = 0;
  private attempts = 3;

  constructor(generator: RandomNumberGenerator) {
    this.randomNumber = generator.generate();
  }

  guess(guess: number): string {
    if (this.attempts > 1) {
      this.attempts--;
      if (this.randomNumber === guess) return "you win";
      if (this.randomNumber > guess) return 'higher';
      return 'lower'
    } else {
      return `You lose! The number was ${this.randomNumber}`
    }
  }
}