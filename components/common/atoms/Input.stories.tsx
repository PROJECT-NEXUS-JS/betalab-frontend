import type { Meta, StoryObj } from '@storybook/nextjs';
import React from 'react';
import Input, { InputProps } from './Input';

const meta: Meta<InputProps> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'text area'],
    },
    state: {
      control: { type: 'select' },
      options: [
        'no value',
        'has value',
        'focused',
        'disabled',
        'error',
        'information',
        'warning',
        'success',
      ],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
    },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    onChange: { action: 'changed' },
  },
};

export default meta;

type Story = StoryObj<InputProps>;

export const TextAllSmVariants: Story = {
  args: {
    value: 'dsdsdsd',
  },

  render: () => (
    <div className="flex flex-col flex-wrap gap-4 p-4">
      {(meta?.argTypes?.state?.options as InputProps['state'][]).map(state => (
        <Input
          key={`${state}`}
          type="text"
          state={state}
          size="sm"
          placeholder="Placeholder text"
          value=""
          onChange={() => {}}
        />
      ))}
    </div>
  ),

  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export const TextAllVariants: Story = {
  args: {
    value: 'dsdsdsd',
  },

  render: () => (
    <div className="flex flex-col flex-wrap gap-4 p-4">
      {(meta?.argTypes?.state?.options as InputProps['state'][]).map(state =>
        (meta?.argTypes?.size?.options as InputProps['size'][]).map(size => (
          <Input
            key={`${state}-${size}`}
            type="text"
            state={state}
            size={size}
            placeholder="Placeholder text"
            value=""
            onChange={() => {}}
          />
        )),
      )}
    </div>
  ),

  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export const TextAreaAllVariants: Story = {
  render: () => (
    <div className="flex flex-col flex-wrap gap-4 p-4">
      {(meta?.argTypes?.state?.options as InputProps['state'][]).map(state =>
        (meta?.argTypes?.size?.options as InputProps['size'][]).map(size => (
          <Input
            key={`${state}-${size}`}
            type="text area"
            state={state}
            size={size}
            placeholder="Placeholder text"
            value=""
            onChange={() => {}}
          />
        )),
      )}
    </div>
  ),
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export const Default: Story = {
  args: {
    type: 'text',
    state: 'no value',
    size: 'md',
    placeholder: 'Enter text here',
    value: '',
  },
};
export const TextArea: Story = {
  args: {
    type: 'text area',
    state: 'no value',
    size: 'md',
    placeholder: 'Enter text here',
    value: '',
  },
};
export const Focused: Story = {
  args: {
    type: 'text',
    state: 'focused',
    size: 'md',
    placeholder: 'Focused input',
    value: '',
  },
};
export const Disabled: Story = {
  args: {
    type: 'text',
    state: 'disabled',
    size: 'md',
    placeholder: 'Disabled input',
    value: '',
  },
};
