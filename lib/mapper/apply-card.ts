import { RightSidebarModel } from '@/hooks/posts/dto/postRightSidebar';
import { ConditionProps } from '@/components/common/atoms/Condition';
import { ApplyCardProps } from '@/components/common/molecules/ApplyCard';

// RightSidebarModel을 ApplyCardProps로 변환하는 함수
export const transformToApplyCardProps = (
  data: RightSidebarModel,
): Omit<ApplyCardProps, 'scrapClicked' | 'registerClicked'> => {
  const conditions: ConditionProps[] = [
    {
      style: 'reward',
      texts: [data.rewardInfo],
    },
    {
      style: 'date',
      texts: [`남은 기간: ${data.daysRemaining}일`, `기간: ${data.requiredDuration}`],
    },
    {
      style: 'route',
      texts: [data.participationMethod],
    },
    {
      style: 'user condition',
      texts: [data.participationTarget],
    },
    {
      style: 'qna',
      texts: [data.qnaMethod],
    },
  ];

  const transformedData: Omit<ApplyCardProps, 'scrapClicked' | 'registerClicked'> = {
    title: data.testName,
    profile: {
      name: data.recruiterName,
      affiliation: '소속 예시', // API에 없는 데이터는 임의로 처리
      imageUrl: 'https://example.com/image.jpg', // API에 없는 데이터는 임의로 처리
    },
    description: data.testSummary,
    endDate: new Date(new Date().getTime() + data.daysRemaining * 24 * 60 * 60 * 1000),
    scrapedNumber: data.scrapCount,
    conditions: conditions,
    attendees: data.currentParticipants,
    scraped: false,
  };

  return transformedData;
};
