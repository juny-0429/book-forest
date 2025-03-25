import { useQuery } from '@tanstack/react-query';
import { BannerPositionType } from 'src/types/bannerPosition.types';
import { BannerListItemDto } from '../../_dtos/getBannerList.dto';

const getBannerList = async (position: BannerPositionType): Promise<BannerListItemDto[]> => {
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

export const useGetBannerList = (position: BannerPositionType, isVisible: boolean) => {
  return useQuery({
    queryKey: ['bannerList', position],
    queryFn: () => getBannerList(position),
    enabled: !!position && isVisible, // ✅ 둘 다 true일 때만 요청
  });
};
