import { describe, expect, it } from 'vitest';
import { Game } from '../src/change-me';
import { RandomNumberGenerator } from '../src/RandomNumberGenerator';

class MockRandomNumberGenerator extends RandomNumberGenerator {
  generate(): number {
    return 10;
  }
}

describe('Random number', () => {
  it('player guesses right', () => {

    const randomNumberGenerator = new MockRandomNumberGenerator();

    expect(new Game(randomNumberGenerator).guess(10)).toBe("you win");
  });
});
