import React, { useEffect, useMemo, useState } from 'react'
import { ColorValues } from '../types/Resistor';

type AvailableColorBands = {
    [key: string]: ColorValues & { color: string };
  };

  const resistanceBandsAmount = 4;

export const useAvailableColorBands = () => {
    const [selectedColor, setSelectedColor] = useState<AvailableColorBands>({});
    //sets selectedColor with the object configuration depending on the amount of bands
    const colorBands = useMemo(
        () => Object.entries(selectedColor),
        [selectedColor]
      );

    //tolerance value will be the last element of the array
    const toleranceValue = useMemo(
        () =>
        colorBands[colorBands.length - 1]
            ? colorBands[colorBands.length - 1]
            : [],
        [colorBands]
    );

    //multiplier value will be the second to last element of the array
    const multiplierValue = useMemo(
        () =>
        colorBands[colorBands.length - 2]
            ? colorBands[colorBands.length - 2]
            : [],
        [colorBands]
    );

    //multiplier value will be the second to last element of the array
    const resistanceDigits = useMemo(
        () => colorBands.slice(0, -2).map(([, value]) => value),
        [colorBands]
    );

    const areAllBandsWithColor = () => {
        return colorBands.length
          ? colorBands?.every(([, value]) => value.color !== '')
          : false;
      };

    useEffect(() => {
        const availableColorBands: AvailableColorBands = {};

        for (let i = 1; i <= resistanceBandsAmount; i++) {
        availableColorBands[`band${i}`] = {
            digitValue: undefined,
            multiplier: undefined,
            tolerancePercentage: undefined,
            color: '',
        };
        }
        setSelectedColor(availableColorBands);
    }, []);

    return { areAllBandsWithColor, setSelectedColor, toleranceValue, multiplierValue, resistanceDigits, colorBands}
}
