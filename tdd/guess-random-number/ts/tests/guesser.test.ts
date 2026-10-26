import { describe, expect, it } from 'vitest';
import { Guesser } from '../src/guesser';

export class TestGenerator {
  constructor(private number: number) { }

  generate(): number {
    return this.number;
  }
}

describe('Guesser', () => {
  it('win on first try', () => {
    const random = new TestGenerator(5);

    expect(new Guesser(random).guess(5)).toBe('success');
  });

  it('It gives a higher and lower hints', () => {
    const random = new TestGenerator(7);
    const guesser = new Guesser(random);
    expect(guesser.guess(4)).toBe('higher');
    expect(guesser.guess(9)).toBe('lower');
  });
});
