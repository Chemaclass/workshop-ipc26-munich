export interface RandomSource {
  random(): number;
}

export interface NameStore {
  load(): string[] | null;
  save(names: readonly string[]): void;
}

export const EXAMPLE_NAMES: readonly string[] = [
  'Anna K.',
  'Ben',
  'Chema',
  'Dana',
  'Emil',
  'Fatma',
];

const alwaysFirst: RandomSource = { random: () => 0 };

const nowhere: NameStore = { load: () => null, save: () => {} };

export class Wheel {
  private readonly members: string[];

  static load(store: NameStore): Wheel {
    return new Wheel(store.load() ?? [...EXAMPLE_NAMES], alwaysFirst, store);
  }

  constructor(
    names: string[],
    private readonly random: RandomSource = alwaysFirst,
    private readonly store: NameStore = nowhere,
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
    this.store.save(this.members);
  }

  remove(name: string): void {
    const index = this.members.indexOf(name);
    if (index === -1) {
      throw new Error(`${name} is not on the wheel.`);
    }
    this.members.splice(index, 1);
    this.store.save(this.members);
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
