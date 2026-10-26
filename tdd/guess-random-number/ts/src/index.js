import { createInterface } from 'node:readline';
import { runCli } from './cli.js';
import { Guesser, RandomGenerator } from './guesser.js';

const terminal = createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: Boolean(process.stdin.isTTY && process.stdout.isTTY),
});
const lines = terminal[Symbol.asyncIterator]();

async function readGuess() {
  process.stdout.write('Your guess (1-100): ');
  const line = await lines.next();
  return line.done ? null : line.value;
}

try {
  await runCli(new Guesser(new RandomGenerator()), readGuess, console.log);
} finally {
  terminal.close();
}
