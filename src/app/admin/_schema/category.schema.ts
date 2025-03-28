import { z } from 'zod';

export const categorySchema = z.object({
  categoryName: z.string().min(1, '카테고리명을 입력하세요.'),
  categoryCode: z.string().min(1, '카테고리 코드를 입력하세요.'),
  parentCode: z.string().nullable(),
});

export type CategorySchema = z.infer<typeof categorySchema>;
