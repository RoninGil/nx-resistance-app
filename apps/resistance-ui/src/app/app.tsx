// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect, useMemo, useState } from 'react';
import { ColorBand, ColorPicker, Resistance } from './components';
import { BAND_COLOR_CODES } from './constants';
import { BandColors } from './types/BandColors';
import { useHandleApiValues } from './hooks/useHandleApiValues';
import { useAvailableColorBands } from './hooks/useAvailableColorBands';
import { CalculateOhmValue } from './helpers/calculateOhmValue.class';
import { getBandType } from './helpers/getBandType';

const mockApiData = BAND_COLOR_CODES;

const App = () => {
  const { colorValues } = useHandleApiValues();
  const {
    areAllBandsWithColor,
    setSelectedColor,
    multiplierValue,
    resistanceDigits,
    toleranceValue,
    colorBands,
  } = useAvailableColorBands();

  const resistance = new CalculateOhmValue({
    resistanceDigits,
    multiplierValue,
    toleranceValue,
  });

  const [activeBand, setActiveBand] = useState('');

  return (
    <>
      <Resistance>
        {colorBands.map(([key, values]) => (
          <ColorBand
            bandColor={values.color as BandColors}
            bandKey={key}
            onClick={(band) => {
              setActiveBand(band);
            }}
          />
        ))}
      </Resistance>
      <ColorPicker
        colorValues={colorValues}
        colorData={mockApiData}
        bandType={getBandType(activeBand, toleranceValue, multiplierValue)}
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
          <span>Min Value: {resistance.getResistanceValue()[0]}</span>
          <br />
          <span>Original Value: {resistance.getResistanceValue()[1]}</span>
          <br />
          <span>Max Value: {resistance.getResistanceValue()[2]}</span>
          <br />
        </>
      )}
    </>
  );
};

export default App;
