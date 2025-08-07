import type { Meta, StoryObj } from '@storybook/nextjs';
import React from 'react';
import CategoryButton, { CategoryButtonProps } from './CategoryButton';

const meta: Meta<CategoryButtonProps> = {
  title: 'Components/CategoryButton',
  component: CategoryButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['앱', '웹', '인기순위', '게임', '마감 임박'],
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;

type Story = StoryObj<CategoryButtonProps>;

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 p-4">
      {(meta?.argTypes?.type?.options as CategoryButtonProps['type'][]).map(type => (
        <CategoryButton key={type} type={type} onClick={() => {}} />
      ))}
    </div>
  ),
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export const App: Story = {
  args: {
    type: '앱',
  },
};

export const Web: Story = {
  args: {
    type: '웹',
  },
};

export const Popular: Story = {
  args: {
    type: '인기순위',
  },
};

export const Game: Story = {
  args: {
    type: '게임',
  },
};

export const Urgent: Story = {
  args: {
    type: '마감 임박',
  },
};
