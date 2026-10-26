export interface RandomSource {
  random(): number;
}

export interface NameStore {
  load(): string[] | null;
  save(names: readonly string[]): void;
  loadLastWinner(): string | null;
  saveLastWinner(name: string): void;
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

const nowhere: NameStore = {
  load: () => null,
  save: () => {},
  loadLastWinner: () => null,
  saveLastWinner: () => {},
};

export class Wheel {
  private readonly members: string[];

  static load(store: NameStore, random: RandomSource = alwaysFirst): Wheel {
    return new Wheel(store.load() ?? [...EXAMPLE_NAMES], random, store);
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

  spin(random: RandomSource = this.random): string {
    const lastWinner = this.store.loadLastWinner();
    const candidates = this.members.filter((name) => name !== lastWinner);
    const pool = candidates.length > 0 ? candidates : this.members;
    const index = Math.floor(random.random() * pool.length);
    const picked = pool[index];
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
