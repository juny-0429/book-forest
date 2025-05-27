import { useMutation } from "@tanstack/react-query";
import { CreatePostDto } from "../../_dtos/createPostDto";

export const createPostApi = async (postData: CreatePostDto) => {
  const response = await fetch('/api/board/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });

  if (!response.ok) throw new Error('게시글 작성에 실패했습니다.');
};

export const useCreatePost = () => {
  return useMutation({
    mutationFn: createPostApi,
  });
};
