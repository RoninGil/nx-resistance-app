import React, { useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import ColorBand from './ColorBand';
import { JSX } from 'react/jsx-runtime';
import { BAND_COLOR_CODES } from '../../constants/index';

const meta: Meta<typeof ColorBand> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/configure/#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'ColorBand',
  component: ColorBand,
};

type Story = StoryObj<typeof ColorBand>;

const Template = (args: JSX.IntrinsicAttributes) => {
  const [activeBand, setActiveBand] = useState('');

  const colorBands = useMemo(() => Object.entries(BAND_COLOR_CODES), []);

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
              bandColor={key}
              bandKey={key}
              // resistanceBandValues={values}
              onClick={setActiveBand}
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
