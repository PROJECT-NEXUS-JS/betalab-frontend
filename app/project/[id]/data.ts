import { ConditionProps } from '@/components/common/atoms/Condition';
import { ProjectDataModel } from '@/hooks/posts/dto/postDetail';
import { ApplyCardProps } from '@/components/common/molecules/ApplyCard';
import { BaseModel } from '@/types/models/base-model';
import { ReviewResponse } from '@/hooks/review/dto';
import { ReviewCardProps } from '@/components/common/molecules/ReviewCard';
import { SimilarPost } from '@/hooks/posts/dto/similarPost';

export const mockProjectData: ProjectDataModel = {
  id: 1,
  title: '더미 프로젝트 제목',
  serviceSummary: '서비스 요약 내용입니다.',
  creatorIntroduction: '창작자 소개 내용입니다.',
  description: '프로젝트 설명입니다. 프로젝트 설명입니다. 프로젝트 설명입니다.',
  thumbnailUrl: undefined,
  mainCategories: [
    { code: 'CAT001', name: '기술' },
    { code: 'CAT002', name: '교육' },
  ],
  platformCategories: [
    { code: 'PLT001', name: '웹' },
    { code: 'PLT002', name: '모바일' },
  ],
  genreCategories: [{ code: 'GEN001', name: '연구' }],
  status: 'ACTIVE',
  qnaMethod: '카카오톡 오픈채팅',
  likeCount: 123,
  viewCount: 4567,
  currentParticipants: 30,
  schedule: {
    startDate: '2025-09-01T00:00:00Z',
    endDate: '2025-09-30T23:59:59Z',
    recruitmentDeadline: '2025-08-31T23:59:59Z',
    durationTime: '1개월',
  },
  requirement: {
    maxParticipants: 50,
    genderRequirement: '무관',
    ageMin: 18,
    ageMax: 65,
    additionalRequirements: '특별한 요구사항 없음',
  },
  reward: {
    rewardType: 'CASH',
    rewardDescription: '참여자에게 현금 5만원 지급',
  },
  feedback: {
    feedbackMethod: '온라인 설문조사',
    feedbackItems: ['사용성', '만족도', '기능 개선점'],
    privacyItems: ['NAME', 'EMAIL'],
  },
  content: {
    participationMethod: '웹사이트에서 신청',
    storyGuide: '참여 스토리 안내 문구입니다.',
    mediaUrl: undefined,
  },
  createdAt: '2025-07-01T12:00:00Z',
  createdBy: 1001,
  isLiked: true,
  isParticipated: false,
};

const conditions: ConditionProps[] = [
  {
    style: 'reward',
    texts: [mockProjectData.reward.rewardDescription], // '참여자에게 현금 5만원 지급'
  },
  {
    style: 'date',
    texts: [
      `시작일: ${new Date(mockProjectData.schedule.startDate).toLocaleDateString()}`,
      `종료일: ${new Date(mockProjectData.schedule.endDate).toLocaleDateString()}`,
      `모집마감: ${new Date(mockProjectData.schedule.recruitmentDeadline).toLocaleDateString()}`,
      `기간: ${mockProjectData.schedule.durationTime}`,
    ],
  },
  {
    style: 'route',
    texts: [mockProjectData.content.participationMethod], // '웹사이트에서 신청'
  },
  {
    style: 'user condition',
    texts: [
      `최대 참여자: ${mockProjectData.requirement.maxParticipants}명`,
      `성별: ${mockProjectData.requirement.genderRequirement}`,
      `연령: ${mockProjectData.requirement.ageMin}세 ~ ${mockProjectData.requirement.ageMax}세`,
      mockProjectData.requirement.additionalRequirements,
    ],
  },
  {
    style: 'qna',
    texts: [mockProjectData.qnaMethod], // '카카오톡 오픈채팅'
  },
];

export const applyCardData: Omit<ApplyCardProps, 'scrapClicked' | 'registerClicked'> = {
  title: mockProjectData.title, // '더미 프로젝트 제목'
  profile: {
    name: '창작자 이름 예시', // mockProjectData.creatorIntroduction에서 따로 빼거나, 별도로 지정 필요
    affiliation: '소속 예시', // 이 정보가 없으면 빈 문자열 또는 추가 데이터 필요
    imageUrl: mockProjectData.thumbnailUrl, // 대표 이미지 URL
  },
  description: mockProjectData.description,
  endDate: new Date(mockProjectData.schedule.endDate), // Date 타입으로 변환 필요
  scrapedNumber: mockProjectData.likeCount, // 좋아요 수를 스크랩 수로 가정
  conditions: conditions, // ConditionProps 배열인데, 별도 매핑/생성 필요 (아래 참고)
  attendees: mockProjectData.currentParticipants,
  scraped: mockProjectData.isLiked,
};

