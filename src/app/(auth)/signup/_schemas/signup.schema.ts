import { z } from 'zod';

export const signupSchema = z
  .object({
    userId: z
      .string()
      .min(4, '아이디는 최소 4자 이상이어야 합니다')
      .max(12, '아이디는 최대 12자까지 가능합니다')
      .regex(/^[a-zA-Z0-9]+$/, '아이디는 영문자와 숫자만 사용 가능합니다'),

    password: z
      .string()
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
      .max(20, '비밀번호는 최대 20자까지 가능합니다')
      .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=!]).*$/, '비밀번호는 영문자, 숫자, 특수문자를 포함해야 합니다'),

    confirmPassword: z.string().min(8, '비밀번호 확인은 최소 8자 이상이어야 합니다').max(20, '비밀번호 확인은 최대 20자까지 가능합니다'),

    nickname: z
      .string()
      .min(2, '닉네임은 최소 2자 이상이어야 합니다')
      .max(16, '닉네임은 최대 16자까지 가능합니다')
      .regex(/^[a-zA-Z0-9가-힣]+$/, '닉네임은 한글, 영문, 숫자만 가능합니다'),

    email: z.string().email('올바른 이메일을 입력하세요'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호와 비밀번호 확인이 일치하지 않습니다',
    path: ['confirmPassword'],
  });

export type SignupSchema = z.infer<typeof signupSchema>;
