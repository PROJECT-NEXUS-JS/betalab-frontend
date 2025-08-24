import Button from '@/components/common/atoms/Button';
import HeaderIcons from '../molecules/HeaderIcons';
import Searchbar from '@/components/common/molecules/Searchbar';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import BetalabTextLogo from '../atoms/BetalabTextLogo';
import { LoaderCircle } from 'lucide-react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

interface HeaderProps {
  isLogin?: boolean;
  isSearchbar?: boolean;
  className?: string;
  isAuthLoading?: boolean;
  userData?: {
    nickname: string;
    avatar: string | null;
    affiliation: string | null;
  };
}

export default function Header({
  isLogin = false,
  isSearchbar = false,
  className,
  isAuthLoading = false,
  userData,
}: HeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleSearch = (searchValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (searchValue) {
      params.set('keyword', searchValue);
    } else {
      params.delete('keyword');
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <nav
      className={cn(
        'w-full flex flex-row items-center px-16 py-4 justify-between bg-White shadow-[0_0_10px_0_rgba(26,30,39,0.15)]',
        className,
      )}
    >
      <div className="flex h-11 flex-row items-center gap-4">
        <BetalabTextLogo />
        {isSearchbar && <Searchbar onSearch={handleSearch} />}
      </div>
      {isAuthLoading ? (
        <LoaderCircle className="animate-spin" />
      ) : isLogin ? (
        <HeaderIcons userData={userData} />
      ) : (
        <Link href="/login" passHref>
          <Button State="Sub" Size="xs" label="로그인/회원가입" className="cursor-pointer" />
        </Link>
      )}
    </nav>
  );
}

export function HeaderAdmin({ className }: { className?: string }) {
  return (
    <nav className={cn('w-full flex flex-row items-center px-16 py-4 justify-between', className)}>
      <div className="flex h-11 flex-row items-center gap-3">
        <BetalabTextLogo />
        <h3 className="text-body-01 font-semibold text-Dark-Gray">관리자용</h3>
      </div>
    </nav>
  );
}
