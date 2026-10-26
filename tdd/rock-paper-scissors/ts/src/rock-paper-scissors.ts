type RockPaperScissorOption = 'rock' | 'paper' | 'scissors'

export class RockPaperScissorsGame {
    play(playerOneOption: RockPaperScissorOption, playerTwoOption: RockPaperScissorOption): boolean {
        if (playerOneOption == 'rock' && playerTwoOption == 'scissors') {
            return true;
        } else if (playerOneOption == 'paper' && playerTwoOption == 'rock') {
            return true;
        } else if (playerOneOption == 'scissors' && playerTwoOption == 'paper') {
            return true;
        } else {
            return false;
        }
    }
}
