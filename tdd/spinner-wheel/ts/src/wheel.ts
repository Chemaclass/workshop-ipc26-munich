export class Wheel {
  constructor(private readonly names: string[]) {}

  spin(): string {
    throw new Error('Add someone before you spin.');
  }
}
