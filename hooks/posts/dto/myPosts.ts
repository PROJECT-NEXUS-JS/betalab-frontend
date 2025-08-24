import { z } from 'zod';
import { BaseModelSchema } from '@/types/models/base-model';
import { categorySchema } from '@/types/models/testCard';

// 내 게시글 조회 요청 스키마
export const getMyPostsRequestSchema = z
  .object({
    page: z.number().int().nonnegative().optional(),
    size: z.number().int().positive().optional(),
    sort: z.array(z.string()).optional(),
  })
  .strict();

export type GetMyPostsRequestType = z.infer<typeof getMyPostsRequestSchema>;

// 내 게시글 아이템 스키마 (실제 API 응답과 정확히 일치)
const myPostSchema = z
  .object({
    id: z.number(),
    title: z.string(),
    serviceSummary: z.string(),
    thumbnailUrl: z.string().nullable(),
    mainCategories: z.array(categorySchema),
    platformCategories: z.array(categorySchema),
    genreCategories: z.array(categorySchema),
  })
  .strict();

export type MyPostType = z.infer<typeof myPostSchema>;

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
    content: z.array(myPostSchema),
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

export const getMyPostsResponseSchema = BaseModelSchema(pageSchema);

export type GetMyPostsResponseType = z.infer<typeof getMyPostsResponseSchema>;
export type GetMyPostsDataType = z.infer<typeof pageSchema> | undefined;
