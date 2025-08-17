'use client';
import { useAuth } from '@/hooks/useAuth';
import { usePathname } from 'next/navigation';
import Header from '@/components/common/organisms/Header';

const HIDDEN_HEADER_ROUTES = ['/login', '/login/survey'];

export default function HeaderClientWrapper() {
  const { isLoggedIn, isLoading: isAuthLoading } = useAuth();
  const pathname = usePathname();

  if (pathname && HIDDEN_HEADER_ROUTES.includes(pathname)) {
    return null;
  }
  return <Header isLogin={isLoggedIn} isAuthLoading={isAuthLoading} />;
}
