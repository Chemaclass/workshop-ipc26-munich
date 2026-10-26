import type { Item } from "./item";
import { Rock } from "./rock";

export class Paper {
    beats(other: Item): boolean {
        if (other instanceof Rock) return true;
        return false;
    }
}