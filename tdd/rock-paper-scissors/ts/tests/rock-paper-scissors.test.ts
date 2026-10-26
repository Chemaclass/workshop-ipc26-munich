import { describe, expect, it } from 'vitest';
import { Scissors } from '../src/scissors';
import { Rock } from '../src/rock';
import { Paper } from '../src/paper';

describe('Rock paper scissors', () => {
  it('Rock beats scissors', () => {
    expect(new Rock().beats(new Scissors())).toBe(true);
  });

  it('Scissors loses to Rock', () => {
    expect(new Scissors().beats(new Rock())).toBe(false);
  });

  it('Paper beats Rock', () => {
    expect(new Paper().beats(new Rock())).toBe(true);
  });

  it('Rock loses to paper', () => {
    expect(new Rock().beats(new Paper())).toBe(false);
  });
});
