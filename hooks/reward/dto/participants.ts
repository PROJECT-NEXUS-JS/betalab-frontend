import { z } from 'zod';
import { ParticipationStatusEnum } from '@/hooks/posts/dto/postDetail';

const PageableMetaSchema = z.object({
  paged: z.boolean(),
  pageNumber: z.number(),
  pageSize: z.number(),
  offset: z.number(),
  sort: z.object({
    sorted: z.boolean(),
    empty: z.boolean(),
    unsorted: z.boolean(),
  }),
  unpaged: z.boolean(),
});

export const RewardStatusEnum = z.enum([
  'PENDING',
  'PAYMENT_PENDING',
  'PAYMENT_IN_PROGRESS',
  'PAID',
]);

const ParticipantItemSchema = z.object({
  participationId: z.number(),
  postId: z.number(),
  userId: z.number(),
  nickname: z.string(),
  applicantEmail: z.string(),
  appliedAt: z.string(),
  approvedAt: z.string().nullable(),
  completedAt: z.string().nullable(),
  participationStatus: ParticipationStatusEnum.nullable(),
  rewardStatus: RewardStatusEnum.nullable(),
  paidAt: z.string().nullable(),
  isPaid: z.boolean(),
});

export const ParticipantsResponseSchema = z.object({
  success: z.boolean(),
  code: z.string(),
  message: z.string(),
  data: z.object({
    totalElements: z.number(),
    totalPages: z.number(),
    pageable: PageableMetaSchema,
    size: z.number(),
    content: z.array(ParticipantItemSchema),
    number: z.number(),
    sort: z.object({
      sorted: z.boolean(),
      empty: z.boolean(),
      unsorted: z.boolean(),
    }),
    numberOfElements: z.number(),
    first: z.boolean(),
    last: z.boolean(),
    empty: z.boolean(),
  }),
});

export type ParticipantsResponseType = z.infer<typeof ParticipantsResponseSchema>;
export type ParticipantItemType = z.infer<typeof ParticipantItemSchema>;
