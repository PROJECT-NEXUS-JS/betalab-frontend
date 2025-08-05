import type { Meta, StoryObj } from '@storybook/nextjs';
import CarouselBar from './CarouselBar';

const meta: Meta<typeof CarouselBar> = {
  title: 'Carousel/CarouselBar',
  component: CarouselBar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CarouselBar>;

export const Default: Story = {};
