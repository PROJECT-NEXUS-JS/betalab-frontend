import AppSvg from '@/public/icons/category-icon/app.svg';
import WebSvg from '@/public/icons/category-icon/web.svg';
import GoalSvg from '@/public/icons/category-icon/goal.svg';
import GameSvg from '@/public/icons/category-icon/game.svg';
import CommunitySvg from '@/public/icons/category-icon/community.svg';
import Bomb from '@/public/icons/category-icon/bomb.svg';
import Image from 'next/image';

export interface CategoryButtonProps {
  type: '앱' | '웹' | '인기순위' | '게임' | '마감 임박' | '커뮤니티';
  onClick: () => void; 
}

const ICON_MAP: Record<CategoryButtonProps['type'], { src: any; alt: string }> = {
  앱: { src: AppSvg, alt: '앱 아이콘' },
  웹: { src: WebSvg, alt: '웹 아이콘' },
  인기순위: { src: GoalSvg, alt: '인기순위 아이콘' },
  게임: { src: GameSvg, alt: '게임 아이콘' },
  '마감 임박': { src: Bomb, alt: '마감 임박 아이콘' },
  커뮤니티: { src: CommunitySvg, alt: '커뮤니티 아이콘' },
};

export default function CategoryButton({
  type,
  onClick,
}: CategoryButtonProps) {
  const icon = ICON_MAP[type];
  return (
    <button
      className="w-20 h-20 p-4 flex flex-col justify-center items-center bg-Gray-50 rounded-2xl hover:bg-Gray-100 transition-colors gap-2"
      onClick={onClick}
    >
      {icon && <Image src={icon.src} alt={icon.alt} />}
      <p className='text-xs'>{type}</p>
    </button>
  );
}