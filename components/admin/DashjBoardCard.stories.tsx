import type { Meta, StoryObj } from '@storybook/nextjs';
import DashBoardCard, { DashBoardCardProps } from './DashBoardCard';

const meta: Meta<DashBoardCardProps> = {
  title: 'Admin/DashBoardCard',
  component: DashBoardCard,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<DashBoardCardProps>;

export const Default: Story = {
  args: {
    current: 100,
    previousDay: 90,
    changeAmount: 10,
    type: 'likes',
  },
};

export const Active: Story = {
  args: {
    current: 120,
    previousDay: 100,
    changeAmount: 20,
    type: 'likes',
  },
};
