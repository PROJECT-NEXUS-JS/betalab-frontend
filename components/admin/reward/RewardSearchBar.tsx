'use client';

interface RewardSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RewardSearchBar({
  value,
  onChange,
  placeholder = '찾으시는 참여자의 이름 또는 이메일을 검색 해보세요',
}: RewardSearchBarProps) {
  return (
    <div className="self-stretch p-4 bg-white rounded-sm outline-1 outline-offset-[-1px] outline-gray-200 inline-flex justify-between items-center">
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 text-gray-400 text-sm font-bold leading-5 bg-transparent border-none outline-none"
      />
    </div>
  );
}
