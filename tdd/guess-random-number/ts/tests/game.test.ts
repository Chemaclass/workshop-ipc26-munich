import { describe, expect, it } from 'vitest';
import { Game } from '../src/game';

describe('Guessing Game', () => {
  it('guesses the number correctly', () => {
    const game = new Game()
    game.guess = 5
    expect(game.guess).toBe(game.answer);
  });

  it('Gussing wrong number', ()=>{
    const game = new Game();
    game.guess = 2
    expect(game.guess).not.toBe(game.answer);
  })

  it("incrementing guessing number", ()=>{
    const game = new Game()
    expect(game.guesses).toBe(0);
    game.guess = 2;
    expect(game.guess).not.toBe(game.answer);
    expect(game.guess).toBe((1));
  })
});
