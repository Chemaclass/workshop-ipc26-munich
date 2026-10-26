import { GuessResult, type Guesser } from './guesser.js';

type GuessInput = () => Promise<string | null>;
type MessageOutput = (message: string) => void;

export async function runCli(
  guesser: Pick<Guesser, 'guess'>,
  readGuess: GuessInput,
  writeMessage: MessageOutput,
): Promise<void> {
  writeMessage('Guess a number between 1 and 100. You have 3 attempts.');

  while (true) {
    const input = await readGuess();

    if (input === null) {
      writeMessage('Game ended.');
      return;
    }

    const guess = Number(input);

    if (!Number.isInteger(guess) || guess < 1 || guess > 100) {
      writeMessage('Enter a whole number between 1 and 100.');
      continue;
    }

    const result = guesser.guess(guess);

    if (result === GuessResult.Success) {
      writeMessage('You win!');
      return;
    }

    if (result === GuessResult.Fail) {
      writeMessage('You lose!');
      return;
    }

    writeMessage(result === GuessResult.Higher ? 'Higher' : 'Lower');
  }
}
