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
3. Make a baby commit on each step: red -> green -> refactor

## Agent rules

The rules your agent follows live in [`.agnostic-ai/AGNOSTIC_AI.md`](.agnostic-ai/AGNOSTIC_AI.md). [agnostic-ai](https://github.com/Chemaclass/agnostic-ai) generates `AGENTS.md` and `CLAUDE.md` from it. To change a rule, edit that file and run `agnostic-ai sync`.

The agent works as your pair partner: one step at a time, asking before it tells. These help you steer it:

- `tdd-cycle`: one red, green, refactor cycle. The agent picks it up when you ask for the next test.
- `/requirement <text>`: start a new requirement from the slides with a test list you build together.
- `/refactor`: one small cleanup on green.
- `navigator`: an agent that reviews your latest diff by asking you questions.

In Codex, run `$requirement` and `$refactor` instead.
