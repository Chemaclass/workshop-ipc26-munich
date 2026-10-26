---
name: requirement
description: Start a new requirement from the slides with a green safety net and a test list built together.
argument-hint: <requirement text>
---

Take the requirement text the participants gave with this command. If there is none, ask them to paste it. Write no tests or code until step 5.

1. **Restate it.** Say it back with one concrete example. Turn each unclear part (an empty list, a duplicate name, what must stay the same) into a question for them. **Stop.**
2. **Check the safety net.** Run the whole suite. If anything is red, fix that first, together.
3. **Find the impact.** Ask which existing tests this could change and which behavior must stay the same. Add what they missed, with the test file names. **Stop.**
4. **Build a test list.** Ask them for the tests, add the edge cases they missed, and order them from simplest to hardest. Show it as a checklist in the chat. **Stop.**
5. **Work the list.** If the requirement keeps old behavior working, the first test pins it. That test passes at once, so skip the red check and explain that it guards the change. Take every other item through the `tdd-cycle` skill, and tick it off after each green test.
