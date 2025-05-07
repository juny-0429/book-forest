import { useMutation } from '@tanstack/react-query';

export const resetPasswordApi = async (password: string): Promise<void> => {
  const res = await fetch('/api/auth/reset-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });

  if (!res.ok) throw new Error('비밀번호 변경에 실패했습니다.');
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPasswordApi,
  });
};
