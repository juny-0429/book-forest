import { useMutation, useQueryClient } from '@tanstack/react-query';

const deleteBanner = async (banner_id: number) => {
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

export const useDeleteBanner = (position: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (banner_id: number) => deleteBanner(banner_id),

    onSuccess: (_, banner_id) => {
      queryClient.setQueryData(['bannerList', position], (oldData: any[] | undefined) => {
        if (!oldData) return [];

        return oldData.filter((banner) => banner.banner_id !== banner_id);
      });
    },

    onError: (error) => {
      console.error('배너 삭제 오류:', error);
    },
  });
};
