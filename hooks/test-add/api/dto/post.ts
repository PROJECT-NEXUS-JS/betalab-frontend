import { z } from 'zod';

export const CreatePostPayloadSchema = z
  .object({
    title: z.string().min(1),
    serviceSummary: z.string().min(1),
    description: z.string().min(1),
    creatorIntroduction: z.string().min(1),

    genreCategories: z.array(z.string()).nonempty(),
    mainCategory: z.array(z.string()).nonempty(),

    platformCategory: z.array(z.string()).optional(),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    recruitmentDeadline: z.string().datetime(),

    durationTime: z.string().min(1),
    participationMethod: z.string().min(1),
    maxParticipants: z.number().int().positive().optional(),
    teamMemberCount: z.number().int().positive().optional(),
    ageMin: z.number().int().min(0).optional(),
    ageMax: z.number().int().min(0).optional(),
    genderRequirement: z.enum(['무관', '남성', '여성']).optional(),
    additionalRequirements: z.string().optional(),
    screenerQuestions: z.array(z.string()).optional(),

    rewardType: z.enum(['CASH', 'GIFT_CARD', 'PRODUCT', 'ETC']).optional(),
    rewardDescription: z.string().optional(),

    feedbackMethod: z.string().min(1),
    feedbackItems: z.array(z.string()).optional(),

    qnaMethod: z.string().optional(),
    storyGuide: z.string().optional(),

    privacyItems: z.array(z.enum(['NAME', 'EMAIL', 'CONTACT', 'ETC'])).optional(),
    privacyPurpose: z.string().optional(),
    mediaUrl: z.string().url().optional(),
  })
  .strict();

export type CreatePostPayload = z.infer<typeof CreatePostPayloadSchema>;

export const UserPostSchema = z
  .object({
    id: z.string().or(z.number()).transform(String),
    title: z.string(),
    serviceSummary: z.string(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
  })
  .passthrough();
export type UserPostModel = z.infer<typeof UserPostSchema>;

export const UserPostListSchema = z
  .object({
    items: z.array(UserPostSchema),
    total: z.number().optional(),
    page: z.number().optional(),
    size: z.number().optional(),
  })
  .passthrough();
export type UserPostListModel = z.infer<typeof UserPostListSchema>;
