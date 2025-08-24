'use client';

import React, { useEffect, useId, useMemo, useRef, useState } from 'react';

export type CheckOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

type Props = {
  options: CheckOption[];
  value?: string[];
  defaultValue?: string[];
  placeholder?: string;
  className?: string;
  onChange?: (values: string[]) => void;
};

export default function CheckDropDown({
  options,
  value,
  defaultValue = [],
  placeholder = '선택하세요',
  className = '',
  onChange,
}: Props) {
  const id = useId();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  const isControlled = value !== undefined;
  const [inner, setInner] = useState<string[]>(defaultValue);
  const [open, setOpen] = useState(false);

  const selected = isControlled ? value! : inner;
  const setSelected = (vals: string[]) => {
    if (!isControlled) setInner(vals);
    onChange?.(vals);
  };

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open && (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown')) {
      e.preventDefault();
      setOpen(true);
      requestAnimationFrame(() => {
        const first = listRef.current?.querySelector<HTMLLIElement>('[role="option"]');
        first?.focus();
      });
      return;
    }
    if (open && e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
      buttonRef.current?.focus();
    }
  };

  const toggle = (val: string) => {
    setSelected(selected.includes(val) ? selected.filter(v => v !== val) : [...selected, val]);
  };

  const chips = useMemo(
    () =>
      options
        .filter(o => selected.includes(o.value))
        .map(o => ({
          label: o.label,
          value: o.value,
        })),
    [options, selected],
  );

  return (
    <div ref={wrapperRef} className={`relative w-556 ${className}`} onKeyDown={onKeyDown}>
      <button
        ref={buttonRef}
        id={`chkdd-btn-${id}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`chkdd-list-${id}`}
        onClick={() => setOpen(v => !v)}
        className="w-[556px] min-h-[48px] text-left rounded-[1px] border border-Gray-100 bg-white)]
                   px-3 py-4 outline-none flex items-center justify-between"
      >
        <div className="fflex-1 flex flex-wrap items-center gap-2">
          {chips.length === 0 ? (
            <span className="text-body-02 text-Dark-Gray">{placeholder}</span>
          ) : (
            chips.map(chip => (
              <span
                key={chip.value}
                className="inline-flex items-center gap-2 rounded-full
                           bg-Primary-100 px-4 py-2
                           text-caption-01 font-semibold text-Primary-500"
              >
                {chip.label}
                <button
                  type="button"
                  aria-label={`${chip.label} 제거`}
                  onClick={e => {
                    e.stopPropagation();
                    toggle(chip.value);
                  }}
                  className="grid h-5 w-5 place-items-center rounded-full
                             hover:bg-Primary-200"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 6l12 12M18 6l-12 12" />
                  </svg>
                </button>
              </span>
            ))
          )}
        </div>

        <svg
          className={`h-6 w-6 flex-shrink-0 text-Gray-300
                      transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div
          role="presentation"
          className="absolute left-[425px] top-full mt-2 z-50 min-w-[108px] w-max max-w-[90vw] border border-Gray-100)]
                     bg-white] shadow-card"
        >
          <ul
            ref={listRef}
            id={`chkdd-list-${id}`}
            role="listbox"
            aria-labelledby={`chkdd-btn-${id}`}
            className="max-h-[420px] overflow-auto py-2"
          >
            {options.map(opt => {
              const checked = selected.includes(opt.value);
              return (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={checked}
                  tabIndex={0}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      if (!opt.disabled) toggle(opt.value);
                    }
                  }}
                  className={`w-full cursor-pointer px-4 py-3 outline-none
                              hover:bg-gray-50 focus:bg-gray-50
                              ${opt.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => !opt.disabled && toggle(opt.value)}
                >
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => {}}
                      readOnly
                      disabled={opt.disabled}
                      className="h-5 w-5 rounded border-Gray-200 accent-Primary-500"
                    />
                    <span className="text-caption-02">{opt.label}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
