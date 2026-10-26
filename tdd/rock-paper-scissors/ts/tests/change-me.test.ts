import { describe, expect, it } from 'vitest';
import { Scissors } from '../src/scissors';
import { Rock } from '../src/rock';

describe('Rock paper scissors', () => {
  it('Rock beats scissors', () => {
    expect(new Rock().beats(new Scissors())).toBe(true);
  });
});
