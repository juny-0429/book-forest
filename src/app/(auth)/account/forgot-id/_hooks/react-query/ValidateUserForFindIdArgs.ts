import { useMutation } from '@tanstack/react-query';

interface ValidateUserRequest {
  userName: string;
  userEmail: string;
}

export const validateUserForFindIdApi = async ({ userName, userEmail }: ValidateUserRequest) => {
  const res = await fetch('/api/auth/forgot-id', {
    method: 'POST',
    body: JSON.stringify({ userName, userEmail }),
  });

  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error || '요청에 실패했습니다.');
  }

  return res.json() as Promise<{ match: boolean }>;
};

export const useValidateUserForFindId = () => {
  return useMutation({
    mutationFn: validateUserForFindIdApi,
  });
};
