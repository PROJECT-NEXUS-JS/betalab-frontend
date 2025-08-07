import type { Meta, StoryObj } from '@storybook/nextjs';
import React from 'react';
import Toast, { ToastProps } from './Toast';

const meta: Meta<ToastProps> = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    style: {
      control: { type: 'select' },
      options: ['default', 'error'],
    },
  },
};

export default meta;

type Story = StoryObj<ToastProps>;

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 p-4">
      {(meta?.argTypes?.style?.options as ToastProps['style'][]).map(style => (
        <Toast key={style} style={style} message={`${style} Toast`} />
      ))}
    </div>
  ),
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export const Default: Story = {
  args: {
    style: 'default',
    message: 'This is a default toast message.',
  },
};

export const Error: Story = {
  args: {
    style: 'error',
    message: 'This is an error toast message.',
  },
};
