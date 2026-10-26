export interface RandomSource {
  random(): number;
}

const alwaysFirst: RandomSource = { random: () => 0 };

export class Wheel {
  private readonly members: string[];

  constructor(
    names: string[],
    private readonly random: RandomSource = alwaysFirst,
  ) {
    this.members = [...names];
  }

  get names(): readonly string[] {
    return this.members;
  }

  add(name: string): void {
    this.members.push(name);
  }

  spin(): string {
    const index = Math.floor(this.random.random() * this.members.length);
    const picked = this.members[index];
    if (picked === undefined) {
      throw new Error('Add someone before you spin.');
    }
    return picked;
  }
}
