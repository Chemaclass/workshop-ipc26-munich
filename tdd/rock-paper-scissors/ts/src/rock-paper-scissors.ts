export type RockPaperScissorsOption = 'rock' | 'paper' | 'scissors'

export class RockPaperScissorsGame {
  play(playerOneOption: RockPaperScissorsOption, playerTwoOption: RockPaperScissorsOption): boolean | undefined {
    if (playerOneOption == 'rock' && playerTwoOption == 'scissors') {
      return true;
    }
    if (playerOneOption == 'paper' && playerTwoOption == 'rock') {
      return true;
    }
    if (playerOneOption == 'scissors' && playerTwoOption == 'paper') {
      return true;
    }
    if (playerOneOption === playerTwoOption) {
      return undefined
    } 
    return false;
  }
}
