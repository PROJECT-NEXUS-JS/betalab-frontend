import type { Meta, StoryObj } from '@storybook/nextjs';
import DotUnit from './DotUnit';

const meta: Meta<typeof DotUnit> = {
  title: 'Carousel/DotUnit',
  component: DotUnit,
  tags: ['autodocs'],
  argTypes: {
    isActive: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DotUnit>;

export const Inactive: Story = {
  args: {
    isActive: false,
  },
};

export const Active: Story = {
  args: {
    isActive: true,
  },
};
