import { z } from 'zod';

export const commentSchema = z.object({
  commentContent: z.string().min(1, '댓글을 입력해주세요.'),
  parentCommentId: z.number().optional(), // 대댓글일 경우만 사용
});

export type CommentSchema = z.infer<typeof commentSchema>;
export type CreateCommentPayload = CommentSchema & { postId: number };
