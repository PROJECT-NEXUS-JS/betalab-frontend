export const UI_TO_API_APP: Record<string, string> = {
  Android: 'ANDROID',
  iOS: 'IOS',
  무관: 'ETC_ALL',
  기타: 'ETC',
};

export const UI_TO_API_GAME: Record<string, string> = {
  Android: 'ANDROID_GAME',
  iOS: 'IOS_GAME',
  'PC 클라이언트': 'PC',
  'Steam VR': 'STEAM_VR',
  'Play Station': 'PLAYSTATION',
  Xbox: 'XBOX',
  'Meta Quest': 'META_QUEST',
  기타: 'GAME_ETC',
  전체: 'GAME_ALL',
};

export const API_TO_UI_APP: Record<string, string> = Object.fromEntries(
  Object.entries(UI_TO_API_APP).map(([ui, api]) => [api, ui]),
);

export const API_TO_UI_GAME: Record<string, string> = Object.fromEntries(
  Object.entries(UI_TO_API_GAME).map(([ui, api]) => [api, ui]),
);

export const PLATFORM_MAP: Record<string, string[]> = {
  app: ['Android', 'iOS', '무관'],
  game: [
    'Android',
    'iOS',
    'PC 클라이언트',
    'Steam VR',
    'Play Station',
    'Xbox',
    'Meta Quest',
    '기타',
    '전체',
  ],
};

