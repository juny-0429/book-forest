import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getCategoryListQueryOptions } from './useGetCategoryList';
import { CategoryListDto } from '../../_dtos/getCategoryList.dto';

const deleteCategoryApi = async (categoryId: number) => {
  const response = await fetch(`/api/category/admin?categoryId=${categoryId}`, {
    method: 'DELETE',
  });

  if (!response.ok) throw new Error('카테고리 삭제 요청에 실패했습니다.');
  return response.json();
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategoryApi,
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData<CategoryListDto[]>(getCategoryListQueryOptions('ALL').queryKey, (oldData) => {
        if (!oldData) return [];
        return oldData.filter((item) => item.categoryId !== deletedId);
      });
    },
  });
};
