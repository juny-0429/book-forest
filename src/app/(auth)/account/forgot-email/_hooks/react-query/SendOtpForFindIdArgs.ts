import { useMutation } from '@tanstack/react-query';

interface SendOtpArgs {
  email: string;
}

const sendOtpForFindIdApi = async ({ email }: SendOtpArgs): Promise<void> => {
  const res = await fetch('/api/auth/signup/send-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error || '인증번호 전송에 실패했습니다.');
  }
};

export const useSendOtpForFindId = () => {
  return useMutation({
    mutationFn: sendOtpForFindIdApi,
  });
};
