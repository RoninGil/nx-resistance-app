import { ColorValues } from "../types/Resistor";

type ArrayValues = [string, ColorValues & {
    color: string;
}] | never[];

type CalculateOhmValueParams = {
    resistanceDigits: (ColorValues & {
        color: string;
    })[];
    multiplierValue: ArrayValues | undefined;
    toleranceValue: ArrayValues | undefined;
}

export class CalculateOhmValue {
    digits: number;
    multiplier: number | undefined;
    tolerance: number|undefined;
    
    constructor(props: CalculateOhmValueParams) {
        this.digits = Number(
            props.resistanceDigits.map(({ digitValue }) => digitValue).join('')
            );
        this.multiplier = props.multiplierValue ? props.multiplierValue[1]?.multiplier : 0;
        this.tolerance = props.toleranceValue ? props.toleranceValue[1]?.tolerancePercentage : 0;
    }

    getResistanceValue() {
        const {digits, multiplier, tolerance} = this;
        let resistanceValue = 0;
        let maxValue = 0;
        let minValue = 0;
        if(digits && multiplier && tolerance){
            resistanceValue = digits * multiplier;
            maxValue = resistanceValue * (1 + tolerance / 100);
            minValue = resistanceValue * (1 - tolerance / 100);
        }
    
        return [minValue, resistanceValue, maxValue];
      }
}