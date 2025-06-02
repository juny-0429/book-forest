import { useMutation } from "@tanstack/react-query";

export interface FindEmailRequest {
  userName: string;
  userPhone: string;
}

export interface FindEmailResponse {
  userEmail: string | null;
}

export const findUserEmail = async (payload: FindEmailRequest): Promise<FindEmailResponse> => {
  const response = await fetch('/api/auth/forgot-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || '이메일 찾기에 실패했습니다.');
  }

  return response.json();
};

export const useFindEmail = () => {
  return useMutation<FindEmailResponse, Error, FindEmailRequest>({
    mutationFn: findUserEmail,
  });
};
