import { z } from "zod";

export const SimilarPostSchema = z.object({
  id: z.number(),
  thumbnailUrl: z.string(),
  categories: z.string(),
  title: z.string(),
  oneLineIntro: z.string(),
  rewardProvided: z.boolean(),
  durationType: z.string(),
});

export type SimilarPost = z.infer<typeof SimilarPostSchema>;