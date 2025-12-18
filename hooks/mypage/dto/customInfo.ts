import { z } from 'zod';

// Request DTO - 맞춤 정보 수정
export const UpdateCustomInfoRequestSchema = z.object({
  job: z.string(),
  birthYear: z.string(),
  gender: z.string(),
  interests: z.array(z.string()),
  preferredGenres: z.array(z.string()),
});

export type UpdateCustomInfoRequestType = z.infer<typeof UpdateCustomInfoRequestSchema>;

export const UpdateCustomInfoResponseSchema = z.object({
  success: z.boolean(),
  code: z.string(),
  message: z.string(),
  data: z.object({
    nickname: z.string(),
    profileUrl: z.string(),
    email: z.string(),
    phoneNumber: z.string(),
    connectedAccount: z.string(),
    job: z.string(),
    birthYear: z.string(),
    gender: z.string(),
    interests: z.array(z.string()),
    preferredGenres: z.array(z.string()),
  }),
});

export type UpdateCustomInfoResponseType = z.infer<typeof UpdateCustomInfoResponseSchema>;
