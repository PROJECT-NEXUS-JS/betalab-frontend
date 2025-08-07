'use client';

import React from 'react';

interface TextCounterProps {
  value: string;
  maxLength: number;
}

export default function TextCounter({ value, maxLength }: TextCounterProps) {
  return (
    <div className="w-fit px-2 py-1 rounded bg-Gray-50 text-caption-02 text-Gray-200">
      {value.length}/{maxLength}
    </div>
  );
}
