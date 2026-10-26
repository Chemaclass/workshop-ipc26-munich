export class Wheel {
  constructor(private readonly names: string[]) {}

  spin(): string {
    const [first] = this.names;
    if (first === undefined) {
      throw new Error('Add someone before you spin.');
    }
    return first;
  }
}
