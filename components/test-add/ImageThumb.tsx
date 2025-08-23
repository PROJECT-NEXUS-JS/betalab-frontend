'use client';

import { useEffect, useMemo, useState } from 'react';

type Props = {
  file: File;
  onRemove: () => void;
};

export default function ImageThumb({ file, onRemove }: Props) {
  const [url, setUrl] = useState<string>('');

  useEffect(() => {
    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return (
    <div
      className="
        relative w-[160px] h-[100px]
        rounded-[6px] border border-Gray-100 bg-Gray-100
        bg-center bg-cover
        overflow-hidden
      "
      style={{ backgroundImage: `url(${url})` }}
    >
      <button
        type="button"
        aria-label="이미지 삭제"
        onClick={onRemove}
        className="
          absolute top-1.5 right-1.5
          h-6 w-6 rounded-full
          bg-Gray-300 text-White
          flex items-center justify-center
          text-[12px] leading-none
          shadow
          hover:opacity-90
        "
      >
        ×
      </button>
    </div>
  );
}
