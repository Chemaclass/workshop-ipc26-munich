import { describe, expect, it } from 'vitest';
import { RockPaperScissorsGame } from '../src/rock-paper-scissors';

describe('ChangeMe', () => {
  // it('changes me', () => {
  //   expect(new ChangeMe().changeMe()).toBe(true);
  // });
  it('rock beats scissor', () => {
    const game = new RockPaperScissorsGame()
    expect(game.play('rock', 'scissors')).toBe(true)
  })
});
