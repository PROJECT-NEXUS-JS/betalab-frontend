'use client';

import React, { useEffect, useId, useMemo, useRef, useState } from 'react';

type Option = { label: string; value: string };
type Props = {
  value?: string;
  defaultValue?: string;
  options: Option[];
  placeholder?: string;
  className?: string;
  onChange?: (value: string) => void;
};

export default function Dropdown({
  value,
  defaultValue,
  options,
  placeholder = '',
  className = '',
  onChange,
}: Props) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const [open, setOpen] = useState(false);
  const isControlled = value !== undefined;
  const [inner, setInner] = useState<string | undefined>(defaultValue);

  const current = isControlled ? value : inner;
  const setCurrent = (v: string) => {
    if (!isControlled) setInner(v);
    onChange?.(v);
  };

  const id = useId();
  const selectedIndex = useMemo(
    () => options.findIndex(o => o.value === current),
    [options, current],
  );

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open && (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      setOpen(true);
      requestAnimationFrame(() => {
        const first = listRef.current?.querySelector<HTMLLIElement>('[role="option"]');
        first?.focus();
      });
      return;
    }

    if (open) {
      if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
  };

  const choose = (opt: Option) => {
    setCurrent(opt.value);
    setOpen(false);
    buttonRef.current?.focus();
  };

  return (
    <div ref={wrapperRef} className={`relative w-[230px] ${className}`} onKeyDown={onKeyDown}>
      <button
        ref={buttonRef}
        id={`dropdown-button-${id}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`dropdown-list-${id}`}
        onClick={() => setOpen(v => !v)}
        className="w-[258px] h-[48px] text-left rounded-[1px] border border-Gray-100 bg-white)]
                   px-6 py-8 outline-none flex items-center justify-between"
      >
        <span
          className={`text-body-02 font-semibold ${
            current ? 'text-[var(--color-Black)]' : 'text-[var(--color-Gray-300)]'
          }`}
        >
          {current ? options.find(o => o.value === current)?.label : placeholder}
        </span>

        <svg
          className={`h-6 w-6 transition-transform duration-200 ${
            open ? 'rotate-180' : 'rotate-0'
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="#64768C"
          strokeWidth="2"
          aria-hidden
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div
          role="presentation"
          className="absolute left-[150px] top-full mt-2 z-50  min-w-[108px] w-max max-w-[90vw] border border-Gray-100)]
                     bg-white] shadow-card"
        >
          <ul
            ref={listRef}
            id={`dropdown-list-${id}`}
            role="listbox"
            aria-labelledby={`dropdown-button-${id}`}
            className="max-h-[320px] overflow-auto py-2"
          >
            {options.map((opt, i) => {
              const selected = i === selectedIndex;
              return (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={selected}
                  tabIndex={0}
                  onClick={() => choose(opt)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      choose(opt);
                    }
                    if (e.key === 'ArrowDown') {
                      e.preventDefault();
                      (e.currentTarget.nextElementSibling as HTMLLIElement | null)?.focus();
                    }
                    if (e.key === 'ArrowUp') {
                      e.preventDefault();
                      (e.currentTarget.previousElementSibling as HTMLLIElement | null)?.focus();
                    }
                  }}
                  className={`w-full cursor-pointer outline-none px-6 py-4
                              text-caption-02 font-semibold
                              ${selected ? 'font-semibold' : 'font-bold'}
                              hover:bg-[var(--color-Gray-50)]
                              focus:bg-[var(--color-Gray-50)]`}
                >
                  {opt.label}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
