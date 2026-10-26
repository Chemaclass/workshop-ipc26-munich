import { SpinnerWheel } from './spinner-wheel';
import { renderWheel } from './wheel-view';

export function mountSpinner(root: HTMLElement, random: () => number): void {
  const wheel = new SpinnerWheel(random);
  let result: string | null = null;
  let drawing = false;
  root.innerHTML = `
    <h1>Spinner Wheel</h1>
    <svg data-wheel viewBox="0 0 500 500" role="img" aria-label="Glücksrad"></svg>
    <form>
      <label for="name">Name</label>
      <input id="name" autocomplete="off" />
      <button type="submit">Hinzufügen</button>
    </form>
    <ul aria-label="Teilnehmer"></ul>
    <button type="button" data-action="spin" disabled>Drehen</button>
    <p data-result hidden></p>
    <p role="status">Füge zuerst einen Namen hinzu.</p>
  `;
  const form = root.querySelector('form') as HTMLFormElement;
  const wheelGraphic = root.querySelector('[data-wheel]') as SVGSVGElement;
  const input = root.querySelector('input') as HTMLInputElement;
  const list = root.querySelector('ul') as HTMLUListElement;
  const spin = root.querySelector('[data-action="spin"]') as HTMLButtonElement;
  const status = root.querySelector('[role="status"]') as HTMLParagraphElement;
  const retainedResult = root.querySelector(
    '[data-result]',
  ) as HTMLParagraphElement;

  function render(message: string | null = null) {
    renderWheel(wheelGraphic, wheel.names);
    retainedResult.textContent = message && result ? result : '';
    retainedResult.hidden = !retainedResult.textContent;
    list.replaceChildren(
      ...wheel.names.map((name) => {
        const item = document.createElement('li');
        item.textContent = name;
        const remove = document.createElement('button');
        remove.type = 'button';
        remove.setAttribute('aria-label', `${name} entfernen`);
        remove.innerHTML =
          '<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="2" /></svg>';
        remove.addEventListener('click', () => {
          if (drawing) return;
          wheel.remove(name);
          result = null;
          render();
        });
        item.append(remove);
        return item;
      }),
    );
    for (const control of root.querySelectorAll<
      HTMLInputElement | HTMLButtonElement
    >('input, button')) {
      control.disabled = drawing;
    }
    spin.disabled = drawing || wheel.names.length === 0;
    status.textContent =
      message ??
      result ??
      (wheel.names.length === 0 ? 'Füge zuerst einen Namen hinzu.' : '');
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (drawing) return;
    const message = wheel.add(input.value);
    if (!message) {
      input.value = '';
      result = null;
    }
    render(message);
    input.focus();
  });

  spin.addEventListener('click', () => {
    if (drawing || wheel.names.length === 0) return;
    drawing = true;
    result = null;
    render('Wird ausgewählt…');
    void Promise.resolve().then(() => {
      const selected = wheel.spin();
      result = selected === null ? null : `Ausgewählt: ${selected}`;
      drawing = false;
      render();
    });
  });
  render();
}
