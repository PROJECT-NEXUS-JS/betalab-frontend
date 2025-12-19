import { z } from 'zod';

export const PostStatus = z.enum([
  'DRAFT',
  'ACTIVE',
  'INACTIVE',
  'COMPLETED',
  'CANCELLED',
  'EXPIRED',
]);
export type PostStatus = z.infer<typeof PostStatus>;

const iso = z.string().datetime({ offset: true });

export const TestAddSchema = z
  .object({
    title: z.string().min(2),
    serviceSummary: z.string().min(2),
    creatorIntroduction: z.string().min(1),
    description: z.string().min(1),
    mainCategory: z.array(z.string()).nonempty(),
    platformCategory: z.array(z.string()),
    status: PostStatus,
    startDate: iso,
    endDate: iso,
    recruitmentDeadline: iso,
    durationTime: z.string().min(1),
    feedbackMethod: z.string().min(1),
    participationMethod: z.string().min(1),
    genreCategories: z.array(z.string()).nonempty().optional(),
    maxParticipants: z.coerce.number().int().positive().optional(),
    ageMin: z.coerce.number().int().min(0).optional(),
    ageMax: z.coerce.number().int().min(0).optional(),
    genderRequirement: z.string().optional(),
    additionalRequirements: z.string().optional(),
    rewardType: z.enum(['CASH', 'GIFT_CARD', 'PRODUCT', 'ETC']).optional(),
    rewardDescription: z.string().optional(),
    feedbackItems: z.array(z.string()).optional(),
    qnaMethod: z.string().optional(),
    storyGuide: z.string().optional(),
    privacyItems: z.array(z.enum(['NAME', 'EMAIL', 'CONTACT', 'ETC'])).optional(),
    privacyPurpose: z.string().optional(),
    mediaUrl: z.string().url().optional(),
    teamMemberCount: z.coerce.number().int().positive().optional(),
  })
  .superRefine((d: z.infer<typeof TestAddSchema>, ctx: z.RefinementCtx) => {
    if (new Date(d.recruitmentDeadline) > new Date(d.startDate)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['recruitmentDeadline'],
        message: 'recruitmentDeadline ≤ startDate 여야 합니다.',
      });
    }
    if (new Date(d.startDate) > new Date(d.endDate)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['startDate'],
        message: 'startDate ≤ endDate 여야 합니다.',
      });
    }
    if (d.ageMin !== undefined && d.ageMax !== undefined && d.ageMin > d.ageMax) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['ageMin'],
        message: 'ageMin ≤ ageMax 여야 합니다.',
      });
    }
  });
export type TestAddForm = z.infer<typeof TestAddSchema>;
export type TestAddState = Partial<TestAddForm>;
