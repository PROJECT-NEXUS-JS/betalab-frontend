import { z } from 'zod';
import { BaseModelSchema } from '@/types/models/base-model';
import { categorySchema, scheduleSchema, rewardSchema } from '@/types/models/testCard';

// 신청 상태 enum
const applicationStatusSchema = z.enum(['PENDING', 'APPROVED', 'REJECTED']);

// 요구사항 스키마
const requirementSchema = z
  .object({
    maxParticipants: z.number(),
    genderRequirement: z.string(),
    ageMin: z.number(),
    ageMax: z.number(),
    additionalRequirements: z.string(),
  })
  .strict();

// 피드백 스키마
const feedbackSchema = z
  .object({
    feedbackMethod: z.string(),
    feedbackItems: z.array(z.string()),
    privacyItems: z.array(z.enum(['NAME', 'EMAIL', 'PHONE'])),
  })
  .strict();

// 콘텐츠 스키마
const contentSchema = z
  .object({
    participationMethod: z.string(),
    storyGuide: z.string(),
    mediaUrl: z.string(),
  })
  .strict();

// 테스트 게시글 스키마 (TestCardType과 동일한 구조)
const postSchema = z
  .object({
    id: z.number(),
    title: z.string(),
    serviceSummary: z.string(),
    creatorIntroduction: z.string(),
    creatorProfileUrl: z.string(),
    description: z.string(),
    thumbnailUrl: z.string().nullable(),
    mainCategories: z.array(categorySchema),
    platformCategories: z.array(categorySchema),
    genreCategories: z.array(categorySchema),
    status: z.enum(['DRAFT', 'PUBLISHED', 'CLOSED']),
    qnaMethod: z.string(),
    likeCount: z.number(),
    viewCount: z.number(),
    currentParticipants: z.number(),
    schedule: scheduleSchema,
    requirement: requirementSchema,
    reward: rewardSchema,
    feedback: feedbackSchema,
    content: contentSchema,
    createdAt: z.string(),
    createdBy: z.number(),
    isLiked: z.boolean(),
    isParticipated: z.boolean(),
  })
  .strict();

// 사용자 스키마
const userSchema = z
  .object({
    id: z.number(),
    nickname: z.string(),
    profileUrl: z.string(),
  })
  .strict();

// 신청 내역 아이템 스키마
const applicationItemSchema = z
  .object({
    id: z.number(),
    appliedAt: z.string(),
    approvedAt: z.string().nullable(),
    status: applicationStatusSchema,
    applicantName: z.string(),
    contactNumber: z.string(),
    applicantEmail: z.string(),
    applicationReason: z.string(),
    post: postSchema,
    user: userSchema,
  })
  .strict();

export type ApplicationItemType = z.infer<typeof applicationItemSchema>;

// 페이지네이션 메타 스키마
const pageableMetaSchema = z
  .object({
    empty: z.boolean(),
    sorted: z.boolean(),
    unsorted: z.boolean(),
  })
  .strict();

// 페이지 스키마
const pageSchema = z
  .object({
    totalElements: z.number(),
    totalPages: z.number(),
    size: z.number(),
    content: z.array(applicationItemSchema),
    number: z.number(),
    sort: pageableMetaSchema,
    numberOfElements: z.number(),
    pageable: z
      .object({
        offset: z.number(),
        sort: pageableMetaSchema,
        paged: z.boolean(),
        pageNumber: z.number(),
        pageSize: z.number(),
        unpaged: z.boolean(),
      })
      .strict(),
    last: z.boolean(),
    first: z.boolean(),
    empty: z.boolean(),
  })
  .strict();

export type PageType = z.infer<typeof pageSchema>;

// 내 신청 내역 조회 요청 스키마
export const getMyApplicationsRequestSchema = z
  .object({
    page: z.number().int().nonnegative().optional(),
    size: z.number().int().positive().optional(),
    sort: z.array(z.string()).optional(),
  })
  .strict();

export type GetMyApplicationsRequestType = z.infer<typeof getMyApplicationsRequestSchema>;

// 내 신청 내역 응답 스키마
export const getMyApplicationsResponseSchema = BaseModelSchema(pageSchema);

export type GetMyApplicationsResponseType = z.infer<typeof getMyApplicationsResponseSchema>;
export type GetMyApplicationsDataType = z.infer<typeof pageSchema> | undefined;
