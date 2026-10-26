import './style.css';
import { LocalStorageNameStore } from './local-storage-name-store';
import { SeededRandom } from './seeded-random';
import { type SharedWheel, decodeShare } from './share-link';
import { Wheel } from './wheel';
import { mountBrokenLink, mountWheel } from './wheel-view';

const app = document.querySelector<HTMLDivElement>('#app');

function showSavedTeam(root: HTMLElement): void {
  mountWheel(root, Wheel.load(new LocalStorageNameStore(localStorage), Math));
}

function showShared(root: HTMLElement, hash: string): void {
  let shared: SharedWheel;
  try {
    shared = decodeShare(hash);
  } catch (problem) {
    mountBrokenLink(root, problem, () => {
      history.replaceState(null, '', location.pathname);
      showSavedTeam(root);
    });
    return;
  }
  mountWheel(root, new Wheel(shared.names), {
    randomForSpin: () => new SeededRandom(shared.seed),
    readOnly: true,
  });
}

if (app) {
  const hash = location.hash.slice(1);
  if (hash === '') {
    showSavedTeam(app);
  } else {
    showShared(app, hash);
  }
}

window.addEventListener('hashchange', () => location.reload());
