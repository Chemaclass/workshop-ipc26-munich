import { describe, expect, it } from 'vitest';
import { parseNames, removeName } from '../src/names';

describe('parseNames', () => {
  it('splits names at commas', () => {
    expect(parseNames('Anna,Ben,Chris')).toEqual(['Anna', 'Ben', 'Chris']);
  });

  it('trims spaces around names', () => {
    expect(parseNames(' Anna , Ben ')).toEqual(['Anna', 'Ben']);
  });

  it('ignores blank entries', () => {
    expect(parseNames('Anna,,Ben, ')).toEqual(['Anna', 'Ben']);
  });

  it('numbers duplicate names', () => {
    expect(parseNames('Anna,Ben,Anna')).toEqual([
      'Anna (1)',
      'Ben',
      'Anna (2)',
    ]);
  });

  it('finds duplicates regardless of case', () => {
    expect(parseNames('Anna,anna')).toEqual(['Anna (1)', 'anna (2)']);
  });
});

describe('removeName', () => {
  it('removes the name at the given position from the text', () => {
    expect(removeName('Anna, Ben, Chris', 1)).toBe('Anna, Chris');
  });

  it('counts positions like the wheel does, skipping blank entries', () => {
    expect(removeName('Anna,, Ben, anna', 2)).toBe('Anna, Ben');
  });
});
