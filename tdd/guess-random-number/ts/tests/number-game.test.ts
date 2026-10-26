import { describe, expect, it } from 'vitest';
import { NumberGame, NumberGameTestingService } from '../src/number-game';

describe('Number Guessing Game', () => {
  it('should guess Lower', () => {
    const game = NumberGameTestingService.getNumberGameWithSetResultNumber(4)
    game.init()
    expect(game.guess(3)).toBe('Lower');
  });

  it('Number remains constant', () => {
    const game = NumberGameTestingService.getNumberGameWithSetResultNumber(4)
    game.init()
    expect(game.guess(7)).not.toBe('You win!');
    expect(game.guess(4)).toBe('You win!');
  })

  it('Game should only allow 3 tries', () => {
    const game = NumberGameTestingService.getNumberGameWithSetResultNumber(4)
    game.init()
    game.guess(1)
    game.guess(1)
    game.guess(4)
    expect(game.guess(4)).not.toBe('You win!');
  })
});
