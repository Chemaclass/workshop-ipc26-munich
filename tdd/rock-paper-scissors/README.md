# Rock Paper Scissors TDD Kata

Practice Test-Driven Development by building a rock-paper-scissors game. Define rules and logic clearly with tests, covering all outcomes efficiently using parameterized tests.

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

### Business Rules

#### Rock Beats Scissors

As a player, I want rock to beat scissors.

**Scenarios:**
- Given I have chosen rock, when the opponent chooses scissors, then I should win
- Given I have chosen scissors, when the opponent chooses rock, then the opponent should win

#### Paper Beats Rock

As a player, I want paper to beat rock.

**Scenarios:**
- Given I have chosen paper, when the opponent chooses rock, then I should win
- Given I have chosen rock, when the opponent chooses paper, then the opponent should win

#### Scissors Beats Paper

As a player, I want scissors to beat paper.

**Scenarios:**
- Given I have chosen scissors, when the opponent chooses paper, then I should win
- Given I have chosen paper, when the opponent chooses scissors, then the opponent should win

#### Same Moves Result in Draw

As a player, I want the same moves to draw.

**Scenarios:**
- Given I have chosen rock, when the opponent chooses rock, then it should be a draw
- Given I have chosen scissors, when the opponent chooses scissors, then it should be a draw
- Given I have chosen paper, when the opponent chooses paper, then it should be a draw

---

> Original: https://hackmd.io/@evalverde/ipc-remote-kata-1
