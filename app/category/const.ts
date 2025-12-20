// 메인 카테고리
export const MAIN_CATEGORIES = ['앱', '웹', '게임', '인기순위', '마감임박'] as const;

export const MAIN_CATEGORY_API_MAP: Record<string, string> = {
  앱: 'APP',
  웹: 'WEB',
  게임: 'GAME',
  인기순위: 'POPULAR',
  마감임박: 'DEADLINE',
};

export const PLATFORM_CATEGORY_API_MAP: Record<string, string> = {
  Android: 'ANDROID',
  iOS: 'IOS',
  모바일: 'MOBILE',
  '웹 기반': 'WEB_ALL',
  'PC 클라이언트': 'PC',
  콘솔: 'CONSOLE',
  VR: 'VR',
  무관: '',
};

export const GENRE_CATEGORY_API_MAP: Record<string, string> = {
  라이프스타일: 'LIFESTYLE',
  '교육/학습': 'EDUCATION',
  '소셜/커뮤니티': 'SOCIAL',
  'AI/실험적 기능': 'AI_EXPERIMENTAL',
  '생산성/도구': 'PRODUCTIVITY',
  '커머스/쇼핑': 'COMMERCE',
  '건강/운동': 'HEALTH_FITNESS',
  엔터테인먼트: 'ENTERTAINMENT',
  '금융/자산관리': 'FINANCE',
  '비지니스/직장인': 'BUSINESS',
  '사진/영상': 'MEDIA',

  '라이프스타일/취미': 'LIFESTYLE_HOBBY',
  '생산성/협업툴': 'PRODUCTIVITY_COLLABORATION',
  '커뮤니티/포럼': 'COMMUNITY_SOCIAL_WEB',
  '커머스/쇼핑몰': 'COMMERCE_SHOPPING_WEB',
  '교육/콘텐츠': 'EDUCATION_CONTENT',
  '마케팅/홍보툴': 'MARKETING_PROMOTION',
  '채용/HR': 'RECRUITMENT_HR',
  '고객관리/세일즈': 'CRM_SALES',
  'AI/자동화 도구': 'AI_AUTOMATION',
  '실험적 웹툴': 'EXPERIMENTAL_WEB',

  캐주얼: 'CASUAL',
  '퍼즐/보드': 'PUZZLE_BOARD',
  'RPG/어드벤처': 'RPG_ADVENTURE',
  시뮬레이션: 'SIMULATION_GAME',
  '전략/카드': 'STRATEGY_CARD',
  '스포츠/레이싱': 'SPORTS_RACING',
  '멀티플레이/소셜': 'MULTIPLAYER_SOCIAL',

  // 공통 장르
  기타: 'ETC',
};

export const GENRE_CATEGORIES_MAP = new Map([
  [
    '앱',
    [
      '전체',
      '교육/학습',
      '생산성/도구',
      '커머스/쇼핑',
      '소셜/커뮤니티',
      '사진/영상',
      '건강/운동',
      '금융/자산관리',
      '비지니스/직장인',
      '엔터테인먼트',
      'AI/실험적 기능',
      '기타',
    ],
  ],
  [
    '웹',
    [
      '전체',
      '라이프스타일/취미',
      '생산성/협업툴',
      '커뮤니티/포럼',
      '커머스/쇼핑몰',
      '금융/자산관리',
      '교육/콘텐츠',
      '마케팅/홍보툴',
      '채용/HR',
      '고객관리/세일즈',
      'AI/자동화 도구',
      '실험적 웹툴',
      '기타',
    ],
  ],
  [
    '게임',
    [
      '전체',
      '캐주얼',
      '퍼즐/보드',
      'RPG/어드벤처',
      '시뮬레이션',
      '전략/카드',
      '스포츠/레이싱',
      '멀티플레이/소셜',
      '기타',
    ],
  ],
  ['인기순위', []],
  [
    '마감임박',
    [
      '전체',
      '생산성/협업툴',
      '커뮤니티/포럼',
      '커머스/쇼핑몰',
      '교육/콘텐츠',
      '마케팅/홍보툴',
      'AI/자동화 도구',
      '실험적 웹툴',
      '기타',
    ],
  ],
] as const);

// 플랫폼 카테고리 Map
export const PLATFORM_CATEGORIES_MAP = new Map([
  ['앱', ['Android', 'iOS', '무관']],
  ['웹', []],
  ['게임', ['모바일', '웹 기반', 'PC 클라이언트', '콘솔', 'VR', '무관']],
  ['인기순위', []],
  ['마감임박', []],
] as const);

// 콘솔 하위 카테고리
export const CONSOLE_SUB_CATEGORIES = ['Play Station', 'Xbox', 'Nintendo Switch'] as const;

// VR 하위 카테고리
export const VR_SUB_CATEGORIES = ['Meta Quest', 'SteamVR', 'HTC Vive'] as const;

// 탭 설정
export const TAB_CONFIG = [
  { children: '앱' },
  { children: '웹' },
  { children: '게임' },
  { children: '인기순위' },
  { children: '마감임박' },
] as const;

// API 파라미터 생성 함수들
export const createApiParams = (
  mainCategory: string,
  platformCategory: string,
  genreCategory: string,
) => {
  const params: Record<string, any> = {
    page: 0,
    size: 10,
    sortBy: 'latest',
  };

  if (mainCategory !== '마감임박') {
    params.mainCategory = MAIN_CATEGORY_API_MAP[mainCategory] || 'APP';

    if (platformCategory !== '무관') {
      params.platformCategory = PLATFORM_CATEGORY_API_MAP[platformCategory] || '';
    }
  } else {
    params.sortBy = 'deadline';
  }

  if (genreCategory !== '전체') {
    params.genreCategory = GENRE_CATEGORY_API_MAP[genreCategory] || '';
  }

  return params;
};
