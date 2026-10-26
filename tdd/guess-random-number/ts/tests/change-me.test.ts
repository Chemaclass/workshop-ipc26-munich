import { describe, expect, it } from 'vitest';
import { ChangeMe } from '../src/change-me';

describe('Random number', () => {
  it('player guesses right', () => {
    expect(new Game().guess(10)).toBe("you win");
  });
});
