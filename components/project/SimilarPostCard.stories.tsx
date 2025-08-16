import type { Meta, StoryObj } from '@storybook/nextjs';
import React from 'react';
import SimilarPostCard, { SimilarPostCardProps } from './SimilarPostCard';

const meta: Meta<SimilarPostCardProps> = {
  title: 'Project/SimilarPostCard',
  component: SimilarPostCard,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<SimilarPostCardProps>;

export const Default: Story = {
  args: {
    post: {
      id: 7,
      thumbnailUrl:
        'https://betalab-storage-250725.s3.ap-northeast-2.amazonaws.com/8049e1c7-21b3-49f1-8111-a68df9ca8f5c.png',
      categories: 'WEB · BUSINESS, PRODUCTIVITY_COLLABORATION',
      title: '팀 협업 도구 베타테스터 모집',
      oneLineIntro: '실시간 협업과 프로젝트 관리를 위한 올인원 플랫폼',
      rewardProvided: true,
      durationType: '중기 테스트',
    },
  },
};
