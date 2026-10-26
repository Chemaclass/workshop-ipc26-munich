import { mountSpinner } from './app';

const app = document.querySelector<HTMLDivElement>('#app');

if (app) {
  mountSpinner(app, Math.random);
}
