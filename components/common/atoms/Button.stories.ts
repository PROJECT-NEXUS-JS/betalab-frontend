import type { Meta, StoryObj } from '@storybook/nextjs';
import Button, { ButtonProps } from './Button';

const meta: Meta<ButtonProps> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    State: {
      control: { type: 'select' },
      options: ['Default', 'Primary', 'Sub', 'Solid', 'Disabled', 'Secondary', 'Focused'],
    },
    Size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'],
    },
    onClick: { action: 'clicked' },
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    State: 'Default',
    Size: 'md',
    label: 'Click Me',
  },
};

export const Default: Story = {
  args: {
    State: 'Default',
    Size: 'md',
    label: 'Default',
  },
};

export const Primary: Story = {
  args: {
    State: 'Primary',
    Size: 'md',
    label: 'Primary',
  },
};

export const Sub: Story = {
  args: {
    State: 'Sub',
    Size: 'md',
    label: 'Sub',
  },
};

export const Solid: Story = {
  args: {
    State: 'Solid',
    Size: 'md',
    label: 'Solid',
  },
};

export const Disabled: Story = {
  args: {
    State: 'Disabled',
    Size: 'md',
    label: 'Disabled',
  },
};

export const Secondary: Story = {
  args: {
    State: 'Secondary',
    Size: 'md',
    label: 'Secondary',
  },
};

export const Focused: Story = {
  args: {
    State: 'Focused',
    Size: 'md',
    label: 'Focused',
  },
};
