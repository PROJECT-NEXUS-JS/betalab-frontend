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
    application: (postId: number, status: StatusEnum) =>
      [...queryKeys.dashboard.all, 'application', postId, status] as const,
    profile: () => [...queryKeys.dashboard.all, 'profile'] as const,
  },
};
