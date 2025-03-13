import { useQuery } from '@tanstack/react-query';
import { BannerPositionType } from 'src/types/bannerPosition.types';

const getBannerList = async (position: BannerPositionType) => {
  const response = await fetch(`/api/banner?position=${position}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) throw new Error('배너리스트 조회에 실패했습니다.');

  return response.json();
};

export const useGetBannerList = (position: BannerPositionType) => {
  return useQuery({
    queryKey: ['bannerList', position],
    queryFn: () => getBannerList(position),
    enabled: !!position,
  });
};
