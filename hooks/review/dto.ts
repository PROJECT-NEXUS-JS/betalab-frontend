import { z } from 'zod';

// WriterInfo에 대한 Zod 스키마 정의
export const WriterInfoSchema = z.object({
  id: z.number(),
  nickname: z.string(),
  profileUrl: z.url(),
});

// ReviewData에 대한 Zod 스키마 정의
export const ReviewDataSchema = z.object({
  id: z.number(),
  postId: z.number(),
  rating: z.number(),
  content: z.string(),
  createdAt: z.string().transform(dateString => new Date(dateString)),
  updatedAt: z.string().transform(dateString => new Date(dateString)),
  writer: WriterInfoSchema,
});

export type WriterInfo = z.infer<typeof WriterInfoSchema>;
export type ReviewDataModel = z.infer<typeof ReviewDataSchema>;
