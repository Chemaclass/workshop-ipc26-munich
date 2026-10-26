import { describe, expect, it } from 'vitest';
import { labelAngle } from '../src/wheel-view';

describe('labelAngle', () => {
  it.each([
    [60, -30],
    [90, 0],
    [180, 90],
  ])('runs a label on the right half outwards: %i° → %i°', (middle, angle) => {
    expect(labelAngle(middle)).toBe(angle);
  });

  it.each([
    [200, -70],
    [270, 0],
    [300, 30],
  ])('turns a label on the left half upright: %i° → %i°', (middle, angle) => {
    expect(labelAngle(middle)).toBe(angle);
  });
});
