import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ProductListResponse } from '../../_dtos/getProductList.dto';
import { getProductListQueryOptions } from './useGetProductList';

const updateProductBatchStatusApi = async (productIds: number[], isActive: boolean) => {
  const response = await fetch('/api/product/admin/batch-status', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productIds, isActive }),
  });

  if (!response.ok) throw new Error('상품 상태 일괄 업데이트에 실패했습니다.');

  return response.json();
};

export const useUpdateProductBatchStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productIds, isActive }: { productIds: number[]; isActive: boolean; page: number; searchType: string; keyword: string }) => updateProductBatchStatusApi(productIds, isActive),

    onSuccess: (_data, variables) => {
      const { productIds, isActive, page, searchType, keyword } = variables;

      queryClient.setQueryData<ProductListResponse>(getProductListQueryOptions(page, searchType, keyword).queryKey, (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          productList: oldData.productList.map((product) => (productIds.includes(product.productId) ? { ...product, isActive } : product)),
        };
      });
    },

    onError: (error) => {
      console.error('상품 일괄 상태 변경 실패:', error);
    },
  });
};
