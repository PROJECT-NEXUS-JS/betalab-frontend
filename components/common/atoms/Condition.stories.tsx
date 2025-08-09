import type { Meta, StoryObj } from '@storybook/nextjs';
import React from 'react';
import Condition, { ConditionProps } from './Condition';

const meta: Meta<ConditionProps> = {
  title: 'Components/Condition',
  component: Condition,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    style: {
      control: { type: 'select' },
      options: ['reward', 'date', 'route', 'user condition', 'qna'],
    },
    texts: {
      control: undefined,
      description: '텍스트 배열을 입력하세요.',
      table: {
        type: { summary: 'string[]' },
        defaultValue: { summary: '[]' },
      },
    },
  },
};

export default meta;

type Story = StoryObj<ConditionProps>;

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 p-4">
      {(meta?.argTypes?.style?.options as ConditionProps['style'][]).map(style => (
        <Condition key={style} style={style} texts={['예시 텍스트1', '예시 텍스트 2']} />
      ))}
    </div>
  ),
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};
