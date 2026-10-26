import type { NameStore } from './wheel';

const KEY = 'spinner-wheel.names';

export class LocalStorageNameStore implements NameStore {
  constructor(private readonly storage: Pick<Storage, 'getItem' | 'setItem'>) {}

  load(): string[] | null {
    const saved = this.storage.getItem(KEY);
    return saved === null ? null : JSON.parse(saved);
  }

  save(names: readonly string[]): void {
    this.storage.setItem(KEY, JSON.stringify(names));
  }
}
