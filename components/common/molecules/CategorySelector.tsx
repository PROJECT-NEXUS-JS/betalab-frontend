'use client';

import Chip from '@/components/common/atoms/Chip';

const CATEGORIES = ['앱', '웹', '게임', '기타'];

interface Props {
  selected: string | null;
  onSelect: (value: string) => void;
}

export default function CategorySelector({ selected, onSelect }: Props) {
  return (
    <div className="flex gap-3 flex-wrap">
      {CATEGORIES.map((category) => (
        <Chip
          key={category}
          variant={selected === category ? 'active' : 'solid'}
          size="sm"
          onClick={() => onSelect(category)}
        >
          {category}
        </Chip>
      ))}
    </div>
  );
}
