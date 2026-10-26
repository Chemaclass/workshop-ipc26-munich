import { describe, expect, it } from 'vitest';
import { EXAMPLE_NAMES, type NameStore, Wheel } from '../src/wheel';

describe('Wheel', () => {
  it('throws when spinning an empty wheel', () => {
    expect(() => new Wheel([]).spin()).toThrow('Add someone before you spin.');
  });

  it('always picks the only person on the wheel', () => {
    expect(new Wheel(['Anna K.']).spin()).toBe('Anna K.');
  });

  it('lets the random source decide who is picked', () => {
    const random = { random: () => 0.5 };

    expect(new Wheel(['Anna K.', 'Ben'], random).spin()).toBe('Ben');
  });

  it('spins with a random source given for this spin only', () => {
    const wheel = new Wheel(['Anna K.', 'Ben'], { random: () => 0 });

    expect(wheel.spin({ random: () => 0.5 })).toBe('Ben');
    expect(wheel.spin()).toBe('Anna K.');
  });

  it('puts an added name on the wheel', () => {
    const wheel = new Wheel(['Anna K.']);

    wheel.add('Ben');

    expect(wheel.names).toEqual(['Anna K.', 'Ben']);
  });

  it.each(['', '   '])('rejects the blank name "%s"', (blank) => {
    const wheel = new Wheel(['Anna K.']);

    expect(() => wheel.add(blank)).toThrow('Enter a name first.');
    expect(wheel.names).toEqual(['Anna K.']);
  });

  it('rejects a name that is already on the wheel', () => {
    const wheel = new Wheel(['Anna K.']);

    expect(() => wheel.add('Anna K.')).toThrow(
      'Anna K. is already on the wheel. Add a last initial to tell them apart.',
    );
    expect(wheel.names).toEqual(['Anna K.']);
  });

  it('rejects a duplicate name in a different case', () => {
    const wheel = new Wheel(['Anna K.']);

    expect(() => wheel.add(' anna k. ')).toThrow(
      'anna k. is already on the wheel. Add a last initial to tell them apart.',
    );
    expect(wheel.names).toEqual(['Anna K.']);
  });

  it('takes a removed name off the wheel', () => {
    const wheel = new Wheel(['Anna K.', 'Ben', 'Chema']);

    wheel.remove('Ben');

    expect(wheel.names).toEqual(['Anna K.', 'Chema']);
  });

  it('throws when removing a name that is not on the wheel', () => {
    const wheel = new Wheel(['Anna K.', 'Ben']);

    expect(() => wheel.remove('Dana')).toThrow('Dana is not on the wheel.');
    expect(wheel.names).toEqual(['Anna K.', 'Ben']);
  });

  describe('with a name store', () => {
    it('starts with example names when nothing is saved', () => {
      const wheel = Wheel.load(new InMemoryNameStore());

      expect(wheel.names).toEqual(EXAMPLE_NAMES);
    });

    it('starts with the saved names', () => {
      const wheel = Wheel.load(new InMemoryNameStore(['Gus', 'Hana']));

      expect(wheel.names).toEqual(['Gus', 'Hana']);
    });

    it('saves the names after adding one', () => {
      const store = new InMemoryNameStore(['Gus']);

      Wheel.load(store).add('Hana');

      expect(store.saved).toEqual(['Gus', 'Hana']);
    });

    it('saves the names after removing one', () => {
      const store = new InMemoryNameStore(['Gus', 'Hana']);

      Wheel.load(store).remove('Gus');

      expect(store.saved).toEqual(['Hana']);
    });

    it('lets the random source pick from the loaded names', () => {
      const random = { random: () => 0.5 };
      const wheel = Wheel.load(new InMemoryNameStore(['Gus', 'Hana']), random);

      expect(wheel.spin()).toBe('Hana');
    });

    it('never picks the previous winner', () => {
      const store = new InMemoryNameStore(['Gus', 'Hana'], 'Gus');

      expect(Wheel.load(store, { random: () => 0 }).spin()).toBe('Hana');
    });

    it('picks the previous winner when nobody else is on the wheel', () => {
      const store = new InMemoryNameStore(['Gus'], 'Gus');

      expect(Wheel.load(store).spin()).toBe('Gus');
    });

    it('remembers the winner for the next spin', () => {
      const store = new InMemoryNameStore(['Gus', 'Hana']);

      Wheel.load(store, { random: () => 0.5 }).spin();

      expect(store.lastWinner).toBe('Hana');
    });
  });
});

class InMemoryNameStore implements NameStore {
  constructor(
    public saved: string[] | null = null,
    public lastWinner: string | null = null,
  ) {}

  load(): string[] | null {
    return this.saved;
  }

  save(names: readonly string[]): void {
    this.saved = [...names];
  }

  loadLastWinner(): string | null {
    return this.lastWinner;
  }

  saveLastWinner(name: string): void {
    this.lastWinner = name;
  }
}
