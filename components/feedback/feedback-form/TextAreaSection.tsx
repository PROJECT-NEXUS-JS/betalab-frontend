'use client';

import { ChangeEvent } from 'react';
import Input from '@/components/common/atoms/Input';

interface TextAreaSectionProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
}

const TextAreaSection = ({
  label,
  value,
  onChange,
  placeholder = '내용을 입력해주세요.',
  maxLength = 80,
}: TextAreaSectionProps) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
    // 글자 수 제한 로직 필요
  };

  return (
    <div className="flex flex-col gap-y-1">
      <label className="text-sm font-bold text-Black">{label}</label>
      <Input
        type="text area"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        maxLength={maxLength}
        state={value.trim() ? 'has value' : 'no value'}
        className="w-full text-Black"
        style={value.trim() ? { fontWeight: 'bold' } : undefined}
      />
      <div className="p-1 self-end text-right font-bold text-[10px] text-Light-Gray bg-Gray-50">
        {value.length}/{maxLength}
      </div>
    </div>
  );
};

export default TextAreaSection;
