import { NextResponse } from 'next/server';
import { createSupabaseServer } from 'src/lib/supabaseServer';

export async function POST(req: Request) {
  try {
    const { userName, userEmail } = await req.json();

    if (!userName || !userEmail) {
      return NextResponse.json({ error: '이름과 이메일을 모두 입력해주세요.' }, { status: 400 });
    }

    const supabase = await createSupabaseServer();

    const { data, error } = await supabase.from('user').select('account_id, created_at').eq('user_name', userName).eq('user_email', userEmail).maybeSingle();

    if (error) return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
    if (!data) return NextResponse.json({ error: '일치하는 회원 정보가 없습니다.' }, { status: 404 });

    return NextResponse.json({ accountId: data.account_id, createdAt: data.created_at });
  } catch (err) {
    return NextResponse.json({ error: '서버 오류 발생' }, { status: 500 });
  }
}
