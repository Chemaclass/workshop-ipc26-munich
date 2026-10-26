export class Rock {
  beats(other: Scissors): boolean {
    if(other instanceof Scissors) return true;
    return false;
  }
}

export class Scissors {

}
