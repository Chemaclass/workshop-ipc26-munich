import { describe, expect, it } from 'vitest';
import { SpinnerWheel } from '../src/spinner-wheel';

describe('SpinnerWheel', () => {
  it('always selects the sole participant', () => {
    const wheel = new SpinnerWheel(() => 0.99);
    wheel.add('Anna');
    expect(wheel.spin()).toBe('Anna');
  });
  it('rejects duplicates regardless of case and surrounding whitespace', () => {
    const wheel = new SpinnerWheel(() => 0);
    wheel.add('Anna');
    expect(wheel.add('Anna')).toBe('Dieser Name ist bereits vorhanden.');
    expect(wheel.add(' ANNA ')).toBe('Dieser Name ist bereits vorhanden.');
    expect(wheel.names).toEqual(['Anna']);
  });
  it('trims surrounding whitespace while preserving the name', () => {
    const wheel = new SpinnerWheel(() => 0);
    wheel.add('  Anna Maria \t');
    expect(wheel.names).toEqual(['Anna Maria']);
  });
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
