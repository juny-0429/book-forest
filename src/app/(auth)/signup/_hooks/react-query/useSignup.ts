import { useMutation } from '@tanstack/react-query';
import { useAlertModal } from 'src/hooks/useModal';
import { SignupSchema } from '../../_schemas/signup.schema';
import { useRouter } from 'next/navigation';
import { appRoutes } from 'src/routes/appRoutes';

const signUpApi = async (data: SignupSchema) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error('회원가입 요청에 실패했습니다.');

  return response.json();
};

export const useSignup = () => {
  const router = useRouter();
  const { openAlertModal } = useAlertModal();

  return useMutation({
    mutationFn: signUpApi,
    onSuccess: (data) => {
      openAlertModal({
        title: '회원가입 완료',
        content: '책숲의 회원이 되신 것을 환영합니다. 다양한 책들을 만나보세요!',
        confirmButtonText: '홈으로가기',
        onConfirm: () => {
          router.push(appRoutes.login);
        },
      });
    },
    onError: () => {
      openAlertModal({
        title: '회원가입 실패',
        content: '잘못된 정보를 입력하셨습니다.',
      });
    },
  });
};
