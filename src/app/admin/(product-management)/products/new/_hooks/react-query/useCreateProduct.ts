import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateProductDto } from '../../_dtos/createProduct.dto';

const createProductApi = async (productData: CreateProductDto) => {
  const response = await fetch('/api/product/admin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });

  if (!response.ok) throw new Error('상품 등록 요청이 실패했습니다.');

  return response.json();
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProductApi,
    onSuccess: (newProduct) => {
      queryClient.setQueryData(['productList'], (oldData: any) => {
        if (!oldData) return [newProduct];
        return [...oldData, newProduct];
      });
    },
  });
};
