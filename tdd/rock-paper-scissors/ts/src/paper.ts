import { Rock } from "./rock";

export class Paper {
    beats(other: Rock): boolean {
        if(other instanceof Rock) return true;
        return false;
    }
}