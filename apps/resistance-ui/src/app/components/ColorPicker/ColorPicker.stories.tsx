import React, { useEffect, useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import ColorPicker from './ColorPicker';
import { JSX } from 'react/jsx-runtime';

import ColorBand from '../ColorBand/ColorBand';

import { BAND_COLOR_CODES } from '../../constants/index';
import { BandColors } from '../../types/BandColors';
import { ColorValues } from '../../types/Resistor';

const meta: Meta<typeof ColorPicker> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/configure/#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'ColorPicker',
  component: ColorPicker,
};

type Story = StoryObj<typeof ColorPicker>;

type AvailableColorBands = {
  [key: string]: ColorValues & { color: string };
};

const colorsTest: BandColors[] = ['red', 'black', 'blue', 'yellow'];

const Template = (args: JSX.IntrinsicAttributes) => {
  const [selectedColor, setSelectedColor] = useState<AvailableColorBands>({});
  const [activeBand, setActiveBand] = useState('');
  console.log('ACTIVEBAND: ', activeBand);
  console.log('Selected Color: ', selectedColor);
  const colorBands = useMemo(
    () => Object.entries(selectedColor),
    [selectedColor]
  );
  console.log('COLOR BANDS: ', colorBands);

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
  const resistanceValues = useMemo(
    () => colorBands.slice(0, -2).map(([key, value]) => value),
    [colorBands]
  );

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
    const bandColorCodes = Object.entries(BAND_COLOR_CODES);
    const availableColorBands: AvailableColorBands = {};

    for (let i = 1; i <= bandColorCodes.length; i++) {
      availableColorBands[`band${i}`] = {
        digitValue: undefined,
        multiplier: undefined,
        tolerancePercentage: undefined,
        color: '',
      };
    }
    console.log('AVAILABLE: ', availableColorBands);
    setSelectedColor(availableColorBands);
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
        colorValues={colorsTest}
        colorData={BAND_COLOR_CODES}
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
        {...args}
      />
      <span>{activeBand}</span>
    </>
  );
};

export const Default: Story = {
  render: (args) => <Template />,
};

export default meta;
