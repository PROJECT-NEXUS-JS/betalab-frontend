import type { Meta, StoryObj } from '@storybook/nextjs';
import React from 'react';
import InformationText, { InformationTextProps } from './InformationText';

const meta: Meta<InformationTextProps> = {
  title: 'Components/InformationText',
  component: InformationText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['기본', '베리언트2', '베리언트3'],
    },
  },
};

export default meta;

type Story = StoryObj<InformationTextProps>;

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col flex-wrap gap-4 p-4">
      {(meta?.argTypes?.type?.options as InformationTextProps['type'][]).map(type => (
        <InformationText key={type} type={type} />
      ))}
    </div>
  ),
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export const default_: Story = {
  render: () => <InformationText key="기본" type="기본" />,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export const variant2: Story = {
  render: () => <InformationText key="베리언트2" type="베리언트2" />,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export const variant3: Story = {
  render: () => <InformationText key="베리언트3" type="베리언트3" />,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};
