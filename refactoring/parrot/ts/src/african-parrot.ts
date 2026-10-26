import { ParrotParent } from './parrot-parent';

export class AfricanParrot extends ParrotParent {

    constructor(
        private readonly numberOfCoconuts: number,
    ) {
        super();
    }


    getSpeed(): number {
        return Math.max(0, this.getBaseSpeed() - this.getLoadFactor() * this.numberOfCoconuts);
    }

    getCry(): string {

        return 'Sqaark!';

    }

    private getLoadFactor(): number {
        return 9.0;
    }
}