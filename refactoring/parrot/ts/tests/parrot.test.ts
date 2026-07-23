import { describe, expect, it } from 'vitest';
import { Parrot } from '../src/parrot';
import { ParrotType } from '../src/parrot-type';

describe('Parrot', () => {
  it('speed of European parrot', () => {
    expect(new Parrot(ParrotType.European, 0, 0, false).getSpeed()).toBe(12.0);
  });

  it('speed of African parrot with one coconut', () => {
    expect(new Parrot(ParrotType.African, 1, 0, false).getSpeed()).toBe(3.0);
  });

  it('speed of African parrot with two coconuts', () => {
    expect(new Parrot(ParrotType.African, 2, 0, false).getSpeed()).toBe(0.0);
  });

  it('speed of African parrot with no coconuts', () => {
    expect(new Parrot(ParrotType.African, 0, 0, false).getSpeed()).toBe(12.0);
  });

  it('speed of nailed Norwegian Blue parrot', () => {
    expect(new Parrot(ParrotType.NorwegianBlue, 0, 1.5, true).getSpeed()).toBe(
      0.0,
    );
  });

  it('speed of not-nailed Norwegian Blue parrot', () => {
    expect(new Parrot(ParrotType.NorwegianBlue, 0, 1.5, false).getSpeed()).toBe(
      18.0,
    );
  });

  it('speed of not-nailed Norwegian Blue parrot at high voltage', () => {
    expect(new Parrot(ParrotType.NorwegianBlue, 0, 4, false).getSpeed()).toBe(
      24.0,
    );
  });

  it('throws for an unknown parrot', () => {
    expect(() => new Parrot(-1, 0, 0, false).getSpeed()).toThrow(
      'Should be unreachable',
    );
  });

  it('cry of European parrot', () => {
    expect(new Parrot(ParrotType.European, 0, 0, false).getCry()).toBe(
      'Sqoork!',
    );
  });

  it('cry of African parrot', () => {
    expect(new Parrot(ParrotType.African, 1, 0, false).getCry()).toBe(
      'Sqaark!',
    );
  });

  it('cry of Norwegian Blue at high voltage', () => {
    expect(new Parrot(ParrotType.NorwegianBlue, 0, 4, false).getCry()).toBe(
      'Bzzzzzz',
    );
  });

  it('cry of Norwegian Blue with no voltage', () => {
    expect(new Parrot(ParrotType.NorwegianBlue, 0, 0, false).getCry()).toBe(
      '...',
    );
  });
});
