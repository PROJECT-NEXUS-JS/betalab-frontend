'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { DateRange } from 'react-day-picker';
import {
  addMonths,
  subMonths,
  addYears,
  subYears,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  isBefore,
  isAfter,
  format,
  setYear,
  setMonth,
} from 'date-fns';
import { ko } from 'date-fns/locale';
import clsx from 'clsx';
import Image from 'next/image';

type Props = {
  value?: DateRange;
  onChange: (range: DateRange | undefined) => void;
  placeholder?: string;
  disabledBeforeToday?: boolean;
  className?: string;
};

export default function DatePicker({
  value,
  onChange,
  placeholder = 'YYYY.MM.DD',
  disabledBeforeToday = true,
  className,
}: Props) {
  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const [cursor, setCursor] = useState<Date>(value?.from ?? new Date());
  const [draft, setDraft] = useState<DateRange | undefined>(value);

  // 단일 날짜 선택와 기간 분기
  const text =
    value?.from && value?.to
      ? isSameDay(value.from, value.to)
        ? format(value.from, 'yyyy.MM.dd')
        : `${format(value.from, 'yyyy.MM.dd')} ~ ${format(value.to, 'yyyy.MM.dd')}`
      : '';

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      setDraft(value);
    } else {
      setCursor(value?.from ?? new Date());
    }
  }, [open, value]);

  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) setOpen(false);
  };

  return (
    <div className={clsx('w-full', className)}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={clsx(
          'group flex w-full items-center justify-between rounded-sm border px-4 py-3 text-left',
          'border-Gray-100 bg-White hover:bg-Gray-50 focus:outline-none focus:ring-2 focus:ring-Primary-300',
        )}
      >
        <span className={clsx('text-body-02', text ? 'text-Black' : 'text-Gray-200')}>
          {text || placeholder}
        </span>
        <Image
          src="/icons/calander.svg"
          alt="달력 아이콘"
          width={22}
          height={22}
          className="opacity-70 group-hover:opacity-100"
        />
      </button>

      {open && (
        <div
          ref={overlayRef}
          onClick={handleBackdrop}
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-Black/40 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-[360px] rounded-2xl bg-White p-4 shadow-xl">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-body-01 font-semibold">기간 선택</p>
              <button
                className="rounded-lg px-3 py-1 text-caption-01 text-Gray-300 hover:bg-Gray-50"
                onClick={() => setOpen(false)}
              >
                닫기
              </button>
            </div>

            <Calendar
              cursor={cursor}
              onPrev={() => setCursor(d => subMonths(d, 1))}
              onNext={() => setCursor(d => addMonths(d, 1))}
              onYearChange={year => setCursor(d => setYear(d, year))}
              onMonthChange={month => setCursor(d => setMonth(d, month))}
              range={draft}
              onPick={r => setDraft(r)}
              disabledBeforeToday={disabledBeforeToday}
            />

            <div className="mt-4 flex items-center justify-between">
              <div className="text-caption-01 text-Dark-Gray">
                {draft?.from && draft?.to
                  ? isSameDay(draft.from, draft.to)
                    ? format(draft.from, 'yyyy.MM.dd')
                    : `${format(draft.from, 'yyyy.MM.dd')} ~ ${format(draft.to, 'yyyy.MM.dd')}`
                  : draft?.from
                    ? `${format(draft.from, 'yyyy.MM.dd')} - 종료일을 선택하세요`
                    : '시작일과 종료일을 선택하세요'}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setDraft(undefined)}
                  className="rounded-lg border border-Gray-100 px-4 py-2 text-caption-01 hover:bg-Gray-50"
                >
                  초기화
                </button>
                <button
                  onClick={() => {
                    // 단일 날짜 선택인 경우 from과 to를 같게 설정
                    if (draft?.from && !draft?.to) {
                      onChange({ from: draft.from, to: draft.from });
                    } else {
                      onChange(draft);
                    }
                    setOpen(false);
                  }}
                  className="rounded-lg bg-Primary-500 px-4 py-2 text-caption-01 text-White hover:opacity-90 disabled:opacity-40"
                  disabled={!draft?.from}
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

type CalProps = {
  cursor: Date;
  onPrev: () => void;
  onNext: () => void;
  onYearChange: (year: number) => void;
  onMonthChange: (month: number) => void;
  range?: DateRange;
  onPick: (range: DateRange | undefined) => void;
  disabledBeforeToday?: boolean;
  weekStartsOn?: 0 | 1;
};

function Calendar({
  cursor,
  onPrev,
  onNext,
  onYearChange,
  onMonthChange,
  range,
  onPick,
  disabledBeforeToday = true,
  weekStartsOn = 0,
}: CalProps) {
  const today = new Date();
  const [viewMode, setViewMode] = useState<'month' | 'year' | 'month-select'>('month');

  // 연도 목록
  const currentYear = today.getFullYear();
  const years = useMemo(() => {
    const yearList: number[] = [];
    for (let i = currentYear - 100; i <= currentYear + 10; i++) {
      yearList.push(i);
    }
    return yearList;
  }, [currentYear]);
  const months = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => i);
  }, []);

  const grid = useMemo(() => {
    const start = startOfWeek(startOfMonth(cursor), { weekStartsOn });
    const end = endOfWeek(endOfMonth(cursor), { weekStartsOn });
    const days: Date[] = [];
    let d = start;
    while (!isAfter(d, end)) {
      days.push(d);
      d = addDays(d, 1);
    }
    return days;
  }, [cursor, weekStartsOn]);

  const handleClickDay = (day: Date) => {
    if (disabledBeforeToday && isBefore(strip(day), strip(today))) return;

    if (!range?.from || (range?.from && range?.to)) {
      onPick({ from: day, to: undefined });
      return;
    }
    const from = strip(range.from);
    const to = strip(day);
    onPick(isBefore(to, from) ? { from: to, to: from } : { from, to });
  };

  const badge = (day: Date) => {
    const from = range?.from ? strip(range.from) : undefined;
    const to = range?.to ? strip(range.to) : undefined;
    const s = from && isSameDay(strip(day), from);
    const e = to && isSameDay(strip(day), to);
    const m = from && to && isAfter(strip(day), from) && isBefore(strip(day), to);
    return { s, e, m };
  };

  const wLabels =
    weekStartsOn === 1
      ? ['월', '화', '수', '목', '금', '토', '일']
      : ['일', '월', '화', '수', '목', '금', '토'];

  const handleYearClick = () => {
    setViewMode('year');
  };

  const handleMonthClick = () => {
    setViewMode('month-select');
  };

  const handleYearSelect = (year: number) => {
    onYearChange(year);
    setViewMode('month-select');
  };

  const handleMonthSelect = (month: number) => {
    onMonthChange(month);
    setViewMode('month');
  };
  if (viewMode === 'year') {
    return (
      <div className="rounded-xl bg-Gray-25 p-3">
        <div className="mb-4 flex items-center justify-between">
          <div className="text-title-03 font-semibold">연도 선택</div>
          <button
            onClick={() => setViewMode('month')}
            className="rounded-lg px-3 py-1 text-caption-01 text-Gray-300 hover:bg-Gray-50"
          >
            ← 돌아가기
          </button>
        </div>
        <div className="grid grid-cols-4 gap-2 max-h-[300px] overflow-y-auto">
          {years.map(year => (
            <button
              key={year}
              type="button"
              onClick={() => handleYearSelect(year)}
              className={clsx(
                'rounded-lg px-4 py-2 text-body-02 transition hover:bg-Primary-100',
                cursor.getFullYear() === year
                  ? 'bg-Primary-500 text-White hover:bg-Primary-600'
                  : 'bg-White text-Black hover:bg-Primary-50',
              )}
            >
              {year}
            </button>
          ))}
        </div>
      </div>
    );
  }
  if (viewMode === 'month-select') {
    return (
      <div className="rounded-xl bg-Gray-25 p-3">
        <div className="mb-4 flex items-center justify-between">
          <div className="text-title-03 font-semibold">월 선택</div>
          <button
            onClick={() => setViewMode('month')}
            className="rounded-lg px-3 py-1 text-caption-01 text-Gray-300 hover:bg-Gray-50"
          >
            ← 돌아가기
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {months.map(month => (
            <button
              key={month}
              type="button"
              onClick={() => handleMonthSelect(month)}
              className={clsx(
                'rounded-lg px-4 py-2 text-body-02 transition hover:bg-Primary-100',
                cursor.getMonth() === month
                  ? 'bg-Primary-500 text-White hover:bg-Primary-600'
                  : 'bg-White text-Black hover:bg-Primary-50',
              )}
            >
              {format(new Date(cursor.getFullYear(), month, 1), 'M월', { locale: ko })}
            </button>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="rounded-xl bg-Gray-25 p-3">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleYearClick}
            className="text-title-03 font-semibold hover:text-Primary-500 transition-colors"
          >
            {format(cursor, 'yyyy년', { locale: ko })}
          </button>
          <button
            type="button"
            onClick={handleMonthClick}
            className="text-title-03 font-semibold hover:text-Primary-500 transition-colors"
          >
            {format(cursor, 'M월', { locale: ko })}
          </button>
        </div>
        <div className="flex items-center gap-1">
          <IconBtn onClick={onPrev} ariaLabel="이전 달">
            ‹
          </IconBtn>
          <IconBtn onClick={onNext} ariaLabel="다음 달">
            ›
          </IconBtn>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-y-1 text-center text-Gray-300 text-caption-02">
        {wLabels.map(w => (
          <div key={w} className="py-1">
            {w}
          </div>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-y-1">
        {grid.map(day => {
          const out = !isSameMonth(day, cursor);
          const disabled = disabledBeforeToday && isBefore(strip(day), strip(today));
          const { s, e, m } = badge(day);

          return (
            <div
              key={day.toISOString()}
              className="relative flex items-center justify-center"
              style={{ ['--day' as any]: '40px' }}
            >
              {m && (
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[var(--day)] bg-Primary-100" />
              )}
              {range?.from && range?.to && s && (
                <div className="absolute left-1/2 right-0 top-1/2 -translate-y-1/2 h-[var(--day)] bg-Primary-100" />
              )}
              {range?.from && range?.to && e && (
                <div className="absolute left-0 right-1/2 top-1/2 -translate-y-1/2 h-[var(--day)] bg-Primary-100" />
              )}
              {s && (
                <div className="absolute left-1/2 right-0 top-1/2 -translate-y-1/2 h-[var(--day)] bg-Primary-500" />
              )}
              {e && (
                <div className="absolute left-0 right-1/2 top-1/2 -translate-y-1/2 h-[var(--day)] bg-Primary-500" />
              )}
              <button
                type="button"
                onClick={() => handleClickDay(day)}
                disabled={disabled}
                className={clsx(
                  'relative z-[1] mx-auto flex w-[var(--day)] h-[var(--day)] items-center justify-center rounded-full text-body-02 transition',
                  s || e
                    ? 'bg-Primary-500 text-White'
                    : m
                      ? 'text-Black'
                      : out
                        ? 'text-Gray-300'
                        : 'text-Black',
                  disabled ? 'opacity-30 cursor-not-allowed' : 'active:scale-95',
                )}
              >
                {format(day, 'd')}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function IconBtn(props: React.PropsWithChildren<{ onClick: () => void; ariaLabel: string }>) {
  return (
    <button
      type="button"
      onClick={props.onClick}
      aria-label={props.ariaLabel}
      className="h-8 w-8 rounded-lg text-body-01 hover:bg-Gray-50"
    >
      {props.children}
    </button>
  );
}

function strip(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}
