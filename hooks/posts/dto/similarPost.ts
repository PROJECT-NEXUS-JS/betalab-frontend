import { z } from 'zod';

export const SimilarPostSchema = z.object({
  id: z.number(),
  thumbnailUrl: z.string().nullable(),
  categories: z.string(),
  title: z.string(),
  oneLineIntro: z.string().nullable(),
  rewardProvided: z.boolean(),
  durationType: z.string(),
});

export type SimilarPost = z.infer<typeof SimilarPostSchema>;
