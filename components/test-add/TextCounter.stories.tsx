import type { Meta, StoryObj } from '@storybook/nextjs';
import TextCounter from './TextCounter';

const meta: Meta<typeof TextCounter> = {
  title: 'test-add/TextCounter',
  component: TextCounter,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TextCounter>;

export const Default: Story = {
  args: {
    value: '',
    maxLength: 30,
  },
};
