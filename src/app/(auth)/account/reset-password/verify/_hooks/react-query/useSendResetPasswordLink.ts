import { useMutation } from '@tanstack/react-query';

export const postSendResetPasswordLink = async (email: string): Promise<void> => {
  const res = await fetch('/api/auth/reset-password/send-link', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) throw new Error('메일 전송에 실패했습니다.');
};

export const useSendResetPasswordLink = () => {
  return useMutation({
    mutationFn: postSendResetPasswordLink,
  });
};
