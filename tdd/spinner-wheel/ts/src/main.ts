import './style.css';
import { LocalStorageNameStore } from './local-storage-name-store';
import { Wheel } from './wheel';
import { mountWheel } from './wheel-view';

const app = document.querySelector<HTMLDivElement>('#app');

if (app) {
  mountWheel(app, Wheel.load(new LocalStorageNameStore(localStorage), Math));
}
