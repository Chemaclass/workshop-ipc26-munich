import { describe, expect, it } from 'vitest';

import { RockPaperScissorsGame } from '../src/rock-paper-scissors';

describe('ChangeMe', () => {
  it('player 1 rock beats player 2 scissor', () => {
    const game = new RockPaperScissorsGame()
    expect(game.play('rock', 'scissors')).toBe(true)
  })

  it('player 1 scissors losses against player 2 rock', () => {
    const game = new RockPaperScissorsGame()
    expect(game.play('scissors', 'rock')).toBe(false)
  })

  it('player 1 paper beats player 2 rock', () => {
    const game = new RockPaperScissorsGame()
    expect(game.play('paper', 'rock')).toBe(true)
  })

  it('player 1 rock losses against player 2 paper', () => {
    const game = new RockPaperScissorsGame()
    expect(game.play('rock', 'paper')).toBe(false)
  })

  it('player 1 scissors beats player 2 paper', () => {
    const game = new RockPaperScissorsGame()
    expect(game.play('scissors', 'paper')).toBe(true)
  })

  it('player 1 paper losses against player 2 scissors', () => {
    const game = new RockPaperScissorsGame()
    expect(game.play('paper', 'scissors')).toBe(false)
  })
});
