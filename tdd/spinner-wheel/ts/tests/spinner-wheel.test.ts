import { describe, expect, it } from 'vitest';
import { SpinnerWheel } from '../src/spinner-wheel';

describe('SpinnerWheel', () => {
  it('rejects empty and whitespace-only names with a message', () => {
    const wheel = new SpinnerWheel(() => 0);
    expect(wheel.add('')).toBe('Bitte gib einen Namen ein.');
    expect(wheel.add(' \t ')).toBe('Bitte gib einen Namen ein.');
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
