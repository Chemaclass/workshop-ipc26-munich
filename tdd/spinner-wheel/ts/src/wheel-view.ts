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

export function mountWheel(root: HTMLElement, wheel: Wheel): void {
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
    </div>
    <section class="team">
      <h2>Team</h2>
      <form class="team__form">
        <label for="team-name">Name</label>
        <input id="team-name" name="name" autocomplete="off" placeholder="Anna K." />
        <button type="submit">Add</button>
      </form>
      <p class="team__error" role="alert"></p>
      <ul class="team__list"></ul>
    </section>
  `;
  const disc = query<SVGSVGElement>(root, '.wheel__disc');
  const result = query(root, '.result');
  let rotation = 0;
  let spinning = false;

  const segments = query(root, '.wheel__segments');
  const list = query(root, '.team__list');
  const form = query<HTMLFormElement>(root, '.team__form');
  const input = query<HTMLInputElement>(root, '#team-name');
  const error = query(root, '.team__error');

  const render = () => {
    drawSegments(segments, wheel.names);
    list.replaceChildren(
      ...wheel.names.map((name) => {
        const item = document.createElement('li');
        const remove = document.createElement('button');
        remove.type = 'button';
        remove.textContent = '×';
        remove.setAttribute('aria-label', `Remove ${name}`);
        remove.addEventListener('click', () => {
          wheel.remove(name);
          render();
        });
        item.append(name, remove);
        return item;
      }),
    );
  };
  render();

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

  query(root, '.spin').addEventListener('click', () => {
    if (spinning) {
      return;
    }
    const picked = wheel.spin();
    rotation = rotationToShow(wheel.names.indexOf(picked), wheel.names.length, rotation);
    spinning = true;
    result.textContent = 'Spinning…';
    disc.style.transform = `rotate(${rotation}deg)`;
    setTimeout(() => {
      spinning = false;
      result.textContent = `${picked} leads the next retro`;
    }, spinDuration());
  });
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
    const label = svg('text', {
      x: CENTER + RADIUS * 0.6,
      y: CENTER,
      fill: ink,
      'text-anchor': 'middle',
      'dominant-baseline': 'central',
      transform: `rotate(${index * slice + slice / 2 - 90} ${CENTER} ${CENTER})`,
    });
    label.textContent = name;
    group.append(label);
  });
  group.append(svg('circle', { cx: CENTER, cy: CENTER, r: 18, class: 'wheel__hub' }));
}

function segment(start: number, slice: number, fill: string, whole: boolean): SVGElement {
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

function pointAt(degrees: number): [number, number] {
  const radians = ((degrees - 90) * Math.PI) / 180;
  return [CENTER + RADIUS * Math.cos(radians), CENTER + RADIUS * Math.sin(radians)];
}

function svg(tag: string, attributes: Record<string, string | number>): SVGElement {
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
