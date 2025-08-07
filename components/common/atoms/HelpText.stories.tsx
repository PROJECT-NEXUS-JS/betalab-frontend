import type { Meta, StoryObj } from '@storybook/nextjs';
import React from 'react';
import HelpText, { HelpTextProps } from './HelpText';

const meta: Meta<HelpTextProps> = {
  title: 'Components/HelpText',
  component: HelpText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    style: {
      control: { type: 'select' },
      options: ['error', 'x', 'check', 'warning', 'information'],
    },
    text: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<HelpTextProps>;

export const AllVariants: Story = {
  args: {
    text: 'This is a help text',
    style: 'information',
  },

  render: () => (
    <div className="flex flex-col flex-wrap gap-4 p-4">
      {(meta?.argTypes?.style?.options as HelpTextProps['style'][]).map(style => (
        <HelpText key={style} style={style} text="Help text" />
      ))}
    </div>
  ),

  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export const Error: Story = {
  args: {
    text: 'This is an error help text',
    style: 'error',
  },
};

export const X: Story = {
  args: {
    text: 'This is an x help text',
    style: 'x',
  },
};

export const Check: Story = {
  args: {
    text: 'This is a check help text',
    style: 'check',
  },
};

export const Warning: Story = {
  args: {
    text: 'This is a warning help text',
    style: 'warning',
  },
};

export const Information: Story = {
  args: {
    text: 'This is an information help text',
    style: 'information',
  },
};
