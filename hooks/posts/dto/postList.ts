import { z } from 'zod';
import { BaseModelSchema } from '@/types/models/base-model';
import { categorySchema, scheduleSchema, rewardSchema } from '@/types/models/testCard';

export const getUsersPostsListRequestSchema = z
  .object({
    mainCategory: z.string().optional(),
    platformCategory: z.string().optional(),
    genreCategory: z.string().optional(),
    keyword: z.string().optional(),
    sortBy: z.enum(['latest', 'popular', 'deadline', 'viewCount']).optional(),
    page: z.number().int().nonnegative().optional(),
    size: z.number().int().positive().optional(),
    sort: z.array(z.string()).optional(),
    daysRemaining: z.number().int().positive().optional(),
  })
  .strict();

export type GetUsersPostsListRequestType = z.infer<typeof getUsersPostsListRequestSchema>;

const pageableMetaSchema = z
  .object({
    empty: z.boolean(),
    sorted: z.boolean(),
    unsorted: z.boolean(),
  })
  .strict();

const postSummarySchema = z
  .object({
    id: z.number(),
    title: z.string(),
    serviceSummary: z.string(),
    thumbnailUrl: z.string().nullable(),
    mainCategories: z.array(categorySchema),
    platformCategories: z.array(categorySchema),
    genreCategories: z.array(categorySchema),
    schedule: scheduleSchema.optional(),
    reward: rewardSchema.optional(),
    hasReward: z.boolean().optional(),
  })
  .strict();

export type UsersPostsListItemType = z.infer<typeof postSummarySchema>;

const pageSchema = z
  .object({
    totalElements: z.number(),
    totalPages: z.number(),
    size: z.number(),
    content: z.array(postSummarySchema),
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

export const getUsersPostsListResponseSchema = BaseModelSchema(pageSchema);

export type GetUsersPostsListResponseType = z.infer<typeof getUsersPostsListResponseSchema>;
export type GetUsersPostsListDataType = z.infer<typeof pageSchema> | undefined;
