import { describe, expect, it } from 'vitest';
import { decodeShare, encodeShare } from '../src/share-link';

describe('share link', () => {
  it('decodes the names and seed it encoded', () => {
    const shared = { names: ['Anna K.', 'Ben'], seed: 42 };

    expect(decodeShare(encodeShare(shared))).toEqual(shared);
  });

  it('encodes the JSON as base64', () => {
    expect(encodeShare({ names: ['Ben'], seed: 42 })).toBe(
      'eyJuYW1lcyI6WyJCZW4iXSwic2VlZCI6NDJ9',
    );
  });
});
