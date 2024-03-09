import React, { useEffect, useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import ColorPicker from './ColorPicker';
import { JSX } from 'react/jsx-runtime';

import styles from './ColorPicker.module.scss';
import ColorBand from '../ColorBand/ColorBand';

import { BAND_COLOR_CODES } from '../../constants/index';
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
  [key: string]: string;
};

const colorsTest = [
  {
    name: 'red',
  },
  {
    name: 'black',
  },
  {
    name: 'blue',
  },
  {
    name: 'yellow',
  },
];

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

  //sets selectedColor with the object configuration depending on the amount of bands
  useEffect(() => {
    const bandColorCodes = Object.entries(BAND_COLOR_CODES);
    const availableColorBands: AvailableColorBands = {};

    for (let i = 1; i <= bandColorCodes.length; i++) {
      availableColorBands[`band${i}`] = '';
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
        {colorBands.map(([key, value]) => (
          <ColorBand
            bandColor={value}
            bandKey={key}
            onClick={(band) => {
              console.log('UWU: ', band);
              setActiveBand(band);
            }}
          />
        ))}
      </div>
      <ColorPicker
        colorValues={colorsTest}
        onChange={(value) =>
          setSelectedColor((prev) => {
            return {
              ...prev,
              [activeBand]: value,
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
