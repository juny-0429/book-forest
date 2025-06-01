import { z } from 'zod';

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
      .max(20, '비밀번호는 최대 20자까지 가능합니다.')
      .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=!]).*$/, '비밀번호는 영문자, 숫자, 특수문자를 포함해야 합니다.')
      .refine((val) => !/\s/.test(val), { message: '비밀번호에 공백을 포함할 수 없습니다.' })
      .refine((val) => !/(.)\1\1/.test(val), { message: '동일한 문자를 3번 이상 반복할 수 없습니다.' })
      .refine(
        (val) => {
          const sequentialPatterns = ['0123', '1234', '2345', '3456', '4567', '5678', '6789', 'abcd', 'bcde', 'cdef', 'defg', 'efgh', 'fghi', 'qwerty', 'asdf', 'zxcv'];
          return !sequentialPatterns.some((pattern) => val.toLowerCase().includes(pattern));
        },
        { message: '연속된 문자 또는 키보드 패턴은 사용할 수 없습니다.' }
      ),

    confirmPassword: z.string().min(8, '비밀번호 확인은 최소 8자 이상이어야 합니다').max(20, '비밀번호 확인은 최대 20자까지 가능합니다'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
