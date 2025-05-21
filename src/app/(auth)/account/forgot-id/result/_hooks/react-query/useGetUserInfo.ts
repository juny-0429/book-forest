import { useMutation } from '@tanstack/react-query';
import { FindIdResultDto } from '../../_dtos/FindIdResult.dto';

interface GetUserInfoArgs {
  userName: string;
  userEmail: string;
}

const getUserInfoApi = async (payload: GetUserInfoArgs): Promise<FindIdResultDto> => {
  const res = await fetch('/api/auth/forgot-id/result', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error || '회원 정보 조회에 실패했습니다.');
  }

  return res.json();
};

export const useGetUserInfo = () => {
  return useMutation({
    mutationFn: getUserInfoApi,
  });
};
