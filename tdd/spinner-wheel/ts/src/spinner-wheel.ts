export type SpinResult = {
  pick: string | null;
  warning: string | null;
  names: string[];
};

export type RandomSource = {
  next: () => number;
};

export class SpinnerWheel {
  constructor(private readonly random: RandomSource) {}

  spin(names: string[]): SpinResult {
    if (names.length < 2) {
      return {
        pick: null,
        warning: 'Need at least two unique names',
        names,
      };
    }

    if (new Set(names).size !== names.length) {
      return {
        pick: null,
        warning: 'Duplicate names are not allowed',
        names,
      };
    }

    const index = this.random.next() % names.length;

    return {
      pick: names[index] ?? null,
      warning: null,
      names,
    };
  }
}
