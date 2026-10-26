import './style.css';
import { LocalStorageNameStore } from './local-storage-name-store';
import { SeededRandom } from './seeded-random';
import { decodeShare } from './share-link';
import { Wheel } from './wheel';
import { mountWheel } from './wheel-view';

const app = document.querySelector<HTMLDivElement>('#app');
const hash = location.hash.slice(1);

if (app && hash !== '') {
  const shared = decodeShare(hash);
  mountWheel(app, new Wheel(shared.names), {
    randomForSpin: () => new SeededRandom(shared.seed),
    readOnly: true,
  });
} else if (app) {
  mountWheel(app, Wheel.load(new LocalStorageNameStore(localStorage), Math));
}

window.addEventListener('hashchange', () => location.reload());
