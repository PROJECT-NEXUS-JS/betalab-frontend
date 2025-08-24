'use client';

import React, { useMemo, useRef, useState } from 'react';

type Props = {
  value?: number;
  defaultValue?: number;
  step?: number;
  min?: number;
  max?: number;
  suffix?: string;
  className?: string;
  onChange?: (v: number) => void;
};

export default function ParticipationCheck({
  value,
  defaultValue = 0,
  step = 10,
  min = 0,
  max,
  suffix = '명',
  className = '',
  onChange,
}: Props) {
  const isControlled = value !== undefined;
  const [inner, setInner] = useState<number>(defaultValue);
  const current = isControlled ? (value as number) : inner;

  const clamp = (n: number) => {
    let x = Math.max(min, n);
    if (typeof max === 'number') x = Math.min(max, x);
    return x;
  };
  const setCurrent = (n: number) => {
    const c = clamp(n);
    if (!isControlled) setInner(c);
    onChange?.(c);
  };

  const canDec = useMemo(() => current > min, [current, min]);
  const canInc = useMemo(() => (typeof max === 'number' ? current < max : true), [current, max]);

  const inc = () => canInc && setCurrent(current + step);
  const dec = () => canDec && setCurrent(current - step);

  const holdDelay = 350;
  const repeatEvery = 80;
  const timeoutRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  const startHold = (fn: () => void) => {
    fn();
    timeoutRef.current = window.setTimeout(() => {
      intervalRef.current = window.setInterval(fn, repeatEvery);
    }, holdDelay);
  };
  const endHold = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = e => {
    if (['ArrowLeft', 'ArrowDown'].includes(e.key)) {
      e.preventDefault();
      dec();
    }
    if (['ArrowRight', 'ArrowUp'].includes(e.key)) {
      e.preventDefault();
      inc();
    }
  };

  return (
    <div
      role="group"
      tabIndex={0}
      onKeyDown={onKeyDown}
      className={`w-[258px] select-none rounded-[1px] border border-[var(--color-Gray-100)]
                  bg-[var(--color-White)] px-3 py-2
                  flex items-center justify-between ${className}`}
    >
      <button
        type="button"
        aria-label={`${step}${suffix} 감소`}
        disabled={!canDec}
        onPointerDown={() => startHold(dec)}
        onPointerUp={endHold}
        onPointerCancel={endHold}
        onPointerLeave={endHold}
        className={`grid h-9 w-9 place-items-center rounded-md outline-none
                    ${canDec ? 'cursor-pointer' : 'cursor-not-allowed opacity-40'}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M11.1863 17.8608C11.5851 18.4191 12.4149 18.4191 12.8137 17.8608L20.8705 6.58124C21.3433 5.91937 20.8702 5 20.0568 5H3.94319C3.12982 5 2.65669 5.91937 3.12946 6.58124L11.1863 17.8608Z"
            fill="#64768C"
          />
        </svg>
      </button>

      <div className="text-body-02 font-semibold text-Dark-Gray">
        {current}
        {suffix}
      </div>

      <button
        type="button"
        aria-label={`${step}${suffix} 증가`}
        disabled={!canInc}
        onPointerDown={() => startHold(inc)}
        onPointerUp={endHold}
        onPointerCancel={endHold}
        onPointerLeave={endHold}
        className={`grid h-9 w-9 place-items-center rounded-md outline-none
                    ${canInc ? 'cursor-pointer' : 'cursor-not-allowed opacity-40'}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M11.1858 6.13923C11.5846 5.58088 12.4144 5.58088 12.8132 6.13923L20.8701 17.4188C21.3428 18.0806 20.8697 19 20.0563 19H3.9427C3.12933 19 2.6562 18.0806 3.12897 17.4188L11.1858 6.13923Z"
            fill="#64768C"
          />
        </svg>
      </button>
    </div>
  );
}
