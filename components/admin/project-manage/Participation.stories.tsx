import type { Meta, StoryObj } from '@storybook/nextjs';
import React, { useState } from 'react';
import ParticipationCheck from './ParticipationCheck';

const meta: Meta<typeof ParticipationCheck> = {
  title: 'admin/ParticipationCheck',
  component: ParticipationCheck,
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'changed' },
    step: { control: { type: 'number', min: 1, step: 1 } },
    min: { control: { type: 'number' } },
    max: { control: { type: 'number' } },
    suffix: { control: 'text' },
  },
  args: {
    defaultValue: 50,
    step: 10,
    min: 0,
    suffix: '명',
  },
  parameters: {
    docs: {
      description: {
        component:
          '좌/우 삼각형으로 값을 **step** 단위로 증감하는 컨트롤. 길게 누르기/키보드(←/→/↑/↓) 지원.',
      },
    },
    layout: 'centered',
  },
  decorators: [
    Story => (
      <div className="w-[520px] p-6 bg-[var(--color-White)]">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof ParticipationCheck>;

export const Default: Story = {};

export const Controlled: Story = {
  render: args => {
    const [v, setV] = useState(50);
    return (
      <div className="space-y-4">
        <ParticipationCheck {...args} value={v} onChange={setV} />
        <div className="text-caption-01 text-[var(--color-Dark-Gray)]">
          현재 값: <span className="font-[700] text-[var(--color-Black)]">{v}</span>
        </div>
      </div>
    );
  },
  args: { max: 200 },
};

export const WithBounds: Story = {
  args: {
    defaultValue: 20,
    min: 10,
    max: 60,
  },
};

export const CustomStep: Story = {
  args: {
    defaultValue: 0,
    step: 25,
    suffix: '명',
    max: 200,
  },
};

export const NoUpperBound: Story = {
  args: {
    defaultValue: 100,
    max: undefined,
  },
};
