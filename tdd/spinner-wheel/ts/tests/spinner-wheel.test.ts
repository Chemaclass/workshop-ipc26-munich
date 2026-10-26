import { describe, expect, it } from 'vitest';
import { SpinnerWheel } from '../src/spinner-wheel';

const fixedRandom = (value: number) => ({
  next: () => value,
});

describe('SpinnerWheel', () => {
  it('warns and does not pick when the list is empty', () => {
    const wheel = new SpinnerWheel(fixedRandom(0));
    const result = wheel.spin([]);

    expect(result.pick).toBeNull();
    expect(result.warning).toBe('Need at least two unique names');
    expect(result.names).toEqual([]);
  });

  it('warns and does not pick when there is only one name', () => {
    const wheel = new SpinnerWheel(fixedRandom(0));
    const result = wheel.spin(['Ada']);

    expect(result.pick).toBeNull();
    expect(result.warning).toBe('Need at least two unique names');
    expect(result.names).toEqual(['Ada']);
  });

  it('warns and does not pick when names are duplicated', () => {
    const wheel = new SpinnerWheel(fixedRandom(0));
    const result = wheel.spin(['Ada', 'Bea', 'Ada']);

    expect(result.pick).toBeNull();
    expect(result.warning).toBe('Duplicate names are not allowed');
    expect(result.names).toEqual(['Ada', 'Bea', 'Ada']);
  });

  it('picks the person selected by the random value', () => {
    const wheel = new SpinnerWheel(fixedRandom(1));
    const result = wheel.spin(['Ada', 'Bea']);

    expect(result.pick).toBe('Bea');
    expect(result.warning).toBeNull();
    expect(result.names).toEqual(['Ada', 'Bea']);
  });

  it('picks a different person when the random value changes', () => {
    const wheel = new SpinnerWheel(fixedRandom(0));
    const result = wheel.spin(['Ada', 'Bea']);

    expect(result.pick).toBe('Ada');
    expect(result.warning).toBeNull();
    expect(result.names).toEqual(['Ada', 'Bea']);
  });

  it('does not pick the last winner again', () => {
    const wheel = new SpinnerWheel(fixedRandom(0));
    const result = wheel.spin(['Ada', 'Bea'], 'Ada');

    expect(result.pick).toBe('Bea');
    expect(result.warning).toBeNull();
    expect(result.names).toEqual(['Ada', 'Bea']);
  });

  it('ignores a last winner who is not in the list', () => {
    const wheel = new SpinnerWheel(fixedRandom(0));
    const result = wheel.spin(['Ada', 'Bea', 'Cam'], 'Zoe');

    expect(result.pick).toBe('Ada');
    expect(result.warning).toBeNull();
    expect(result.names).toEqual(['Ada', 'Bea', 'Cam']);
  });
});
