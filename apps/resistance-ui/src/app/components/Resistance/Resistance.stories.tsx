import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Resistance from './Resistance';
import { JSX } from 'react/jsx-runtime';

const meta: Meta<typeof Resistance> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/configure/#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Resistance',
  component: Resistance,
};

type Story = StoryObj<typeof Resistance>;

const Template = (args: JSX.IntrinsicAttributes) => <Resistance {...args} />;

export const OneItem: Story = {
  render: (args) => <Template />,
};

export default meta;
