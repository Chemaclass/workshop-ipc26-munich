export class Guesser {
  constructor(private random: { generate(): number }) {}

  guess(guess: number): boolean {
    return true;
  }
}
