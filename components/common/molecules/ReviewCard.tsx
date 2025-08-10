import Image from 'next/image';
import UserProfile from '../svg/UserProfile';
import Button from '../atoms/Button';
import Star from '../svg/Star';
import { cn } from '@/lib/utils';

export interface ReviewCardProps {
  content: string;
  author: {
    name: string;
    imageUrl: string | undefined;
  };
  rating: number;
  date: Date;
  state: 'default' | 'stroke';
}

export default function ReviewCard({
  content,
  author,
  rating,
  date,
  state = 'default',
}: ReviewCardProps) {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  return (
    <div
      className={cn(
        'flex  gap-2 p-3 bg-White rounded-sm shadow-[0_0_10px_0_rgba(26,30,39,0.08)]',
        state === 'default' ? 'w-[854px]' : 'w-[436px]',
      )}
    >
      <div className="flex items-start">
        {author.imageUrl ? (
          <Image
            src={author.imageUrl}
            alt={author.name}
            width={24}
            height={24}
            onError={e => {
              const target = e.currentTarget as HTMLImageElement;
              target.style.display = 'none'; // 이미지 에러 시 숨김 처리 가능
            }}
          />
        ) : (
          <UserProfile className="w-6 h-6" />
        )}
      </div>
      <div className="flex-1 w-full flex-col gap-1 items-start">
        <section className="flex w-full justify-between items-start gap-2">
          <div className="flex-1 flex-col w-full">
            <div className="w-full flex justify-between items-center">
              <div className="flex h-6 items-center justify-center gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    width={24}
                    height={24}
                    fill={i < Math.ceil(rating)}
                    className={cn(
                      'inline-block',
                      i < Math.ceil(rating) ? 'text-yellow-400' : 'text-gray-300',
                    )}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-500">{date.toLocaleDateString()}</p>
            </div>
            <h4 className="flex text-xs font-bold text-Light-Gray">{author.name}</h4>
          </div>
          <Button State="Sub" Size="lg" onClick={() => {}} label="답변하기" />
        </section>
        <section>
          <p className="text-sm text-Dark-Gray">{content}</p>
        </section>
        <section className="w-full flex justify-end">
          <Button State="Text btn" Size="sm" onClick={() => {}} label="더보기" />
        </section>
      </div>
    </div>
  );
}
