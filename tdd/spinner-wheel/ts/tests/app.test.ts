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
  it('disables spinning an empty list and explains how to start', () => {
    mountSpinner(root, () => 0);
    expect(button('spin')?.disabled).toBe(true);
    expect(root.textContent).toContain('Füge zuerst einen Namen hinzu.');
  });
});
