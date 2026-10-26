import { Item } from "./item";
import { Scissors } from "./scissors";

export class Rock extends Item {
  beats(other: Item): string {
    if(other instanceof Scissors) return 'WINNER';
    return 'LOSER';
  }
}
