import type { NameStore } from './wheel';

export class LocalStorageNameStore implements NameStore {
  constructor(private readonly storage: Pick<Storage, 'getItem' | 'setItem'>) {}

  load(): string[] | null {
    return null;
  }

  save(_names: readonly string[]): void {}
}
