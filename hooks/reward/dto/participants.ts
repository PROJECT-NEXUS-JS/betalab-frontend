import { z } from 'zod';

export const ParticipationStatusEnum = z.enum([
  'PENDING',
  'APPROVED',
  'COMPLETED',
  'PAID',
  'REJECTED',
]);
export const RewardStatusEnum = z
  .enum(['PENDING', 'PAYMENT_PENDING', 'PAYMENT_IN_PROGRESS', 'PAID'])
  .nullable()
  .or(z.string());

export const ParticipantSchema = z.object({
  participationId: z.number(),
  postId: z.number(),
  userId: z.number(),
  nickname: z.string(),
  applicantEmail: z.string(),
  appliedAt: z.string(),
  approvedAt: z.string().nullable(),
  completedAt: z.string().nullable(),
  participationStatus: ParticipationStatusEnum,
  rewardStatus: RewardStatusEnum,
  paidAt: z.string().nullable(),
  isPaid: z.boolean(),
});

export const PageableSchema = z.object({
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

export const SortSchema = z.object({
  sorted: z.boolean(),
  empty: z.boolean(),
  unsorted: z.boolean(),
});

export const ParticipantsResponseSchema = z.object({
  success: z.boolean(),
  code: z.string(),
  message: z.string(),
  data: z.object({
    totalElements: z.number(),
    totalPages: z.number(),
    pageable: PageableSchema,
    size: z.number(),
    content: z.array(ParticipantSchema),
    number: z.number(),
    sort: SortSchema,
    numberOfElements: z.number(),
    first: z.boolean(),
    last: z.boolean(),
    empty: z.boolean(),
  }),
});

export type ParticipantType = z.infer<typeof ParticipantSchema>;
export type ParticipantsResponseType = z.infer<typeof ParticipantsResponseSchema>;
export type ParticipationStatusType = z.infer<typeof ParticipationStatusEnum>;
export type RewardStatusType = z.infer<typeof RewardStatusEnum>;
