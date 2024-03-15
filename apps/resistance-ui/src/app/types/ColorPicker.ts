import { BandColors } from "./BandColors";
import { ColorValues } from "./ColorValues";
import { Resistor } from "./Resistor";

type ActiveBand = 'tolerance' | 'multiplier' | 'digit' | 'none';

export type ColorPickerProps = {
    colorValues: BandColors[];
    bandType: ActiveBand;
    colorData: Resistor;
    onChange: (value: [string, ColorValues])=> void;
};