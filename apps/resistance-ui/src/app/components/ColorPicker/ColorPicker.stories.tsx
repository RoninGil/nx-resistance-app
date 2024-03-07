import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import ColorPicker from './ColorPicker';
import { JSX } from 'react/jsx-runtime';

const meta: Meta<typeof ColorPicker> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/configure/#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'ColorPicker',
  component: ColorPicker,
};

type Story = StoryObj<typeof ColorPicker>;

const colorsTest = [
  {
    name: 'red',
  },
  {
    colorHexCode: '#000000',
  },
];

const Template = (args: JSX.IntrinsicAttributes) => (
  <ColorPicker colorValues={colorsTest} {...args} />
);

export const Default: Story = {
  render: (args) => <Template />,
};

export default meta;
