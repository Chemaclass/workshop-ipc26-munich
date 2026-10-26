import { describe, expect, it } from 'vitest';
import { NumberGame, NumberGameTestingService } from '../src/number-game';

describe('Number Guessing Game', () => {
  it('changes me', () => {
    const game = NumberGameTestingService.getNumberGameWithSetResultNumber(4)
    game.init()
    expect(game.guess(3)).toBe('LOWER');
  });
});
