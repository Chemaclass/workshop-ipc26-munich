export interface RandomSource {
  random(): number;
}

const alwaysFirst: RandomSource = { random: () => 0 };

export class Wheel {
  constructor(
    private readonly names: string[],
    private readonly random: RandomSource = alwaysFirst,
  ) {}

  spin(): string {
    const index = Math.floor(this.random.random() * this.names.length);
    const picked = this.names[index];
    if (picked === undefined) {
      throw new Error('Add someone before you spin.');
    }
    return picked;
  }
}
