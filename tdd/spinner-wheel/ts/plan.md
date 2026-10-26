# Plan: Retro Lead Spinner Wheel (TypeScript)

## Requirement

We need a wheel that randomly picks who leads the next retro. It looks and
moves like a real spinning wheel: it spins, slows down, and stops on one name.

**Example:** names `Anna, Ben, Chris`. We press "Spin". The wheel turns a few
times, slows down, and stops with Ben's segment on top, under the pointer. Ben's
segment is highlighted. "Spin again" starts a new spin.

## Decisions

| # | Topic | Decision |
|---|---|---|
| 1 | Names | Entered in a text field next to the wheel |
| 2 | Duplicates | Duplicate names are numbered: `Anna (1)`, `Anna (2)` |
| 3 | Repeats | ~~The winner stays on the wheel~~ Changed: the winner leaves the wheel (and the text field) when the next spin starts |
| 4 | Random source | Injected as a function `() => number` (0 to below 1), like `Math.random` |
| 5 | Animation | CSS `rotate`; the wheel only turns forward, no wind-up backwards |
| 6 | After the stop | Winner's segment stops on top under the pointer and is highlighted; "Spin again" button |
| 7 | DOM tests | `jsdom` as Vitest environment for the page tests |
| 8 | Pairing | Claude writes the tests; from `spinRotation` on without approval per test, to reach a result fast |

Assumptions (change them if you like): a spin lasts 4 s, makes 5 full turns,
and eases out (fast start, slow stop).

## Design

Pick the winner first, then animate to it. The animation shows a result we
already know, so randomness and motion stay testable on their own.

| Part | Where | Tested |
|---|---|---|
| `Wheel`: names in, winner out, random source injected | `src/` | Unit tests, fake random source |
| Names from the text field: split, trim, blanks, duplicates | `src/` | Unit tests |
| Geometry: segment size, final rotation with winner on top | `src/` | Unit tests |
| Page: text field, wheel, button, highlight | `src/app.ts` | jsdom tests |
| Look and motion: slices, colours, ease-out transition | `src/style.css` | By hand in the browser |
| Edge: real `Math.random` | `src/main.ts` | By hand in the browser |

## Test list (simplest first)

### Wheel
- [x] A wheel with one name picks that name
- [x] With two names, the random source decides: `0` picks the first, `0.99` the second (triangulate)
- [x] A wheel without names cannot spin

### Names from the text field
- [x] Names are split at commas
- [x] Spaces around names are trimmed
- [x] Blank entries are ignored
- [x] Duplicate names are numbered: `Anna (1)`, `Anna (2)`; unique names keep no number
- [x] Duplicates are found case-insensitively

### Geometry
- [x] Each segment covers `360 / number of names` degrees
- [x] The final rotation puts the centre of the winner's segment on top under the pointer
- [x] A spin adds 5 full turns before landing on the winner
- [x] A spin always starts from the current rotation and turns forward (spin again)

### Motion (dropped)
The motion is a CSS `transition` with an ease-out curve, so there is no
rotation-per-frame code to test. "Never backwards" is covered by
`spinRotation`, which always ends ahead of the current rotation.

### Page (jsdom)
- [x] The page shows one segment per entered name
- [x] Each name sits on its own slice, clockwise from the pointer
- [x] The spin button is disabled while the text field is empty
- [x] Clicking spin rotates the wheel to the final rotation
- [x] When the spin ends, the winner's segment is highlighted
- [x] Button and text field are locked while the wheel spins
- [x] "Spin again" starts a new spin from the current rotation and moves the highlight

### Edge
- [x] Wire it up in `main.ts` with `Math.random` and check it in the browser (`make serve`)

### Share the result (no tests, by request)
- [x] After a spin the URL holds the result: `?names=Anna, Ben&winner=Ben`
- [x] The result reads "Ben leads the next retro." with the link and a "Copy link" button
- [x] Opening the link shows the wheel already stopped on the winner, highlighted
- [x] Changing the names or spinning again hides the old result and clears the URL

### Winner leaves the wheel
- [x] Pin: a shared link opens with the wheel stopped on its winner (old links keep working)
- [x] `removeName` removes the name at a wheel position from the text
- [x] Positions count like the wheel: blank entries skipped, duplicates keep their place
- [x] "Spin again" removes the previous winner from the wheel and the text field
- [x] "Spin again" is disabled once the last name has won
- [x] The winner of a shared link also leaves when spinning again
- Changed expectation: "spins again forward" now expects 3 slices on the second spin (the old value assumed the winner stays)

Links keep the format `?names=…&winner=…`. They describe the wheel at the
moment it stopped, with the winner still on it, so old and new links mean the same.

## Resolved details

- Duplicates: `Anna (1)`, `Anna (2)`
- Text field: names separated by commas
- Empty text field: the spin button is disabled

## Working agreement

- One behavior per cycle: red → green → refactor, run `make test` after each step.
- Baby commits: `test:` for red, `feat:` for green, `refactor:` for cleanups. You commit.
- `ChangeMe` stays until our first real test is green, then we delete it.
