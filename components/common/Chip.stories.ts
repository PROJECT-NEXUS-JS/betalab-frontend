import type { Meta, StoryObj } from "@storybook/nextjs";
import Chip, { ChipProps } from "./Chip";

const meta: Meta<ChipProps> = {
  title: "Components/Chip",
  component: Chip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "default",
        "primary",
        "secondary",
        "solid",
        "sub",
        "active",
        "disabled",
      ],
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg"],
    },
    children: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
    size: "md",
    children: "Default Chip",
  },
};

export const Primary: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "Primary Chip",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    size: "md",
    children: "Secondary Chip",
  },
};

export const Solid: Story = {
  args: {
    variant: "solid",
    size: "md",
    children: "Solid Chip",
  },
};

export const Sub: Story = {
  args: {
    variant: "sub",
    size: "md",
    children: "Sub Chip",
  },
};

export const Active: Story = {
  args: {
    variant: "active",
    size: "md",
    children: "Active Chip",
  },
};

export const Disabled: Story = {
  args: {
    variant: "disabled",
    size: "md",
    children: "Disabled Chip",
  },
};

// 아이콘 사용 예시:
// <Chip variant="primary" size="md">
//   <span>Star</span>
//   <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
//     <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="currentColor"/>
//   </svg>
// </Chip>

export const WithIcon: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "Star with Icon",
  },
};
