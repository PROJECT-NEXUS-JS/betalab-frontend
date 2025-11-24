import { z } from 'zod';

export const UserProfileSchema = z.object({
  job: z.string(),
  interests: z.array(z.string()),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']).optional(),
  birthDate: z.string().optional(),
});

export type UserProfileModel = z.infer<typeof UserProfileSchema>;
