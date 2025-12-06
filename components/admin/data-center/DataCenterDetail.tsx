'use client';

import Chip from '@/components/common/atoms/Chip';
import useDaterCenterDetail from '@/hooks/data-center/queries/useDaterCenterDetailQuery';
import { useGetPostDetailQuery } from '@/hooks/posts/queries/usePostDetailQuery';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useState } from 'react';
import { queryKeys } from '@/constants/query-keys';

const DAY_OPTIONS = [
  { label: '최근 7일', value: 7 },
  { label: '최근 30일', value: 30 },
  { label: '최근 90일', value: 90 },
];

const DataCenterDetail = ({ postId }: { postId: number }) => {
  const { data: postDetail } = useGetPostDetailQuery(postId);
  const postDetailData = postDetail?.data;

  const [selectedDay, setSelectedDay] = useState(7);
  const [isOpenDayDropdown, setIsOpenDayDropdown] = useState(false);
  const { data: dataCenterDetailData } = useDaterCenterDetail(postId, selectedDay);

  const queryClient = useQueryClient();

  const titleStyleClass = 'text-Dark-Gray text-body-01 font-semibold';

  // 현재 선택된 날짜의 라벨 찾기 (7 -> "최근 7일") - Chip에 표시할 텍스트를 위해 계산
  const currentDayLabel = DAY_OPTIONS.find(opt => opt.value === selectedDay)?.label;

  return (
    <main className="flex flex-col gap-y-10">
      <h1 className="text-black text-subtitle-01 font-semibold">{postDetailData?.title}</h1>
      <div className="flex flex-row justify-between items-center">
        <span>
          <h2 className={titleStyleClass}>피드백 데이터 센터</h2>
          <p className="text-Light-Gray text-caption-01 font-medium">
            사용자 피드백을 한눈에 분석하고 관리하세요
          </p>
        </span>
        <span className="flex gap-x-2">
          <Chip
            value={String(selectedDay)}
            variant="solid"
            size="lg"
            onClick={() => {
              setIsOpenDayDropdown(!isOpenDayDropdown);
            }}
            showArrowIcon={true}
          >
            {currentDayLabel}
          </Chip>
          {isOpenDayDropdown && (
            <div className="absolute top-full mt-2 w-32 bg-white border rounded shadow-lg z-10 flex flex-col">
              {DAY_OPTIONS.map(option => (
                <button
                  key={option.value}
                  className={`p-2 text-left hover:bg-gray-100 ${
                    selectedDay === option.value ? 'font-bold text-blue-600' : ''
                  }`}
                  onClick={() => {
                    setSelectedDay(option.value);
                    queryClient.invalidateQueries({
                      queryKey: queryKeys.dataCenter.detail(postId, selectedDay),
                    });
                    setIsOpenDayDropdown(false); // 선택 후 드롭다운 닫기
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
          <Chip>
            리포트 다운로드
            <Image src="/icons/download.svg" alt="download" width={24} height={24} />
          </Chip>
        </span>
      </div>
      <div className="flex flex-col gap-y-[14px]">
        <h2 className={titleStyleClass}>요약</h2>
        <div className="flex items-center gap-x-[14px]">
          <div className="shadow-card p-[14px]"></div>
        </div>
      </div>
    </main>
  );
};

export default DataCenterDetail;
