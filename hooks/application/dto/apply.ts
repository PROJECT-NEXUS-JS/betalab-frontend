import { z } from 'zod';

export const applicationSchema = z.object({
  applicantName: z.string().min(1, '이름을 입력해주세요.'),
  contactNumber: z.string().regex(/^[0-9]+$/, '숫자만 입력해주세요.'),
  applicantEmail: z.string().refine(
    val => {
      return val === '' || z.email().safeParse(val).success;
    },
    {
      message: '올바른 이메일 형식을 입력해주세요.',
    },
  ),
  applicationReason: z
    .string()
    .min(0, '신청 이유를 입력해주세요.')
    .max(100, '100자 이내로 작성해주세요.')
    .optional(),
  privacyAgreement: z.literal(true, {
    message: '개인정보 수집 및 이용에 동의해야 합니다.',
  }),
  termsAgreement: z.literal(true, {
    message: '참여 조건에 동의해야 합니다.',
  }),
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;
