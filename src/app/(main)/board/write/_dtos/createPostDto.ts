export interface CreatePostDto {
  boardCode: string;
  userId: string;
  postTitle: string;
  postContent: string;
  postImageUrl?: string | null;
  isNotice: boolean;
}
