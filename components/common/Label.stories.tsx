import type { Meta, StoryObj } from "@storybook/nextjs";
import React from 'react';
import Label, { LabelProps } from "./Label";

const meta: Meta<LabelProps> = {
  title: "Components/Label",
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl"],
    },
    helpText: { control: "boolean" },
    label: { control: "boolean" },
    tag: { control: "boolean" },
    tag2: { control: "boolean" },
    textCounter: { control: "boolean" },
    labelText: { control: "text" },
    tagStyle: { control: "select", options: ["orange", "red", "green", "purple", "black", "blue", "gray", "필수"] },
    tag2Style: { control: "select", options: ["orange", "red", "green", "purple", "black", "blue", "gray", "필수"] },
    dday: { control: "number" },
    placeholder: { control: "text" },
    value: { control: "text" },
    maxLength: { control: "number" },
    onChange: { action: "changed" },
  },
};

export default meta;

type Story = StoryObj<LabelProps>;

export const AllVariants: Story = {
  args: {
    value: "dsdsdsd"
  },

  render: () => (
    <div className="flex flex-col flex-wrap gap-4 p-4">
      {(meta?.argTypes?.size?.options as LabelProps['size'][]).map((size) => (
        <Label 
          key={size} 
          size={size}
          helpText={true}
          label={true}
          tag={true}
          tag2={true}
          textCounter={true}
          labelText="Label"
          tagStyle="필수"
          tag2Style="gray"
          dday={7}
          placeholder="input"
          value=""
          maxLength={30}
          onChange={() => {}} />
      ))}
    </div>
  ),

  parameters: {
    controls: { hideNoControlsWarning: true },
  }
};

