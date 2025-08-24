import { z } from 'zod';
import { BaseModelSchema } from '@/types/models/base-model';

// API 응답 구조에 맞는 RecentlyViewedTestDto
const recentlyViewedTestSchema = z
  .object({
    postId: z.number(),
    category: z.string(),
    title: z.string(),
    oneLineIntro: z.string(),
    tags: z.array(z.string()),
    viewedAt: z.string(),
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
