import { useQuery } from '@tanstack/react-query';
import { UserProfileDto } from '../../_dtos/getUserProfile.dto';

const getUserProfileApi = async (): Promise<UserProfileDto> => {
  const response = await fetch(`/api/user/profile`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) throw new Error('사용자 프로필 조회에 실패했습니다.');
  const result = await response.json();
  return result.userProfile;
};

export const useGetUserProfile = () => {
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: () => getUserProfileApi(),
  });
};
