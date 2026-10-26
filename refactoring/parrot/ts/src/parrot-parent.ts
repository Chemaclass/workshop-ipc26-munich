
export abstract class ParrotParent {

    constructor() {}

  abstract getSpeed(): number;
  
  abstract getCry(): string;

  protected getLoadFactor(): number {
    return 9.0;
  }

  protected getBaseSpeed(): number {
    return 12.0;
  }
}