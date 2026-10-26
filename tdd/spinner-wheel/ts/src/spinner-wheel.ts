export class SpinnerWheel {
  readonly names: string[] = [];
  private previousWinner: string | null = null;
  constructor(private readonly random: () => number) {}

  remove(name: string): void {
    const index = this.names.indexOf(name);
    if (index !== -1) this.names.splice(index, 1);
  }

  spin(): string | null {
    if (this.previousWinner !== null) this.remove(this.previousWinner);
    this.previousWinner = null;
    if (this.names.length === 0) return null;
    this.previousWinner =
      this.names[Math.floor(this.random() * this.names.length)] ?? null;
    return this.previousWinner;
  }

  add(name: string): string | null {
    if (!name.trim()) return 'Please enter a name.';
    if (
      this.names.some(
        (existing) => existing.toLowerCase() === name.trim().toLowerCase(),
      )
    ) {
      return 'This name is already on the wheel.';
    }
    this.names.push(name.trim());
    return null;
  }
}
