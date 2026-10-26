import './style.css';
import { mountApp } from './app';

const app = document.querySelector<HTMLDivElement>('#app');

if (app) {
  mountApp(app, Math.random);
}
