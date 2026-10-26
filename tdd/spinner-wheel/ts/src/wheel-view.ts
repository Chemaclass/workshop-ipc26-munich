import confetti from 'canvas-confetti';
import { SeededRandom } from './seeded-random';
import { type SharedWheel, encodeShare } from './share-link';
import type { Wheel } from './wheel';

const SVG = 'http://www.w3.org/2000/svg';
const CENTER = 140;
const RADIUS = 130;
const COLORS = [
  ['#AFA9EC', '#26215C'],
  ['#5DCAA5', '#04342C'],
  ['#F0997B', '#4A1B0C'],
  ['#ED93B1', '#4B1528'],
  ['#FAC775', '#412402'],
  ['#85B7EB', '#042C53'],
  ['#97C459', '#173404'],
] as const;
const SPIN_MS = 3200;

export interface WheelOptions {
  newSeed: () => number;
  readOnly?: boolean;
}

const TEAM_FORM = `
  <form class="team__form">
    <label for="team-name">Name</label>
    <input id="team-name" name="name" autocomplete="off" placeholder="Anna K." />
    <button type="submit">Add</button>
  </form>
  <p class="team__error" role="alert"></p>
`;

export function mountWheel(
  root: HTMLElement,
  wheel: Wheel,
  options: WheelOptions,
): void {
  root.innerHTML = `
    <h1>Who leads the next retro?</h1>
    <div class="wheel">
      <svg class="wheel__disc" viewBox="0 0 280 280" role="img" aria-labelledby="wheel-title">
        <title id="wheel-title">Spinner wheel</title>
        <g class="wheel__segments"></g>
      </svg>
      <div class="wheel__pointer" aria-hidden="true"></div>
    </div>
    <div class="controls">
      <button class="spin" type="button">Spin</button>
      <p class="result" role="status"></p>
      <button class="copy-link" type="button" hidden>Copy link</button>
    </div>
    <section class="team">
      <h2>Team</h2>
      ${options.readOnly ? '<p class="team__note">Shared wheel, read-only</p>' : TEAM_FORM}
      <ul class="team__list"></ul>
    </section>
  `;
  const disc = query<SVGSVGElement>(root, '.wheel__disc');
  const result = query(root, '.result');
  const copyLink = query<HTMLButtonElement>(root, '.copy-link');
  let rotation = 0;
  let spinning = false;
  let lastSpin: SharedWheel | null = null;

  const segments = query(root, '.wheel__segments');
  const list = query(root, '.team__list');

  const render = () => {
    drawSegments(segments, wheel.names);
    list.replaceChildren(
      ...wheel.names.map((name) => {
        const item = document.createElement('li');
        item.append(name);
        if (options.readOnly) {
          return item;
        }
        const remove = document.createElement('button');
        remove.type = 'button';
        remove.textContent = '×';
        remove.setAttribute('aria-label', `Remove ${name}`);
        remove.addEventListener('click', () => {
          wheel.remove(name);
          render();
        });
        item.append(remove);
        return item;
      }),
    );
  };
  render();

  if (!options.readOnly) {
    const form = query<HTMLFormElement>(root, '.team__form');
    const input = query<HTMLInputElement>(root, '#team-name');
    const error = query(root, '.team__error');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      try {
        wheel.add(input.value);
      } catch (problem) {
        error.textContent = messageOf(problem);
        return;
      }
      input.value = '';
      render();
    });
    input.addEventListener('input', () => {
      error.textContent = '';
    });
  }

  query(root, '.spin').addEventListener('click', () => {
    if (spinning) {
      return;
    }
    const skip = wheel.lastWinner ?? undefined;
    const seed = options.newSeed();
    let picked: string;
    try {
      picked = wheel.spin(new SeededRandom(seed));
    } catch (problem) {
      result.textContent = messageOf(problem);
      return;
    }
    lastSpin = { names: [...wheel.names], seed, skip };
    rotation = rotationToShow(
      wheel.names.indexOf(picked),
      wheel.names.length,
      rotation,
    );
    spinning = true;
    result.textContent = 'Spinning…';
    disc.style.transform = `rotate(${rotation}deg)`;
    setTimeout(() => {
      spinning = false;
      result.textContent = `${picked} leads the next retro`;
      copyLink.hidden = false;
      confetti({
        particleCount: 150,
        spread: 80,
        disableForReducedMotion: true,
      });
    }, spinDuration());
  });

  copyLink.addEventListener('click', async () => {
    if (lastSpin === null) {
      return;
    }
    const link = `${location.origin}${location.pathname}#${encodeShare(lastSpin)}`;
    await navigator.clipboard.writeText(link);
    copyLink.textContent = 'Link copied';
    setTimeout(() => {
      copyLink.textContent = 'Copy link';
    }, 1500);
  });
}

