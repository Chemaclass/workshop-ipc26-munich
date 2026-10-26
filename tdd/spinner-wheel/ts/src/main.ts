import { mountSpinner } from './app';
import { decodeSharedWheel } from './shared-wheel';
import './style.css';

const app = document.querySelector<HTMLDivElement>('#app');

function renderApp() {
  if (app) {
    mountSpinner(app, Math.random, decodeSharedWheel(window.location.hash));
  }
}

renderApp();
window.addEventListener('hashchange', renderApp);
