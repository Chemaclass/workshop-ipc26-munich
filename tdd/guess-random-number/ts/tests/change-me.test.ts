import { describe, expect, it } from 'vitest';
import { ChangeMe } from '../src/change-me';

describe('Guessing Game', () => {
  it('guesses the number correctly', () => {
    const game = new Game()
    game.guess = 1
    game.answer = 1
    expect(game.guess).toBe(game.answer);
  });
});
