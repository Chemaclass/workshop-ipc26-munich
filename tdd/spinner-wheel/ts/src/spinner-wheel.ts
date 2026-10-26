export class SpinnerWheel {
  readonly names: string[] = [];
  constructor(private readonly random: () => number) {}

  add(name: string): string | null {
    this.names.push(name);
    return null;
  }
}
