import {Parrot} from "../parrot";
import {ParrotType} from "../parrot-type";

export class NorwegianBlue extends Parrot {
  constructor(voltage: number = 0, nailedState: boolean = false) {
    super(ParrotType.NorwegianBlue, 0, voltage, nailedState);
  }

  getSpeed(): number {
    return this.nailedState ? 0 : this.getBaseSpeedWith(this.voltage);
  }

  getCry(): string {
    return this.voltage > 0 ? 'Bzzzzzz' : '...';
  }

}
