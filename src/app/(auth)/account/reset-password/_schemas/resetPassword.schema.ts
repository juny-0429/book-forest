import { z } from 'zod';

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
    .max(20, '비밀번호는 최대 20자까지 가능합니다.')
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=!]).*$/, '비밀번호는 영문자, 숫자, 특수문자를 포함해야 합니다.'),

  confirmPassword: z.string().min(8, '비밀번호 확인은 최소 8자 이상이어야 합니다').max(20, '비밀번호 확인은 최대 20자까지 가능합니다'),
}).refine((data) => data.password === data.confirmPassword, {
  message: '비밀번호가 일치하지 않습니다.',
  path: ['confirmPassword'],
});

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
