import { describe, expect, it } from 'vitest';
import { decodeSharedWheel, encodeSharedWheel } from '../src/shared-wheel';

describe('shared wheel state', () => {
  it('still opens an existing version-one link with its original names, winner and angle', () => {
    const oldLink =
      '#wheel=%7B%22version%22%3A1%2C%22names%22%3A%5B%22Anna%22%2C%22Ben%22%2C%22Clara%22%5D%2C%22chosen%22%3A%22Ben%22%2C%22rotation%22%3A198.75%7D';
    expect(decodeSharedWheel(oldLink)).toEqual({
      names: ['Anna', 'Ben', 'Clara'],
      chosen: 'Ben',
      rotation: 198.75,
    });
  });
  it('ignores malformed or inconsistent shared states instead of restoring a different result', () => {
    const valid = {
      version: 1,
      names: ['Anna', 'Ben'],
      chosen: 'Ben',
      rotation: 90,
    };
    const invalidStates = [
      null,
      [],
      {},
      { ...valid, version: 2 },
      { ...valid, names: [] },
      { ...valid, names: ['Anna', 'ANNA'] },
      { ...valid, names: ['Anna', ''] },
      { ...valid, names: [null, 'Ben'] },
      { ...valid, names: [' Anna ', 'Ben'] },
      { ...valid, chosen: 'Clara' },
      { ...valid, rotation: '90' },
      { ...valid, rotation: -1 },
      { ...valid, rotation: 360 },
      { ...valid, rotation: 270 },
    ];
    for (const state of invalidStates) {
      expect(
        decodeSharedWheel(
          `#wheel=${encodeURIComponent(JSON.stringify(state))}`,
        ),
      ).toBeNull();
    }
    expect(decodeSharedWheel('')).toBeNull();
    expect(decodeSharedWheel('#other=123')).toBeNull();
    expect(decodeSharedWheel('#wheel=%broken')).toBeNull();
    expect(decodeSharedWheel('#wheel=not-json')).toBeNull();
  });
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
