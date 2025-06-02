import { z } from 'zod';

export const forgotPasswordVerifySchema = z.object({
  userName: z.string().min(1),
  userPhone: z.string().regex(/^01[016789]-\d{3,4}-\d{4}$/, '010-1234-5678 형식으로 입력해주세요'),
  userEmail: z.string().email('올바른 이메일을 입력해주세요').min(1, '이메일을 입력해주세요'),
});
export type ForgotPasswordVerifySchema = z.infer<typeof forgotPasswordVerifySchema>;
