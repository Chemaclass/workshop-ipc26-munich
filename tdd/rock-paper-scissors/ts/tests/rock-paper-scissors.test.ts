import { describe, expect, it } from 'vitest';
import { Scissors } from '../src/scissors';
import { Rock } from '../src/rock';
import { Paper } from '../src/paper';

describe('Rock paper scissors', () => {
  it('Rock beats scissors', () => {
    expect(new Rock().beats(new Scissors())).toBe('WINNER');
  });

  it('Scissors loses to Rock', () => {
    expect(new Scissors().beats(new Rock())).toBe('LOSER');
  });

  it('Paper beats Rock', () => {
    expect(new Paper().beats(new Rock())).toBe('WINNER');
  });

  it('Rock loses to paper', () => {
    expect(new Rock().beats(new Paper())).toBe('LOSER');
  });

  it('Scissors beats Paper', () => {
    expect(new Scissors().beats(new Paper())).toBe('WINNER');
  })

  it('Paper loses to Scissors', () => {
    expect(new Paper().beats(new Scissors())).toBe('LOSER');
  })
});
