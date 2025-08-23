// 인기순위 카테고리별 API 파라미터 매핑
export const POPULAR_CATEGORY_API_MAP: Record<string, Record<string, string>> = {
  '앱 테스트': { mainCategory: 'APP' },
  '웹 테스트': { mainCategory: 'WEB' },
  '게임 테스트': { mainCategory: 'GAME' },
};

export const getApiParams = (category: string) => {
  if (POPULAR_CATEGORY_API_MAP[category]) {
    return POPULAR_CATEGORY_API_MAP[category];
  }
  return {};
};

// 인기순위 카테고리 목록
export const POPULAR_CATEGORIES = [
  '전체',
  '앱 테스트',
  '웹 테스트',
  '게임 테스트',
  'UX 피드백',
  '빠른 참여 가능',
  '하드웨어 기기 필요',
  '가입/전환 테스트',
  '설문형 테스트',
  '리워드 제공',
] as const;

export type PopularCategory = (typeof POPULAR_CATEGORIES)[number];
