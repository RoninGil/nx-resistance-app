import { useState } from 'react';
import classNames from 'classnames/bind';

import { ColorBand, ColorPicker, Resistance } from '../components';

import { useHandleApiValues } from '../hooks/useHandleApiValues';
import { useAvailableColorBands } from '../hooks/useAvailableColorBands';
import { CalculateOhmValue } from '../helpers/calculateOhmValue.class';
import { getBandType } from '../helpers/getBandType';

import { BandColors } from '../types/BandColors';

import styles from './ResistanceView.module.scss';

const cx = classNames.bind(styles);

const ResistanceView = () => {
  const { colorValues, resistanceValues } = useHandleApiValues();

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

  //TODO: move all the components/elements to another file. Ideally nothing except for a component should be inside the app.tsx
  return (
    <div className={cx('page-wrapper')}>
      <div className={cx('header')}>
        <h2>Welcome to the electric resistance calculator!</h2>
        {!activeBand && (
          <span>
            To start, please click one of the bands in the resistance and select
            a color on the left.
          </span>
        )}
      </div>
      <div>
        <ColorPicker
          colorValues={colorValues}
          colorData={resistanceValues}
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
      </div>
      <div className={cx('display-text')}>
        <span>Selected Band: {activeBand}</span>
        <br />
        {areAllBandsWithColor() && (
          <>
            <span>Min Value: {resistance.getResistanceValue()[0]} Ω</span>
            <br />
            <span>Original Value: {resistance.getResistanceValue()[1]} Ω</span>
            <br />
            <span>Max Value: {resistance.getResistanceValue()[2]} Ω</span>
            <br />
          </>
        )}
      </div>
    </div>
  );
};

export default ResistanceView;
