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
    const trimmed = name.trim();
    if (trimmed === '') {
      throw new Error('Enter a name first.');
    }
    if (this.has(trimmed)) {
      throw new Error(
        `${trimmed} is already on the wheel. Add a last initial to tell them apart.`,
      );
    }
    this.members.push(trimmed);
  }

  remove(name: string): void {
    this.members.splice(this.members.indexOf(name), 1);
  }

  spin(): string {
    const index = Math.floor(this.random.random() * this.members.length);
    const picked = this.members[index];
    if (picked === undefined) {
      throw new Error('Add someone before you spin.');
    }
    return picked;
  }

  private has(name: string): boolean {
    const wanted = name.toLowerCase();
    return this.members.some((member) => member.toLowerCase() === wanted);
  }
}
