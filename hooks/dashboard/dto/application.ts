import { z } from 'zod';
import { ProjectDataSchema } from '@/hooks/posts/dto/postDetail';

export type StatusEnum = 'PENDING' | 'APPROVED' | 'COMPLETED' | 'REJECTED';

export const SortSchema = z.object({
  empty: z.boolean(),
  sorted: z.boolean(),
  unsorted: z.boolean(),
});

export const PageableSchema = z.object({
  offset: z.number(),
  sort: SortSchema,
  paged: z.boolean(),
  pageNumber: z.number(),
  pageSize: z.number(),
  unpaged: z.boolean(),
});

export const ApplicationContentSchema = z.object({
  id: z.number(),
  appliedAt: z.string().nullable(),
  approvedAt: z.string().nullable(),
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED']),
  applicantName: z.string(),
  contactNumber: z.string(),
  applicantEmail: z.string(),
  applicationReason: z.string(),
  post: ProjectDataSchema,
});

export const ApplicationSchema = z.object({
  totalElements: z.number(),
  totalPages: z.number(),
  size: z.number(),
  content: z.array(ApplicationContentSchema),
  number: z.number(),
  sort: SortSchema,
  numberOfElements: z.number(),
  pageable: PageableSchema,
  last: z.boolean(),
  first: z.boolean(),
  empty: z.boolean(),
});
