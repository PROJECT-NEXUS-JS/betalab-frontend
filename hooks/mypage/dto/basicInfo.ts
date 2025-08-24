import { z } from 'zod';

// Request DTO
export const UpdateBasicInfoRequestSchema = z.object({
  basicInfo: z.object({
    nickname: z.string(),
  }),
  profileImage: z.instanceof(File).optional(),
});

export type UpdateBasicInfoRequestType = z.infer<typeof UpdateBasicInfoRequestSchema>;

// Response DTO - API 문서에 맞게 수정
export const UpdateBasicInfoResponseSchema = z.object({
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

export type UpdateBasicInfoResponseType = z.infer<typeof UpdateBasicInfoResponseSchema>;
