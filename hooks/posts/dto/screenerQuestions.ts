import { z } from 'zod';
import { BaseModelSchema } from '@/types/models/base-model';

const screenerQuestionsSchema = z.object({
  screenerQuestions: z.array(z.string()),
});

export const ScreenerQuestionsResponseSchema = BaseModelSchema(screenerQuestionsSchema);

export type ScreenerQuestionsResponse = z.infer<typeof ScreenerQuestionsResponseSchema>;
