import { describe, expect, it } from 'vitest';
import { runCli } from '../src/cli';
import { Guesser } from '../src/guesser';

describe('CLI', () => {
  it('rejects invalid input without using an attempt and ends on a win', async () => {
    const inputs = ['abc', '0', '4', '9', '7'];
    const messages: string[] = [];
    const guesser = new Guesser({ generate: () => 7 });

    await runCli(
      guesser,
      async () => inputs.shift() ?? null,
      (message) => messages.push(message),
    );

    expect(messages).toEqual([
      'Guess a number between 1 and 100. You have 3 attempts.',
      'Enter a whole number between 1 and 100.',
      'Enter a whole number between 1 and 100.',
      'Higher',
      'Lower',
      'You win!',
    ]);
  });

  it('ends when the player runs out of attempts', async () => {
    const inputs = ['1', '2', '3', '7'];
    const messages: string[] = [];
    const guesser = new Guesser({ generate: () => 7 });

    await runCli(
      guesser,
      async () => inputs.shift() ?? null,
      (message) => messages.push(message),
    );

    expect(messages.slice(-1)).toEqual(['You lose!']);
    expect(inputs).toEqual(['7']);
  });

  it('ends cleanly when input closes', async () => {
    const messages: string[] = [];

    await runCli(
      new Guesser({ generate: () => 7 }),
      async () => null,
      (message) => messages.push(message),
    );

    expect(messages).toEqual([
      'Guess a number between 1 and 100. You have 3 attempts.',
      'Game ended.',
    ]);
  });
});
