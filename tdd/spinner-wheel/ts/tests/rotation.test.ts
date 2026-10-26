import { describe, expect, it } from 'vitest';
import { rotationToShow } from '../src/wheel-view';

describe('rotationToShow', () => {
  it.each([
    [0.5, 5 * 360 + 270],
    [0, 5 * 360 + 342],
    [1, 5 * 360 + 198],
  ])(
    'lands inside the segment, clear of its edges (landing %d)',
    (landing, rotation) => {
      expect(rotationToShow(0, 2, 0, landing)).toBeCloseTo(rotation);
    },
  );
});
