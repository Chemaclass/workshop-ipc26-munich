export abstract class Item {
    abstract beats(other: Item): boolean;
}