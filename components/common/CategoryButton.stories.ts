import type { Meta, StoryObj } from "@storybook/nextjs";
import CategoryButton, { CategoryButtonProps } from "./CategoryButton";

const meta: Meta<CategoryButtonProps> = {
  title: "Components/CategoryButton",
  component: CategoryButton,
  parameters: {
    layout: 'centered',
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: [
        "앱",
        "웹",
        "인기순위",
        "게임",
        "마감 임박",
        "커뮤니티",
      ],
    },
    onClick: { action: "clicked" },
  },
};

export default meta;

type Story = StoryObj<CategoryButtonProps>;

export const Default: Story = {
  args: {
    type: "앱",
  },
};

export const Web: Story = {
  args: {
    type: "웹",
  },
};

export const Popular: Story = {
  args: {
    type: "인기순위",
  },
};

export const Game: Story = {
  args: {
    type: "게임",
  },
};

export const Urgent: Story = {
  args: {
    type: "마감 임박",
  },
};

export const Community: Story = {
  args: {
    type: "커뮤니티",
  },
};
