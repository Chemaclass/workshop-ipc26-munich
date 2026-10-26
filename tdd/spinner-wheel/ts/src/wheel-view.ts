const svgNamespace = 'http://www.w3.org/2000/svg';

export function optionColor(index: number): string {
  return `hsl(${(18 + index * 137.508) % 360} 28% 68%)`;
}

export function renderWheel(
  svg: SVGSVGElement,
  names: readonly string[],
): void {
  svg.replaceChildren();
  const count = names.length || 8;
  const step = 360 / count;
  for (let index = 0; index < count; index += 1) {
    const start = ((index * step - 90) * Math.PI) / 180;
    const end = (((index + 1) * step - 90) * Math.PI) / 180;
    const segment = document.createElementNS(
      svgNamespace,
      count === 1 ? 'circle' : 'path',
    );
    if (count === 1) {
      segment.setAttribute('cx', '250');
      segment.setAttribute('cy', '250');
      segment.setAttribute('r', '244');
    } else {
      segment.setAttribute(
        'd',
        `M250 250 L${250 + 244 * Math.cos(start)} ${250 + 244 * Math.sin(start)} A244 244 0 ${step > 180 ? 1 : 0} 1 ${250 + 244 * Math.cos(end)} ${250 + 244 * Math.sin(end)} Z`,
      );
    }
    segment.setAttribute('fill', optionColor(index));
    segment.setAttribute('stroke', '#f6f3ed');
    segment.setAttribute('stroke-width', '2');
    if (names.length) segment.setAttribute('data-segment', '');
    svg.append(segment);

    const name = names[index];
    if (name === undefined) continue;
    const angle = index * step + step / 2 - 90;
    const middle = (angle * Math.PI) / 180;
    const label = document.createElementNS(svgNamespace, 'text');
    label.setAttribute('data-wheel-label', '');
    label.setAttribute('text-anchor', 'middle');
    label.setAttribute('dominant-baseline', 'central');
    label.setAttribute(
      'transform',
      `translate(${250 + 145 * Math.cos(middle)} ${250 + 145 * Math.sin(middle)}) rotate(${angle > 90 && angle < 270 ? angle + 180 : angle})`,
    );
    label.setAttribute('fill', '#27332e');
    label.setAttribute('font-size', names.length > 12 ? '12' : '17');
    label.setAttribute('font-weight', '600');
    label.textContent = name.length > 18 ? `${name.slice(0, 17)}…` : name;
    const title = document.createElementNS(svgNamespace, 'title');
    title.textContent = name;
    segment.append(title);
    svg.append(label);
  }
}
