import type { Meta, StoryObj } from '@storybook/nextjs';
import React from 'react';
import ReviewCard, { ReviewCardProps } from './ReviewCard';

const meta: Meta<ReviewCardProps> = {
  title: 'Components/ReviewCard',
  component: ReviewCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: ['default', 'stroke'],
    },
    content: { control: 'text' },
    author: {
      control: 'object',
      defaultValue: {
        name: 'John Doe',
        imageUrl: 'https://via.placeholder.com/150',
      },
    },
    rating: { control: 'number' },
    date: { control: 'date' },
  },
};

export default meta;

type Story = StoryObj<ReviewCardProps>;

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col flex-wrap gap-4 p-4">
      {(meta?.argTypes?.state?.options as ReviewCardProps['state'][]).map(state => (
        <ReviewCard
          key={state}
          state={state}
          content="Review content goes here. Review content goes here. Review content goes here.Review content goes here.Review content goes here.Review content goes here.Review content goes here."
          author={{
            name: 'John Doe',
            imageUrl: undefined,
          }}
          rating={3}
          date={new Date()}
        />
      ))}
    </div>
  ),

  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};
