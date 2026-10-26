export class SpinnerWheel {
  readonly names: string[] = [];
  constructor(private readonly random: () => number) {}

  add(name: string): string | null {
    if (!name.trim()) return 'Bitte gib einen Namen ein.';
    this.names.push(name);
    return null;
  }
}
