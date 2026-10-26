import type { Item } from './item';
import { Rock } from './rock';

export class Scissors {
  beats(other: Item): string {
    if (other instanceof Rock) return 'LOSER';
    return 'WINNER';
  }
}
