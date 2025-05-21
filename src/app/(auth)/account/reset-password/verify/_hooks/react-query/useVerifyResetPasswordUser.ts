import { useMutation } from '@tanstack/react-query';
import { ForgotPasswordVerifySchema } from '../../_schemas/forgotPasswordVerify.schema';

const postVerifyResetPasswordUser = async (payload: ForgotPasswordVerifySchema): Promise<boolean> => {
  const res = await fetch('/api/auth/reset-password/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || '확인 중 오류 발생');
  return data.match;
};

export const useVerifyResetPasswordUser = () => {
  return useMutation({
    mutationFn: postVerifyResetPasswordUser,
  });
};
