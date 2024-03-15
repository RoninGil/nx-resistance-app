import { ColorValues } from "../types/ColorValues";

type ArrayValues = [string, ColorValues & {
    color: string;
}] | never[];

export const getBandType = (activeBand: string, toleranceValue: ArrayValues, multiplierValue: ArrayValues) => {
    if (activeBand === toleranceValue[0]) {
      return 'tolerance';
    }
    if (activeBand === multiplierValue[0]) {
      return 'multiplier';
    }
    if (activeBand === '') {
        return 'none';
    }
    return 'digit';
  };