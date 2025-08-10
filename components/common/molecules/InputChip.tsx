'use client';

import { useState } from 'react';
import Chip from '@/components/common/atoms/Chip';
import Input from '@/components/common/atoms/Input';
import type { InputProps } from '@/components/common/atoms/Input';

interface InputChipProps {
  chipLabel?: string;
  fieldLabel?: string;
  placeholder?: string;
  initialValue?: string;
  inputSize?: InputProps['size'];
  onChange?: (value: string) => void;
  onOpenChange?: (open: boolean) => void;
}

export default function InputChip({
  chipLabel = '직접 입력',
  fieldLabel = '직접 입력',
  placeholder = '',
  initialValue = '',
  inputSize = 'lg',
  onChange,
  onOpenChange,
}: InputChipProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(initialValue);

  const toggleOpen = () => {
    setOpen(prev => {
      const next = !prev;
      onOpenChange?.(next);
      return next;
    });
  };

  const handleChange: NonNullable<InputProps['onChange']> = e => {
    const v = e.currentTarget.value;
    setValue(v);
    onChange?.(v);
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <Chip
        variant={open ? 'active' : 'solid'}
        size="sm"
        onClick={toggleOpen}
        showArrowIcon={false}
      >
        {chipLabel}
      </Chip>

      {open && (
        <div className="flex flex-col gap-2 w-full">
          {fieldLabel && <p className="text-body-01 font-semibold">{fieldLabel}</p>}
          <Input
            type="text"
            size={inputSize}
            state={value ? 'has value' : 'no value'}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
          />
        </div>
      )}
    </div>
  );
}
