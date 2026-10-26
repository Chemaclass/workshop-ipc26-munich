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

Then set up your AI tool: see [AI agent setup](#ai-agent-setup).

## Rules

1. Follow the stages on the slides, one at a time.
2. Write each test before the code.
3. Make a baby commit on each step: red -> green -> refactor

## AI agent setup

Do this once per laptop before the kata. [agnostic-ai](https://github.com/Chemaclass/agnostic-ai) turns the shared rules in [`.agnostic-ai/`](.agnostic-ai/) into the files your AI tool reads, so each pair can use a different tool.

**TL;DR**, from this folder (`tdd/spinner-wheel/`):

1. Install agnostic-ai: `npm install -g agnostic-ai` (no Node? see [other ways to install](https://agnostic-ai.org/docs/installation/)).
2. Pick your tools. Use the names from the [supported tools list](https://agnostic-ai.org/docs/targets/), such as `claude`, `codex`, `gemini`, `grok`, `junie`, `cursor` or `copilot`:
   ```bash
   echo "targets: [gemini]" > agnostic-ai.local.yaml
   ```
3. Generate the files: `agnostic-ai sync`. It prints what your tool now reads.
4. Start your AI tool from this folder, so it finds those files.

Without `agnostic-ai.local.yaml`, sync writes files for Claude Code and Codex. Your local file and the generated files stay out of git. One exception: Grok skips rule files that git ignores, so `.grok/rules/` shows up as untracked. Do not commit it. After a `git pull`, run `agnostic-ai sync` again. To change a rule, edit `.agnostic-ai/` and sync. Something wrong? Run `agnostic-ai doctor`.

### What the agent does

The agent works as your pair partner: one step at a time, asking before it tells. These help you steer it:

- `tdd-cycle`: one red, green, refactor cycle. The agent picks it up when you ask for the next test.
- `requirement`: start a new requirement from the slides with a test list you build together.
- `refactor`: one small cleanup on green.
- `navigator`: an agent that reviews your latest diff by asking you questions.

Run `requirement` and `refactor` the way your tool runs commands or skills: `/requirement` in Claude Code, `$requirement` in Codex.
