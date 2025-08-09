'use client';
import Image from 'next/image';
import { useState } from 'react';
import Condition, { ConditionProps } from '../atoms/Condition';
import Button from '../atoms/Button';

import Syren from '@/public/icons/applycard-icon/syren.svg';
import Booking from '@/public/icons/applycard-icon/booking.svg';
import Divider from '@/public/icons/applycard-icon/divider.svg';

export interface ApplyCardProps {
  title: string;
  profile: {
    name: string;
    affiliation: string; // 소속
    imageUrl: string;
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
  const [viewAll, setViewAll] = useState(false);
  const endMonth = endDate.toLocaleString('default', { month: 'long' });
  const endDay = endDate.getDate();

  return (
    <div className="w-[258px] p-3 flex flex-col flex-start gap-5">
      <div className="flex flex-col gap-4">
        <section className="flex flex-col gap-2">
          <h2 className="flex text-Black text-xl font-bold">{title}</h2>
          <div className="flex items-center gap-2">
            <Image src={profile.imageUrl} alt={profile.name} width={24} height={24} />
            <div className="flex flex-col gap-1">
              <p className="text-xs font-bold text-Dark-Gray">{profile.name}</p>
              <p className="text-xs font-bold text-Dark-Gray">{profile.affiliation}</p>
            </div>
          </div>
          <div className="flex p-3 items-center justify-center">
            <p className="text-Dark-Gray text-sm">{description}</p>
          </div>
        </section>
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-2 self-stretch">
            <Image src={Syren} alt="Syren Logo" width={24} height={24} />
            <p className="text-sm text-Primary-500 font-bold">
              마감까지 {Math.ceil((endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))}일
              남았어요!
            </p>
            <p className="text-[10px] font-bold text-Light-Gray">
              ~{endMonth}/{endDay}까지
            </p>
          </div>
          <div className="flex items-center gap-2 self-stretch">
            <Image src={Booking} alt="Booking Logo" width={24} height={24} />
            <p className="text-sm text-Dark-Gray font-bold">{scrapedNumber}명이 스크랩했어요!</p>
          </div>
          <Image src={Divider} alt="Divider" width={258} height={2} className="flex" />
          {conditions.map((condition, index) => (
            <Condition key={index} {...condition} />
          ))}
        </section>
        <Button
          State="Solid"
          Size="lg"
          label={viewAll ? '접기' : '전체보기'}
          onClick={() => setViewAll(prev => !prev)}
        />
      </div>
      <p className="text-right text-base text-Primary-500 font-bold">{attendees}명이 참가했어요!</p>
      <div className="flex flex-col gap-[13px]">
        <button onClick={scrapClicked} className="flex justify-center items-center p-2 ">
          <Image src={Booking} alt="Booking Logo" width={34} height={34} />
        </button>
        <Button State="Primary" Size="lg" label="신청하기" onClick={registerClicked} />
      </div>
    </div>
  );
}
