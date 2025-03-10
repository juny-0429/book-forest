import { useMutation } from '@tanstack/react-query';
import { useAlertModal } from 'src/hooks/useModal';
import { SignupSchema } from '../../_schemas/signup.schema';
import { useRouter } from 'next/navigation';
import { appRoutes } from 'src/routes/appRoutes';

const signUp = async (data: SignupSchema) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('회원가입에 실패했습니다.');
  }

  return response.json();
};

export const useSignup = () => {
  const router = useRouter();
  const { openAlertModal } = useAlertModal();

  const { mutateAsync, isError, error } = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      openAlertModal({
        title: '회원가입 완료',
        content: data.message,
        confirmButtonText: '홈으로가기',
        onConfirm: () => {
          router.push(appRoutes.login);
        },
      });
    },
    onError: (error: any) => {
      openAlertModal({
        title: '회원가입 실패',
        content: error.message || '알 수 없는 오류가 발생했습니다.',
      });
    },
  });

  return { mutateAsync, isError, error };
};
