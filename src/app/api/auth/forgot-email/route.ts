import { NextResponse } from 'next/server';
import { createSupabaseServer } from 'src/lib/supabaseServer';

export async function POST(req: Request) {
  const { userName, userPhone } = await req.json();

  if (!userName || !userPhone) return NextResponse.json({ error: '이름과 전화번호를 입력해주세요.' }, { status: 400 });

  const supabase = await createSupabaseServer();

  const { data, error } = await supabase.from('user').select('user_email').eq('user_name', userName).eq('user_phone', userPhone).maybeSingle();

  if (error) return NextResponse.json({ error: error.message || '서버 오류가 발생했습니다.' }, { status: 500 });

  if (!data) return NextResponse.json({ userEmail: null }, { status: 200 });

  return NextResponse.json({ userEmail: data.user_email }, { status: 200 });
}
