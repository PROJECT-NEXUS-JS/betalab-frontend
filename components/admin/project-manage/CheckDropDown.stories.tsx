import type { Meta, StoryObj } from '@storybook/nextjs';
import React, { useState } from 'react';
import CheckDropDown, { CheckOption } from './CheckDropDown';

const CATEGORY_OPTIONS: CheckOption[] = [
  { label: '라이프 스타일', value: 'life' },
  { label: '교육/학습', value: 'edu' },
  { label: '소셜/커뮤니티', value: 'social' },
  { label: 'AI/실험적 기능', value: 'ai' },
  { label: '생산성/도구', value: 'prod' },
  { label: '커머스/쇼핑', value: 'commerce' },
  { label: '건강/운동', value: 'health' },
  { label: '엔터테인먼트', value: 'ent' },
  { label: '금융/자산관리', value: 'fin' },
  { label: '비즈니스/직장인', value: 'biz' },
  { label: '사진/영상', value: 'photo' },
  { label: '기타', value: 'etc' },
];

const meta: Meta<typeof CheckDropDown> = {
  title: 'admin/CheckDropDown',
  component: CheckDropDown,
  tags: ['autodocs'],
  args: {
    options: CATEGORY_OPTIONS,
  },
  parameters: {
    docs: {
      description: {
        component:
          '여러 옵션을 체크박스로 선택할 수 있는 드롭다운. 선택된 값은 칩(chip)으로 표시되고, 화살표 아이콘 기준으로 패널이 열립니다.',
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof CheckDropDown>;

export const Default: Story = {
  args: {
    defaultValue: ['commerce', 'health'],
  },
};

export const Controlled: Story = {
  render: args => {
    const [vals, setVals] = useState<string[]>(['life', 'health']);
    return (
      <div className="p-6 w-[500px]">
        <CheckDropDown {...args} value={vals} onChange={setVals} />
        <div className="mt-4 text-body-02 text-[var(--color-Dark-Gray)]">
          선택된 값: <span className="font-[600] text-[var(--color-Black)]">{vals.join(', ')}</span>
        </div>
      </div>
    );
  },
};

export const LongList: Story = {
  args: {
    options: Array.from({ length: 20 }).map((_, i) => ({
      label: `옵션 ${i + 1}`,
      value: String(i + 1),
    })),
  },
};
