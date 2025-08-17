'use client';

import { useCallback, useEffect, useId, useMemo, useState } from 'react';
import clsx from 'clsx';

type ToggleProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  id?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
};

export default function Toggle({
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  className,
  id,
  ...aria
}: ToggleProps) {
  const internalId = useId();
  const isControlled = typeof checked === 'boolean';
  const [internal, setInternal] = useState(defaultChecked);
  const isOn = isControlled ? (checked as boolean) : internal;

  useEffect(() => {
    if (isControlled) return;
    setInternal(defaultChecked);
  }, [defaultChecked, isControlled]);

  const toggle = useCallback(() => {
    if (disabled) return;
    const next = !isOn;
    if (!isControlled) setInternal(next);
    onChange?.(next);
  }, [disabled, isOn, isControlled, onChange]);

  const baseClasses = useMemo(
    () =>
      clsx(
        'w-14 h-8 rounded-full p-1',
        'relative inline-flex items-center',
        isOn ? 'bg-Primary-500' : 'bg-Gray-200',
        'transition-all duration-200',
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        className,
      ),
    [isOn, disabled, className],
  );

  return (
    <button
      id={id ?? internalId}
      type="button"
      role="switch"
      aria-checked={isOn}
      aria-disabled={disabled || undefined}
      onClick={toggle}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle();
        }
      }}
      className={baseClasses}
      {...aria}
    >
      <span
        className={clsx(
          'block h-6 w-6 rounded-full bg-White shadow',
          'transition-transform duration-200 will-change-transform',
          isOn ? 'translate-x-6' : 'translate-x-0',
        )}
      />
      <span
        className={clsx(
          'absolute inset-0 rounded-full pointer-events-none',
          'focus-within:ring-2 focus-within:ring-Primary-300 focus-within:ring-offset-2',
        )}
      />
    </button>
  );
}
