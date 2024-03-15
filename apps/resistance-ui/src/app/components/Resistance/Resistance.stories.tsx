import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Resistance from './Resistance';
import { JSX } from 'react/jsx-runtime';
import { useAvailableColorBands } from '../../hooks/useAvailableColorBands';
import ColorBand from '../ColorBand/ColorBand';
import { BandColors } from '../../types/BandColors';

const meta: Meta<typeof Resistance> = {
  title: 'Resistance',
  component: Resistance,
};

type Story = StoryObj<typeof Resistance>;

const Template = (args: JSX.IntrinsicAttributes) => {
  const { colorBands } = useAvailableColorBands();

  const [, setActiveBand] = useState('');

  return (
    <Resistance {...args}>
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
  );
};

export const Main: Story = {
  render: (args) => <Template />,
};

export default meta;
