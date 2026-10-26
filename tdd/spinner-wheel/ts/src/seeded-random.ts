import type { RandomSource } from './wheel';

export class SeededRandom implements RandomSource {
  constructor(private readonly seed: number) {}

  random(): number {
    return 0;
  }
}
