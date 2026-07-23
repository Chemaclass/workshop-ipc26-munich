# Hands-On TDD & Refactoring Workshop — PHP & TypeScript

Write clean, maintainable software with confidence: drive behavior with tests,
and reshape existing code without breaking it.

We start with simple exercises and progress to advanced techniques. Using code
katas, you practice automated tests (parameterized, golden, characterization)
to build confidence and safety while designing and modernizing code.

Every kata ships in **two languages — PHP and TypeScript**. Pick whichever you
work in; the exercises, tests, and `make` commands mirror each other.

Through pair programming, you experience:

- Collaborative problem-solving
- Test-Driven Development (TDD) in action
- Safe, incremental changes that bring clarity and structure to real code

---

## Katas

Four independent katas. Each lives in its own folder with a shared problem brief
and two language siblings: `php/` and `ts/`. Pick any and start.

| # | Kata | Track | Languages | Focus | Time |
|---|---|---|---|---|---|
| 1 | [Rock Paper Scissors](tdd/rock-paper-scissors/README.md) | TDD | PHP · TS | Parameterized tests, clear rules | 30–45 min |
| 2 | [Guess the Random Number](tdd/guess-random-number/README.md) | TDD | PHP · TS | Mocking randomness, isolating I/O | 45–60 min |
| 3 | [Parrot](refactoring/parrot/README.md) | Refactoring | PHP · TS | Polymorphism, removing smells | 30–45 min |
| 4 | [Tennis](refactoring/tennis/README.md) | Refactoring | PHP · TS | Taming conditionals, naming | 45–60 min |

---

## Setup

> **Attending the workshop?** Read [SETUP.md](SETUP.md) first. A 10-minute
> pre-workshop checklist to verify your machine before the day.

### Option 1: Docker (recommended)

No local PHP or Node needed. Requires Docker running.

```bash
make up-php    # start all 4 PHP kata containers
make up-ts     # start all 4 TS kata containers
make up        # start everything (PHP + TS)

make test-php  # run all PHP tests
make test-ts   # run all TS tests
make test      # run everything

make down      # stop all containers
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

The `make` targets are identical across languages — only the toolchain behind
them differs.

| | PHP | TypeScript |
|---|---|---|
| Runtime | PHP 8.4 | Node 22 |
| Tests | PHPUnit | Vitest |
| Static analysis (`stan`) | PHPStan | `tsc --noEmit` |
| Coding standards (`cs`) | Easy Coding Standard | Biome |

### Option 2: Local

Requires PHP 8.4+ / Composer, or Node 22+ / npm.

```bash
cd <kata-folder>/php     # PHP
composer install && composer test

cd <kata-folder>/ts      # TypeScript
npm install && npm test
```

See each kata's README for details.

---

## Cleanup

Stop and remove all workshop containers:

```bash
make down
```

Or by name:

```bash
docker rm -f \
  ipc26-rps-php ipc26-guess-number-php ipc26-parrot-php ipc26-tennis-php \
  ipc26-rps-ts  ipc26-guess-number-ts  ipc26-parrot-ts  ipc26-tennis-ts
```

---

## Further Reading

### Books

- **Test-Driven Development by Example** by Kent Beck
  ([Amazon](https://www.amazon.de/-/en/Kent-Beck/dp/0321146530/))
- **Refactoring** by Martin Fowler
  ([Amazon](https://www.amazon.de/-/en/Martin-Fowler/dp/0134757599/))
- **Working Effectively with Legacy Code** by Michael C. Feathers
  ([Amazon](https://www.amazon.de/-/en/Michael-C-Feathers/dp/0131177052/))

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
