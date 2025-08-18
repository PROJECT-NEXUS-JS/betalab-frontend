export const queryKeys = {
  // 프로젝트/포스트 관련 쿼리
  posts: {
    all: ['posts'] as const,
    lists: () => [...queryKeys.posts.all, 'list'] as const,
    detail: (postId: number) => [...queryKeys.posts.all, 'detail', postId] as const,
    rightSidebar: (postId: number) => [...queryKeys.posts.all, 'rightSidebar', postId] as const,
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
};
