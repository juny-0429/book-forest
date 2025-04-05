import { useQuery } from '@tanstack/react-query';
import { BannerListItemDto } from 'src/app/(main)/_dtos/getBannerList.dto';
import { BannerPositionType } from 'src/types/bannerPosition.types';

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

export const ADMIN_BANNER_LIST = 'ADMIN_BANNER_LIST';

export const getAdminBannerListQueryOptions = (position: BannerPositionType) => ({
  queryKey: [ADMIN_BANNER_LIST, position],
  queryFn: () => getAdminBannerList(position),
  enabled: !!position,
});

export const useGetAdminBannerList = (position: BannerPositionType) => {
  return useQuery(getAdminBannerListQueryOptions(position));
};
