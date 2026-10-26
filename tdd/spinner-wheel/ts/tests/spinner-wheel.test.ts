import { describe, expect, it } from 'vitest';
import { SpinnerWheel } from '../src/spinner-wheel';

describe('SpinnerWheel', () => {
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
