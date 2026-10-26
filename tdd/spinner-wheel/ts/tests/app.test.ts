// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import { mountApp } from '../src/app';

function startApp(random: () => number = () => 0, url = '/'): HTMLElement {
  // Each test starts without a shared result in the URL, unless it opens one.
  history.replaceState(null, '', url);
  const root = document.createElement('div');
  mountApp(root, random);

  return root;
}

function enterNames(root: HTMLElement, text: string): void {
  const field = root.querySelector('input') as HTMLInputElement;
  field.value = text;
  field.dispatchEvent(new Event('input'));
}

function spinButton(root: HTMLElement): HTMLButtonElement {
  return root.querySelector('button') as HTMLButtonElement;
}

function wheel(root: HTMLElement): HTMLElement {
  return root.querySelector('.wheel') as HTMLElement;
}

function stopSpinning(root: HTMLElement): void {
  wheel(root).dispatchEvent(new Event('transitionend'));
}

function highlightedLabels(root: HTMLElement): string[] {
  return Array.from(root.querySelectorAll('.segment.winner')).map(
    (segment) => segment.textContent ?? '',
  );
}

function segmentLabels(root: HTMLElement): string[] {
  return Array.from(root.querySelectorAll('.segment')).map(
    (segment) => segment.textContent ?? '',
  );
}

describe('Spinner wheel page', () => {
  it('shows one segment per entered name', () => {
    const root = startApp();

    enterNames(root, 'Anna, Ben, Chris');

    expect(segmentLabels(root)).toEqual(['Anna', 'Ben', 'Chris']);
  });

  it('places each name on its own slice, clockwise from the pointer', () => {
    const root = startApp();

    enterNames(root, 'Anna, Ben, Chris, Dana');

    const slices = Array.from(
      root.querySelectorAll<HTMLElement>('.segment'),
    ).map((segment) => [
      segment.style.transform,
      segment.style.getPropertyValue('--slice'),
    ]);
    expect(slices).toEqual([
      ['rotate(0deg)', '90deg'],
      ['rotate(90deg)', '90deg'],
      ['rotate(180deg)', '90deg'],
      ['rotate(270deg)', '90deg'],
    ]);
  });

  it('disables the spin button while there are no names', () => {
    const root = startApp();

    expect(spinButton(root).disabled).toBe(true);

    enterNames(root, 'Anna');
    expect(spinButton(root).disabled).toBe(false);

    enterNames(root, ' , ');
    expect(spinButton(root).disabled).toBe(true);
  });

  it('turns the picked name to the pointer when spinning', () => {
    const pickLast = () => 0.99;
    const root = startApp(pickLast);
    enterNames(root, 'Anna, Ben, Chris, Dana');

    spinButton(root).click();

    expect(wheel(root).style.transform).toBe(`rotate(${5 * 360 + 45}deg)`);
  });

  it('highlights the winner once the wheel stops', () => {
    const pickLast = () => 0.99;
    const root = startApp(pickLast);
    enterNames(root, 'Anna, Ben, Chris, Dana');

    spinButton(root).click();
    expect(highlightedLabels(root)).toEqual([]);

    stopSpinning(root);
    expect(highlightedLabels(root)).toEqual(['Dana']);
  });

  it('locks the spin button and the names while the wheel spins', () => {
    const root = startApp();
    const field = root.querySelector('input') as HTMLInputElement;
    enterNames(root, 'Anna, Ben');

    spinButton(root).click();
    expect(spinButton(root).disabled).toBe(true);
    expect(field.disabled).toBe(true);

    stopSpinning(root);
    expect(spinButton(root).disabled).toBe(false);
    expect(field.disabled).toBe(false);
  });

  it('opens a shared link with the wheel stopped on its winner', () => {
    const root = startApp(() => 0, '/?names=Anna%2C+Ben%2C+Chris&winner=Ben');

    expect(segmentLabels(root)).toEqual(['Anna', 'Ben', 'Chris']);
    expect(highlightedLabels(root)).toEqual(['Ben']);
    expect(wheel(root).style.transform).toBe('rotate(180deg)');
  });

  it('lets the winner of a shared link leave when spinning again', () => {
    const root = startApp(() => 0, '/?names=Anna%2C+Ben%2C+Chris&winner=Ben');

    spinButton(root).click();

    expect(segmentLabels(root)).toEqual(['Anna', 'Chris']);
  });

  it('spins again forward from where the wheel stopped', () => {
    const picks = [0.99, 0];
    const root = startApp(() => picks.shift() ?? 0);
    enterNames(root, 'Anna, Ben, Chris, Dana');
    spinButton(root).click();
    stopSpinning(root);

    expect(spinButton(root).textContent).toBe('Spin again');

    // Dana has left the wheel: three slices of 120°, Anna lands at 300°.
    spinButton(root).click();
    expect(highlightedLabels(root)).toEqual([]);
    expect(wheel(root).style.transform).toBe(
      `rotate(${5 * 360 + 45 + 5 * 360 + 255}deg)`,
    );

    stopSpinning(root);
    expect(highlightedLabels(root)).toEqual(['Anna']);
  });

  it('cannot spin again once the last name has won', () => {
    const root = startApp();
    enterNames(root, 'Anna');

    spinButton(root).click();
    stopSpinning(root);

    expect(highlightedLabels(root)).toEqual(['Anna']);
    expect(spinButton(root).disabled).toBe(true);
  });

  it('lets the winner leave the wheel when spinning again', () => {
    const pickLast = () => 0.99;
    const root = startApp(pickLast);
    enterNames(root, 'Anna, Ben, Chris');
    spinButton(root).click();
    stopSpinning(root);

    expect(segmentLabels(root)).toEqual(['Anna', 'Ben', 'Chris']);

    spinButton(root).click();

    expect(segmentLabels(root)).toEqual(['Anna', 'Ben']);
    expect((root.querySelector('input') as HTMLInputElement).value).toBe(
      'Anna, Ben',
    );
  });
});
