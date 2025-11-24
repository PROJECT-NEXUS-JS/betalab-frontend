import { z } from 'zod';

const PieChartItem = z.object({
  label: z.string(),
  value: z.number().min(0),
});

const ChartData = z.object({
  title: z.string(),
  items: z.array(PieChartItem),
});

export const PieChartSchema = z.object({
  statusChart: ChartData,
  rewardChart: ChartData,
});

export type PieChartModel = z.infer<typeof PieChartSchema>;

