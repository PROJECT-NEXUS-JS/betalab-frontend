import React, { useRef } from 'react';
import imageCompression from 'browser-image-compression';

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

  const compressImage = async (file: File): Promise<File> => {
    const options = {
      maxSizeMB: 0.8,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      fileType: file.type || 'image/jpeg',
    };

    try {
      const compressedFile = await imageCompression(file, options);
      if (compressedFile && compressedFile instanceof File) {
        const finalFile = new File([compressedFile], file.name, {
          type: file.type,
          lastModified: Date.now(),
        });
        return finalFile;
      } else {
        console.warn('압축된 파일이 유효하지 않습니다. 원본 파일을 사용합니다.');
        return file;
      }
    } catch (error) {
      console.error('이미지 압축 실패:', error);
      return file;
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      onUpload?.(null);
      return;
    }

    try {
      const processedFiles: File[] = [];

      for (const file of Array.from(files)) {
        try {
          const processedFile = await compressImage(file);
          if (processedFile && processedFile instanceof File) {
            processedFiles.push(processedFile);
          } else {
            processedFiles.push(file);
          }
        } catch (error) {
          console.warn(`파일 ${file.name} 처리 실패, 원본 사용:`, error);
          processedFiles.push(file);
        }
      }
      const dataTransfer = new DataTransfer();
      processedFiles.forEach(file => {
        try {
          dataTransfer.items.add(file);
        } catch (error) {
          console.warn(`DataTransfer에 파일 추가 실패:`, error);
        }
      });

      onUpload?.(dataTransfer.files);
    } catch (error) {
      console.error('이미지 처리 실패:', error);
      onUpload?.(files);
    }
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
