import type { CheckOption } from '@/components/admin/project-manage/CheckDropDown';

export type TestType = 'game' | 'app' | 'web';

export type ConditionInitial = {
  genderRequired: boolean;
  gender?: 'male' | 'female' | null;
  ageRequired: boolean;
  ageMin?: number | null;
  ageMax?: number | null;
  extraRequired: boolean;
  extraText?: string;
  rewardRequired: boolean;
  rewardText?: string;
};

export const TEST_TYPES: { label: string; value: TestType }[] = [
  { label: '게임', value: 'game' },
  { label: '앱', value: 'app' },
  { label: '웹', value: 'web' },
];

export const DURATIONS = [
  { label: '하루 미만', value: '하루 미만' },
  { label: '3일 미만 사용', value: '3일 미만 사용' },
  { label: '일주일 이상 사용', value: '일주일 이상 사용' },
  { label: '하루 미만 사용', value: '하루 미만 사용' },
];

export const PLATFORMS: CheckOption[] = [
  { label: 'Android', value: 'android' },
  { label: 'iOS', value: 'ios' },
  { label: 'PC 클라이언트', value: 'pc' },
  { label: 'Steam VR', value: 'steamvr' },
  { label: 'Play Station', value: 'ps' },
  { label: 'Xbox', value: 'xbox' },
  { label: 'Meta Quest', value: 'quest' },
  { label: '기타', value: 'etc' },
];

export const APP_PLATFORM_OPTIONS = [
  { label: 'iOS', value: 'ios' },
  { label: 'Android', value: 'android' },
  { label: '무관', value: 'any' },
];

export const FEEDBACKS: CheckOption[] = [
  { label: '구글폼 제출', value: '구글폼 제출' },
  { label: '앱 내 피드백 경로', value: '앱 내 피드백 경로' },
  { label: '이메일 회신', value: '이메일 회신' },
  { label: '슬랙/디스코드 커뮤니티 댓글', value: '슬랙/디스코드 커뮤니티 댓글' },
  { label: '직접 입력', value: '직접 입력' },
];

export const GENRES_APP: CheckOption[] = [
  { label: '라이프 스타일', value: 'lifestyle' },
  { label: '교육/학습', value: 'edu' },
  { label: '소셜/커뮤니티', value: 'social' },
  { label: 'AI/실험적 기능', value: 'ai-experimental' },
  { label: '생산성/도구', value: 'productivity-tools' },
  { label: '커머스/쇼핑', value: 'commerce' },
  { label: '건강/운동', value: 'health-fitness' },
  { label: '엔터테인먼트', value: 'entertainment' },
  { label: '금융/자산관리', value: 'finance' },
  { label: '비즈니스/직장인', value: 'business' },
  { label: '사진/영상', value: 'photo-video' },
  { label: '기타', value: 'etc' },
];

export const GENRES_WEB: CheckOption[] = [
  { label: '생산성/협업툴', value: 'productivity-collab' },
  { label: '커머스/쇼핑', value: 'commerce' },
  { label: '마케팅/홍보툴', value: 'marketing' },
  { label: '커뮤니티/소셜', value: 'community-social' },
  { label: '교육/콘텐츠', value: 'education-content' },
  { label: '금융/자산관리', value: 'finance' },
  { label: 'AI/자동화 도구', value: 'ai-automation' },
  { label: '실험적 웹툴', value: 'experimental-web' },
  { label: '라이프 스타일/취미', value: 'lifestyle-hobby' },
  { label: '채용/HR', value: 'recruiting-hr' },
  { label: '고객관리/세일즈', value: 'crm-sales' },
  { label: '기타', value: 'etc' },
];

export const GENRES_GAME: CheckOption[] = [
  { label: '캐주얼', value: 'casual' },
  { label: '퍼즐/보드', value: 'puzzle-board' },
  { label: 'RPG/어드벤처', value: 'rpg-adventure' },
  { label: '시뮬레이션', value: 'simulation' },
  { label: '전략/카드', value: 'strategy-card' },
  { label: '스포츠/레이싱', value: 'sports-racing' },
  { label: '멀티플레이/소셜', value: 'multiplayer-social' },
  { label: '기타', value: 'etc' },
];

