import { NextResponse } from 'next/server';
import { createSupabaseServer } from 'src/lib/supabaseServer';

export async function POST(req: Request) {
  const { userName, accountId, userEmail } = await req.json();

  if (!userName || !accountId || !userEmail) return NextResponse.json({ error: '입력하신 이름, 아이디, 이메일 중 일치하지 않는 정보가 있습니다. 다시 확인해 주세요.' }, { status: 400 });

  const supabase = await createSupabaseServer();

  const { data, error } = await supabase.from('user').select('user_id').eq('user_name', userName).eq('account_id', accountId).eq('user_email', userEmail).maybeSingle();

  if (error) return NextResponse.json({ error: error.message || '서버 오류가 발생했습니다.' }, { status: 500 });
  if (!data) return NextResponse.json({ match: false }, { status: 200 });

  return NextResponse.json({ match: true }, { status: 200 });
}
