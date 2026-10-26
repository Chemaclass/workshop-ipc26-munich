import { type RandomSource, SpinnerWheel } from './spinner-wheel';

const mathRandom: RandomSource = {
  next: () => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
};

const wheel = new SpinnerWheel(mathRandom);

const app = document.querySelector<HTMLDivElement>('#app');

if (app) {
  app.innerHTML = `
    <h1>Spinner Wheel</h1>
    <label for="names">Names (one per line)</label>
    <textarea id="names" rows="6" cols="30"></textarea>
    <button id="spin" type="button">Spin</button>
    <p id="message"></p>
  `;

  const namesInput = app.querySelector<HTMLTextAreaElement>('#names');
  const spinButton = app.querySelector<HTMLButtonElement>('#spin');
  const message = app.querySelector<HTMLParagraphElement>('#message');

  spinButton?.addEventListener('click', () => {
    if (!namesInput || !message) {
      return;
    }

    const names = namesInput.value
      .split('\n')
      .map((name) => name.trim())
      .filter((name) => name.length > 0);

    const result = wheel.spin(names);

    if (result.warning) {
      message.textContent = result.warning;
      return;
    }

    message.textContent = `Retro lead: ${result.pick}`;
  });
}
