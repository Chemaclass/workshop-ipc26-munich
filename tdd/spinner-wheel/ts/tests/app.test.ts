// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest';
import { mountSpinner } from '../src/app';

let root: HTMLDivElement;

beforeEach(() => {
  root = document.createElement('div');
  document.body.replaceChildren(root);
});

function button(action: string) {
  return root.querySelector<HTMLButtonElement>(`button[data-action="${action}"]`);
}

function addName(name: string) {
  const input = root.querySelector('input');
  if (!input) throw new Error('Name input missing');
  input.value = name;
  root.querySelector('form')?.dispatchEvent(new Event('submit', { cancelable: true }));
}

describe('Spinner app', () => {
  it('clears the previous result when participants are added or removed', async () => {
    mountSpinner(root, () => 0);
    addName('Anna');
    button('spin')?.click();
    await Promise.resolve();
    addName('Ben');
    expect(root.querySelector('[role="status"]')?.textContent).toBe('');
    button('spin')?.click();
    await Promise.resolve();
    root.querySelector<HTMLButtonElement>('[aria-label="Ben entfernen"]')?.click();
    expect(root.querySelector('[role="status"]')?.textContent).toBe('');
  });
  it('shows and retains each draw result without an animation timer', async () => {
    const values = [0.99, 0];
    mountSpinner(root, () => values.shift() ?? 0);
    addName('Anna');
    addName('Ben');
    button('spin')?.click();
    await Promise.resolve();
    expect(root.querySelector('[role="status"]')?.textContent).toBe('Ausgewählt: Ben');
    await Promise.resolve();
    expect(root.querySelector('[role="status"]')?.textContent).toBe('Ausgewählt: Ben');
    button('spin')?.click();
    await Promise.resolve();
    expect(root.querySelector('[role="status"]')?.textContent).toBe('Ausgewählt: Anna');
    expect(root.querySelectorAll('li')).toHaveLength(2);
  });
  it('removes individual names and disables drawing after the last removal', () => {
    mountSpinner(root, () => 0);
    addName('Anna');
    addName('Ben');
    root.querySelector<HTMLButtonElement>('[aria-label="Anna entfernen"]')?.click();
    expect(root.querySelector('ul')?.textContent).toBe('Ben');
    root.querySelector<HTMLButtonElement>('[aria-label="Ben entfernen"]')?.click();
    expect(root.querySelectorAll('li')).toHaveLength(0);
    expect(button('spin')?.disabled).toBe(true);
    expect(root.textContent).toContain('Füge zuerst einen Namen hinzu.');
  });
  it('adds names through the form and displays validation feedback', () => {
    mountSpinner(root, () => 0);
    addName('  Anna  ');
    addName('Ben');
    expect(root.querySelector('ul')?.textContent).toBe('AnnaBen');
    expect(button('spin')?.disabled).toBe(false);
    addName(' ANNA ');
    expect(root.querySelector('[role="status"]')?.textContent).toBe('Dieser Name ist bereits vorhanden.');
    addName('  ');
    expect(root.querySelector('[role="status"]')?.textContent).toBe('Bitte gib einen Namen ein.');
    expect(root.querySelectorAll('li')).toHaveLength(2);
  });
  it('disables spinning an empty list and explains how to start', () => {
    mountSpinner(root, () => 0);
    expect(button('spin')?.disabled).toBe(true);
    expect(root.textContent).toContain('Füge zuerst einen Namen hinzu.');
  });
});
