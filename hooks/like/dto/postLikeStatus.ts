import { z } from 'zod';
import { BaseModelSchema } from '@/types/models/base-model';

// 찜하기 상태 응답 스키마 (data가 boolean)
export const getPostLikeStatusResponseSchema = BaseModelSchema(z.boolean());

export type GetPostLikeStatusResponseType = z.infer<typeof getPostLikeStatusResponseSchema>;
export type PostLikeStatusType = boolean | undefined;
