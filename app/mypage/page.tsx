'use client';
import { useUserInfoQuery } from '@/hooks/auth/queries/useUserInfoQuery';

export default function MyPage() {
  const { data: user, isLoading, isError, error } = useUserInfoQuery();

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생: {error.message}</div>;

  return (
    <div>
      <h1>{user?.nickname}님의 마이페이지</h1>
      <p>이메일: {user?.email}</p>
    </div>
  );
}
