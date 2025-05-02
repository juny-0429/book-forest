import { NextResponse } from 'next/server';
import { createSupabaseServer } from 'src/lib/supabaseServer';

export async function POST(req: Request) {
  const { userName, userEmail } = await req.json();

  if (!userName || !userEmail) return NextResponse.json({ error: '이름과 이메일을 입력해주세요.' }, { status: 400 });

  const supabase = await createSupabaseServer();

  const { data, error } = await supabase.from('user').select('user_id').eq('user_name', userName).eq('user_email', userEmail).maybeSingle();

  if (error) return NextResponse.json({ error: error.message || '서버 오류가 발생했습니다.' }, { status: 500 });
  if (!data) return NextResponse.json({ match: false }, { status: 200 });

  return NextResponse.json({ match: true }, { status: 200 });
}
