import { z } from 'zod';

const PageableMetaSchema = z.object({
  paged: z.boolean(),
  pageNumber: z.number(),
  pageSize: z.number(),
  offset: z.number(),
  sort: z.object({
    sorted: z.boolean(),
    empty: z.boolean(),
    unsorted: z.boolean(),
  }),
  unpaged: z.boolean(),
});

const PrivacyItemSchema = z.object({
  participationId: z.number(),
  postId: z.number(),
  applicantName: z.string(),
  contactNumber: z.string(),
  applicantEmail: z.string(),
  applicationReason: z.string(),
});

export const PrivacyResponseSchema = z.object({
  success: z.boolean(),
  code: z.string(),
  message: z.string(),
  data: z.object({
    totalElements: z.number(),
    totalPages: z.number(),
    pageable: PageableMetaSchema,
    size: z.number(),
    content: z.array(PrivacyItemSchema),
    number: z.number(),
    sort: z.object({
      sorted: z.boolean(),
      empty: z.boolean(),
      unsorted: z.boolean(),
    }),
    numberOfElements: z.number(),
    first: z.boolean(),
    last: z.boolean(),
    empty: z.boolean(),
  }),
});

export type PrivacyResponseType = z.infer<typeof PrivacyResponseSchema>;
export type PrivacyItemType = z.infer<typeof PrivacyItemSchema>;

