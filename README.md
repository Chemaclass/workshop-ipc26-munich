# Hands-On TDD & Refactoring Workshop: PHP & TypeScript

Write clean, maintainable software with confidence: drive behavior with tests, and reshape existing code without breaking it.

You work in pairs through code katas, from simple exercises to legacy code. Along the way you practice parameterized, golden master, and characterization tests, small safe steps, and changes that keep the tests green.

Every kata ships in **PHP and TypeScript**. Pick the one you work in; the exercises, tests, and `make` commands mirror each other.

---

## Workshop day

We ran this workshop at the International PHP Conference in Munich on 26 October 2026.

- **Slides:** [TDD, Refactoring, and Pair Programming: A Hands-on Crash Course](https://docs.google.com/presentation/d/1wo_45EQuy39sTKTo45xtjUP_bLdo-VkpHLOP79frRic/edit?usp=sharing)
- **Group solutions:** each pair pushed its work to a `kata-<n>/group-<m>` branch. [Browse all branches](https://github.com/Chemaclass/workshop-ipc26-munich/branches/all).

| Branch | Kata |
|---|---|
| `kata-1/*` | Rock Paper Scissors |
| `kata-2/*` | Guess the Random Number |
| `kata-3/*` | Parrot |
| `kata-4/*` | Spinner Wheel |

---

## Katas

Six independent katas. Each lives in its own folder with a shared problem brief and two language versions: `php/` and `ts/`. Pick any and start.

| # | Kata | Track | Focus | Time |
|---|---|---|---|---|
| 1 | [Rock Paper Scissors](tdd/rock-paper-scissors/README.md) | TDD | Parameterized tests, clear rules | 30-45 min |
| 2 | [Guess the Random Number](tdd/guess-random-number/README.md) | TDD | Mocking randomness, isolating I/O | 45-60 min |
| 3 | [Spinner Wheel](tdd/spinner-wheel/README.md) | TDD + AI agent | Shareable results, a small web app built with an agent | 60-90 min |
| 4 | [Parrot](refactoring/parrot/README.md) | Refactoring | Polymorphism, removing smells | 30-45 min |
| 5 | [Tennis](refactoring/tennis/README.md) | Refactoring | Taming conditionals, naming | 45-60 min |
| 6 | [Gilded Rose](refactoring/gilded-rose/README.md) | Refactoring | Golden master on legacy code, adding a feature safely | 60-90 min |

---

## Setup

New to the repo? [SETUP.md](SETUP.md) is a 10-minute checklist to get your machine ready.

### Option 1: Docker (recommended)

No local PHP or Node needed. Requires Docker running.

```bash
make up-php    # start all 6 PHP kata containers
make up-ts     # start all 6 TS kata containers
make up        # start everything (PHP + TS)

make test-php  # run all PHP tests
make test-ts   # run all TS tests
make test      # run everything

make down      # stop and remove all containers
```

Or work on a single kata in a single language:

```bash
cd tdd/rock-paper-scissors/php     # or .../ts, or any other kata
make up                            # build + install deps + keep container alive
make test                          # run tests
make watch                         # run tests on every file save (TDD flow)
make stan                          # static analysis / type check
make cs                            # check coding standards
make fix-cs                        # fix coding standards
make down                          # stop when done
```

The `make` targets are the same in both languages. Only the tools behind them differ:

| | PHP | TypeScript |
|---|---|---|
| Runtime | PHP 8.4 | Node 22 |
| Tests | PHPUnit | Vitest |
| Static analysis (`stan`) | PHPStan | `tsc --noEmit` |
| Coding standards (`cs`) | Easy Coding Standard | Biome |

### Option 2: Local

Requires PHP 8.4+ and Composer, or Node 22+ and npm.

```bash
cd <kata-folder>/php     # PHP
composer install && composer test

cd <kata-folder>/ts      # TypeScript
npm install && npm test
```

See each kata's README for details.

---

## Further Reading

### Books

- **Test-Driven Development by Example** by Kent Beck ([Amazon](https://www.amazon.de/-/en/Kent-Beck/dp/0321146530/))
- **Refactoring** by Martin Fowler ([Amazon](https://www.amazon.de/-/en/Martin-Fowler/dp/0134757599/))
- **Working Effectively with Legacy Code** by Michael C. Feathers ([Amazon](https://www.amazon.de/-/en/Michael-C-Feathers/dp/0131177052/))

### Videos

- [Does TDD Really Lead to Good Design?](https://youtu.be/KyFVA4Spcgg)
- [Introduction to Test Driven Development](https://youtu.be/04FzlrMKPTM)

### Blog Posts

**Pair programming**

- [Effective Pair Programming](https://chemaclass.com/blog/effective-pair-programming/)
- [Pull Requests vs Pair Programming](https://chemaclass.com/blog/pull-request-vs-pair-prog/)

**Testing & refactoring**

- [The Art of Testing: Where Design Meets Quality](https://chemaclass.com/blog/the-art-of-testing/)
- [Test-Driven (Development)](https://chemaclass.com/blog/test-driven-development/)
- [TDD vs BDD](https://chemaclass.com/blog/tdd-vs-bdd/)
- [London vs Chicago](https://chemaclass.com/blog/london-vs-chicago/)
- [To Mock or Not to Mock](https://chemaclass.com/blog/to-mock-or-not-to-mock/)
- [How to Test Private Methods?](https://chemaclass.com/blog/how-to-test-private-methods/)
- [Testing Effectively Legacy Code](https://chemaclass.com/blog/testing-effectively-legacy-code/)
- [The Art of Refactoring](https://chemaclass.com/blog/the-art-of-refactoring/)
