# Parrot Refactoring Kata

Refactor code using Polymorphism. The kata is fully functional with a complete test suite. Your objective is to improve the code while keeping all tests passing.

## Getting Started

This kata comes in two languages. Pick one:

- **PHP** → [`php/`](php/) (PHP 8.4 + PHPUnit)
- **TypeScript** → [`ts/`](ts/) (Node + Vitest)

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

### Project Structure

- `src/` — the code that needs to be refactored
- `tests/` — the complete test suite (all tests are passing)

Your job: improve the design (polymorphism over the type switch) while keeping every test green.

---

> Original: https://github.com/emilybache/Parrot-Refactoring-Kata
