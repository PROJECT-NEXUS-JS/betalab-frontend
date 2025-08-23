import { z } from 'zod';

export const TestAddSchema = z.object({
  title: z.string().min(2),
  serviceSummary: z.string().min(2),
  genreCategories: z.array(z.string()).nonempty(),
  mainCategory: z.array(z.string()).nonempty(),
  platformCategory: z.array(z.string()).nonempty(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  recruitmentDeadline: z.string().optional(),
  durationTime: z.string().optional(),
  participationMethod: z.string().optional(),
  maxParticipants: z.number().int().positive().optional(),
  ageMin: z.number().optional(),
  ageMax: z.number().optional(),
  genderRequirement: z.string().optional(),
  additionalRequirements: z.string().optional(),
  rewardType: z.string().optional(),
  rewardDescription: z.string().optional(),
  feedbackMethod: z.string().optional(),
  feedbackItems: z.array(z.string()).optional(),
  qnaMethod: z.string().optional(),
  storyGuide: z.string().optional(),
  creatorIntroduction: z.string().optional(),
  privacyItems: z.array(z.string()).optional(),
  mediaUrl: z.string().url().optional(),
  description: z.string().optional(),
});
export type TestAddForm = z.infer<typeof TestAddSchema>;
export type TestAddState = Partial<TestAddForm>;
