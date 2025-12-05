'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import CircleX from '@/public/icons/input-icon/circle-x.svg';

type State =
  | 'no value'
  | 'has value'
  | 'focused'
  | 'disabled'
  | 'error'
  | 'information'
  | 'warning'
  | 'success';

type Size = 'sm' | 'md' | 'lg' | 'xl';

type CommonProps = {
  state?: State;
  size?: Size;
  placeholder?: string;
  value?: string;
  maxLength?: number;
  className?: string;
};

type InputKindProps = CommonProps & {
  type?: 'text' | 'number' | 'date';
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
};

type TextAreaKindProps = CommonProps & {
  type: 'text area';
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  onFocus?: React.FocusEventHandler<HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
};

export type InputProps = InputKindProps | TextAreaKindProps;

export default function Input(props: InputProps) {
  const {
    type = 'text',
    state = 'no value',
    size = 'md',
    placeholder = '',
    value = '',
    maxLength,
    className,
  } = props;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const baseClasses = [
    'p-4 text-sm border rounded-[2px] focus:outline-none transition-colors',
    THEME_COLOR_CLASSNAME[state],
    THEME_SIZE_CLASSNAME[size],
    className ?? '',
  ].join(' ');

  const autoResize = () => {
    if (type !== 'text area') return;
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = '0px';
    el.style.height = `${el.scrollHeight}px`;
  };

  useEffect(() => {
    if (type === 'text area') autoResize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, value]);

  if (type === 'text area') {
    // textarea 전용 핸들러 타입 안전
    const { onChange, onFocus, onBlur } = props as TextAreaKindProps;
    return (
      <textarea
        ref={textareaRef}
        className={`${baseClasses} resize-none overflow-hidden`}
        placeholder={placeholder}
        value={value}
        onChange={e => {
          onChange?.(e);
          autoResize();
        }}
        onInput={autoResize}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={state === 'disabled'}
        rows={1}
        maxLength={maxLength}
      />
    );
  }

  // input 전용 핸들러 타입 안전
  const { onChange, onFocus, onBlur } = props as InputKindProps;

  const handleClear = () => {
    if (onChange && state !== 'disabled') {
      const syntheticEvent = {
        target: { value: '' },
        currentTarget: { value: '' },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
  };

  return (
    <div className={`${baseClasses} flex justify-between items-center max-w-full`}>
      <input
        type={type} // 'text' | 'number' | 'date'
        className="w-full pr-10 focus:outline-none"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={state === 'disabled'}
        maxLength={maxLength}
      />
      <button
        type="button"
        onClick={handleClear}
        className={`${THEME_BUTTON_SHOW[state]} cursor-pointer`}
        disabled={state === 'disabled'}
      >
        <Image src={CircleX} alt="Clear input" />
      </button>
    </div>
  );
}

const THEME_COLOR_CLASSNAME: Record<State, string> = {
  'no value': 'border-Gray-100 text-Light-Gray placeholder:text-Light-Gray bg-White',
  'has value': 'border-Gray-100 text-Dark-Gray placeholder:text-Dark-Gray bg-White',
  focused: 'border-Black text-Dark-Gray placeholder:text-Dark-Gray bg-White',
  disabled:
    'border-Gray-100 text-Light-Gray placeholder:text-Light-Gray cursor-not-allowed bg-Gray-100',
  error: 'border-Error text-Dark-Gray placeholder:text-Dark-Gray bg-White',
  information: 'border-Information text-Dark-Gray placeholder:text-Dark-Gray bg-White',
  warning: 'border-Warning text-Dark-Gray placeholder:text-Dark-Gray bg-White',
  success: 'border-Success text-Dark-Gray placeholder:text-Dark-Gray bg-White',
};

const THEME_SIZE_CLASSNAME: Record<Size, string> = {
  sm: 'w-[258px]',
  md: 'w-[556px]',
  lg: 'w-[854px]',
  xl: 'w-[1152px]',
};

const THEME_BUTTON_SHOW: Record<State, string> = {
  'no value': 'hidden',
  'has value': 'block',
  focused: 'block',
  disabled: 'hidden',
  error: 'block',
  information: 'block',
  warning: 'block',
  success: 'block',
};
