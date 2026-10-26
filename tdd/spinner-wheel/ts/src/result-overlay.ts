import { type SharedWheel, encodeSharedWheel } from './shared-wheel';

export function createResultOverlay(root: HTMLElement) {
  const dialog = document.createElement('dialog');
  dialog.className = 'result-dialog';
  dialog.setAttribute('aria-labelledby', 'winner-heading');
  dialog.innerHTML = `
    <div class="fireworks" aria-hidden="true"></div>
    <div class="result-card">
      <button class="dismiss-result" type="button" aria-label="Close result">×</button>
      <div class="winner-symbol" aria-hidden="true">✧</div>
      <p class="eyebrow">THE WHEEL HAS SPOKEN</p>
      <h2 id="winner-heading" data-winner></h2>
      <p class="winner-caption">It's your turn in the spotlight.</p>
      <div class="share-section">
        <label for="share-url">Share this moment</label>
        <p>Same names. Same result. Ready to open.</p>
        <div class="share-row">
          <input id="share-url" type="url" readonly spellcheck="false" />
          <button class="copy-link" type="button">Copy link</button>
        </div>
        <div class="share-feedback" data-copy-status aria-live="polite"></div>
        <a class="open-result-link" target="_blank" rel="noopener noreferrer">Open this exact result <span aria-hidden="true">↗</span></a>
      </div>
      <button class="back-to-wheel" type="button">Back to the wheel</button>
    </div>
  `;
  root.append(dialog);
  const winner = dialog.querySelector('[data-winner]') as HTMLHeadingElement;
  const input = dialog.querySelector('input') as HTMLInputElement;
  const link = dialog.querySelector('a') as HTMLAnchorElement;
  const copy = dialog.querySelector('.copy-link') as HTMLButtonElement;
  const feedback = dialog.querySelector('[data-copy-status]') as HTMLDivElement;
  const fireworks = dialog.querySelector('.fireworks') as HTMLDivElement;

  function close() {
    if (dialog.close) dialog.close();
    else dialog.removeAttribute('open');
  }

  dialog.querySelector('.dismiss-result')?.addEventListener('click', close);
  dialog.querySelector('.back-to-wheel')?.addEventListener('click', close);
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) close();
  });
  copy.addEventListener('click', async () => {
    try {
      if (!navigator.clipboard?.writeText)
        throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(input.value);
      feedback.textContent = 'Link copied. Share the moment!';
    } catch {
      input.focus();
      input.select();
      feedback.textContent = 'Link selected. Press Ctrl+C or ⌘C to copy.';
    }
  });

  return {
    show(state: SharedWheel) {
      winner.textContent = state.chosen;
      const url = new URL(window.location.href);
      url.hash = encodeSharedWheel(state);
      input.value = url.href;
      link.href = url.href;
      feedback.textContent = '';
      fireworks.replaceChildren();
      for (let burst = 0; burst < 4; burst += 1) {
        const group = document.createElement('div');
        group.className = 'firework-burst';
        group.style.left = `${[18, 82, 28, 76][burst]}%`;
        group.style.top = `${[30, 25, 74, 72][burst]}%`;
        for (let ray = 0; ray < 18; ray += 1) {
          const spark = document.createElement('span');
          const angle = (ray / 18) * Math.PI * 2;
          const distance = 75 + (ray % 3) * 22;
          spark.style.setProperty('--dx', `${Math.cos(angle) * distance}px`);
          spark.style.setProperty('--dy', `${Math.sin(angle) * distance}px`);
          spark.style.setProperty('--delay', `${burst * 0.35}s`);
          spark.style.setProperty(
            '--spark-color',
            ['#d1ad67', '#9fb699', '#c48f7e', '#abb8ca'][ray % 4] ?? '#d1ad67',
          );
          group.append(spark);
        }
        fireworks.append(group);
      }
      if (!dialog.open) {
        if (dialog.showModal) dialog.showModal();
        else dialog.setAttribute('open', '');
      }
    },
  };
}
