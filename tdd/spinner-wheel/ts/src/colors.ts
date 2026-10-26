const PALETTE_SIZE = 6;

export function segmentColor(index: number, count: number): number {
  const color = index % PALETTE_SIZE;
  const isLast = index === count - 1;

  // The last slice touches the first one across the top. If both would get
  // the first colour, take the second: it differs from both neighbours.
  if (isLast && count > 1 && color === 0) {
    return 1;
  }

  return color;
}
