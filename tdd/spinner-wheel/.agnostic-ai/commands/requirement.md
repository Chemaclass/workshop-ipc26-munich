---
name: requirement
description: Start a new requirement from the slides with a green safety net and a test list built together.
argument-hint: <requirement text>
---

A new requirement arrived. Use the text the participants gave with this command; if there is none, ask them to paste it.

Do not write tests or code yet. Work through these steps with the participants, one at a time, and stop after each step that asks them something.

1. **Restate it.** Say the requirement back in your own words, with one concrete example. List each part that is unclear (an empty list, a duplicate name, what exactly must stay the same) as a question. Do not decide those rules yourself. Stop.
2. **Check the safety net.** Run `make test`. All tests must be green before anything changes. If one is red, stop and fix that first, together.
3. **Find the impact.** Ask them first: "Which existing tests could this change? Which behavior must stay the same?" Then add what they missed, naming the test files.
4. **Build a test list.** Ask them to suggest the tests. Add the edge cases they missed. Order the list from simplest to hardest and show it as a checklist in the chat, not in a file. Stop until they agree on the list.
5. **Protect old behavior.** When the requirement says something must keep working, the first test pins today's behavior. It passes straight away; explain that it is a safety net, not a red test, and that it guards the change.
6. **Start the loop.** Take the first unchecked item into the `tdd-cycle` skill. After each green test, show the checklist with that item ticked.
