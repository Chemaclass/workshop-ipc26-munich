import { describe, expect, it } from 'vitest';
import { ChangeMe } from '../src/change-me';

describe('Number Guessing Game', () => {
  it('changes me', () => {
    const fakeNumberGenerator = (): number => 10;
    expect(new NewNumberGame(fakeNumberGenerator).guess(5)).toBe('LOWER');
  });
});
