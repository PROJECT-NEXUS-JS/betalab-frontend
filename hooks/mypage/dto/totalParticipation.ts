import { z } from 'zod';
import { BaseModelSchema } from '@/types/models/base-model';

const countByCategorySchema = z.record(z.string(), z.number().int().nonnegative());

const totalParticipationDataSchema = z
  .object({
    totalCount: z.number().int().nonnegative(),
    countByCategory: countByCategorySchema,
  })
  .strict();

export type TotalParticipationDataType = z.infer<typeof totalParticipationDataSchema>;

export const getTotalParticipationResponseSchema = BaseModelSchema(totalParticipationDataSchema);

export type GetTotalParticipationResponseType = z.infer<typeof getTotalParticipationResponseSchema>;
export type GetTotalParticipationDataType = TotalParticipationDataType;
