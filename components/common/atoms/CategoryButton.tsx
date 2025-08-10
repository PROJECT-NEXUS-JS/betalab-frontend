import Image from 'next/image';

export interface CategoryButtonProps {
  type: '앱' | '웹' | '인기순위' | '게임' | '마감 임박';
  onClick?: () => void;
}

const ICON_MAP: Record<CategoryButtonProps['type'], { src: string; alt: string }> = {
  앱: { src: '/icons/category-icon/app.svg', alt: '앱 아이콘' },
  웹: { src: '/icons/category-icon/web.svg', alt: '웹 아이콘' },
  인기순위: { src: '/icons/category-icon/goal.svg', alt: '인기순위 아이콘' },
  게임: { src: '/icons/category-icon/game.svg', alt: '게임 아이콘' },
  '마감 임박': { src: '/icons/category-icon/bomb.svg', alt: '마감 임박 아이콘' },
};

export default function CategoryButton({ type, onClick = () => {} }: CategoryButtonProps) {
  const icon = ICON_MAP[type];

  return (
    <button
      className="w-20 h-20 p-4 flex flex-col justify-center items-center bg-Gray-50 rounded-2xl hover:bg-Gray-100 transition-colors gap-2"
      onClick={onClick}
    >
      {icon && <Image src={icon.src} alt={icon.alt} width={32} height={32} />}
      <p className="text-xs w-full text-center">{type}</p>
    </button>
  );
}
