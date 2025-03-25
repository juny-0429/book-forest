import { useMutation, useQueryClient } from '@tanstack/react-query';

const updateUserProfileApi = async (userProfileImageUrl: string) => {
  const response = await fetch('/api/user/profile', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userProfileImageUrl }),
  });

  if (!response.ok) throw new Error('사용자 프로필 업데이트에 실패했습니다.');

  const result = await response.json();
  return result.userProfileImageUrl;
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userProfileImageUrl: string) => updateUserProfileApi(userProfileImageUrl),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    },
    onError: (error) => {
      console.error('프로필 업데이트 오류:', error);
    },
  });
};
