import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const ctwMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        'head',
        'subtitle-01',
        'subtitle-02',
        'body-01',
        'body-02',
        'caption-01',
        'caption-02',
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return ctwMerge(clsx(inputs));
}
