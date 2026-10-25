import { describe, expect, it } from 'vitest';
import { ChangeMe } from '../src/change-me';

describe('ChangeMe', () => {
  it('changes me', () => {
    expect(new ChangeMe().changeMe()).toBe(true);
  });
});
