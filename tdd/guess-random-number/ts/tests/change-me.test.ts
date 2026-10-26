import { describe, expect, it } from 'vitest';

import { Game } from '../src/change-me';
import { RandomNumberGenerator } from '../src/RandomNumberGenerator';

class MockRandomNumberGenerator extends RandomNumberGenerator {
  constructor(private random: number) {
    super()
  }
  generate(): number {
    return this.random;
  }
}

describe('Random number', () => {
  it('player guesses right', () => {
    const randomNumberGenerator = new MockRandomNumberGenerator(10);
    expect(new Game(randomNumberGenerator).guess(10)).toBe("you win");
  });

  it('hints higher and lower', () => {
    const randomNumberGenerator = new MockRandomNumberGenerator(7);
    const game = new Game(randomNumberGenerator)
    expect(game.guess(4)).toBe("higher");
    expect(game.guess(9)).toBe("lower");
  });

  it('fails after 3 attempts', () => {
    const randomNumberGenerator = new MockRandomNumberGenerator(5);
    const game = new Game(randomNumberGenerator)
    expect(game.guess(1)).toBe("higher");
    expect(game.guess(1)).toBe("higher");
    expect(game.guess(1)).toBe("You lose! The number was 5");
  })

    it('wins after 3 attempts', () => {
    const randomNumberGenerator = new MockRandomNumberGenerator(5);
    const game = new Game(randomNumberGenerator)
    expect(game.guess(1)).toBe("higher");
    expect(game.guess(1)).toBe("higher");
    expect(game.guess(5)).toBe("you win");
  })
});
