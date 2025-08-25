import { z } from 'zod';

// Category
const CategorySchema = z.object({
  code: z.string(),
  name: z.string(),
});
type CategoryModel = z.infer<typeof CategorySchema>;

// Schedule
const ScheduleSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
  recruitmentDeadline: z.string(),
  durationTime: z.string(),
});
type ScheduleModel = z.infer<typeof ScheduleSchema>;

// Requirement
const RequirementSchema = z.object({
  maxParticipants: z.number(),
  genderRequirement: z.string().nullable(),
  ageMin: z.number().nullable(),
  ageMax: z.number().nullable(),
  additionalRequirements: z.string().nullable(),
});
type RequirementModel = z.infer<typeof RequirementSchema>;

// Reward
const RewardSchema = z.object({
  rewardType: z.enum(['CASH', 'GIFT_CARD', 'PRODUCT', 'NONE']), // "CASH" 혹은 string
  rewardDescription: z.string().nullable(),
});
type RewardModel = z.infer<typeof RewardSchema>;

// Feedback
const FeedbackSchema = z.object({
  feedbackMethod: z.string().nullable(),
  feedbackItems: z.array(z.string()).nullable(),
  privacyItems: z.array(z.enum(['NAME', 'EMAIL', 'CONTACT', 'OTHER'])),
});
type FeedbackModel = z.infer<typeof FeedbackSchema>;

// Content
const ContentSchema = z.object({
  participationMethod: z.string().nullable(),
  storyGuide: z.string().nullable(),
  mediaUrls: z.array(z.string()).or(z.null()).optional(), // mediaUrlS는 선택적이며, null일 수 있음
});
type ContentModel = z.infer<typeof ContentSchema>;

// Main ProjectDataSchema
export const ProjectDataSchema = z.object({
  id: z.number(),
  title: z.string(),
  serviceSummary: z.string(),
  creatorIntroduction: z.string(),
  creatorProfileUrl: z.string().or(z.null()), // 개발 편의상 이미지가 없어서 테스트시 널
  description: z.string(),
  thumbnailUrl: z.string().or(z.null()).optional(), // 개발 편의상 이미지가 없어서 테스트시 널
  mainCategories: z.array(CategorySchema),
  platformCategories: z.array(CategorySchema),
  genreCategories: z.array(CategorySchema),
  status: z.enum(['DRAFT', 'ACTIVE', 'INACTIVE', 'COMPLETED', 'CANCELLED', 'EXPIRED']),
  qnaMethod: z.string(),
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
});

export type ProjectDataModel = z.infer<typeof ProjectDataSchema>;
