import type { Item } from './item';
import { Rock } from './rock';

export class Scissors {
  beats(other: Item): boolean {
    if (other instanceof Rock) return false;
    return true;
  }
}