export function mountBrokenLink(
  root: HTMLElement,
  problem: unknown,
  onContinue: () => void,
): void {
  root.innerHTML = `
    <h1>Who leads the next retro?</h1>
    <div class="broken">
      <p class="broken__message" role="alert"></p>
      <button class="spin" type="button">Continue</button>
    </div>
  `;
  query(root, '.broken__message').textContent = messageOf(problem);
  query(root, '.spin').addEventListener('click', onContinue);
}

function messageOf(problem: unknown): string {
  return problem instanceof Error ? problem.message : String(problem);
}

function rotationToShow(index: number, count: number, current: number): number {
  const slice = 360 / count;
  const middle = index * slice + slice / 2;
  const turn = (((360 - middle - current) % 360) + 360) % 360;
  return current + 5 * 360 + turn;
}

function spinDuration(): number {
  return matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : SPIN_MS;
}

function drawSegments(group: Element, names: readonly string[]): void {
  group.replaceChildren();
  const slice = 360 / Math.max(names.length, 1);
  names.forEach((name, index) => {
    const [fill, ink] = COLORS[index % COLORS.length] ?? COLORS[0];
    group.append(segment(index * slice, slice, fill, names.length === 1));
    const middle = index * slice + slice / 2;
    const [x, y] = pointAt(middle, RADIUS * 0.6);
    const label = svg('text', {
      x,
      y,
      fill: ink,
      'text-anchor': 'middle',
      'dominant-baseline': 'central',
      transform: `rotate(${labelAngle(middle)} ${x} ${y})`,
    });
    label.textContent = name;
    group.append(label);
  });
  group.append(
    svg('circle', { cx: CENTER, cy: CENTER, r: 18, class: 'wheel__hub' }),
  );
}

export function labelAngle(middle: number): number {
  return middle > 180 ? middle - 270 : middle - 90;
}

function segment(
  start: number,
  slice: number,
  fill: string,
  whole: boolean,
): SVGElement {
  if (whole) {
    return svg('circle', { cx: CENTER, cy: CENTER, r: RADIUS, fill });
  }
  const [x1, y1] = pointAt(start);
  const [x2, y2] = pointAt(start + slice);
  const largeArc = slice > 180 ? 1 : 0;
  return svg('path', {
    d: `M${CENTER} ${CENTER} L${x1} ${y1} A${RADIUS} ${RADIUS} 0 ${largeArc} 1 ${x2} ${y2} Z`,
    fill,
  });
}

function pointAt(degrees: number, radius = RADIUS): [number, number] {
  const radians = ((degrees - 90) * Math.PI) / 180;
  return [
    CENTER + radius * Math.cos(radians),
    CENTER + radius * Math.sin(radians),
  ];
}

function svg(
  tag: string,
  attributes: Record<string, string | number>,
): SVGElement {
  const element = document.createElementNS(SVG, tag);
  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, String(value));
  }
  return element;
}

function query<T extends Element>(root: ParentNode, selector: string): T {
  const element = root.querySelector<T>(selector);
  if (element === null) {
    throw new Error(`Missing ${selector}`);
  }
  return element;
}
