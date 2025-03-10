import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { createSupabaseServer } from 'src/lib/supabaseServer';

export async function POST(request: Request) {
  try {
    const { email }: { email: string } = await request.json();
    if (!email) return NextResponse.json({ error: '이메일을 입력해주세요.' }, { status: 400 });

    const supabase = await createSupabaseServer();

    // 6자리 OTP 생성
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10분 후 만료
    expiresAt.setHours(expiresAt.getHours() + 9); // 한국 시간(KST) 적용
    const expiresAtString = expiresAt.toISOString();

    // Supabase DB에 OTP 저장 (upsert 사용)
    const { error: dbError } = await supabase.from('otp_verification').upsert([{ email, otp_code: otpCode, expires_at: expiresAtString }]);

    if (dbError) {
      console.error('❌ OTP 저장 실패:', dbError);
      return NextResponse.json({ error: 'OTP 저장 중 오류가 발생했습니다.' }, { status: 500 });
    }

    // SMTP 환경 변수 검증
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
      console.error('❌ SMTP 환경 변수 설정 오류');
      return NextResponse.json({ error: '메일 서버 설정이 잘못되었습니다.' }, { status: 500 });
    }

    // Nodemailer 설정
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465, // 포트가 465일 때만 TLS 활성화
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      from: `"책숲" <${SMTP_USER}>`,
      to: email,
      subject: '이메일 인증번호',
      text: `인증번호: ${otpCode}\n이메일 인증을 위해 해당 번호를 입력하세요.`,
    });

    return NextResponse.json({ message: '이메일로 인증번호가 전송되었습니다.' });
  } catch (error) {
    console.error('❌ OTP 전송 오류:', error);
    return NextResponse.json({ error: '서버 오류 발생' }, { status: 500 });
  }
}
