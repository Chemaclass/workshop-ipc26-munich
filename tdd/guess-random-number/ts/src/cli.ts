import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import { NumberGame } from './number-game';

const terminal = createInterface({ input: stdin, output: stdout });
const game = new NumberGame();
game.init();

console.log('Guess a number from 1 to 10.');

try {
  while (true) {
    const input = await terminal.question('Your guess: ');
    const guess = Number(input);

    if (!Number.isInteger(guess) || guess < 1 || guess > 10) {
      console.log('Enter a whole number from 1 to 10.');
      continue;
    }

    const result = game.guess(guess);

    if (typeof result === 'object') {
      console.log(`${result.message} The number was ${result.correctNumber}`);
      break;
    }

    console.log(result);
    if (result === 'You win!') break;
  }
} finally {
  terminal.close();
}