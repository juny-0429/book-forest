import { useMemo } from 'react';
import { validatePassword } from '../_utils/validatePassword';

const strengthLevels = [
  { label: '약함', color: 'text-state-error', progressColor: 'bg-state-error' },
  { label: '중간', color: 'text-state-warning', progressColor: 'bg-state-warning' },
  { label: '강함', color: 'text-state-success', progressColor: 'bg-state-success' },
];

export const usePasswordStrength = (password: string, userId?: string) => {
  const rules = useMemo(() => validatePassword(password, userId), [password, userId]);
  const passedCount = rules.filter((r) => r.passed).length;
  const progressValue = (passedCount / rules.length) * 100;
  const strength = strengthLevels[passedCount > 0 ? passedCount - 1 : 0];

  return { rules, passedCount, progressValue, strength };
};
