import { z } from 'zod';
import { BaseModelSchema } from '@/types/models/base-model';
import { categorySchema, scheduleSchema, rewardSchema } from '@/types/models/testCard';

const recentlyViewedTestSchema = z
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
  })
  .strict();

export type RecentlyViewedTestType = z.infer<typeof recentlyViewedTestSchema>;

const dashboardDataSchema = z
  .object({
    recentlyViewedTests: z.array(recentlyViewedTestSchema),
  })
  .strict();

export type DashboardDataType = z.infer<typeof dashboardDataSchema>;

export const getDashboardResponseSchema = BaseModelSchema(dashboardDataSchema);
export type GetDashboardResponseType = z.infer<typeof getDashboardResponseSchema>;
export type GetDashboardDataType = z.infer<typeof dashboardDataSchema> | undefined;
