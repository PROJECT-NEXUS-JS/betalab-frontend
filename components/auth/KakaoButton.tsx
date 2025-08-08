import { cn } from '@/lib/utils';
import Image from 'next/image';

interface KakaoButtonProps {
  className?: string;
  size: 'md' | 'lg';
  width: 'nararow' | 'wide';
  align: 'left' | 'center';
  label: string;
  onClick?: () => void;
}

export default function KakaoButton({
  className,
  size,
  width,
  align,
  label,
  onClick,
}: KakaoButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center justify-center transition-transform transform hover:scale-102 cursor-pointer',
        'rounded-[6px] bg-[#FEE500]',
        size === 'md' ? 'h-[45px] px-3.5' : 'h-12 ',
        width === 'nararow' ? 'px-7' : 'px-7',
        align === 'left' ? 'justify-start' : 'justify-center',
        className,
      )}
    >
      <Image
        src="/kakao_logo.svg"
        alt="카카오 로그인"
        width={18}
        height={18}
        className="object-fit"
        priority
      />
      <div className="flex items-center justify-center px-21.5 w-full">
        <span className="text-[15px] font-semibold text-Black w-[82px] font-sd-gothic whitespace-nowrap">
          {label}
        </span>
      </div>
    </button>
  );
}
