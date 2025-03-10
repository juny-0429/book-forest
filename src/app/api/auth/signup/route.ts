import { NextResponse } from 'next/server';
import { SignupSchema } from 'src/app/(auth)/signup/_schemas/signup.schema';
import { createSupabaseServer } from 'src/lib/supabaseServer'; // supabaseServer 사용

export async function POST(request: Request) {
  try {
    const { id, password, user_name, address, address_detail, email, phone, agreeAge, agreeTerms, agreePrivacy, agreeMarketing, agreeEvent }: SignupSchema = await request.json();

    if (!agreeAge || !agreeTerms || !agreePrivacy) return NextResponse.json({ error: '필수 항목에 동의해야 합니다.' }, { status: 400 });

    const supabase = await createSupabaseServer();

    // auth.users 테이블에 저장
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    const user = data?.user;

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    // 회원 정보 테이블에 저장
    const { data: insertData, error: insertError } = await supabase.from('user').insert([
      {
        user_id: user?.id,
        account_id: id,
        user_name,
        address,
        address_detail,
        phone,
        agree_marketing: agreeMarketing,
        agree_event_notification: agreeEvent,
      },
    ]);

    if (insertError) return NextResponse.json({ error: insertError.message }, { status: 400 });

    return NextResponse.json({ message: '회원가입 완료!', user });
  } catch (error) {
    return NextResponse.json({ error: '서버 오류 발생' }, { status: 500 });
  }
}
