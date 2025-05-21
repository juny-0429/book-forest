import { NextResponse } from 'next/server';
import { createSupabaseServer } from 'src/lib/supabaseServer';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const accountId = searchParams.get('accountId');

    if (!accountId) return NextResponse.json({ error: '아이디를 입력해주세요.' }, { status: 400 });

    const supabase = await createSupabaseServer();

    const { data, error } = await supabase.from('user').select('account_id').eq('account_id', accountId).maybeSingle();

    if (error) {
      return NextResponse.json({ available: false, error: '서버 오류로 인해 조회할 수 없습니다.' }, { status: 500 });
    }

    return NextResponse.json({ available: data === null }, { status: 200 });
  } catch (_error) {
    return NextResponse.json({ error: '서버 오류 발생' }, { status: 500 });
  }
}
