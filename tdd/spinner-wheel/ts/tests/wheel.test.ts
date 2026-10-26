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

  it('puts an added name on the wheel', () => {
    const wheel = new Wheel(['Anna K.']);

    wheel.add('Ben');

    expect(wheel.names).toEqual(['Anna K.', 'Ben']);
  });

  it.each(['', '   '])('rejects the blank name "%s"', (blank) => {
    const wheel = new Wheel(['Anna K.']);

    expect(() => wheel.add(blank)).toThrow('Enter a name first.');
    expect(wheel.names).toEqual(['Anna K.']);
  });

  it('rejects a name that is already on the wheel', () => {
    const wheel = new Wheel(['Anna K.']);

    expect(() => wheel.add('Anna K.')).toThrow(
      'Anna K. is already on the wheel. Add a last initial to tell them apart.',
    );
    expect(wheel.names).toEqual(['Anna K.']);
  });
});
