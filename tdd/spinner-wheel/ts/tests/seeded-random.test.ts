import { describe, expect, it } from 'vitest';
import { SeededRandom } from '../src/seeded-random';

describe('SeededRandom', () => {
  it('repeats the same numbers for the same seed', () => {
    const first = new SeededRandom(42);
    const second = new SeededRandom(42);

    expect([first.random(), first.random(), first.random()]).toEqual([
      second.random(),
      second.random(),
      second.random(),
    ]);
  });

  it('gives different numbers for different seeds', () => {
    expect(new SeededRandom(1).random()).not.toBe(new SeededRandom(2).random());
  });

  it('spreads its numbers between 0 and 1', () => {
    const random = new SeededRandom(7);
    const numbers = Array.from({ length: 100 }, () => random.random());

    expect(new Set(numbers).size).toBe(100);
    expect(Math.min(...numbers)).toBeGreaterThanOrEqual(0);
    expect(Math.max(...numbers)).toBeLessThan(1);
  });
});
