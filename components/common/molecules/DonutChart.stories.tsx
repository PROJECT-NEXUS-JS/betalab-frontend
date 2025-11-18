import type { Meta, StoryObj } from '@storybook/nextjs';
import DonutChart from './DonutChart';

const meta: Meta<typeof DonutChart> = {
  title: 'Common/Molecules/DonutChart',
  component: DonutChart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DonutChart>;

export const Default: Story = {
  args: {
    data: [
      { label: '게임', value: 1 },
      { label: '웹', value: 1 },
      { label: '앱', value: 2 },
    ],
    total: 4,
    totalLabel: '총 참여 프로젝트',
  },
};

export const WithDifferentData: Story = {
  args: {
    data: [
      { label: '게임', value: 2 },
      { label: '웹', value: 3 },
      { label: '앱', value: 5 },
    ],
    total: 10,
    totalLabel: '총 참여 프로젝트',
  },
};
