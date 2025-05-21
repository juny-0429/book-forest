import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getCategoryListQueryOptions } from './useGetCategoryList';

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
      queryClient.setQueryData(getCategoryListQueryOptions('ALL').queryKey, (old: any) => {
        if (!old) return [];
        return old.filter((item: any) => item.categoryId !== deletedId);
      });
    },
  });
};
