import { useMutation, useQueryClient } from '@tanstack/react-query'; // 수정할 타입 import
import { UpdateCategoryDto } from '../../_dtos/updateCategory.dto';

const updateCategoryApi = async (categoryData: UpdateCategoryDto) => {
  const response = await fetch('/api/category/admin', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(categoryData),
  });

  if (!response.ok) throw new Error('카테고리 수정 요청에 실패했습니다.');

  return response.json();
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCategoryApi,
    onSuccess: (updatedCategory) => {
      queryClient.setQueryData(['categoryList', 'ALL'], (oldData: any) => {
        if (!oldData) return [updatedCategory];

        return oldData.map((category: any) => (category.categoryId === updatedCategory.categoryId ? updatedCategory : category));
      });
    },
  });
};
