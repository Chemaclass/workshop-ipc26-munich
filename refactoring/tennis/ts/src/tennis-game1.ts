import type { TennisGame } from './tennis-game';

export class TennisGame1 implements TennisGame {
  private m_score1 = 0;
  private m_score2 = 0;

  // biome-ignore lint/complexity/noUselessConstructor: kata smell — names are accepted but ignored
  constructor(player1Name: string, player2Name: string) {}

  wonPoint(playerName: string): void {
    if (playerName === 'player1') {
      this.m_score1++;
    } else {
      this.m_score2++;
    }
  }

  getScore(): string {
    let score = '';
    if (this.m_score1 === this.m_score2) {
      switch (this.m_score1) {
        case 0:
          score = 'Love-All';
          break;
        case 1:
          score = 'Fifteen-All';
          break;
        case 2:
          score = 'Thirty-All';
          break;
        default:
          score = 'Deuce';
          break;
      }
    } else if (this.m_score1 >= 4 || this.m_score2 >= 4) {
      const minusResult = this.m_score1 - this.m_score2;
      if (minusResult === 1) {
        score = 'Advantage player1';
      } else if (minusResult === -1) {
        score = 'Advantage player2';
      } else if (minusResult >= 2) {
        score = 'Win for player1';
      } else {
        score = 'Win for player2';
      }
    } else {
      for (let i = 1; i < 3; i++) {
        let tempScore = 0;
        if (i === 1) {
          tempScore = this.m_score1;
        } else {
          score += '-';
          tempScore = this.m_score2;
        }
        switch (tempScore) {
          case 0:
            score += 'Love';
            break;
          case 1:
            score += 'Fifteen';
            break;
          case 2:
            score += 'Thirty';
            break;
          case 3:
            score += 'Forty';
            break;
        }
      }
    }
    return score;
  }
}
