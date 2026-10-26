import { describe, expect, it } from 'vitest';
import { segmentColor } from '../src/colors';

function colorsFor(count: number): number[] {
  return Array.from({ length: count }, (_, index) =>
    segmentColor(index, count),
  );
}

describe('segmentColor', () => {
  it('cycles through the six colours of the palette', () => {
    expect(colorsFor(12)).toEqual([0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5]);
  });

  it('never gives neighbours the same colour, also across the top', () => {
    for (let count = 2; count <= 30; count++) {
      const colors = colorsFor(count);
      const clashes = colors.filter(
        (color, index) => color === colors[(index + 1) % count],
      );

      expect(clashes, `${count} names`).toEqual([]);
    }
  });
});
