import { z } from 'zod';
import { BaseModelSchema } from '@/types/models/base-model';

// 작성 가능한 리뷰 아이템 스키마
const writableReviewItemSchema = z
  .object({
    postId: z.number(),
    postTitle: z.string(),
    postThumbnail: z.string().nullable(),
    category: z.string(),
    approvedAt: z.string(),
    canWriteReview: z.boolean(),
  })
  .strict();

export type WritableReviewItemType = z.infer<typeof writableReviewItemSchema>;

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
    content: z.array(writableReviewItemSchema),
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

// 작성 가능한 리뷰 목록 조회 요청 스키마
export const getMyWritableReviewsRequestSchema = z
  .object({
    page: z.number().int().nonnegative().optional(),
    size: z.number().int().positive().optional(),
    sort: z.array(z.string()).optional(),
  })
  .strict();

export type GetMyWritableReviewsRequestType = z.infer<typeof getMyWritableReviewsRequestSchema>;

// 작성 가능한 리뷰 목록 응답 스키마
export const getMyWritableReviewsResponseSchema = BaseModelSchema(pageSchema);

export type GetMyWritableReviewsResponseType = z.infer<typeof getMyWritableReviewsResponseSchema>;
export type GetMyWritableReviewsDataType = z.infer<typeof pageSchema> | undefined;
