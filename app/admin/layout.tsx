import type { Metadata } from 'next';
import SidebarClientWrapper from './SidebarClientWrapper';

export const metadata: Metadata = {
  title: 'Betalab Admin',
  description: 'Admin layout for managing the application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mt-10 flex w-full justify-center">
      <div className="max-w-7xl flex gap-10 w-full">
        <SidebarClientWrapper items={SIDEBAR_ITEMS} />
        <div className="w-full flex-1">{children}</div>
      </div>
    </div>
  );
}

const SIDEBAR_ITEMS = [
  { label: '대시보드', path: '/admin/dashboard' },
  { label: '내 프로필', path: '/admin/profile' },
  { label: '프로젝트 관리', path: '/admin/project-manage' },
  { label: '리뷰', path: '/admin/review' },
  { label: '리워드 지급관리', path: '/admin/reward' },
];
