import { z } from 'zod';
import { BaseModelSchema } from '@/types/models/base-model';

const kakaoAccountDataSchema = z
  .object({
    connectedAccount: z.string(),
    email: z.string(),
    nickname: z.string(),
    profileUrl: z.string(),
    isKakaoAccount: z.boolean(),
  })
  .strict();

export type KakaoAccountDataType = z.infer<typeof kakaoAccountDataSchema>;

export const getKakaoAccountResponseSchema = BaseModelSchema(kakaoAccountDataSchema);

export type GetKakaoAccountResponseType = z.infer<typeof getKakaoAccountResponseSchema>;

