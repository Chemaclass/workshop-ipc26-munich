import { afterEach, describe, expect, it, vi } from 'vitest';
import { pickRandomName } from '../src/random-name';

describe('pickRandomName', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns the name selected by the random value', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.75);

    expect(pickRandomName(['Ada', 'Grace'])).toBe('Grace');
  });
});
