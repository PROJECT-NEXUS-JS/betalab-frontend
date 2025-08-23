import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface CustomImageProps {
  src: string | undefined | null;
  alt: string;
  width?: number;
  height?: number;
  state: 'hover' | 'default' | 'sm';
  className?: string;
}

export default function CustomImage({
  src,
  alt,
  width,
  height,
  state,
  className,
}: CustomImageProps) {
  return (
    <div className={cn('rounded-lg bg-Gray-100', className)}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`object-fill transition-all duration-300 ${state === 'hover' ? 'scale-105' : ''}`}
        />
      ) : (
        <div className="bg-Gray-100" style={{ width, height }} />
      )}
    </div>
  );
}
