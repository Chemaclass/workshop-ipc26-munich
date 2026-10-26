import type { Item } from "./item";
import { Rock } from "./rock";

export class Paper {
    beats(other: Item): string {
        if (other instanceof Rock) return 'WINNER';
        if (other instanceof Paper) return 'DRAW';
        return 'LOSER';
    }
}
