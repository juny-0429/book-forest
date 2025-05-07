import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { supabaseBrowser } from 'src/lib/supabaseBrowser';
import { appRoutes } from 'src/routes/appRoutes';

interface LoginData {
  email: string;
  password: string;
}

const supabase = supabaseBrowser;

const loginApi = async (data: LoginData) => {
  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) throw new Error('로그인 요청에 실패하였습니다');
  return authData;
};

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      if (data?.session) {
        router.push(appRoutes.home);
      }
    },
  });
}
