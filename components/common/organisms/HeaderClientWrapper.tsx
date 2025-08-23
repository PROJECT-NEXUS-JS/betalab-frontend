'use client';
import { useAuth } from '@/hooks/useAuth';
import { usePathname } from 'next/navigation';
import Header, { HeaderAdmin } from '@/components/common/organisms/Header';

const HIDDEN_HEADER_ROUTES = ['/login', '/login/survey'];

export default function HeaderClientWrapper() {
  const { isLoggedIn, isLoading: isAuthLoading } = useAuth();
  const pathname = usePathname();

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
      />
    );
  }

  return <Header isLogin={isLoggedIn} isAuthLoading={isAuthLoading} />;
}
