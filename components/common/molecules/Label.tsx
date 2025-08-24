'use client';
import { useState } from 'react';
import Tag from '@/components/common/atoms/Tag';
import Input from '@/components/common/atoms/Input';
import HelpText from '@/components/common/atoms/HelpText';

export interface LabelProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement> & React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    'size' | 'type' // 기존 size prop과 충돌 방지
  > {
  size: 'sm' | 'md' | 'lg' | 'xl';
  help: boolean;
  label: boolean;
  tag: boolean;
  tag2: boolean;
  textCounter: boolean;

  labelText?: string;
  tagStyle?: 'orange' | 'red' | 'green' | 'purple' | 'black' | 'blue' | 'gray' | '필수';
  tag2Style?: 'orange' | 'red' | 'green' | 'purple' | 'black' | 'blue' | 'gray' | '필수';
  dday?: number;
  placeholder?: string;
  value?: string;
  helpText?: string;
  maxLength?: number;
  className?: string;
}

export default function Label({
  size = 'md',
  help = false,
  label = false,
  tag = false,
  tag2 = false,
  textCounter = false,

  labelText = '',
  tagStyle = '필수',
  tag2Style = 'gray',
  dday = 7,
  placeholder = '',
  value = '',
  helpText = '',
  maxLength = 30,
  className = '',
  ...rest
}: LabelProps) {
  const [inputValueLength, setInputValueLength] = useState(value.length);

  return (
    <div className={`flex flex-col gap-1 ${THEME_SIZE_CLASSNAME[size]} ${className}`}>
      {label && (
        <div className="flex items-center justify-start gap-1">
          {label && <label className="text-base font-semibold text-Black">{labelText}</label>}
          {tag && <Tag style={tagStyle} onClick={() => {}} dday={dday} />}
          {tag2 && <Tag style={tag2Style} onClick={() => {}} dday={dday} />}
        </div>
      )}
      <Input
        type="text"
        state="has value"
        size={size}
        placeholder={placeholder}
        value={value}
        {...rest}
      />
      <div className="flex items-center justify-between">
        {help && <HelpText style="error" text={helpText} />}
        {textCounter && (
          <span className="text-[10px] text-Light-Gray font-semibold">
            {`${inputValueLength}/${maxLength}`}
          </span>
        )}
      </div>
    </div>
  );
}

const THEME_SIZE_CLASSNAME = {
  sm: 'w-[258px]',
  md: 'w-[556px]',
  lg: 'w-[854px]',
  xl: 'w-[1152px]',
};
