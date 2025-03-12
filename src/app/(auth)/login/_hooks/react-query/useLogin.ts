import { useMutation, useQueryClient } from '@tanstack/react-query';
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

  if (error) {
    throw new Error(error.message);
  }

  return authData;
};

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      if (data?.session) {
        window.location.href = appRoutes.home;
      }
    },
    onError: (error) => {
      console.error(error.message || '알 수 없는 오류가 발생했습니다.');
    },
  });
}
