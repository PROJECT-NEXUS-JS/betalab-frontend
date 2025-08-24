import { z } from 'zod';

export const RightSidebarSchema = z.object({
  testName: z.string(),
  recruiterName: z.string(),
  testSummary: z.string(),
  daysRemaining: z.number().int().min(0),
  scrapCount: z.number().int().min(0),
  currentParticipants: z.number().int().min(0),
  participationTarget: z.string(),
  requiredDuration: z.string(),
  rewardInfo: z.string(),
  participationMethod: z.string(),
  qnaMethod: z.string(),
});

export type RightSidebarModel = z.infer<typeof RightSidebarSchema>;
