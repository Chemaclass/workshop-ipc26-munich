# Tennis Refactoring Kata

Refactor complex conditional-heavy logic safely. Practice improving readability with meaningful names and abstractions while eliminating duplication.

## Getting Started

This kata comes in two languages. Pick one:

- **PHP** → [`php/`](php/) (PHP 8.4 + PHPUnit) — several versions provided, each with a different design challenge
- **TypeScript** → [`ts/`](ts/) (Node + Vitest) — `TennisGame1`, the version to start from

The `make` interface is identical in both. From your chosen folder:

```bash
make up      # build + start container, install deps
make test    # run tests
make watch   # re-run tests on every save
make stan    # static analysis / type check
make cs      # check coding standards
make fix-cs  # fix coding standards
make down    # stop
```

Prefer no Docker? `cd php && composer install && composer test`, or `cd ts && npm install && npm test`.

---

## About This Kata

### The Scenario

Imagine you work for a consultancy company, and one of your colleagues has been doing some work for the Tennis Society. The contract is for 10 hours billable work, and your colleague has spent 8.5 hours working on it. Unfortunately he has now fallen ill. He says he has completed the work, and the tests all pass. Your boss has asked you to take over from him. She wants you to spend an hour or so on the code so she can bill the client for the full 10 hours. She instructs you to tidy up the code a little and perhaps make some notes so you can give your colleague some feedback on his chosen design. You should also prepare to talk to your boss about the value of this refactoring work, over and above the extra billable hours.

### How to Approach

- Start with the `TennisGame1` class
- The test suite is fairly comprehensive and runs quickly
- You should not need to change the tests, only run them often as you refactor
- Note: the player names are hard-coded to "player1" and "player2"—you may want to fix this and add suitable test cases

---

> Original: https://github.com/emilybache/Tennis-Refactoring-Kata
