import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ProductListResponse } from '../../_dtos/getProductList.dto';
import { getProductListQueryOptions } from './useGetProductList';

const updateProductStatusApi = async (productId: number, isActive: boolean) => {
  const response = await fetch('/api/product/admin/status', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productId, isActive }),
  });

  if (!response.ok) throw new Error('상품 상태 업데이트에 실패했습니다.');

  return response.json();
};

export const useUpdateProductStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ updateProductId, isActive, page, searchType, keyword }: { updateProductId: number; isActive: boolean; page: number; searchType: string; keyword: string }) =>
      updateProductStatusApi(updateProductId, isActive),

    onSuccess: (_data, variables) => {
      const { updateProductId, isActive, page, searchType, keyword } = variables;

      queryClient.setQueryData<ProductListResponse>(getProductListQueryOptions(page, searchType, keyword).queryKey, (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          productList: oldData.productList.map((product) => (product.productId === updateProductId ? { ...product, isActive } : product)),
        };
      });
    },

    onError: (error) => {
      console.error('상품 상태 업데이트 오류:', error);
    },
  });
};
