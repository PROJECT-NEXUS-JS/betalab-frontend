import type { Meta, StoryObj } from '@storybook/nextjs';
import InputChip from './InputChip';

const meta: Meta<typeof InputChip> = {
  title: 'Common/Molecules/InputChip',
  component: InputChip,
  parameters: { layout: 'padded' },
  argTypes: {
    onChange: { action: 'changed' },
    placeholder: { control: 'text' },
    initialValue: { control: 'text' },
  },
  args: {
    placeholder: '직접 입력',
    initialValue: '',
  },
};
export default meta;

type Story = StoryObj<typeof InputChip>;

export const Default: Story = {};
