import { describe, expect, it } from 'vitest';
import {
  TennisGame,
  TennisGame1,
  TennisGame2,
  TennisGame3,
  TennisGame4,
  TennisGame5,
  TennisGame6,
} from '../src';
import scoresData from './scores.json';

const scores = scoresData as unknown as Array<[number, number, string]>;

function checkScore(
  game: TennisGame,
  player1Score: number,
  player2Score: number,
  expectedScore: string,
): void {
  const highestScore = Math.max(player1Score, player2Score);
  for (let i = 0; i < highestScore; i++) {
    if (i < player1Score) {
      game.wonPoint('player1');
    }
    if (i < player2Score) {
      game.wonPoint('player2');
    }
  }
  expect(game.getScore()).toBe(expectedScore);
}

describe('TennisGame', () => {
  describe('TennisGame1', () => {
    for (const [p1, p2, expected] of scores) {
      it(`scores ${p1}:${p2} as ${expected}`, () => {
        checkScore(new TennisGame1('player1', 'player2'), p1, p2, expected);
      });
    }
  });

  describe('TennisGame2', () => {
    for (const [p1, p2, expected] of scores) {
      it(`scores ${p1}:${p2} as ${expected}`, () => {
        checkScore(new TennisGame2('player1', 'player2'), p1, p2, expected);
      });
    }
  });

  describe('TennisGame3', () => {
    for (const [p1, p2, expected] of scores) {
      it(`scores ${p1}:${p2} as ${expected}`, () => {
        checkScore(new TennisGame3('player1', 'player2'), p1, p2, expected);
      });
    }
  });

  describe('TennisGame4', () => {
    for (const [p1, p2, expected] of scores) {
      it(`scores ${p1}:${p2} as ${expected}`, () => {
        checkScore(new TennisGame4('player1', 'player2'), p1, p2, expected);
      });
    }
  });

  describe('TennisGame5', () => {
    for (const [p1, p2, expected] of scores) {
      it(`scores ${p1}:${p2} as ${expected}`, () => {
        checkScore(new TennisGame5('player1', 'player2'), p1, p2, expected);
      });
    }
  });

  describe('TennisGame6', () => {
    for (const [p1, p2, expected] of scores) {
      it(`scores ${p1}:${p2} as ${expected}`, () => {
        checkScore(new TennisGame6('player1', 'player2'), p1, p2, expected);
      });
    }
  });
});
