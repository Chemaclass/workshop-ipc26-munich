import { createResultOverlay } from './result-overlay';
import type { SharedWheel } from './shared-wheel';
import { SpinnerWheel } from './spinner-wheel';
import { optionColor, renderWheel } from './wheel-view';

export function mountSpinner(
  root: HTMLElement,
  random: () => number,
  initialState: SharedWheel | null = null,
): void {
  let spinRandom = 0;
  const wheel = new SpinnerWheel(() => {
    spinRandom = random();
    return spinRandom;
  }, initialState?.chosen ?? null);
  let result: string | null = null;
  let drawing = false;
  let rotation = 0;
  root.innerHTML = `
    <div class="page-shell">
      <header class="site-header">
        <a class="wordmark" href="./" aria-label="Spinner Wheel home">
          <span class="brand-symbol" aria-hidden="true">✳</span> spinner<span class="wordmark-light">wheel</span>
        </a>
        <span class="header-note"><span aria-hidden="true">✧</span> A fair little decision.</span>
      </header>
      <main>
        <div class="intro">
          <p class="eyebrow">WHO'S UP NEXT?</p>
          <h1>Let chance decide.</h1>
          <p>Add your names. Give it a spin. Leave it to chance.</p>
        </div>
        <div class="workspace">
          <section class="wheel-panel" aria-label="Wheel and selection">
            <div class="wheel-stage">
              <div class="wheel-pointer" aria-hidden="true"></div>
              <div class="wheel-rim">
                <svg data-wheel viewBox="0 0 500 500" role="img" aria-label="Wheel"></svg>
              </div>
              <div class="wheel-hub" aria-hidden="true">✳</div>
            </div>
            <button class="spin-button" type="button" data-action="spin" disabled>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 7v5h-5M4 17v-5h5M5.5 7a7.5 7.5 0 0 1 12-1L20 9M4 15l2.5 3a7.5 7.5 0 0 0 12-1" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
              <span data-spin-label>Spin the wheel</span>
            </button>
            <div class="result-area">
              <p data-result hidden></p>
              <p role="status">Add a name to get started.</p>
            </div>
          </section>
          <aside class="participants-panel" aria-labelledby="participants-heading">
            <div class="panel-heading">
              <h2 id="participants-heading">Who's joining?</h2>
              <span class="count-badge" data-count>0 names</span>
            </div>
            <form>
              <label for="name">Add a name</label>
              <div class="input-row">
                <input id="name" placeholder="e.g. Anna" autocomplete="off" />
                <button class="add-button" type="submit" aria-label="Add name" title="Add name">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>
                </button>
              </div>
              <p class="input-hint">Press Enter to add <span aria-hidden="true">↵</span></p>
            </form>
            <div class="list-heading"><span>PARTICIPANTS</span><span data-chances>Ready for a little chance</span></div>
            <div class="empty-list" data-empty-list>
              <span class="empty-icon" aria-hidden="true">✧</span>
              <p>It starts with a name.</p>
              <span>Add your names above to get going.</span>
            </div>
            <ul class="participant-list" aria-label="Participants"></ul>
            <div class="fairness-note"><span aria-hidden="true">◎</span><p>Every remaining name has an equal chance.<br>Winners leave before the next spin.</p></div>
          </aside>
        </div>
      </main>
      <footer>A little chance. <span>Entirely fair.</span></footer>
    </div>
  `;
  const form = root.querySelector('form') as HTMLFormElement;
  const wheelGraphic = root.querySelector('[data-wheel]') as SVGSVGElement;
  const input = root.querySelector('input') as HTMLInputElement;
  const list = root.querySelector('ul') as HTMLUListElement;
  const spin = root.querySelector('[data-action="spin"]') as HTMLButtonElement;
  const spinLabel = root.querySelector('[data-spin-label]') as HTMLSpanElement;
  const count = root.querySelector('[data-count]') as HTMLSpanElement;
  const chances = root.querySelector('[data-chances]') as HTMLSpanElement;
  const emptyList = root.querySelector('[data-empty-list]') as HTMLDivElement;
  const status = root.querySelector('[role="status"]') as HTMLParagraphElement;
  const retainedResult = root.querySelector(
    '[data-result]',
  ) as HTMLParagraphElement;
  const overlay = createResultOverlay(root);

  function render(message: string | null = null) {
    renderWheel(wheelGraphic, wheel.names);
    root.dataset.drawing = String(drawing);
    root.dataset.hasResult = String(result !== null && !message);
    wheelGraphic.setAttribute(
      'aria-label',
      wheel.names.length
        ? `Wheel with ${wheel.names.length} names`
        : 'Wheel — add names to get started',
    );
    count.textContent = `${wheel.names.length} ${wheel.names.length === 1 ? 'name' : 'names'}`;
    chances.textContent = wheel.names.length
      ? `${Number((100 / wheel.names.length).toFixed(1))}% chance per name`
      : 'Ready for a little chance';
    emptyList.hidden = wheel.names.length > 0;
    spinLabel.textContent = drawing
      ? 'The wheel is spinning…'
      : 'Spin the wheel';
    retainedResult.textContent = message && result ? result : '';
    retainedResult.hidden = !retainedResult.textContent;
    list.replaceChildren(
      ...wheel.names.map((name, index) => {
        const item = document.createElement('li');
        const marker = document.createElement('span');
        marker.className = 'color-marker';
        marker.style.backgroundColor = optionColor(index);
        marker.setAttribute('aria-hidden', 'true');
        const label = document.createElement('span');
        label.className = 'participant-name';
        label.textContent = name;
        item.append(marker, label);
        const remove = document.createElement('button');
        remove.type = 'button';
        remove.setAttribute('aria-label', `Remove ${name}`);
        remove.innerHTML =
          '<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="2" /></svg>';
        remove.addEventListener('click', () => {
          if (drawing) return;
          wheel.remove(name);
          result = null;
          rotation = 0;
          wheelGraphic.style.transform = '';
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
      (wheel.names.length === 0 ? 'Add a name to get started.' : '');
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (drawing) return;
    const message = wheel.add(input.value);
    if (!message) {
      input.value = '';
      result = null;
      rotation = 0;
      wheelGraphic.style.transform = '';
    }
    render(message);
    input.focus();
  });

  spin.addEventListener('click', () => {
    if (drawing || wheel.names.length === 0) return;
    drawing = true;
    result = null;
    const selected = wheel.spin();
    if (selected === null) {
      drawing = false;
      rotation = 0;
      wheelGraphic.style.transform = '';
      render('Everyone has had a turn. Add a name to start a new round.');
      return;
    }
    render('Choosing…');
    const selectedIndex = wheel.names.indexOf(selected);
    const positionInSegment = spinRandom * wheel.names.length - selectedIndex;
    // Reuse the sample's fractional part, leaving 6% clear at either border.
    const landingAngle =
      ((selectedIndex + 0.06 + positionInSegment * 0.88) * 360) /
      wheel.names.length;
    const previousRotation = rotation;
    rotation += 360 * 5 + ((360 - landingAngle - (rotation % 360) + 360) % 360);
    const frames = [
      { transform: `rotate(${previousRotation}deg)` },
      { transform: `rotate(${rotation}deg)` },
    ];
    wheelGraphic.style.transform = `rotate(${rotation}deg)`;
    const animation = wheelGraphic.animate?.(frames, {
      duration: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
        ? 0
        : 4200,
      easing: 'cubic-bezier(0.12, 0.8, 0.18, 1)',
    });
    const finish = () => {
      if (!wheelGraphic.isConnected) return;
      result = `Selected: ${selected}`;
      drawing = false;
      render();
      overlay.show({
        names: [...wheel.names],
        chosen: selected,
        rotation: rotation % 360,
      });
    };
    void (animation?.finished ?? Promise.resolve()).then(finish, finish);
  });
  if (initialState) {
    for (const name of initialState.names) wheel.add(name);
    result = `Selected: ${initialState.chosen}`;
    rotation = initialState.rotation;
    wheelGraphic.style.transform = `rotate(${rotation}deg)`;
  }
  render();
  if (initialState) overlay.show(initialState);
}
