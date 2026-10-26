import { describe, expect, it } from 'vitest';
import { segmentAngle, spinRotation, targetRotation } from '../src/geometry';

describe('segmentAngle', () => {
  it('splits the full circle evenly between the names', () => {
    expect(segmentAngle(4)).toBe(90);
  });
});

describe('targetRotation', () => {
  it('turns the centre of the winner segment to the pointer on top', () => {
    expect(targetRotation(1, 4)).toBe(225);
  });
});

describe('spinRotation', () => {
  it('adds five full turns before landing on the winner', () => {
    const atRest = 0;

    expect(spinRotation(atRest, 1, 4)).toBe(5 * 360 + 225);
  });

  it('turns forward from the current rotation when spinning again', () => {
    const afterFirstSpin = 5 * 360 + 225;

    expect(spinRotation(afterFirstSpin, 3, 4)).toBe(
      afterFirstSpin + 5 * 360 + 180,
    );
  });
});
