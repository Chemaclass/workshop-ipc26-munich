import { describe, expect, it } from 'vitest';
import { Game } from '../src/game';

describe('Guessing Game', () => {
  it('guesses the number correctly', () => {
    const game = new Game()
    game.makeGuess(5)
    expect(game.guess).toBe(game.answer);
    expect(game.won).toBe('won');
  });

  it('Gussing wrong number', ()=>{
    const game = new Game();
    game.makeGuess(2)
    expect(game.guess).not.toBe(game.answer);
  })

  it("incrementing guessing number", ()=>{
    const game = new Game()
    expect(game.guesses).toBe(0);
    game.makeGuess(2);
    expect(game.guess).not.toBe(game.answer);
    expect(game.guesses).toBe((1));
  })

  it('should only allow three attempts', () => {
    const game = new Game()
    game.makeGuess(2)
    game.makeGuess(2)
    game.makeGuess(2)
    expect(game.guesses).toBe(3);
    expect(game.won).toBe('lost');
    game.makeGuess(5)
    expect(game.won).toBe('lost');
  });

  it('should give the correct hint if the answer is higher or lower', () => {
    const game = new Game()
    game.makeGuess(2)
    expect(game.hint).toBe(`it's higher!`)
    game.makeGuess(9)
    expect(game.hint).toBe(`it's lower!`)
  });
});
