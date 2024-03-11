import React, { useEffect, useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import ColorBand from './ColorBand';
import { JSX } from 'react/jsx-runtime';
import { BAND_COLOR_CODES } from '../../constants/index';
import { ColorValues } from '../../types/Resistor';
import { BandColors } from '../../types/BandColors';

const meta: Meta<typeof ColorBand> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/configure/#configure-story-loading
   * to learn how to generate automatic titles
   */
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
      <span>{activeBand}</span>
    </>
  );
};

export const OneItem: Story = {
  render: (args) => <Template />,
};

export default meta;
