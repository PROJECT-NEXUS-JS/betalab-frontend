'use client';

import Chip from '../atoms/Chip';

interface SelectorProps<T extends string> {
  options: T[];
  selected: T | null;
  onSelect: (value: T) => void;
}

export default function Selector<T extends string>({
  options,
  selected,
  onSelect,
}: SelectorProps<T>) {
  return (
    <div className="flex gap-3 flex-wrap">
      {options.map(option => (
        <Chip
          key={option}
          variant={selected === option ? 'active' : 'solid'}
          size="sm"
          onClick={() => onSelect(option)}
          showArrowIcon={false}
        >
          {option}
        </Chip>
      ))}
    </div>
  );
}
