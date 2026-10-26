import {Parrot} from "../parrot";

export class European extends Parrot {

  getSpeed(): number {
    return this.getBaseSpeed();
  }

  getCry(): string {
    return 'Sqoork!';
  }

}
