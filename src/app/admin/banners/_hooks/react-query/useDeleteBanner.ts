import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getAdminBannerListQueryOptions } from './useGetAdminBannerList';
import { BannerPositionType } from 'src/types/bannerPosition.types';
import { BannerListItemDto } from 'src/app/(main)/_dtos/getBannerList.dto';

const deleteBannerApi = async (banner_id: number) => {
  const response = await fetch('/api/banner/admin', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ banner_id }),
  });

  if (!response.ok) throw new Error('배너 삭제 실패');

  return response.json();
};

export const useDeleteBanner = (position: BannerPositionType) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (banner_id: number) => deleteBannerApi(banner_id),

    onSuccess: (_, banner_id) => {
      queryClient.setQueryData(getAdminBannerListQueryOptions(position).queryKey, (oldData: BannerListItemDto[] | undefined) => {
        if (!oldData) return [];
        return oldData.filter((banner) => banner.banner_id !== banner_id);
      });
    },

    onError: (error) => {
      console.error('배너 삭제 오류:', error);
    },
  });
};
