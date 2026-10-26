// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mountSpinner } from '../src/app';

let root: HTMLDivElement;

beforeEach(() => {
  root = document.createElement('div');
  document.body.replaceChildren(root);
});

function button(action: string) {
  return root.querySelector<HTMLButtonElement>(
    `button[data-action="${action}"]`,
  );
}

function addName(name: string) {
  const input = root.querySelector('input');
  if (!input) throw new Error('Name input missing');
  input.value = name;
  root
    .querySelector('form')
    ?.dispatchEvent(new Event('submit', { cancelable: true }));
}

describe('Spinner app', () => {
  it('spins to the chosen segment and keeps controls locked until the animation finishes', async () => {
    const values = [0.4, 0.99];
    mountSpinner(root, () => values.shift() ?? 0);
    addName('Anna');
    addName('Ben');
    addName('Clara');
    let finish = () => {};
    const animate = vi.fn(() => ({
      finished: new Promise<void>((resolve) => {
        finish = resolve;
      }),
    }));
    const graphic = root.querySelector('[data-wheel]') as SVGSVGElement;
    Object.defineProperty(graphic, 'animate', { value: animate });
    button('spin')?.click();
    expect(animate).toHaveBeenCalledOnce();
    expect(button('spin')?.disabled).toBe(true);
    await Promise.resolve();
    expect(root.querySelector('[role="status"]')?.textContent).toBe(
      'Choosing…',
    );
    const firstFrames = (animate.mock.calls[0] as unknown as [Keyframe[]])[0];
    const firstAngle = Number(
      String(firstFrames[1]?.transform).match(/rotate\(([\d.]+)deg\)/)?.[1],
    );
    expect(firstAngle).toBeGreaterThanOrEqual(360 * 5);
    const firstLanding = (360 - (firstAngle % 360)) % 360;
    expect(firstLanding).toBeGreaterThan(120);
    expect(firstLanding).toBeLessThan(240);
    expect(firstLanding).not.toBeCloseTo(180);
    finish();
    await Promise.resolve();
    expect(button('spin')?.disabled).toBe(false);
    expect(root.querySelector('[role="status"]')?.textContent).toBe(
      'Selected: Ben',
    );
    button('spin')?.click();
    const secondFrames = (animate.mock.calls[1] as unknown as [Keyframe[]])[0];
    const secondAngle = Number(
      String(secondFrames[1]?.transform).match(/rotate\(([\d.]+)deg\)/)?.[1],
    );
    expect(secondAngle - firstAngle).toBeGreaterThanOrEqual(360 * 5);
    const secondLanding = (360 - (secondAngle % 360)) % 360;
    expect(secondLanding).toBeGreaterThan(240);
    expect(secondLanding).toBeLessThan(360);
    expect(secondLanding).not.toBeCloseTo(300);
    finish();
    await Promise.resolve();
    expect(root.querySelector('[role="status"]')?.textContent).toBe(
      'Selected: Clara',
    );
  });
  it('renders one distinctly colored wheel segment per participant and updates after removal', () => {
    mountSpinner(root, () => 0);
    addName('Anna');
    addName('Ben');
    addName('Clara');
    const segments = root.querySelectorAll('[data-segment]');
    expect(segments).toHaveLength(3);
    expect(
      new Set(Array.from(segments, (segment) => segment.getAttribute('fill')))
        .size,
    ).toBe(3);
    expect(
      Array.from(
        root.querySelectorAll('[data-wheel-label]'),
        (label) => label.textContent,
      ),
    ).toEqual(['Anna', 'Ben', 'Clara']);
    root.querySelector<HTMLButtonElement>('[aria-label="Remove Ben"]')?.click();
    expect(root.querySelectorAll('[data-segment]')).toHaveLength(2);
    expect(
      Array.from(
        root.querySelectorAll('[data-wheel-label]'),
        (label) => label.textContent,
      ),
    ).toEqual(['Anna', 'Clara']);
  });
  it('keeps the draw result visible when an invalid entry leaves the list unchanged', async () => {
    mountSpinner(root, () => 0);
    addName('Anna');
    button('spin')?.click();
    await Promise.resolve();
    addName(' ANNA ');
    expect(root.textContent).toContain('This name is already on the wheel.');
    expect(root.textContent).toContain('Selected: Anna');
    addName('  ');
    expect(root.textContent).toContain('Please enter a name.');
    expect(root.textContent).toContain('Selected: Anna');
  });
  it('starts empty again when the app is initialized after a reload', async () => {
    mountSpinner(root, () => 0);
    addName('Anna');
    button('spin')?.click();
    await Promise.resolve();
    expect(root.textContent).toContain('Selected: Anna');
    mountSpinner(root, () => 0);
    expect(root.querySelectorAll('li')).toHaveLength(0);
    expect(root.querySelector('input')?.value).toBe('');
    expect(button('spin')?.disabled).toBe(true);
    expect(root.querySelector('[role="status"]')?.textContent).toBe(
      'Add a name to get started.',
    );
  });
  it('locks draws and participant changes until the current draw completes', async () => {
    let draws = 0;
    mountSpinner(root, () => {
      draws += 1;
      return 0.99;
    });
    addName('Anna');
    addName('Ben');
    const removeAnna = root.querySelector<HTMLButtonElement>(
      '[aria-label="Remove Anna"]',
    );
    button('spin')?.click();
    expect(
      Array.from(
        root.querySelectorAll<HTMLInputElement | HTMLButtonElement>(
          'input, button',
        ),
      ).every((control) => control.disabled),
    ).toBe(true);
    button('spin')?.dispatchEvent(new Event('click'));
    removeAnna?.dispatchEvent(new Event('click'));
    addName('Clara');
    expect(root.querySelector('ul')?.textContent).toBe('AnnaBen');
    await Promise.resolve();
    expect(draws).toBe(1);
    expect(root.querySelector('[role="status"]')?.textContent).toBe(
      'Selected: Ben',
    );
    expect(
      Array.from(
        root.querySelectorAll<HTMLInputElement | HTMLButtonElement>(
          'input, button',
        ),
      ).every((control) => !control.disabled),
    ).toBe(true);
    button('spin')?.click();
    await Promise.resolve();
    expect(draws).toBe(2);
  });
  it('clears the previous result when participants are added or removed', async () => {
    mountSpinner(root, () => 0);
    addName('Anna');
    button('spin')?.click();
    await Promise.resolve();
    addName('Ben');
    expect(root.querySelector('[role="status"]')?.textContent).toBe('');
    button('spin')?.click();
    await Promise.resolve();
    root.querySelector<HTMLButtonElement>('[aria-label="Remove Ben"]')?.click();
    expect(root.querySelector('[role="status"]')?.textContent).toBe('');
  });
  it('shows and retains each draw result without an animation timer', async () => {
    const values = [0.99, 0];
    mountSpinner(root, () => values.shift() ?? 0);
    addName('Anna');
    addName('Ben');
    button('spin')?.click();
    await Promise.resolve();
    expect(root.querySelector('[role="status"]')?.textContent).toBe(
      'Selected: Ben',
    );
    await Promise.resolve();
    expect(root.querySelector('[role="status"]')?.textContent).toBe(
      'Selected: Ben',
    );
    button('spin')?.click();
    await Promise.resolve();
    expect(root.querySelector('[role="status"]')?.textContent).toBe(
      'Selected: Anna',
    );
    expect(root.querySelectorAll('li')).toHaveLength(2);
  });
  it('removes individual names and disables drawing after the last removal', () => {
    mountSpinner(root, () => 0);
    addName('Anna');
    addName('Ben');
    root
      .querySelector<HTMLButtonElement>('[aria-label="Remove Anna"]')
      ?.click();
    expect(root.querySelector('ul')?.textContent).toBe('Ben');
    root.querySelector<HTMLButtonElement>('[aria-label="Remove Ben"]')?.click();
    expect(root.querySelectorAll('li')).toHaveLength(0);
    expect(button('spin')?.disabled).toBe(true);
    expect(root.textContent).toContain('Add a name to get started.');
  });
  it('adds names through the form and displays validation feedback', () => {
    mountSpinner(root, () => 0);
    addName('  Anna  ');
    addName('Ben');
    expect(root.querySelector('ul')?.textContent).toBe('AnnaBen');
    expect(button('spin')?.disabled).toBe(false);
    addName(' ANNA ');
    expect(root.querySelector('[role="status"]')?.textContent).toBe(
      'This name is already on the wheel.',
    );
    addName('  ');
    expect(root.querySelector('[role="status"]')?.textContent).toBe(
      'Please enter a name.',
    );
    expect(root.querySelectorAll('li')).toHaveLength(2);
  });
  it('disables spinning an empty list and explains how to start', () => {
    mountSpinner(root, () => 0);
    expect(button('spin')?.disabled).toBe(true);
    expect(root.textContent).toContain('Add a name to get started.');
  });
});
