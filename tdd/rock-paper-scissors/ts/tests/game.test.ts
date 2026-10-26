import { describe, expect, it } from 'vitest';
import { Game } from '../src/game';

describe('Game has winner', () => {
  const game = new Game();
  it('scissors beats paper (me)', () => {
    game.setPlayer1('scissors')
    game.setPlayer2('paper')
    expect(game.winner()).toBe('player1');
  });
  /*
  it('scissors beats paper (you)', () => {
    game.setPlayer1('rock')
    game.setPlayer2('paper')
    expect(game.winner()).toBe('player2');
  });
  });*/
});

