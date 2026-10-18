# Gilded Rose Refactoring Kata

Refactor legacy code you didn't write and don't fully understand. Pin its current behavior with a golden master, then untangle the nested conditionals step by step and add a new feature safely.

## Getting Started

This kata comes in two languages. Pick one:

- **PHP** → [`php/`](php/) (PHP 8.4 + PHPUnit)
- **TypeScript** → [`ts/`](ts/) (Node + Vitest)

The `make` interface is identical in both. From your chosen folder:

```bash
make up      # build + start container, install deps
make test    # run tests
make watch   # re-run tests on every save
make stan    # static analysis / type check
make cs      # check coding standards
make fix-cs  # fix coding standards
make down    # stop
```

Prefer no Docker? `cd php && composer install && composer test`, or `cd ts && npm install && npm test`.

---

## About This Kata

### The Scenario

Hi and welcome to team Gilded Rose. As you know, we are a small inn with a prime location in a prominent city ran by a friendly innkeeper named Allison. We also buy and sell only the finest goods. Unfortunately, our goods are constantly degrading in `Quality` as they approach their sell by date.

We have a system in place that updates our inventory for us. It was developed by a no-nonsense type named Leeroy, who has moved on to new adventures. Your task is to add the new feature to our system so that we can begin selling a new category of items.

### Requirements

- All items have a `SellIn` value which denotes the number of days we have to sell the item
- All items have a `Quality` value which denotes how valuable the item is
- At the end of each day our system lowers both values for every item
- Once the sell by date has passed, `Quality` degrades twice as fast
- The `Quality` of an item is never negative
- **"Aged Brie"** actually increases in `Quality` the older it gets
- The `Quality` of an item is never more than `50`
- **"Sulfuras"**, being a legendary item, never has to be sold or decreases in `Quality`; its `Quality` is `80` and it never alters
- **"Backstage passes"**, like Aged Brie, increase in `Quality` as their `SellIn` value approaches: by `2` when there are `10` days or less, by `3` when there are `5` days or less, and `Quality` drops to `0` after the concert

**The new feature:** we have recently signed a supplier of conjured items.

- **"Conjured"** items degrade in `Quality` twice as fast as normal items

Feel free to make any changes to the `updateQuality` method and add any new code as long as everything still works correctly. However, do not alter the `Item` class or the `items` property, as those belong to the goblin in the corner who will insta-rage and one-shot you, as he doesn't believe in shared code ownership.

### Project Structure

- `src/` — the legacy code to refactor (`GildedRose` and the untouchable `Item`)
- `tests/` — the original starter tests, kept exactly as upstream ships them:
  - `GildedRoseTest` / `gilded-rose.spec.ts` — a unit test that fails on purpose (it expects `fixme`)
  - `ApprovalTest` / `approvals.spec.ts` — approval tests with two styles (`foo` and `thirtyDays`); pick one and delete the other
- Text fixture that runs a sample inventory through N days and prints it: `php/fixtures/texttest_fixture.php`, `ts/tests/golden-master-text-test.ts`

### How to Approach

- Nothing protects you yet. Before refactoring, build your own safety net
- Fix the failing starter test, then write unit tests for each rule from the requirements, or
- Use the approval tests as a golden master: the first run records the current output (PHP writes `tests/approvals/*.received.txt`, rename to `.approved.txt`; TS writes a Vitest snapshot), and later runs fail on any change
- Refactor in small steps, running the tests after every change
- Only then add the Conjured feature

---

> Original: https://github.com/emilybache/GildedRose-Refactoring-Kata