export const GENRES_BY_TYPE: Record<TestType, CheckOption[]> = {
  app: GENRES_APP,
  web: GENRES_WEB,
  game: GENRES_GAME,
};

export const MAIN_API_TO_UI: Record<string, TestType> = {
  WEB: 'web',
  APP: 'app',
  GAME: 'game',
};

export const PLATFORM_API_TO_UI: Record<string, string> = {
  ANDROID: 'android',
  IOS: 'ios',
  PC_CLIENT: 'pc',
  STEAM_VR: 'steamvr',
  PLAY_STATION: 'ps',
  XBOX: 'xbox',
  META_QUEST: 'quest',
  ETC: 'etc',
};

export const GENRE_API_TO_UI_WEB: Record<string, string> = {
  PRODUCTIVITY_COLLAB: 'productivity-collab',
  COMMERCE_SHOPPING_WEB: 'commerce',
  MARKETING: 'marketing',
  COMMUNITY_SOCIAL_WEB: 'community-social',
  EDUCATION_CONTENT: 'education-content',
  FINANCE: 'finance',
  AI_AUTOMATION: 'ai-automation',
  EXPERIMENTAL_WEB: 'experimental-web',
  LIFESTYLE_HOBBY: 'lifestyle-hobby',
  RECRUITING_HR: 'recruiting-hr',
  CRM_SALES: 'crm-sales',
  ETC: 'etc',
};

export const GENRE_API_TO_UI_APP: Record<string, string> = {
  LIFESTYLE: 'lifestyle',
  EDUCATION: 'edu',
  SOCIAL: 'social',
  AI_EXPERIMENTAL: 'ai-experimental',
  PRODUCTIVITY_TOOLS: 'productivity-tools',
  COMMERCE: 'commerce',
  HEALTH_FITNESS: 'health-fitness',
  ENTERTAINMENT: 'entertainment',
  FINANCE: 'finance',
  BUSINESS: 'business',
  PHOTO_VIDEO: 'photo-video',
  ETC: 'etc',
};

export const GENRE_API_TO_UI_GAME: Record<string, string> = {
  CASUAL: 'casual',
  PUZZLE_BOARD: 'puzzle-board',
  RPG_ADVENTURE: 'rpg-adventure',
  SIMULATION: 'simulation',
  STRATEGY_CARD: 'strategy-card',
  SPORTS_RACING: 'sports-racing',
  MULTIPLAYER_SOCIAL: 'multiplayer-social',
  ETC: 'etc',
};

export const pickGenreMap = (tt: TestType) =>
  tt === 'web' ? GENRE_API_TO_UI_WEB : tt === 'app' ? GENRE_API_TO_UI_APP : GENRE_API_TO_UI_GAME;

export const FEEDBACK_API_TO_UI: Record<string, string> = {
  GOOGLE_FORM: '구글폼 제출',
  EMAIL: '이메일 회신',
  TOOL: '설문 도구',
  '구글폼 제출': '구글폼 제출',
  '앱 내 피드백 경로': '앱 내 피드백 경로',
  '이메일 회신': '이메일 회신',
  '슬랙/디스코드 커뮤니티 댓글': '슬랙/디스코드 커뮤니티 댓글',
  '직접 입력': '직접 입력',
};

// Privacy Items 타입 및 상수
export type PIItem = string | { code?: string; value?: string; name?: string };

export const PI_API_TO_UI: Record<string, string> = {
  NAME: '이름',
  EMAIL: '이메일',
  CONTACT: '연락처',
  ETC: '기타',
  이름: '이름',
  이메일: '이메일',
  연락처: '연락처',
  기타: '기타',
};

// 유틸리티 함수
export const parseISOorNull = (s?: string | null) => (s ? new Date(s) : undefined);

export const firstArray = <T>(...cands: unknown[]): T[] => {
  const arr = cands.find(Array.isArray) as unknown[] | undefined;
  return (arr ?? []) as T[];
};
