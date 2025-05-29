export interface PostDetailDto {
  postId: number;
  postTitle: string;
  postContent: string;
  createAt: Date;
  accountId: string;
  postImageUrl: string | null;
}
