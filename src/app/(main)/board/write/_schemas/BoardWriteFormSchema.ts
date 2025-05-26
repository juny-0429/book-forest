import { z } from 'zod';

export const boardWriteFormSchema = z.object({
  category: z.string().min(1, '카테고리를 선택해주세요'),
  title: z.string().min(1, '제목을 입력해주세요'),
  content: z.string().min(1, '내용을 입력해주세요'),
  image: z.any().optional(),
});

export type BoardWriteFormSchema = z.infer<typeof boardWriteFormSchema>;
