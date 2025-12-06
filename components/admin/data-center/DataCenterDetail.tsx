'use client';

import Chip from '@/components/common/atoms/Chip';
import useGetDaterCenterDetailQuery from '@/hooks/data-center/queries/useGetDaterCenterDetailQuery';
import { useGetPostDetailQuery } from '@/hooks/posts/queries/usePostDetailQuery';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useState } from 'react';
import { instance } from '@/apis/instance';

const DAY_OPTIONS = [
  { label: '최근 7일', value: 7 },
  { label: '최근 30일', value: 30 },
  { label: '최근 90일', value: 90 },
];

const DataCenterDetail = ({ postId }: { postId: number }) => {
  const { data: postDetail } = useGetPostDetailQuery(postId);
  const postDetailData = postDetail?.data;

  const [selectedDay, setSelectedDay] = useState(7);
  const [isDayDropdownOpen, setIsDayDropdownOpen] = useState(false);
  const { data: dataCenterDetailData } = useGetDaterCenterDetailQuery(postId, selectedDay);

  const queryClient = useQueryClient();

  const titleStyleClass = 'text-Dark-Gray text-body-01 font-semibold';

  // 현재 선택된 날짜의 라벨 찾기 (7 -> "최근 7일") - Chip에 표시할 텍스트를 위해 계산
  const currentDayLabel = DAY_OPTIONS.find(opt => opt.value === selectedDay)?.label;

  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);

      // API 호출하여 Blob 데이터 받기
      const response = await instance.get(`v1/data-center/${postId}/report/pdf`, {
        params: { selectedDay },
        responseType: 'blob', // 바이너리 데이터로 받음
      });

      // 브라우저 메모리에 가상 URL 생성
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // 가상의 <a> 태그를 만들어 클릭 이벤트 트리거
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `report_${postId}_${selectedDay}days.pdf`);
      document.body.appendChild(link);
      link.click();

      // 메모리 해제 및 태그 삭제
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('PDF 다운로드 실패:', error);
    } finally {
      setIsDownloading(false);
    }
  };

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
          {/* Day 필터 */}
          <div className="relative">
            {/* 드롭다운 트리거 버튼 */}
            <Chip
              variant="solid"
              showArrowIcon={true}
              size="lg"
              onClick={() => {
                setIsDayDropdownOpen(prev => !prev);
              }}
              value={String(selectedDay)}
              active={isDayDropdownOpen}
            >
              {currentDayLabel}
            </Chip>
            {isDayDropdownOpen && (
              <div className="absolute shadow-card right-0 mt-[9px] w-[108px] bg-white rounded-sm flex flex-col">
                {DAY_OPTIONS.map(option => (
                  <button
                    key={option.value}
                    className={`p-2 text-[10px] hover:bg-Gray-50 cursor-pointer text-left text-Dark-Gray ${
                      selectedDay === option.value && 'font-bold'
                    }`}
                    onClick={() => {
                      setSelectedDay(option.value);
                      setIsDayDropdownOpen(false); // 선택 후 드롭다운 닫기
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <Chip showArrowIcon={false}>
            <div className="cursor-pointer flex items-center" onClick={handleDownload}>
              {isDownloading ? '다운로드 중...' : '리포트 다운로드'}
              <Image src="/icons/download.svg" alt="download" width={24} height={24} />
            </div>
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
