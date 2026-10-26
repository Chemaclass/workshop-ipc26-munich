import { describe, expect, it } from 'vitest';
import { SpinnerWheel } from '../src/spinner-wheel';

describe('SpinnerWheel', () => {
  it('gives equal intervals to all participants and allows repeated winners', () => {
    const values = [0, 0.333333, 1 / 3, 0.666666, 2 / 3, 0.999999, 0.999999];
    const wheel = new SpinnerWheel(() => values.shift() ?? 0);
    wheel.add('Anna');
    wheel.add('Ben');
    wheel.add('Clara');
    expect(Array.from({ length: 7 }, () => wheel.spin())).toEqual([
      'Anna',
      'Anna',
      'Ben',
      'Ben',
      'Clara',
      'Clara',
      'Clara',
    ]);
    expect(wheel.names).toEqual(['Anna', 'Ben', 'Clara']);
  });
  it('always selects the sole participant', () => {
    const wheel = new SpinnerWheel(() => 0.99);
    wheel.add('Anna');
    expect(wheel.spin()).toBe('Anna');
  });
  it('rejects duplicates regardless of case and surrounding whitespace', () => {
    const wheel = new SpinnerWheel(() => 0);
    wheel.add('Anna');
    expect(wheel.add('Anna')).toBe('This name is already on the wheel.');
    expect(wheel.add(' ANNA ')).toBe('This name is already on the wheel.');
    expect(wheel.names).toEqual(['Anna']);
  });
  it('trims surrounding whitespace while preserving the name', () => {
    const wheel = new SpinnerWheel(() => 0);
    wheel.add('  Anna Maria \t');
    expect(wheel.names).toEqual(['Anna Maria']);
  });
  it('rejects empty and whitespace-only names with a message', () => {
    const wheel = new SpinnerWheel(() => 0);
    expect(wheel.add('')).toBe('Please enter a name.');
    expect(wheel.add(' \t ')).toBe('Please enter a name.');
    expect(wheel.names).toEqual([]);
  });
  it('starts with an empty participant list', () => {
    expect(new SpinnerWheel(() => 0).names).toEqual([]);
  });

  it('adds participants in order', () => {
    const wheel = new SpinnerWheel(() => 0);
    wheel.add('Anna');
    wheel.add('Ben');
    expect(wheel.names).toEqual(['Anna', 'Ben']);
  });
});
