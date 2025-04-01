import { useQuery } from '@tanstack/react-query';
import { BannerPositionType } from 'src/types/bannerPosition.types';
import { BannerListItemDto } from '../../_dtos/getBannerList.dto';

const getAdminBannerList = async (position: BannerPositionType): Promise<BannerListItemDto[]> => {
  const response = await fetch(`/api/banner/admin?position=${position}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) throw new Error('배너리스트 조회에 실패했습니다.');
  const result = await response.json();
  return result.data;
};

export const useGetAdminBannerList = (position: BannerPositionType) => {
  return useQuery({
    queryKey: ['bannerList', position],
    queryFn: () => getAdminBannerList(position),
    enabled: !!position,
  });
};
