import type { Meta, StoryObj } from '@storybook/nextjs';
import Card from './Card';
import { Info } from 'lucide-react';

const meta: Meta<typeof Card> = {
  title: 'Common/atoms/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    items: { control: 'object' },
    icon: { control: false },
  },
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    title: '개인정보 수집 시 유의해주세요',
    items: [
      '불필요한 항목은 요청을 자제해주세요.',
      '수집한 정보는 테스트 목적 외 사용을 금지합니다.',
      '법적 의무 준수를 위해, 테스트 종료 후 즉시 삭제해주세요.',
    ],
    icon: <Info className="w-6 h-6 text-Gray-400" />,
  },
};

export const WithCustomIcon: Story = {
  args: {
    title: '커스텀 아이콘 사용',
    items: ['첫 번째 항목', '두 번째 항목'],
    icon: <div className="w-6 h-6 bg-blue-400 rounded-full" />,
  },
};
