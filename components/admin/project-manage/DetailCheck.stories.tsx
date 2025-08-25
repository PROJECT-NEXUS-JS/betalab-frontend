import type { Meta, StoryObj } from '@storybook/nextjs';
import DetailCheck from '@/components/admin/project-manage/DetailCheck';

const meta: Meta<typeof DetailCheck> = {
  title: 'admin/DetailCheck',
  component: DetailCheck,
  parameters: { layout: 'fullscreen' },
  decorators: [
    Story => (
      <div style={{ maxWidth: 920, margin: '0 auto', padding: '24px' }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof DetailCheck>;

export const Default: Story = {
  args: {
    initial: {
      title: '제목을 적어주세요',
      serviceSummary: '',
      mediaUrl: '',
      privacyItems: [],
    },
  },
};

export const PrefilledWithVideo: Story = {
  name: '값 채워진 상태 (영상 탭)',
  args: {
    initial: {
      title: '테스트 프로젝트',
      serviceSummary: '한 줄 소개가 여기에 들어갑니다.',
      mediaUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      privacyItems: ['NAME', 'EMAIL'],
    },
  },
};

export const PhotoModeEmpty: Story = {
  name: '사진 탭(빈 상태)',
  args: {
    initial: {
      title: '',
      serviceSummary: '',
      mediaUrl: '',
      privacyItems: [],
    },
  },
};
