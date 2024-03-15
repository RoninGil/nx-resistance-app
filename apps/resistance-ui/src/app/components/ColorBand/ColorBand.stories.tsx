import React, { useEffect, useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { JSX } from 'react/jsx-runtime';

import ColorBand from './ColorBand';

import { BAND_COLOR_CODES } from '../../constants/index';

import { ColorValues } from '../../types/ColorValues';
import { BandColors } from '../../types/BandColors';

const meta: Meta<typeof ColorBand> = {
  title: 'ColorBand',
  component: ColorBand,
};

type AvailableColorBands = {
  [key: string]: ColorValues & { color: string };
};

type Story = StoryObj<typeof ColorBand>;

const Template = (args: JSX.IntrinsicAttributes) => {
  const [selectedColor, setSelectedColor] = useState<AvailableColorBands>({});
  const [activeBand, setActiveBand] = useState('');

  const colorBands = useMemo(
    () => Object.entries(selectedColor),
    [selectedColor]
  );

  useEffect(() => {
    const availableColorBands: AvailableColorBands = {};
    let i = 1;
    for (const [key, value] of Object.entries(BAND_COLOR_CODES)) {
      availableColorBands[`band${i++}`] = {
        digitValue: value.digitValue,
        multiplier: value.multiplier,
        tolerancePercentage: value.tolerancePercentage,
        color: key,
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
        {colorBands.map(([key, values]) => {
          return (
            <ColorBand
              bandColor={values.color as BandColors}
              bandKey={key}
              onClick={(band) => {
                setActiveBand(band);
              }}
            />
          );
        })}
      </div>
      <span>Selected Band: {activeBand}</span>
    </>
  );
};

export const Main: Story = {
  render: (args) => <Template />,
};

export default meta;
