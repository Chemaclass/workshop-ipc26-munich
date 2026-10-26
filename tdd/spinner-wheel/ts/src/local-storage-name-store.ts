import type { NameStore } from './wheel';

const KEY = 'spinner-wheel.names';
const LAST_WINNER_KEY = 'spinner-wheel.last-winner';

export class LocalStorageNameStore implements NameStore {
  constructor(private readonly storage: Pick<Storage, 'getItem' | 'setItem'>) {}

  load(): string[] | null {
    const saved = this.storage.getItem(KEY);
    return saved === null ? null : JSON.parse(saved);
  }

  save(names: readonly string[]): void {
    this.storage.setItem(KEY, JSON.stringify(names));
  }

  loadLastWinner(): string | null {
    return this.storage.getItem(LAST_WINNER_KEY);
  }

  saveLastWinner(name: string): void {
    this.storage.setItem(LAST_WINNER_KEY, name);
  }
}
