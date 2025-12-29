import { PostSummaryType } from '@/hooks/posts/dto/postList';

// TestDeadlineType을 TestCardType으로 변환
export const mapTestDeadlineToTestCard = (test: {
  postId: number;
  category: string;
  title: string;
  tags: string[];
  deadline: string;
}): PostSummaryType => ({
  id: test.postId,
  title: test.title,
  serviceSummary: `카테고리: ${test.category}`,
  thumbnailUrl: null,
  mainCategories: [{ code: test.category, name: test.category }],
  platformCategories: [],
  genreCategories: [],
  schedule: {
    startDate: test.deadline,
    endDate: test.deadline,
    recruitmentDeadline: test.deadline,
    durationTime: '',
  },
  reward: undefined,
});

// RecentlyViewedTestDto를 PostSummaryType으로 변환
export const mapRecentlyViewedTestToTestCard = (test: {
  postId: number;
  category: string;
  title: string;
  oneLineIntro: string;
  thumbnailUrl?: string | null;
  tags: string[];
  viewedAt: string;
}): PostSummaryType => ({
  id: test.postId,
  title: test.title,
  serviceSummary: test.oneLineIntro,
  thumbnailUrl: test.thumbnailUrl ?? null,
  mainCategories: [{ code: test.category, name: test.category }],
  platformCategories: [],
  genreCategories: [],
  schedule: {
    startDate: test.viewedAt,
    endDate: test.viewedAt,
    recruitmentDeadline: test.viewedAt,
    durationTime: '',
  },
  reward: undefined,
});

// 범용 변환 함수 (API 응답 타입에 따라 자동 선택)
export const mapToTestCard = (test: any): PostSummaryType => {
  if ('deadline' in test) {
    return mapTestDeadlineToTestCard(test);
  }
  if ('oneLineIntro' in test) {
    return mapRecentlyViewedTestToTestCard(test);
  }

  // 기본값 반환
  return {
    id: test.postId || test.id || 0,
    title: test.title || '',
    serviceSummary: test.serviceSummary || test.oneLineIntro || '',
    thumbnailUrl: test.thumbnailUrl ?? null,
    mainCategories: test.mainCategories || [
      { code: test.category || '', name: test.category || '' },
    ],
    platformCategories: test.platformCategories || [],
    genreCategories: test.genreCategories || [],
    schedule: test.schedule || {
      startDate: test.deadline || test.viewedAt || '',
      endDate: test.deadline || test.viewedAt || '',
      recruitmentDeadline: test.deadline || test.viewedAt || '',
      durationTime: '',
    },
    reward: test.reward || undefined,
  };
};
