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

  spin(names: string[], lastWinner: string | null = null): SpinResult {
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

    const pool =
      lastWinner !== null && names.includes(lastWinner)
        ? names.filter((name) => name !== lastWinner)
        : names;
    const index = this.random.next() % pool.length;

    return {
      pick: pool[index] ?? null,
      warning: null,
      names,
    };
  }
}
