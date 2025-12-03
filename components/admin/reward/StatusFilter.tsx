'use client';

import { useState, useRef, useEffect } from 'react';

export type StatusFilterValue = 'ALL' | 'PENDING' | 'APPROVED' | 'PAYMENT_PENDING' | 'COMPLETED';

export interface StatusFilterProps {
  value: StatusFilterValue;
  onChange: (value: StatusFilterValue) => void;
}

const filterOptions: { value: StatusFilterValue; label: string }[] = [
  { value: 'ALL', label: '전체' },
  { value: 'PENDING', label: '승인 대기' },
  { value: 'APPROVED', label: '진행 중' },
  { value: 'PAYMENT_PENDING', label: '지급 대기' },
  { value: 'COMPLETED', label: '완료' },
];

export function StatusFilter({ value, onChange }: StatusFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const selectedOption = filterOptions.find(opt => opt.value === value) || filterOptions[0];

  return (
    <div ref={wrapperRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-36 h-12 px-7 bg-white rounded-[1px] outline-1 outline-offset-[-1px] outline-gray-200 inline-flex justify-between items-center"
      >
        <div className="text-gray-600 text-sm font-bold leading-5">{selectedOption.label}</div>
        <div className="w-6 h-6 relative overflow-hidden">
          <div className="w-3 h-1.5 left-[6px] top-[9px] absolute outline-[1.50px] outline-offset-[-0.75px] outline-slate-500"></div>
        </div>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-1 w-28 shadow-[0px_0px_10px_0px_rgba(26,30,39,0.08)] inline-flex flex-col justify-start items-start z-50">
          {filterOptions.map((option, index) => {
            const isFirst = index === 0;
            const isLast = index === filterOptions.length - 1;
            const isSelected = option.value === value;
            const isHover = option.value === 'PENDING' && !isSelected;

            return (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`self-stretch p-2 inline-flex justify-start items-center gap-2.5 ${
                  isFirst ? 'rounded-tl rounded-tr' : ''
                } ${isLast ? 'rounded-bl rounded-br' : ''} ${
                  isHover ? 'bg-gray-200' : isSelected ? 'bg-white' : 'bg-white'
                } hover:bg-gray-200`}
              >
                <div className="flex-1 flex justify-start items-center gap-1">
                  <div className="flex-1 text-gray-600 text-[10px] font-bold leading-4">
                    {option.label}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
