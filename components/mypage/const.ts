// 마이페이지 사이드바 메뉴 상수
export const MY_PAGE_MENUS = {
  ACTIVITY: {
    title: '내 활동',
    items: [
      { key: 'posted-tests', title: '내가 올린 테스트', countKey: 'postedCount' },
      { key: 'participated-tests', title: '내가 참여한 테스트', countKey: 'participatingCount' },
    ],
  },
  SCRAP: {
    title: '내 스크랩',
    items: [{ key: 'bookmarked-tests', title: '찜한 테스트', countKey: 'bookmarkedCount' }],
  },
  FEEDBACK: {
    title: '내 피드백',
    items: [{ key: 'my-reviews', title: '내가 작성한 리뷰', countKey: 'reviewCount' }],
  },
  SETTINGS: {
    title: '설정',
    items: [
      { key: 'account-management', title: '계정 관리', countKey: undefined },
      { key: 'announcements', title: '공지 사항', countKey: undefined },
      { key: 'betalab-guide', title: '베타랩 안내', countKey: undefined },
    ],
  },
} as const;

// 메뉴 키 타입
export type MyPageMenuKey =
  | 'posted-tests'
  | 'participated-tests'
  | 'bookmarked-tests'
  | 'my-reviews'
  | 'notification-settings'
  | 'account-management'
  | 'announcements'
  | 'betalab-guide';

// 메뉴 아이템 타입
export interface MyPageMenuItem {
  key: MyPageMenuKey;
  title: string;
  countKey?: string;
}

// 메뉴 섹션 타입
export interface MyPageMenuSection {
  title: string;
  items: MyPageMenuItem[];
}

// breadcrumb 생성을 위한 헬퍼 함수
export const getBreadcrumbItems = (activeTab: string) => {
  const baseItems = [{ label: '마이페이지', href: '/mypage' }];

  if (!activeTab) return baseItems;
  let sectionTitle = '';
  for (const [_, section] of Object.entries(MY_PAGE_MENUS)) {
    const foundItem = section.items.find(item => item.key === activeTab);
    if (foundItem) {
      sectionTitle = section.title;
      break;
    }
  }

  if (sectionTitle) {
    return [...baseItems, { label: sectionTitle, href: `/mypage?tab=${activeTab}` }];
  }

  return baseItems;
};
