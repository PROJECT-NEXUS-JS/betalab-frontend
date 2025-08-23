import { z } from 'zod';

const BarChartItem = z.object({
  category: z.string(),
  value: z.number().min(0),
});

export const BarChartSchema = z.object({
  items: z.array(BarChartItem),
});

export type BarChartModel = z.infer<typeof BarChartSchema>;
