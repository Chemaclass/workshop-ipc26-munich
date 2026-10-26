import { describe, expect, it } from 'vitest';
import { Guesser } from '../src/change-me';

export class TestGenerator {
  generate(): number {
    return 5;
  }
}

describe('Guesser', () => {
  it('win on first try', () => {
    const random = new TestGenerator();
  
    expect(new Guesser(random).guess(5)).toBe(true);
  });
});
