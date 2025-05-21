export interface CommentListDto {
  commentId: number;
  commentContent: string;
  createAt: Date;
  accountId: string;
  userId: string;
  parentCommentId: number | null;
  replies: CommentListDto[];
}
