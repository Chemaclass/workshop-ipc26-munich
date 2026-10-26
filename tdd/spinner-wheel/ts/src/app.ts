import { segmentAngle, spinRotation, targetRotation } from './geometry';
import { parseNames, removeName } from './names';
import { Wheel } from './wheel';

export function mountApp(root: HTMLElement, random: () => number): void {
  root.innerHTML = `
    <main class="spinner">
      <aside class="controls">
        <h1>Who leads the next retro?</h1>
        <label>
          Names, separated by commas
          <input name="names" type="text" placeholder="Anna, Ben, Chris" autocomplete="off">
        </label>
        <button type="button" disabled>Spin</button>
        <div class="share" hidden>
          <p class="result" aria-live="polite"></p>
          <label>
            Share the result
            <input name="share-link" type="text" readonly>
          </label>
          <button type="button" class="copy">Copy link</button>
        </div>
      </aside>
      <section class="stage">
        <div class="pointer" aria-hidden="true"></div>
        <div class="wheel"></div>
      </section>
    </main>
  `;

  const field = root.querySelector('input') as HTMLInputElement;
  const button = root.querySelector('button') as HTMLButtonElement;
  const wheelElement = root.querySelector('.wheel') as HTMLElement;
  const share = root.querySelector('.share') as HTMLElement;
  const result = root.querySelector('.result') as HTMLElement;
  const shareLink = root.querySelector(
    'input[name="share-link"]',
  ) as HTMLInputElement;
  const copyButton = root.querySelector('.copy') as HTMLButtonElement;

  let names: string[] = [];
  let rotation = 0;
  let winnerIndex = -1;

  function showNames(): void {
    names = parseNames(field.value);
    wheelElement.replaceChildren(...renderSegments(names));
    button.disabled = names.length === 0;
  }

  function showWinner(): void {
    const winner = names[winnerIndex] ?? '';
    wheelElement.children[winnerIndex]?.classList.add('winner');
    button.textContent = 'Spin again';
    // The winner leaves on the next spin, so someone else must be left.
    button.disabled = names.length <= 1;
    result.textContent = `${winner} leads the next retro.`;
    shareLink.value = resultLink(field.value, winner);
    copyButton.textContent = 'Copy link';
    share.hidden = false;
    history.replaceState(null, '', shareLink.value);
  }

  function hideWinner(): void {
    wheelElement.children[winnerIndex]?.classList.remove('winner');
    share.hidden = true;
    history.replaceState(null, '', location.pathname);
  }

  field.addEventListener('input', () => {
    hideWinner();
    winnerIndex = -1;
    showNames();
  });

  button.addEventListener('click', () => {
    hideWinner();
    if (winnerIndex !== -1) {
      field.value = removeName(field.value, winnerIndex);
      showNames();
    }

    const winner = new Wheel(names, random).spin();
    winnerIndex = names.indexOf(winner);
    rotation = spinRotation(rotation, winnerIndex, names.length);
    wheelElement.style.transform = `rotate(${rotation}deg)`;
    button.disabled = true;
    field.disabled = true;
  });

  wheelElement.addEventListener('transitionend', (event) => {
    if (event.target !== wheelElement) {
      return;
    }

    showWinner();
    field.disabled = false;
  });

  copyButton.addEventListener('click', async () => {
    shareLink.select();
    try {
      await navigator.clipboard.writeText(shareLink.value);
      copyButton.textContent = 'Copied!';
    } catch {
      copyButton.textContent = 'Press Ctrl+C to copy';
    }
  });

  // A shared link opens with the wheel already stopped on its winner.
  const shared = new URLSearchParams(location.search);
  field.value = shared.get('names') ?? '';
  showNames();
  winnerIndex = names.indexOf(shared.get('winner') ?? '');
  if (winnerIndex !== -1) {
    rotation = targetRotation(winnerIndex, names.length);
    wheelElement.style.transform = `rotate(${rotation}deg)`;
    showWinner();
  }
}

function resultLink(names: string, winner: string): string {
  const link = new URL(location.pathname, location.origin);
  link.searchParams.set('names', names);
  link.searchParams.set('winner', winner);

  return link.toString();
}

function renderSegments(names: string[]): HTMLElement[] {
  const slice = segmentAngle(names.length);

  return names.map((name, index) => {
    const label = document.createElement('span');
    label.className = 'label';
    label.textContent = name;

    const segment = document.createElement('div');
    segment.className = 'segment';
    segment.style.transform = `rotate(${index * slice}deg)`;
    segment.style.setProperty('--slice', `${slice}deg`);
    segment.append(label);

    return segment;
  });
}
