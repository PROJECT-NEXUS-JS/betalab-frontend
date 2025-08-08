import { z } from 'zod';
import { BaseModelSchema } from '@/types/models/base-model';

export const LoginResponseSchema = BaseModelSchema(
  z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
  }),
);

export type LoginResponseModel = z.infer<typeof LoginResponseSchema>;

export const ReissueResponseSchema = BaseModelSchema(
  z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
  }),
);

export type ReissueResponseModel = z.infer<typeof ReissueResponseSchema>;

export const MeResponseSchema = BaseModelSchema(
  z.object({
    email: z.email(),
    nickname: z.string(),
    profileUrl: z.string().optional(),
    lastLoginAt: z.string().optional(),
    // roleType은 백엔드에 정보 요청 필요
    roleType: z.enum(['ROLE_GUEST', 'ROLE_ADMIN']),
  }),
);

export type MeResponseModel = z.infer<typeof MeResponseSchema>;
