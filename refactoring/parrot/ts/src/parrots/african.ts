import {Parrot} from "../parrot";
import {ParrotType} from "../parrot-type";

export class African extends Parrot {
  constructor(numberOfCoconuts: number = 0) {
    super(ParrotType.African, numberOfCoconuts, );
  }

  getSpeed(): number {
    return Math.max(
      0,
      this.getBaseSpeed() - this.getLoadFactor() * this.numberOfCoconuts,
    );
  }

  getCry(): string {
    return 'Sqaark!';
  }

}
