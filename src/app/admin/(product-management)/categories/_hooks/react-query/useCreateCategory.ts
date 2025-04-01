import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CategoryDto } from '../../_dtos/createCategory.dto';

const createCategoryApi = async (categoryData: CategoryDto) => {
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
      queryClient.setQueryData(['categoryList', 'ALL'], (oldData: any) => {
        if (!oldData) return [newCategory];
        return [...oldData, newCategory];
      });
    },
  });
};
