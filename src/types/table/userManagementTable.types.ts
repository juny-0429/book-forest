export interface UserManagementTableColumn {
  id: number; // id
  userId: string; // 회원 아이디
  userName: string; // 회원명
  nickName: string; // 닉네임
  email: string; // 이메일
  phone: string; // 연락처
  createDate: string; // 가입일
  membershipLevel: string; // 회원등급
  smsConsent: boolean; // 문자 수신 동의
  emailConsent: boolean; // 이메일 수신 동의
  isActive: boolean; // 회원상태
}
