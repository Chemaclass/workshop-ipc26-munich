import {describe, expect, it} from 'vitest';
import {Parrot} from '../src/parrot';
import {European} from "../src/parrots/european";
import {African} from "../src/parrots/african";
import {NorwegianBlue} from "../src/parrots/norwegianBlue";

describe('Parrot', () => {
  it('speed of European parrot', () => {
    expect(new European().getSpeed()).toBe(12.0);
  });

  it('speed of African parrot with one coconut', () => {
    expect(new African(1).getSpeed()).toBe(3.0);
  });

  it('speed of African parrot with two coconuts', () => {
    expect(new African( 2).getSpeed()).toBe(0.0);
  });

  it('speed of African parrot with no coconuts', () => {
    expect(new African(0).getSpeed()).toBe(12.0);
  });

  it('speed of nailed Norwegian Blue parrot', () => {
    expect(new NorwegianBlue(1.5, true).getSpeed()).toBe(
      0.0,
    );
  });

  it('speed of not-nailed Norwegian Blue parrot', () => {
    expect(new NorwegianBlue(1.5, false).getSpeed()).toBe(
      18.0,
    );
  });

  it('speed of not-nailed Norwegian Blue parrot at high voltage', () => {
    expect(new NorwegianBlue(4, false).getSpeed()).toBe(
      24.0,
    );
  });

  it('throws for an unknown parrot', () => {
    expect(() => new Parrot(-1, 0, 0, false).getSpeed()).toThrow(
      'Should be unreachable',
    );
  });

  it('cry of European parrot', () => {
    expect(new European().getCry()).toBe('Sqoork!');
  });

  it('cry of African parrot', () => {
    expect(new African().getCry()).toBe(
      'Sqaark!',
    );
  });

  it('cry of Norwegian Blue at high voltage', () => {
    expect(new NorwegianBlue(4, false).getCry()).toBe(
      'Bzzzzzz',
    );
  });

  it('cry of Norwegian Blue with no voltage', () => {
    expect(new NorwegianBlue(0, false).getCry()).toBe(
      '...',
    );
  });
});
