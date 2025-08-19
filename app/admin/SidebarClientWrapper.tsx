'use client';
import { usePathname, useRouter } from 'next/navigation';
import SidebarBtn from '@/components/admin/SidebarBtn';
import UserProfileCard from '@/components/common/atoms/UserProfileCard';

interface SidebarProps {
  items: Array<{ label: string; path: string }>;
}

export default function SidebarClientWrapper({ items }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside className="flex flex-col w-full max-w-[258px]">
      <UserProfileCard profileImageUrl={null} name="관리자" affiliation="Betalab" imageSize={36} />
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
