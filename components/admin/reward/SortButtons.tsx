'use client';

interface SortButtonsProps {
  sortDirection: 'ASC' | 'DESC';
  onChange: (direction: 'ASC' | 'DESC') => void;
}

export default function SortButtons({ sortDirection, onChange }: SortButtonsProps) {
  return (
    <div className="self-stretch inline-flex flex-col justify-center items-end gap-2.5 overflow-hidden">
      <div className="bg-gray-200 rounded-[1px] inline-flex justify-start items-center">
        <button
          onClick={() => onChange('DESC')}
          className={`w-12 h-8 px-2 rounded-[1px] outline-1 outline-offset-[-1px] outline-gray-200 flex justify-between items-center ${
            sortDirection === 'DESC' ? 'bg-white' : 'bg-gray-200'
          }`}
        >
          <div
            className={`text-[10px] font-bold leading-4 ${
              sortDirection === 'DESC' ? 'text-gray-600' : 'text-gray-400'
            }`}
          >
            최신순
          </div>
        </button>
        <button
          onClick={() => onChange('ASC')}
          className={`h-8 px-2 rounded-[1px] flex justify-center items-center gap-2.5 ${
            sortDirection === 'ASC'
              ? 'bg-white outline-1 outline-offset-[-1px] outline-gray-200'
              : 'bg-gray-200'
          }`}
        >
          <div
            className={`text-[10px] font-bold leading-4 ${
              sortDirection === 'ASC' ? 'text-gray-600' : 'text-gray-400'
            }`}
          >
            오래된순
          </div>
        </button>
      </div>
    </div>
  );
}
