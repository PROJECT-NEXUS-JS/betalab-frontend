import { z } from 'zod';
import { BaseModelSchema } from '@/types/models/base-model';

// 찜하기 응답 데이터 스키마
const postLikeResponseDataSchema = z
  .object({
    liked: z.boolean(),
    likeCount: z.number(),
  })
  .strict();

export type PostLikeResponseDataType = z.infer<typeof postLikeResponseDataSchema>;

// 찜하기/찜하기 취소 응답 스키마
export const postLikeResponseSchema = BaseModelSchema(postLikeResponseDataSchema);

export type PostLikeResponseType = z.infer<typeof postLikeResponseSchema>;
