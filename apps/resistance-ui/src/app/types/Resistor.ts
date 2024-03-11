import { BandColors } from "./BandColors";

export type ColorValues = {
    digitValue?: number;
    multiplier?: number;
    tolerancePercentage?: number;
}

export type Resistor = {
    [key in BandColors]: ColorValues
};