'use client';

import { useState } from 'react';

import Image from 'next/image';

import { instance } from '@/apis/instance';

import useGetDaterCenterDetailQuery from '@/hooks/data-center/queries/useGetDaterCenterDetailQuery';
import { useGetPostDetailQuery } from '@/hooks/posts/queries/usePostDetailQuery';

import Chip from '@/components/common/atoms/Chip';

import SummaryCard from './SummaryCard';
import BugOccurCard from './BugOccurCard';
import GoodAndInsightSection from './FeedbackSection/FeedbackSection';
import InsightSection from './InsightSection';
import FeedbackSection from './FeedbackSection/FeedbackSection';

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
  // const { data: dataCenterDetail } = useGetDaterCenterDetailQuery(postId, selectedDay);

  // 목데이터
  const dataCenterDetail = {
    // 1. 요약 정보 (대시보드 상단 카드)
    summary: {
      totalParticipants: 5200,
      participantChangeRate: -14.2, // 감소 추세
      thisWeekParticipants: 156,
      averageSatisfaction: 4.2,
      satisfactionChangeRate: 14.2, // 증가 추세
      bugOccurrenceRate: 32,
      bugRateChangeRate: 14.2, // 증가 추세 (부정적)
      totalFeedbacks: 400,
      bugCount: 128,
      positiveFeedbackRate: 78,
      positiveFeedbackChangeRate: 14.2,
      positiveFeedbackCount: 312,
    },

    // 2. 전체 평가 지표 (방사형 차트나 바 차트용)
    overallEvaluation: {
      averageSatisfaction: 4.2,
      averageRecommendation: 3.8,
      averageReuse: 4.5,
      satisfactionDistribution: {
        '5점': 45,
        '4점': 30,
        '3점': 15,
        '2점': 5,
        '1점': 5,
      },
      recommendationDistribution: {
        '5점': 40,
        '4점': 35,
        '3점': 15,
        '2점': 5,
        '1점': 5,
      },
      reuseDistribution: {
        '5점': 60,
        '4점': 25,
        '3점': 10,
        '2점': 3,
        '1점': 2,
      },
    },

    // 3. 품질 피드백 (버그 및 불편 사항)
    qualityFeedback: {
      topInconvenientElements: {
        '결제 프로세스': 42,
        '회원가입 절차': 28,
        '이미지 로딩 속도': 15,
        '검색 결과 정확도': 10,
        기타: 5,
      },
      bugExistenceRate: 32,
      bugExistCount: 128,
      noBugCount: 272,
      satisfactionScoreDistribution: {
        상: 50,
        중: 30,
        하: 20,
      },
      problemTypeProportions: {
        'UI/UX 디자인': 40,
        '기능 오류': 35,
        '성능 이슈': 15,
        '네트워크/서버': 10,
      },
      topProblemLocations: [
        {
          location: '메인 홈 > 배너',
          problemType: '이미지 엑박',
          reportCount: 45,
        },
        {
          location: '마이페이지 > 설정',
          problemType: '저장 버튼 미작동',
          reportCount: 32,
        },
        {
          location: '상품 상세 페이지',
          problemType: '옵션 선택 불가',
          reportCount: 21,
        },
      ],
      screenshotPreviews: [
        'https://placehold.co/600x400/png?text=Bug+Screenshot+1',
        'https://placehold.co/600x400/png?text=Bug+Screenshot+2',
        'https://placehold.co/600x400/png?text=Bug+Screenshot+3',
      ],
    },

    // 4. 사용성 평가 점수 (5점 만점 혹은 100점 만점 기준)
    usabilityEvaluation: {
      functionalityScore: 85, // 기능성
      comprehensibilityScore: 72, // 이해 용이성
      loadingSpeedScore: 64, // 로딩 속도
      responseTimingScore: 90, // 반응 속도
      stabilityScore: 78, // 안정성
    },

    // 5. 인사이트 (AI 요약 등)
    insights: {
      positiveFeedbacks: [
        {
          feedbackId: 101,
          summary: '직관적인 인터페이스',
          fullContent: '이전 버전보다 메뉴 찾기가 훨씬 쉬워졌어요. 디자인이 깔끔합니다.',
          emoji: '🥰',
        },
        {
          feedbackId: 102,
          summary: '빠른 고객 응대',
          fullContent: '문의사항을 남겼는데 10분 만에 답변이 와서 놀랐습니다.',
          emoji: '⚡️',
        },
        {
          feedbackId: 103,
          summary: '다크모드 지원',
          fullContent: '눈이 편안해서 밤에 쓰기 좋아요.',
          emoji: '🌙',
        },
      ],
      improvementSuggestions: [
        {
          feedbackId: 201,
          summary: '폰트 크기 조절 필요',
          fullContent: '어르신들이 쓰기에는 글씨가 너무 작아 보입니다.',
          emoji: '🔍',
        },
        {
          feedbackId: 202,
          summary: '검색 필터 세분화',
          fullContent: '가격대별로만 볼 게 아니라 색상별 필터도 있으면 좋겠어요.',
          emoji: '🎨',
        },
      ],
      keywords: {
        깔끔함: 150,
        빠름: 120,
        복잡함: 80,
        오류: 45,
        친절함: 40,
        가독성: 35,
      },
    },
  };

  const titleStyleClass = 'text-Dark-Gray text-body-01 font-semibold';
  const sectionStyleClass = 'flex flex-col gap-y-[14px]';

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
      <section className="flex flex-row justify-between items-center">
        <div>
          <h2 className={titleStyleClass}>피드백 데이터 센터</h2>
          <p className="text-Light-Gray text-caption-01 font-medium">
            사용자 피드백을 한눈에 분석하고 관리하세요
          </p>
        </div>
        <div className="flex gap-x-2">
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
              <Image src="/icons/admin-icom/download.svg" alt="download" width={24} height={24} />
            </div>
          </Chip>
        </div>
      </section>

      <section className={sectionStyleClass}>
        <h2 className={titleStyleClass}>요약</h2>
        <div className="flex items-center gap-x-[14px]">
          {/* 카드 1: 총 참여자 수 */}
          <SummaryCard
            title="총 참여자 수"
            value={`${dataCenterDetail?.summary.totalParticipants.toLocaleString()}명`}
            changeRate={dataCenterDetail?.summary.participantChangeRate ?? 0}
            subTextNode={
              <span className="flex items-center gap-1">
                이번주 {dataCenterDetail?.summary.thisWeekParticipants.toLocaleString()}명
                <Image
                  src={'/icons/admin-icon/triangle.svg'}
                  alt={'up icon'}
                  width={16}
                  height={16}
                  className="text-Light-Gray"
                />
              </span>
            }
          />
          {/* 카드 2: 평균 전체 만족도 */}
          <SummaryCard
            title="평균 전체 만족도"
            value={dataCenterDetail?.summary.averageSatisfaction ?? 0}
            changeRate={dataCenterDetail?.summary.satisfactionChangeRate ?? 0}
            subTextNode="5점 만점"
          />
          {/* 카드 3: 버그 발생률 */}
          <SummaryCard
            title="버그 발생률"
            value={`${dataCenterDetail?.summary.bugOccurrenceRate}%`}
            changeRate={dataCenterDetail?.summary.bugRateChangeRate ?? 0}
            subTextNode={`${dataCenterDetail?.summary.totalFeedbacks}건 중 ${dataCenterDetail?.summary.bugCount}건`}
          />
          {/* 카드 4: 긍정 피드백 비율 */}
          <SummaryCard
            title="긍정 피드백 비율"
            value={`${dataCenterDetail?.summary.positiveFeedbackRate}%`}
            changeRate={dataCenterDetail?.summary.positiveFeedbackChangeRate ?? 0}
            subTextNode="만족도 4점 이상"
          />
        </div>
        <div className="flex gap-x-[14px] items-center">
          <span></span>
          <span></span>
        </div>
      </section>

      <section className={sectionStyleClass}>
        <h2 className={titleStyleClass}>주요 문제 발생 위치</h2>
        <div className="grid">
          <div className="grid grid-cols-2 gap-[14px]">
            {dataCenterDetail?.qualityFeedback.topProblemLocations.map((problem, index) => (
              <BugOccurCard
                key={index}
                location={problem.location}
                problemType={problem.problemType}
                reportCount={problem.reportCount}
              />
            ))}
          </div>
        </div>
      </section>

      <InsightSection keywords={dataCenterDetail?.insights.keywords} />

      <FeedbackSection
        positiveFeedbacks={dataCenterDetail?.insights.positiveFeedbacks}
        improvementSuggestions={dataCenterDetail?.insights.improvementSuggestions}
      />
    </main>
  );
};

export default DataCenterDetail;
