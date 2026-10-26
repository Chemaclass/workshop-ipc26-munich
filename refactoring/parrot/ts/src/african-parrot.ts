import { ParrotParent } from './parrot-parent';

export class AfricanParrot extends ParrotParent {

    private readonly loadFactor = 9.0;

    private readonly minSpeed = 0;

    constructor(
        private readonly numberOfCoconuts: number,
    ) {
        super();
    }


    getSpeed(): number {
        return Math.max(this.minSpeed, this.getBaseSpeed() - this.coconutSlowdown());
    }

    private coconutSlowdown() {
        return this.loadFactor * this.numberOfCoconuts;
    }

    getCry(): string {

        return 'Sqaark!';

    }

    
}