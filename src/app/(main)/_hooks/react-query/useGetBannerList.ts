import { useQuery } from '@tanstack/react-query';
import { BannerPositionType } from 'src/types/bannerPosition.types';
import { BannerListItemDto } from '../../_dtos/getBannerList.dto';

const getBannerListApi = async (position: BannerPositionType): Promise<BannerListItemDto[]> => {
  const response = await fetch(`/api/banner?position=${position}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) throw new Error('배너리스트 조회에 실패했습니다.');
  const result = await response.json();
  return result.data;
};

const BANNER_LIST = 'BANNER_LIST';

export const useGetBannerList = (position: BannerPositionType, isVisible = true) => {
  return useQuery({
    queryKey: [BANNER_LIST, position],
    queryFn: () => getBannerListApi(position),
    enabled: !!position && isVisible,
  });
};
