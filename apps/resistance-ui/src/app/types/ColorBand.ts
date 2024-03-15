import { BandColors } from "./BandColors";

export type ColorBandProps = {
    bandColor: BandColors;
    bandKey: string;
    onClick: (value: string) => void;
  };