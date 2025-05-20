import { useMutation } from '@tanstack/react-query';

export const checkUserIdApi = async (accountId: string): Promise<{ available: boolean }> => {
  const response = await fetch(`/api/auth/signup/check-userid?accountId=${accountId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) throw new Error('아이디 중복 확인 중 오류가 발생했습니다.');

  const data = await response.json();
  return data;
};

export const useCheckAccountId = () => {
  return useMutation<{ available: boolean }, Error, string>({
    mutationFn: (accountId: string) => checkUserIdApi(accountId),
  });
};
