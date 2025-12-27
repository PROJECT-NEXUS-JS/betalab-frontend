import { z } from 'zod';
import { BaseModelSchema } from '@/types/models/base-model';
import { CategorySchema, RewardSchema, ScheduleSchema } from './postDetail';

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

// 찜한 테스트 게시글 스키마 (TestCardType과 동일한 구조)
const bookmarkedPostSchema = z
  .object({
    id: z.number(),
    title: z.string(),
    serviceSummary: z.string(),
    creatorIntroduction: z.string(),
    creatorProfileUrl: z.string(),
    description: z.string(),
    thumbnailUrl: z.string().nullable(),
    mainCategories: z.array(CategorySchema),
    platformCategories: z.array(CategorySchema),
    genreCategories: z.array(CategorySchema),
    status: z.enum(['DRAFT', 'PUBLISHED', 'CLOSED']),
    qnaMethod: z.string(),
    likeCount: z.number(),
    viewCount: z.number(),
    currentParticipants: z.number(),
    schedule: ScheduleSchema,
    requirement: requirementSchema,
    reward: RewardSchema,
    feedback: feedbackSchema,
    content: contentSchema,
    createdAt: z.string(),
    createdBy: z.number(),
    isLiked: z.boolean(),
    isParticipated: z.boolean(),
  })
  .strict();

export type BookmarkedPostType = z.infer<typeof bookmarkedPostSchema>;

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
    content: z.array(bookmarkedPostSchema),
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

// 내 찜 목록 조회 요청 스키마
export const getMyBookmarksRequestSchema = z
  .object({
    page: z.number().int().nonnegative().optional(),
    size: z.number().int().positive().optional(),
    sort: z.array(z.string()).optional(),
  })
  .strict();

export type GetMyBookmarksRequestType = z.infer<typeof getMyBookmarksRequestSchema>;

// 내 찜 목록 응답 스키마
export const getMyBookmarksResponseSchema = BaseModelSchema(pageSchema);

export type GetMyBookmarksResponseType = z.infer<typeof getMyBookmarksResponseSchema>;
export type GetMyBookmarksDataType = z.infer<typeof pageSchema> | undefined;
