'use client';
import { useAuth } from '@/hooks/useAuth';
import { usePathname } from 'next/navigation';
import Header, { HeaderAdmin } from '@/components/common/organisms/Header';
import { useMyPageProfileQuery } from '@/hooks/mypage/queries/useMyPageProfileQuery';

const HIDDEN_HEADER_ROUTES = ['/login', '/login/survey'];

export default function HeaderClientWrapper() {
  const { isLoggedIn, isLoading: isAuthLoading } = useAuth();
  const pathname = usePathname();
  const { data: profile } = useMyPageProfileQuery({ enabled: isLoggedIn });

  if (pathname && HIDDEN_HEADER_ROUTES.includes(pathname)) {
    return null;
  }

  if (pathname && pathname.startsWith('/admin')) {
    return <HeaderAdmin />;
  }

  if (pathname && pathname.startsWith('/category')) {
    return (
      <Header
        isSearchbar
        isLogin={isLoggedIn}
        isAuthLoading={isAuthLoading}
        className="shadow-none"
        userData={
          profile
            ? {
                nickname: profile.name,
                avatar: profile.profileImageUrl,
                affiliation: profile.affiliation,
              }
            : undefined
        }
      />
    );
  }

  return (
    <Header
      isLogin={isLoggedIn}
      isAuthLoading={isAuthLoading}
      userData={
        profile
          ? {
              nickname: profile.name,
              avatar: profile.profileImageUrl,
              affiliation: profile.affiliation,
            }
          : undefined
      }
    />
  );
}
