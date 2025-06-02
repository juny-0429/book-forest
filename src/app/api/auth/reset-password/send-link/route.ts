import { NextResponse } from 'next/server';
import { createSupabaseServer } from 'src/lib/supabaseServer';

export async function POST(req: Request) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ error: '이메일이 누락되었습니다.' }, { status: 400 });

  const supabase = await createSupabaseServer();

  const redirectTo = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/account/reset-password' : 'https://book-forest.vercel.app/account/reset-password';

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: redirectTo,
  });

  if (error) return NextResponse.json({ error: '메일 전송 중 오류가 발생했습니다.' }, { status: 500 });

  return NextResponse.json({ message: '비밀번호 재설정 링크가 이메일로 전송되었습니다.' });
}
