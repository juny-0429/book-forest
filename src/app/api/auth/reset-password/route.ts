import { NextResponse } from 'next/server';
import { createSupabaseServer } from 'src/lib/supabaseServer';

export async function POST(request: Request) {
  const { password } = await request.json();

  if (!password || password.length < 8) {
    return NextResponse.json({ error: '비밀번호는 8자 이상이어야 합니다.' }, { status: 400 });
  }

  const supabase = await createSupabaseServer();
  const { error } = await supabase.auth.updateUser({ password });

  if (error) return NextResponse.json({ error: '비밀번호 변경에 실패했습니다.' }, { status: 500 });

  return NextResponse.json({ message: '비밀번호가 성공적으로 변경되었습니다.' });
}
