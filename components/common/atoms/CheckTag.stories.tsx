import type { Meta, StoryObj } from '@storybook/nextjs';
import CheckTag from './CheckTag';

const meta: Meta<typeof CheckTag> = {
  title: 'Common/Atoms/CheckTag',
  component: CheckTag,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text', description: '태그 안에 표시할 내용' },
  },
};

export default meta;
type Story = StoryObj<typeof CheckTag>;

export const Default: Story = {
  args: {
    children: '중복 선택 가능',
  },
};
