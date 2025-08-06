import type { Meta, StoryObj } from "@storybook/nextjs";
import React from 'react';
import Tag, { TagProps } from "./Tag";

const meta: Meta<TagProps> = {
  title: "Components/Tag",
  component: Tag,
  parameters: {
    layout: 'centered',
  },
  tags: ["autodocs"],
  argTypes: {
    style: {
      control: { type: "select" },
      options: [
        "orange",
        "red",
        "green",
        "purple",
        "black",
        "blue",
        "gray",
        "필수",
      ],
    },
    onClick: { action: "clicked" },
  },
};

export default meta;

type Story = StoryObj<TagProps>;

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 p-4">
      {(meta?.argTypes?.style?.options as TagProps['style'][]).map((style) => (
        <Tag key={style} style={style} onClick={() => {}} />
      ))}
    </div>
  ),
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export const Orange: Story = {
  args: {
    style: "orange",
  },
};

export const Red: Story = {
  args: {
    style: "red",
  },
};

export const Green: Story = {
  args: {
    style: "green",
  },
};

export const Purple: Story = {
  args: {
    style: "purple",
  },
};

export const Black: Story = {
  args: {
    style: "black",
  },
};

export const Blue: Story = {
  args: {
    style: "blue",
  },
};

export const Gray: Story = {
  args: {
    style: "gray",
  },
};

export const 필수: Story = {
  args: {
    style: "필수",
  },
};
