import { Item } from "./item";
import { Scissors } from "./scissors";

export class Rock extends Item {
  beats(other: Item): boolean {
    if(other instanceof Scissors) return true;
    return false;
  }
}
