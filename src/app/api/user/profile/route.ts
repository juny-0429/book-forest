import { NextResponse } from 'next/server';
import { UserProfileDto } from 'src/app/(main)/shop/_dtos/getUserProfile.dto';
import { createSupabaseServer } from 'src/lib/supabaseServer';

export async function GET(request: Request) {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ message: '로그인이 필요합니다.' }, { status: 401 });

  try {
    const { data, error } = await supabase.from('user').select('user_profile_image_url, account_id').eq('user_id', user.id).single();

    if (error || !data) return NextResponse.json({ message: '유저 정보를 찾을 수 없습니다.', error }, { status: 404 });

    const userProfile: UserProfileDto = {
      userProfileImageUrl: data.user_profile_image_url,
      accountId: data.account_id,
    };

    return NextResponse.json({ userProfile });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || '서버 오류 발생' }, { status: 500 });
  }
}
