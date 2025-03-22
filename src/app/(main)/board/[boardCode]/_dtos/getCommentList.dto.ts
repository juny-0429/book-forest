export interface CommentListDto {
  commentId: number;
  commentContent: string;
  createAt: Date;
  accountId: string;
  parentCommentId: number | null;
  replies: CommentListDto[];
}
