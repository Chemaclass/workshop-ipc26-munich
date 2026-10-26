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
});
