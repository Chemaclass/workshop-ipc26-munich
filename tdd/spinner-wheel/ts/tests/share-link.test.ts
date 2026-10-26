import { describe, expect, it } from 'vitest';
import { decodeShare, encodeShare, sharedStore } from '../src/share-link';
import { Wheel } from '../src/wheel';

describe('share link', () => {
  it('decodes the names and seed it encoded', () => {
    const shared = { names: ['Anna K.', 'Ben'], seed: 42 };

    expect(decodeShare(encodeShare(shared))).toEqual(shared);
  });

  it('decodes a skipped name it encoded', () => {
    const shared = { names: ['Anna K.', 'Ben'], seed: 42, skip: 'Ben' };

    expect(decodeShare(encodeShare(shared))).toEqual(shared);
  });

  it('encodes the JSON as base64', () => {
    expect(encodeShare({ names: ['Ben'], seed: 42 })).toBe(
      'eyJuYW1lcyI6WyJCZW4iXSwic2VlZCI6NDJ9',
    );
  });

  it('encodes umlauts as UTF-8', () => {
    const shared = { names: ['Jörg'], seed: 7 };

    expect(encodeShare(shared)).toBe(
      'eyJuYW1lcyI6WyJKw7ZyZyJdLCJzZWVkIjo3fQ==',
    );
    expect(decodeShare(encodeShare(shared))).toEqual(shared);
  });

  it.each([
    ['not base64', '%%%'],
    ['not JSON', 'aGVsbG8='],
    ['no seed', 'eyJuYW1lcyI6WyJCZW4iXX0='],
    ['names not a list', 'eyJuYW1lcyI6IkJlbiIsInNlZWQiOjF9'],
    ['a name not text', 'eyJuYW1lcyI6WzFdLCJzZWVkIjoxfQ=='],
    ['seed not a number', 'eyJuYW1lcyI6WyJCZW4iXSwic2VlZCI6IngifQ=='],
    ['skip not text', 'eyJuYW1lcyI6WyJCZW4iXSwic2VlZCI6MSwic2tpcCI6Mn0='],
  ])('rejects a broken link: %s', (_, text) => {
    expect(() => decodeShare(text)).toThrow('This link is broken.');
  });
});

describe('shared store', () => {
  it('skips the shared name and never remembers a winner', () => {
    const shared = { names: ['Gus', 'Hana', 'Ida'], seed: 1, skip: 'Gus' };
    const wheel = Wheel.load(sharedStore(shared), { random: () => 0 });

    expect(wheel.names).toEqual(['Gus', 'Hana', 'Ida']);
    expect(wheel.spin()).toBe('Hana');
    expect(wheel.spin()).toBe('Hana');
  });
});
