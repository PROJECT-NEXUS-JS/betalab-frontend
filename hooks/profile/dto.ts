import z from 'zod';

export const ProfileSchema = z.object({
  userId: z.number().int(),
  nickname: z.string(),
  profileImageUrl: z.string(),
  introduction: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Profile = z.infer<typeof ProfileSchema>;

export interface ProfileUpdatePayload {
  nickname: string;
  introduction: string;
  profileImage: File | null;
}
