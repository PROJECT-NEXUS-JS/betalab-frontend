import { z } from 'zod';

export const StatisticsResponseSchema = z.object({
  success: z.boolean(),
  code: z.string(),
  message: z.string(),
  data: z.object({
    pendingCount: z.number(),
    approvedCount: z.number(),
    feedbackCompletedCount: z.number(),
    testCompletedCount: z.number(),
    paidCount: z.number(),
    rejectedCount: z.number(),
    totalCount: z.number(),
  }),
});

export type StatisticsResponseType = z.infer<typeof StatisticsResponseSchema>;
export type StatisticsDataType = StatisticsResponseType['data'];

