'use client';

import React from 'react';

interface CheckTagProps {
  children: React.ReactNode;
}

export default function CheckTag({ children }: CheckTagProps) {
  return (
    <span className="inline-flex h-[20px] px-[4px] justify-center items-center gap-[4px] rounded-md bg-Gray-100 text-Gray-300 text-caption-02 font-semibold">
      {children}
    </span>
  );
}
