'use client';
import { useAuth } from '@/hooks/useAuth';
import { usePathname } from 'next/navigation';
import Header, { HeaderAdmin } from '@/components/common/organisms/Header';
import { useMyPageProfileQuery } from '@/hooks/mypage/queries/useMyPageProfileQuery';

const HIDDEN_HEADER_ROUTES = ['/login', '/login/survey'];

export default function HeaderClientWrapper() {
  const { isLoggedIn, isLoading: isAuthLoading } = useAuth();
  const pathname = usePathname();

  // 로그인 상태이고 인증 로딩이 완료된 경우에만 프로필 데이터 가져오기
  const shouldFetchProfile = isLoggedIn && !isAuthLoading;
  const { data: profile, isLoading: isProfileLoading } = useMyPageProfileQuery({
    enabled: shouldFetchProfile,
  });

  const isLoading = isAuthLoading || (isLoggedIn && isProfileLoading);

  const userData = profile
    ? {
        nickname: profile.name,
        avatar: profile.profileImageUrl,
        affiliation: profile.affiliation,
      }
    : undefined;

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
        isAuthLoading={isLoading}
        className="shadow-none"
        userData={userData}
      />
    );
  }

  return <Header isLogin={isLoggedIn} isAuthLoading={isLoading} userData={userData} />;
}
