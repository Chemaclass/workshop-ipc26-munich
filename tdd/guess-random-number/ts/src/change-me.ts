import type { RandomNumberGenerator } from "./RandomNumberGenerator";

export class Game {

  private randomNumber: number = 0;
  private attempts = 0;

  constructor(generator: RandomNumberGenerator) {
    this.randomNumber = generator.generate();
  }

  guess(guess: number): string {
    if (this.attempts <= 2) {
      if (this.randomNumber === guess) return "you win";
      if (this.attempts === 2) return `You lose! The number was ${this.randomNumber}`
      this.attempts++;
      if (this.randomNumber > guess) return 'higher';
      if (this.randomNumber < guess) return 'lower'

    }
    return `You lose! The number was ${this.randomNumber}`

  }
}