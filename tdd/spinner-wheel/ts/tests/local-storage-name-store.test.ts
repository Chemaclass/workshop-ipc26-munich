import { describe, expect, it } from 'vitest';
import { LocalStorageNameStore } from '../src/local-storage-name-store';

describe('LocalStorageNameStore', () => {
  it('loads nothing when nothing is saved', () => {
    expect(new LocalStorageNameStore(new FakeStorage()).load()).toBeNull();
  });

  it('loads the saved names after a reload', () => {
    const storage = new FakeStorage();

    new LocalStorageNameStore(storage).save(['Gus', 'Hana']);

    expect(new LocalStorageNameStore(storage).load()).toEqual(['Gus', 'Hana']);
  });
});

class FakeStorage {
  private readonly items = new Map<string, string>();

  getItem(key: string): string | null {
    return this.items.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    this.items.set(key, value);
  }
}
