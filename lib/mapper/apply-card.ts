import { RightSidebarModel } from '@/hooks/posts/dto/postRightSidebar';
import { ConditionProps } from '@/components/common/atoms/Condition';
import { ApplyCardDataProps } from '@/components/common/molecules/ApplyCard';
import { ParticipationStatusType } from '@/hooks/posts/dto/postDetail';

// RightSidebarModel을 ApplyCardProps로 변환하는 함수
export const transformToApplyCardProps = (
  data: RightSidebarModel,
  participationStatus: ParticipationStatusType,
): ApplyCardDataProps => {
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

  const transformedData: ApplyCardDataProps = {
    title: data.testName,
    profile: {
      name: data.recruiterName,
      affiliation: data.recruiterAffiliation,
      imageUrl: data.profileUrl,
    },
    description: data.testSummary,
    endDate: new Date(new Date().getTime() + data.daysRemaining * 24 * 60 * 60 * 1000),
    scrapedNumber: data.scrapCount,
    conditions: conditions,
    attendees: data.currentParticipants,
    scraped: false,
    participationStatus,
  };

  return transformedData;
};
