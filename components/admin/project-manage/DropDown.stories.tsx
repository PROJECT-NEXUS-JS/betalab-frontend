import type { Meta, StoryObj } from '@storybook/nextjs';
import React, { useState } from 'react';
import Dropdown from './DropDown';

const meta: Meta<typeof Dropdown> = {
  title: 'admin/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  args: {
    placeholder: '선택하세요',
    options: [
      { label: '베타랩님', value: 'beta-1' },
      { label: '베타랩님', value: 'beta-2' },
    ],
  },
  parameters: {
    docs: {
      description: {
        component:
          '이미지처럼 라운드 큼직하고 상단에 라벨이 한 번 더 보이는 드롭다운. 키보드(↑/↓, Enter/Space, Esc) 지원, 바깥 클릭 시 닫힘.',
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {};

export const WithDefaultValue: Story = {
  args: {
    defaultValue: 'beta-1',
  },
};

export const Controlled: Story = {
  render: args => {
    const [value, setValue] = useState<string>('beta-2');
    return (
      <div className="w-[360px]">
        <Dropdown
          {...args}
          value={value}
          onChange={setValue}
          options={[
            { label: '베타랩님', value: 'beta-1' },
            { label: '베타랩님', value: 'beta-2' },
            { label: 'Android', value: 'android' },
            { label: 'iOS', value: 'ios' },
          ]}
        />
        <div className="mt-4 text-caption-01 text-[var(--color-Gray-300)]">
          선택 값: <span className="text-[var(--color-Black)]">{value}</span>
        </div>
      </div>
    );
  },
};

export const WithLongList: Story = {
  args: {
    options: Array.from({ length: 24 }).map((_, i) => ({
      label: i % 2 === 0 ? `베타랩님 ${i + 1}` : `Android ${i + 1}`,
      value: String(i + 1),
    })),
  },
  parameters: {
    docs: {
      description: {
        story: '스크롤이 필요한 긴 목록(패널 내부 max-height 320px) 확인용.',
      },
    },
  },
};

export const CustomWidth: Story = {
  render: args => (
    <div className="w-[640px]">
      <Dropdown {...args} />
    </div>
  ),
  args: {
    options: [
      { label: '웹', value: 'web' },
      { label: 'Android', value: 'android' },
      { label: 'iOS', value: 'ios' },
    ],
  },
};
