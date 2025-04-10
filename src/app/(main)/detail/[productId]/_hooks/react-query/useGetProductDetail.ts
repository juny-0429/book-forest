import { useQuery } from '@tanstack/react-query';
import { ProductDetailDto } from '../../_dtos/getProductDetail.dto';

const getProductDetailApi = async (productId: number): Promise<ProductDetailDto> => {
  const response = await fetch(`/api/product/detail?productId=${productId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) throw new Error('상품 상세페이지 조회에 실패했습니다.');
  const result = await response.json();

  return result.productDetail;
};

const PRODUCT_DETAIL = 'PRODUCT_DETAIL';

export const useGetProductDetail = (productId: number) => {
  return useQuery({
    queryKey: [PRODUCT_DETAIL, productId],
    queryFn: () => getProductDetailApi(productId),
    enabled: !!productId,
  });
};
