import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';

export interface CustomMediaProps {
  src: string | undefined | null;
  alt: string;
  width?: number;
  height?: number;
  state: 'hover' | 'default' | 'sm';
  className?: string;
}

// 유튜브 ID 추출 함수 (정규식 강화)
function getYoutubeId(url: string) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

// 비디오 파일 확장자 목록
const VIDEO_EXTENSIONS = ['mp4', 'webm', 'ogg', 'mov', 'avi', 'mkv'];

export default function CustomMedia({
  src,
  alt,
  width,
  height,
  state,
  className,
}: CustomMediaProps) {
  // 미디어 타입 판별 로직
  const mediaType = useMemo(() => {
    if (!src) return 'none';

    // 유튜브인지 먼저 확인
    if (getYoutubeId(src)) {
      return 'youtube';
    }

    // 비디오 확장자인지 확인
    const cleanUrl = src.split('?')[0].toLowerCase();
    const isVideoFile = VIDEO_EXTENSIONS.some(ext => cleanUrl.endsWith(`.${ext}`));
    if (isVideoFile) {
      return 'video';
    }

    // 나머지는 이미지로 간주
    return 'image';
  }, [src]);

  if (!src || mediaType === 'none') {
    return <div className={cn('bg-gray-100 rounded-lg', className)} style={{ width, height }} />;
  }

  return (
    <div
      className={cn('flex-shrink-0 relative overflow-hidden rounded-lg', className)}
      style={{ width, height }}
    >
      {/* CASE 1: 유튜브 */}
      {mediaType === 'youtube' && (
        <div className="aspect-video w-full">
          <iframe
            src={`https://www.youtube.com/embed/${getYoutubeId(src)}`}
            title={alt}
            className="w-full h-full"
            allowFullScreen
          />
        </div>
      )}

      {/* CASE 2: 직접 비디오 파일 (.mp4 등) */}
      {mediaType === 'video' && (
        <video src={src} controls playsInline className="w-full h-full object-cover bg-black">
          <track kind="captions" />
        </video>
      )}

      {/* CASE 3: 이미지 (기본값) */}
      {mediaType === 'image' && (
        <Image
          src={src}
          alt={alt}
          width={width ?? 500}
          height={height ?? 300}
          unoptimized // 외부 링크 허용을 위해 필수
          className={cn(
            'w-full h-auto transition-all duration-300',
            state === 'hover' && 'hover:scale-105',
          )}
        />
      )}
    </div>
  );
}
