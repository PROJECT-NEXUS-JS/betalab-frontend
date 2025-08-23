import type { Meta, StoryObj } from '@storybook/nextjs';
import ImageButton from './ImageButton';

const meta: Meta<typeof ImageButton> = {
  title: 'Common/ImageButton',
  component: ImageButton,
  tags: ['autodocs'],
  argTypes: {
    current: { control: 'number' },
    total: { control: 'number' },
    onUpload: { action: 'uploaded' },
  },
};

export default meta;
type Story = StoryObj<typeof ImageButton>;

export const Empty: Story = {
  args: {
    current: 0,
    total: 10,
  },
};

export const HalfFilled: Story = {
  args: {
    current: 5,
    total: 10,
  },
};

export const Full: Story = {
  args: {
    current: 10,
    total: 10,
  },
};
