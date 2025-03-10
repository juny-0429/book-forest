import { z } from 'zod';

export const signupSchema = z
  .object({
    id: z
      .string()
      .min(4, '아이디는 최소 4자 이상이어야 합니다')
      .max(12, '아이디는 최대 12자까지 가능합니다')
      .regex(/^[a-zA-Z0-9]+$/, '아이디는 영문자와 숫자만 사용 가능합니다'),

    password: z
      .string()
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
      .max(20, '비밀번호는 최대 20자까지 가능합니다.')
      .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=!]).*$/, '비밀번호는 영문자, 숫자, 특수문자를 포함해야 합니다.'),

    confirmPassword: z.string().min(8, '비밀번호 확인은 최소 8자 이상이어야 합니다').max(20, '비밀번호 확인은 최대 20자까지 가능합니다'),

    user_name: z
      .string()
      .min(2, '이름은 최소 2자 이상이어야 합니다')
      .max(30, '이름은 최대 30자까지 가능합니다')
      .regex(/^[가-힣a-zA-Z]+$/, '이름은 한글 또는 영문자만 사용 가능합니다'),

    email: z.string().min(1, '이메일을 입력해주세요.').email('올바른 이메일 형식이 아닙니다.'),

    user_phone: z.string().length(13, "전화번호는 '-'포함  11자리 여야 합니다."),

    agreeAge: z.coerce.boolean().refine((val) => val === true, {
      message: '만 14세 이상이어야 합니다',
    }),
    agreeTerms: z.coerce.boolean().refine((val) => val === true, {
      message: '이용약관에 동의해야 합니다',
    }),
    agreePrivacy: z.coerce.boolean().refine((val) => val === true, {
      message: '개인정보 수집 및 이용에 동의해야 합니다',
    }),
    agreeMarketing: z.coerce.boolean().optional(), // 선택 항목이므로 required 아님
    agreeEvent: z.coerce.boolean().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호와 비밀번호 확인이 일치하지 않습니다',
    path: ['confirmPassword'],
  });

export type SignupSchema = z.infer<typeof signupSchema>;
