import { z } from 'zod';

export const ParticipationDetailResponseSchema = z.object({
  success: z.boolean(),
  code: z.string(),
  message: z.string(),
  data: z.object({
    participationId: z.number(),
    postId: z.number(),
    userId: z.number(),
    applicantName: z.string(),
    contactNumber: z.string(),
    applicantEmail: z.string(),
    applicationReason: z.string(),
    appliedAt: z.string(),
    privacyAgreement: z.boolean(),
    termsAgreement: z.boolean(),
  }),
});

export type ParticipationDetailResponseType = z.infer<typeof ParticipationDetailResponseSchema>;
export type ParticipationDetailDataType = z.infer<typeof ParticipationDetailResponseSchema>['data'];
