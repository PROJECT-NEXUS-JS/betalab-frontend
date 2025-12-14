import Image from 'next/image';
import { useState } from 'react';

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
}

const StarRating = ({ value, onChange }: StarRatingProps) => {
  // 호버 효과를 위한 로컬 state
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  return (
    <div className="flex gap-2 items-center">
      {[1, 2, 3, 4, 5].map(star => {
        // 호버 중이면 호버된 별까지, 아니면 실제 값까지 채워진 별 표시
        const isFilled = hoverValue !== null ? star <= hoverValue : star <= value;

        return (
          <button
            key={star}
            onClick={() => onChange(star)}
            onMouseEnter={() => setHoverValue(star)}
            onMouseLeave={() => setHoverValue(null)}
            className="focus:outline-none transition-transform active:scale-90 cursor-pointer"
          >
            <Image
              src={
                isFilled
                  ? '/icons/feedback-icon/star-filled.svg'
                  : '/icons/feedback-icon/star-empty.svg'
              }
              alt={`${star}점`}
              width={44} // 디자인에 맞는 크기
              height={44}
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
