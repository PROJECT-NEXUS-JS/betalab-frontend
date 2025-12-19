import { z } from 'zod';

export const BaseModelSchema = <T extends z.ZodType<any>>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    code: z.string(),
    message: z.string(),
    data: dataSchema,
  });

export type BaseModel<T extends z.ZodType<any>> = z.infer<ReturnType<typeof BaseModelSchema<T>>>;
