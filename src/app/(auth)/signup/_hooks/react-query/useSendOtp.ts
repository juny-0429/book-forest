import { useMutation } from '@tanstack/react-query';
import { useAlertModal } from 'src/hooks/useModal';

const sendOtpApi = async (email: string): Promise<void> => {
  const response = await fetch('/api/auth/signup/send-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) throw new Error('이메일 전송에 실패했습니다.');
};

export const useSendOtp = () => {
  const { openAlertModal } = useAlertModal();

  return useMutation({
    mutationFn: sendOtpApi,
    onSuccess: () => {
      openAlertModal({
        title: '인증번호 전송 완료',
        content: '이메일로 인증번호가 전송되었습니다. 메일을 확인해주세요.',
      });
    },
    onError: () => {
      openAlertModal({
        title: '인증번호 전송 실패',
        content: '이메일 전송 중 문제가 발생했습니다.',
      });
    },
  });
};
