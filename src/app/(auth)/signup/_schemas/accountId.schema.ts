import { z } from 'zod';

export const accountIdSchema = z
  .string()
  .min(4, '아이디는 최소 4자 이상이어야 합니다')
  .max(12, '아이디는 최대 12자까지 가능합니다')
  .regex(/^[a-zA-Z0-9]+$/, '아이디는 영문자와 숫자만 사용 가능합니다');
