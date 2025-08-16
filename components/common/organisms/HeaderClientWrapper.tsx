'use client';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/common/organisms/Header';

export default function HeaderClientWrapper() {
  const { isLoggedIn, isLoading: isAuthLoading } = useAuth();
  return (
    <Header isLogin={isLoggedIn} isAuthLoading={isAuthLoading} />
  )
}