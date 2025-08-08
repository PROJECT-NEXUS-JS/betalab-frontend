import { z } from 'zod';

export const UserProfileSchema = z.object({
  job: z.string(),
  interests: z.array(z.string()),
});

export type UserProfileModel = z.infer<typeof UserProfileSchema>;
