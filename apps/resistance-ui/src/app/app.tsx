// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect, useMemo, useState } from 'react';
import { ColorBand, ColorPicker } from './components';
import { BAND_COLOR_CODES } from './constants';
import { BandColors } from './types/BandColors';
import { ColorValues } from './types/Resistor';

type AvailableColorBands = {
  [key: string]: ColorValues & { color: string };
};

const resistanceBandsAmount = 4;

const mockApiData = BAND_COLOR_CODES;

const App = () => {
  const [selectedColor, setSelectedColor] = useState<AvailableColorBands>({});
  const [activeBand, setActiveBand] = useState('');
  const [colorValues, setColorValues] = useState<BandColors[]>([]);

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

  const getResistanceValue = () => {
    const tolerance = toleranceValue[1].tolerancePercentage!;
    const multiplier = multiplierValue[1]!.multiplier!;
    const digits = Number(
      resistanceDigits.map(({ digitValue }) => digitValue).join('')
    );

    const resistanceValue = digits * multiplier;
    const maxValue = resistanceValue * (1 + tolerance / 100);
    const minValue = resistanceValue * (1 - tolerance / 100);

    return [minValue, resistanceValue, maxValue];
  };

  const areAllBandsWithColor = () => {
    return colorBands.length
      ? colorBands?.every(([key, value]) => value.color !== '')
      : false;
  };

  const getBandType = () => {
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

  //sets selectedColor with the object configuration depending on the amount of bands
  useEffect(() => {
    // const bandColorCodes = Object.entries(BAND_COLOR_CODES);
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

  //set the color values for ColorPicker component as the ones that come from the api
  useEffect(() => {
    const colorValuesArray: BandColors[] = [];
    for (const colorKey of Object.keys(mockApiData)) {
      colorValuesArray.push(colorKey as BandColors);
    }
    setColorValues(colorValuesArray);
  }, []);

  return (
    <>
      <div
        style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '8px',
          justifyContent: 'center',
        }}
      >
        {colorBands.map(([key, values]) => (
          <ColorBand
            bandColor={values.color as BandColors}
            bandKey={key}
            onClick={(band) => {
              setActiveBand(band);
            }}
          />
        ))}
      </div>
      <ColorPicker
        colorValues={colorValues}
        colorData={mockApiData}
        bandType={getBandType()}
        onChange={([color, colorData]) =>
          setSelectedColor((prev) => {
            return {
              ...prev,
              [activeBand]: {
                ...prev[activeBand],
                color: color as BandColors,
                ...colorData,
              },
            };
          })
        }
      />
      <span>{activeBand}</span>
      <br />
      {areAllBandsWithColor() && (
        <>
          <span>Min Value: {getResistanceValue()[0]}</span>
          <br />
          <span>Original Value: {getResistanceValue()[1]}</span>
          <br />
          <span>Max Value: {getResistanceValue()[2]}</span>
          <br />
        </>
      )}
    </>
  );
};

export default App;
