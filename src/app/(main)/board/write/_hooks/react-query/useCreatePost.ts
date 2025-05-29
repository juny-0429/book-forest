import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreatePostDto } from '../../_dtos/createPostDto';
import { getPostListQueryOptions } from '../../../[boardCode]/_hooks/react-qeury/useGetPostList';
import { GetPostItemDto } from '../../../[boardCode]/_dtos/getPostList.dto';
import { BoardCategoryType } from 'src/types/boardCategory.types';

export const createPostApi = async (postData: CreatePostDto) => {
  const response = await fetch('/api/board/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });

  if (!response.ok) throw new Error('게시글 작성에 실패했습니다.');

  return response.json();
};

export const useCreatePost = (boardCode: BoardCategoryType) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPostApi,
    onSuccess: (newPost) => {
      const options = getPostListQueryOptions(boardCode);

      queryClient.setQueryData<GetPostItemDto[]>(options.queryKey, (oldData) => {
        if (!oldData) return [newPost];

        return [...oldData, ...newPost];
      });
    },
  });
};
