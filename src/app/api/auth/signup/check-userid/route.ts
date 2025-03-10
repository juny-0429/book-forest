import { NextResponse } from 'next/server';
import { createSupabaseServer } from 'src/lib/supabaseServer';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const accountId = searchParams.get('id');

    if (!accountId) return NextResponse.json({ error: '아이디를 입력해주세요.' }, { status: 400 });

    const supabase = await createSupabaseServer();

    const { data, error } = await supabase.from('user').select('account_id').eq('account_id', accountId).single();

    if (error) {
      console.error('사용자 조회 오류:', error.message);
      return NextResponse.json({ available: true });
    }

    return NextResponse.json({ available: !data });
  } catch (error) {
    console.error('서버 오류 발생:', error);
    return NextResponse.json({ error: '서버 오류 발생' }, { status: 500 });
  }
}
