import { useMutation } from '@tanstack/react-query';

const createCartListByUserId = async (userId: string, cart: { productId: number; stock: number }[]) => {
  const response = await fetch(`/api/cart/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, cart }),
  });

  if (!response.ok) throw new Error('요청이 올바르지 않습니다.');
};

export const useCreateCartListByUserId = () => {
  return useMutation({
    mutationFn: ({ userId, cart }: { userId: string; cart: { productId: number; stock: number }[] }) => createCartListByUserId(userId, cart),
  });
};
