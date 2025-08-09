import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchbarProps {
  className?: string;
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export default function Searchbar({
  className,
  placeholder = '어떤 서비스를 먼저 경험해볼까요?',
  onSearch,
}: SearchbarProps) {
  const searchRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    onSearch?.(searchRef.current?.value || '');
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div
      className={cn(
        'rounded-[100px] relative h-fit shadow-[0_0_7px_rgba(0,0,0,0.1)] bg-transparent',
        className,
      )}
    >
      <input
        ref={searchRef}
        type="text"
        placeholder={placeholder}
        onKeyDown={handleKeyPress}
        className="peer w-[543px] px-5 py-2.5 min-h-[24px] border-none text-body-02 font-medium focus:outline-none border-transparent bg-transparent text-Gray-200 placeholder:text-Gray-200 focus:text-Dark-Gray placeholder:focus:text-Dark-Gray"
      />
      <button
        onClick={handleSearch}
        className="absolute right-5 top-1/2 w-fit h-[fit] transform -translate-y-1/2 bg-black text-white p-0.5 rounded-full hover:bg-gray-800 transition-colors"
        type="button"
      >
        <ArrowRight className="size-5" />
      </button>
    </div>
  );
}
