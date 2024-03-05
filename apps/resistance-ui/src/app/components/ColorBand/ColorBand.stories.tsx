import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import ColorBand from './ColorBand';
import { JSX } from 'react/jsx-runtime';

const meta: Meta<typeof ColorBand> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/configure/#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'ColorBand',
  component: ColorBand,
};

type Story = StoryObj<typeof ColorBand>;

const Template = (args: JSX.IntrinsicAttributes) => <ColorBand {...args} />;

export const OneItem: Story = {
  render: (args) => <Template />,
};

export default meta;
