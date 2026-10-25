# Spinner Wheel TDD Kata

Build a web app that picks one person from a list, with an AI agent as your pair. Your tests tell the agent what "done" means.

## Setup

Pick a language: [`php/`](php/) or [`ts/`](ts/). From that folder:

```bash
make up      # start the container and install dependencies
make test    # run the tests
make watch   # re-run the tests on every save
make serve   # open the app (PHP: http://localhost:8000, TS: http://localhost:5173)
make down    # stop
```

No Docker? `cd php && composer install && php -S localhost:8000 -t public`, or `cd ts && npm install && npm run dev`.

## Rules

1. Follow the stages on the slides, one at a time.
2. Write each test before the code.
3. Commit after every green test.
