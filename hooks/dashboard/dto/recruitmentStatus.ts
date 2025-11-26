import { z } from 'zod';
import { BaseModelSchema } from '@/types/models/base-model';

const recruitmentStatusDataSchema = z.object({
  postId: z.number(),
  status: z.enum(['ACTIVE', 'COMPLETED']),
});

export const ChangeRecruitmentStatusResponseSchema = BaseModelSchema(recruitmentStatusDataSchema);
export type ChangeRecruitmentStatusResponseType = z.infer<
  typeof ChangeRecruitmentStatusResponseSchema
>;
export type ChangeRecruitmentStatusDataType = z.infer<typeof recruitmentStatusDataSchema>;
