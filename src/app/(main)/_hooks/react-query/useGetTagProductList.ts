import { useQuery } from '@tanstack/react-query';
import { TaggedProductItemDto } from '../../_dtos/getTagProductList.dto';
import { ProductTagType } from 'src/types/productTag.types';

const getTagProductListApi = async (productTagType: ProductTagType): Promise<TaggedProductItemDto[]> => {
  const response = await fetch(`/api/home/books-swiper?productTagType=${productTagType}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) throw new Error('배너리스트 조회에 실패했습니다.');
  const result = await response.json();
  return result.products;
};

const TAG_PRODUCT_LIST = 'TAG_PRODUCT_LIST';

export const useGetTagProductList = (productTagType: ProductTagType) => {
  return useQuery({
    queryKey: [TAG_PRODUCT_LIST, productTagType],
    queryFn: () => getTagProductListApi(productTagType),
    enabled: !!productTagType,
  });
};
