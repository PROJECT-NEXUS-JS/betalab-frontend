import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { within, userEvent, screen } from 'storybook/test';
import StorySection from './StorySection';

const meta = {
  title: 'Sections/StorySection',
  component: StorySection,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof StorySection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <StorySection />,
};

export const GuideOn: Story = {
  render: () => <StorySection />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = await canvas.findByRole('switch', { name: '베타랩 가이드 이용하기' });
    await userEvent.click(toggle);
    await canvas.findByRole('textbox');
  },
};

export const EditAfterGuideOn: Story = {
  render: () => <StorySection />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = await canvas.findByRole('switch', { name: '베타랩 가이드 이용하기' });
    await userEvent.click(toggle);
    const textarea = await canvas.findByRole('textbox');
    await userEvent.type(textarea, '\n\n(여기에 프로젝트 소개 한 줄을 추가했어요)');
  },
};
