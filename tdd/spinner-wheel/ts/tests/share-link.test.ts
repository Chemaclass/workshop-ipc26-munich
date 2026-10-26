import { describe, expect, it } from 'vitest';
import { fromShareHash, toShareHash } from '../src/share-link';

describe('share-link', () => {
  it('round-trips names and index', () => {
    const hash = toShareHash(['Ada', 'Bea', 'Cam'], 2);

    expect(hash).toBe('#n=Ada&n=Bea&n=Cam&i=2');
    expect(fromShareHash(hash)).toEqual({
      names: ['Ada', 'Bea', 'Cam'],
      index: 2,
    });
  });

  it('round-trips names with spaces and ampersands', () => {
    const names = ['Ada Lovelace', 'Bea & Cam'];
    const hash = toShareHash(names, 1);

    expect(fromShareHash(hash)).toEqual({ names, index: 1 });
  });

  it('returns null for an empty hash', () => {
    expect(fromShareHash('')).toBeNull();
    expect(fromShareHash('#')).toBeNull();
  });

  it('returns null when the index is missing or not an integer', () => {
    expect(fromShareHash('#n=Ada&n=Bea')).toBeNull();
    expect(fromShareHash('#n=Ada&n=Bea&i=1.5')).toBeNull();
    expect(fromShareHash('#n=Ada&n=Bea&i=abc')).toBeNull();
  });

  it('returns null when the index is out of range', () => {
    expect(fromShareHash('#n=Ada&n=Bea&i=2')).toBeNull();
    expect(fromShareHash('#n=Ada&n=Bea&i=-1')).toBeNull();
  });

  it('returns null when there are fewer than two names', () => {
    expect(fromShareHash('#n=Ada&i=0')).toBeNull();
    expect(fromShareHash('#i=0')).toBeNull();
  });

  it('returns null when names are duplicated', () => {
    expect(fromShareHash('#n=Ada&n=Bea&n=Ada&i=0')).toBeNull();
  });
});
