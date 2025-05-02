import { NextResponse } from 'next/server';
import { createSupabaseServer } from 'src/lib/supabaseServer';

export async function POST(request: Request) {
  try {
    const { email, otp }: { email: string; otp: string } = await request.json();
    if (!email || !otp) return NextResponse.json({ error: '이메일과 인증번호를 입력해주세요.' }, { status: 400 });

    const supabase = await createSupabaseServer();

    const { data, error } = await supabase.from('otp_verification').select('otp_code, expires_at').eq('email', email).single();

    if (!data) {
      return NextResponse.json({ error: '인증번호가 만료되었거나 요청되지 않았습니다.' }, { status: 400 });
    }

    const nowUTC = new Date();
    const expiresAtUTC = new Date(data.expires_at);

    // 만료 시간 비교
    if (nowUTC.getTime() > expiresAtUTC.getTime()) {
      return NextResponse.json({ error: '인증번호가 만료되었습니다.' }, { status: 400 });
    }

    // OTP 비교
    if (data.otp_code !== otp) {
      return NextResponse.json({ error: '잘못된 인증번호입니다.' }, { status: 400 });
    }

    // 이메일 인증 완료 상태 저장
    await supabase.from('otp_verification').delete().eq('email', email);
    // await supabase.from('user').update({ verified: true }).eq('email', email);

    return NextResponse.json({ verified: true });
  } catch (error) {
    return NextResponse.json({ error: '서버 오류 발생' }, { status: 500 });
  }
}
