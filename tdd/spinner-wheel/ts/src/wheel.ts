export class Wheel {
  constructor(
    private readonly names: string[],
    private readonly random: () => number,
  ) {}

  spin(): string {
    if (this.names.length === 0) {
      throw new Error('The wheel has no names to pick from.');
    }

    const index = Math.floor(this.random() * this.names.length);

    return this.names[index] ?? '';
  }
}
