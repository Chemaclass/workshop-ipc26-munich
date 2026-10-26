import { Rock } from './rock';

export class Scissors {
  beats(other: Rock): boolean {
    if (other instanceof Rock) return false;
    return true;
  }
}
