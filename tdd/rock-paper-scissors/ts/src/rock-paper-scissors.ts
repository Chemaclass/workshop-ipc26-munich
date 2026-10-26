export type RockPaperScissorsOption = 'rock' | 'paper' | 'scissors'

export class RockPaperScissorsGame {
    play(playerOneOption: RockPaperScissorsOption, playerTwoOption: RockPaperScissorsOption): boolean|undefined {
      if (playerOneOption == 'rock' && playerTwoOption == 'scissors') {
            return true;
        } else if (playerOneOption == 'paper' && playerTwoOption == 'rock') {
            return true;
        } else if (playerOneOption == 'scissors' && playerTwoOption == 'paper') {
            return true;
        } else if(playerOneOption === playerTwoOption) {
            return undefined
        } else {
            return false;
        }
    }
}
