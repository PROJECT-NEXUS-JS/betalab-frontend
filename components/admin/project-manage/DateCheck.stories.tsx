import type { Meta, StoryObj } from '@storybook/nextjs';
import React from 'react';
import DateCheck from './DateCheck';
import type { DateRange } from 'react-day-picker';
import { addDays } from 'date-fns';

const meta: Meta<typeof DateCheck> = {
  title: 'Admin/DateCheck',
  component: DateCheck,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    onChange: { action: 'changed' },
    placeholder: { control: 'text' },
    disabledBeforeToday: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof DateCheck>;

export const Default: Story = {
  render: args => {
    const [range, setRange] = React.useState<DateRange | undefined>();
    return <DateCheck {...args} value={range} onChange={setRange} />;
  },
  args: {
    placeholder: 'YYYY.MM.DD - YYYY.MM.DD',
    disabledBeforeToday: true,
  },
};

export const WithInitialValue: Story = {
  render: args => {
    const [range, setRange] = React.useState<DateRange | undefined>({
      from: new Date(),
      to: addDays(new Date(), 14),
    });
    return (
      <div className="w-[520px]">
        <DateCheck {...args} value={range} onChange={setRange} />
      </div>
    );
  },
};

export const AllowPastDates: Story = {
  ...Default,
  args: { disabledBeforeToday: false },
};

export const NarrowContainer: Story = {
  render: args => {
    const [range, setRange] = React.useState<DateRange | undefined>();
    return (
      <div className="w-[360px]">
        <DateCheck {...args} value={range} onChange={setRange} />
      </div>
    );
  },
};
