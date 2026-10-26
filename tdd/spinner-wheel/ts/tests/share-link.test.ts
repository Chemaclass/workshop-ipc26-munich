import { describe, expect, it } from 'vitest';
import { decodeShare, encodeShare } from '../src/share-link';

describe('share link', () => {
  it('decodes the names and seed it encoded', () => {
    const shared = { names: ['Anna K.', 'Ben'], seed: 42 };

    expect(decodeShare(encodeShare(shared))).toEqual(shared);
  });
});
