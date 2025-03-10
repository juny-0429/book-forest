import { NextResponse } from 'next/server';
import { createSupabaseServer } from 'src/lib/supabaseServer';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const supabase = await createSupabaseServer();

    // 이메일과 비밀번호로 로그인 시도
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    const user = data?.user;
    const session = data?.session;

    if (user && session) {
      return NextResponse.json({
        message: '로그인 성공!',
        user: user,
        session: session,
      });
    }

    return NextResponse.json({ error: '로그인 실패' }, { status: 400 });
  } catch (error) {
    console.error('로그인 처리 중 오류 발생:', error);
    return NextResponse.json({ error: '서버 오류 발생' }, { status: 500 });
  }
}
