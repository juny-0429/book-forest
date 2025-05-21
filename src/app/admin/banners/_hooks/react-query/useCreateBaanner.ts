import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateBannerSchema } from '../../_schemas/createBanner.schema';
import { getAdminBannerListQueryOptions } from './useGetAdminBannerList';

const createBannerApi = async (data: CreateBannerSchema) => {
  const response = await fetch('/api/banner/admin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('배너 등록 요청이 실패했습니다.');
  }

  return response.json();
};

const ADMIN_BANNER_LIST = 'ADMIN_BANNER_LIST';

export const useCreateBanner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBannerApi,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ADMIN_BANNER_LIST] });
    },
    onError: (error) => {
      alert('배너 등록 중 오류가 발생했습니다.');
    },
  });
};
