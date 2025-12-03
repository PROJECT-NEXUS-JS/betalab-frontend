interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: 'image/jpeg' | 'image/png' | 'image/webp';
  maintainAspectRatio?: boolean;
}

const DEFAULT_OPTIONS: Required<CompressionOptions> = {
  maxWidth: 1920,
  maxHeight: 1080,
  quality: 0.9,
  format: 'image/jpeg',
  maintainAspectRatio: true,
};

export async function compressImage(file: File, options: CompressionOptions = {}): Promise<File> {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = e => {
      const img = new window.Image();
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          if (opts.maintainAspectRatio) {
            if (width > opts.maxWidth || height > opts.maxHeight) {
              const ratio = Math.min(opts.maxWidth / width, opts.maxHeight / height);
              width = width * ratio;
              height = height * ratio;
            }
          } else {
            width = Math.min(width, opts.maxWidth);
            height = Math.min(height, opts.maxHeight);
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Canvas context를 가져올 수 없습니다.'));
            return;
          }

          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';

          ctx.drawImage(img, 0, 0, width, height);

          if (opts.format === 'image/png') {
            canvas.toBlob(
              blob => {
                if (!blob) {
                  reject(new Error('이미지 압축에 실패했습니다.'));
                  return;
                }
                const compressedFile = new File([blob], file.name, {
                  type: opts.format,
                  lastModified: Date.now(),
                });
                resolve(compressedFile);
              },
              opts.format,
              1.0,
            );
          } else {
            canvas.toBlob(
              blob => {
                if (!blob) {
                  reject(new Error('이미지 압축에 실패했습니다.'));
                  return;
                }
                const compressedFile = new File([blob], file.name, {
                  type: opts.format,
                  lastModified: Date.now(),
                });
                resolve(compressedFile);
              },
              opts.format,
              opts.quality,
            );
          }
        } catch (error) {
          reject(error);
        }
      };

      img.onerror = () => {
        reject(new Error('이미지를 로드할 수 없습니다.'));
      };

      if (typeof e.target?.result === 'string') {
        img.src = e.target.result;
      } else if (e.target?.result instanceof ArrayBuffer) {
        const blob = new Blob([e.target.result], { type: file.type });
        img.src = URL.createObjectURL(blob);
      }
    };

    reader.onerror = () => {
      reject(new Error('파일을 읽을 수 없습니다.'));
    };

    reader.readAsDataURL(file);
  });
}

export async function compressImages(
  files: File[],
  options: CompressionOptions = {},
): Promise<File[]> {
  return Promise.all(files.map(file => compressImage(file, options)));
}
