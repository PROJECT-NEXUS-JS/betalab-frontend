import { z } from 'zod';

export const CreatePostPayloadSchema = z
  .object({
    title: z.string().min(1),
    serviceSummary: z.string().min(1),
    description: z.string().optional(),

    genreCategories: z.array(z.string()).nonempty(),
    mainCategory: z.array(z.string()).nonempty(),

    platformCategory: z.array(z.string()).optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    recruitmentDeadline: z.string().datetime().optional(),

    durationTime: z.string().optional(),
    participationMethod: z.string().optional(),
    maxParticipants: z.number().int().positive().optional(),
    ageMin: z.number().optional(),
    ageMax: z.number().optional(),
    genderRequirement: z.enum(['무관', '남성', '여성']).optional(),
    additionalRequirements: z.string().optional(),

    rewardType: z.enum(['CASH', 'GIFT_CARD', 'PRODUCT', 'ETC']).optional(),
    rewardDescription: z.string().optional(),

    feedbackMethod: z.string().optional(),
    feedbackItems: z.array(z.string()).optional(),

    qnaMethod: z.string().optional(),
    storyGuide: z.string().optional(),
    creatorIntroduction: z.string().optional(),

    privacyItems: z.array(z.enum(['NAME', 'EMAIL', 'CONTACT', 'ETC'])).optional(),
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
