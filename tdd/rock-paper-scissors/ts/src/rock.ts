import { Scissors } from "./scissors";

export class Rock {
  beats(other: Scissors): boolean {
    if(other instanceof Scissors) return true;
    return false;
  }
}
