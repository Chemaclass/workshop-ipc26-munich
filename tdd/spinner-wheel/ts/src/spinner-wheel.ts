export class SpinnerWheel {
  readonly names: string[] = [];
  constructor(private readonly random: () => number) {}

  remove(name: string): void {
    const index = this.names.indexOf(name);
    if (index !== -1) this.names.splice(index, 1);
  }

  spin(): string | null {
    if (this.names.length === 0) return null;
    return this.names[Math.floor(this.random() * this.names.length)] ?? null;
  }

  add(name: string): string | null {
    if (!name.trim()) return 'Bitte gib einen Namen ein.';
    if (this.names.some((existing) => existing.toLowerCase() === name.trim().toLowerCase())) {
      return 'Dieser Name ist bereits vorhanden.';
    }
    this.names.push(name.trim());
    return null;
  }
}
