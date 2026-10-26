import { Wheel } from 'spin-wheel';
import { type RandomSource, SpinnerWheel } from './spinner-wheel';
import './styles.css';

const mathRandom: RandomSource = {
  next: () => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
};

const domainWheel = new SpinnerWheel(mathRandom);

const workoutColors = [
  '#ffc93c',
  '#66bfbf',
  '#a2d5f2',
  '#515070',
  '#43658b',
  '#ed6663',
  '#d54062',
];

const parseNames = (value: string): string[] =>
  value
    .split('\n')
    .map((name) => name.trim())
    .filter((name) => name.length > 0);

const app = document.querySelector<HTMLDivElement>('#app');

if (app) {
  app.innerHTML = `
    <h1>Spinner Wheel</h1>
    <div class="layout">
      <div class="controls">
        <label for="names">Names (one per line)</label>
        <textarea id="names" rows="8">Ada
Bea
Cam</textarea>
        <button id="spin" type="button">Spin</button>
        <p id="message"></p>
      </div>
      <div class="wheel-stage">
        <div class="wheel-pointer" aria-hidden="true"></div>
        <div class="wheel-wrapper"></div>
      </div>
    </div>
  `;

  const namesInput = app.querySelector<HTMLTextAreaElement>('#names');
  const spinButton = app.querySelector<HTMLButtonElement>('#spin');
  const message = app.querySelector<HTMLParagraphElement>('#message');
  const wheelWrapper = app.querySelector<HTMLDivElement>('.wheel-wrapper');

  if (!namesInput || !spinButton || !message || !wheelWrapper) {
    throw new Error('Missing UI elements');
  }

  let pendingPick: string | null = null;

  const showMessage = (text: string, isWarning: boolean) => {
    message.textContent = text;
    message.classList.toggle('is-warning', isWarning);
  };

  const visualWheel = new Wheel(wheelWrapper, {
    items: parseNames(namesInput.value).map((label) => ({ label })),
    radius: 0.84,
    itemLabelRadius: 0.93,
    itemLabelRadiusMax: 0.35,
    itemLabelRotation: 180,
    itemLabelAlign: 'left',
    itemLabelColors: ['#fff'],
    itemLabelBaselineOffset: -0.07,
    itemLabelFont: 'Segoe UI, Helvetica Neue, sans-serif',
    itemLabelFontSizeMax: 42,
    itemBackgroundColors: workoutColors,
    lineWidth: 1,
    lineColor: '#fff',
    borderWidth: 4,
    borderColor: '#111',
    isInteractive: false,
    pointerAngle: 0,
    onRest: () => {
      spinButton.disabled = false;
      if (pendingPick !== null) {
        showMessage(`Retro lead: ${pendingPick}`, false);
        pendingPick = null;
      }
    },
  });

  const syncWheelItems = (names: string[]) => {
    visualWheel.items = names.map((label) => ({ label }));
  };

  namesInput.addEventListener('blur', () => {
    const names = parseNames(namesInput.value);
    if (names.length > 0) {
      syncWheelItems(names);
    }
  });

  spinButton.addEventListener('click', () => {
    const names = parseNames(namesInput.value);
    const result = domainWheel.spin(names);

    if (result.warning) {
      pendingPick = null;
      showMessage(result.warning, true);
      if (names.length > 0) {
        syncWheelItems(names);
      }
      return;
    }

    if (result.pick === null) {
      return;
    }

    const index = names.indexOf(result.pick);
    if (index < 0) {
      showMessage('Could not find the picked name on the wheel', true);
      return;
    }

    syncWheelItems(names);
    pendingPick = result.pick;
    showMessage('Spinning…', false);
    spinButton.disabled = true;
    visualWheel.spinToItem(index, 3000, true, 2, 1);
  });
}
