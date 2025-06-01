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
