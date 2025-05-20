import { useMutation } from '@tanstack/react-query';
import { useAlertModal } from 'src/hooks/useModal';

const verifyOtpApi = async ({ email, otp }: { email: string; otp: string }): Promise<void> => {
  const response = await fetch('/api/auth/signup/verify-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, otp }),
  });

  if (!response.ok) throw new Error('OTP 인증에 실패했습니다.');
};

export const useVerifyOtp = () => {
  const { openAlertModal } = useAlertModal();

  return useMutation({
    mutationFn: verifyOtpApi,
    onSuccess: () => {
      openAlertModal({
        title: '이메일 인증 완료',
        content: '인증번호가 확인되었습니다. 이메일 인증이 완료되었습니다.',
      });
    },
    onError: () => {
      openAlertModal({
        title: '인증번호 인증 실패',
        content: '인증번호 확인 중 문제가 발생했습니다. 다시 시도해주세요.',
      });
    },
  });
};
