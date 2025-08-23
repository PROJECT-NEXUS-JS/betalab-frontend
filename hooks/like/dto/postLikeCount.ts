import { z } from 'zod';
import { BaseModelSchema } from '@/types/models/base-model';

// 찜 개수 응답 스키마 (data가 number)
export const getPostLikeCountResponseSchema = BaseModelSchema(z.number());

export type GetPostLikeCountResponseType = z.infer<typeof getPostLikeCountResponseSchema>;
export type PostLikeCountType = number | undefined;
