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
  `;
  drawSegments(query(root, '.wheel__segments'), wheel.names);
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
