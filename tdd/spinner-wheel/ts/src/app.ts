import { SpinnerWheel } from './spinner-wheel';

export function mountSpinner(root: HTMLElement, random: () => number): void {
  const wheel = new SpinnerWheel(random);
  root.innerHTML = `
    <h1>Spinner Wheel</h1>
    <form>
      <label for="name">Name</label>
      <input id="name" autocomplete="off" />
      <button type="submit">Hinzufügen</button>
    </form>
    <ul aria-label="Teilnehmer"></ul>
    <button type="button" data-action="spin" disabled>Drehen</button>
    <p role="status">Füge zuerst einen Namen hinzu.</p>
  `;
  const form = root.querySelector('form') as HTMLFormElement;
  const input = root.querySelector('input') as HTMLInputElement;
  const list = root.querySelector('ul') as HTMLUListElement;
  const spin = root.querySelector('[data-action="spin"]') as HTMLButtonElement;
  const status = root.querySelector('[role="status"]') as HTMLParagraphElement;

  function render(message: string | null = null) {
    list.replaceChildren(...wheel.names.map((name) => {
      const item = document.createElement('li');
      item.textContent = name;
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.setAttribute('aria-label', `${name} entfernen`);
      remove.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="2" /></svg>';
      remove.addEventListener('click', () => {
        wheel.remove(name);
        render();
      });
      item.append(remove);
      return item;
    }));
    spin.disabled = wheel.names.length === 0;
    status.textContent = message ?? (wheel.names.length === 0 ? 'Füge zuerst einen Namen hinzu.' : '');
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = wheel.add(input.value);
    if (!message) input.value = '';
    render(message);
    input.focus();
  });
}
