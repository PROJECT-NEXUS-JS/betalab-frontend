// 메인 카테고리
export const MAIN_CATEGORIES = ['앱', '웹', '게임', '인기순위', '마감임박'] as const;

// 장르 카테고리 Map
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
