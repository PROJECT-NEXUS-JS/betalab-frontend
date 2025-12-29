import { z } from 'zod';
import { BaseModelSchema } from '@/types/models/base-model';
import { CategorySchema, ScheduleSchema, RewardSchema } from './postDetail';
import { ParticipationStatusEnum } from './postDetail';

// 사용자 스키마
const userSchema = z
  .object({
    id: z.number(),
    nickname: z.string(),
    profileUrl: z.string(),
  })
  .strict();

// 요구사항 스키마
const requirementSchema = z
  .object({
    maxParticipants: z.number(),
    genderRequirement: z.string().nullable(),
    ageMin: z.number().nullable(),
    ageMax: z.number().nullable(),
    additionalRequirements: z.string().nullable(),
    screenerQuestions: z.array(z.string()).optional(),
  })
  .strict();

// 피드백 스키마
const feedbackSchema = z
  .object({
    feedbackMethod: z.string().nullable(),
    feedbackItems: z.array(z.string()).nullable(),
    privacyItems: z.array(z.enum(['NAME', 'EMAIL', 'CONTACT', 'OTHER'])),
    privacyPurpose: z.string().nullable().optional(),
  })
  .strict();

// 콘텐츠 스키마
const contentSchema = z
  .object({
    participationMethod: z.string().nullable(),
    storyGuide: z.string().nullable(),
    mediaUrls: z.array(z.string()).nullable(),
  })
  .strict();

// 게시글 스키마
const postSchema = z
  .object({
    id: z.number(),
    title: z.string(),
    serviceSummary: z.string(),
    creatorIntroduction: z.string(),
    creatorProfileUrl: z.string().nullable(),
    description: z.string(),
    thumbnailUrl: z.string().nullable(),
    mainCategories: z.array(CategorySchema),
    platformCategories: z.array(CategorySchema),
    genreCategories: z.array(CategorySchema),
    status: z.enum(['DRAFT', 'ACTIVE', 'INACTIVE', 'COMPLETED', 'CANCELLED', 'EXPIRED']),
    qnaMethod: z.string(),
    likeCount: z.number(),
    viewCount: z.number(),
    currentParticipants: z.number(),
    schedule: ScheduleSchema,
    requirement: requirementSchema,
    reward: RewardSchema.nullable(),
    feedback: feedbackSchema,
    content: contentSchema,
    createdAt: z.string(),
    createdBy: z.number(),
    isLiked: z.boolean(),
    isParticipated: z.boolean(),
  })
  .strict();

// 신청 내역 아이템 스키마
const applicationItemSchema = z
  .object({
    id: z.number(),
    appliedAt: z.string(),
    approvedAt: z.string().nullable(),
    completedAt: z.string().nullable(),
    paidAt: z.string().nullable(),
    status: ParticipationStatusEnum,
    isPaid: z.boolean(),
    applicantName: z.string(),
    contactNumber: z.string(),
    applicantEmail: z.string(),
    applicationReason: z.string(),
    postId: z.number().optional(),
    post: postSchema.optional(),
    user: userSchema,
  })
  .strict();

export type ApplicationItemType = z.infer<typeof applicationItemSchema>;

// 정렬 스키마
const sortSchema = z
  .object({
    sorted: z.boolean(),
    empty: z.boolean(),
    unsorted: z.boolean(),
  })
  .strict();

// 페이지네이션 스키마
const pageableSchema = z
  .object({
    paged: z.boolean(),
    pageNumber: z.number(),
    pageSize: z.number(),
    offset: z.number(),
    sort: sortSchema,
    unpaged: z.boolean(),
  })
  .strict();

// 페이지 스키마
const pageSchema = z
  .object({
    totalElements: z.number(),
    totalPages: z.number(),
    pageable: pageableSchema,
    size: z.number(),
    content: z.array(applicationItemSchema),
    number: z.number(),
    sort: sortSchema,
    numberOfElements: z.number(),
    first: z.boolean(),
    last: z.boolean(),
    empty: z.boolean(),
  })
  .strict();

export type PageType = z.infer<typeof pageSchema>;

// 내 신청 내역 조회 요청 스키마
export const getMyApplicationsRequestSchema = z
  .object({
    status: ParticipationStatusEnum.optional(),
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
