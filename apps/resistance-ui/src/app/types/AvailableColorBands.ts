import { ColorValues } from "./ColorValues";

export type AvailableColorBands = {
    [key: string]: ColorValues & { color: string };
  };