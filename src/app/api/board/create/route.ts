import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServer } from 'src/lib/supabaseServer';

export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServer();
  const body = await req.json();

  const { boardCode, postTitle, postContent, postImageUrl, userId, isNotice } = body;

  const { error } = await supabase.from('post').insert({
    board_code: boardCode,
    user_id: userId,
    post_title: postTitle,
    post_content: postContent,
    post_image_url: postImageUrl,
    is_notice: isNotice,
  });

  if (error) {
    return NextResponse.json({ message: '게시글 등록에 실패했습니다.', error }, { status: 500 });
  }

  return NextResponse.json({ message: '게시글이 등록되었습니다.' }, { status: 200 });
}
