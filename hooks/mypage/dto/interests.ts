import { z } from 'zod';

// GET /v1/users/interests Response DTO
export const GetUserInterestsResponseSchema = z.object({
  success: z.boolean(),
  code: z.string(),
  message: z.string(),
  data: z.object({
    mainCategories: z.array(z.string()),
    platformCategories: z.array(z.string()),
    genreCategories: z.array(z.string()),
  }),
});

export type GetUserInterestsResponseType = z.infer<typeof GetUserInterestsResponseSchema>;

export const SetUserInterestsRequestSchema = z.object({
  mainCategories: z.array(z.string()),
  platformCategories: z.array(z.string()),
  genreCategories: z.array(z.string()),
});

export type SetUserInterestsRequestType = z.infer<typeof SetUserInterestsRequestSchema>;

export const SetUserInterestsResponseSchema = z.object({
  success: z.boolean(),
  code: z.string(),
  message: z.string(),
  data: z.object({
    mainCategories: z.array(z.string()),
    platformCategories: z.array(z.string()),
    genreCategories: z.array(z.string()),
  }),
});

export type SetUserInterestsResponseType = z.infer<typeof SetUserInterestsResponseSchema>;
