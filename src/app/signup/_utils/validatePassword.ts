export const validatePassword = (password: string, userId?: string) => {
  return [
    {
      rule: '비밀번호는 8자 이상 13자 이하여야 합니다.',
      passed: password.length >= 8 && password.length <= 13,
    },
    {
      rule: '영문, 숫자, 특수문자를 포함해야 합니다.',
      passed: /[A-Za-z]/.test(password) && /\d/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password),
    },
    {
      rule: '공백, 동일한 문자 연속, 연속된 숫자 및 키보드 패턴은 사용할 수 없습니다.',
      passed: password.length > 0 && !/\s/.test(password) && !/(.)\1{2,}/.test(password) && !/(1234|qwer|asdf)/.test(password),
    },
  ];
};