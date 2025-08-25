import React, { useRef } from 'react';

export type ImageButtonProps = {
  current: number;
  total: number;
  onUpload?: (files: FileList | null) => void;
};

export default function ImageButton({ current, total, onUpload }: ImageButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpload?.(e.target.files);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="flex flex-col justify-center items-center gap-1 border border-Gray-100 bg-white rounded-[2px] w-[76px] h-[76px] p-2"
      >
        <img src="/icons/camera.svg" alt="camera" width={20} height={20} />
        <span className="text-Light-Gray text-[12px] font-medium leading-[16px]">
          {current}/{total}
        </span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
    </>
  );
}
