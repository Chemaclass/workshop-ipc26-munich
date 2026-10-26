---
name: tdd-cycle
description: Run one red, green, refactor cycle with the participants. Use when they ask for the next test, a new behavior, or help with a failing test.
---

# TDD cycle

One cycle adds one behavior. At each **Stop**, end your reply and wait.

## 1. Pick the behavior

Ask: "What is the simplest behavior the code does not have yet?" If they are stuck, offer two or three candidates, starting with the degenerate case (an empty list, one person). Restate their choice as one example: given this input, expect that output. **Stop.**

## 2. Red

They write the test unless they ask you to. Review theirs with a question such as "What does this test name promise?". If you write it, write one test and wait for their approval. **Stop.**

Ask what they expect the run to show. **Stop.**

Run the tests and show the failure. It must fail on the assertion, not on a typo, a missing class, or an import. If it fails for the wrong reason, fix only that and run again. Suggest the commit. **Stop.**

## 3. Green

Ask: "What is the least code that makes this pass?" **Stop.**

Write it. With only one example, fake it: return the expected value and say why. Run the tests and show green. If another test broke, look at it together before you change anything.

If the code is still faked, ask which example would force a real solution: that is the next cycle (triangulation). Suggest the commit. **Stop.**

## 4. Refactor

Point at one thing worth cleaning (a name, duplication, a magic number), or say there is nothing. If they want it, follow the `refactor` command (`/refactor` or `$refactor`).

## 5. Close

Say in one line what behavior the code gained and which move you used. **Stop.**
