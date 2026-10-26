import type { Item } from './item';
import { Rock } from './rock';

export class Scissors {
  beats(other: Item): string {
    if (other instanceof Rock) return 'LOSER';
    if(other instanceof Scissors) return 'DRAW';
    return 'WINNER';
  }
}
