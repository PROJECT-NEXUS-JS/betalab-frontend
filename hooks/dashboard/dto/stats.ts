import { z } from 'zod';

const StatsValueSchema = z.object({
  current: z.number().min(0),
  previousDay: z.number().min(0),
  changeAmount: z.number().min(0),
});

export const StatsSchema = z.object({
  likes: StatsValueSchema,
  pendingApplications: StatsValueSchema,
  approvedParticipants: StatsValueSchema,
  reviews: StatsValueSchema,
  views: StatsValueSchema,
  unreadMessages: z.number().min(0),
});

export type StatsModel = z.infer<typeof StatsSchema>;
