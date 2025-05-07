import { z } from 'zod';

export const forgotPasswordVerifySchema = z.object({
  userName: z.string().min(1),
  accountId: z.string().min(1),
  userEmail: z.string().email('올바른 이메일을 입력해주세요').min(1, '이메일을 입력해주세요'),
});
export type ForgotPasswordVerifySchema = z.infer<typeof forgotPasswordVerifySchema>;
