import { z } from "zod";

// WriterInfo에 대한 Zod 스키마 정의
export const WriterInfoSchema = z.object({
  id: z.number(),
  nickname: z.string(),
  profileUrl: z.url(),
});

// ReviewResponse에 대한 Zod 스키마 정의
export const ReviewResponseSchema = z.object({
  id: z.number(),
  postId: z.number(),
  rating: z.number(),
  content: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  writer: WriterInfoSchema,
});


export type WriterInfo = z.infer<typeof WriterInfoSchema>;
export type ReviewResponse = z.infer<typeof ReviewResponseSchema>;