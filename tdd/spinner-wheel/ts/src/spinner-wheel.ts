export class SpinnerWheel {
  readonly names: string[] = [];
  constructor(private readonly random: () => number) {}

  spin(): string | null {
    return this.names[0] ?? null;
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
