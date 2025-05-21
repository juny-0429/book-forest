import { useState } from 'react';
import { useCheckAccountId } from '../../login/_hooks/react-query/useCheckAccountId';
import { accountIdSchema } from '../_schemas/accountId.schema';

export const useAccountIdValidation = () => {
  const [isUserIdAvailable, setIsUserIdAvailable] = useState<boolean | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const { mutateAsync: checkAccountId } = useCheckAccountId();

  const validateUserId = (id: string) => {
    const result = accountIdSchema.safeParse(id);
    if (!result.success) {
      setValidationError('영문자와 숫자만 사용 가능하며 4자 이상 12자 이하로 입력해주세요.');
      return false;
    }
    setValidationError(null);
    return true;
  };

  const onCheckAccountId = async (id: string) => {
    if (!validateUserId(id)) return;

    await checkAccountId(id, {
      onSuccess: (data) => {
        setIsUserIdAvailable(data.available);
      },
    });
  };

  return { onCheckAccountId, isUserIdAvailable, validationError };
};
