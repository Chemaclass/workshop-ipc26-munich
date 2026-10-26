import { describe, expect, it } from 'vitest';
import { Guesser, GuessResult, RandomGenerator, type IGenerator } from '../src/guesser';

export class TestGenerator implements IGenerator {
  constructor(private number: number) { }

  generate(): number {
    return this.number;
  }
}

describe('Guesser', () => {
  it('win on first try', () => {
    const random = new TestGenerator(5);

    expect(new Guesser(random).guess(5)).toBe(GuessResult.Success);
  });

  it('It gives a higher and lower hints', () => {
    const random = new TestGenerator(7);
    const guesser = new Guesser(random);
    expect(guesser.guess(4)).toBe(GuessResult.Higher);
    expect(guesser.guess(9)).toBe(GuessResult.Lower);
  });

  it('It wins on last attempt', () => {
    const random = new TestGenerator(7);
    const guesser = new Guesser(random);
    expect(guesser.guess(8)).toBe(GuessResult.Lower);
    expect(guesser.guess(2)).toBe(GuessResult.Higher);
    expect(guesser.guess(7)).toBe(GuessResult.Success);
  });
  
  it('lose after 3 wrong attempts', () => {
    const random = new TestGenerator(5);
    const guesser = new Guesser(random);
    expect(guesser.guess(8)).toBe(GuessResult.Lower);
    expect(guesser.guess(2)).toBe(GuessResult.Higher);
    expect(guesser.guess(7)).toBe(GuessResult.Fail);


  });
  
  it('Check that the range of numbers is 1-100', () => {
    let flag = false;
    for (let i = 0; i < 1000; i++) {
      const random = new RandomGenerator();
      const number = random.generate();
      if (number < 1 || number > 100) {
        flag = true;
        break;
      }
    }
    expect(flag).toBe(false);
  });
  
  
});
