# Guess Random Number TDD Kata

Practice Test-Driven Development by building a guessing game. Control randomness with mocks/stubs, cover edge cases, and separate logic from I/O for easier testing.

## Getting Started

This kata comes in two languages. Pick one:

- **PHP** → [`php/`](php/) (PHP 8.4 + PHPUnit)
- **TypeScript** → [`ts/`](ts/) (Node + Vitest)

The `make` interface is identical in both. From your chosen folder:

```bash
make up      # build + start container, install deps
make test    # run tests
make watch   # re-run tests on every save (TDD flow)
make stan    # static analysis / type check
make cs      # check coding standards
make fix-cs  # fix coding standards
make down    # stop
```

Prefer no Docker? `cd php && composer install && composer test`, or `cd ts && npm install && npm test`.

---

## About This Kata

### Problem Statement

Build a simple game where a player tries to guess a randomly generated number between 1 and 10. The player has **3 attempts**. After each guess, the system tells the player if the correct number is higher or lower. If the player guesses correctly, they win; otherwise, they lose.

### Business Rules

- A random number is generated at the beginning of the game and **remains constant** until the game ends
- The player gets max **three attempts** to guess the number
- If the guess is correct: the player **wins**
- If the guess is incorrect: the game tells the player if the correct number is **higher or lower**
- If the player uses all 3 attempts unsuccessfully, they **lose**

### Use Cases

The examples below are shown in PHP; the TypeScript version mirrors the same behaviour.

**1. Player wins on the first guess**
```php
$game = new GuessingNumberGame(new StubGenerator(5));
echo $game->guessNumber(5); // "You win!"
```

**2. Player wins after multiple guesses**
```php
$game = new GuessingNumberGame(new StubGenerator(5));
echo $game->guessNumber(10); // "Lower"
echo $game->guessNumber(3);  // "Higher"
echo $game->guessNumber(5);  // "You win!"
```

**3. Player loses**
```php
$game = new GuessingNumberGame(new StubGenerator(5));
echo $game->guessNumber(1);  // "Higher"
echo $game->guessNumber(10); // "Lower"
echo $game->guessNumber(3);  // "You lose! The number was 5"
```

### Suggested Class API

```php
interface RandomNumberGenerator {
    public function generate(): int;
}

final class GuessingNumberGame
{
    public function __construct(private RandomNumberGenerator $generator) {}

    public function guessNumber(int $n): string {}
}
```

### TDD Plan

**Test 1: Win on first try** — `guessNumber(5)` with generated `5` returns `"You win!"`

**Test 2: Hint "higher" and "lower"** — with generated `7`, a guess of `4` returns `"Higher"`, a guess of `9` returns `"Lower"`

**Test 3: Win on last attempt** — with generated `7`, two wrong guesses then `7` returns `"You win!"`

**Test 4: Lose after 3 wrong attempts** — with generated `5`, three wrong guesses returns `"You lose! The number was 5"`

### Implementation Tips

- Track the number of attempts left
- Lock in the generated number on instantiation
- Return messages from the `guessNumber()` method
- Inject the random number generator so tests can stub it

### Things to Avoid

- Re-generating the random number on every guess
- Exposing internal state
- Mixing logic and presentation

### Concepts Practiced

- Test Doubles / Mocking
- Baby steps & micro-iterations
- Object Calisthenics
- Primitive Obsession elimination

### Bonus Challenges

- Extend the range (e.g., 1–100)
- Make number of attempts configurable
- Add user interaction (via CLI or Web)

---

> Inspired by: https://www.codurance.com/publications/guess-the-random-number
