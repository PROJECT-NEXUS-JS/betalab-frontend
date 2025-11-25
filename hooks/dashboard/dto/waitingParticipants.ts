import { z } from 'zod';
import { PageableSchema, SortSchema } from './application';

export const WaitingParticipantSchema = z.object({
  participationId: z.number(),
  nickname: z.string(),
  profileImageUrl: z.string().nullable(),
  appliedAt: z.string(),
});

export const WaitingParticipantsResponseSchema = z.object({
  totalElements: z.number(),
  totalPages: z.number(),
  pageable: PageableSchema,
  size: z.number(),
  content: z.array(WaitingParticipantSchema),
  number: z.number(),
  sort: SortSchema,
  numberOfElements: z.number(),
  first: z.boolean(),
  last: z.boolean(),
  empty: z.boolean(),
});

export type WaitingParticipantModel = z.infer<typeof WaitingParticipantSchema>;
export type WaitingParticipantsResponseModel = z.infer<typeof WaitingParticipantsResponseSchema>;