export const mockReviewData: ReviewResponse[] = [
  {
    id: 1,
    postId: 1,
    rating: 5,
    content: '훌륭한 프로젝트입니다!',
    createdAt: new Date('2025-07-01T12:00:00Z'),
    updatedAt: new Date('2025-07-01T12:00:00Z'),
    writer: {
      id: 1001,
      nickname: '사용자1',
      profileUrl: 'https://example.com/user1',
    },
  },
  {
    id: 2,
    postId: 1,
    rating: 4,
    content: '좋은 아이디어지만, 개선이 필요합니다.',
    createdAt: new Date('2025-07-02T12:00:00Z'),
    updatedAt: new Date('2025-07-02T12:00:00Z'),
    writer: {
      id: 1002,
      nickname: '사용자2',
      profileUrl: 'https://example.com/user2',
    },
  },
  {
    id: 3,
    postId: 1,
    rating: 3,
    content: '보통입니다.',
    createdAt: new Date('2025-07-03T12:00:00Z'),
    updatedAt: new Date('2025-07-03T12:00:00Z'),
    writer: {
      id: 1003,
      nickname: '사용자3',
      profileUrl: 'https://example.com/user3',
    },
  },
  {
    id: 4,
    postId: 1,
    rating: 2,
    content: '아쉬운 점이 많았습니다.',
    createdAt: new Date('2025-07-04T12:00:00Z'),
    updatedAt: new Date('2025-07-04T12:00:00Z'),
    writer: {
      id: 1004,
      nickname: '사용자4',
      profileUrl: 'https://example.com/user4',
    },
  },
];

export const reviewCardData: ReviewCardProps[] = mockReviewData.map(review => ({
  id: review.id,
  content: review.content,
  author: {
    name: review.writer.nickname,
    imageUrl: review.writer.profileUrl,
  },
  rating: review.rating,
  date: review.createdAt,
  state: 'default',
}));

export const similarPostData: SimilarPost[] = [
  {
    id: 2,
    thumbnailUrl:
      'https://betalab-storage-250725.s3.ap-northeast-2.amazonaws.com/243a6be9-c704-494a-99db-fd73509f15b4.png',
    categories: 'WEB · AI_AUTOMATION, MARKETING_PROMOTION',
    title: '웹 프로젝트 베타테스터 모집',
    oneLineIntro: 'AI 기반 마케팅 자동화 툴',
    rewardProvided: true,
    durationType: '단기 테스트',
  },

  {
    id: 4,
    thumbnailUrl:
      'https://betalab-storage-250725.s3.ap-northeast-2.amazonaws.com/828c9a2f-1d81-4971-afd5-c221702a76a0.png',
    categories: 'WEB · AI_AUTOMATION, COMMERCE_SHOPPING_WEB',
    title: 'AI 쇼핑 추천 서비스 베타테스터',
    oneLineIntro: '개인 맞춤형 AI 쇼핑 큐레이션 플랫폼',
    rewardProvided: true,
    durationType: '단기 테스트',
  },
  {
    id: 7,
    thumbnailUrl:
      'https://betalab-storage-250725.s3.ap-northeast-2.amazonaws.com/8049e1c7-21b3-49f1-8111-a68df9ca8f5c.png',
    categories: 'WEB · BUSINESS, PRODUCTIVITY_COLLABORATION',
    title: '팀 협업 도구 베타테스터 모집',
    oneLineIntro: '실시간 협업과 프로젝트 관리를 위한 올인원 플랫폼',
    rewardProvided: true,
    durationType: '중기 테스트',
  },
  {
    id: 99999,
    thumbnailUrl:
      'https://betalab-storage-250725.s3.ap-northeast-2.amazonaws.com/828c9a2f-1d81-4971-afd5-c221702a76a0.png',
    categories: 'WEB · AI_AUTOMATION, MARKETING_PROMOTION',
    title: 'AI 기반 마케팅 자동화 툴 베타테스터 모집',
    oneLineIntro: '효율적인 마케팅 캠페인을 위한 AI 도구',
    rewardProvided: true,
    durationType: '단기 테스트',
  },
];
