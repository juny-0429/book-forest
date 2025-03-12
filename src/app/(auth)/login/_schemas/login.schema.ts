import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('올바른 이메일을 입력해주세요').min(1, '이메일을 입력해주세요'),
  password: z.string().min(1),
});
export type LoginSchema = z.infer<typeof loginSchema>;
