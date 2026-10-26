import { describe, expect, it } from 'vitest';
import { EuropeanParrot } from '../src/european-parrot';
import { AfricanParrot } from '../src/african-parrot';
import { NorwegianBlueParrot } from '../src/norwegian-blue-parrot';

describe('Parrot', () => {
  it('speed of European parrot', () => {
    expect(new EuropeanParrot().getSpeed()).toBe(12.0);
  });

  it('speed of African parrot with one coconut', () => {
    expect(new AfricanParrot(1).getSpeed()).toBe(3.0);
  });

  it('speed of African parrot with two coconuts', () => {
    expect(new AfricanParrot(2).getSpeed()).toBe(0.0);
  });

  it('speed of African parrot with no coconuts', () => {
    expect(new AfricanParrot(0).getSpeed()).toBe(12.0);
  });

  it('speed of nailed Norwegian Blue parrot', () => {
    expect(new NorwegianBlueParrot(1.5, true).getSpeed()).toBe(
      0.0,
    );
  });

  it('speed of not-nailed Norwegian Blue parrot', () => {
    expect(new NorwegianBlueParrot(1.5, false).getSpeed()).toBe(
      18.0,
    );
  });

  it('speed of not-nailed Norwegian Blue parrot at high voltage', () => {
    expect(new NorwegianBlueParrot(4, false).getSpeed()).toBe(
      24.0,
    );
  });

  it('cry of European parrot', () => {
    expect(new EuropeanParrot().getCry()).toBe(
      'Sqoork!',
    );
  });

  it('cry of African parrot', () => {
    expect(new AfricanParrot(1).getCry()).toBe(
      'Sqaark!',
    );
  });

  it('cry of Norwegian Blue at high voltage', () => {
    expect(new NorwegianBlueParrot(4, false).getCry()).toBe(
      'Bzzzzzz',
    );
  });

  it('cry of Norwegian Blue with no voltage', () => {
    expect(new NorwegianBlueParrot(0, false).getCry()).toBe(
      '...',
    );
  });
});
