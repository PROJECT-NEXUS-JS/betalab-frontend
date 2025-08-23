import { useEffect, useRef } from 'react';
import Image from 'next/image';
import CircleX from '@/public/icons/input-icon/circle-x.svg';

export interface InputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement> & React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    'type' | 'size' // 기존 size prop과 충돌 방지
  > {
  type: 'text' | 'text area' | 'number' | 'date';
  state:
    | 'no value'
    | 'has value'
    | 'focused'
    | 'disabled'
    | 'error'
    | 'information'
    | 'warning'
    | 'success';
  size: 'sm' | 'md' | 'lg' | 'xl';

  placeholder?: string;
  value?: string;
  maxLength?: number;
}

export default function Input({
  type = 'text',
  state = 'no value',
  size = 'md',
  placeholder = '',
  value = '',
  onChange = () => {},
  ...rest
}: InputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const baseClasses = `p-4 text-sm border rounded-[2px] focus:outline-none transition-colors ${THEME_COLOR_CLASSNAME[state]} ${THEME_SIZE_CLASSNAME[size]}`;

  const autoResize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = '0px';
    el.style.height = `${el.scrollHeight}px`;
  };

  useEffect(() => {
    if (type === 'text area') autoResize();
  }, [type, value]);

  if (type === 'text area') {
    return (
      <textarea
        ref={textareaRef}
        className={`${baseClasses} resize-none overflow-hidden`}
        placeholder={placeholder}
        value={value}
        onChange={e => {
          onChange(e);
          autoResize();
        }}
        onInput={autoResize}
        disabled={state === 'disabled'}
        rows={1}
      />
    );
  }
  return (
    <div className={`${baseClasses} flex justify-between items-center max-w-full`}>
      <input
        type="text"
        className="w-full pr-10 focus:outline-none max-w-full"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={state === 'disabled'}
        {...rest}
      />
      <button className={`${THEME_BUTTON_SHOW[state]}`}>
        <Image src={CircleX} alt="Clear input" />
      </button>
    </div>
  );
}

const THEME_COLOR_CLASSNAME = {
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

const THEME_SIZE_CLASSNAME = {
  sm: 'w-[258px]',
  md: 'w-[556px]',
  lg: 'w-[854px]',
  xl: 'w-[1152px]',
};

const THEME_BUTTON_SHOW = {
  'no value': 'hidden',
  'has value': 'block',
  focused: 'block',
  disabled: 'hidden',
  error: 'block',
  information: 'block',
  warning: 'block',
  success: 'block',
};
