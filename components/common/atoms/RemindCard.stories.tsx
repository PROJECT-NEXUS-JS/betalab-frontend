import type { Meta, StoryObj } from '@storybook/nextjs';
import React from 'react';
import RemindCard from './RemindCard';

const meta: Meta<typeof RemindCard> = {
  title: 'Common/Atoms/RemindCard',
  component: RemindCard,
};

export default meta;
type Story = StoryObj<typeof RemindCard>;

export const Default: Story = {
  render: () => <RemindCard />,
};
