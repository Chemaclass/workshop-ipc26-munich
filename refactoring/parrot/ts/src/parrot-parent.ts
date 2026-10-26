
export abstract class ParrotParent {

  abstract getSpeed(): number;
  
  abstract getCry(): string;

  protected getBaseSpeed(): number {
    return 12.0;
  }
}