'use client';

import Chip from '../atoms/Chip';

const CATEGORY_MAP = {
  앱: 'app',
  웹: 'web',
  게임: 'game',
  기타: 'etc',
} as const;

type Category = keyof typeof CATEGORY_MAP;

interface Props {
  selected: string | null;
  onSelect: (value: Category) => void;
}

export default function CategorySelector({ selected, onSelect }: Props) {
  return (
    <div className="flex gap-3 flex-wrap">
      {Object.keys(CATEGORY_MAP).map(category => (
        <Chip
          key={category}
          variant={selected === category ? 'active' : 'solid'}
          size="sm"
          onClick={() => onSelect(category as Category)}
        >
          {category}
        </Chip>
      ))}
    </div>
  );
}
