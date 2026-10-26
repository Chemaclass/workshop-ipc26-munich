import { describe, expect, it } from 'vitest';
import { SpinnerWheel } from '../src/spinner-wheel';

describe('SpinnerWheel', () => {
  it('draws each participant once, then empties without consuming more randomness', () => {
    let draws = 0;
    const wheel = new SpinnerWheel(() => {
      draws += 1;
      return 0.99;
    });
    wheel.add('Anna');
    wheel.add('Ben');
    wheel.add('Clara');
    expect(wheel.spin()).toBe('Clara');
    expect(wheel.names).toEqual(['Anna', 'Ben', 'Clara']);
    expect(wheel.spin()).toBe('Ben');
    expect(wheel.names).toEqual(['Anna', 'Ben']);
    expect(wheel.spin()).toBe('Anna');
    expect(wheel.names).toEqual(['Anna']);
    expect(wheel.spin()).toBeNull();
    expect(wheel.names).toEqual([]);
    expect(wheel.spin()).toBeNull();
    expect(draws).toBe(3);
  });
  it('gives equal intervals to all participants on the first draw', () => {
    const values = [0, 0.333333, 1 / 3, 0.666666, 2 / 3, 0.999999, 0.999999];
    const selections = values.map((value) => {
      const wheel = new SpinnerWheel(() => value);
      wheel.add('Anna');
      wheel.add('Ben');
      wheel.add('Clara');
      return wheel.spin();
    });
    expect(selections).toEqual([
      'Anna',
      'Anna',
      'Ben',
      'Ben',
      'Clara',
      'Clara',
      'Clara',
    ]);
  });
  it('keeps the winner visible and removes them only when the next draw starts', () => {
    const wheel = new SpinnerWheel(() => 0);
    wheel.add('Anna');
    wheel.add('Ben');
    wheel.add('Clara');
    expect(wheel.spin()).toBe('Anna');
    expect(wheel.names).toEqual(['Anna', 'Ben', 'Clara']);
    expect(wheel.spin()).toBe('Ben');
    expect(wheel.names).toEqual(['Ben', 'Clara']);
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
