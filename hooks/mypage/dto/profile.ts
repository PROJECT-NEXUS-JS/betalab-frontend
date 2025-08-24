import { z } from 'zod';
import { BaseModelSchema } from '@/types/models/base-model';

// 프로필 정보 응답 데이터 스키마
const profileDataSchema = z
  .object({
    profileImageUrl: z.string().nullable(),
    name: z.string(),
    affiliation: z.string().nullable(),
    testsUploaded: z.number().int().nonnegative(),
    testsParticipating: z.number().int().nonnegative(),
  })
  .strict();

export type ProfileDataType = z.infer<typeof profileDataSchema>;

// 프로필 정보 응답 스키마
export const getMyPageProfileResponseSchema = BaseModelSchema(profileDataSchema);

export type GetMyPageProfileResponseType = z.infer<typeof getMyPageProfileResponseSchema>;
export type GetMyPageProfileDataType = z.infer<typeof profileDataSchema> | undefined;
