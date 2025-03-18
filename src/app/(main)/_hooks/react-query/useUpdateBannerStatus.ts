import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BannerListItemDto } from '../../_dtos/getBannerList.dto';

const updateBannerStatus = async (banner_id: number, is_active: boolean) => {
  const response = await fetch('/api/banner/admin', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ banner_id, is_active }),
  });

  if (!response.ok) throw new Error('배너 상태 업데이트에 실패했습니다.');

  return response.json();
};

export const useUpdateBannerStatus = (position: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ update_banner_id, is_active }: { update_banner_id: number; is_active: boolean }) => updateBannerStatus(update_banner_id, is_active),

    onSuccess: (_data, variables) => {
      const { update_banner_id, is_active } = variables;

      queryClient.setQueryData(['bannerList', position], (oldData: BannerListItemDto[] | undefined) => {
        if (!oldData) return [];

        return oldData.map((banner) => (banner.banner_id === update_banner_id ? { ...banner, is_active } : banner));
      });

      queryClient.invalidateQueries({ queryKey: ['bannerList', position] });
    },

    onError: (error) => {
      console.error('배너 상태 업데이트 오류:', error);
    },
  });
};
