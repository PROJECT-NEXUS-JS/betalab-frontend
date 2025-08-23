import type { Meta, StoryObj } from '@storybook/nextjs';
import Toggle from './Toggle';
import React from 'react';

const meta: Meta<typeof Toggle> = {
  title: 'Atoms/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: '컨트롤드 상태 (true=ON, false=OFF)',
    },
    defaultChecked: {
      control: 'boolean',
      description: '언컨트롤드 초기 상태',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
    onChange: { action: 'changed' },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;
export const Default: Story = {
  args: {
    defaultChecked: false,
  },
};
export const On: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Controlled: Story = {
  render: args => {
    const [state, setState] = React.useState(true);
    return <Toggle {...args} checked={state} onChange={setState} />;
  },
};

export const Disabled: Story = {
  args: {
    defaultChecked: true,
    disabled: true,
  },
};
