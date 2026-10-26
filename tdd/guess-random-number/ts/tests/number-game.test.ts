import { describe, expect, it } from 'vitest';
import { NumberGame, NumberGameTestingService } from '../src/number-game';

describe('Number Guessing Game', () => {
  it('Number remains constant', () => {
    const game = NumberGameTestingService.getNumberGameWithSetResultNumber(4)
    game.init()
    expect(game.guess(7)).not.toBe('You win!');
    expect(game.guess(4)).toBe('You win!');
  })

  it('Game should only allow 3 tries', () => {
    const testNumber = 4
    const game = NumberGameTestingService.getNumberGameWithSetResultNumber(testNumber)
    game.init()
    game.guess(1)
    game.guess(1)
    game.guess(2)
    expect(game.guess(3)).toBe(`You lose! The number was ${testNumber}`);
  })

  it('Player wins if guess is correct', () => {
    const game = NumberGameTestingService.getNumberGameWithSetResultNumber(4)
    game.init()
    expect(game.guess(4)).toBe('You win!');
  })

  it('Should return higher if guess is higher than the number', () => {
    const game = NumberGameTestingService.getNumberGameWithSetResultNumber(6)
    game.init()
    expect(game.guess(9)).toBe('Higher');
  })

  it('should return lower if guess is lower than the number', () => {
    const game = NumberGameTestingService.getNumberGameWithSetResultNumber(4)
    game.init()
    expect(game.guess(1)).toBe('Lower');
  });

});
