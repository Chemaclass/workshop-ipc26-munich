import { mountSpinner } from './app';
import './style.css';

const app = document.querySelector<HTMLDivElement>('#app');

if (app) {
  mountSpinner(app, Math.random);
}
