import React, { useEffect, useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { JSX } from 'react/jsx-runtime';

import ColorBand from '../ColorBand/ColorBand';
import ColorPicker from './ColorPicker';

import { BAND_COLOR_CODES } from '../../constants/index';

import { BandColors } from '../../types/BandColors';
import { AvailableColorBands } from '../../types/AvailableColorBands';

const meta: Meta<typeof ColorPicker> = {
  title: 'ColorPicker',
  component: ColorPicker,
};

type Story = StoryObj<typeof ColorPicker>;

const colorsTest: BandColors[] = ['red', 'black', 'blue', 'yellow'];

const Template = (args: JSX.IntrinsicAttributes) => {
  const [selectedColor, setSelectedColor] = useState<AvailableColorBands>({});
  const [activeBand, setActiveBand] = useState('band1');

  const colorBands = useMemo(
    () => Object.entries(selectedColor),
    [selectedColor]
  );

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
        bandType={'digit'}
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
      <span>Selected Band: {activeBand}</span>
    </>
  );
};

export const Main: Story = {
  render: (args) => <Template />,
};

export default meta;
