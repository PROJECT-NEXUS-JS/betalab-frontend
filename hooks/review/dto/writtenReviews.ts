import { z } from 'zod';
import { BaseModelSchema } from '@/types/models/base-model';

// 작성한 리뷰 아이템 스키마
const writtenReviewItemSchema = z
  .object({
    reviewId: z.number(),
    postId: z.number(),
    postTitle: z.string(),
    postThumbnail: z.string().nullable(),
    category: z.string(),
    rating: z.number(),
    content: z.string(),
    reviewCreatedAt: z.coerce.date().transform(date =>
      date
        .toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
        .replace(/\. /g, '/')
        .replace('.', ''),
    ),
    reviewUpdatedAt: z.coerce.date().transform(date =>
      date
        .toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
        .replace(/\. /g, '/')
        .replace('.', ''),
    ),
    canEdit: z.boolean(),
  })
  .strict();

export type WrittenReviewItemType = z.infer<typeof writtenReviewItemSchema>;

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
    content: z.array(writtenReviewItemSchema),
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

// 작성한 리뷰 목록 조회 요청 스키마
export const getWrittenReviewsRequestSchema = z
  .object({
    page: z.number().int().nonnegative().optional(),
    size: z.number().int().positive().optional(),
    sort: z.array(z.string()).optional(),
  })
  .strict();

export type GetWrittenReviewsRequestType = z.infer<typeof getWrittenReviewsRequestSchema>;

// 작성한 리뷰 목록 응답 스키마
export const getWrittenReviewsResponseSchema = BaseModelSchema(pageSchema);

export type GetWrittenReviewsResponseType = z.infer<typeof getWrittenReviewsResponseSchema>;
export type GetWrittenReviewsDataType = z.infer<typeof pageSchema> | undefined;

// 리뷰 삭제 응답 스키마
const deleteReviewResponseSchema = z.object({
  success: z.boolean(),
  code: z.string(),
  message: z.string(),
  data: z.record(z.string(), z.any()),
});

export type DeleteReviewResponseType = z.infer<typeof deleteReviewResponseSchema>;

// 리뷰 수정 요청 스키마
const updateReviewRequestSchema = z.object({
  rating: z.number(),
  content: z.string(),
});

export type UpdateReviewRequestType = z.infer<typeof updateReviewRequestSchema>;

// 리뷰 수정 응답 스키마
const updateReviewResponseSchema = z.object({
  success: z.boolean(),
  code: z.string(),
  message: z.string(),
  data: z.object({
    id: z.number(),
    postId: z.number(),
    rating: z.number(),
    content: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    writer: z.object({
      id: z.number(),
      nickname: z.string(),
      profileUrl: z.string(),
    }),
  }),
});

export type UpdateReviewResponseType = z.infer<typeof updateReviewResponseSchema>;
