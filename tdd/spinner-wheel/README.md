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

The rules your agent follows live in [`.agnostic-ai/`](.agnostic-ai/). [agnostic-ai](https://github.com/Chemaclass/agnostic-ai) turns them into the files your AI tool reads. Set it up once, from this folder:

```bash
npm install -g agnostic-ai                           # or: https://agnostic-ai.org/docs/installation/
echo "targets: [gemini]" > agnostic-ai.local.yaml   # your tools: claude, codex, gemini, grok, junie, cursor, copilot, ...
agnostic-ai sync
```

`agnostic-ai.local.yaml` and the generated files stay out of git, so each pair can use a different tool. Without a local file, sync writes files for Claude Code and Codex. To change a rule, edit `.agnostic-ai/` and run `agnostic-ai sync` again.

The agent works as your pair partner: one step at a time, asking before it tells. These help you steer it:

- `tdd-cycle`: one red, green, refactor cycle. The agent picks it up when you ask for the next test.
- `requirement`: start a new requirement from the slides with a test list you build together.
- `refactor`: one small cleanup on green.
- `navigator`: an agent that reviews your latest diff by asking you questions.

Run `requirement` and `refactor` the way your tool runs commands or skills: `/requirement` in Claude Code, `$requirement` in Codex.
