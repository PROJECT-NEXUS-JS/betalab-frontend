import type { Meta, StoryObj } from '@storybook/nextjs';
import PostCardMini from './PostCardMini';
import { UsersPostsListItemType } from '@/hooks/posts/dto/postList';

const meta: Meta<typeof PostCardMini> = {
  title: 'Category/PostCardMini',
  component: PostCardMini,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    post: {
      control: 'object',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 데이터 템플릿 (미래 날짜로 설정)
const createPostData = (
  overrides: Partial<UsersPostsListItemType> = {},
): UsersPostsListItemType => ({
  id: 1,
  title: '기본 제목',
  serviceSummary: '기본 서비스 요약입니다.',
  thumbnailUrl: 'https://picsum.photos/id/237/200/300',
  mainCategories: [
    { code: 'GAME', name: '게임' },
    { code: 'ENTERTAINMENT', name: '엔터테인먼트' },
  ],
  platformCategories: [
    { code: 'MOBILE', name: '모바일' },
    { code: 'WEB', name: '웹' },
  ],
  genreCategories: [{ code: 'ACTION', name: '액션' }],
  reward: {
    rewardType: 'CASH',
    rewardDescription: 'CASH',
  },
  schedule: {
    startDate: '2024-12-01',
    endDate: '2024-12-31',
    recruitmentDeadline: '2024-12-15',
    durationTime: '30분',
  },
  ...overrides,
});

// 1. 짧은 제목, D-7일, 리워드 제공
export const ShortTitleWithReward: Story = {
  args: {
    post: createPostData({
      title: '짧은 제목',
      schedule: {
        startDate: '2024-12-01',
        endDate: '2024-12-31',
        recruitmentDeadline: '2024-12-08',
        durationTime: '30분',
      },
    }),
  },
};

// 2. 긴 제목, 오늘 마감, 리워드 제공
export const LongTitleTodayDeadline: Story = {
  args: {
    post: createPostData({
      title: '매우 긴 제목입니다. 이 제목은 두 줄에 걸쳐서 표시될 것입니다.',
      schedule: {
        startDate: '2024-12-01',
        endDate: '2024-12-31',
        recruitmentDeadline: new Date().toISOString().split('T')[0], // 오늘 날짜
        durationTime: '30분',
      },
    }),
  },
};

// 3. 짧은 제목, D-15일, 리워드 없음
export const ShortTitleNoReward: Story = {
  args: {
    post: createPostData({
      title: '리워드 없는 서비스',
      reward: {
        rewardType: 'NONE',
        rewardDescription: 'NONE',
      },
      schedule: {
        startDate: '2024-12-01',
        endDate: '2024-12-31',
        recruitmentDeadline: '2024-12-20',
        durationTime: '30분',
      },
    }),
  },
};

// 4. schedule과 reward가 없는 경우
export const NoScheduleNoReward: Story = {
  args: {
    post: createPostData({
      title: '스케줄과 리워드가 없는 서비스',
      schedule: undefined,
      reward: undefined,
    }),
  },
};
