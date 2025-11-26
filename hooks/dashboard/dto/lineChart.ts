import { z } from 'zod';

const SeriesItem = z.object({
  name: z.string(),
  data: z.array(z.number()),
});

export const LineChartSchema = z.object({
  series: z.array(SeriesItem),
  labels: z.array(z.string()),
});

export type LineChartModel = z.infer<typeof LineChartSchema>;

