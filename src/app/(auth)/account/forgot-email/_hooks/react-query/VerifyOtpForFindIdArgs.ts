import { useMutation } from '@tanstack/react-query';
import { useAlertModal } from 'src/hooks/useModal';

interface VerifyOtpArgs {
  email: string;
  otp: string;
}

const verifyOtpForFindIdApi = async ({ email, otp }: VerifyOtpArgs): Promise<void> => {
  const res = await fetch('/api/auth/signup/verify-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, otp }),
  });

  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error || '인증번호 전송에 실패했습니다.');
  }
};

export const useVerifyOtpForFindId = () => {
  const { openAlertModal } = useAlertModal();

  return useMutation({
    mutationFn: verifyOtpForFindIdApi,
    onSuccess: () =>
      openAlertModal({
        content: '인증에 성공하였습니다.',
      }),
  });
};
