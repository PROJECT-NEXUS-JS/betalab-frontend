import Button from '@/components/common/atoms/Button';
import HeaderIcons from '../molecules/HeaderIcons';
import Searchbar from '@/components/common/molecules/Searchbar';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import BetalabTextLogo from '../atoms/BetalabTextLogo';

interface HeaderProps {
  isLogin?: boolean;
  isSearchbar?: boolean;
  className?: string;
}

export default function Header({ isLogin = false, isSearchbar = false, className }: HeaderProps) {
  return (
    <nav className={cn('w-full flex flex-row items-center px-16 py-4 justify-between', className)}>
      <div className="flex h-11 flex-row items-center gap-4">
        <BetalabTextLogo />
        {isSearchbar && <Searchbar />}
      </div>
      {isLogin ? (
        <HeaderIcons />
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
