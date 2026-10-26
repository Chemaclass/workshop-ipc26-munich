---
name: refactor
description: Make one small refactoring on green, chosen together.
argument-hint: [file or smell]
---

Make one small refactoring with the participants. If they named a file or a smell, start there.

Refactoring changes structure, never behavior: no new features, no new or changed tests. If no test covers the code, write that test first with the `tdd-cycle` skill.

1. **Green first.** Run the tests. If any is red, stop.
2. **Spot the smell.** Ask: "What makes this code harder to read or change?" If they are stuck, name the smells you see (long method, duplication, unclear name, magic number, complex conditional, data clump, primitive obsession, needless comment) and let them pick one. **Stop.**
3. **Name the move.** Propose the smallest refactoring for it: rename, extract or inline method, extract class, move method, constant for a magic number, simpler conditional. Offer to let them do it with their IDE. **Stop.**
4. **Make one change.** Apply it and run the tests. If one fails, undo the change and look at why together.
5. **Reflect.** Ask whether it reads better, and suggest the commit. Leave other smells for later.
