import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateCategoryDto } from '../../_dtos/createCategory.dto';
import { getCategoryListQueryOptions } from './useGetCategoryList';

const createCategoryApi = async (categoryData: CreateCategoryDto) => {
  const response = await fetch('/api/category/admin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(categoryData),
  });

  if (!response.ok) throw new Error('카테고리 등록 요청이 실패했습니다.');

  return response.json();
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategoryApi,
    onSuccess: (newCategory) => {
      queryClient.setQueryData(getCategoryListQueryOptions('ALL').queryKey, (oldData: any) => {
        if (!oldData) return [newCategory];
        return [...oldData, newCategory];
      });
    },
  });
};
