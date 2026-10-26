import { describe, expect, it } from 'vitest';
import { Wheel } from '../src/wheel';

describe('Wheel', () => {
  it('throws when spinning an empty wheel', () => {
    expect(() => new Wheel([]).spin()).toThrow('Add someone before you spin.');
  });

  it('always picks the only person on the wheel', () => {
    expect(new Wheel(['Anna K.']).spin()).toBe('Anna K.');
  });

  it('lets the random source decide who is picked', () => {
    const random = { random: () => 0.5 };

    expect(new Wheel(['Anna K.', 'Ben'], random).spin()).toBe('Ben');
  });
});
