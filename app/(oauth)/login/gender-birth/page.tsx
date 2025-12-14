'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import type { DateRange } from 'react-day-picker';
import Button from '@/components/common/atoms/Button';
import DatePicker from '@/components/common/molecules/DatePicker';

type Gender = 'MALE' | 'FEMALE';

export default function GenderBirthPage() {
  const router = useRouter();
  const [gender, setGender] = useState<Gender | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  const birthDate = useMemo(() => {
    if (dateRange?.from && dateRange?.to) {
      return format(dateRange.from, 'yyyy-MM-dd');
    }
    return '';
  }, [dateRange]);

  const handleDateRangeChange = (range: DateRange | undefined) => {
    if (range?.from && range?.to) {
      setDateRange({
        from: range.from,
        to: range.from,
      });
    } else if (range?.from) {
      setDateRange({
        from: range.from,
        to: range.from,
      });
    } else {
      setDateRange(undefined);
    }
  };

  const isFormValid = gender !== null && birthDate.length === 10;

  const handleNext = () => {
    if (!isFormValid) return;

    localStorage.setItem('gender', gender);
    localStorage.setItem('birthDate', birthDate);

    router.push('/login/survey');
  };

  return (
    <div className="w-full min-h-screen px-16 pt-28 pb-24 bg-white flex flex-col items-center gap-10">
      <div className="w-[556px] flex flex-col items-start gap-6">
        <h2 className="text-2xl font-bold text-Black">성별이 어떻게 되시나요 ?</h2>
        <div className="w-full flex gap-6">
          <button
            type="button"
            onClick={() => setGender('MALE')}
            className={`flex-1 h-14 px-8 bg-white rounded-[1px] outline-1 outline-offset-[-1px] flex justify-between items-center transition-colors ${
              gender === 'MALE'
                ? 'outline-Primary-500 bg-Primary-50'
                : 'outline-gray-200 hover:outline-gray-300'
            }`}
          >
            <span
              className={`text-sm font-bold font-['SUIT_Variable'] leading-5 ${
                gender === 'MALE' ? 'text-Primary-500' : 'text-gray-600'
              }`}
            >
              남성
            </span>
          </button>
          <button
            type="button"
            onClick={() => setGender('FEMALE')}
            className={`flex-1 h-14 px-8 bg-white rounded-[1px] outline-1 outline-offset-[-1px] flex justify-between items-center transition-colors ${
              gender === 'FEMALE'
                ? 'outline-Primary-500 bg-Primary-50'
                : 'outline-gray-200 hover:outline-gray-300'
            }`}
          >
            <span
              className={`text-sm font-bold font-['SUIT_Variable'] leading-5 ${
                gender === 'FEMALE' ? 'text-Primary-500' : 'text-gray-600'
              }`}
            >
              여성
            </span>
          </button>
        </div>
      </div>

      <div className="w-[556px] flex flex-col items-start gap-6">
        <h2 className="text-2xl font-bold text-Black">생년월일이 어떻게 되시나요 ?</h2>
        <DatePicker
          value={dateRange}
          onChange={handleDateRangeChange}
          placeholder="YYYY.MM.DD"
          disabledBeforeToday={false}
          className="w-full"
          singleDate={true}
        />
      </div>

      {isFormValid && (
        <div className="w-[556px]">
          <Button State="Primary" Size="xl" onClick={handleNext} label="다음" className="w-full" />
        </div>
      )}
    </div>
  );
}
