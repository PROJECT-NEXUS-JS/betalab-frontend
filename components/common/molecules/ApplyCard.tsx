'use client';
import Image from 'next/image';
import { useState } from 'react';
import Condition, { ConditionProps } from '../atoms/Condition';
import Button from '../atoms/Button';
import UserProfile from '../svg/UserProfile';
import BookMark from '../svg/BookMark';

export interface ApplyCardProps {
  title: string;
  profile: {
    name: string;
    affiliation: string; // 소속
    imageUrl: string | undefined | null;
  };
  description: string;
  endDate: Date;
  scrapedNumber: number;
  conditions: ConditionProps[];
  attendees: number;
  scraped: boolean;
  scrapClicked: () => void;
  registerClicked: () => void;
}

export default function ApplyCard({
  title,
  profile,
  description,
  endDate,
  scrapedNumber,
  conditions,
  attendees,
  scraped,
  scrapClicked,
  registerClicked,
}: ApplyCardProps) {
  const [viewMore, setViewMore] = useState(false);
  const endMonth = endDate.getMonth() + 1;
  const endDay = endDate.getDate();

  const viewConditions = viewMore ? conditions : conditions.slice(0, 3);

  return (
    <div className="w-[258px] h-max p-3 flex flex-col flex-start gap-5 bg-White rounded-sm shadow-[0_0_10px_0_rgba(26,30,39,0.08)]">
      <div className="flex flex-col gap-4">
        <section className="flex flex-col gap-2">
          <h2 className="flex text-Black text-xl font-bold">{title}</h2>
          <div className="flex items-center gap-1 h-max">
            {profile.imageUrl ? (
              <Image
                src={profile.imageUrl}
                alt={profile.name}
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
            <div className="flex flex-col gap-1">
              <p className="text-xs font-bold text-Dark-Gray">{profile.name}</p>
              <p className="text-xs font-bold text-Dark-Gray">{profile.affiliation}</p>
            </div>
          </div>
          <div className="flex p-3 items-center bg-Gray-50 rounded-sm">
            <p className="text-Dark-Gray text-sm">{description}</p>
          </div>
        </section>
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-2 self-stretch">
            <Image
              src={'/icons/applycard-icon/syren.svg'}
              alt="Syren Logo"
              width={24}
              height={24}
            />
            <p className="text-sm text-Primary-500 font-bold">
              마감까지 {Math.ceil((endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))}일
              남았어요!
            </p>
            <p className="text-[10px] font-bold text-Light-Gray">
              ~{endMonth}/{endDay}까지
            </p>
          </div>
          <div className="flex items-center gap-2 self-stretch">
            <BookMark className="size-6 fill-transparent text-Gray-300 stroke-Gray-300 stroke-2" />
            <p className="text-sm text-Dark-Gray font-bold">{scrapedNumber}명이 스크랩했어요!</p>
          </div>

          <Image
            src={'/icons/applycard-icon/divider.svg'}
            alt="Divider"
            width={258}
            height={2}
            className="flex"
          />

          {viewConditions.map((condition, index) => (
            <Condition key={index} {...condition} />
          ))}
        </section>

        <Button
          State="Solid"
          Size="lg"
          label={viewMore ? '접기' : '전체보기'}
          onClick={() => setViewMore(prev => !prev)}
        />
      </div>
      <p className="text-right text-base text-Primary-500 font-bold">{attendees}명이 참가했어요!</p>
      <div className="flex gap-[13px]">
        <button onClick={scrapClicked} className="flex justify-center items-center w-11 h-11">
          <BookMark
            className={`size-8 cursor-pointer ${
              scraped
                ? 'fill-Gray-300 text-Gray-300'
                : 'fill-transparent text-Gray-300 stroke-Gray-300 stroke-2'
            }`}
          />
        </button>
        <Button
          State="Primary"
          Size="lg"
          label="신청하기"
          onClick={registerClicked}
          className="w-full flex-1"
        />
      </div>
    </div>
  );
}
