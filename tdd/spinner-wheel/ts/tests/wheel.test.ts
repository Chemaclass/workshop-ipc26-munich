import { describe, expect, it } from 'vitest';
import { Wheel } from '../src/wheel';

describe('Wheel', () => {
  it('throws when spinning an empty wheel', () => {
    expect(() => new Wheel([]).spin()).toThrow('Add someone before you spin.');
  });
});
