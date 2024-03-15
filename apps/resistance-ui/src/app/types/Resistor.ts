import { BandColors } from "./BandColors";
import { ColorValues } from "./ColorValues";

export type Resistor = {
    [key in BandColors]: ColorValues;
};