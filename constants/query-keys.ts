import { StatusEnum } from '@/hooks/dashboard/dto/application';

export const queryKeys = {
  // 프로젝트/포스트 관련 쿼리
  posts: {
    all: ['posts'] as const,
    lists: () => [...queryKeys.posts.all, 'list'] as const,
    detail: (postId: number) => [...queryKeys.posts.all, 'detail', postId] as const,
    rightSidebar: (postId: number) => [...queryKeys.posts.all, 'rightSidebar', postId] as const,
    similarPosts: (postId: number) => [...queryKeys.posts.all, 'similarPost', postId] as const,
  },
  feedback: {
    all: ['feedback'] as const,
    detail: (feedbackId: number) => [...queryKeys.feedback.all, 'detail', feedbackId] as const,
    my: (feedbackId: number) => [...queryKeys.feedback.all, 'my', feedbackId] as const,
  },
  // 다른 엔티티 (예: 사용자)
  users: {
    all: ['users'] as const,
    detail: (userId: number) => [...queryKeys.users.all, 'detail', userId] as const,
  },
  reviews: {
    all: ['reviews'] as const,
    post: (postId: number) => [...queryKeys.reviews.all, 'post', postId] as const,
  },
  dashboard: {
    all: ['dashboard'] as const,
    stats: (postId: number) => [...queryKeys.dashboard.all, 'stats', postId] as const,
    barChart: (postId: number) => [...queryKeys.dashboard.all, 'barChart', postId] as const,
    pieChart: (postId: number) => [...queryKeys.dashboard.all, 'pieChart', postId] as const,
    lineChart: (postId: number) => [...queryKeys.dashboard.all, 'lineChart', postId] as const,
    application: (postId: number, status: StatusEnum) =>
      [...queryKeys.dashboard.all, 'application', postId, status] as const,
    waitingParticipants: (postId: number, params?: any) =>
      [...queryKeys.dashboard.all, 'waitingParticipants', postId, params] as const,
    recentReviews: (postId: number, params?: any) =>
      [...queryKeys.dashboard.all, 'recentReviews', postId, params] as const,
    profile: () => [...queryKeys.dashboard.all, 'profile'] as const,
  },
  dataCenter: {
    all: ['dataCenter'] as const,
    detail: (postId: number, days: number) =>
      [...queryKeys.dataCenter.all, 'detail', postId, days] as const,
    pdfUrl: (postId: number, days: number) =>
      [...queryKeys.dataCenter.all, 'pdfUrl', postId, days] as const,
  },
};
