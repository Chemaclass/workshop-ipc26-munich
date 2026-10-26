import { describe, expect, it } from 'vitest';
import { Wheel } from '../src/wheel';

describe('Wheel', () => {
  it('picks the only name on a wheel with one name', () => {
    const random = () => 0;
    const wheel = new Wheel(['Anna'], random);

    expect(wheel.spin()).toBe('Anna');
  });

  it('lets the random source pick the second of two names', () => {
    const random = () => 0.99;
    const wheel = new Wheel(['Anna', 'Ben'], random);

    expect(wheel.spin()).toBe('Ben');
  });

  it('cannot spin without names', () => {
    const random = () => 0;
    const wheel = new Wheel([], random);

    expect(() => wheel.spin()).toThrow('The wheel has no names to pick from.');
  });
});
