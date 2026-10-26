import { describe, expect, it } from 'vitest';
import { Rock, Scissors } from '../src/change-me';

describe('Rock paper scissors', () => {
  it('Rock beats scissors', () => {
    expect(new Rock().beats(new Scissors())).toBe(true);
  });
});
