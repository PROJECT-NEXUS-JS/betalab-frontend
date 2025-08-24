import { z } from 'zod';

// Request DTO
export const WithdrawRequestSchema = z.object({
  confirmation: z.string(),
  kakaoAccessToken: z.string().optional(),
});

export type WithdrawRequestType = z.infer<typeof WithdrawRequestSchema>;

// Response DTO
export const WithdrawResponseSchema = z.object({
  success: z.boolean(),
  code: z.string(),
  message: z.string(),
  data: z.object({}),
});

export type WithdrawResponseType = z.infer<typeof WithdrawResponseSchema>;
