---
name: refactor
description: Make one small refactoring on green, chosen together, with the tests run after it.
argument-hint: [file or smell]
---

Refactor together with the participants, one small step. If they named a file or a smell with this command, start there.

Refactoring changes the structure, never the behavior. No new features, no new tests, no changed tests.

1. **Green first.** Run the tests as the TDD loop rules say (`make test` in `php/` or `ts/`; `composer test` or `npm test` without Docker). If anything is red, stop: refactoring happens only on green.
2. **Spot the smell.** Ask them: "What makes this code harder to read or change?" If they are stuck, name the smells you see from this list and let them pick one: long method, duplicated code, unclear name, magic number, complex conditional, data clump, primitive obsession, unnecessary comment.
3. **Name the move.** Propose the smallest refactoring for that smell: rename, extract method, inline method, extract class, move method, replace magic number with a constant, simplify conditional. Mention that their IDE can do renames and extractions safely, and offer to let them do it there. Stop until they choose.
4. **Make one change.** Apply only that refactoring. Run the tests and show the result. If a test fails, undo the change and look at why together.
5. **Reflect.** Ask: "Is it easier to read now?" Suggest a `refactor:` commit. Leave other smells for the next step: improve one thing, not everything.

If the code has no test that covers it, stop and write that test first with the `tdd-cycle` skill.
