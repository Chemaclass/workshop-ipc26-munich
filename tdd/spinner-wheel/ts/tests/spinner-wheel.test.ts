import { describe, expect, it } from 'vitest';
import { SpinnerWheel } from '../src/spinner-wheel';

describe('SpinnerWheel', () => {
  it('starts with an empty participant list', () => {
    expect(new SpinnerWheel(() => 0).names).toEqual([]);
  });
});
