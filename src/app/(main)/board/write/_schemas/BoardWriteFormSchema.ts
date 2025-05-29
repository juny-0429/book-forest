import { z } from 'zod';

export const boardWriteFormSchema = z.object({
  boardCategory: z.string().min(1, '카테고리를 선택해주세요'),
  postTitle: z.string().min(1, '제목을 입력해주세요'),
  postContent: z.string().min(1, '내용을 입력해주세요'),
  postImageUrl: z.string().url('유효한 이미지 URL이 아닙니다.').nullable().optional(),
});

export type BoardWriteFormSchema = z.infer<typeof boardWriteFormSchema>;
