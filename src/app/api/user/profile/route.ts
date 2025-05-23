import { NextResponse } from 'next/server';
import { UserProfileDto } from 'src/app/(main)/shop/_dtos/getUserProfile.dto';
import { createSupabaseServer } from 'src/lib/supabaseServer';

export async function GET() {
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message || '서버 오류 발생' }, { status: 500 });
    }
  }
}

export async function PUT(request: Request) {
  const supabase = await createSupabaseServer();
  const BUCKET_NAME = process.env.NEXT_PUBLIC_STORAGE_USER_BUCKET!;
  const { userProfileImageUrl } = await request.json();

  if (!userProfileImageUrl) return NextResponse.json({ message: '사용자 프로필 이미지가 필요합니다.' }, { status: 400 });

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return NextResponse.json({ message: '로그인이 필요합니다.' }, { status: 401 });

    const { data: userData } = await supabase.from('user').select('user_profile_image_url').eq('user_id', user.id).single();

    const oldUrl = userData?.user_profile_image_url;

    const { error } = await supabase.from('user').update({ user_profile_image_url: userProfileImageUrl }).eq('user_id', user.id);

    if (error) return NextResponse.json({ message: '이미지 URL 업데이트 실패', error }, { status: 500 });

    if (oldUrl && oldUrl !== userProfileImageUrl) {
      const bucketPrefix = `/${BUCKET_NAME}/`;
      const oldFilePath = oldUrl.split(bucketPrefix)[1];

      if (oldFilePath) await supabase.storage.from(BUCKET_NAME).remove([oldFilePath]);
    }

    return NextResponse.json({ message: '성공' }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message || '서버 오류 발생' }, { status: 500 });
    }
  }
}
