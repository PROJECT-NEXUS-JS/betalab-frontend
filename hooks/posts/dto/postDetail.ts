import { z } from 'zod';

// Category
export const CategorySchema = z.object({
  code: z.string(),
  name: z.string(),
});

export type CategoryType = z.infer<typeof CategorySchema>;

// Schedule
export const ScheduleSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
  recruitmentDeadline: z.string().nullable().optional(),
  durationTime: z.string().nullable().optional(),
});

export type ScheduleType = z.infer<typeof ScheduleSchema>;

// Requirement
export const RequirementSchema = z.object({
  maxParticipants: z.number(),
  genderRequirement: z.string().nullable(),
  ageMin: z.number().nullable(),
  ageMax: z.number().nullable(),
  additionalRequirements: z.string().nullable().optional(),
  screenerQuestions: z.array(z.string()).optional(),
});

export type RequirementModel = z.infer<typeof RequirementSchema>;

// Reward
export const RewardSchema = z.object({
  rewardType: z.enum(['CASH', 'GIFT_CARD', 'PRODUCT', 'NONE']),
  rewardDescription: z.string().nullable(),
});

export type RewardType = z.infer<typeof RewardSchema>;

// Feedback
const FeedbackSchema = z.object({
  feedbackMethod: z.string().nullable(),
  feedbackItems: z.array(z.string()).nullable().optional(),
  privacyItems: z
    .array(z.enum(['NAME', 'EMAIL', 'CONTACT', 'OTHER']))
    .nullable()
    .optional(),
  privacyPurpose: z.string().nullable().optional(),
});
type FeedbackType = z.infer<typeof FeedbackSchema>;

// Content
const ContentSchema = z.object({
  participationMethod: z.string().nullable(),
  storyGuide: z.string().nullable(),
  mediaUrls: z.array(z.string()).or(z.null()).optional(), // mediaUrlS는 선택적이며, null일 수 있음
});
type ContentType = z.infer<typeof ContentSchema>;

// particapationStatus
export const ParticipationStatusEnum = z.enum([
  'PENDING',
  'APPROVED',
  'FEEDBACK_COMPLETED',
  'TEST_COMPLETED',
  'COMPLETED',
  'REJECTED',
]);

// null 허용한 particapationStatus 타입
const ParticipationStatus = ParticipationStatusEnum.nullable();
export type ParticipationStatusType = z.infer<typeof ParticipationStatus>;

// particapationStatus
export const ParticapationStatusEnum = z.enum([
  'PENDING',
  'APPROVED',
  'TEST_COMPLETED',
  'COMPLETED',
  'REJECTED',
]);

// Main ProjectDataSchema
export const ProjectDataSchema = z.object({
  id: z.number(),
  title: z.string(),
  serviceSummary: z.string(),
  creatorIntroduction: z.string().nullable(),
  creatorProfileUrl: z.string().or(z.null()), // 개발 편의상 이미지가 없어서 테스트시 널
  description: z.string().nullable(),
  thumbnailUrl: z.string().or(z.null()).optional(), // 개발 편의상 이미지가 없어서 테스트시 널
  mainCategories: z.array(CategorySchema),
  platformCategories: z.array(CategorySchema),
  genreCategories: z.array(CategorySchema),
  status: z.enum(['DRAFT', 'ACTIVE', 'INACTIVE', 'COMPLETED', 'CANCELLED', 'EXPIRED']),
  qnaMethod: z.string().nullable(),
  likeCount: z.number(),
  viewCount: z.number(),
  currentParticipants: z.number(),
  schedule: ScheduleSchema,
  requirement: RequirementSchema,
  reward: RewardSchema.nullable(),
  feedback: FeedbackSchema,
  content: ContentSchema,
  createdAt: z.string(),
  createdBy: z.number(),
  isLiked: z.boolean(),
  isParticipated: z.boolean(),
  participationStatus: ParticipationStatus,
});

export type ProjectDataModel = z.infer<typeof ProjectDataSchema>;
