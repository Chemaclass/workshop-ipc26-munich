import { describe, expect, it } from 'vitest';
import { decodeSharedWheel, encodeSharedWheel } from '../src/shared-wheel';

describe('shared wheel state', () => {
  it('round-trips the ordered names, chosen person and exact landing angle through a URL hash', () => {
    const state = {
      names: ['Anna & Ben', 'Zoë #1 / 李', '<Alex>'],
      chosen: 'Zoë #1 / 李',
      rotation: 198.75,
    };
    const url = new URL('https://wheel.example/workshop/');
    url.hash = encodeSharedWheel(state);
    expect(decodeSharedWheel(url.hash)).toEqual(state);
  });
});
