'use client';
import { usePathname, useRouter } from 'next/navigation';
import SidebarBtn from '@/components/admin/SidebarBtn';
import UserProfileCard from '@/components/common/atoms/UserProfileCard';
import { useProfileQuery } from '@/hooks/profile/quries/useProfileQurey';

interface SidebarProps {
  items: Array<{ label: string; path: string }>;
}

export default function SidebarClientWrapper({ items }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const { data: profile, isLoading, isError } = useProfileQuery();

  if (isLoading) {
    return (
      <aside className="flex flex-col w-full max-w-[258px] p-4">
        <div>프로필 정보를 불러오는 중입니다...</div>
      </aside>
    );
  }

  if (isError) {
    return (
      <aside className="flex flex-col w-full max-w-[258px] p-4 text-red-500">
        <div>프로필 정보를 가져오는 데 실패했습니다.</div>
      </aside>
    );
  }

  if (!profile) {
    return (
      <aside className="flex flex-col w-full max-w-[258px] p-4">
        <div>프로필 정보가 없습니다.</div>
      </aside>
    );
  }

  const profileData = profile?.data;

  return (
    <aside className="flex flex-col w-full max-w-[258px]">
      <UserProfileCard
        profileImageUrl={profileData?.profileImageUrl}
        name={profileData?.nickname || '이름이 없습니다.'}
        affiliation={profileData?.introduction || '소속이 없습니다.'}
        imageSize={36}
      />
      <nav>
        <ul className="space-y-2">
          {items.map(item => (
            <li key={item.path}>
              <SidebarBtn
                state={pathname === item.path ? 'active' : 'default'}
                onClick={() => router.push(item.path)}
              >
                {item.label}
              </SidebarBtn>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
