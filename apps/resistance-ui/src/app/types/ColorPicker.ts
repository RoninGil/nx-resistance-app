import { BandColors } from "./BandColors";
import { ColorValues, Resistor } from "./Resistor";

export type ActiveBand = 'tolerance' | 'multiplier' | 'digit' | 'none';

export type ColorPickerProps = {
    colorValues: BandColors[];
    bandType: ActiveBand;
    colorData: Resistor;
    onChange: (value: [string, ColorValues])=> void;
};